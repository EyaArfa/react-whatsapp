// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjuKNdrs_pbk7Iaw86gF5Rd7UpLTPOIos",
  authDomain: "reactnative-b45cb.firebaseapp.com",
  databaseURL: "https://reactnative-b45cb-default-rtdb.firebaseio.com",
  projectId: "reactnative-b45cb",
  storageBucket: "reactnative-b45cb.appspot.com",
  messagingSenderId: "72597501236",
  appId: "1:72597501236:web:1e2fe1334f2b9ba0492161",
};

// Initialize Firebase

const firebase = app.initializeApp(firebaseConfig);
export default firebase;
