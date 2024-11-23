import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { ensureTeamExists, findUserByPromoCode, register } from '@/services/AuthService';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import saveData from '@/services/storageService';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUserStore } from '@/store/store';



type RegisterScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const generateReferralCode = (userId: string): string => {
  return `REF-${userId.substring(0, 6).toUpperCase()}`;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const userDetails = useUserStore((state) => state.userDetails);
  const [email, setEmail] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;


  if (userDetails?.firstName !== undefined) {
    navigation.navigate("Home");
  }

  const validateFields = () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }


    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

 


  const handleSignUp = async () => {
    if (!validateFields()) {
      return;
    }
  
    try {
      // Step 1: Create User with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const userId = userCredential.user.uid;
  
      // Step 2: Generate unique referral code for the new user
      const referralCode = generateReferralCode(userId);
      const promo_code = promoCode;
      // Step 3: Check if a referral code was used
      let referredBy = null;
      let referredById = null;
      if (promo_code) {
        // Check if the provided referral code is valid
        const referrerSnapshot:any = await findUserByPromoCode(promo_code);
        console.log("referrerSnapshot", referrerSnapshot);
        
        if (referrerSnapshot) {
          referredBy = promo_code;
          referredById = referrerSnapshot;
         
        } else {
          alert("Invalid referral code.");
        }
      }
      await ensureTeamExists(referredById, userId);
      // Step 4: Save the user data to Firestore
      const newUserData = {
        promo_code: referralCode,
        verify_code: verifyCode,
        email,
        id: userId,
        isVerify: false,
        status: "Active",
        rank: "EL",
        firstName: email,
        referredBy: referredBy || null,
        createdAt: new Date(),
        totalDeposit: 0,
        totalProfit: 0,
        balance: 0,
      };
  
      await saveData('users', newUserData);
  
      // Step 5: Update referring user's data if there's a referral
      if (referredBy) {
        await updateDoc(doc(FIRESTORE_DB, 'users', referredById.id), {
          referrals: [ ...(referredById?.referrals || []), userId ]
        });
      }
  
      // Step 6: Navigate to Home and show success message
      navigation.navigate("Inside");
      setSuccessMessageVisible(true);
  
    } catch (error: any) {
      console.error('Error creating user:', error);
      alert('Error:' + error.message);
    }
  };
  // const handleSignUp = () => {
  //   setError('');
  //   if (!validateFields()) {
  //     return;
  //   }

  //   alert("Sign up button clicked!")
  //   try {
  //     register(email, password, promoCode, verifyCode);
  //     setTimeout(() => {

  //       navigation.navigate('Login');
  //     }, 1500)
  //   } catch (e: any) {
  //     setError(e.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.back} onPress={() => navigation.navigate("Inside")}>Back</Text>
      <ScrollView>
        <KeyboardAvoidingView behavior='padding'>
          <Text style={{ textAlign: "center", padding: 10, fontSize: 40, fontWeight: 800, color: '#ffffff' }}>New Register</Text>
          <View style={styles.formContainer}>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Promo Code</Text>
              <TextInput
                label=""
                value={promoCode}
                onChangeText={setPromoCode}
                mode="outlined"
                autoComplete='off'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Email *</Text>
              <TextInput

                value={email}
                onChangeText={setEmail}
                mode="outlined"
                autoComplete='off'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Verification Code*</Text>
              <TextInput

                value={verifyCode}
                onChangeText={setVerifyCode}
                mode="outlined"
                autoComplete='off'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Password</Text>
              <TextInput

                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                autoComplete='off'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput

                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                secureTextEntry
                autoComplete='off'
              />
            </View>




            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {loading ? (
              <ActivityIndicator size="large" color={"#ffffff"} />
            ) : (
              <>
                <Button mode="contained" onPress={handleSignUp} style={styles.button}>
                  <Text style={{ fontSize: 20, color: "#ffffff" }}>Submit</Text>
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link}>Already have an account? Login</Text>
                </TouchableOpacity>
              </>
            )}


          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar
        visible={successMessageVisible}
        onDismiss={() => setSuccessMessageVisible(false)}
        duration={1500}  // Snackbar will auto-dismiss after 1.5 seconds
        style={styles.snackbar}
      >
        Registration successful! Redirecting to login...
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "#0f1629"
  },

  formContainer: {
    width: '100%',
    padding: 30,
    backgroundColor: '#063149', // Form background color
    borderRadius: 10,
    elevation: 3, // For shadow effect (Android)
    shadowColor: '#000', // For shadow effect (iOS)
    shadowOffset: { width: 0, height: 2 }, // For shadow effect (iOS)
    shadowOpacity: 0.25, // For shadow effect (iOS)
    shadowRadius: 3.84, // For shadow effect (iOS)
  },
  inputBox: {
    marginBottom: 15,
  },
  input: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#ffffff",
    marginBottom: 10
  },
  button: {
    marginTop: 20,
    backgroundColor: "#5b0a72",
    padding: 10,
    fontSize: 30,
    width: "50%",
    margin: "auto"
  },
  link: {
    marginTop: 10,
    color: "#cccccc"
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  snackbar: {
    backgroundColor: '#4caf50',  // Green background for success
  },
  back:{
    color: "#ffffff",
    width: 70,
    backgroundColor: "green",
    textAlign: "center",
    marginLeft: 10,
    padding: 6,
    borderRadius: 5
  }
});

export default RegisterScreen;
