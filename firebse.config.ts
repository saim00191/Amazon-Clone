// firebase.config.ts
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ_hjsgnyzxQQfwgpWIFKPeZL4uZK66N4",
  authDomain: "users-db19c.firebaseapp.com",
  projectId: "users-db19c",
  storageBucket: "users-db19c.appspot.com",
  messagingSenderId: "319068569321",
  appId: "1:319068569321:web:90d32822c1f47061513a78",
  measurementId: "G-YZMP3EE2GD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export default firebaseConfig
