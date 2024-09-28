// firebaseConfig.js
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";




const firebaseConfig = {
    apiKey: "AIzaSyB5cvfl7hT3KBZTh-RHesnjXz_JJwgrhg8",
    authDomain: "nodefirebase-6e0dd.firebaseapp.com",
    projectId: "nodefirebase-6e0dd",
    storageBucket: "nodefirebase-6e0dd.appspot.com",
    messagingSenderId: "14143901690",
    appId: "1:14143901690:web:5ad864c1d46889044b5e43"
  };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };