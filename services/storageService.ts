// storageService.ts
import { FIRESTORE_DB } from '@/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { collection, addDoc, setDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { TronWeb } from 'tronweb';

// Example function to save data
const saveData = async (tableName: string, data: any) => {
  try {
    // const docRef = await addDoc(collection(FIRESTORE_DB, tableName), data);
    const docRef = await setDoc(doc(FIRESTORE_DB, tableName, data.id), data);;
    console.log("Document written with ID: ", docRef);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default saveData;

// Generic function to retrieve data
export const getData = async <T>(tableName: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${tableName}`);
    return jsonValue != null ? JSON.parse(jsonValue) as T : null;
  } catch (error) {
    console.error(`Error retrieving data from ${tableName}:`, error);
    return null;
  }
};

// Generic function to update specific fields in an object
export const updateData = async <T>(washingtonRef:any, updatedFields: any, ): Promise<void> => {
  try {
    const data = await updateDoc(washingtonRef, updatedFields);
    return data;
  } catch (error) {
    console.error(`Error updating data in:`, error);
  }
};

// Function to delete data
export const deleteData = async (tableName: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`@${tableName}`);
    console.log(`${tableName} data deleted!`);
  } catch (error) {
    console.error(`Error deleting data from ${tableName}:`, error);
  }
};

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.shasta.trongrid.io', // Testnet
  privateKey: '58e16d047a6cf84ca8d5a7c9c3a5ea2b4a6a61eb9d13379a8079105b81d2776d' // Replace with your test wallet's private key
});

/**
 * Get the TRX balance of a wallet.
 * @param {string} address - The TRON wallet address.
 * @returns {Promise<number>} - The wallet balance in TRX.
 */
export async function getBalance(address: string): Promise<number> {
  try {
    const balanceInSun = await tronWeb.trx.getBalance(address);
    const balanceInTRX = tronWeb.fromSun(balanceInSun); // Convert from Sun to TRX
    console.log(`Balance for address ${address}: ${balanceInTRX} TRX`);
    return Number(balanceInTRX);
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw new Error("Unable to fetch balance.");
  }
}

/**
 * Deposit TRX into a user's wallet.
 * @param {string} userAddress - TRON wallet address of the user.
 * @param {number} amount - Amount to deposit in TRX.
 * @param {string} id - Unique ID for the transaction.
 * @returns {Promise<string>} - The transaction ID.
 */
export async function deposit(userAddress: string, amount: number, id: string): Promise<string> {
  try {
    // Validate inputs
    if (!tronWeb.isAddress(userAddress)) {
      throw new Error('Invalid TRON wallet address.');
    }
    if (amount <= 0) {
      throw new Error('Deposit amount must be greater than zero.');
    }

    // Convert amount from TRX to Sun (smallest unit)
    const amountInSun = tronWeb.toSun(amount);

    // Send TRX
    const txResponse = await tronWeb.trx.sendTransaction("TLWRwjsyEAjAuF4q9yeTSGxxUcsscnS9e3", Number(amountInSun));
    console.log(txResponse);
    
    const txId = (txResponse as any)?.txID; // Type assertion to access txID
    // Extract transaction ID from response
    if (!txId) {
      throw new Error('Transaction failed. No transaction ID found.');
    }

    // Log the transaction
    const transaction: Transaction = {
      type: 'deposit',
      userAddress,
      amount,
      txId,
      id,
      timestamp: Date.now()
    };
    await saveTransaction(transaction);

    console.log(`Deposit successful! Transaction ID: ${txId}`);
    return txId;
  } catch (error) {
    console.error('Deposit error:', error);
    throw error;
  }
}

/**
 * Log transaction details to Firestore.
 * @param {Transaction} transaction - Transaction details to log.
 */
async function saveTransaction(transaction: Transaction): Promise<void> {
  try {
    await addDoc(collection(FIRESTORE_DB, 'transactions'), transaction);
    console.log('Transaction logged successfully:', transaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw new Error('Unable to log transaction.');
  }
}

/**
 * Transaction Interface
 */
interface Transaction {
  type: 'deposit' | 'withdraw';
  userAddress: string;
  amount: number;
  txId: string;
  timestamp: number;
  id: string;
}