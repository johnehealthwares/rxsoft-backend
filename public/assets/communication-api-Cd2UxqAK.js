import { n as axios } from "./axios-DSrlKi_a.js";
import { a as persistTokens, i as getRefreshToken, r as getAccessToken, t as clearTokens } from "./auth-tokens-DhHGpzYe.js";
//#region src/lib/communication-api.ts
var COMMUNICATION_API_BASE_URL = "http://localhost:3000/api/v1";
/** @deprecated Use COMMUNICATION_API_BASE_URL instead */
var API_BASE_URL = COMMUNICATION_API_BASE_URL;
var communicationApi = axios.create({
	baseURL: COMMUNICATION_API_BASE_URL,
	timeout: 15e3
});
var isRefreshing = false;
var queued = [];
communicationApi.interceptors.request.use((config) => {
	const token = getAccessToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
communicationApi.interceptors.response.use((response) => response, async (error) => {
	const status = error.response?.status;
	const originalRequest = error.config;
	if (!originalRequest) return Promise.reject(error);
	if (status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/refresh") {
		if (isRefreshing) return new Promise((resolve, reject) => {
			queued.push({
				resolve,
				reject
			});
		});
		originalRequest._retry = true;
		isRefreshing = true;
		try {
			const refreshToken = getRefreshToken();
			if (!refreshToken) {
				clearTokens();
				window.location.href = "/sign-in";
				return Promise.reject(error);
			}
			const { accessToken, refreshToken: newRefreshToken } = (await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken })).data;
			persistTokens(accessToken, newRefreshToken);
			queued.forEach(({ resolve }) => resolve(accessToken));
			queued = [];
			originalRequest.headers.Authorization = `Bearer ${accessToken}`;
			return communicationApi(originalRequest);
		} catch (refreshError) {
			queued.forEach(({ reject }) => reject(refreshError));
			queued = [];
			clearTokens();
			window.location.href = "/sign-in";
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	}
	return Promise.reject(error);
});
//#endregion
export { communicationApi as t };
