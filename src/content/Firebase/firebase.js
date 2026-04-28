// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATrEUJGjYy_hr-yRysciWoGcjU3V5EtB4",
  authDomain: "hotel-booking-2-0---cp.firebaseapp.com",
  projectId: "hotel-booking-2-0---cp",
  storageBucket: "hotel-booking-2-0---cp.firebasestorage.app",
  messagingSenderId: "260472103468",
  appId: "1:260472103468:web:04797c777012bd525de789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);