import { D as parseThemeColor, O as getPrimaryShade } from "./Box-7OfPvxF3.js";
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-contrast-color/get-contrast-color.mjs
function getContrastColor({ color, theme, autoContrast }) {
	if (!(typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast)) return "var(--mantine-color-white)";
	return parseThemeColor({
		color: color || theme.primaryColor,
		theme
	}).isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)";
}
function getPrimaryContrastColor(theme, colorScheme) {
	return getContrastColor({
		color: theme.colors[theme.primaryColor][getPrimaryShade(theme, colorScheme)],
		theme,
		autoContrast: null
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-auto-contrast-value/get-auto-contrast-value.mjs
function getAutoContrastValue(autoContrast, theme) {
	return typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
}
//#endregion
export { getContrastColor as n, getPrimaryContrastColor as r, getAutoContrastValue as t };
