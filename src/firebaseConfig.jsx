// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-QbQZINZCyHCp4SHVrwAJfhkyF_qU2Xk",
  authDomain: "projet-lab3.firebaseapp.com",
  projectId: "projet-lab3",
  storageBucket: "projet-lab3.appspot.com",
  messagingSenderId: "162880245532",
  appId: "1:162880245532:web:1141d714083e86e19ff4d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();