import { createSlice } from '@reduxjs/toolkit';

// status slice
const slice = createSlice({
	name: 'status',
	initialState: { value: '', count: 0 },
	reducers: {
		setStatus: (state, action) => action.payload
	},
	extraReducers: {}
});

// exports
export const { setStatus } = slice.actions;
export default slice.reducer;
