// axios
import axiosInstance from '../../Configs/configs';

// get peer details
const putNewPeer = async (peerName, newPeerDetails) =>
	axiosInstance.put(`/peers/${peerName}`, newPeerDetails, {
		withCredentials: true
	});

// exports
export { putNewPeer };
