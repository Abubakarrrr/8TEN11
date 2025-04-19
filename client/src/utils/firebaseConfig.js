import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeyrtHaucd1CHB2Qd2xYJdi-BUpQVcFd8",
  authDomain: "nascon-cmp.firebaseapp.com",
  projectId: "nascon-cmp",
  storageBucket: "nascon-cmp.firebasestorage.app",
  messagingSenderId: "80591294649",
  appId: "1:80591294649:web:b29ccbed797d16caa64b68",
  measurementId: "G-1L8BJK1KKG",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
