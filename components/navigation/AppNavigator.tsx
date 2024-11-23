import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '@/services/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfileScreen from '../screens/EditProfileScreen';
import MyCommunityScreen from '../screens/MyCommunityScreen';
import TradingWalletScreen from '../screens/TradingWalletScreen';
import MyWalletScreen from '../screens/MyWalletScreen';
import CustomerServiceScreen from '../screens/CustomerServiceScreen';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/FirebaseConfig';
import { useStore } from 'zustand';
import { useUserStore } from '@/store/store';
import { doc, DocumentData, getDoc } from 'firebase/firestore';

const Stack = createStackNavigator();
const InsideStack = createStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="Home" >
      <InsideStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="MyCommunity" component={MyCommunityScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="MyWallet" component={MyWalletScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="TradingWallet" component={TradingWalletScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="CustomerService" component={CustomerServiceScreen} options={{ headerShown: false }} />
    </InsideStack.Navigator>
  )
}

const AppNavigator: React.FC = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const userDetails = useUserStore((state) => state.userDetails);
  const setUserDetails = useUserStore((state) => state.setUserDetails);

  useEffect(() => {  
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      console.log('User', user?.uid);
      if(user?.uid) {
        const details = await getDoc(doc(FIRESTORE_DB, "users", user?.uid));
        const data:DocumentData | undefined = details.data();
        console.log("details", details.data());
        setUserDetails(data);
      }
      setUser(user);
    })
  }, []);


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login" >
        {user ? <Stack.Screen
          name="Inside"
          component={InsideLayout}
          options={{ headerShown: false }}
        /> : <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />}

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
