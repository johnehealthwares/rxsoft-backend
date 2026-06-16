import { M as createVarsResolver, N as getFontSize, P as getLineHeight, d as useStyles, f as useProps, n as polymorphicFactory, t as Box, w as getGradient } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Text/Text.module.mjs
var Text_module_default = { "root": "m_b6d8b162" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Text/Text.mjs
var import_jsx_runtime = require_jsx_runtime();
function getTextTruncate(truncate) {
	if (truncate === "start") return "start";
	if (truncate === "end" || truncate) return "end";
}
var defaultProps = { inherit: false };
var varsResolver = createVarsResolver((theme, { variant, lineClamp, gradient, size }) => ({ root: {
	"--text-fz": getFontSize(size),
	"--text-lh": getLineHeight(size),
	"--text-gradient": variant === "gradient" ? getGradient(gradient, theme) : void 0,
	"--text-line-clamp": typeof lineClamp === "number" ? lineClamp.toString() : void 0
} }));
var Text = polymorphicFactory((_props) => {
	const props = useProps("Text", defaultProps, _props);
	const { lineClamp, truncate, inline, inherit, gradient, span, __staticSelector, vars, className, style, classNames, styles, unstyled, variant, mod, size, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: ["Text", __staticSelector],
			props,
			classes: Text_module_default,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes,
			vars,
			varsResolver
		})("root", { focusable: true }),
		component: span ? "span" : "p",
		variant,
		mod: [{
			"data-truncate": getTextTruncate(truncate),
			"data-line-clamp": typeof lineClamp === "number",
			"data-inline": inline,
			"data-inherit": inherit
		}, mod],
		size,
		...others
	});
});
Text.classes = Text_module_default;
Text.varsResolver = varsResolver;
Text.displayName = "@mantine/core/Text";
//#endregion
export { Text as t };
