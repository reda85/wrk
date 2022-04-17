
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'
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

setPersistence(getAuth(), browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

export default app;