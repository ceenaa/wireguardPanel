// axios
import axiosInstance from '../../Configs/configs';

// POST new peer
const postSystemReload = async () =>
	axiosInstance.post(`/test/systems/MAHDI/reload`, {
		withCredentials: true
	});

// exports
export { postSystemReload };
