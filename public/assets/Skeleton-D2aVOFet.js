import { F as getRadius, M as createVarsResolver, V as rem, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Skeleton/Skeleton.module.mjs
var Skeleton_module_default = {
	"root": "m_18320242",
	"skeleton-fade": "m_299c329c"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Skeleton/Skeleton.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = {
	visible: true,
	animate: true
};
var varsResolver = createVarsResolver((_, { width, height, radius, circle }) => ({ root: {
	"--skeleton-height": rem(height),
	"--skeleton-width": circle ? rem(height) : rem(width),
	"--skeleton-radius": circle ? "1000px" : radius === void 0 ? void 0 : getRadius(radius)
} }));
var Skeleton = factory((_props) => {
	const props = useProps("Skeleton", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, width, height, circle, visible, radius, animate, mod, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "Skeleton",
			classes: Skeleton_module_default,
			props,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes,
			vars,
			varsResolver
		})("root"),
		mod: [{
			visible,
			animate
		}, mod],
		...others
	});
});
Skeleton.classes = Skeleton_module_default;
Skeleton.varsResolver = varsResolver;
Skeleton.displayName = "@mantine/core/Skeleton";
//#endregion
export { Skeleton as t };
