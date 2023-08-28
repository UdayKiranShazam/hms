import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import LoginScreen from '../screens/auth/login';
import SignUpScreen from '../screens/auth/signup';
import ForgotPassword from '../screens/auth/forgotpassword';

const Stack = createNativeStackNavigator();

const Homestack = () => {
  return (
    <Stack.Navigator
      initialRouteName="homescreen"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="homescreen" component={Home} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="forgotpassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default Homestack;
