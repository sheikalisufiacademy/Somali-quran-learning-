// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKjUsT3Te-k-F8ebfDRkSyEL4q8d-tVqo",
  authDomain: "somali-quran-learning.firebaseapp.com",
  projectId: "somali-quran-learning",
  storageBucket: "somali-quran-learning.firebasestorage.app",
  messagingSenderId: "396733011927",
  appId: "1:396733011927:web:c1a34697ab5b8373b8dd92",
  measurementId: "G-5EDQ9JTERP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics safely for web environments
export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn("Firebase Analytics not supported in this environment:", err);
    });
}
