import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RolesList from '../screens/RolesList';
import Userstack from './userstack';
import CustomDrawer from './CustomDrawer';
import Homestack from './homestack';
import { Icon } from '@rneui/themed';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';
import DepartmentStack from './DepartmentStack';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const getIcon = (focused, name, type) => {
    return (
      <Icon name={name} type={type} color={focused ? Colors.primary : Colors.grey} size={24} />
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false
      }}>
      <Drawer.Screen
        name="Home"
        component={Homestack}
        options={{
          drawerLabel: ({ focused }) => (
            <Text style={[focused ? styles.activeText : styles.inActiveText, { paddingLeft: 5 }]}>
              {'Home'}
            </Text>
          ),
          drawerIcon: ({ focused }) => getIcon(focused, 'home', 'font-awesome')
        }}
      />
      {isAuthenticated && (
        <>
          <Drawer.Screen
            name="UserManagement"
            component={Userstack}
            options={{
              drawerLabel: ({ focused }) => (
                <Text style={[focused ? styles.activeText : styles.inActiveText]}>
                  {'User Management'}
                </Text>
              ),
              drawerIcon: ({ focused }) => getIcon(focused, 'users', 'font-awesome')
            }}
          />
          <Drawer.Screen
            name="DepartmentList"
            component={DepartmentStack}
            options={{
              drawerLabel: ({ focused }) => (
                <Text
                  style={[focused ? styles.activeText : styles.inActiveText, { paddingLeft: 3 }]}>
                  {'Department List'}
                </Text>
              ),
              drawerIcon: ({ focused }) => getIcon(focused, 'office-building', 'material-community')
            }}
          />
          <Drawer.Screen
            name="RolesList"
            component={RolesList}
            options={{
              drawerLabel: ({ focused }) => (
                <Text
                  style={[focused ? styles.activeText : styles.inActiveText, { paddingLeft: 8 }]}>
                  {'Roles List'}
                </Text>
              ),
              drawerIcon: ({ focused }) => getIcon(focused, 'person', 'fontisto')
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  activeText: {
    fontWeight: '600',
    color: Colors.primary
  },
  inActiveText: {
    fontWeight: '600',
    color: Colors.grey
  },
  tintColor: {
    backgroundColor: Colors.primary,
    opacity: 0.8
  }
});
