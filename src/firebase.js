// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcm1CmcFfcS_llufk7G6er2zvXs_Ky9dw",
  authDomain: "boomermvp-19434.firebaseapp.com",
  projectId: "boomermvp-19434",
  storageBucket: "boomermvp-19434.appspot.com",
  messagingSenderId: "940601215021",
  appId: "1:940601215021:web:ef3163a047edf56f1410a4",
  measurementId: "G-9N41W4ZSN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const storage = getStorage(app);
export default storage;
