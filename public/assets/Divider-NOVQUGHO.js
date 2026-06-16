import { E as getThemeColor, L as getSize, M as createVarsResolver, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Divider/Divider.module.mjs
var Divider_module_default = {
	"root": "m_3eebeb36",
	"label": "m_9e365f20"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Divider/Divider.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = { orientation: "horizontal" };
var varsResolver = createVarsResolver((theme, { color, variant, size }) => ({ root: {
	"--divider-color": color ? getThemeColor(color, theme) : void 0,
	"--divider-border-style": variant,
	"--divider-size": getSize(size, "divider-size")
} }));
var Divider = factory((_props) => {
	const props = useProps("Divider", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, color, orientation, label, labelPosition, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Divider",
		classes: Divider_module_default,
		props,
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
		mod: [{
			orientation,
			withLabel: !!label
		}, mod],
		role: "separator",
		...getStyles("root"),
		...others,
		children: label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			component: "span",
			mod: { position: labelPosition },
			...getStyles("label"),
			children: label
		})
	});
});
Divider.classes = Divider_module_default;
Divider.varsResolver = varsResolver;
Divider.displayName = "@mantine/core/Divider";
//#endregion
export { Divider as t };
