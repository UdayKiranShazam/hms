import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';

const LoadingDisplay = () => {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator size={'large'} color={Colors.secondary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.primary
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    color: Colors.secondary
  }
});

export default LoadingDisplay;
