// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

// Initialize Cloud Firestore
export const db = getFirestore(app);

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

export interface StudentRegistrationData {
  students: {
    fullName: string;
    age: string;
    gender: string;
  }[];
  phone: string;
  email: string;
  country: string;
  city?: string;
  countryCode?: string;
  enrollmentId?: string;
  studentName?: string;
  studentsCount?: number;
  basePriceUSD?: number;
  subtotalPriceUSD?: number;
  discountPercent?: number;
  discountAmountUSD?: number;
  finalTotalPriceUSD?: number;
  courseId: string;
  courseTitle: string;
  planId: string;
  planName: string;
  planPriceUSD: number;
  teacherPreference: string;
  preferredDays: string[];
  preferredTimeSlot: string;
  language: string;
  submittedAt?: any;
}

export async function saveRegistrationToFirestore(data: StudentRegistrationData) {
  try {
    const docRef = await addDoc(collection(db, "registrations"), {
      ...data,
      submittedAt: serverTimestamp(),
      createdAtIso: new Date().toISOString(),
      status: "new"
    });
    console.log("Registration successfully written to Firestore with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding registration document to Firestore: ", error);
    throw error;
  }
}

export interface ContactMessageData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  language: string;
  submittedAt?: any;
}

export async function saveContactMessageToFirestore(data: ContactMessageData) {
  try {
    const docRef = await addDoc(collection(db, "contact_messages"), {
      ...data,
      submittedAt: serverTimestamp(),
      createdAtIso: new Date().toISOString(),
      status: "unread"
    });
    console.log("Contact message successfully written to Firestore with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding contact message document to Firestore: ", error);
    throw error;
  }
}

