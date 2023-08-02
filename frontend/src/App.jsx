// react
import React from 'react';
import { useRoutes } from 'react-router-dom';

// styles
import './App.css';

// routes
import routes from './routes';

// app
function App() {
	const router = useRoutes(routes);
	// jsx
	return <div className='bg-emerald-950 h-screen'>{router}</div>;
}

// exports
export default App;
