import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);
  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const UserId = await AsyncStorage.getItem('USERID');
    console.log(email);
    if (email !== null && UserId != null) {
      navigation.navigate('Home');
    } else if (UserId == null && email != null) {
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('SelectLogin');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RWU Cafeteria</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  logo: {
    fontSize: 29,
    fontWeight: '800',
    color: 'white',
  },
});
