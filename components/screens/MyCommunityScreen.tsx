import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { TextInput, Button, Card, Text, Avatar } from 'react-native-paper';
import CustomBottomAppbar from '../CustomBottomAppbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../CustomHeader';
import { useUserStore } from '@/store/store';

type MyCommunityScreenProps = {
    navigation: StackNavigationProp<any, any>; // Pass this from parent (App.tsx)
};
const MyCommunityScreen: React.FC<MyCommunityScreenProps> = ({ navigation }) => {
  const userDetails = useUserStore((state) => state.userDetails);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <CustomHeader userName={userDetails?.firstName ?? "Username"} />
                <Card style={styles.card}>
                    <Text style={styles.community}>My Community</Text>
                    <Card.Content>
                        <Text style={styles.status}>Rank Status</Text>
                        <Text style={styles.affliate}>My Affliate Members</Text>
                        <Text style={styles.geologic}>Geological Tree</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>1st Lavel</Text>
                            <Text
                                style={styles.values}
                            >One</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>2nd Lavel</Text>
                            <Text
                                style={styles.values}
                            >Two</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>3rd Lavel</Text>
                            <Text
                                style={styles.values}
                            >Three</Text>
                        </View>
                    </Card.Content>
                    <Card.Content>
                        <Text style={styles.affliate}>My Commission</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>1st Lavel</Text>
                            <Text
                                style={styles.values}
                            >15% Of 1st Level's Profit</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>2nd Lavel</Text>
                            <Text
                                style={styles.values}
                            >10% Of 1st Level's Profit</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>3rd Lavel</Text>
                            <Text
                                style={styles.values}
                            >05% Of 1st Level's Profit</Text>
                        </View>
                    </Card.Content>
                    <View style={styles.bottomItem}>
                        <Text style={styles.item}>My Rewards</Text>
                        <Text style={styles.item}>Sharing Code</Text>
                        <Text style={styles.item}>Invite Friend</Text>
                    </View>
                </Card>
            </ScrollView>
            <CustomBottomAppbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, // Replace flexGrow with flex to allow full-height layout
      paddingBottom: 70,
      backgroundColor: "#0f1629",
    },
    scrollContainer: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    geologic: {
      backgroundColor: "#810496",
      padding: 10,
      textAlign: "center",
      fontSize: 24,
      color: "#ffffff",
      marginBottom: 20,
    },
    community: {
      backgroundColor: "#FAFF00",
      padding: 10,
      textAlign: "center",
      fontSize: 35,
      color: "#0D47A1",
      marginBottom: 20,
      borderRadius: 20,
    },
    status: {
      backgroundColor: "#33028A",
      padding: 10,
      textAlign: "left",
      fontSize: 24,
      color: "#FAFF00",
      marginBottom: 20,
      width: "50%",
    },
    affliate: {
      backgroundColor: "#33028A",
      padding: 10,
      textAlign: "center",
      fontSize: 24,
      color: "#ffffff",
      marginBottom: 20,
    },
    card: {
      padding: 10,
      backgroundColor: "#06314A",
      marginVertical: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    bottomItem: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
    },
    item: {
      backgroundColor: "#ffffff",
      padding: 5,
      textAlign: "center",
      fontSize: 18,
      color: "#000000",
      margin: 5,
      borderRadius: 5,
    },
    label: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
      backgroundColor: "#ffffff45",
      padding: 5,
      color: "#ffffff",
    },
    values: {
      flex: 2,
      fontSize: 16,
      backgroundColor: "#ffffff45",
      padding: 5,
      borderRadius: 10,
      color: "#ffffff",
    },
  });
  
  

export default MyCommunityScreen;
