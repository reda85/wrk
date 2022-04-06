
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA8vm68kZAXBdc1ah3MhdjwshAu0hJl3q8",
    authDomain: "workboard-fa86f.firebaseapp.com",
    projectId: "workboard-fa86f",
    storageBucket: "workboard-fa86f.appspot.com",
    messagingSenderId: "334585702250",
    appId: "1:334585702250:web:4f1051b99552d451b72713"
  };
// if a Firebase instance doesn't exist, create one
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const storage = getStorage()

export default app;