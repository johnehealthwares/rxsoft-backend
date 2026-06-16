import { f as useProps, j as clsx, n as polymorphicFactory } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
//#region node_modules/@mantine/core/esm/components/Anchor/Anchor.module.mjs
var Anchor_module_default = { "root": "m_849cf0da" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Anchor/Anchor.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = { underline: "hover" };
var Anchor = polymorphicFactory((props) => {
	const { underline, className, unstyled, mod, ...others } = useProps("Anchor", defaultProps, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
		component: "a",
		className: clsx({ [Anchor_module_default.root]: !unstyled }, className),
		...others,
		mod: [{ underline }, mod],
		__staticSelector: "Anchor",
		unstyled
	});
});
Anchor.classes = Anchor_module_default;
Anchor.displayName = "@mantine/core/Anchor";
//#endregion
export { Anchor as t };
