// axios
import axiosInstance from '../../Configs/configs';

// GET user logout
const userLogout = async () =>
	axiosInstance.get('/logout', {
		withCredentials: true
	});

// exports
export { userLogout };
