import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Icon } from '@rneui/themed';
import { AuthContext } from '../../context/AuthContext';

const HeaderBar = ({ title, navigation, showIcon, onPress, isAuthenticated }) => {
  const { logOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Icon name="navicon" type="evilicon" size={35} color={Colors.secondary} />
      </Pressable>
      <View style={styles.titleHolder}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {showIcon ? (
        <Pressable
          style={styles.loginHolder}
          onPress={() => (isAuthenticated ? logOut() : navigation.navigate('login'))}>
          <Icon
            name={isAuthenticated ? 'logout' : 'login'}
            type="material-community"
            size={26}
            color={Colors.secondary}
          />
        </Pressable>
      ) : (
        <Pressable style={{ paddingRight: 6 }} onPress={onPress}>
          <Icon name="add-sharp" type="ionicon" size={30} color={Colors.secondary} />
        </Pressable>
      )}
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
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 0,
    color: Colors.secondary
  },
  loginHolder: {
    paddingRight: 10
  }
});

export default HeaderBar;
