import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type CustomBottomAppbarProps = {
  navigation: StackNavigationProp<any, any>;
};

type ButtonWithLablProps = {
  icon: string,
  label: string,
  onPress: any
}

const CustomBottomAppbar: React.FC<CustomBottomAppbarProps> = ({ navigation }) => {
  return (
    <Appbar style={styles.appbar}>
      <View style={styles.container}>
        <ButtonWithLabel
          icon="home"
          label="Home"
          onPress={() => navigation.navigate('Home')}
        />
        <ButtonWithLabel
          icon="account-cog"
          label="Customer Service"
          onPress={() => navigation.navigate('CustomerService')}
        />
        <ButtonWithLabel
          icon="wallet-plus"
          label="Trading Wallet"
          onPress={() => navigation.navigate('TradingWallet')}
        />
        <ButtonWithLabel
          icon="wallet"
          label="My Wallet"
          onPress={() => navigation.navigate('MyWallet')}
        />
        <ButtonWithLabel
          icon="account-group"
          label="My Community"
          onPress={() => navigation.navigate('MyCommunity')}
        />
      </View>
    </Appbar>
  );
};

const ButtonWithLabel: React.FC<ButtonWithLablProps> = ({ icon, label, onPress }) => (
  <View style={styles.buttonContainer}>
    <IconButton icon={icon} onPress={onPress} />
    <Text style={styles.buttonLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff', // Adjust as necessary
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: -15
  },
});

export default CustomBottomAppbar;
