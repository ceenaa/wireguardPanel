// axios
import axiosInstance from '../../Configs/configs';

// GET peer details
const getPeerDetails = async (peerName) =>
	axiosInstance.get(`/peers/${peerName}`, {
		withCredentials: true
	});

// exports
export { getPeerDetails };
