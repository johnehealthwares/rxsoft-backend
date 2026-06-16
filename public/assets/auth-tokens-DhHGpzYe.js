//#region src/lib/auth-tokens.ts
var ACCESS_TOKEN_KEY = "rxsoft_admin_access_token";
var REFRESH_TOKEN_KEY = "rxsoft_admin_refresh_token";
function decodeUserFromAccessToken(accessToken) {
	try {
		const payloadRaw = accessToken.split(".")[1] ?? "";
		const payload = JSON.parse(atob(payloadRaw));
		if (!payload.sub || !payload.username) return null;
		return {
			id: payload.sub,
			username: payload.username,
			roles: payload.roles ?? [],
			phone: payload.phone
		};
	} catch {
		return null;
	}
}
function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}
function getRefreshToken() {
	return localStorage.getItem(REFRESH_TOKEN_KEY);
}
function persistTokens(accessToken, refreshToken) {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}
function clearTokens() {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
}
//#endregion
export { persistTokens as a, getRefreshToken as i, decodeUserFromAccessToken as n, getAccessToken as r, clearTokens as t };
