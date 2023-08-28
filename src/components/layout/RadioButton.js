import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const RadioButton = ({ show }) => {
  return (
    <View style={{ paddingVertical: 5 }}>
      {show ? (
        <View style={[styles.dotCtn, styles.dotCtn2]}>
          <View style={[styles.dot, styles.dot2]} />
        </View>
      ) : (
        <View style={[styles.inactiveDot, styles.inactiveDot2]}></View>
      )}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  dotCtn: {
    borderWidth: 2,
    borderColor: Colors.Green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotCtn2: {
    height: 20,
    width: 20,
    borderRadius: 10
  },
  dot: {
    borderRadius: 6,
    backgroundColor: Colors.Green
  },
  dot2: {
    height: 11.6,
    width: 11.6,
    borderRadius: 6
  },
  inactiveDot: {
    borderWidth: 2,
    borderColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactiveDot2: {
    height: 20,
    width: 20,
    borderRadius: 10
  }
});
