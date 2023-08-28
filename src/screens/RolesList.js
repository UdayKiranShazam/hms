import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/header/HeaderBar';
import { Colors } from '../constants/Colors';

const RolesList = ({ navigation }) => {
  return (
    <View style={styles.rootContainer}>
      <HeaderBar title={'Roles List'} navigation={navigation} />
      <Text>RolesList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  cardHolder: {
    borderRadius: 8,
    padding: 3
  }
});

export default RolesList;
