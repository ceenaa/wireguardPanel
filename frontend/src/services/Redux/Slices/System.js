import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSystemInfos } from '../../Axios/Requests/System/systemInfos';

// GET system infos
export const getSystemInfosFromServer = createAsyncThunk(
	'system/getSystemInfosFromServer',
	getSystemInfos
);

// system slice
const slice = createSlice({
	name: 'system',
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSystemInfosFromServer.fulfilled, (state, action) => action.payload.data);
	}
});

// exports
export default slice.reducer;
