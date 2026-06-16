import { L as getSize, M as createVarsResolver, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Container/Container.module.mjs
var Container_module_default = { "root": "m_7485cace" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Container/Container.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = { strategy: "block" };
var varsResolver = createVarsResolver((_, { size, fluid }) => ({ root: { "--container-size": fluid ? void 0 : getSize(size, "container-size") } }));
var Container = factory((_props) => {
	const props = useProps("Container", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, fluid, mod, attributes, strategy, ...others } = props;
	const getStyles = useStyles({
		name: "Container",
		classes: Container_module_default,
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
			fluid,
			strategy
		}, mod],
		...getStyles("root"),
		...others
	});
});
Container.classes = Container_module_default;
Container.varsResolver = varsResolver;
Container.displayName = "@mantine/core/Container";
//#endregion
export { Container as t };
