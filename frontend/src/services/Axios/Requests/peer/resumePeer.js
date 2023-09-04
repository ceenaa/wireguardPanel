// axios
import axiosInstance from '../../Configs/configs';

// PUT resume peer
const postResumePeer = async (peerName) =>
	axiosInstance.put(`/test/peers/${peerName}/resume`, '', {
		withCredentials: true
	});

// exports
export { postResumePeer };
