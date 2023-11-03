import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHjxlNLrMlee3N8-v7HoyuSbha21FXDh8",
  authDomain: "reactapp-otp.firebaseapp.com",
  projectId: "reactapp-otp",
  storageBucket: "reactapp-otp.appspot.com",
  messagingSenderId: "650974781637",
  appId: "1:650974781637:web:c4dbc395d69585e15190ac",
  measurementId: "G-LJ9H3PY5JL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;