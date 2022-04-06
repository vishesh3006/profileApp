import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyDt_9wnqiF1bM8FGsxdsmzz7TDz7oJbGCs",
  authDomain: "socialapp-17a88.firebaseapp.com",
  projectId: "socialapp-17a88",
  storageBucket: "socialapp-17a88.appspot.com",
  messagingSenderId: "180884598421",
  appId: "1:180884598421:web:8c768b6b167ce5e680b59c",
  measurementId: "G-0ND3YK6BH9"
  
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(app);
  const db = firebase.firestore(app);
  
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const emailProvider = new firebase.auth.EmailAuthProvider();

  export {auth, db, googleProvider, app, firebase, emailProvider}
  