import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, setDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBkgrIz_fB0d1PMARiVPW7enGF3Yob82BE",
  authDomain: "fb-rn-phil128c.firebaseapp.com",
  projectId: "fb-rn-phil128c",
  storageBucket: "fb-rn-phil128c.appspot.com",
  messagingSenderId: "1012459092535",
  appId: "1:1012459092535:web:ff8ea5c8a8510ed305ddb2",
  measurementId: "G-8CQE799MV0"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

export default fireBaseApp;