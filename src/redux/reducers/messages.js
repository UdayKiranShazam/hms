import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: null,
  options: {
    message: '',
    variant: null,
    show: false
  }
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload
      };
    },
    hideMessage: (state) => {
      state.state = null;
      state.options = {
        message: '',
        variant: null,
        show: false
      };
    }
  }
});

export const { hideMessage, showMessage } = messageSlice.actions;

export default messageSlice.reducer;
