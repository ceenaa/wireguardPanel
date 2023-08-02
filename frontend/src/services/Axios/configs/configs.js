// axios
import axios from 'axios';

// create instance
const axiosInstance = axios.create({
	baseURL: 'http://localhost:8000'
});

// request interceptors
axiosInstance.interceptors.request.use(
	(config) => config,
	(err) => Promise.reject(err)
);

// response interceptors
axiosInstance.interceptors.response.use(
	(response) => {
		console.log(
			`%c Axios-Success(${response.config.url})` + `%c ${response.status}`,
			'color: #22c55e',
			'color: #eab308',
			response.data
		);

		return response;
	},
	(err) => {
		console.log(`%c Axios-Error(${err.config.url}):`, 'color: #ef4444', err);

		return Promise.reject(err);
	}
);

// exports
export default axiosInstance;
