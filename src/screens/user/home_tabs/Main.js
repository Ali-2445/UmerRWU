import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';

let userId = '';

const Main = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTextInput, setSearchTextInput] = useState('');
  const [searchTextInputFilteredData, setSearchTextInputFilteredData] =
    useState([]);
  const [searchListBool, setSearchListBool] = useState({
    bool: false,
  });
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        let tempData = [];
        let tempCategories = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
          if (!tempCategories.includes(documentSnapshot.data().category)) {
            tempCategories.push(documentSnapshot.data().category);
          }
        });
        tempData.sort((a, b) => {
          const ratingA = a.data.totalRating ?? 0;
          const ratingB = b.data.totalRating ?? 0;
          const countA = a.data.countNumberOfRate ?? 1;
          const countB = b.data.countNumberOfRate ?? 1;

          const ratingPerCountA = countA === 0 ? 0 : ratingA / countA;
          const ratingPerCountB = countB === 0 ? 0 : ratingB / countB;

          return ratingPerCountB - ratingPerCountA;
        });

        console.log(tempData);
        setCategories(tempCategories);

        setItems(tempData);
      });
  }, []);

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data.cart.length);
  };

  const search = searchText => {
    setSearchTextInput(searchText);
    let filteredData = items.filter(item => {
      var searchIdNameLowerCase = searchText.toLowerCase();
      var itemNameLowerCase = item.data.name.toLowerCase();
      var a = itemNameLowerCase.includes(searchIdNameLowerCase);
      return a;
    });

    setSearchTextInputFilteredData(filteredData);

    setSearchListBool({
      ...searchListBool,
      bool: true,
    });
  };

  const filterByCategory = category => {
    setSelectedCategory(category);
    if (category) {
      const filteredData = items.filter(
        item => item.data.category === category,
      );
      setSearchTextInputFilteredData(filteredData);
      setSearchListBool({bool: true});
    } else {
      setSearchTextInputFilteredData([]);
      setSearchListBool({bool: false});
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'RWU Cafeteria'}
        icon={require('../../../images/cart.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '5%',
          backgroundColor: '#F8F8F8',
          borderWidth: 0.5,
          marginTop: 20,
          paddingHorizontal: '5%',
          borderRadius: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AntDesign name="search1" size={20} color="grey" />
        <TextInput
          style={styles.inputStyle}
          placeholder={'search'}
          placeholderTextColor={'grey'}
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
      <View style={styles.categoryChipsContainer}>
        <ScrollView horizontal>
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === null && styles.selectedCategoryChip,
            ]}
            onPress={() => filterByCategory(null)}>
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === null && styles.selectedCategoryChipText,
              ]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategoryChip,
              ]}
              onPress={() => filterByCategory(category)}>
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category &&
                    styles.selectedCategoryChipText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={
          searchTextInputFilteredData.length === 0 &&
          searchListBool.bool === false
            ? items
            : searchTextInputFilteredData
        }
        renderItem={({item, index}) => {
          let rating = item.data.totalRating / item.data.countNumberOfRate;
          return (
            <TouchableOpacity
              style={styles.itemView}
              onPress={() => {
                navigation.navigate('UserItemDetail1', {
                  item: item,
                  userId: userId,
                });
              }}>
              <View
                style={{
                  backgroundColor: 'black',
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
                    justifyContent: 'flex-end',
                  }}>
                  <Icon name="star" size={15} color="orange" />
                  <Text style={styles.descText}>
                    {rating ? rating.toFixed(1) : 0}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'pink'},
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    paddingHorizontal: '3%',
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    // margin: 5,
  },
  inputStyle: {
    flex: 1,
    color: 'grey',
    marginLeft: '4%',
  },
  nameView: {
    width: '70%',
    margin: 10,
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
    color: 'grey',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    color: 'grey',
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  categoryChipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingHorizontal: '5%',
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    marginRight: 10,
  },
  selectedCategoryChip: {
    backgroundColor: 'black',
  },
  categoryChipText: {
    fontSize: 14,
    color: 'grey',
  },
  selectedCategoryChipText: {
    color: 'white',
  },
});
