import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Platform,
  StyleSheet
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Colors } from '../../constants/Colors';
import { Icon } from '@rneui/themed';
import CustomInput from '../../components/input/CustomInput';
import ForgotUserDetails from '../../components/userpopup/ForgotUserDetails';
import {
  forgotPasswordApi
  //  fetchProfile
} from '../../apis/Auth';
//import { AuthContext } from '../../context/AuthContext';

const ForgotPassword = ({ navigation }) => {
  const validate = yup.object().shape({
    favourite_pet: yup
      .string()
      .required('Pet Name must be entered')
      .max(40, 'Pet Name must not exceed 40 characters')
      .min(3, 'Pet Name must be atleast 3 characters long'),
    favourite_book: yup
      .string()
      .required('Book Name must be entered')
      .max(40, 'Book Name must not exceed 40 characters')
      .min(3, 'Book Name must be atleast 3 characters long')
  });

  const [authenticating, setAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focus, setFocus] = useState(false);
  const [stepper, setStepper] = useState(1);
  const [userDetails, setUserDetails] = useState('');
  const [answers, setAnswers] = useState('');
  //const { logIn, saveUser } = useContext(AuthContext);

  const initialValues = {
    favourite_pet: answers ? answers?.favourite_pet : '',
    favourite_book: answers ? answers?.favourite_book : ''
  };

  const forgotUser = (values) => {
    if (values) {
      Object.keys(values).map((res) => {
        if (res !== '') {
          setUserDetails(values);
          setStepper(2);
        }
      });
    }
  };

  const changeStepper = (values) => {
    setAnswers(values);
    setStepper(1);
  };

  const forgotPassword = async (values) => {
    setAuthenticating(true);
    const data = {
      ...userDetails,
      ...values
    };
    const target = await forgotPasswordApi(data);
    // const token = await forgotPasswordApi(data);
    // if (token.status) {
    //   try {
    //     logIn(token?.data?.access_token);
    //     const data = await fetchProfile();
    //     if (data?.status) {
    //       saveUser(JSON.stringify(data.user));
    //       setAuthenticating(false);
    //       navigation.navigate('homescreen');
    //     }
    //   } catch (error) {
    //     setAuthenticating(false);
    //     setErrorMessage(token.message);
    //     setFocus(true);
    //   }
    // } else {
    //   setErrorMessage(token.message);
    //   setFocus(true);
    //   setAuthenticating(false);
    // }
    if (target?.status) {
      setAuthenticating(false);
      navigation.navigate('login', { password_changed: true });
    } else {
      setErrorMessage(target?.message);
      setFocus(true);
      setAuthenticating(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {stepper === 1 && (
        <View style={styles.iconbtn}>
          <Icon
            name={Platform.OS === 'ios' ? 'md-chevron-back' : 'arrow-back-outline'}
            type="ionicon"
            size={30}
            color={Colors.white}
            onPress={() => navigation.navigate('login')}
          />
        </View>
      )}
      {stepper === 1 ? (
        <ForgotUserDetails target={userDetails} forgotUser={forgotUser} />
      ) : (
        <Formik
          validationSchema={validate}
          initialValues={initialValues}
          onSubmit={(values) => forgotPassword(values)}>
          {({ handleChange, handleSubmit, errors, values, touched }) => (
            <View style={styles.rootContainer}>
              <View style={styles.inCtn}>
                <View style={styles.questionTitlectn}>
                  <Text style={styles.questionTitle}>
                    Please answer these questions to verify your account
                  </Text>
                </View>
                <View>
                  <Text style={styles.question}>What is your favourite pet?</Text>
                  <CustomInput
                    color={Colors.secondary}
                    question={true}
                    title={'Pet'}
                    placeholder={'Favourite Pet'}
                    value={values.favourite_pet}
                    onChangeText={handleChange('favourite_pet')}
                    touched={touched.favourite_pet}
                    errors={errors.favourite_pet}
                  />
                </View>
                <View>
                  <Text style={styles.question}>what is your favourite book?</Text>
                  <CustomInput
                    color={Colors.secondary}
                    question={true}
                    title={'Book'}
                    placeholder={'Favourite Book'}
                    value={values.favourite_book}
                    onChangeText={handleChange('favourite_book')}
                    touched={touched.favourite_book}
                    errors={errors.favourite_book}
                  />
                </View>

                <View style={styles.nextLContainer}>
                  <TouchableOpacity style={styles.nextCircle} onPress={() => changeStepper(values)}>
                    <Icon
                      name={'chevron-thin-left'}
                      type="entypo"
                      color={Colors.primary}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={[styles.errorMsg, styles.errorMsg2]}>{focus && errorMessage}</Text>

              <View style={{ margin: 10 }} />

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
                  <ActivityIndicator color={Colors.primary} size="small" />
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
                  <Text style={[styles.buttonText, styles.buttonText2]}>Submit</Text>
                </TouchableOpacity>
              )}

              <Pressable onPress={() => navigation.navigate('login')}>
                <Text style={[styles.loginText, styles.loginText2]}>Login</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  iconbtn: {
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: Colors.primary
  },
  inCtn: {
    marginHorizontal: 20
  },
  title: {
    marginHorizontal: 20,
    color: Colors.white,
    fontWeight: 'bold'
  },
  title2: {
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
    marginTop: 40,
    marginBottom: 10,
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
    marginBottom: 10,
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
  questionTitlectn: {
    paddingVertical: 20
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.secondary,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20
  },
  question: {
    color: Colors.black,
    fontSize: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nextRContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20
  },
  nextLContainer: {
    alignItems: 'flex-start',
    marginTop: 20
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
