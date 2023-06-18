import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../screens/common/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
const Orders = () => {
  const [orderListDeliveredTrue, setOrderListDeliveredTrue] = useState([]);
  const [orderListDeliveredFalse, setOrderListDeliveredFalse] = useState([]);
  const [stateDummy, setstateDummy] = useState(true);
  const [checked, setChecked] = React.useState('first');
  useEffect(() => {
    getOrders();
  }, [stateDummy]);

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

        setOrderListDeliveredTrue(tempDataDeliveredTrue);
      });

    const user1 = await firestore()
      .collection('order')
      .where('delivered', '==', false)
      .get()
      .then(querySnapshot => {
        console.log('querySnapshot');
        console.log(querySnapshot);
        let tempDataDeliveredFalse = [];
        querySnapshot.forEach(documentSnapshot => {
          tempDataDeliveredFalse.unshift({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });

        setOrderListDeliveredFalse(tempDataDeliveredFalse);
      });
    // console.log(user._docs[0]._data);
    // console.log('lkjhgvchj')
    //console.log(user)
    // console.log(user._docs);
    // setOrderList(user._docs);
  };

  const deliveryStatusUpdate = orderId => {
    firestore().collection('order').doc(orderId).update({
      delivered: true,
    });
    console.log(orderId + 'order id');
    setstateDummy(!stateDummy);
  };
  return (
    <View style={styles.container}>
      <Header title={'All Orders'} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '50%',
          alignSelf: 'center',
          marginTop: 15,
          marginLeft: '-15%',
          alignItems: 'center',
        }}>
        <Text style={{color: 'green'}}>Delivered</Text>
        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
        <Text style={{color: 'black'}}>True</Text>
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        />
        <Text style={{color: 'black'}}>False</Text>
      </View>
      <ScrollView>
        <View style={{marginBottom: 20}}>
          {checked == 'first'
            ? orderListDeliveredTrue.map((item, index) => {
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
                      <Text style={{fontSize: 20, color: 'blue'}}>
                        Delivered:{' '}
                      </Text>
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
                            <View
                              style={{
                                backgroundColor: '#9dc844',
                                height: 55,
                                width: 55,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 13,
                              }}>
                              <Image
                                source={{uri: item1.data.imageUrl}}
                                style={styles.itemImage}
                              />
                            </View>
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
              })
            : orderListDeliveredFalse.map((item, index) => {
                // console.log('item')
                // console.log(item)
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
                      <Text style={{fontSize: 20, color: 'blue'}}>
                        Delivered:{' '}
                      </Text>
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
                            <View
                              style={{
                                backgroundColor: '#9dc844',
                                height: 55,
                                width: 55,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 13,
                              }}>
                              <Image
                                source={{uri: item1.data.imageUrl}}
                                style={styles.itemImage}
                              />
                            </View>
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
                    <TouchableOpacity
                      // style={{
                      //   alignItems: 'center',
                      //   marginTop: 20,
                      //   backgroundColor: 'green',
                      //   alignSelf: 'center',
                      //   height: 40,
                      //   justifyContent: 'center',
                      //   width: '50%',
                      //   borderRadius: 15
                      // }}
                      style={styles.TouchableOpacityButton}
                      onPress={() => {
                        deliveryStatusUpdate(item.id);
                      }}>
                      <Text style={{color: 'white'}}> Delivery Button </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Orders;

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
    width: 43,
    height: 43,
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
    marginHorizontal: '20%',
    borderRadius: 30,
    backgroundColor: '#84c000',
    marginTop: '10%',
  },
  textButton: {
    fontSize: 20,
    color: 'white',
  },
});
