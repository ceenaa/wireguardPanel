// redux
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// reducers
import System from './Slices/System';
import Peers from './Slices/Peers';
import Search from './Slices/Search';
import Sort from './Slices/Sort';

// store
export default configureStore({
	reducer: {
		system: System,
		peers: Peers,
		search: Search,
		sort: Sort
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});
