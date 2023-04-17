// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv1Ju1oAH-_vKWUxu2EoP_ClZbE_wXXhE",
  authDomain: "ema-john-firebase-auth-ceeef.firebaseapp.com",
  projectId: "ema-john-firebase-auth-ceeef",
  storageBucket: "ema-john-firebase-auth-ceeef.appspot.com",
  messagingSenderId: "975277778177",
  appId: "1:975277778177:web:3383a6a9c01ed2c3b22700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;