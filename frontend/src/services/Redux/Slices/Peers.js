import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSystemInfos } from '../../Axios/Requests/System/systemInfos';
import { postNewPeer } from '../../Axios/Requests/System/createNewPeer';

// GET system infos
export const getPeersFromServer = createAsyncThunk('system/getPeersFromServer', getSystemInfos);

// system slice
const slice = createSlice({
	name: 'peers',
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPeersFromServer.fulfilled, (state, action) => action.payload.data.Peers);
	}
});

// exports
export default slice.reducer;
