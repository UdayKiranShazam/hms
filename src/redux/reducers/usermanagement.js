import { createSlice } from '@reduxjs/toolkit';
import { createUser, updateUser, deleteUser, getUsers } from '../actions/usermanagement';

// const initialState = {
//   userlist: [
//     {
//       id: 1,
//       name: 'Bosco and Sons',
//       mobile_no: '9867686969',
//       role: 'Attender',
//       invoiceNumber: '1231'
//     },
//     {
//       id: 2,
//       name: 'Kreiger',
//       mobile_no: '8696966966',
//       role: 'Manager',
//       invoiceNumber: '1249'
//     },
//     {
//       id: 3,
//       name: 'Hegmann, Kreiger and Baye',
//       mobile_no: '6869696666',
//       role: 'Receptionist',
//       invoiceNumber: '1275'
//     },
//     {
//       id: 4,
//       name: 'Hegmann and Baye',
//       mobile_no: '97886969696',
//       role: 'Front Office',
//       invoiceNumber: '1253'
//     },
//     {
//       id: 5,
//       name: 'Hegmann Baye',
//       mobile_no: '7979707077',
//       role: 'Finance',
//       invoiceNumber: '1278'
//     }
//   ]
// };

const userSlice = createSlice({
  name: 'usermanagement',
  initialState: {
    userlist: [],
    userCount: 0,
  },
  reducers: {},
  extraReducers: {
    [createUser.fulfilled]: (state, action) => ({
      ...state,
      userlist: action.payload.list,
      userCount: action.payload.count
    }),
    [updateUser.fulfilled]: (state, action) => ({
      ...state,
      userlist: action.payload,
    }),
    [deleteUser.fulfilled]: (state, action) => ({
      ...state,
      userlist: action.payload
    }),
    [getUsers.fulfilled]: (state, action) => ({
      ...state,
      userlist: action.payload.list,
      userCount: action.payload.count
    })
  }
});

export default userSlice.reducer;
