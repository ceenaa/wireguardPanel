// axios
import axiosInstance from '../../Configs/configs';

// GET system list
const getSystemList = async () =>
	axiosInstance.get(`/systems`, {
		withCredentials: true
	});

// exports
export { getSystemList };
