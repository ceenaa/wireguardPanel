// axios
import axiosInstance from '../../Configs/configs';

// POST new peer
const postSystemReload = async () =>
	axiosInstance.post(`/test/systems/wg0/reload`, {
		withCredentials: true
	});

// exports
export { postSystemReload };
