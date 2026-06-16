import { R as getSpacing, U as keys, V as rem, d as useStyles, f as useProps, m as useMantineTheme, o as useRandomClassName, r as factory, t as Box, u as InlineStyles, z as filterProps } from "./Box-7OfPvxF3.js";
import { r as px, t as getSortedBreakpoints } from "./get-sorted-breakpoints-NgDLRp_t.js";
import { t as getBaseValue } from "./get-base-value-C_nXkElY.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGridVariables.mjs
var import_jsx_runtime = require_jsx_runtime();
function getMinColWidthValue(value) {
	if (value === void 0) return;
	if (typeof value === "number") return rem(value);
	return value;
}
function SimpleGridMediaVariables({ spacing, verticalSpacing, cols, minColWidth, autoRows, selector }) {
	const theme = useMantineTheme();
	const _verticalSpacing = verticalSpacing === void 0 ? spacing : verticalSpacing;
	const useAutoColumns = minColWidth !== void 0;
	const baseStyles = filterProps({
		"--sg-spacing-x": getSpacing(getBaseValue(spacing)),
		"--sg-spacing-y": getSpacing(getBaseValue(_verticalSpacing)),
		"--sg-auto-rows": autoRows,
		...useAutoColumns ? { "--sg-min-col-width": getMinColWidthValue(minColWidth) } : { "--sg-cols": getBaseValue(cols)?.toString() }
	});
	const queries = keys(theme.breakpoints).reduce((acc, breakpoint) => {
		if (!acc[breakpoint]) acc[breakpoint] = {};
		if (typeof spacing === "object" && spacing[breakpoint] !== void 0) acc[breakpoint]["--sg-spacing-x"] = getSpacing(spacing[breakpoint]);
		if (typeof _verticalSpacing === "object" && _verticalSpacing[breakpoint] !== void 0) acc[breakpoint]["--sg-spacing-y"] = getSpacing(_verticalSpacing[breakpoint]);
		if (!useAutoColumns && typeof cols === "object" && cols[breakpoint] !== void 0) acc[breakpoint]["--sg-cols"] = cols[breakpoint];
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStyles, {
		styles: baseStyles,
		media: getSortedBreakpoints(keys(queries), theme.breakpoints).filter((breakpoint) => keys(queries[breakpoint.value]).length > 0).map((breakpoint) => ({
			query: `(min-width: ${theme.breakpoints[breakpoint.value]})`,
			styles: queries[breakpoint.value]
		})),
		selector
	});
}
function getBreakpoints(values) {
	if (typeof values === "object" && values !== null) return keys(values);
	return [];
}
function sortBreakpoints(breakpoints) {
	return breakpoints.sort((a, b) => px(a) - px(b));
}
function getUniqueBreakpoints({ spacing, verticalSpacing, cols, minColWidth }) {
	return sortBreakpoints(Array.from(new Set([
		...getBreakpoints(spacing),
		...getBreakpoints(verticalSpacing),
		...minColWidth !== void 0 ? [] : getBreakpoints(cols)
	])));
}
function SimpleGridContainerVariables({ spacing, verticalSpacing, cols, minColWidth, autoRows, selector }) {
	const _verticalSpacing = verticalSpacing === void 0 ? spacing : verticalSpacing;
	const useAutoColumns = minColWidth !== void 0;
	const baseStyles = filterProps({
		"--sg-spacing-x": getSpacing(getBaseValue(spacing)),
		"--sg-spacing-y": getSpacing(getBaseValue(_verticalSpacing)),
		"--sg-auto-rows": autoRows,
		...useAutoColumns ? { "--sg-min-col-width": getMinColWidthValue(minColWidth) } : { "--sg-cols": getBaseValue(cols)?.toString() }
	});
	const uniqueBreakpoints = getUniqueBreakpoints({
		spacing,
		verticalSpacing,
		cols,
		minColWidth
	});
	const queries = uniqueBreakpoints.reduce((acc, breakpoint) => {
		if (!acc[breakpoint]) acc[breakpoint] = {};
		if (typeof spacing === "object" && spacing[breakpoint] !== void 0) acc[breakpoint]["--sg-spacing-x"] = getSpacing(spacing[breakpoint]);
		if (typeof _verticalSpacing === "object" && _verticalSpacing[breakpoint] !== void 0) acc[breakpoint]["--sg-spacing-y"] = getSpacing(_verticalSpacing[breakpoint]);
		if (!useAutoColumns && typeof cols === "object" && cols[breakpoint] !== void 0) acc[breakpoint]["--sg-cols"] = cols[breakpoint];
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStyles, {
		styles: baseStyles,
		container: uniqueBreakpoints.map((breakpoint) => ({
			query: `simple-grid (min-width: ${breakpoint})`,
			styles: queries[breakpoint]
		})),
		selector
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.module.mjs
var SimpleGrid_module_default = {
	"container": "m_925c2d2c",
	"root": "m_2415a157"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.mjs
var defaultProps = {
	cols: 1,
	spacing: "md",
	type: "media"
};
var SimpleGrid = factory((_props) => {
	const props = useProps("SimpleGrid", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, cols, verticalSpacing, spacing, type, minColWidth, autoFlow, autoRows, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "SimpleGrid",
		classes: SimpleGrid_module_default,
		props,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars
	});
	const responsiveClassName = useRandomClassName();
	const autoColsAttr = minColWidth !== void 0 ? autoFlow || "auto-fill" : void 0;
	if (type === "container") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGridContainerVariables, {
		...props,
		selector: `.${responsiveClassName}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...getStyles("container"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...getStyles("root", { className: responsiveClassName }),
			...others,
			"data-auto-cols": autoColsAttr
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGridMediaVariables, {
		...props,
		selector: `.${responsiveClassName}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("root", { className: responsiveClassName }),
		...others,
		"data-auto-cols": autoColsAttr
	})] });
});
SimpleGrid.classes = SimpleGrid_module_default;
SimpleGrid.displayName = "@mantine/core/SimpleGrid";
//#endregion
export { SimpleGrid as t };
