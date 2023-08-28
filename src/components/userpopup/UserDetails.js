import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Icon } from '@rneui/themed';
import CustomInput from '../input/CustomInput';
import { Colors } from '../../constants/Colors';
import { AuthContext } from '../../context/AuthContext';

const UserDetails = ({ getDetails, target }) => {

  const numberRegex = /^(\+|\d)[0-9]{9,16}$/;
  const { user } = useContext(AuthContext);
  const userInfo = user ? JSON.parse(user) : '';
  const validate = yup.object().shape({
    userName: yup
      .string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name must not exceed 30 characters'),
    email: yup.string().email().required('Email is required'),
    hotel_name: yup.string().required('Hotel Name  is required'),
    phoneNo: yup
      .string()
      .required('Mobile Number is required')
      .matches(numberRegex,'Phone number is invalid')
      .max(16, 'Mobile number must not exceed 16 digits')
  });

  const initialValues = {
    userName: target ? target?.userName : userInfo ? userInfo?.userName : '',
    email: target ? target?.email : userInfo ? userInfo?.email : '',
    hotel_name: target ? target?.hotel_name : userInfo ? userInfo?.hotel_name : '',
    phoneNo: target ? target?.phoneNo : userInfo ? userInfo?.phoneNo : ''
  };

  return (
    <View>
      <Formik
        validationSchema={validate}
        initialValues={initialValues}
        onSubmit={(values) => getDetails(values)}>
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>USER DETAILS</Text>
              </View>
              <View style={styles.inputContainer}>
                <CustomInput
                  title={'Name'}
                  placeholder={'Name'}
                  value={values.userName}
                  onChangeText={handleChange('userName')}
                  errors={errors.userName}
                  touched={touched.userName}
                />
                <CustomInput
                  editable={false}
                  title={'Email'}
                  placeholder={'Email'}
                  color={Colors.grey}
                  value={values.email}
                />
                <CustomInput
                  title={'Mobile'}
                  placeholder={'Mobile Number'}
                  value={values.phoneNo}
                  onChangeText={handleChange('phoneNo')}
                  keyboardType={'numeric'}
                  errors={errors.phoneNo}
                  touched={touched.phoneNo}
                />
                <CustomInput
                  title={'Hotel'}
                  placeholder={'Hotel Name'}
                  onChangeText={handleChange('hotel_name')}
                  errors={errors.hotel_name}
                  touched={touched.hotel_name}
                  value={values.hotel_name}
                />
              </View>
              <View style={styles.nextRContainer}>
                <TouchableOpacity style={styles.nextCircle} onPress={handleSubmit}>
                  <Icon
                    name={'chevron-thin-right'}
                    type="entypo"
                    color={Colors.secondary}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary
  },
  inputContainer: {},
  nextRContainer: {
    alignItems: 'flex-end',
    marginBottom: 20
  },
  nextCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 45,
    height: 45,
    elevation: 10,
    backgroundColor: Colors.primary
  }
});

export default UserDetails;
