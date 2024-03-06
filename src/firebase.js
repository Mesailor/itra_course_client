import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlBXxv-Y8WcV0pNh9XNpv5zetAOTTm0mg",
  authDomain: "itra-collections.firebaseapp.com",
  projectId: "itra-collections",
  storageBucket: "itra-collections.appspot.com",
  messagingSenderId: "931026276702",
  appId: "1:931026276702:web:5190308ffcbf095b7dffcf",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
