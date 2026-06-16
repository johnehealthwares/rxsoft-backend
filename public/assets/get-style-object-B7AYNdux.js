//#region node_modules/@mantine/core/esm/core/Box/get-style-object/get-style-object.mjs
function getStyleObject(style, theme) {
	if (Array.isArray(style)) return [...style].reduce((acc, item) => ({
		...acc,
		...getStyleObject(item, theme)
	}), {});
	if (typeof style === "function") return style(theme);
	if (style == null) return {};
	return style;
}
//#endregion
export { getStyleObject as t };
