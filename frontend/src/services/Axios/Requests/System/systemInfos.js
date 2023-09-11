// axios
import axiosInstance from '../../Configs/configs';

// GET system infos
const getSystemInfos = async (
	systemName,
	page = 1,
	perPage = 10,
	order = 'asc',
	sortBy = 'expire_date',
	status = '',
	peerName = ''
) =>
	axiosInstance.get(
		`/systems/${systemName}?page=${page}&per_page=${perPage}&order=${order}&sort_by=${sortBy}&status=${status}&peer_name=${peerName}`,
		{
			withCredentials: true
		}
	);

// exports
export { getSystemInfos };
