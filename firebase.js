// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyEmVnm2wCTUsdQQ9crMAMm6Z1dAsjpuY",
    authDomain: "react-native-ecomerce.firebaseapp.com",
    projectId: "react-native-ecomerce",
    storageBucket: "react-native-ecomerce.appspot.com",
    messagingSenderId: "1012020602766",
    appId: "1:1012020602766:web:9b07978c333c45e83166df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth,db}