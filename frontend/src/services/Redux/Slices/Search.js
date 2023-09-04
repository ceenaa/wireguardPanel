// redux
import { createSlice } from '@reduxjs/toolkit';

// system slice
const slice = createSlice({
	name: 'search',
	initialState: [],
	reducers: {
		searchByName: (state, action) => action.payload
	},
	extraReducers: {}
});

// exports
export const { searchByName } = slice.actions;
export default slice.reducer;
