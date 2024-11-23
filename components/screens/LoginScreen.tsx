import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { handleLogin, login } from '@/services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

type LoginScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('test@gmail.com');
  const [password, setPassword] = useState<string>('123456');
  const [error, setError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;

  const validateFields = () => {
    // Check if the fields are empty
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }

    // Check if the email format is valid
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return false;
    }

    return true;
  };


  const signIn = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth,email, password);
      console.log(response)
    }catch(error:any) {
      console.log(error);
      alert('Login Faild: ' + error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", color: "#ffffff", padding: 20, fontSize: 40, fontWeight: 800 }}>Login Page</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email/Phone Number**</Text>
          <TextInput
            label=""
            value={email}
            onChangeText={setEmail}
            mode="outlined"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Password**</Text>
          <TextInput
            label=""
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
          />
        </View>
        
        {/* Remember Me Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <Text style={{ color: "#cccccc" }}>Remember Me</Text>
        </View>
        {/* Display error message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color={"#ffffff"} />
        ) : (
          <Button mode="contained" onPress={signIn} style={styles.button}>
          <Text style={{color: "#ffffff", fontSize: 20}}>Login</Text>
        </Button>
        )}
       
        {/* Forgot Password and Register Links inline */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>New Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0f1629"
  },
  formContainer: {
    width: '100%',
    padding: 30,
    backgroundColor: '#06314970', // Form background color
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
    height: 60,
    justifyContent: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordLink: {
    color: '#cccccc',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  linkContainer: {
    flexDirection: 'row', // Display links inline
    justifyContent: 'space-between',
    marginTop: 15,
  },
  linkText: {
    color: '#cccccc',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
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
    display: "flex",
    fontSize: 40,
    padding: 10,
    width: "50%",
    margin: "auto"
  },
  link: {
    marginTop: 10,
    color: "#fcfcfc"
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
