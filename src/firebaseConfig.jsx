// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlIaTNQmo6CsmfGxZcG6BamsAKkvPhAoo",
  authDomain: "projet-lab1-c4fa3.firebaseapp.com",
  projectId: "projet-lab1-c4fa3",
  storageBucket: "projet-lab1-c4fa3.appspot.com",
  messagingSenderId: "740127976390",
  appId: "1:740127976390:web:a10510963278a2c39ba0c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();