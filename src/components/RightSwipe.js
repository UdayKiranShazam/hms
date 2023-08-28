import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Icon } from '@rneui/themed';

const RightSwipe = ({ dragX, onEdit, onDelete }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View style={{ transform: [{ scale: scale }] }}>
      <View style={styles.showIcons}>
        <View style={styles.icon}>
          <Icon
            name="edit"
            type="font-awesome"
            size={25}
            color={Colors.Green}
            onPress={onEdit}
            //style={styles.icon}
          />
        </View>
        <View style={styles.seperateIcons} />
        <View style={styles.icon}>
          <Icon
            name="delete"
            type="material-community"
            size={25}
            color={Colors.red}
            onPress={onDelete}
            //style={styles.icon}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default RightSwipe;

const styles = StyleSheet.create({
  showIcons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10
  },
  seperateIcons: {
    marginHorizontal: 12
  },
  icon: {
    elevation: 10,
    padding: 4,
    borderRadius: 30,
    backgroundColor: Colors.secondary
  }
});
