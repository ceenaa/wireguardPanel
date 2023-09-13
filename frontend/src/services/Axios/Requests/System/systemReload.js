// axios
import axiosInstance from '../../Configs/configs';

// POST system reload
const postSystemReload = async (systemName) =>
	axiosInstance.post(`/test/systems/${systemName}/reload`, '', {
		withCredentials: true
	});

// exports
export { postSystemReload };
