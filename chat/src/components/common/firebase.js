// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAJ45SWb8tx06cSbRaG3iZUwZ8YqecIR2s",
    authDomain: "chat-57c69.firebaseapp.com",
    projectId: "chat-57c69",
    storageBucket: "chat-57c69.appspot.com",
    messagingSenderId: "85899793070",
    appId: "1:85899793070:web:ebba3c7b23705bb753133f",
    measurementId: "G-RPCWZNEFVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

