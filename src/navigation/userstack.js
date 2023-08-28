import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserManagement from '../screens/user/UserManagement';
import AddUser from '../screens/user/AddUser';

const Stack = createNativeStackNavigator();

const Userstack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="userlist" component={UserManagement} />
      <Stack.Screen name="adduser" component={AddUser} />
    </Stack.Navigator>
  );
};

export default Userstack;
