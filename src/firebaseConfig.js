// firebaseConfig.js
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyCDBgRtDLY13s6dVvzcKouK5LYNy8Dqbr0",
  authDomain: "klyra-c84ad.firebaseapp.com",
  projectId: "klyra-c84ad",
  storageBucket: "klyra-c84ad.appspot.com",
  messagingSenderId: "315865406417",
  appId: "1:315865406417:web:ee66e55bc07c042b9e1ef0",
  measurementId: "G-VK5ZBE3CZS"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };