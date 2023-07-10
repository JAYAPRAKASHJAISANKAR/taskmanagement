import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU9ENEhXqJjIhsrg73OAJL3xchD0oYpJE",
  authDomain: "taskmanagement-2a7fb.firebaseapp.com",
  projectId: "taskmanagement-2a7fb",
  storageBucket: "taskmanagement-2a7fb.appspot.com",
  messagingSenderId: "163214565065",
  appId: "1:163214565065:web:3bfa4da21385419bcd3718",
  measurementId: "G-RPH66E8MZ6",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const firestore = app.firestore();

export { auth, firestore };
