// axios
import axiosInstance from '../../Configs/configs';

// POST user login
const userLogin = async (userInfos) =>
	axiosInstance.post('/login', userInfos, {
		withCredentials: true
	});

// exports
export { userLogin };
