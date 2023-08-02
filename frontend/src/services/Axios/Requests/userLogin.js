// axios
import axiosInstance from '../configs/configs';

// POST login
const userLogin = async (userInfos) => axiosInstance.post('/login', userInfos);

// exports
export { userLogin };
