import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBottomAppbar from '../CustomBottomAppbar';
import CustomHeader from '../CustomHeader';
import { useUserStore } from '@/store/store';
import WalletScreen from '../WalletScreen';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/FirebaseConfig';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>; // Pass this from parent (App.tsx)
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
 
  const userDetails = useUserStore((state) => state.userDetails);
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  console.log(userDetails);


  const getUserDetails = async () => {
      const details = await getDoc(doc(FIRESTORE_DB, "users", user?.uid));
        setUserDetails(details.data());
        setUser(user);
  }

  useEffect(() => {
    getUserDetails();
  }, [user])
  

  return (
    <View style={styles.container}>
    {/* Header */}
    <CustomHeader userName={userDetails?.firstName ?? "Username"} />

    {/* Scrollable Content */}
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome {`${userDetails?.firstName ?? "Jhon"} ${userDetails?.lastName ?? "Due"}`}</Text>
        <Text style={styles.editText} onPress={() => navigation.navigate('EditProfile')}>
          Edit
        </Text>
      </View>

      {/* Profile Form */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <Text style={styles.label}>Account Status</Text>
            <Text style={styles.value}>{userDetails?.isVerify ? 'Verified' : 'Unverified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CTmaxx ID Status</Text>
            <Text style={styles.value}>Active</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Profile Rank</Text>
            <Text style={styles.value}>{userDetails?.rank}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Security</Text>
            <Text style={styles.value}>Email</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Setting</Text>
            <Text style={styles.value}>Profile/Account</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Help</Text>
            <Text style={styles.value}>Only Support Link to connect customer consultant</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Invite a friend</Text>
            <Text style={styles.value}>Own unique link</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.futureBox}>
        <Text style={styles.future}>Let's Make Future With CTmaxx.com</Text>
        <Button style={styles.deposit} onPress={() => console.log('Pressed')}>
          <Text style={{ fontSize: 30, padding: 10, fontWeight: "bold", color: "green" }}>For Deposit</Text>
        </Button>
      </View>
    {/* <WalletScreen /> */}
    </ScrollView>

    {/* Fixed Footer */}
    <CustomBottomAppbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingBottom: 80,
    backgroundColor: "#0f1629",
  },
  scrollContainer: {
    paddingHorizontal: 20, 
    paddingVertical: 10, 
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editText: {
    color: '#ffffff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  card: {
    padding: 10,
    backgroundColor: "transparent",
    elevation: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: "space-between",
  },
  futureBox: {
    marginTop: 40,
    textAlign: "center",
  },
  future: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#03A9F4',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: "#FAFF00",
  },
  deposit: {
    width: 218,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    margin: "auto",
  },
});

export default HomeScreen;
