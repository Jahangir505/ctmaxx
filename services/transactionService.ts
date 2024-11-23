import { FIRESTORE_DB } from '@/FirebaseConfig';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

// Function to log a deposit transaction
const logTransaction = async (userId: string, amount: number, type: 'deposit' | 'withdrawal') => {
  try {
    // Fetch the user data to get the balance after the transaction
    const userRef = doc(FIRESTORE_DB, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if (!userData) throw new Error("User not found!");

    let balanceAfter: number | string = "";

    // Update balance based on the transaction type
    if (type === 'deposit') {
      balanceAfter = userData.balance + amount;
    } else if (type === 'withdrawal') {
      if (userData.balance < amount) {
        throw new Error("Insufficient balance for withdrawal");
      }
      balanceAfter = userData.balance - amount;
    }

    // Log the transaction
    const transactionRef = await addDoc(collection(FIRESTORE_DB, 'transactions'), {
      userId,
      amount,
      type,
      timestamp: new Date().toISOString(),
      balanceAfter,
      status: 'success', // status can be 'pending', 'failed', or 'success' based on your logic
    });

    console.log("Transaction logged with ID:", transactionRef.id);

    // Update the user balance in the users collection
    // await updateDoc(userRef, { balance: balanceAfter });

  } catch (error) {
    console.error('Error logging transaction:', error);
  }
};

export const deposit = async (userId: string, amount: number) => {
    try {
      // Log the deposit transaction first
      await logTransaction(userId, amount, 'deposit');
  
      // You can also update the user's balance here if necessary
      const userRef = doc(FIRESTORE_DB, "users", userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (userData) {
        const newBalance = userData.balance + amount;
        await updateDoc(userRef, { balance: newBalance });
      }
      console.log(`Deposited ${amount} to ${userId}`);
    } catch (error) {
      console.error("Error depositing: ", error);
    }
  };

  
export  const withdraw = async (userId: string, amount: number) => {
    try {
      // Log the withdrawal transaction first
      await logTransaction(userId, amount, 'withdrawal');
  
      // Then, update the user's balance
      const userRef = doc(FIRESTORE_DB, "users", userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
  
      if (userData && userData.balance >= amount) {
        const newBalance = userData.balance - amount;
        await updateDoc(userRef, { balance: newBalance });
        console.log(`Withdrew ${amount} from ${userId}`);
      } else {
        console.error('Insufficient balance');
      }
    } catch (error) {
      console.error("Error withdrawing: ", error);
    }
  };

  export const getTransactionHistory = async (userId: string) => {
    try {
      const q = query(collection(FIRESTORE_DB, "transactions"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const transactions:any = [];
      querySnapshot.forEach((doc) => {
        transactions.push(doc.data());
      });
      console.log("Transactions:", transactions);
      return transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  
