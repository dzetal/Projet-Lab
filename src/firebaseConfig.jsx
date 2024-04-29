// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw3mklKD4q-ClDqtpGwJneHguotJQqdLM",
  authDomain: "projet-lab-5681d.firebaseapp.com",
  projectId: "projet-lab-5681d",
  storageBucket: "projet-lab-5681d.appspot.com",
  messagingSenderId: "960861652112",
  appId: "1:960861652112:web:039e0e92056cc8f4af8415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();