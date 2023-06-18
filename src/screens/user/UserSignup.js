import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Loader from '../common/Loader';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Logo1 from '../common/Logo1';
import {ScrollView} from 'react-native-gesture-handler';
const UserSignup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const saveUser = () => {
    setModalVisible(true);
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
        cart: [],
      })
      .then(res => {
        setModalVisible(false);
        navigation.goBack();
      })
      .catch(error => {
        setModalVisible(false);
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Logo1 />
        <TextInput
          style={styles.inputStyle}
          placeholder={'Enter Name'}
          value={name}
          placeholderTextColor={'grey'}
          onChangeText={txt => setName(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={'Enter Email Id'}
          value={email}
          placeholderTextColor={'grey'}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={'Enter Mobile'}
          keyboardType={'number-pad'}
          placeholderTextColor={'grey'}
          value={mobile}
          onChangeText={txt => setMobile(txt)}
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
            if (
              email !== '' &&
              password !== '' &&
              name !== '' &&
              mobile !== ''
            ) {
              saveUser();
            } else {
              alert('Please Enter Data');
            }
          }}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView>
    </View>
  );
};

export default UserSignup;
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
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    color: 'grey',
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#fff',
  },
  loginBtn: {
    backgroundColor: 'olive',
    paddingHorizontal: '25%',
    height: 50,
    marginBottom: '3%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
