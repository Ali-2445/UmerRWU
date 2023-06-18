// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Image,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
// import {ActivityIndicator, MD2Colors} from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
// import {useNavigation} from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// const UserItemDetail1 = ({navigation, route}) => {
//   const {item, userId} = route.params;
//   const [wishlistIconGreen, setWishlistconGreen] = useState(false);

//   useEffect(() => {
//     getItemFromWishlist();
//   }, []);
//   const getItemFromWishlist = async () => {
//     const getItemWishlist = await firestore()
//       .collection('wishlist')
//       .where('itemId', '==', item.id)
//       .get();
//     console.log('getItemWishlist');
//     console.log(getItemWishlist?._docs[0]?._data);
//     if (getItemWishlist?._docs[0]?._data == undefined)
//       setWishlistconGreen(false);
//     else setWishlistconGreen(true);
//   };

//   const onAddToCart = async (item, index) => {
//     console.log(item);
//     const user = await firestore().collection('users').doc(userId).get();

//     let tempDart = [];
//     tempDart = user?._data?.cart;
//     if (tempDart?.length > 0) {
//       let existing = false;
//       tempDart.map(itm => {
//         console.log('itm');
//         if (itm.id == item.id) {
//           existing = true;
//           itm.data.qty = itm.data.qty + 1;
//         }
//       });
//       if (existing == false) {
//         tempDart.push(item);
//       }
//       console.log();
//       firestore().collection('users').doc(userId).update({
//         cart: tempDart,
//       });
//     } else {
//       tempDart.push(item);

//       firestore().collection('users').doc(userId).update({
//         cart: tempDart,
//       });
//     }
//     console.log(tempDart);

//     alert('Item added in cart');
//     navigation.goBack();
//   };

//   const wishlistAdd = wishlistItem => {
//     console.log('iwishlistItemtems');
//     console.log(wishlistItem);
//     console.log(`name: ${wishlistItem.data.description},
//         userId:${userId},
//           price: ${wishlistItem.data.price},
//           discountPrice: ${wishlistItem.data.discountPrice},
//           description: ${wishlistItem.data.description},
//           itemId:${wishlistItem.id},
//           imageUrl:${wishlistItem.data.imageUrl + ''}`);
//     firestore()
//       .collection('wishlist')
//       .add({
//         userId: userId,
//         name: wishlistItem.data.name,
//         price: wishlistItem.data.price,
//         discountPrice: wishlistItem.data.discountPrice,
//         description: wishlistItem.data.description,
//         countNumberOfRate: wishlistItem.data.countNumberOfRate,
//         totalRating: wishlistItem.data.totalRating,
//         itemId: wishlistItem.id,
//         imageUrl: wishlistItem.data.imageUrl + '',
//       })
//       .then(() => {
//         setWishlistconGreen(true);
//         alert('wishlist added');
//       });
//   };

