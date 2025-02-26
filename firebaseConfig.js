import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Voeg deze regel toe

// Firebase-configuratie
const firebaseConfig = {
  apiKey: "AIzaSyCP6x_IbEeOmpoK5GkG5noA2n6C6y4onzA",
  authDomain: "tappass-da821.firebaseapp.com",
  projectId: "tappass-da821",
  storageBucket: "tappass-da821.appspot.com",
  messagingSenderId: "786960783991",
  appId: "1:786960783991:web:554cfbd019846dc2a74472",
  measurementId: "G-Y7FQ951EQD"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Voeg deze regel toe

// ✅ Analytics alleen laden in de browser
let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export { auth, db, storage, analytics }; // Voeg storage toe aan de export