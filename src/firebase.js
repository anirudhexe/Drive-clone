// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYv2cRa8TbTCBntgGSadcseAt8xCEDUbw',
  authDomain: "drive-b7b6f.firebaseapp.com",
  projectId: "drive-b7b6f",
  storageBucket: "drive-b7b6f.appspot.com",
  messagingSenderId: "971009986536",
  appId: "1:971009986536:web:fe5034c0ba41573e6ede5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore(app);

const storage=getStorage(app);

const auth = getAuth(app);

//const provider=new firebase.auth.GoogleAuthProvider();

export {db, storage, auth};