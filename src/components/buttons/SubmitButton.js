import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

const SubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
    width: '60%',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: Colors.primary
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.secondary
  }
});

export default SubmitButton;
