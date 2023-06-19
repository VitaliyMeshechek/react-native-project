import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA1k301uFSgZWoZUx48apqOSGfHOdFKCE",
  authDomain: "react-native-first-proje-4c227.firebaseapp.com",
  projectId: "react-native-first-proje-4c227",
  storageBucket: "react-native-first-proje-4c227.appspot.com",
  messagingSenderId: "844074982124",
  appId: "1:844074982124:web:04f349dd5668e52cd423c9",
  measurementId: "G-YZ32LP0K31",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const authFirebase = getAuth(app);
