import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getUserDetails, loginUser } from "./UserService";
import { FIRESTORE_DB } from "@/FirebaseConfig";

type User = {
  email: string;
  password: string;
  promoCode: string;
  verifyCode: string;
};

let users: User[] = []; // Mock user data

export const register = (email: string, password: string, promoCode: string, verifyCode:string): User => {
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  const newUser: User = { email, password, promoCode, verifyCode };
  users.push(newUser);
  return newUser;
};

export const login = async (email: string, password: string) => {
  const staticEmail = 'test@gmail.com';
  const staticPassword = '123456';
  const staticToken = 'static_token_123';

  // Check if the email and password match the static credentials
  if (email === staticEmail && password === staticPassword) {
    return { token: staticToken }; // Return a static token on successful login
  } else {
    throw new Error('Invalid email or password'); // Throw an error for incorrect credentials
  }
};

export const handleLogin = async (email: string, password: string) => {
  const user = await loginUser(email, password);
  
  if (user) {
    const userDetails = await getUserDetails(user.uid);
    if (userDetails) {
      console.log("Retrieved user details:", userDetails);
      // Here you can store user details in state/context or navigate to another screen
    }
  }
};

export const logout = (): void => {
  // Simulate logout logic
};


export const findUserByPromoCode = async (promoCode: string) => {
  try {
    // Step 1: Create a query to find a user with the specified promo_code
    const usersCollection = collection(FIRESTORE_DB, 'users');
    const q = query(usersCollection, where('promo_code', '==', promoCode));

    // Step 2: Execute the query and get the snapshot
    const querySnapshot = await getDocs(q);

    // Step 3: Check if any document matches the promo_code
    if (querySnapshot.empty) {
      console.log('No user found with the given promo code.');
      return null;
    }

    // Step 4: If a user is found, return the first result (assuming promo_code is unique)
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    console.log('User found:', userData);
    return userData;

  } catch (error) {
    console.error('Error finding user by promo code:', error);
    throw new Error('Error finding user by promo code');
  }
};


export const ensureTeamExists = async (userId: string, newMemberId: string) => {
  // Reference to the team document for the specific user
  const teamDocRef = doc(FIRESTORE_DB, 'teams', userId);

  // Check if the team document already exists
  const docSnapshot = await getDoc(teamDocRef);

  if (!docSnapshot.exists()) {
    // If the document doesn't exist, create a new one with default values
    const newTeamData = {
      totalDeposit: 0,
      profit: 0,
      totalDepositors: 0,
      teamMembers: [newMemberId] // Initialize with the new member as the first team member
    };

    await setDoc(teamDocRef, newTeamData);
    console.log("New team created with default values and initial team member.");
  } else {
    // If the document exists, add the new member to the teamMembers array
    await updateDoc(teamDocRef, {
      teamMembers: arrayUnion(newMemberId) // arrayUnion ensures no duplicates in Firestore array fields
    });
    console.log(`Team member ${newMemberId} added to existing team.`);
  }
};



export const addTeamMember = async (userId: string, newMemberId: string) => {
  const teamDocRef = doc(FIRESTORE_DB, 'teams', userId);

  await updateDoc(teamDocRef, {
    teamMembers: arrayUnion(newMemberId)
  });

  console.log(`User ${newMemberId} added to team ${userId}`);
};


