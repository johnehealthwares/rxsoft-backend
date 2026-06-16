import { F as getRadius, L as getSize, M as createVarsResolver, N as getFontSize, V as rem, d as useStyles, f as useProps, n as polymorphicFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as UnstyledButton, t as Transition } from "./Transition-Cmaaz8Kh.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
//#region node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.module.mjs
var ActionIcon_module_default = {
	"root": "m_8d3f4000",
	"icon": "m_8d3afb97",
	"loader": "m_302b9fb1",
	"group": "m_1a0f1b21",
	"groupSection": "m_437b6484"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/ActionIcon/ActionIconGroup/ActionIconGroup.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = { orientation: "horizontal" };
var varsResolver$2 = createVarsResolver((_, { borderWidth }) => ({ group: { "--ai-border-width": rem(borderWidth) } }));
var ActionIconGroup = factory((_props) => {
	const props = useProps("ActionIconGroup", defaultProps, _props);
	const { className, style, classNames, styles, unstyled, orientation, vars, borderWidth, variant, mod, attributes, ...others } = useProps("ActionIconGroup", defaultProps, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "ActionIconGroup",
			props,
			classes: ActionIcon_module_default,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes,
			vars,
			varsResolver: varsResolver$2,
			rootSelector: "group"
		})("group"),
		variant,
		mod: [{ "data-orientation": orientation }, mod],
		role: "group",
		...others
	});
});
ActionIconGroup.classes = ActionIcon_module_default;
ActionIconGroup.varsResolver = varsResolver$2;
ActionIconGroup.displayName = "@mantine/core/ActionIconGroup";
//#endregion
//#region node_modules/@mantine/core/esm/components/ActionIcon/ActionIconGroupSection/ActionIconGroupSection.mjs
var varsResolver$1 = createVarsResolver((theme, { radius, color, gradient, variant, autoContrast, size }) => {
	const colors = theme.variantColorResolver({
		color: color || theme.primaryColor,
		theme,
		gradient,
		variant: variant || "filled",
		autoContrast
	});
	return { groupSection: {
		"--section-height": getSize(size, "section-height"),
		"--section-padding-x": getSize(size, "section-padding-x"),
		"--section-fz": getFontSize(size),
		"--section-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--section-bg": color || variant ? colors.background : void 0,
		"--section-color": colors.color,
		"--section-bd": color || variant ? colors.border : void 0
	} };
});
var ActionIconGroupSection = factory((_props) => {
	const props = useProps("ActionIconGroupSection", null, _props);
	const { className, style, classNames, styles, unstyled, vars, variant, gradient, radius, autoContrast, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "ActionIconGroupSection",
			props,
			classes: ActionIcon_module_default,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes,
			vars,
			varsResolver: varsResolver$1,
			rootSelector: "groupSection"
		})("groupSection"),
		variant,
		...others
	});
});
ActionIconGroupSection.classes = ActionIcon_module_default;
ActionIconGroupSection.varsResolver = varsResolver$1;
ActionIconGroupSection.displayName = "@mantine/core/ActionIconGroupSection";
//#endregion
//#region node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs
var varsResolver = createVarsResolver((theme, { size, radius, variant, gradient, color, autoContrast }) => {
	const colors = theme.variantColorResolver({
		color: color || theme.primaryColor,
		theme,
		gradient,
		variant: variant || "filled",
		autoContrast
	});
	return { root: {
		"--ai-size": getSize(size, "ai-size"),
		"--ai-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--ai-bg": color || variant ? colors.background : void 0,
		"--ai-hover": color || variant ? colors.hover : void 0,
		"--ai-hover-color": color || variant ? colors.hoverColor : void 0,
		"--ai-color": colors.color,
		"--ai-bd": color || variant ? colors.border : void 0
	} };
});
var ActionIcon = polymorphicFactory((_props) => {
	const props = useProps("ActionIcon", null, _props);
	const { className, unstyled, variant, classNames, styles, style, loading, loaderProps, size, color, radius, __staticSelector, gradient, vars, children, disabled, "data-disabled": dataDisabled, autoContrast, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: ["ActionIcon", __staticSelector],
		props,
		className,
		style,
		classes: ActionIcon_module_default,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		...getStyles("root", { active: !disabled && !loading && !dataDisabled }),
		...others,
		unstyled,
		variant,
		size,
		disabled: disabled || loading,
		mod: [{
			loading,
			disabled: disabled || dataDisabled
		}, mod],
		children: [typeof loading === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
			mounted: loading,
			transition: "slide-down",
			duration: 150,
			children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "span",
				...getStyles("loader", { style: transitionStyles }),
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {
					color: "var(--ai-color)",
					size: "calc(var(--ai-size) * 0.55)",
					...loaderProps
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			component: "span",
			mod: { loading },
			...getStyles("icon"),
			children
		})]
	});
});
ActionIcon.classes = ActionIcon_module_default;
ActionIcon.varsResolver = varsResolver;
ActionIcon.displayName = "@mantine/core/ActionIcon";
ActionIcon.Group = ActionIconGroup;
ActionIcon.GroupSection = ActionIconGroupSection;
//#endregion
export { ActionIcon as t };
