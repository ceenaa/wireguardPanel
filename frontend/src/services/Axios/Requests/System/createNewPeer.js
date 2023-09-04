// axios
import axiosInstance from '../../Configs/configs';

// POST new peer
const postNewPeer = async (newPeerInfos) =>
	axiosInstance.post(`/test/systems/MAHDI/peers`, newPeerInfos, {
		withCredentials: true
	});

// exports
export { postNewPeer };
