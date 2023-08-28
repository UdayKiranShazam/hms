import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from '@rneui/themed';
import { Colors } from '../../constants/Colors';

const CustomSwitch = ({ title, onValueChange, value }) => {

  return (
    <View style={[styles.switchHolder]}>
      <Text style={styles.activeTitle}>{title}</Text>
      <Switch
        color={value ? Colors.Primary : Colors.grey}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  switchHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  activeTitle: {
    fontSize: 16,
    paddingRight: 30
  }
});
