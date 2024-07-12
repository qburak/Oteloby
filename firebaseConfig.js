// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNdtYxDOU9BTCoGIpt-GImBj6abSwLSlU",
  authDomain: "oteloby.firebaseapp.com",
  projectId: "oteloby",
  storageBucket: "oteloby.appspot.com",
  messagingSenderId: "799689385194",
  appId: "1:799689385194:web:e13e7b2fd4196d12c26393"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);


export default app;