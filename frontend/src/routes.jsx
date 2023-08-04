// pages
import Login from './pages/Login/Login';
import PanelPrivateRoute from './components/Privates/PanelPrivateRoute';
import Panel from './pages/Panel/Panel';

// routes
const routes = [
	{
		path: '/',
		element: (
			<PanelPrivateRoute>
				<Panel />
			</PanelPrivateRoute>
		)
	},
	{
		path: '/panel',
		element: (
			<PanelPrivateRoute>
				<Panel />
			</PanelPrivateRoute>
		)
	},
	{ path: '/login', element: <Login /> }
];

// exports
export default routes;
