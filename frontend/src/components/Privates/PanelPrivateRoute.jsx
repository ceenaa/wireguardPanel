// react
import React, { useEffect, useState } from 'react';

// components
import { userValidate } from '../../services/Axios/Requests/User/userValidate';
import { useNavigate } from 'react-router-dom';

// panel private route
function PanelPrivateRoute({ children }) {
	// is user valid
	const [isUserValidate, setUserValidate] = useState(false);

	// check user validate when mounting
	useEffect(() => {
		// GET user validate
		userValidate()
			.then(() => setUserValidate(true))
			.catch(() => {
				// set user validate to false when error
				setUserValidate(false);

				// navigate to login page
				navigate('/login');
			}, []);
	});

	// navigator
	const navigate = useNavigate();

	// jsx
	return <>{isUserValidate ? <>{children}</> : navigate('/login')}</>;
}

// exports
export default PanelPrivateRoute;
