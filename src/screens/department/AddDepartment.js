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
import { createDepartment, updateDepartment } from '../../redux/actions/departmentlist';
import CustomBottomSheet from '../../components/bottomsheet/CustomBottomSheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import RadioButton from '../../components/layout/RadioButton';
import CustomSwitch from '../../components/input/CustomSwitch';

const AddDepartment = ({navigation,route}) => {
    const validate = yup.object().shape({
        name: yup.string().required('Name is required'),
        department_name: yup.string().required('Department name is required'),
        is_active: yup.boolean()
    });
    
      const department = route.params?.department;
      const edit = route.params?.edit;
    
      const sheetRef = useRef(null);
      const snapPoints = ['40%'];
      const formRef = useRef();
    
      const initialValues = {
        name: department ? department?.name : '',
        department_name: department ? department?.name : '',
        is_active: department ? department?.is_active : true
      };
    
      const departmentList = [
        { label: 'Dry Cleaning', value: '1' },
        { label: 'Room Service', value: '2' },
        { label: 'Food Service', value: '3' },
        { label: 'Valet Parking', value: '4' },
        { label: 'Reception', value: '5' },
      ];

      const getDepartmentName = (value) => {
        console.log(value)
        return departmentList.filter((item) => item.value == value).map((item) => item.label);
      };
    
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
            values.id = department.id;
            await dispatch(updateDepartment(values));
            navigation.goBack();
        } else {
            await dispatch(createDepartment(values));
            navigation.goBack();
        }
      };

  return (
    <View style={styles.rootContainer}>
      <NavBackHeader navigation={navigation} title={'ADD DEPARTMENT'} />
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
                <CustomDropdown
                  title={'Department'}
                  value={getDepartmentName(values.department_name)}
                  onPress={handleOpenSheet}
                  errors={errors.department_name}
                  touched={touched.department_name}
                />

                <View style={styles.activeContainer}>
                    <CustomSwitch
                      title={'Active'}
                      onValueChange={(value) => {
                        setFieldValue('is_active', value);
                        setFieldTouched('is_active');
                      }}
                      value={values.is_active}
                    />
                </View>

                <View style={{ marginTop: 60, alignItems: 'center' }}>
                  <SubmitButton onPress={handleSubmit} />
                </View>
              </View>

              <CustomBottomSheet sheetRef={sheetRef} snapPoints={snapPoints}>
                <BottomSheetFlatList
                  data={departmentList}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => {
                    return (
                      <Pressable
                        onPress={() => {
                          setFieldValue('department_name', item.value);
                          setFieldTouched('department_name');
                          handleCloseSheet();
                        }}>
                        <View style={styles.sheetContainer}>
                          <Text style={[styles.sheetText]}>{item.label}</Text>
                          <RadioButton show={item.value === values.department_name ? true : false} />
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
    //elevation: 1,
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
  },
  activeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 10
  },
});

export default AddDepartment;