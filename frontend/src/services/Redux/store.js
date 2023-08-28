// redux
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// reducers
import System from './Slices/System';
import Peers from './Slices/Peers';

// store
export default configureStore({
	reducer: {
		system: System,
		peers: Peers
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});
