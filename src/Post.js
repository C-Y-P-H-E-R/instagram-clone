import React from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core';

function Post({ id , prp }) {
    return (
        <div className="post" >
            {/* header -> avatar + username */}
            <div className="post__header">    
                <Avatar className="post__avatar"  alt="Kushagra" src="download.jpg" />
                <h3>{prp.username}</h3>
            </div>
            
            {/* image */}
            <img className="post__image" src={prp.imageurl} alt="Cover"></img>

            {/* username + caption */}
            <h4 className="post__text"><strong>{prp.username}</strong>: {prp.caption}</h4>
            
        </div>
    )
}

export default Post

 
