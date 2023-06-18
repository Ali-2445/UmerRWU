import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/AppNavigator';
import firebase from '@react-native-firebase/app';

const App = () => {
  const firebaseConfig = {
    projectId: 'canteen-management-syste-3dfac',
    storageBucket: 'canteen-management-syste-3dfac.appspot.com',
    appId: '1:984019384463:android:105d02381299c6825298fa',
    apiKey:'AIzaSyD2g3lueq6oR-Z8CQuf0Q4cjWAJTN20MRw'
  };

  useEffect(() => {
    // console.log(firebase.apps);
    // if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // }
  }, []);
  return <AppNavigator />;
};

export default App;
