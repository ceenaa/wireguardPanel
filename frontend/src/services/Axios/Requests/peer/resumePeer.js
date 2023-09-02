// axios
import axiosInstance from '../../Configs/configs';

// GET user validate
const postResumePeer = async (peerName) =>
	axiosInstance.put(`/test/peers/${peerName}/resume`, '', {
		withCredentials: true
	});

// exports
export { postResumePeer };
