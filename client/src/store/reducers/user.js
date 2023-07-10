// reducers/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		registerUserStart: state => {
			state.loading = true;
			state.error = null;
		},
		registerUserSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.error = null;
		},
		registerUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { registerUserStart, registerUserSuccess, registerUserFailure } =
	userSlice.actions;

export default userSlice.reducer;
