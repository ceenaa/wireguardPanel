// react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// components
import App from './App';

// main
ReactDOM.createRoot(document.getElementById('root')).render(
	// react router
	<BrowserRouter>
		{/* app */}
		<App />
	</BrowserRouter>
);
