// redux
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// reducers
import System from './Slices/System';
import Peers from './Slices/Peers';
import Status from './Slices/Status';
import Sort from './Slices/Sort';
import search from './Slices/search';
import Page from './Slices/Page';
import PerPage from './Slices/PerPage';

// store
export default configureStore({
	reducer: {
		system: System,
		peers: Peers,
		status: Status,
		sort: Sort,
		search: search,
		perPage: PerPage,
		page: Page
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});
