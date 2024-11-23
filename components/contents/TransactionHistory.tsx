import { getTransactionHistory } from '@/services/transactionService';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const TransactionHistory = ({ userId }: { userId: string }) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactionHistory(userId);
      setTransactions(data);
    };

    fetchTransactions();
  }, [userId]);

  return (
    <View>
      <Text>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View>
            <Text>Type: {item.type}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Balance After: {item.balanceAfter}</Text>
            <Text>Date: {item.timestamp}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        keyExtractor={(item) => item.timestamp}
      />
    </View>
  );
};

export default TransactionHistory;
