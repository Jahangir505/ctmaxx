import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import CustomBottomAppbar from '../CustomBottomAppbar';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import TransactionList from '../data-list/TransactionList';
import CustomHeader from '../CustomHeader';
import { useWalletStore } from '@/store/wallet';
import { useUserStore } from '@/store/store';

type MyWalletScreenProps = {
    navigation: StackNavigationProp<any, any>; // Pass this from parent (App.tsx)
};

const MyWalletScreen: React.FC<MyWalletScreenProps> = ({ navigation }) => {
    const userDetails = useUserStore((state) => state.userDetails);
    const [amount, setAmount] = useState<string>('0')
    const [code, setCode] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [verifyCode, setVerifyCode] = useState<string>('')
    const balance = useWalletStore((state) => state.balance);
    return (
        <View style={styles.container}>
                <CustomHeader userName={userDetails?.firstName ?? "Username"} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Card style={styles.cardLeft}>
                        <Text style={styles.community}>Transfer</Text>
                        <Text style={{ fontSize: 14, color: "#ffffff" }}>My Wallet To Trading Wallet</Text>
                        <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: 5, gap: 15 }}>
                            <Text style={{ fontSize: 16, color: "#ffffff" }}>Amount:</Text>
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                mode="outlined"
                                style={{ width: 50, height: 30 }}
                            />
                            <Button><Text style={{ fontSize: 16, color: "#ffffff" }}>All</Text></Button>
                        </View>
                        <Button style={{ width: "50%", backgroundColor: "#FFCDD2", margin: "auto" }}>Confirmed</Button>
                        <Card.Content style={{ marginTop: 5 }}>
                            <View style={styles.assetRow}>
                                <Text style={styles.assetLabel}>My Asset:</Text>
                                <Text style={styles.assetValue}>{balance?.balance ?? 0} $</Text>
                            </View>
                            <View style={styles.assetRow}>
                                <Text style={styles.assetLabel}>My Available Balance:</Text>
                                <Text style={styles.assetValue}>{balance?.balance ?? 0} $</Text>
                            </View>
                            <View style={styles.assetRow}>
                                <Text style={styles.assetLabel}>My Widthdrawal Balance:</Text>
                                <Text style={styles.assetValue}>{balance?.balance ?? 0} $</Text>
                            </View>
                            <Button style={{ width: "80%", backgroundColor: "#C7A8CA", margin: "auto" }}>Withdraw</Button>
                        </Card.Content>
                        <Card.Content>
                            <Text style={{ color: "#ffffff", fontSize: 16, marginTop: 10 }}>My Payees Address</Text>
                            <TextInput
                                value={code}
                                onChangeText={setCode}
                                mode="outlined"
                                style={{ height: 30, marginTop: 10 }}
                                placeholder='YTC20'
                                autoFocus={false}
                            />
                            <TextInput
                                value={code}
                                onChangeText={setCode}
                                mode="outlined"
                                style={{ height: 30, marginTop: 10}}
                                placeholder='Widhdraw Amount'
                                autoFocus={false}
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                mode="outlined"
                                style={{ height: 30, marginTop: 10 }}
                                placeholder='Password'
                                secureTextEntry
                                autoFocus={false}
                            />
                            <TextInput
                                value={verifyCode}
                                onChangeText={setVerifyCode}
                                mode="outlined"
                                style={{ height: 30, marginTop: 10 }}
                                placeholder='Verify Code'
                                autoFocus={false}
                            />
                            <View style={{ marginTop: 10 }}>
                                <Button style={{ width: "80%", borderColor: "#F44336", borderWidth: 5, borderRadius: 10, backgroundColor: "#ffffff", margin: "auto" }}><Text style={{ color: "#810496", fontWeight: 900 }}>Apply</Text></Button>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Text style={styles.community}>My Wallet</Text>
                        <Card.Content>
                            <View style={styles.assetRow}>
                                <Text style={styles.assetLabel}>Today's Profilt:</Text>
                                <Text style={styles.assetValue}>05.00$</Text>
                            </View>
                            <View style={styles.assetRow}>
                                <Text style={styles.assetLabel}>Total Profilt:</Text>
                                <Text style={styles.assetValue}>50.52$</Text>
                            </View>
                        </Card.Content>
                        <Text style={styles.community}>See Date Wise</Text>
                        <TransactionList />
                    </Card>
                </View>
            </ScrollView>
            <CustomBottomAppbar navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f1629",
        paddingBottom: 80
    },
    scrollContainer: {
        paddingHorizontal: 10, // Add horizontal padding if needed
        paddingVertical: 5, // Add vertical padding if needed
    },

    section: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        textAlign: "left",
        fontSize: 20,
        color: "#ffffff",
        marginBottom: 20,
        borderRadius: 20
    },
    status: {
        backgroundColor: "#33028A",
        padding: 10,
        textAlign: "left",
        fontSize: 24,
        color: "#FAFF00",
        marginBottom: 20,
        width: "50%"

    },
    affliate: {
        backgroundColor: "#33028A",
        padding: 10,
        textAlign: "center",
        fontSize: 24,
        color: "#ffffff",
        marginBottom: 20
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardLeft:{
        width: "55%",
        backgroundColor: "transparent"
    },
    card: {
        backgroundColor: "#06314A01",
        width: "45%",
        borderColor: "#ffffff",
        borderLeftWidth:1,
        borderRadius:0,
        
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
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
    button: {
        marginTop: 20,
        padding: 10
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,

    },

    assetRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: "space-between",
    },
    assetLabel: {
        flex: 2,
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#03A9F4',
    },
    assetValue: {
        flex: 1,
        fontSize: 11,
        color: "#FAFF00",
    },
});

export default MyWalletScreen