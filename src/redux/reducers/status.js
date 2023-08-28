import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: null,
    options: {
        message: '',
        variant: null,
        show: false,
    }
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        viewMessage: (state, action) => {
            state.state = true;
            state.options = {
                ...initialState.options,
                ...action.payload
            }
        },
        hideMessage: (state) => {
            state.state = null;
            state.options = {
                message: '',
                variant: null,
                show: false,
            }
        }
    }
});

export const { viewMessage, hideMessage } = statusSlice.actions;

export default statusSlice.reducer;