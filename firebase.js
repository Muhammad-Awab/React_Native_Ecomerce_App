// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDriMNnH5zVsYUg8FppUZuVozpQ6bj6ZOw",
  authDomain: "ecomerceapp-883e4.firebaseapp.com",
  projectId: "ecomerceapp-883e4",
  storageBucket: "ecomerceapp-883e4.appspot.com",
  messagingSenderId: "60012129331",
  appId: "1:60012129331:web:b228dd0913974467980746"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth,db}