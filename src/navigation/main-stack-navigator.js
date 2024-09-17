import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Login} from '../screens/auth';
import SignUp from '../screens/auth/signup';
import {Brand, Home, Product, Profile} from '../screens/main';
import BottomTabNavigator from './bottom-tab-navigator';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Optionally hide header for a cleaner animation
        animation: 'slide_from_right', // Define the animation type
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Brand" component={Brand} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainStackNavigator;
