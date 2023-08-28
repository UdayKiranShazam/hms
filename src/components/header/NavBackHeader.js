import { Icon } from '@rneui/themed';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';

const NavBackHeader = ({ title, navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable style={{ paddingLeft: 5 }} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" type="ionicon" size={30} color={Colors.primary} />
      </Pressable>
      <View style={styles.titleHolder}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5
  },
  titleHolder: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 0,
    color: Colors.primary
  },
  loginHolder: {
    paddingRight: 10
  }
});

export default NavBackHeader;
