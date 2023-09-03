// axios
import axiosInstance from '../../Configs/configs';

// POST new peer
const postNewPeer = async (newPeerInfos) =>
	axiosInstance.post(`/test/systems/wg0/peers`, newPeerInfos, {
		withCredentials: true
	});

// exports
export { postNewPeer };
