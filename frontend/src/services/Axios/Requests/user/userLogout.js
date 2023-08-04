// axios
import axiosInstance from '../../configs/configs';

// GET user logout
const userLogout = async () =>
	axiosInstance.get('/logout', {
		withCredentials: true
	});

// exports
export { userLogout };
