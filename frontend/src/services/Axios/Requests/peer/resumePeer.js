// axios
import axiosInstance from '../../Configs/configs';

// GET user validate
const postResumePeer = async (peerName) =>
	axiosInstance.post(`/test/peers/${peerName}/resume`, '', {
		withCredentials: true
	});

// exports
export { postResumePeer };
