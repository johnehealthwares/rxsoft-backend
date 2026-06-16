//#region node_modules/@mantine/core/esm/core/utils/get-base-value/get-base-value.mjs
function getBaseValue(value) {
	if (typeof value === "object" && value !== null) {
		if ("base" in value) return value.base;
		return;
	}
	return value;
}
//#endregion
export { getBaseValue as t };
