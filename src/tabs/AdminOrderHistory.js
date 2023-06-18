import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../screens/common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {RadioButton} from 'react-native-paper';
const AdminOrderHistory = () => {
  const [orderListHistory, setOrderListHistory] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    const user = await firestore()
      .collection('order')
      .where('delivered', '==', true)
      .get()
      .then(querySnapshot => {
        console.log('querySnapshot');
        console.log(querySnapshot);
        let tempDataDeliveredTrue = [];
        querySnapshot.forEach(documentSnapshot => {
          tempDataDeliveredTrue.unshift({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });

        setOrderListHistory(tempDataDeliveredTrue);
      });
  };
  return (
    <View style={styles.container}>
      <Header title={'Order History'} />
      <ScrollView>
        <View style={{marginBottom: 20}}>
          {orderListHistory.map((item, index) => {
            console.log(item.data);
            let unix_timestamp = item.data.date.seconds * 1000;

            var date = new Date(unix_timestamp);
            // Hours part from the timestamp

            var date1 = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = '0' + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = '0' + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime =
              date1 +
              '/' +
              (month + 1) +
              '/' +
              year +
              ' ' +
              hours +
              ':' +
              minutes.substr(-2) +
              ':' +
              seconds.substr(-2);

            console.log(formattedTime);
            return (
              <View
                style={{
                  borderWidth: 0.5,
                  marginHorizontal: 15,
                  marginVertical: 15,
                  borderRadius: 10,
                  paddingHorizontal: '3%',
                  paddingVertical: 15,
                  justifyContent: 'space-evenly',
                }}>
                <View>
                  <Text style={{color: 'grey'}}>{formattedTime} </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 20, color: 'blue'}}>Delivered: </Text>
                  <Text style={{fontSize: 20, color: 'red'}}>
                    {item.data.delivered.toString()}{' '}
                  </Text>
                </View>

                {item?.data?.cartList.map((item1, index1) => {
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: '3%',
                        }}
                        key={index1}>
                        <Image
                          source={{uri: item1?.data?.imageUrl}}
                          style={styles.itemImage}
                        />
                        <View>
                          <Text style={styles.nameText}>
                            {item1.data?.name}
                          </Text>
                          <Text style={styles.nameText}>
                            {'Price: ' +
                              item1?.data?.discountPrice +
                              ', Qty: ' +
                              item1?.data?.qty}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminOrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
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
});
