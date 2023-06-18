import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import EditItem from './screens/EditItem';
import SelectLogin from './screens/user/SelectLogin';
import UserLogin from './screens/user/UserLogin';
import UserSignup from './screens/user/UserSignup';
import Home from './screens/user/Home';
import Cart from './screens/user/Cart';
import Checkout from './screens/user/checkout/Checkout';
import Address from './screens/user/checkout/Address';
import AddNewAddress from './screens/user/checkout/AddNewAddress';
import OrderStatus from './screens/user/checkout/OrderStatus';
import Items from './tabs/Items';
import ItemDetail from './tabs/ItemDetail';
import OrderHistory from './screens/user/home_tabs/OrderHistory';
import AdminOrderHistory from './tabs/AdminOrderHistory';
import UserItemDetail1 from './screens/user/home_tabs/UserItemDetail1';
import WishlistItemDetail from './screens/user/home_tabs/WishlistItemDetail';
import ItemRatingOrderHistory from './screens/user/home_tabs/ItemRatingOrderHistory';


const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Login}
          name="Login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={OrderHistory}
          name="OrderHistory"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={ItemRatingOrderHistory}
          name="ItemRatingOrderHistory"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={AdminOrderHistory}
          name="AdminOrderHistory"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={WishlistItemDetail}
          name="WishlistItemDetail"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EditItem}
          name="EditItem"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SelectLogin}
          name="SelectLogin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ItemDetail}
          name="ItemDetail"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Items}
          name="Items"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UserItemDetail1}
          name="UserItemDetail1"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UserLogin}
          name="UserLogin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UserSignup}
          name="UserSignup"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Cart}
          name="Cart"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Checkout}
          name="Checkout"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Address}
          name="Address"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={AddNewAddress}
          name="AddNewAddress"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={OrderStatus}
          name="OrderStatus"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
