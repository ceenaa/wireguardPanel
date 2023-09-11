import { createSlice } from '@reduxjs/toolkit';

// search slice
const slice = createSlice({
	name: 'search',
	initialState: '',
	reducers: {
		setSearch: (state, action) => action.payload
	},
	extraReducers: {}
});

// exports
export const { setSearch } = slice.actions;
export default slice.reducer;
