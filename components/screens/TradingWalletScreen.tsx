import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CustomBottomAppbar from '../CustomBottomAppbar';
import { ActivityIndicator, Button, Card, Icon, Snackbar, TextInput } from 'react-native-paper';
import CustomHeader from '../CustomHeader';
import saveData, { deposit, updateData } from '@/services/storageService';
import { useUserStore } from '@/store/store';
import { FIRESTORE_DB } from '@/FirebaseConfig';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useWalletStore } from '@/store/wallet';

type MyCommunityScreenProps = {
    navigation: StackNavigationProp<any, any>; // Pass this from parent (App.tsx)
};

const TradingWalletScreen: React.FC<MyCommunityScreenProps> = ({ navigation }) => {
    const [amount, setAmount] = useState<string>('0');
    const userDetails = useUserStore((state) => state.userDetails);
    const previousEntry = doc(FIRESTORE_DB, "wallets", userDetails?.id);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const balance = useWalletStore((state) => state.balance);
    const setBalance = useWalletStore((state) => state.setBalance);


    const handleDipositAmount = async () => {


        setLoading(true);
        const data = await deposit(userDetails?.walletAddress,Number(amount), userDetails?.id);
        console.log(balance);
        setLoading(false);
        setAmount("0");
        setShowSuccess(true);
        getData();
        navigation.navigate("MyWallet")
        

    };

    const getData = async () => {
        const details = await getDoc(doc(FIRESTORE_DB, "users", userDetails?.id));
        const data: DocumentData | undefined = details.data();
        console.log("details", data);
        setBalance(data);
    }       

    useEffect(() => {
        
        getData();
    }, [userDetails])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <CustomHeader userName={userDetails?.firstName ?? "Username"} />
                <ScrollView style={styles.scrollView}>
                    <Card style={styles.card}>
                        <Text style={styles.community}>Trading Wallet</Text>
                        <Card.Content>
                            <Text style={styles.status}>Transfer</Text>
                            <View style={styles.transfer}>
                                <Text style={styles.affliate}>Trading Wallet</Text>
                                <Text style={{ marginTop: -20 }}><Icon source="swap-horizontal-bold" size={44} color='#ffffff' /></Text>
                                <Text style={styles.affliate}>My Wallet</Text>
                            </View>

                            <View style={styles.amountRow}>
                                <Text style={styles.amountLabel}>Transfer Amount:</Text>
                                <TextInput
                                    value={amount}
                                    onChangeText={setAmount}
                                    mode="outlined"
                                    style={styles.amountInput}
                                />

                            </View>
                            {loading ? (
                                <ActivityIndicator size="large" color={"#ffffff"} />
                            ) : (
                                <Button style={styles.deposit} onPress={handleDipositAmount}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>Confirmed</Text>
                                </Button>
                            )}

                        </Card.Content>


                    </Card>
                    <Snackbar
                        duration={3000}
                        style={styles.snackbar}
                        visible={showSuccess}
                        onDismiss={() => setShowSuccess(false)}
                        action={{
                            label: 'Close',
                            onPress: () => {
                                setShowSuccess(false)
                            },
                        }}>
                        Diposit Successfully added!.
                    </Snackbar>
                </ScrollView>
                
                <CustomBottomAppbar navigation={navigation} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#0f1629",
        justifyContent: "center"
    },
    scrollView: {

    },
    text: {
        fontSize: 42,
        padding: 12,
    },

    card: {
        padding: 10,
        backgroundColor: "#06314A50"
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    transfer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: "center",
    },

    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 35,
        backgroundColor: "#ffffff",
        borderRadius: 5
    },
    amountLabel: {
        flex: 3,
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    amountInput: {
        backgroundColor: "#ffffff",
        flex: 2,
        height: 35, // Adjust height for smaller input box
        fontSize: 14, // Adjust font size for smaller text
        paddingVertical: 5,
        borderColor: "#ffffff"
    },
    bottomItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        backgroundColor: "#ffffff",
        padding: 5,
        textAlign: "center",
        fontSize: 18,
        color: "#000000",
        margin: 2,
        borderRadius: 5
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        backgroundColor: "#ffffff45",
        padding: 5,
        color: "#ffffff"
    },
    values: {
        flex: 2, // Adjust height for smaller input box
        fontSize: 16, // Adjust font size for smaller text
        backgroundColor: "#ffffff45",
        padding: 5,
        borderRadius: 10,
        color: "#ffffff"
    },
    geologic: {
        backgroundColor: "#810496",
        padding: 10,
        textAlign: "center",
        fontSize: 24,
        color: "#ffffff",
        marginBottom: 20
    },
    community: {
        padding: 10,
        textAlign: "center",
        fontSize: 35,
        color: "#ffffff",
        marginBottom: 20,
        borderRadius: 20
    },
    status: {
        backgroundColor: "#04165F",
        padding: 10,
        textAlign: "center",
        fontSize: 24,
        color: "#ffffff",
        marginBottom: 20,
        width: "50%",
        margin: "auto"

    },
    affliate: {
        backgroundColor: "#04090A50",
        padding: 10,
        textAlign: "center",
        fontSize: 18,
        color: "#ffffff",
        marginBottom: 20,

    },
    deposit: {
        width: 180,
        height: 62,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#ffffff",
        margin: "auto",
    },
    snackbar: {
        backgroundColor: '#4caf50',  // Green background for success
    },
});

export default TradingWalletScreen;