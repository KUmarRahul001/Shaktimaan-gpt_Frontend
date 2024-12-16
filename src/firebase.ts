// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//  Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvPoV-FW1jPviServGrqxSAMJ2P2YEE8o",
  authDomain: "shaktimaangpt-c1e45.firebaseapp.com",
  projectId: "shaktimaangpt-c1e45",
  storageBucket: "shaktimaangpt-c1e45.firebasestorage.app",
  messagingSenderId: "508941944567",
  appId: "1:508941944567:web:2db7cf5b498889556675f2",
  measurementId: "G-60MF5EV960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
