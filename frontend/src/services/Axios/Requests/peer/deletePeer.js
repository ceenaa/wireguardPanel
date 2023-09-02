// axios
import axiosInstance from '../../Configs/configs';

// get peer details
const deletePeer = async (peerName) =>
	axiosInstance.delete(`/peers/${peerName}`, {
		withCredentials: true
	});

// exports
export { deletePeer };
