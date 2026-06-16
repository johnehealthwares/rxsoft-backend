import { t as require_react } from "./react-DKQS5v0G.js";
import { F as getRadius, L as getSize, M as createVarsResolver, V as rem, d as useStyles, f as useProps, n as polymorphicFactory } from "./Box-7OfPvxF3.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function CloseIcon({ size = "var(--cb-icon-size, 70%)", style, ...others }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		style: {
			...style,
			width: size,
			height: size
		},
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
			fill: "currentColor",
			fillRule: "evenodd",
			clipRule: "evenodd"
		})
	});
}
CloseIcon.displayName = "@mantine/core/CloseIcon";
//#endregion
//#region node_modules/@mantine/core/esm/components/CloseButton/CloseButton.module.mjs
var CloseButton_module_default = {
	"root": "m_86a44da5",
	"root--subtle": "m_220c80f2"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/CloseButton/CloseButton.mjs
var defaultProps = { variant: "subtle" };
var varsResolver = createVarsResolver((_, { size, radius, iconSize }) => ({ root: {
	"--cb-size": getSize(size, "cb-size"),
	"--cb-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--cb-icon-size": rem(iconSize)
} }));
var CloseButton = polymorphicFactory((_props) => {
	const props = useProps("CloseButton", defaultProps, _props);
	const { iconSize, children, vars, radius, className, classNames, style, styles, unstyled, "data-disabled": dataDisabled, disabled, variant, icon, mod, attributes, __staticSelector, ...others } = props;
	const getStyles = useStyles({
		name: __staticSelector || "CloseButton",
		props,
		className,
		style,
		classes: CloseButton_module_default,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		...others,
		unstyled,
		variant,
		disabled,
		mod: [{ disabled: disabled || dataDisabled }, mod],
		...getStyles("root", {
			variant,
			active: !disabled && !dataDisabled
		}),
		children: [icon || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {}), children]
	});
});
CloseButton.classes = CloseButton_module_default;
CloseButton.varsResolver = varsResolver;
CloseButton.displayName = "@mantine/core/CloseButton";
//#endregion
export { CloseButton as t };
