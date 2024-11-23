import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { create } from 'zustand'

interface WalletStore {
  balance: DocumentData | undefined,
  setBalance: (balance: DocumentData | undefined) => void,
}

export const useWalletStore = create<WalletStore>((set) => ({
    balance: undefined,
    setBalance: (balance) => set((state) => ({balance})),
}));

