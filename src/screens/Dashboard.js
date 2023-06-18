import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Items from '../tabs/Items';
import Transactions from '../tabs/Transactions';
import Add from '../tabs/Add';
import Orders from '../tabs/Orders';
import Notifications from '../tabs/Notifications';
import Profile from '../tabs/Profile';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Add />
      ) : selectedTab == 2 ? (
        <Orders />
      ) : selectedTab == 3 ? (
        <Profile />
      ) : null}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../images/items.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 0 ? 'pink' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../images/add.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 1 ? 'pink' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../images/orders.png')}
            style={[
              styles.bottomTabImg,
              {
                tintColor: selectedTab == 2 ? 'pink' : 'black',
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={
              //images/profile_fill.png
              selectedTab == 3
                ? require('../images/profile_fill.png')
                : require('../images/profile.png')
            }
            style={[
              styles.bottomTabImg,
              {
                tintColor: selectedTab == 3 ? 'pink' : 'black',
              },
            ]}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../images/orders.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 3 ? 'red' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={require('../images/notification.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 4 ? 'red' : 'black'},
            ]}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 60,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    borderWidth: 0.3,
    borderColor: '#D3D3D3',
    backgroundColor: '#fff',
  },
  bottomTab: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabImg: {
    width: 24,
    height: 24,
  },
});
