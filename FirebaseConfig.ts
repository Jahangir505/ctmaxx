import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfVXt15Ws5RKs10nLeYtKAmKAjDdj6y3g",
  authDomain: "ctmaxx-f47da.firebaseapp.com",
  projectId: "ctmaxx-f47da",
  storageBucket: "ctmaxx-f47da.appspot.com",
  messagingSenderId: "1985245362",
  appId: "1:1985245362:web:d214d234ecdce8de0759ab"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export instances to use in other parts of the app
export const FIRESTORE_DB = getFirestore(app);
export default app;
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);