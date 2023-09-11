import { createSlice } from '@reduxjs/toolkit';

// sort slice
const slice = createSlice({
	name: 'sort',
	initialState: { value: 'expire_date', order: 'asc' },
	reducers: {
		setSort: (state, action) => action.payload
	},
	extraReducers: {}
});

// exports
export const { setSort } = slice.actions;
export default slice.reducer;
