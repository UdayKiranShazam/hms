import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DepartmentList from '../screens/department/DepartmentList';
import AddDepartment from '../screens/department/AddDepartment';

const Stack = createNativeStackNavigator();

const DepartmentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dep_list" component={DepartmentList} />
      <Stack.Screen name="add_department" component={AddDepartment} />
    </Stack.Navigator>
  );
};

export default DepartmentStack;