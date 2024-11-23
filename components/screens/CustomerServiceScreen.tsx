import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text, Avatar } from 'react-native-paper';
import CustomBottomAppbar from '../CustomBottomAppbar';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomHeader from '../CustomHeader';
import { useUserStore } from '@/store/store';

type CustomerServiceScreenProps = {
    navigation: StackNavigationProp<any, any>; // Pass this from parent (App.tsx)
  };

const CustomerServiceScreen: React.FC<CustomerServiceScreenProps> = ({navigation}) => {
  // State to hold profile data
  const userDetails = useUserStore((state) => state.userDetails);
  

  return (
   <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CustomHeader userName={userDetails?.firstName ?? "Username"} />
        <Text style={styles.sectionTitle}>Customer Service</Text>
        <Card style={{paddingVertical:30}}>
            <Card.Content>
                <Text style={styles.text}>***Click here to connect out support team to get help.</Text>
                <Text style={styles.text}>***Click here to join our what'sapp group for getting customer consultant's support---</Text>
                <Text style={styles.text}>***If you would like to connect through e-mail. click here</Text>
            </Card.Content>
        </Card>
      {/* Profile Form */}
    </ScrollView>
     <CustomBottomAppbar navigation={navigation} />
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
    backgroundColor: '#0f1629',
  },

  scrollContainer: {
    paddingHorizontal: 10, // Add horizontal padding if needed
    paddingVertical: 5, // Add vertical padding if needed
},
 
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: "#ffffff",
    textAlign: "center",
  },
  text:{
    fontSize: 20,
    paddingVertical:20
  }
});

export default CustomerServiceScreen;
