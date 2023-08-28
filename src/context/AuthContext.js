import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProfile } from '../apis/Auth';

export const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
  logIn: () => {},
  saveUser: () => {},
  logOut: () => {}
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      //console.log(storedToken);
      if (storedToken) {
        setAuthToken(storedToken);
      }
    };
    fetchToken();

    async function fetchUser() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        try {
          const user = await fetchProfile();
          if (user.status) {
            return setUserData(JSON.stringify(user.user));
          } else {
            return logOut();
          }
        } catch (error) {
          return logOut();
        }
      }
    }
    fetchUser();
  }, []);

  const logIn = async (token) => {
    try {
      setAuthToken(token);
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('Auth Context signIn: Error at asyncstorage', error);
    }
  };

  const saveUser = async (user) => {
    try {
      if (user) {
        setUserData(user);
      }
    } catch (e) {
      console.log('Auth Context saveUser: Error at asyncstorage');
    }
  };

  const logOut = async () => {
    try {
      setAuthToken(null);
      setUserData(null);
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('Auth Context signOut: Error at asyncstorage', error);
    }
  };

  const values = {
    user: userData,
    isAuthenticated: !!authToken,
    saveUser,
    logIn,
    logOut
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
