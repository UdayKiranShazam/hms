import { handleResponse } from '../utils/error';
import apiInstance from '../context/configurations';

export const fetchUsers = async () => {
    return apiInstance
      .get('/v1/user/all')
      .then((response) => response.data)
      .catch(handleResponse);
  };
  
  export const fetchCreateUser = async (data) => {
    return apiInstance
      .post('/v1/user/create', data)
      .then((response) => response.data)
      .catch(handleResponse);
  };
  
  export const fetchUpdateUser = async (id,data) => {
    return apiInstance
      .post(`/v1/user/update/${id}`,data)
      .then((response) => response.data)
      .catch(handleResponse);
  };
  
  export const fetchDeleteUser = async (id) => {
    return apiInstance
      .post(`/v1/user/delete/${id}`)
      .then((response) => response.data)
      .catch(handleResponse);
  };