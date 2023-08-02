// axios
import axiosInstance from '../../configs/configs';

// POST user login
const userLogin = async (userInfos) =>
	axiosInstance.post('/login', userInfos, {
		withCredentials: true
	});

// exports
export { userLogin };
