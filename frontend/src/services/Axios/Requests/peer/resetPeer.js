// axios
import axiosInstance from '../../Configs/configs';

// PUT reset peer
const putResetPeer = async (peerName) =>
	axiosInstance.put(`/test/peers/${peerName}/reset`, '', {
		withCredentials: true
	});

// exports
export { putResetPeer };
