import { create } from 'zustand';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AccountStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (_credentials) => {
    // Mocking login call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      user: { id: 'usr_1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      isAuthenticated: true
    });
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  register: async (data) => {
    // Mocking register call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      user: { id: 'usr_new', firstName: data.firstName || 'New', lastName: data.lastName || 'User', email: data.email },
      isAuthenticated: true
    });
  }
}));
