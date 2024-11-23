import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text, Avatar } from 'react-native-paper';
import CustomBottomAppbar from '../CustomBottomAppbar';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomHeader from '../CustomHeader';
import { useUserStore } from '@/store/store';
import saveData, { updateData } from '@/services/storageService';
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/FirebaseConfig';

type EditScreenProps = {
  navigation: StackNavigationProp<any, any>; // Pass this from parent (App.tsx)
};
const EditProfileScreen: React.FC<EditScreenProps> = ({navigation}) => {
  const user = useUserStore((state) => state.user);
  const userDetails = useUserStore((state) => state.userDetails);
  // State to hold profile data
  const [firstName, setFirstName] = useState<string>(userDetails?.firstName ?? 'John');
  const [lastName, setLastName] = useState<string>(userDetails?.lastName ?? 'Doe');
  const [email, setEmail] = useState<string>(user?.email ?? 'john.doe@example.com');
  const [address, setAddress] = useState<string>(userDetails?.address ?? '123 Main St');
  const [phone, setPhone] = useState<string>(userDetails?.phone ?? '123-456-7890');
  const [walletAddress, setWalletAddress] = useState<string>(userDetails?.walletAddress ?? 'TBvKhyYiUdBQc8A4k3rvVHZwxmj81Jbjeh');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const washingtonRef = doc(FIRESTORE_DB, "users", user?.uid);
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  // Function to handle form submission
  const handleSaveChanges = async () => {
    alert("Work Well!")
    // Here, you'd typically make an API call to save changes
    const data = await updateData(washingtonRef, {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
      isVerify: true,
      walletAddress:walletAddress
    });

    if(user) {
      const details = await getDoc(doc(FIRESTORE_DB, "users", user?.uid));
        const data:DocumentData | undefined = details.data();
        console.log("details", details.data());
        setUserDetails(data);
    }
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <CustomHeader userName={userDetails?.firstName ?? "Username"} />

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <Text style={styles.label}>First Name</Text>
            <TextInput value={firstName} onChangeText={setFirstName} mode="outlined" style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput value={lastName} onChangeText={setLastName} mode="outlined" style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <TextInput value={user?.email ?? email} onChangeText={setEmail} mode="outlined" style={styles.input} disabled />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput value={address} onChangeText={setAddress} mode="outlined" style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <TextInput value={phone} onChangeText={setPhone} mode="outlined" keyboardType="phone-pad" style={styles.input} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wallet Address</Text>
            <TextInput value={walletAddress} onChangeText={setWalletAddress} mode="outlined" style={styles.input} />
          </View>

          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Old Password</Text>
            <TextInput value={oldPassword} onChangeText={setOldPassword} mode="outlined" secureTextEntry style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>New Password</Text>
            <TextInput value={newPassword} onChangeText={setNewPassword} mode="outlined" secureTextEntry style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput value={confirmPassword} onChangeText={setConfirmPassword} mode="outlined" secureTextEntry style={styles.input} />
          </View>

          {/* Save Changes Button */}
          <Button mode="contained" onPress={handleSaveChanges} style={styles.button}>
            <Text style={styles.buttonText}>Save Change</Text>
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>

    <CustomBottomAppbar navigation={navigation} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
    backgroundColor: "#0f1629",
  },
  scrollContainer: {
    paddingHorizontal: 20, 
    paddingVertical: 10,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 2,
    height: 35,
    fontSize: 14,
    paddingVertical: 5,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText:{
    color: "#ffffff"
  }
});

export default EditProfileScreen;
