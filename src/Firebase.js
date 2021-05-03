import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7vHOOZfE-0KK_QUrMKLs8qlFV8EAyVAo",
    authDomain: "instagram-clone-5a6d2.firebaseapp.com",
    projectId: "instagram-clone-5a6d2",
    storageBucket: "instagram-clone-5a6d2.appspot.com",
    messagingSenderId: "481535826795",
    appId: "1:481535826795:web:ef6911764c7b296ad18a2e",
    measurementId: "G-VRX0YHE7TH"

})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db , storage , auth};