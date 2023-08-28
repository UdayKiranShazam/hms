import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCreateUser,
  fetchUpdateUser,
  fetchDeleteUser,
  fetchUsers
} from '../../apis/ser';
import { showMessage } from '../reducers/messages';
import { startLoading3, clearLoading3, startLoading1, clearLoading1 } from '../reducers/loader';

export const createUser = createAsyncThunk(
  'usermanagement/createUser',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const userlist = state.usermanagement.userlist;
    //const { deliveryCount } = state.delivery.deliveryCount;
    dispatch(startLoading1());
    try {
      const response = await fetchCreateUser(data);
      console.log(response,'c-u')
      if (response.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'User Created',
            variant: 'success'
          })
        );
        return {
          list: [{ ...response.delivery }, ...userlist],
          count: Number(deliveryCount) + 1,
          response: response
        };
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { list: deliverylist, count: deliveryCount, response: { status: false } };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { list: deliverylist, count: deliveryCount, response: { status: false } };
    }
  }
);

export const updateUser = createAsyncThunk(
  'usermanagement/updateUser',
  async (data, { dispatch, getState }) => {
    const state = getState();
    let { userlist } = state.usermanagement;
    dispatch(startLoading1());
    try {
      const response = await fetchUpdateUser(id,data);
      console.log(response,'U-u')
      if (response.status) {
        dispatch(clearLoading1());
        dispatch(showMessage({ message: 'User Updated', variant: 'success' }));
        const list = deliverylist.map((res) => {
          if (res.id === response.delivery.id) {
            return { ...response.delivery };
          } else {
            return { ...res };
          }
        });
        return { list: list, response: response };
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { list: deliverylist, response: { status: false } };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { list: deliverylist, response: { status: false } };
    }
  }
);

export const deleteUser = createAsyncThunk(
  'delivery/deleteDeliveryList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { deliverylist } = state.delivery;
    dispatch(startLoading1());
    try {
      //const deleteBody = { ids: [data] };
      const response = await fetchDeleteUser(data);
      console.log(response,'D-u')
      if (response.status) {
        dispatch(clearLoading1());
        dispatch(showMessage({ message: 'Delivery Deleted', variant: 'success' }));
        const list = deliverylist.filter((res) => res.id != deleteBody.ids);
        return list;
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return deliverylist;
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return deliverylist;
    }
  }
);

export const getUsers = createAsyncThunk(
  'usermanagement/getUsers',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { userlist } = state.usermanagement;
    dispatch(startLoading3());
    try {
      const response = await fetchUsers();
      //console.log(response?.users,'G-u')
      if (response.status) {
        dispatch(clearLoading3());
        return {
          list: response.users,
          count: response.totalCount
        };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { list: userlist, count: 0 };
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(({ message: error.message, variant: 'error' }));
      return { list: userlist, count: 0 };
    }
  }
);
