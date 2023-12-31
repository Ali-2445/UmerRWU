import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo1 from './common/Logo1';
import {ScrollView} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = async () => {
    const users = await firestore().collection('admin').get();
    console.log(users);
    if (
      email == users.docs[0]?._data.email &&
      password == users.docs[0]?._data.password
    ) {
      await AsyncStorage.setItem('EMAIL', email);
      // goToNextScreen(
      //   querySnapshot.docs[0]._data.userId,
      //   querySnapshot.docs[0]._data.mobile,
      //   querySnapshot.docs[0]._data.name,
      // );
      navigation.navigate('Dashboard');
    } else {
      alert('wrong email/pass');
    }
  };

  // const goToNextScreen = async (userId, mobile, name) => {
  //   await AsyncStorage.setItem('EMAIL', email);
  //   await AsyncStorage.setItem('USERID', userId);
  //   await AsyncStorage.setItem('MOBILE', mobile);
  //   await AsyncStorage.setItem('NAME', name);
  //   navigation.navigate('Dashboard');
  // };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Admin Login</Text> */}
      <ScrollView>
        <Logo1 />
        <TextInput
          style={styles.inputStyle}
          placeholder={'Enter Email Id'}
          value={email}
          placeholderTextColor={'grey'}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholderTextColor={'grey'}
          placeholder={'Enter Password '}
          value={password}
          onChangeText={txt => setPassword(txt)}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (email !== '' && password !== '') {
              adminLogin();
            } else {
              alert('Please Enter Data');
            }
          }}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'grey',
    marginTop: 100,
    alignSelf: 'center',
    marginBottom: '30%',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    color: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#fff',
  },
  loginBtn: {
    backgroundColor: 'olive',
    paddingVertical: '3%',
    marginHorizontal: '15%',
    // width: '90%',
    // height: 50,
    //  alignSelf: 'center',
    borderRadius: 10,
    marginTop: '20%',
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
