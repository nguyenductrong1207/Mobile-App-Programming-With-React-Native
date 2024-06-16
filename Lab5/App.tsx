import React from "react";
import LoginScreen from "./src/Login";
import Home from "./src/Home";
import AddService from "./src/AddService";
import ServiceDetails from "./src/ServiceDetail";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Customer from "./src/Customer";
import AddCustomer from "./src/AddCustomer";
import { MenuProvider } from "react-native-popup-menu";
import UpdateService from "./src/EditService";
import Transaction from "./src/Transaction";
import TransactionDetails from "./src/TransactionDetail";
import Logout from "./src/Logout";
import CustomerDetails from "./src/CustomerDetail";
import UpdateCustomer from "./src/EditCustomer";
import AddTransaction from "./src/AddTransaction";

const Stack = createStackNavigator();

const AllScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="TabNavigator" component={TabNavigator} />

    </Stack.Navigator>
  )
}
const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }} >


      <Stack.Screen name="Home" component={Home}
        options={{
          title: 'Home', headerLeft: () => {
            return (null)
          }
        }} />

      <Stack.Screen name="AddService" component={AddService}
        options={{ title: 'Add Service' }} />

      <Stack.Screen name="Service Details" component={ServiceDetails} options={{
        title: 'Service Details'
      }} />

      <Stack.Screen name="EditService" component={UpdateService} options={{
        title: 'Edit Service '
      }} />
    </Stack.Navigator>
  )
}

const CustomerScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Customer" screenOptions={{ headerShown: true }}   >
      <Stack.Screen name="Customer" component={Customer} options={{headerLeft: () => {
            return (null)
          }}} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="Customer Details" component={CustomerDetails} />
      <Stack.Screen name="Edit Customer" component={UpdateCustomer}/>
    </Stack.Navigator>
  )
}

const TransactionScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Transaction" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Transaction" component={Transaction} options={{headerLeft: () => {
            return (null)
          }}} />
      <Stack.Screen name="Transaction Details" component={TransactionDetails} />
      <Stack.Screen name="Add Transaction" component={AddTransaction} />
    </Stack.Navigator>
  )
}

const SettingScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Logout" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Setting" component={Logout} options={{ headerLeft: () => { return null } }} />
    </Stack.Navigator>
  )
}
const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" labeled={false} inactiveColor={"greyDark"} >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{ tabBarIcon: 'home' }} />

      <Tab.Screen name="CustomerScreen" component={CustomerScreen}
        options={{ tabBarIcon: 'account-multiple' }} />

      <Tab.Screen name="TransactionScreen" component={TransactionScreen}
        options={{ tabBarIcon: 'bank-transfer' }} />

      <Tab.Screen name="SettingScreen" component={SettingScreen}
        options={{ tabBarIcon: 'cog' }} />
    </Tab.Navigator>
  )
}
const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <AllScreen />
      </NavigationContainer>
    </MenuProvider>
  )
}

export default App;