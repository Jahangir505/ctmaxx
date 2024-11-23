// src/WalletUtils.ts

import { BigNumber, TronWeb } from 'tronweb';

export interface Wallet {
  address: string;
  privateKey: string;
}

// Initialize TronWeb
let tronWeb: TronWeb | null = null;

export const initializeTronWeb = (): TronWeb => {
  if (!tronWeb) {
    tronWeb = new TronWeb({
      fullHost: 'https://api.shasta.trongrid.io', // Shasta Testnet
    });
  }
  return tronWeb;
};

// Function to create a new wallet
export async function createWallet(): Promise<Wallet> {
  const tronWebInstance = initializeTronWeb();
  const account = await tronWebInstance.createAccount();
  return {
    address: account.address.base58,
    privateKey: account.privateKey,
  };
}

// Function to get TRC20 balance
export async function getTRC20Balance(address: string, contractAddress: string): Promise<string | null> {
  const tronWebInstance = initializeTronWeb();
  try {
    const contract = await tronWebInstance.contract().at(contractAddress);
    const balance: any = await contract.balanceOf(address).call(); // Use any to avoid type issues
    return balance instanceof BigNumber ? balance.toString() : null; // Convert to string
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
}

// Function to send TRC20 tokens
export async function sendTRC20Tokens(
  recipient: string,
  amount: number,
  privateKey: string,
  contractAddress: string
): Promise<string | null> {
  const tronWebInstance = initializeTronWeb();
  try {
    tronWebInstance.setPrivateKey(privateKey);
    const contract = await tronWebInstance.contract().at(contractAddress);
    const result = await contract.transfer(recipient, tronWebInstance.toSun(amount)).send();
    return result; // Returns transaction ID if successful
  } catch (error) {
    console.error("Error sending tokens:", error);
    return null;
  }
}
