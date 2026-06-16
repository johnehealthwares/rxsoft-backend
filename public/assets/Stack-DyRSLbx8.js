import { M as createVarsResolver, R as getSpacing, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Stack/Stack.module.mjs
var Stack_module_default = { "root": "m_6d731127" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Stack/Stack.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = {
	gap: "md",
	align: "stretch",
	justify: "flex-start"
};
var varsResolver = createVarsResolver((_, { gap, align, justify }) => ({ root: {
	"--stack-gap": getSpacing(gap),
	"--stack-align": align,
	"--stack-justify": justify
} }));
var Stack = factory((_props) => {
	const props = useProps("Stack", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, align, justify, gap, variant, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "Stack",
			props,
			classes: Stack_module_default,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes,
			vars,
			varsResolver
		})("root"),
		variant,
		...others
	});
});
Stack.classes = Stack_module_default;
Stack.varsResolver = varsResolver;
Stack.displayName = "@mantine/core/Stack";
//#endregion
export { Stack as t };
