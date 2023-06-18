import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../screens/common/Header';
const Items = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, [isFocused]);
  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
  };

  return (
    <View style={styles.container}>
      <Header title={'Items'} />
      <FlatList
        data={items}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.itemView}
              onPress={() => {
                navigation.navigate('ItemDetail', {
                  data: item.data,
                  id: item.id,
                });
              }}>
              <View
                style={{
                  backgroundColor: '#9dc844',
                  height: 60,
                  width: 60,
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
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                  <Text style={styles.nameText}>{item.data.name}</Text>
                  <Text style={styles.descText}>{item.data.description}</Text>
                </View>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {'Rs : ' + item.data.discountPrice}
                  </Text>
                  <Text style={styles.discountText}>
                    {'Rs: ' + item.data.price}
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

export default Items;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: '3%',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  nameView: {
    marginHorizontal: '3%',
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  priceView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  nameText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: '700',
  },
  descText: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'grey',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
