import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOIsxOdz2QJmTCG4DA7EntUjOnSUHR3bg",
  authDomain: "kalachi-65744.firebaseapp.com",
  projectId: "kalachi-65744",
  storageBucket: "kalachi-65744.firebasestorage.app",
  messagingSenderId: "752741387946",
  appId: "1:752741387946:web:5716d2bddf1b37bfa3cad3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
