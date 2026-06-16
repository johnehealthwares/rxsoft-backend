import { E as getThemeColor, F as getRadius, L as getSize, M as createVarsResolver, d as useStyles, f as useProps, n as polymorphicFactory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Badge/Badge.module.mjs
var Badge_module_default = {
	"root": "m_347db0ec",
	"root--dot": "m_fbd81e3d",
	"label": "m_5add502a",
	"section": "m_91fdda9b"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Badge/Badge.mjs
var import_jsx_runtime = require_jsx_runtime();
var varsResolver = createVarsResolver((theme, { radius, color, gradient, variant, size, autoContrast, circle }) => {
	const colors = theme.variantColorResolver({
		color: color || theme.primaryColor,
		theme,
		gradient,
		variant: variant || "filled",
		autoContrast
	});
	return { root: {
		"--badge-height": getSize(size, "badge-height"),
		"--badge-padding-x": getSize(size, "badge-padding-x"),
		"--badge-fz": getSize(size, "badge-fz"),
		"--badge-radius": circle || radius === void 0 ? void 0 : getRadius(radius),
		"--badge-bg": color || variant ? colors.background : void 0,
		"--badge-color": color || variant ? colors.color : void 0,
		"--badge-bd": color || variant ? colors.border : void 0,
		"--badge-dot-color": variant === "dot" ? getThemeColor(color, theme) : void 0
	} };
});
var Badge = polymorphicFactory((_props) => {
	const props = useProps("Badge", null, _props);
	const { classNames, className, style, styles, unstyled, vars, radius, color, gradient, leftSection, rightSection, children, variant, fullWidth, autoContrast, circle, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Badge",
		props,
		classes: Badge_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		variant,
		mod: [{
			block: fullWidth,
			circle,
			"with-right-section": !!rightSection,
			"with-left-section": !!leftSection
		}, mod],
		...getStyles("root", { variant }),
		...others,
		children: [
			leftSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...getStyles("section"),
				"data-position": "left",
				children: leftSection
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...getStyles("label"),
				children
			}),
			rightSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...getStyles("section"),
				"data-position": "right",
				children: rightSection
			})
		]
	});
});
Badge.classes = Badge_module_default;
Badge.varsResolver = varsResolver;
Badge.displayName = "@mantine/core/Badge";
//#endregion
export { Badge as t };
