import axios from 'axios';
import getEnvVars from '../../environment';
import { handleResponse } from '../utils/error';
import apiInstance from '../context/configurations';

const { end_point, content_type } = getEnvVars();

export const logInApi = async (values) => {
  return await axios({
    method: 'post',
    url: end_point + '/users/login',
    data: values,
    headers: { 'Content-Type': content_type }
  })
    .then((response) => response.data)
    .catch(handleResponse);
};

export const signUpApi = async (values) => {
  return await axios({
    method: 'post',
    url: end_point + '/users/signup',
    data: values,
    headers: { 'Content-Type': content_type }
  })
    .then((response) => response.data)
    .catch(handleResponse);
};

export const forgotPasswordApi = async (values) => {
  return await axios({
    method: 'post',
    url: end_point + '/auth/forgot-password',
    data: values,
    headers: { 'Content-Type': content_type }
  })
    .then((response) => response.data)
    .catch(handleResponse);
};

export const fetchProfile = async () => {
  return apiInstance
    .get('/auth/profile')
    .then((response) => response.data)
    .catch(handleResponse);
};

export const updateProfile = async (id, data) => {
  return apiInstance
    .post(`/auth/user/${id}`, data)
    .then((response) => response.data)
    .catch(handleResponse);
};
