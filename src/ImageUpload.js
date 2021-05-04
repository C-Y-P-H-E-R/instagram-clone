import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { storage , db } from './Firebase'
import firebase from 'firebase'
import './ImageUpload.css'


function ImageUpload({ username }) {
    
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        //the code comes here
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        } 
    }

    const handleUpload = (e) => {
        //the code comes here
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //the logic for progress bar comes here
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes )*100
                )
                console.log(progress)
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage.ref("images").child(image.name).getDownloadURL().then((url)=> {
                    //storing it to the realtime database so that it can be readily accessed and it can be posted on the instagram timeline
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        imageurl : url,
                        username : username
                    })
                })
            
                setProgress(0)
                setCaption('')
                setImage(null)
            }

        )
    }

    return (
        <div className="imageupload">
            {/* progress bar */}
            <progress className="imageupload__progress"value={progress} max="100" />
            {/* caption Input */}
            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Enter the Caption"/>
            {/* file picker/ file upload */}
            <input type="file" onChange={handleChange} />
            {/* post button */}
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
