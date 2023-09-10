// axios
import axiosInstance from '../../Configs/configs';

// GET peer configs
const getPeerConfigs = async (peerName) =>
	axiosInstance.get(`/peers/${peerName}/conf`, {
		responseType: 'blob',
		withCredentials: true
	});

// exports
export { getPeerConfigs };
