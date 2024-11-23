// components/CustomHeader.tsx

import React from 'react';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { useUserStore } from '@/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type CustomHeaderProps = {
  userName: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ userName }) => {

  const handleSignOut = async () => {
    try {
      // Step 1: Sign out from Firebase Authentication
      await FIREBASE_AUTH.signOut();
  
      // Step 2: Clear user-related state from Zustand store
      useUserStore.getState().setUser(null);  // Clear user data in Zustand store
      useUserStore.getState().setUserDetails(undefined);  // Clear user details in Zustand store
      
      // Step 3: Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userToken');  // Clear stored user token (if stored)
      await AsyncStorage.removeItem('userData');   // Clear user-specific data if any
      
      // Step 4: Redirect to the login screen or any other screen
      const navigation = useNavigation();  // Adjust screen name as necessary
  
      console.log('User signed out and data cleared');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Appbar.Header style={styles.appbar}>
      <View style={styles.headerContent}>
        {/* User Avatar and Name */}
        <View style={styles.userContainer}>
          <Avatar.Icon size={56} icon="account" />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Logout Button */}
        <Appbar.Action iconColor='#ffffff' icon="logout" onPress={handleSignOut} />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'transparent', // Transparent background
    elevation: 0, // Remove shadow
    paddingHorizontal: 16, // Optional: Add some horizontal padding
    paddingVertical: 20,
    
  },
  headerContent: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between user and logout icons
    alignItems: 'center', // Center align vertically
    width: '100%', // Full width for spacing
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 8,
    fontSize: 16,
    color: 'white', // You can change the color based on your background
  },
});

export default CustomHeader;
