import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Icon } from '@rneui/themed';
import { Colors } from '../../constants/Colors';
import { fetchProfile, logInApi } from '../../apis/Auth';
import { AuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation, route }) => {
  const validate = yup.object().shape({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email must be entered')
      .max(40, 'Email must not exceed 40 characters')
      .min(10, 'Email must be atleast 10 characters long'),
    password: yup
      .string()
      .required('Password must be entered')
      .min(6, 'Password must be atleast 6 characters long')
      .max(20, 'Password must not exceed 20 characters')
  });

  const [authenticating, setAuthenticating] = useState(false);
  const [load, setLoad] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focus, setFocus] = useState(false);
  const { logIn, saveUser } = useContext(AuthContext);
  const password_changed = route.params?.password_changed;

  const initialValues = {
    email: '',
    password: ''
  };

  useEffect(() => {
    if (password_changed) {
      toast();
    }
  }, [password_changed]);

  const toast = () => {
    Toast.show({
      type: 'success',
      text1: 'Password changed successfully',
      visibilityTime: 3000
    });
  };

  const login = async (values) => {
    setAuthenticating(true);
    const token = await logInApi(values);
    console.log(token);
    if (token.status) {
      try {
        logIn(token?.data?.access_token);
        const data = await fetchProfile();
        if (data?.status) {
          saveUser(JSON.stringify(data.user));
          setAuthenticating(false);
          navigation.navigate('homescreen');
        }
      } catch (error) {
        setAuthenticating(false);
        setErrorMessage(token.message);
        setFocus(true);
      }
    } else {
      setErrorMessage(token.message);
      setFocus(true);
      setAuthenticating(false);
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconbtn}>
        <Icon
          name={Platform.OS === 'ios' ? 'md-chevron-back' : 'arrow-back-outline'}
          type="ionicon"
          size={30}
          color={Colors.white}
          onPress={() => navigation.navigate('homescreen')}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Formik
          validationSchema={validate}
          initialValues={initialValues}
          onSubmit={(values) => login(values)}>
          {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
            <View style={styles.rootContainer}>
              <View style={[styles.imageContainer, styles.imageContainer2]}>
                <Image
                  source={require('../../assets/logo2.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>

              <View style={{ margin: 16 }} />

              <View
                style={
                  touched.email && errors.email
                    ? [styles.inputErrContainer, styles.inputErrContainer2]
                    : [styles.inputContainer, styles.inputContainer2]
                }>
                <Icon
                  name="user"
                  type="antdesign"
                  size={25}
                  color={emailFocus === true ? Colors.white : Colors.light_Grey}
                />

                <TextInput
                  style={[styles.textInput, styles.emailWidth, styles.textInput2]}
                  placeholder="Email"
                  placeholderTextColor={Colors.light_Grey}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  cursorColor={Colors.white}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onFocus={() => {
                    setEmailFocus(true);
                    setPasswordFocus(false);
                    setFocus(false);
                  }}
                  value={values.email}
                />
              </View>
              <Text
                style={
                  touched.email && errors.email
                    ? [styles.errorText, styles.errorText2]
                    : styles.withOutErr
                }>
                {touched.email && errors.email}
              </Text>

              <View
                style={
                  touched.password && errors.password
                    ? [styles.inputErrContainer, styles.inputErrContainer2]
                    : [styles.inputContainer, styles.inputContainer2]
                }>
                <Icon
                  name="lock-outline"
                  type="material-community"
                  size={25}
                  color={passwordFocus === true ? Colors.white : Colors.light_Grey}
                />
                <TextInput
                  style={[styles.textInput, styles.textInput2]}
                  placeholder="Password"
                  placeholderTextColor={Colors.light_Grey}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  cursorColor={Colors.light_Grey}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword ? true : false}
                  onFocus={() => {
                    setEmailFocus(false);
                    setPasswordFocus(true);
                    setFocus(false);
                  }}
                />
                <View style={styles.iconHolder}>
                  <Icon
                    name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                    type="ionicon"
                    size={25}
                    color={hidePassword ? Colors.light_Grey : Colors.white}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                </View>
              </View>
              <Text
                style={
                  touched.password && errors.password
                    ? [styles.errorText, styles.errorText2]
                    : styles.withOutErr
                }>
                {touched.password && errors.password}
              </Text>

              <Text style={[styles.errorMsg, styles.errorMsg2]}>{focus && errorMessage}</Text>

              {authenticating ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.button2,
                    {
                      shadowOffset: Platform.OS === 'ios' && {
                        width: 2,
                        height: 0
                      }
                    }
                  ]}>
                  <ActivityIndicator color={Colors.primary} size="large" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.button2,
                    {
                      shadowOffset: Platform.OS === 'ios' && {
                        width: 2,
                        height: 0
                      }
                    }
                  ]}
                  onPress={handleSubmit}>
                  <Text style={[styles.buttonText, styles.buttonText2]}>Login</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Formik>

        <View style={styles.googleHolder}>
          {load ? (
            <TouchableOpacity
              style={[
                styles.sheetButton,
                styles.sheetButton2,
                {
                  shadowOffset: Platform.OS === 'ios' && {
                    width: 2,
                    height: 0
                  }
                },
                { backgroundColor: Colors.secondary }
              ]}>
              <View style={styles.indicatorPosi}>
                <ActivityIndicator color={Colors.primary} size="large" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.sheetButton,
                styles.sheetButton2,
                {
                  shadowOffset: Platform.OS === 'ios' && {
                    width: 2,
                    height: 0
                  }
                },
                { backgroundColor: Colors.secondary }
              ]}>
              <View style={styles.iconPadding}>
                <Icon name="google" type="font-awesome" size={25} color={Colors.Crimson} />
              </View>
              <View style={styles.indicatorPosi}>
                <Text style={[styles.sheetButtonText, styles.sheetButtonText2]}>
                  Login with Google
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.signupHolder}>
          <Pressable onPress={() => navigation.navigate('forgotpassword')}>
            <Text style={[styles.forgotText]}>Forgot Password</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text style={[styles.forgotText]}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.primary
  },
  iconbtn: {
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingTop: 12
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  rootContainer: {
    alignItems: 'center'
  },
  landscapeContainer: {
    alignItems: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    elevation: 0,
    backgroundColor: Colors.primary
  },
  imageContainer2: {
    width: 230,
    height: 200
  },
  image: {
    width: '100%',
    height: '100%'
  },
  emailWidth: {
    width: '90%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 5,
    backgroundColor: Colors.primary,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.white
  },
  inputContainer2: {
    height: 40
  },
  inputErrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 5,
    backgroundColor: Colors.primary,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.red
  },
  inputErrContainer2: {
    height: 40
  },
  textInput: {
    marginLeft: 10,
    height: 60,
    width: '80%',
    color: Colors.white
  },
  textInput2: {
    fontSize: 18
  },
  errorText: {
    marginBottom: 10,
    color: Colors.red // crimson
  },
  errorText2: {
    fontSize: 14
  },
  withOutErr: {
    marginTop: 0
  },
  errorMsg: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 4,
    color: Colors.red,
    marginHorizontal: 10
  },
  errorMsg2: {
    fontSize: 16
  },
  iconHolder: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 1
  },
  button: {
    width: '90%',
    backgroundColor: Colors.white, // dodgerblue
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    color: Colors.white
  },
  button2: {
    height: 50
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: 'bold'
  },
  buttonText2: {
    fontSize: 20
  },
  forgotText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500'
  },
  forgotText2: {},
  googleHolder: {
    alignItems: 'center',
    marginTop: 15
  },
  sheetButton: {
    width: '90%',
    backgroundColor: Colors.white, // dodgerblue
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  sheetButton2: {
    marginVertical: 5,
    paddingVertical: 12
  },
  sheetButtonText: {
    color: Colors.Crimson
  },
  sheetButtonText2: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  iconPadding: {
    paddingRight: 20
  },
  signupHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 50,
    justifyContent: 'space-between'
    //backgroundColor: Colors.black
  }

  // or:{
  //   color: Colors.black,
  //   marginVertical: 10,
  //   fontWeight: 'bold',
  // },
  // infoText:{
  //   color:Colors.grey,
  //   marginVertical: 10,
  //   fontSize: 22,
  // },
  // iconHolder:{
  //   flexDirection:'row',
  // },
  // icon:{
  //   backgroundColor:Colors.white,
  //   width: 50,
  //   margin: 10,
  //   borderRadius: 10,
  //   padding: 10,
  //   alignItems: 'center',
  //   elevation: 20,
  //   shadowOpacity: 0.2,
  //   shadowOffset: {width:0, height:4},
  //   shadowRadius: 2
  // },
  // navToLogin:{
  //   width:'80%',
  //   borderBottomColor: Colors.light_Grey,
  //   borderBottomWidth:1.5,
  //   marginVertical: 20,
  // },
  // signText:{
  //   color: Colors.red,
  // },
});
