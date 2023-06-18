import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../screens/common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const [email, setEmail] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getAsync();
  }, []);
  const getAsync = async () => {
    const email = await AsyncStorage.getItem('EMAIL');

    setEmail(email);
  };
  const clearAllData = () => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => navigation.navigate('SelectLogin'));
  };

  return (
    <View style={styles.container}>
      <Header title={'Profile'} />

      <View
        style={{
          marginHorizontal: '5%',
          marginVertical: '5%',
          paddingVertical: '3%',
          borderBottomWidth: 0.5,
          borderBottomColor: 'grey',
        }}>
        <Text style={{fontSize: 15, color: 'grey'}}>Email</Text>
        <Text style={{fontSize: 20, color: 'black'}}>{email}</Text>
      </View>

      <View
        style={{
          flex: 1,
          marginBottom: '10%',
          justifyContent: 'flex-end',
          //    backgroundColor: 'red'
        }}>
        {/* <TouchableOpacity style={[styles.TouchableOpacityButton,
                { backgroundColor: 'red', marginBottom: '5%' }]}
                    onPress={() => navigation.navigate("AdminOrderHistory")}>
                    <Text style={styles.textButton}>Order History</Text>
                </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.TouchableOpacityButton}
          onPress={() => {
            clearAllData();
          }}>
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  textView: {
    alignItems: 'center',
    marginTop: '20%',
  },
  text: {
    fontSize: 60,

    color: 'red',
  },
  orderItem: {
    width: '90%',

    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemView: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 20,
    marginTop: 5,
  },
  TouchableOpacityButton: {
    alignItems: 'center',
    paddingVertical: '3%',
    marginHorizontal: '15%',
    borderRadius: 10,
    backgroundColor: 'olive',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Header from '../screens/common/Header';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';

// const Profile = () => {
//     const [email, setEmail] = useState();
//     const navigation = useNavigation();
//     useEffect(() => {
//         getAsync();
//     }, []);
//     const getAsync = async () => {
//         const email = await AsyncStorage.getItem('EMAIL');
//         console.log(email)
//         setEmail(email)
//     };
//     const clearAllData = () => {
//         AsyncStorage.getAllKeys()
//             .then(keys => AsyncStorage.multiRemove(keys))
//             .then(() => navigation.navigate('SelectLogin'));
//     }

//     return (
//         <View style={styles.container}>
//             <Header title={'Profile'} />

//             <View style={styles.textView}>
//                 <Text style={styles.text}>{email}</Text>
//             </View>
//             <View style={{ justifyContent: 'flex-end' }}>

//                 <TouchableOpacity style={styles.TouchableOpacityButton}
//                     onPress={() => { clearAllData() }}>
//                     <Text style={styles.textButton}>Logout</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default Profile;
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     textView: {
//         alignItems: 'center',
//         marginTop: '20%'
//     },
//     text: {
//         fontSize: 30,
//         color: 'red'
//     },
//     orderItem: {
//         width: '90%',

//         borderRadius: 10,
//         elevation: 5,
//         alignSelf: 'center',
//         backgroundColor: '#fff',
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     itemImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 10,
//     },
//     itemView: {
//         margin: 10,
//         width: '100%',
//         flexDirection: 'row',
//     },
//     nameText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#000',
//         marginLeft: 20,
//         marginTop: 5,
//     },
//     TouchableOpacityButton: {
//         alignItems: 'center',
//         paddingVertical: '3%',
//         marginHorizontal: '15%',
//         borderRadius: 30,
//         backgroundColor: '#84c000',
//         marginTop: '80%'

//     },
//     textButton: {
//         fontSize: 20,
//         color: 'white'
//     }
// });
