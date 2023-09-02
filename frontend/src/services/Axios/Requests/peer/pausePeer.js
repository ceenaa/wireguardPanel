// axios
import axiosInstance from '../../Configs/configs';

// POST pause peer
const postPausePeer = async (peerName) =>
	axiosInstance.post(`/test/peers/${peerName}/pause`, {
		withCredentials: true,
	});

// exports
export { postPausePeer };
