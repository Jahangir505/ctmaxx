import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already authenticated (e.g., by checking token in storage)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setIsAuthenticated(true);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login request (replace this with your authentication API logic)
    if (email === 'test@example.com' && password === 'password') {
      await AsyncStorage.setItem('userToken', 'some-auth-token'); // Save token
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
