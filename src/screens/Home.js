import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import HeaderBar from '../components/header/HeaderBar';
import { Colors } from '../constants/Colors';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/input/CustomInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Icon } from '@rneui/themed';
import UserDetails from '../components/userpopup/UserDetails';
import LoadingDisplay from '../components/LoadingDisplay';
import { updateProfile, fetchProfile } from '../apis/Auth';
import Toast from 'react-native-toast-message';

const Home = ({ navigation }) => {
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

  const { isAuthenticated, user, saveUser } = useContext(AuthContext);
  const userInfo = user ? JSON.parse(user) : '';

  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [closeModal, setCloseModal] = useState(false);
  const [stepper, setStepper] = useState(1);
  const [userDetails, setUserDetails] = useState();
  const [load, setLoad] = useState(false);

  const initialValues = {
    favourite_pet: '',
    favourite_book: ''
  };

  useEffect(() => {
    if (isAuthenticated && !userInfo?.is_active) {
      if (!closeModal) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
      setTimeout(() => setShowLoader(false), 3000);
    } else if (!isAuthenticated && !userInfo) {
      setShowModal(false);
      setTimeout(() => setShowLoader(false), 3000);
    }
  }, [userInfo, closeModal]);

  useEffect(() => {
    if (isAuthenticated && userInfo?.is_active) {
      toast('info', 'Authenticated Successfully');
    }
  }, []);

  const lineGraphlabels = ['', '', 'Active Users', '', ''];
  const lineGraph = [10, 16, 18, 10, 4, 12];
  const lineGraphData = {
    labels: lineGraphlabels,
    datasets: [
      {
        data: lineGraph
      }
    ]
  };

  const pieGraphData = [
    {
      name: 'Seoul',
      population: 21500000,
      color: Colors.powder_blue,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: Colors.orange_dark,
      legendFontColor: '#7F7F7F',
      legendFontSize: 14
    },
    {
      name: 'Beijing',
      population: 527612,
      color: Colors.red,
      legendFontColor: '#7F7F7F',
      legendFontSize: 14
    },
    {
      name: 'New York',
      population: 8538000,
      color: Colors.grey,
      legendFontColor: '#7F7F7F',
      legendFontSize: 14
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: Colors.purple_dark,
      legendFontColor: '#7F7F7F',
      legendFontSize: 14
    }
  ];

  const barGraphData = {
    labels: ['Manager', 'Receptionist', 'Night Auditor'],
    datasets: [
      {
        data: [20, 45, 8]
      }
    ]
  };

  const getDetails = (values) => {
    if (values) {
      Object.keys(values).map((res) => {
        if (res !== '') {
          setStepper(2);
          setUserDetails(values);
        }
      });
    }
  };

  const toast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
      visibilityTime: 3000
    });
  };

  const submitData = async (values) => {
    setLoad(true);
    const data = {
      ...userDetails,
      ...values
    };
    const profile = await updateProfile(userInfo.id, data);
    if (profile?.status) {
      const user = await fetchProfile();
      saveUser(JSON.stringify(user.user))
      setCloseModal(true);
      setLoad(false);
      setShowModal(false);
      toast('success', profile?.message);
    } else {
      toast('error', profile.message);
      setLoad(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!showLoader ? (
        <View style={styles.rootContainer}>
          {showModal ? (
            <Formik
              validationSchema={validate}
              initialValues={initialValues}
              onSubmit={(values) => submitData(values)}>
              {({ handleSubmit, handleChange, values, errors, touched }) => {
                return (
                  <View style={styles.modalContainer}>
                    <View style={styles.modalInContainer}>
                      {stepper === 1 ? (
                        <UserDetails getDetails={getDetails} target={userDetails} />
                      ) : (
                        <>
                          <View style={styles.questionTitlectn}>
                            <Text style={styles.questionTitle}>
                              Please answer these questions for security reasons
                            </Text>
                          </View>
                          <View>
                            <Text>What is your favourite pet?</Text>
                            <CustomInput
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
                            <Text>what is your favourite book?</Text>
                            <CustomInput
                              question={true}
                              title={'Book'}
                              placeholder={'Favourite Book'}
                              value={values.favourite_book}
                              onChangeText={handleChange('favourite_book')}
                              touched={touched.favourite_book}
                              errors={errors.favourite_book}
                            />
                          </View>
                          <View style={styles.buttonsContainer}>
                            <View
                              style={stepper === 1 ? styles.nextRContainer : styles.nextLContainer}>
                              <TouchableOpacity
                                style={styles.nextCircle}
                                onPress={() => setStepper(1)}>
                                <Icon
                                  name={'chevron-thin-left'}
                                  type="entypo"
                                  color={Colors.secondary}
                                  size={25}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.submitContainer}>
                              {load ? (
                                <TouchableOpacity
                                  style={[
                                    styles.saveHolder,
                                    {
                                      paddingHorizontal: 30,
                                      paddingVertical: 12
                                    }
                                  ]}>
                                  <ActivityIndicator size={'small'} color={Colors.secondary} />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity onPress={handleSubmit} style={styles.saveHolder}>
                                  <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                );
              }}
            </Formik>
          ) : (
            <>
              <HeaderBar
                title={'Home'}
                navigation={navigation}
                showIcon={true}
                isAuthenticated={isAuthenticated}
              />
              <ScrollView>
                <View style={[styles.graphHolder, { paddingRight: 20 }]}>
                  <LineChart
                    data={lineGraphData}
                    verticalLabelRotation={0}
                    width={Dimensions.get('window').width * 0.9}
                    height={180}
                    //yAxisSuffix="U"
                    yAxisInterval={10}
                    chartConfig={{
                      backgroundColor: Colors.secondary,
                      backgroundGradientFrom: Colors.secondary,
                      backgroundGradientTo: Colors.secondary,
                      decimalPlaces: 0,
                      color: () => Colors.purple_dark,
                      propsForDots: {
                        r: '5',
                        strokeWidth: '1',
                        stroke: Colors.secondary
                      }
                    }}
                    style={styles.graph}
                  />
                </View>
                <View style={[styles.graphHolder]}>
                  <PieChart
                    data={pieGraphData}
                    width={Dimensions.get('window').width * 0.94}
                    height={180}
                    chartConfig={{
                      //backgroundColor: Colors.secondary,
                      color: () => Colors.secondary
                    }}
                    accessor={'population'}
                    backgroundColor={Colors.secondary}
                    paddingLeft={'15'}
                    center={[10, 10]}
                    relative
                    style={styles.graph}
                  />
                </View>
                <View style={[styles.graphHolder]}>
                  <BarChart
                    style={styles.graph}
                    data={barGraphData}
                    width={Dimensions.get('window').width * 0.94}
                    height={180}
                    //yAxisLabel="$"
                    showBarTops={true}
                    showValuesOnTopOfBars={true}
                    withVerticalLabels={true}
                    withHorizontalLabels={false}
                    //withInnerLines={false}
                    fromZero={true}
                    chartConfig={{
                      backgroundColor: Colors.secondary,
                      backgroundGradientFrom: Colors.secondary,
                      backgroundGradientTo: Colors.secondary,
                      decimalPlaces: 0,
                      color: () => Colors.purple_dark
                    }}
                    verticalLabelRotation={0}
                  />
                </View>
                <View style={{ margin: 50 }} />
              </ScrollView>
              <Toast />
            </>
          )}
        </View>
      ) : (
        <LoadingDisplay />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  graphHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 6,
    height: 200,
    backgroundColor: Colors.secondary
  },
  graph: {
    alignItems: 'center',
    marginHorizontal: 0,
    paddingBottom: 0,
    backgroundColor: Colors.secondary,
    elevation: 0,
    shadowOpacity: 0
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  modalInContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.secondary
  },
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
  questionTitlectn: {
    paddingVertical: 20
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.Dark_grey,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nextRContainer: {
    alignItems: 'flex-end',
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
    backgroundColor: Colors.primary
  },
  submitContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 20
  },
  saveHolder: {
    alignItems: 'center',
    elevation: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16
  },
  saveText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondary
  }
});

export default Home;
