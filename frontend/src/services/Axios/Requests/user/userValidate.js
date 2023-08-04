// axios
import axiosInstance from '../../configs/configs';

// GET user validate
const userValidate = async () =>
	axiosInstance.get('/validate', {
		withCredentials: true
	});

// exports
export { userValidate };
