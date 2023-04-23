// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADN8uzM-rspS3ymzssydtI--BcHlo9WvI",
  authDomain: "mummyscake.firebaseapp.com",
  databaseURL: "https://mummyscake-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mummyscake",
  storageBucket: "mummyscake.appspot.com",
  messagingSenderId: "170382129581",
  appId: "1:170382129581:web:2f5966106c6e9f25798924"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const signIn = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth,email, password)
}

export const db = getFirestore(app);