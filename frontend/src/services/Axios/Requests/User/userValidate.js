// axios
import axiosInstance from '../../Configs/configs';

// GET user validate
const userValidate = async () =>
	axiosInstance.get('/validate', {
		withCredentials: true
	});

// exports
export { userValidate };
