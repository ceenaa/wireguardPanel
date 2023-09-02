import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPeerDetails } from '../../Axios/Requests/peer/peerDetails';

// GET system infos
export const getPeerFromServer = createAsyncThunk('peers/getPeerFromServer', async (peerName) =>
	getPeerDetails(peerName)
);

// system slice
const slice = createSlice({
	name: 'peers',
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPeerFromServer.fulfilled, (state, action) => action.payload.data);
	}
});

// exports
export default slice.reducer;
