import { doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FIRESTORE_DB } from '@/FirebaseConfig';

export const getUserDetails = async (userId: string) => {
  try {
    const userDocRef = doc(FIRESTORE_DB, 'users', userId); // Assuming 'users' is the collection name
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User details:", userDoc.data());
      return userDoc.data(); // Returns user details
    } else {
      console.log("No such user found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details: ", error);
    return null;
  }
};



export const loginUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user; // This contains user info, but not profile details
  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

