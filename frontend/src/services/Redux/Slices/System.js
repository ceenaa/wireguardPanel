import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSystemInfos } from '../../Axios/Requests/System/systemInfos';

// GET system infos
export const getSystemInfosFromServer = createAsyncThunk(
	'system/getSystemInfosFromServer',
	async ({ systemName, page, perPage, order, sortBy, status, peerName }) =>
		getSystemInfos(systemName, page, perPage, order, sortBy, status, peerName)
);

// system slice
const slice = createSlice({
	name: 'system',
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSystemInfosFromServer.pending, (state, action) => []);
		builder.addCase(getSystemInfosFromServer.fulfilled, (state, action) => action.payload.data);
	}
});

// exports
export default slice.reducer;
