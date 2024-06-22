import React, {useState, useEffect} from 'react';
import LoginScreen from './src/Login';
import Home from './src/Home';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import BookList from './src/BookList';
import {MenuProvider} from 'react-native-popup-menu';
import Cart from './src/Cart';
import {CartProvider} from './src/CartContext';
import Profile from './src/Profile';
import EditProfile from './src/EditProfile';
import {ProfileProvider} from './src/ProfileContext';
import BookDetail from './src/BookDetail';

const Stack = createStackNavigator();

const AllScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <CartProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen name="Book Details" component={BookDetail} />
      </Stack.Navigator>
    </CartProvider>
  );
};

const BookScreen = () => {
  return (
    <CartProvider>
      <Stack.Navigator
        initialRouteName="BookList"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="BookList"
          component={BookList}
          options={{
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen name="Book Details" component={BookDetail} />
      </Stack.Navigator>
    </CartProvider>
  );
};

const CartScreen = () => {
  return (
    <CartProvider>
      <Stack.Navigator
        initialRouteName="Cart"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Shop Cart"
          component={Cart}
          options={{
            headerLeft: () => {
              return null;
            },
          }}
        />
      </Stack.Navigator>
    </CartProvider>
  );
};

const ProfileScreen = () => {
  return (
    <ProfileProvider>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </ProfileProvider>
  );
};
const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      inactiveColor={'greyDark'}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{tabBarIcon: 'home'}}
      />

      <Tab.Screen
        name="BookScreen"
        component={BookScreen}
        options={{tabBarIcon: 'bookshelf'}}
      />

      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{tabBarIcon: 'cart'}}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{tabBarIcon: 'account-box'}}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <AllScreen />
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
