import { createSlice } from '@reduxjs/toolkit';
import { createDepartment, updateDepartment, deleteDepartment } from '../actions/departmentlist';

const initialState = {
  departmentlist: [
    {
      id: 1,
      name: 'Bosco and Sons',
      department_name: '1',
      is_active: true
    },
    {
      id: 2,
      name: 'Kreiger',
      department_name: '2',
      is_active: false
    },
    {
      id: 3,
      name: 'Hegmann, Kreiger and Baye',
      department_name: '3',
      is_active: true
    },
    {
      id: 4,
      name: 'Hegmann and Baye',
      department_name: '4',
      is_active: false
    },
    {
      id: 5,
      name: 'Hegmann Baye',
      department_name: '5',
      is_active: true
    }
  ]
};

const departmentSlice = createSlice({
  name: 'department',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createDepartment.fulfilled]: (state, action) => ({
      ...state,
      departmentlist: action.payload.list
    }),
    [updateDepartment.fulfilled]: (state, action) => ({
      ...state,
      departmentlist: action.payload
    }),
    [deleteDepartment.fulfilled]: (state, action) => ({
      ...state,
      departmentlist: action.payload
    })
  }
});

export default departmentSlice.reducer;