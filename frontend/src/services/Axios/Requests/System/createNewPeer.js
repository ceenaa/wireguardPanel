// axios
import axiosInstance from '../../Configs/configs';

// POST new peer
const postNewPeer = async (newPeerInfos, systemName) =>
	axiosInstance.post(`/test/systems/${systemName}/peers`, newPeerInfos, {
		withCredentials: true
	});

// exports
export { postNewPeer };
