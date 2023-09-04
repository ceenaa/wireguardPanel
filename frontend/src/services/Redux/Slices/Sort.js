// redux
import { createSlice } from '@reduxjs/toolkit';

// system slice
const slice = createSlice({
	name: 'sort',
	initialState: [],
	reducers: {
		searchByStatus: (state, action) => action.payload
	},
	extraReducers: {}
});

// exports
export const { searchByStatus } = slice.actions;
export default slice.reducer;
