// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     PermissionsAndroid,
//     Image,
//     ScrollView,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
// import { ActivityIndicator, MD2Colors } from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { AirbnbRating, Rating } from 'react-native-ratings';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const ItemRatingOrderHistory = ({ navigation, route }) => {
//     const { item1, itemOrderPrice, itemOrderQuantity } = route.params;
//     const [wishlistIconGreen, setWishlistconGreen] = useState(false)
//     const [stateRating, setStateRating] = useState(0)

//     const onAddToCart = async (item, index) => {
//         console.log(item)
//         const user = await firestore().collection('users').doc(userId).get();
//         console.log(user._data.cart);
//         let tempDart = [];
//         tempDart = user._data.cart;
//         if (tempDart.length > 0) {
//             let existing = false;
//             tempDart.map(itm => {
//                 if (itm.id == item.id) {
//                     existing = true;
//                     itm.data.qty = itm.data.qty + 1;
//                 }
//             });
//             if (existing == false) {
//                 tempDart.push(item);
//             }
//             firestore().collection('users').doc(userId).update({
//                 cart: tempDart,
//             });
//         } else {
//             tempDart.push(item);
//         }
//         console.log(tempDart);
//         firestore().collection('users').doc(userId).update({
//             cart: tempDart,
//         });
//         alert('Item added in cart')
//         navigation.goBack()
//     };

//     const ratingAdd = async () => {

//         const userDetailItem = await firestore()
//             .collection('items').doc(item1.id)
//             .get();
//         const data = userDetailItem.data()
//         console.log(userDetailItem.id)
//         firestore().collection('items').doc(userDetailItem.id).update({
//             totalRating: stateRating + data.totalRating,
//             countNumberOfRate: data.countNumberOfRate + 1
//         });

//         alert('Rating done')
//         navigation.goBack()