//   const wishlistRemove = async itemid => {
//     const user = await firestore()
//       .collection('wishlist')
//       .where('itemId', '==', itemid)
//       .get()
//       .then(querySnapshot => {
//         querySnapshot.forEach(documentSnapshot => {
//           documentSnapshot.ref.delete();
//           setWishlistconGreen(false);
//         });
//       });
//   };
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={{
//           paddingHorizontal: '3%',
//           paddingVertical: '2%',
//           alignSelf: 'flex-start',
//         }}
//         onPress={() => navigation.goBack()}>
//         <AntDesign name="arrowleft" color="white" size={30} />
//       </TouchableOpacity>

//       <View style={{marginBottom: '10%'}}>
//         <View style={{marginTop: '15%', marginHorizontal: '5%'}}>
//           <Text style={{fontSize: 30, color: '#fff'}}>{item.data.name}</Text>
//         </View>
//         <View
//           style={{
//             marginTop: '10%',
//             marginHorizontal: '5%',
//           }}>
//           <Text style={{fontSize: 20, color: '#fff'}}>
//             {' '}
//             {'Rs : ' + item.data.discountPrice + '        '}
//             <Text style={{textDecorationLine: 'line-through'}}>
//               {'Rs: ' + item.data.price}
//             </Text>
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           height: '30%',
//           width: '30%',
//           zIndex: 1,
//           position: 'absolute',
//           //   borderRadius: 25,
//           right: '10%',
//           top: '13%',
//         }}>
//         <Image
//           source={{uri: item.data.imageUrl}}
//           style={{
//             height: '100%',
//             //     borderRadius: 25,
//             width: '100%',
//           }}
//           resizeMode={'contain'}
//         />
//       </View>

//       <View
//         style={{
//           backgroundColor: 'white',
//           flex: 1,
//           borderTopLeftRadius: 40,
//           borderTopRightRadius: 40,
//           paddingHorizontal: '8%',
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginTop: '20%',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <View style={{}}>
//             <Text style={{color: 'black', fontSize: 25}}>{item.data.name}</Text>
//           </View>
//           {wishlistIconGreen == false ? (
//             <TouchableOpacity
//               onPress={() => {
//                 wishlistAdd(item);
//               }}
//               style={{paddingHorizontal: '3%', paddingVertical: '3%'}}>
//               <Image
//                 source={require('../../../images/wish.png')}
//                 style={{height: 30, width: 30}}
//               />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               onPress={() => {
//                 wishlistRemove(item.id);
//               }}
//               style={{paddingHorizontal: '2%', paddingVertical: '2%'}}>
//               <AntDesign name="heart" size={30} color="green" />
//             </TouchableOpacity>
//           )}
//         </View>
//         <View style={{marginTop: '10%'}}>
//           <Text style={{color: 'black'}}>{item.data.description}</Text>
//         </View>

//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'flex-end',
//             marginBottom: '10%',
//           }}>
//           <TouchableOpacity
//             style={[styles.TouchableOpacityButton, {backgroundColor: 'red'}]}
//             onPress={() => {
//               onAddToCart(item);
//             }}>
//             <Text style={[styles.textButton]}>Add to cart</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default UserItemDetail1;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#9FC743',
//   },
//   itemView: {
//     flexDirection: 'row',
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     elevation: 4,
//     marginTop: 10,
//     borderRadius: 10,
//     height: 100,
//     marginBottom: 10,
//   },
//   itemImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 10,
//     margin: 5,
//   },
//   nameView: {
//     width: '53%',
//     margin: 5,
//   },
//   priceView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   nameText: {
//     fontSize: 18,
//     color: 'grey',
//     fontWeight: '700',
//   },
//   descText: {
//     color: 'grey',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   priceText: {
//     fontSize: 18,
//     color: 'green',
//     fontWeight: '700',
//   },
//   discountText: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: 'grey',
//     textDecorationLine: 'line-through',
//     marginLeft: 5,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   TouchableOpacityButton: {
//     alignItems: 'center',
//     paddingHorizontal: '10%',
//     paddingVertical: '3%',
//     marginHorizontal: '15%',
//     borderRadius: 30,
//     backgroundColor: '#84c000',
//   },
//   textButton: {
//     fontSize: 20,
//     color: 'white',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

const UserItemDetail1 = ({navigation, route}) => {
  const {item, userId} = route.params;
  const [wishlistIconGreen, setWishlistIconGreen] = useState(false);

  useEffect(() => {
    getItemFromWishlist();
  }, []);

  const getItemFromWishlist = async () => {
    const getItemWishlist = await firestore()
      .collection('wishlist')
      .where('itemId', '==', item.id)
      .get();
    if (!getItemWishlist.empty) {
      setWishlistIconGreen(true);
    } else {
      setWishlistIconGreen(false);
    }
  };

  const onAddToCart = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempCart = user.data()?.cart || [];

    const existingItem = tempCart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.data.qty += 1;
    } else {
      tempCart.push(item);
    }

    await firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });

    alert('Item added to cart');
    navigation.goBack();
  };

  const wishlistAdd = async wishlistItem => {
    await firestore()
      .collection('wishlist')
      .add({
        userId: userId,
        name: wishlistItem.data.name,
        price: wishlistItem.data.price,
        discountPrice: wishlistItem.data.discountPrice,
        description: wishlistItem.data.description,
        countNumberOfRate: wishlistItem.data.countNumberOfRate,
        totalRating: wishlistItem.data.totalRating,
        itemId: wishlistItem.id,
        imageUrl: wishlistItem.data.imageUrl + '',
      });
    setWishlistIconGreen(true);
    alert('Added to wishlist');
  };

  const wishlistRemove = async itemId => {
    const querySnapshot = await firestore()
      .collection('wishlist')
      .where('itemId', '==', itemId)
      .get();

    querySnapshot.forEach(documentSnapshot => {
      documentSnapshot.ref.delete();
    });

    setWishlistIconGreen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" color="white" size={30} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.data.imageUrl}}
            style={styles.itemImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>{item.data.name}</Text>
          <Text style={styles.itemPrice}>
            Rs: {item.data.discountPrice}
            <Text style={styles.originalPrice}>
              {'  '}
              Rs: {item.data.price}
            </Text>
          </Text>

          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.itemDescription}>{item.data.description}</Text>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.button,
              wishlistIconGreen ? styles.removeButton : styles.addButton,
            ]}
            onPress={() =>
              wishlistIconGreen ? wishlistRemove(item.id) : wishlistAdd(item)
            }>
            <Text style={styles.buttonText}>
              {wishlistIconGreen ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => onAddToCart(item)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: 'pink',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: '8%',
    paddingTop: '10%',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    height: 300,
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'red',
    overflow: 'hidden',
    marginBottom: '5%',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 150,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
  },
  itemName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    marginLeft: '2%',
    color: 'grey',
    fontWeight: 'normal',
  },
  descriptionContainer: {
    maxHeight: 150,
    marginTop: '5%',
  },
  itemDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 50,
    borderRadius: 10,
    marginBottom: '3%',
  },
  addButton: {
    backgroundColor: 'black',
  },
  removeButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserItemDetail1;
