import { createAsyncThunk } from '@reduxjs/toolkit';

export const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (data, { getState }) => {
    const state = getState();
    const { departmentlist } = state.department;
    return {
      list: [{ ...data, id: departmentlist.length + 1 }, ...departmentlist]
    };
  }
);

export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (data, { getState }) => {
    const state = getState();
    let { departmentlist } = state.department;
    departmentlist = departmentlist.map((item) => {
      if (item.id === data.id) {
        return data;
      } else {
        return item;
      }
    });
    return departmentlist;
  }
);

export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id, { getState }) => {
    const state = getState();
    let { departmentlist } = state.department;
    const list = await departmentlist.filter((item) => item.id != id);
    return list;
  }
);