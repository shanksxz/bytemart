import type { ApiResponse } from "@bytemart/types";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import Axios from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	if (config.headers) config.headers.Accept = "application/json";
	config.withCredentials = true;
	return config;
}

export const api = Axios.create({
	//TODO: currently hardcoded, should be read from env
	baseURL: "http://localhost:8787/v1",
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
	(response) => {
		return {
			...response.data,
			status: response.status,
			headers: response.headers,
		};
	},
	(error: AxiosError) => {
		console.error("API Error:", error.response?.data);
		return Promise.reject({
			...(error.response?.data as ApiResponse<unknown>),
			status: error.response?.status,
		});
	},
);
