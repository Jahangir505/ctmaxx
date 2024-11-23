// src/WalletScreen.tsx

import { createWallet, getTRC20Balance, sendTRC20Tokens, Wallet } from '@/utils/TronWallet';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const WalletScreen: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [contractAddress, setContractAddress] = useState<string>(''); // Enter the TRC20 contract address here
  const [balance, setBalance] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleCreateWallet = async () => {
    const newWallet = await createWallet();
    setWallet(newWallet);
  };

  const handleCheckBalance = async () => {
    if (!contractAddress || !wallet) {
      Alert.alert("Error", "Please enter a contract address and create a wallet.");
      return;
    }
    const walletBalance = await getTRC20Balance(wallet.address, contractAddress);
    setBalance(walletBalance);
  };

  const handleSendTokens = async () => {
    if (!recipient || !amount || !contractAddress || !wallet) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const txResult = await sendTRC20Tokens(recipient, Number(amount), wallet.privateKey, contractAddress);
    if (txResult) {
      Alert.alert("Success", `Transaction Successful! TX ID: ${txResult}`);
    } else {
      Alert.alert("Error", "Transaction Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TRC20 Wallet</Text>
      <Button title="Create Wallet" onPress={handleCreateWallet} />
      {wallet && (
        <View style={styles.walletInfo}>
          <Text>Address: {wallet.address}</Text>
          <Text>Private Key: {wallet.privateKey}</Text>
        </View>
      )}
      <TextInput
        placeholder="TRC20 Contract Address"
        value={contractAddress}
        onChangeText={setContractAddress}
        style={styles.input}
      />
      <Button title="Check Balance" onPress={handleCheckBalance} />
      {balance !== null && <Text>Balance: {balance} TRC20 Tokens</Text>}
      <TextInput
        placeholder="Recipient Address"
        value={recipient}
        onChangeText={setRecipient}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Send Tokens" onPress={handleSendTokens} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  walletInfo: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
});

export default WalletScreen;
