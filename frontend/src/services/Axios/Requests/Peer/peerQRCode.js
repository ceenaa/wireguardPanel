// axios
import axiosInstance from '../../Configs/configs';

// GET peer QRCode
const getPeerQRCode = async (peerName) =>
	axiosInstance.get(`/peers/${peerName}/conf`, {
		withCredentials: true
	});

// exports
export { getPeerQRCode };
