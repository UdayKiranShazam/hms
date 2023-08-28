import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

const CustomInput = ({
  title,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  touched,
  errors,
  editable,
  color,
  question
}) => {
  return (
    <View style={styles.container}>
      {!question && (
        <View style={styles.labelContainer}>
          {value && value.length > 0 && <Text style={styles.inputTitle}>{title}</Text>}
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { color: color }]}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={Colors.light_Grey}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType ? keyboardType : 'default'}
        />
      </View>
      <Text style={styles.errorText}>{touched && errors}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10
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
    borderWidth: 1, // Create border
    borderRadius: 8, // Not needed. Just make it look nicer.
    borderColor: Colors.light_Grey,
    padding: 6, // Also used to make it look nicer
    zIndex: 0 // Ensure border has z-index of 0
  },
  inputTitle: {
    paddingLeft: 0
  },
  textInput: {
    fontSize: 18,
    padding: 4,
    paddingLeft: 10
  },
  errorText: {
    fontSize: 12,
    color: Colors.red
  }
});

export default CustomInput;
