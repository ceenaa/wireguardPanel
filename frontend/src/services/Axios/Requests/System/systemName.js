// axios
import axiosInstance from '../../Configs/configs';

// GET system infos
const systemInfos = async (name) =>
	axiosInstance.get(`/system/${name}`, {
		withCredentials: true
	});

// exports
export { systemInfos };
