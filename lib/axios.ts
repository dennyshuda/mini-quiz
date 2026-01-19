import axios, { type AxiosInstance } from "axios";

export const axiosInstance = (token?: string) => {
	return axios.create({
		baseURL: import.meta.env.VITE_API_SERVER_URL,
		headers: {
			...(token && { Authorization: `Bearer ${token}` }),
		},
	});
};
