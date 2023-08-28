// axios
import axiosInstance from '../../Configs/configs';

// POST new peer
const postNewPeer = async (
	newPeerInfos = {
		allowed_ip: 'ALLOWED IP',
		buy_date: '08/28/2023',
		config_end_point: 'CONFIG END POINT',
		data_limit: 60,
		email: 'ce.mahdiabdollahi@gmail.com',
		expire_date: '09/28/2023',
		name: 'MAwassTaken',
		phone: '09194354202'
	}
) =>
	axiosInstance.post(`/test/systems/MAHDI/peers`, newPeerInfos, {
		withCredentials: true
	});

// exports
export { postNewPeer };
