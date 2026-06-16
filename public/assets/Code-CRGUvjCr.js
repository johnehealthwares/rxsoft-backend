import { E as getThemeColor, M as createVarsResolver, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Code/Code.module.mjs
var Code_module_default = { "root": "m_b183c0a2" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Code/Code.mjs
var import_jsx_runtime = require_jsx_runtime();
var varsResolver = createVarsResolver((theme, { color }) => ({ root: { "--code-bg": color ? getThemeColor(color, theme) : void 0 } }));
var Code = factory((_props) => {
	const props = useProps("Code", null, _props);
	const { classNames, className, style, styles, unstyled, vars, color, block, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Code",
		props,
		classes: Code_module_default,
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
		component: block ? "pre" : "code",
		mod: [{ block }, mod],
		...getStyles("root"),
		...others,
		dir: "ltr"
	});
});
Code.classes = Code_module_default;
Code.varsResolver = varsResolver;
Code.displayName = "@mantine/core/Code";
//#endregion
export { Code as t };
