// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit
} from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

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

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

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

/**
 * Search student registration in Firestore by BQ Enrollment ID or Email
 */
export async function searchStudentInFirestore(identifier: string): Promise<StudentRegistrationData | null> {
  const cleanId = identifier.trim();
  if (!cleanId) return null;

  try {
    // 1. Try matching by enrollmentId (e.g. BQA-123456, BQ-123456, or exact ID)
    const normalizedBQ = cleanId.toUpperCase().startsWith('BQA-') 
      ? cleanId.toUpperCase() 
      : cleanId.toUpperCase().startsWith('BQ-')
      ? cleanId.toUpperCase().replace('BQ-', 'BQA-')
      : cleanId.toUpperCase();

    const qBQ = query(
      collection(db, "registrations"), 
      where("enrollmentId", "in", [cleanId, cleanId.toUpperCase(), normalizedBQ]),
      limit(1)
    );
    const snapBQ = await getDocs(qBQ);
    if (!snapBQ.empty) {
      return snapBQ.docs[0].data() as StudentRegistrationData;
    }

    // 2. Try matching by Email
    const qEmail = query(
      collection(db, "registrations"), 
      where("email", "==", cleanId.toLowerCase()),
      limit(1)
    );
    const snapEmail = await getDocs(qEmail);
    if (!snapEmail.empty) {
      return snapEmail.docs[0].data() as StudentRegistrationData;
    }

    return null;
  } catch (err) {
    console.warn("Firestore query search error:", err);
    return null;
  }
}

/**
 * Sign In with Google Popup via Firebase Auth and query matching Firestore profile
 */
export async function signInStudentWithGoogle(): Promise<{ user: FirebaseUser; registrationData: StudentRegistrationData | null }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    let registrationData: StudentRegistrationData | null = null;
    if (user.email) {
      registrationData = await searchStudentInFirestore(user.email);
    }
    
    return { user, registrationData };
  } catch (error) {
    console.error("Google sign in failed:", error);
    throw error;
  }
}

export async function signOutStudent(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out failed:", error);
  }
}


