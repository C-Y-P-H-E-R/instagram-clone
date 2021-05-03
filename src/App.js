import './App.css';
import Post from './Post';
import { useState , useEffect } from 'react';
// import firebase from 'firebase'
import { auth, db } from './Firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));

function App() {

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //if the user has logged in
        console.log(authUser)
        setUser(authUser);
      } else {
        //if the user has logged out
        setUser(null);
      }
    })

    return () => {
      //perform some cleanup action
      unsubscribe();
    }
  }, [user , username])

  useEffect(() => {
   db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
     }))) 
  })
  } , [])

  const signIn = (event) => {
    //the code goes here
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error.message))

    setEmail('')
    setPassword('')
    setOpenSignIn(false)

  } 

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password).then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    }).catch((error) => alert(error.message))

    setUsername('')
    setEmail('')
    setPassword('')
    setOpen(false)
  }

  return (
    <div className="App">
     <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
            <img alt="Instagram" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
            </center>

            <Input 
              type="text"
              placeholder="username"
              value={username}
              onChange = { e => setUsername(e.target.value) }
            />
            <Input 
              type="text"
              placeholder="email"
              value={email}
              onChange = { e => setEmail(e.target.value) }
            />
            <Input 
              type="text"
              placeholder="Password"
              value={password}
              onChange = { e => setPassword(e.target.value) }
            />
            <Button type = "submit" onClick={signUp}>sign up</Button>
        </form>
          
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
            <img alt="Instagram" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
            </center>

            <Input 
              type="text"
              placeholder="email"
              value={email}
              onChange = { e => setEmail(e.target.value) }
            />
            <Input 
              type="text"
              placeholder="Password"
              value={password}
              onChange = { e => setPassword(e.target.value) }
            />
            <Button type = "submit" onClick={signIn}>sign in</Button>
        </form>
          
        </div>
      </Modal>
      
      {/* header */}
      <div className="app__header">
        <img alt="Instagram" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
      </div>

      {
        user ? (
          <Button onClick={() => auth.signOut()}>LogOut</Button>
         ) : (
           <div className="app__logincontainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
           </div> 
         )
      }
      {/* <h1>Hello React</h1> */}
      {/* posts */}
      
      {
        posts.map(post => {
          return  <Post key={post.id} prp={post.post} />;
        })
      }
      
      {/* posts */}
    </div>
  );
}

export default App;


