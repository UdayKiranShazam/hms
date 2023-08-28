import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppDrawer from './AppDrawer';

const Routes = () => {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
};

export default Routes;
