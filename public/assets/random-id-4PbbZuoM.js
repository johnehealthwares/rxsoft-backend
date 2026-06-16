//#region node_modules/@mantine/hooks/esm/utils/random-id/random-id.mjs
function randomId(prefix = "mantine-") {
	return `${prefix}${Math.random().toString(36).slice(2, 11)}`;
}
//#endregion
export { randomId as t };
