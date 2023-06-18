import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import firestore, {where} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WishlistItemDetail from './WishlistItemDetail';
import Icon from 'react-native-vector-icons/Entypo';
let userId = '';
const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchTextInput, setSearchTextInput] = useState('');
  const [searchTextInputFilteredData, setSearchTextInputFilteredData] =
    useState([]);
  const [searchListBool, setSearchListBool] = useState({
    bool: false,
  });

  useEffect(() => {
    // const subscriber =

    getWishlist();
  }, []);

  const getWishlist = async () => {
    userId = await AsyncStorage.getItem('USERID');
    console.log(userId);
    firestore()
      .collection('wishlist')
      .where('userId', '==', userId)
      .get()
      .then(querySnapshot => {
        let tempData = [];
        console.log('Total users: ', querySnapshot.size);
        console.log('Total users: ', querySnapshot);
        // let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data().userId);
          tempData.push({
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
  };
  const search = searchText => {
    console.log(searchText);
    setSearchTextInput(searchText);
    let filteredData = items.filter(function (item) {
      console.log('item');
      console.log(item.data.name);
      var searchIdNameLowerCase = searchText.toLowerCase();
      var itemNameLowerCase = item.data.name.toLowerCase();
      console.log(item);
      var a = itemNameLowerCase.includes(searchIdNameLowerCase);

      return a;
    });

    setSearchTextInputFilteredData(filteredData);

    setSearchListBool({
      ...searchListBool,
      bool: true,
    });
  };

  return (
    <View style={styles.container}>
      <Header title={'Wishlist'} />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '5%',
          backgroundColor: '#F8F8F8',
          borderWidth: 0.5,
          marginTop: 20,
          paddingHorizontal: '5%',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AntDesign name="search1" size={20} color="grey" />

        <TextInput
          style={styles.inputStyle}
          placeholderTextColor={'grey'}
          color={'grey'}
          placeholder={'search'}
          value={searchTextInput}
          onChangeText={txt => search(txt)}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchTextInput('');
            setSearchTextInputFilteredData([]);
            setSearchListBool({
              ...searchListBool,
              bool: false,
            });
          }}>
          <Text style={{fontSize: 15, color: 'grey'}}>x</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          searchTextInputFilteredData.length == 0 &&
          searchListBool.bool == false
            ? items
            : searchTextInputFilteredData
        }
        renderItem={({item, index}) => {
          console.log(item);
          let rating = item.data.totalRating / item.data.countNumberOfRate;
          return (
            <TouchableOpacity
              style={styles.itemView}
              onPress={() => {
                navigation.navigate('WishlistItemDetail', {item});
              }}>
              <View
                style={{
                  backgroundColor: '#9dc844',
                  height: 65,
                  width: 65,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 13,
                }}>
                <Image
                  source={{uri: item.data.imageUrl}}
                  style={styles.itemImage}
                />
              </View>

              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.descText}>{item.data.description}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {'Rs' + item.data.discountPrice}
                  </Text>
                  <Text style={styles.discountText}>
                    {'Rs' + item.data.price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    width: '100%',

                    justifyContent: 'flex-end',
                  }}>
                  <Icon name="star" size={15} color="orange" />
                  <Text style={styles.descText}>{rating.toFixed(1)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'pink'},
  itemView: {
    flexDirection: 'row',
    width: '90%',

    backgroundColor: '#fff',
    paddingHorizontal: '3%',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemImage: {
    width: 43,
    height: 43,
    margin: 5,
  },
  nameView: {
    width: '72%',
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: '4%',
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'grey',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'grey',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: 'grey',
  },
  addToCartBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
});
