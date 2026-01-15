import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");

	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const isLoginPath = error.config?.url?.includes("/auth/login");

		if (error.response?.status === 40 && !isLoginPath) {
			localStorage.clear();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default api;
