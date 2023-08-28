import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Icon } from '@rneui/themed';
import { Colors } from '../../constants/Colors';

const ForgotUserDetails = ({ forgotUser, target }) => {
  const validate = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('Email must be entered')
      .max(40, 'Email must not exceed 40 characters')
      .min(10, 'Email must be atleast 10 characters long'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        'Password must contain 6 characters (Uppercase, Lowercase, Numbers and Special characters)'
      )
      .required('Password must be entered')
      .min(6, 'Password must be atleast 6 characters long')
      .max(20, 'Password should not exceed 20 characters')
  });

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const initialValues = {
    email: target ? target.email : '',
    password: target ? target.password : ''
  };

  return (
    <Formik
      validationSchema={validate}
      initialValues={initialValues}
      onSubmit={(values) => forgotUser(values)}>
      {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
        <View style={styles.rootContainer}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.title, styles.title2]}>Forgot your password?</Text>
            <Text style={[styles.info, styles.info2]}>
              Please enter the email address registered to your account.
            </Text>

            <View style={{ margin: 20 }} />

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
                style={[styles.textInput, styles.textInput2, styles.emailWidth]}
                placeholder="Email"
                placeholderTextColor={Colors.light_Grey}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                cursorColor={Colors.light_Grey}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onFocus={() => {
                  setEmailFocus(true);
                  setPasswordFocus(false);
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
                placeholder="New Password"
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
          </View>

          <View style={styles.nextRContainer}>
            <TouchableOpacity style={styles.nextCircle} onPress={handleSubmit}>
              <Icon name={'chevron-thin-right'} type="entypo" color={Colors.primary} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  title: {
    marginHorizontal: 20,
    color: Colors.white,
    fontWeight: 'bold'
  },
  title2: {
    textAlign: 'center',
    fontSize: 30
  },
  info: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
    color: Colors.black
  },
  info2: {
    fontSize: 16
  },
  emailWidth: {
    width: '90%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    //marginBottom: 10,
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
    marginTop: 20,
    //marginBottom: 10,
    backgroundColor: Colors.primary,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.red
  },
  inputErrContainer2: {
    height: 40
  },
  textInput: {
    height: 60,
    marginLeft: 10,
    width: '80%',
    color: Colors.white
  },
  textInput2: {
    fontSize: 18
  },
  errorText: {
    marginTop: 2,
    marginBottom: 10,
    color: Colors.red
  },
  errorText2: {
    fontSize: 14
  },
  withOutErr: {
    marginTop: 0
  },
  errorMsg: {
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 0,
    color: Colors.red,
    marginHorizontal: 10
  },
  errorMsg2: {
    fontSize: 14
  },
  button: {
    width: '40%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 5,
    marginTop: 20,
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
  loginText: {
    color: Colors.white,
    marginTop: 6,
    marginBottom: 10
  },
  loginText2: {
    fontSize: 15
  },
  nextRContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 20
  },
  nextLContainer: {
    alignItems: 'flex-start',
    marginBottom: 20
  },
  nextCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 45,
    height: 45,
    elevation: 10,
    backgroundColor: Colors.secondary
  }
});

export default ForgotUserDetails;
