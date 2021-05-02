import './App.css';
import Post from './Post';
import { useState } from 'react';

function App() {

  const [posts, setPosts] = useState([
    {
      username: "hogg_word",
      caption: "React rocks !!!",
      imageurl: "https://learnwithshikha.com/wp-content/uploads/2020/11/z2xg2bpo.jpg"

    },
    {
      username: "dcodein_official",
      caption: "we make coding related content",
      imageurl: "https://www.stoodnt.com/blog/wp-content/uploads/2020/08/Best-Study-Tips.jpg"
    },
    {
      username: "Brodha V",
      caption: "It was way too easy",
      imageurl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Brodha_V.jpg"
    }
  ])

  return (
    <div className="App">
      
      {/* header */}
      <div className="app__header">
        <img alt="Instagram" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />

      </div>
      {/* <h1>Hello React</h1> */}
      {/* posts */}
      
      {
        posts.map(post => {
          return  <Post prp={post} />;
        })
      }
      
      {/* posts */}
    </div>
  );
}

export default App;