//     }
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={{
//                 paddingHorizontal: '3%',
//                 paddingVertical: '2%',
//                 alignSelf: 'flex-start'
//             }} onPress={() => navigation.goBack()}>
//                 <AntDesign name="arrowleft" color="white" size={30} />
//             </TouchableOpacity>

//             <View style={{ marginBottom: '10%' }}>
//                 <View style={{ marginTop: '15%', marginHorizontal: '5%' }}>
//                     <Text style={{ fontSize: 30 }}>{item1.data.name}</Text>
//                 </View>
//                 <View style={{
//                     marginTop: '10%', marginHorizontal: '5%',
//                 }}>
//                     <Text style={{ fontSize: 20 }}> {'Rs : ' + item1.data.price + "        "}

//                     </Text>
//                 </View>
//             </View>
//             <View style={{
//                 height: "30%",
//                 width: '30%',
//                 zIndex: 1,
//                 position: 'absolute',
//                 //   borderRadius: 25,
//                 right: '10%',
//                 top: "13%",
//             }}>
//                 <Image source={{ uri: item1.data.imageUrl }}
//                     style={{
//                         height: '100%',
//                         //     borderRadius: 25,
//                         width: "100%"
//                     }}
//                     resizeMode={'contain'}
//                 />
//             </View>

//             <View style={{
//                 backgroundColor: 'white',
//                 flex: 1,
//                 borderTopLeftRadius: 40,
//                 borderTopRightRadius: 40,
//                 paddingHorizontal: '8%'
//             }}>
//                 <View style={{
//                     flexDirection: 'row', marginTop: '20%', justifyContent: 'space-between',
//                     alignItems: 'center'
//                 }}>
//                     <View style={{}}>
//                         <Text style={{ color: 'black', fontSize: 25 }}>{item1.data.name}</Text>
//                     </View>

//                 </View>
//                 <View style={{ marginTop: '10%' }}>
//                     <Text style={{ color: 'black' }}>{item1.data.description}</Text>
//                 </View>

//                 <View style={{ marginTop: '40%' }}>

//                     <AirbnbRating
//                         count={5}
//                         onFinishRating={(rating) => {
//                             setStateRating(rating)
//                         }}
//                         unSelectedColor={'grey'}
//                         selectedColor={'#FFBD31'}
//                         defaultRating={0}
//                         size={40}
//                     />
//                 </View>

//                 <View style={{
//                     flex: 1, justifyContent: 'flex-end',
//                     marginBottom: '10%'
//                 }}>
//                     <TouchableOpacity style={[styles.TouchableOpacityButton,
//                     { backgroundColor: 'red' }]}
//                         onPress={() => {
//                             ratingAdd()
//                         }}

//                     >
//                         <Text style={[styles.textButton,
//                         ]}>Rating</Text>
//                     </TouchableOpacity>

//                 </View>
//             </View>

//         </View>
//     );
// };

// export default ItemRatingOrderHistory;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#9FC743'
//     },
//     itemView: {
//         flexDirection: 'row',
//         width: '90%',
//         alignSelf: 'center',
//         backgroundColor: '#fff',
//         elevation: 4,
//         marginTop: 10,
//         borderRadius: 10,
//         height: 100,
//         marginBottom: 10,
//     },
//     itemImage: {
//         width: 90,
//         height: 90,
//         borderRadius: 10,
//         margin: 5,
//     },
//     nameView: {
//         width: '53%',
//         margin: 5,
//     },
//     priceView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     nameText: {
//         fontSize: 18,
//         color: 'grey',
//         fontWeight: '700',
//     },
//     descText: {
//         color: 'grey',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     priceText: {
//         fontSize: 18,
//         color: 'green',
//         fontWeight: '700',
//     },
//     discountText: {
//         fontSize: 17,
//         fontWeight: '600',
//         color: 'grey',
//         textDecorationLine: 'line-through',
//         marginLeft: 5,
//     },
//     icon: {
//         width: 24,
//         height: 24,
//     },
//     TouchableOpacityButton: {
//         alignItems: 'center',
//         paddingHorizontal: '10%',
//         paddingVertical: '3%',
//         marginHorizontal: '15%',
//         borderRadius: 30,
//         backgroundColor: '#84c000',

//     },
//     textButton: {
//         fontSize: 20,
//         color: 'white'
//     }
// });

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const ItemRatingOrderHistory = ({navigation, route}) => {
  const {item1} = route.params;
  const [stateRating, setStateRating] = useState(0);

  const ratingAdd = async () => {
    const userDetailItem = await firestore()
      .collection('items')
      .doc(item1.id)
      .get();
    const data = userDetailItem.data();
    firestore()
      .collection('items')
      .doc(userDetailItem.id)
      .update({
        totalRating: stateRating + data.totalRating,
        countNumberOfRate: data.countNumberOfRate + 1,
      });

    alert('Rating done');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" color="white" size={30} />
      </TouchableOpacity>

      <View style={styles.itemContainer}>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item1.data.name}</Text>
          <Text style={styles.itemPrice}>{'Rs: ' + item1.data.price}</Text>
        </View>

        <Image
          source={{uri: item1.data.imageUrl}}
          style={styles.itemImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.itemName}>{item1.data.name}</Text>
        <AirbnbRating
          count={5}
          onFinishRating={rating => setStateRating(rating)}
          unSelectedColor="grey"
          selectedColor="#FFBD31"
          defaultRating={0}
          size={40}
        />
        <TouchableOpacity style={styles.ratingButton} onPress={ratingAdd}>
          <Text style={styles.buttonText}>Rating</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'olive',
  },
  backButton: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    alignSelf: 'flex-start',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: '10%',
  },
  itemDetails: {
    flex: 1,
    marginTop: '15%',
    marginHorizontal: '5%',
  },
  itemName: {
    fontSize: 30,
    color: 'white',
  },
  itemPrice: {
    fontSize: 20,
    color: 'white',
  },
  itemImage: {
    height: '100%',
    width: '30%',
    position: 'absolute',
    right: '10%',
    top: '13%',
  },
  ratingContainer: {
    backgroundColor: 'pink',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: '8%',
    paddingTop: '20%',
  },
  ratingButton: {
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '3%',
    marginHorizontal: '15%',
    borderRadius: 10,
    backgroundColor: 'olive',
    marginTop: 'auto',
    marginBottom: '10%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default ItemRatingOrderHistory;
