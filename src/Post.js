import React, { useEffect, useState } from 'react'
import './Post.css'
import { Avatar, Container } from '@material-ui/core';
import { db } from './Firebase';
import firebase from 'firebase'


function Post({ username, postid, prp }) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const handleComment = (event) => {
        //the code comes here
        event.preventDefault();

        db.collection('posts').doc(postid).collection('comments').add({
            username: username.displayName,
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment('')

    }

    useEffect(()=> {
        //the code runs here
        let unsubscribe
        if(postid) {
            unsubscribe = db.collection('posts').doc(postid).collection('comments').orderBy('timestamp','asc').onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => doc.data()))
            })
        }

        return () => {
            unsubscribe();
        }
        
    }, [postid])

    return (
        <Container className="post" maxWidth="sm">
            {/* header -> avatar + username */}
            <div className="post__header">    
                <Avatar className="post__avatar"  alt="Kushagra" src="download.jpg" />
                <h3>{prp.username}</h3>
            </div>
            
            {/* image */}
            <img className="post__image" src={prp.imageurl} alt="Cover"></img>

            {/* username + caption */}
            <h4 className="post__text"><strong>{prp.username}</strong> {prp.caption}</h4>
            <div className="post__comments">
                {
                    comments.map(comment => {
                        return <p style={{paddingTop : "2px", paddingBottom : "2px"}}><strong>{comment.username}</strong> {comment.text}</p>
                    })
                }
            </div>
            {
                username && (
                <form className ="post__comment">
                    <input 
                        type="text"
                        className="post__input"
                        placeholder="Enter the comments"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="post__button" disabled={!comment} type="submit" onClick={handleComment}>Post</button>
                </form>
                )
            }
            {
        }
        </Container>
    )
}

export default Post

 
