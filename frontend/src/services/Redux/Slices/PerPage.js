import { createSlice } from '@reduxjs/toolkit';

// perPage slice
const slice = createSlice({
	name: 'page',
	initialState: 10,
	reducers: {
		setPage: (state, action) => action.payload
	},
	extraReducers: {}
});

// exports
export const { setPage } = slice.actions;
export default slice.reducer;
