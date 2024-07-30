import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoF6bsYFZC8t7hhQu5jbAPaBiadvPLEMU",
  authDomain: "todo-22-7bff2.firebaseapp.com",
  projectId: "todo-22-7bff2",
  storageBucket: "todo-22-7bff2.appspot.com",
  messagingSenderId: "1066430471422",
  appId: "1:1066430471422:web:eebb6a97c1759b12fc99af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
