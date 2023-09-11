import { createSlice } from '@reduxjs/toolkit';

// page slice
const slice = createSlice({
	name: 'page',
	initialState: 1,
	reducers: {
		pageDecrement: (state, action) => state - 1,
		pageIncrement: (state, action) => state + 1
	},
	extraReducers: {}
});

// exports
export const { pageDecrement, pageIncrement } = slice.actions;
export default slice.reducer;
