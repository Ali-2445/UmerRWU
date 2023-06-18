import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ItemDetail = ({navigation, route}) => {
  const {data, id} = route.params;

  const deleteItem = docId => {
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        alert('Item Deleted');
        navigation.goBack();
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          paddingHorizontal: '3%',
          paddingVertical: '2%',
          alignSelf: 'flex-start',
        }}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" color="white" size={30} />
      </TouchableOpacity>

      <View style={{marginBottom: '4%'}}>
        <View style={{marginHorizontal: '5%'}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>
            {data.name}
          </Text>
        </View>
        <View
          style={{
            marginTop: '4%',
            marginHorizontal: '5%',
          }}>
          <Text style={{fontSize: 20, color: '#fff'}}>
            {' '}
            {'Rs : ' + data.discountPrice + '        '}
            <Text style={{textDecorationLine: 'line-through'}}>
              {'Rs: ' + data.price}
            </Text>
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'pink',
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: '8%',
        }}>
        <View
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            alignSelf: 'center',
            marginTop: '4%',
          }}>
          <Image
            source={{uri: data.imageUrl}}
            style={{
              height: '100%',

              width: '100%',
              borderRadius: 100,
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={{marginTop: '5%'}}>
          <Text style={{color: 'black', fontSize: 25}}>{data.name}</Text>
        </View>
        <View style={{marginTop: '10%'}}>
          <Text style={{color: 'black'}}>{data.description}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'space-evenly',
            marginBottom: '10%',
          }}>
          <TouchableOpacity
            style={styles.TouchableOpacityButton}
            onPress={() => {
              navigation.navigate('EditItem', {
                data: data,
                id: id,
              });
            }}>
            <Text style={styles.textButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.TouchableOpacityButton, {backgroundColor: 'red'}]}
            onPress={() => {
              deleteItem(id);
            }}>
            <Text style={[styles.textButton]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'olive',
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '53%',
    margin: 5,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 17,
    fontWeight: '600',
    color: 'grey',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  TouchableOpacityButton: {
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '3%',
    marginHorizontal: '15%',
    borderRadius: 10,
    backgroundColor: 'olive',
  },
  textButton: {
    fontSize: 20,
    color: 'white',
  },
});
