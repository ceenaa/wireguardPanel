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
	return <div className='bg-slate-950 h-screen font-Vazir'>{router}</div>;
}

// exports
export default App;
