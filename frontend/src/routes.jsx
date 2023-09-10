// pages
import Login from './pages/Login/Login';
import PanelPrivateRoute from './components/Privates/PanelPrivateRoute';
import Panel from './pages/Panel/Panel';

// components
import PeerDetails from './components/PeerDetails/PeerDetails';
import NewPeer from './components/NewPeer/NewPeer';
import SystemList from './components/SystemList/SystemList';
import PeerQRCode from './components/PeerQRCode/PeerQRCode';

// routes
const routes = [
	{
		path: '/',
		element: (
			<PanelPrivateRoute>
				<Panel />
			</PanelPrivateRoute>
		),
		children: [
			{ path: 'system', element: <SystemList /> },
			{ path: 'new-peer', element: <NewPeer /> },
			{ path: 'peer/:peerName', element: <PeerDetails /> },
			{ path: 'peer/:peerName/qrcode', element: <PeerQRCode /> }
		]
	},
	{ path: '/login', element: <Login /> }
];

// exports
export default routes;
