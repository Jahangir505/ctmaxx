import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text, Avatar } from 'react-native-paper';

const EditProfileScreen: React.FC = () => {
  // State to hold profile data
  const [firstName, setFirstName] = useState<string>('John');
  const [lastName, setLastName] = useState<string>('Doe');
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <Avatar.Text size={100} label={`${firstName[0]}${lastName[0]}`} />
      </View>

      {/* Profile Form */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <Text style={styles.label}>Account Status</Text>
            <Text style={styles.input}>Account Status</Text>
          </View>

          
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    padding: 10,
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
    height: 35, // Adjust height for smaller input box
    fontSize: 14, // Adjust font size for smaller text
    paddingVertical: 5,
  },
  button: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default EditProfileScreen;
