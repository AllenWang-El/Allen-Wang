
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYFItgP6-Ilb0midzkTuUrpNVXHZFEvzk",
  authDomain: "hanoi-travel-3b7ae.firebaseapp.com",
  projectId: "hanoi-travel-3b7ae",
  storageBucket: "hanoi-travel-3b7ae.firebasestorage.app",
  messagingSenderId: "649504006170",
  appId: "1:649504006170:web:12417b592cd90903b931a3",
  measurementId: "G-7DLD5Q4GE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot };
