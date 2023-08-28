import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = (props) => {
  const { isAuthenticated, logOut, user } = useContext(AuthContext);
  const userInfo = user ? JSON.parse(user) : '';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageContainer,
          userInfo !== '' && { flexDirection: 'row', alignItems: 'flex-end' }
        ]}>
        <Image source={require('../assets/logo2.png')} style={styles.image} />
        {isAuthenticated && userInfo !== '' && (
          <View style={styles.detailsContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.hiText}>Hello,</Text>
              <Text style={styles.nameText}>{userInfo?.userName}</Text>
            </View>
            <View>
              <Text style={styles.emailText}>{userInfo?.hotel_name}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={{ flex: 1, marginTop: 5 }}>
        <DrawerItemList {...props} />
      </View>
      {isAuthenticated && (
        <TouchableOpacity onPress={logOut} style={{ paddingVertical: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingBottom: 10
            }}>
            <Icon name="logout" type="material-community" color={Colors.grey} size={28} />
            <Text style={[styles.logoutText]}>Logout</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  imageContainer: {
    paddingTop: 10,
    //paddingLeft: 10,
    height: '14%',
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: Colors.primary
  },
  image: {
    width: '35%',
    height: '100%',
    flex: 1,
    resizeMode: 'contain'
    //backgroundColor: Colors.black,
  },
  detailsContainer: {
    width: '65%',
    marginBottom: 25
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hiText: {
    paddingRight: 3,
    fontSize: 16,
    color: Colors.White_Smoke
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.White_Smoke
  },
  emailText: {
    fontSize: 14,
    color: Colors.White_Smoke
  },
  logoutText: {
    color: Colors.grey,
    marginLeft: 30,
    fontWeight: '600'
  },
  logoutText1: {
    fontWeight: '600',
    fontSize: 20
  },
  logoutText2: {
    fontWeight: '600'
  }
});
