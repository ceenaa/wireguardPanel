// axios
import axiosInstance from '../../Configs/configs';

// PUT new peer
const putNewPeer = async (peerName, newPeerDetails) =>
	axiosInstance.put(`/peers/${peerName}`, newPeerDetails, {
		withCredentials: true
	});

// exports
export { putNewPeer };
