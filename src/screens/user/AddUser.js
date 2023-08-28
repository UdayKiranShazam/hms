import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import NavBackHeader from '../../components/header/NavBackHeader';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/input/CustomInput';
import CustomDropdown from '../../components/input/CustomDropdown';
import SubmitButton from '../../components/buttons/SubmitButton';
import { createUser, updateUser } from '../../redux/actions/usermanagement';
import CustomBottomSheet from '../../components/bottomsheet/CustomBottomSheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import RadioButton from '../../components/layout/RadioButton';

const AddUser = ({ navigation, route }) => {
  const validate = yup.object().shape({
    name: yup.string().required('Name is required'),
    mobile_no: yup.number().typeError('Must be a number'),
    email: yup.string().email('Email is invalid').required('Email is required').max(40,'Email must not exceed 40 characters'),
    password: yup.string().required('Password is required').max(16,'Password must not exceed 16 characters').min(6,'Password must be at least 6 characters'),
    role: yup.string().required('Role is required')
  });

  const user = route.params?.user;
  const edit = route.params?.edit;

  const sheetRef = useRef(null);
  const snapPoints = ['30%'];
  const formRef = useRef();

  const initialValues = {
    name: user ? user?.name : '',
    mobile_no: user ? user?.mobile_no : '',
    email: user ? user?.email : '',
    password: user ? user?.password : '',
    role: user ? user?.role : ''
  };

  const roleList = [
    { label: 'Manager', value: 2 },
    { label: 'Staff', value: 3 },
  ];

  const dispatch = useDispatch();

  const handleOpenSheet = async () => {
    await formRef?.current?.setFieldTouched(false);
    await sheetRef.current?.snapToIndex(0);
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const submitData = async (values) => {
    if (edit) {
      values.id = user.id;
      await dispatch(updateUser(values));
      navigation.goBack();
    } else {
      await dispatch(createUser(values));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.rootContainer}>
      <NavBackHeader navigation={navigation} title={'ADD USER'} />
      <Formik
        innerRef={formRef}
        validationSchema={validate}
        initialValues={initialValues}
        onSubmit={(values) => submitData(values)}>
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched
        }) => {
          return (
            <View style={styles.container}>
              <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                <CustomInput
                  placeholder={'Name'}
                  title={'Name'}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  errors={errors.name}
                  touched={touched.name}
                />
                <CustomInput
                  placeholder={'Email'}
                  title={'Email'}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  errors={errors.email}
                  touched={touched.email}
                />
                <CustomInput
                  placeholder={'Password'}
                  title={'Password'}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  errors={errors.password}
                  touched={touched.password}
                />
                <CustomInput
                  placeholder={'Mobile'}
                  title={'Mobile'}
                  onChangeText={handleChange('mobile_no')}
                  value={values.mobile_no}
                  keyboardType={'numeric'}
                  errors={errors.mobile_no}
                  touched={touched.mobile_no}
                />
                <CustomDropdown
                  title={'Role'}
                  value={values.role}
                  onPress={handleOpenSheet}
                  errors={errors.role}
                  touched={touched.role}
                />

                <View style={{ marginTop: 60, alignItems: 'center' }}>
                  <SubmitButton onPress={handleSubmit} />
                </View>
              </View>

              <CustomBottomSheet sheetRef={sheetRef} snapPoints={snapPoints}>
                <BottomSheetFlatList
                  data={roleList}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => {
                    return (
                      <Pressable
                        onPress={() => {
                          setFieldValue('role', item.value);
                          setFieldTouched('role');
                          handleCloseSheet();
                        }}>
                        <View style={styles.sheetContainer}>
                          <Text style={[styles.sheetText]}>{item.label}</Text>
                          <RadioButton show={item.value === values.role ? true : false} />
                        </View>
                      </Pressable>
                    );
                  }}
                />
              </CustomBottomSheet>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  container: {
    flex: 1
    //marginTop: 50,
    //marginHorizontal: 20,
  },
  labelContainer: {
    backgroundColor: Colors.secondary, // Same color as background
    alignSelf: 'flex-start', // Have View be same width as Text inside
    paddingHorizontal: 3,
    marginStart: 12,
    zIndex: 1, // Label must overlap border
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute', // Needed to be able to precisely overlap label with border
    top: -12 // Vertical position of label. Eyeball it to see where label intersects border.
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light_Grey,
    padding: 6,
    zIndex: 0 // Ensure border has z-index of 0
  },
  inputTitle: {
    paddingLeft: 0
  },
  textInput: {
    fontSize: 18,
    padding: 4,
    paddingLeft: 14
  },
  sheetContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.secondary
  },
  sheetText: {
    fontSize: 16,
    color: Colors.black,
    textTransform: 'capitalize'
  }
});

export default AddUser;
