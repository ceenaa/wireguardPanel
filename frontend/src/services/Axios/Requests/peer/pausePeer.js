// axios
import axiosInstance from '../../Configs/configs';

// GET user validate
const postPausePeer = async (peerName) =>
	axiosInstance.put(`/test/peers/${peerName}/pause`, '', {
		withCredentials: true
	});

// exports
export { postPausePeer };
