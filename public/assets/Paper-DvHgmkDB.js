import { F as getRadius, I as getShadow, M as createVarsResolver, d as useStyles, f as useProps, n as polymorphicFactory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Paper/Paper.module.mjs
var Paper_module_default = { "root": "m_1b7284a3" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Paper/Paper.mjs
var import_jsx_runtime = require_jsx_runtime();
var varsResolver = createVarsResolver((_, { radius, shadow }) => ({ root: {
	"--paper-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--paper-shadow": getShadow(shadow)
} }));
var Paper = polymorphicFactory((_props) => {
	const props = useProps("Paper", null, _props);
	const { classNames, className, style, styles, unstyled, withBorder, vars, radius, shadow, variant, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Paper",
		props,
		classes: Paper_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		mod: [{ "data-with-border": withBorder }, mod],
		...getStyles("root"),
		variant,
		...others
	});
});
Paper.classes = Paper_module_default;
Paper.varsResolver = varsResolver;
Paper.displayName = "@mantine/core/Paper";
//#endregion
export { Paper as t };
