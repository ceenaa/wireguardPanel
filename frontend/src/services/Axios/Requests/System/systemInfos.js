// axios
import axiosInstance from '../../Configs/configs';

// GET system infos
const getSystemInfos = async () =>
	axiosInstance.get(`/systems/wg0?page=1&per_page=10`, {
		withCredentials: true
	});

// exports
export { getSystemInfos };
