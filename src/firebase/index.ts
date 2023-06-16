// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  // connectAuthEmulator,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADN8uzM-rspS3ymzssydtI--BcHlo9WvI",
  authDomain: "mummyscake.firebaseapp.com",
  databaseURL:
    "https://mummyscake-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mummyscake",
  storageBucket: "mummyscake.appspot.com",
  messagingSenderId: "170382129581",
  appId: "1:170382129581:web:2f5966106c6e9f25798924",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();

// connectAuthEmulator(auth, "http://127.0.0.1:9099");

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const createAccount = (
  email: string,
  password: string,
  fullName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  phone: string
) =>
  new Promise<User>((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const { user } = userCred;
        await updateProfile(user, {
          displayName: fullName,
        });
        // TODO:add phone number to db, or authenticate phone number with otp. Just find something to do with this
        resolve(user);
      })
      .catch(reject);
  });

export const db = getFirestore(app);

export const subscribeToUser = (
  subscriberFunction: (user: User | null) => void
) => onAuthStateChanged(auth, subscriberFunction);

export const signInWithGoogle = () => signInWithPopup(auth, googleAuth);
