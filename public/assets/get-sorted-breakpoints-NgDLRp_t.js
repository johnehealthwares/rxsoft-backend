//#region node_modules/@mantine/core/esm/core/utils/units-converters/px.mjs
function getTransformedScaledValue(value) {
	if (typeof value !== "string" || !value.includes("var(--mantine-scale)")) return value;
	return value.match(/^calc\((.*?)\)$/)?.[1].split("*")[0].trim();
}
function px(value) {
	const transformedValue = getTransformedScaledValue(value);
	if (typeof transformedValue === "number") return transformedValue;
	if (typeof transformedValue === "string") {
		if (transformedValue.includes("calc") || transformedValue.includes("var")) return transformedValue;
		if (transformedValue.includes("px")) return Number(transformedValue.replace("px", ""));
		if (transformedValue.includes("rem")) return Number(transformedValue.replace("rem", "")) * 16;
		if (transformedValue.includes("em")) return Number(transformedValue.replace("em", "")) * 16;
		return Number(transformedValue);
	}
	return NaN;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/get-breakpoint-value/get-breakpoint-value.mjs
function getBreakpointValue(breakpoint, breakpoints) {
	if (breakpoint in breakpoints) return px(breakpoints[breakpoint]);
	return px(breakpoint);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/get-sorted-breakpoints/get-sorted-breakpoints.mjs
function getSortedBreakpoints(values, breakpoints) {
	const convertedBreakpoints = values.map((breakpoint) => ({
		value: breakpoint,
		px: getBreakpointValue(breakpoint, breakpoints)
	}));
	convertedBreakpoints.sort((a, b) => a.px - b.px);
	return convertedBreakpoints;
}
//#endregion
export { getBreakpointValue as n, px as r, getSortedBreakpoints as t };
