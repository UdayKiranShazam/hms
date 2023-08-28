import React from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import Routes from './src/navigation/Routes';
import { Colors } from './src/constants/Colors';
import { AuthContextProvider } from './src/context/AuthContext';

const App = () => {
  return(
      <SafeAreaView style={styles.rootContainer}>
        <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'} />
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary
  },
});

export default App;
