// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9cK-XeQgatHscW9InzAhz6sbgr2dogbc",
    authDomain: "discord-clone-54c69.firebaseapp.com",
    projectId: "discord-clone-54c69",
    storageBucket: "discord-clone-54c69.appspot.com",
    messagingSenderId: "88760771157",
    appId: "1:88760771157:web:2d9be416971559d44baadc",
    measurementId: "G-RQDYB9G1JB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();

export {auth , provider}
export default db