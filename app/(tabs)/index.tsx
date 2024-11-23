import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '@/services/contexts/AuthContext';
import AppNavigator from '@/components/navigation/AppNavigator';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
