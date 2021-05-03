import React from 'react'
import './Post.css'
import { Avatar, Container } from '@material-ui/core';

function Post({ id , prp }) {
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
            <h4 className="post__text"><strong>{prp.username}</strong>: {prp.caption}</h4>
            
        </Container>
    )
}

export default Post

 
