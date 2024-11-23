import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  { id: '1', date: '05-10-2023', amount: "05.00" },
  { id: '2', date: '09-10-2023', amount: "05.00" },
  { id: '3', date: '10-10-2023', amount: "09.33" },
  { id: '4', date: '15-05-2023', amount: "15.99" },
  { id: '5', date: '15-05-2023', amount: "15.99" },
  { id: '6', date: '15-05-2023', amount: "15.99" },
  { id: '7', date: '15-05-2023', amount: "15.99" },
  { id: '8', date: '15-05-2023', amount: "15.99" },
  { id: '9', date: '15-05-2023', amount: "15.99" },
  { id: '10', date: '15-05-2023', amount: "15.99" },
  { id: '11', date: '15-05-2023', amount: "15.99" },
];

const TransactionList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.date}</Text>
            <Text style={styles.subtitle}>{item.amount}$</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 6,
    gap:20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#D4A9DB",
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default TransactionList;
