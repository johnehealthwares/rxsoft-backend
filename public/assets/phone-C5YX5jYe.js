import { E as getThemeColor, L as getSize, M as createVarsResolver, V as rem, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
//#region node_modules/@mantine/core/esm/components/Burger/Burger.module.mjs
var Burger_module_default = {
	"root": "m_fea6bf1a",
	"burger": "m_d4fb9cad"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Burger/Burger.mjs
var import_jsx_runtime = require_jsx_runtime();
var varsResolver = createVarsResolver((theme, { color, size, lineSize, transitionDuration, transitionTimingFunction }) => ({ root: {
	"--burger-color": color ? getThemeColor(color, theme) : void 0,
	"--burger-size": getSize(size, "burger-size"),
	"--burger-line-size": lineSize ? rem(lineSize) : void 0,
	"--burger-transition-duration": transitionDuration === void 0 ? void 0 : `${transitionDuration}ms`,
	"--burger-transition-timing-function": transitionTimingFunction
} }));
var Burger = factory((_props) => {
	const props = useProps("Burger", null, _props);
	const { classNames, className, style, styles, unstyled, vars, opened, children, transitionDuration, transitionTimingFunction, lineSize, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Burger",
		classes: Burger_module_default,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		...getStyles("root"),
		...others,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			mod: ["reduce-motion", { opened }],
			...getStyles("burger")
		}), children]
	});
});
Burger.classes = Burger_module_default;
Burger.varsResolver = varsResolver;
Burger.displayName = "@mantine/core/Burger";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Heart = createLucideIcon("heart", [["path", {
	d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	key: "mvr1a0"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Phone = createLucideIcon("phone", [["path", {
	d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	key: "9njp5v"
}]]);
//#endregion
export { Heart as n, Burger as r, Phone as t };
