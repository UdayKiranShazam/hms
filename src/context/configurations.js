import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../environment';

const { end_point } = getEnvVars();

const apiInstance = axios.create({
  baseURL: end_point
});
apiInstance.interceptors.request.use(async (config) => {
  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: await AsyncStorage.getItem('token')
  };
  return config;
});

export default apiInstance;
