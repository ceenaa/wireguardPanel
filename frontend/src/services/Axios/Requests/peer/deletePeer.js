// axios
import axiosInstance from '../../Configs/configs';

// DELETE peer
const deletePeer = async (peerName) =>
	axiosInstance.delete(`/peers/${peerName}`, {
		withCredentials: true
	});

// exports
export { deletePeer };
