// axios
import axiosInstance from '../../Configs/configs';

// PUT pause peer
const postPausePeer = async (peerName) =>
	axiosInstance.put(`/test/peers/${peerName}/pause`, '', {
		withCredentials: true
	});

// exports
export { postPausePeer };
