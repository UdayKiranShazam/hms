import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Icon } from '@rneui/themed';

const CustomDropdown = ({ title, value, onPress, touched, errors }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.labelContainer}>{value && <Text>{title}</Text>}</View>
        <View style={styles.inputContainer}>
          {!value && <Text style={[styles.text, { color: Colors.light_Grey }]}>Select role</Text>}
          {value && <Text style={[styles.text, { color: Colors.black }]}>{value}</Text>}
          <Icon name="arrow-drop-down" type="material" size={30} color={Colors.silver} />
        </View>
      </TouchableOpacity>
      <Text style={styles.errorText}>{touched && errors}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20
  },
  labelContainer: {
    backgroundColor: Colors.secondary, // Same color as background
    alignSelf: 'flex-start', // Have View be same width as Text inside
    paddingHorizontal: 3,
    marginStart: 12,
    zIndex: 1, // Label must overlap border
    elevation: 1,
    shadowColor: 'white', // Same as background color because elevation: 1 creates a shadow that we don't want
    position: 'absolute', // Needed to be able to precisely overlap label with border
    top: -12 // Vertical position of label. Eyeball it to see where label intersects border.
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1, // Create border
    borderRadius: 8, // Not needed. Just make it look nicer.
    borderColor: Colors.light_Grey,
    padding: 6, // Also used to make it look nicer
    zIndex: 0 // Ensure border has z-index of 0
  },
  text: {
    fontSize: 18,
    padding: 6,
    paddingLeft: 10
  },
  errorText: {
    fontSize: 12,
    color: Colors.red
  }
});

export default CustomDropdown;
