import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { create } from 'zustand'

interface UserStore {
  user: User | null,
  userDetails: DocumentData | undefined,
  setUserDetails: (userDetails: DocumentData | undefined) => void,
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  userDetails: undefined,
  setUserDetails: (userDetails) => set((state) => ({userDetails})),
  setUser: (user) => set((state) => ({ user })),
}));

