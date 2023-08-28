import { number, object, string } from 'yup';

// new peer authorization
const systemNewPeerSchema = object().shape({
	name: string().required(),
	phone: string().required(),
	allowed_ip: string().required(),
	config_end_point: string().required(),
	data_limit: number().required(),
	email: string().email().required(),
	buy_date: string().required(),
	expire_date: string().required()
});

export { systemNewPeerSchema };
