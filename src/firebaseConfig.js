// Import the functions you need from the SDKs you need
import firebase from "firebase";
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo6LiFNUkD9LGx30fggglWVBPkyfspjxQ",
    authDomain: "one-one-chat-app-c73eb.firebaseapp.com",
    projectId: "one-one-chat-app-c73eb",
    storageBucket: "one-one-chat-app-c73eb.appspot.com",
    messagingSenderId: "1067581159345",
    appId: "1:1067581159345:web:6edbf3f5f0fae7bd102f90"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig) ;
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;