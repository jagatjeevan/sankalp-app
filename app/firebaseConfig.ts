import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArRG9DnCuqNl6ZrZswJZSFKQGsORNtj7U",
  authDomain: "sankalp-71901.firebaseapp.com",
  projectId: "sankalp-71901",
  storageBucket: "sankalp-71901.firebasestorage.app",
  messagingSenderId: "449322127599",
  appId: "1:449322127599:web:947fa6131078f8da178b1a",
  measurementId: "G-N9M75FGKHB",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
