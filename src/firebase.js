import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, updateDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD1MD7s-p_OSi78j-JliCW-I_6JhydXkok",
  authDomain: "mwdims.firebaseapp.com",
  projectId: "mwdims",
  storageBucket: "mwdims.appspot.com",
  messagingSenderId: "16816901883",
  appId: "1:16816901883:web:ecd0edef7d53c388fb2a5e",
  measurementId: "G-338KRN0CWN"
};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth()
setPersistence(auth, browserSessionPersistence)
const db = getFirestore(app);

export { updateDoc, getDoc, addDoc, doc, collection, db, setDoc, provider, auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut}