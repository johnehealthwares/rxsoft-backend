import { d as useStyles, f as useProps, n as polymorphicFactory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Center/Center.module.mjs
var Center_module_default = { "root": "m_4451eb3a" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Center/Center.mjs
var import_jsx_runtime = require_jsx_runtime();
var Center = polymorphicFactory((_props) => {
	const props = useProps("Center", null, _props);
	const { classNames, className, style, styles, unstyled, vars, inline, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Center",
		props,
		classes: Center_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		mod: [{ inline }, mod],
		...getStyles("root"),
		...others
	});
});
Center.classes = Center_module_default;
Center.displayName = "@mantine/core/Center";
//#endregion
export { Center as t };
