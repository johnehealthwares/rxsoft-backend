//#region node_modules/@mantine/core/esm/core/utils/get-default-z-index/get-default-z-index.mjs
var elevations = {
	app: 100,
	modal: 200,
	popover: 300,
	overlay: 400,
	max: 9999
};
function getDefaultZIndex(level) {
	return elevations[level];
}
//#endregion
export { getDefaultZIndex as t };
