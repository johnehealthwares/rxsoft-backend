import { F as getRadius, L as getSize, M as createVarsResolver, N as getFontSize, V as rem, d as useStyles, f as useProps, n as polymorphicFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as UnstyledButton, t as Transition } from "./Transition-Cmaaz8Kh.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
//#region node_modules/@mantine/core/esm/components/Button/Button.module.mjs
var Button_module_default = {
	"root": "m_77c9d27d",
	"inner": "m_80f1301b",
	"label": "m_811560b9",
	"section": "m_a74036a",
	"loader": "m_a25b86ee",
	"group": "m_80d6d844",
	"groupSection": "m_70be2a01"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Button/ButtonGroup/ButtonGroup.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = { orientation: "horizontal" };
var varsResolver$2 = createVarsResolver((_, { borderWidth }) => ({ group: { "--button-border-width": rem(borderWidth) } }));
var ButtonGroup = factory((_props) => {
	const props = useProps("ButtonGroup", defaultProps, _props);
	const { className, style, classNames, styles, unstyled, orientation, vars, borderWidth, mod, attributes, ...others } = useProps("ButtonGroup", defaultProps, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "ButtonGroup",
			props,
			classes: Button_module_default,
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
		mod: [{ "data-orientation": orientation }, mod],
		role: "group",
		...others
	});
});
ButtonGroup.classes = Button_module_default;
ButtonGroup.varsResolver = varsResolver$2;
ButtonGroup.displayName = "@mantine/core/ButtonGroup";
//#endregion
//#region node_modules/@mantine/core/esm/components/Button/ButtonGroupSection/ButtonGroupSection.mjs
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
		"--section-fz": size?.includes("compact") ? getFontSize(size.replace("compact-", "")) : getFontSize(size),
		"--section-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--section-bg": color || variant ? colors.background : void 0,
		"--section-color": colors.color,
		"--section-bd": color || variant ? colors.border : void 0
	} };
});
var ButtonGroupSection = factory((_props) => {
	const props = useProps("ButtonGroupSection", null, _props);
	const { className, style, classNames, styles, unstyled, vars, gradient, radius, autoContrast, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "ButtonGroupSection",
			props,
			classes: Button_module_default,
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
		...others
	});
});
ButtonGroupSection.classes = Button_module_default;
ButtonGroupSection.varsResolver = varsResolver$1;
ButtonGroupSection.displayName = "@mantine/core/ButtonGroupSection";
//#endregion
//#region node_modules/@mantine/core/esm/components/Button/Button.mjs
var loaderTransition = {
	in: {
		opacity: 1,
		transform: `translate(-50%, calc(-50% + ${rem(1)}))`
	},
	out: {
		opacity: 0,
		transform: "translate(-50%, -200%)"
	},
	common: { transformOrigin: "center" },
	transitionProperty: "transform, opacity"
};
var varsResolver = createVarsResolver((theme, { radius, color, gradient, variant, size, justify, autoContrast }) => {
	const colors = theme.variantColorResolver({
		color: color || theme.primaryColor,
		theme,
		gradient,
		variant: variant || "filled",
		autoContrast
	});
	return { root: {
		"--button-justify": justify,
		"--button-height": getSize(size, "button-height"),
		"--button-padding-x": getSize(size, "button-padding-x"),
		"--button-fz": size?.includes("compact") ? getFontSize(size.replace("compact-", "")) : getFontSize(size),
		"--button-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--button-bg": color || variant ? colors.background : void 0,
		"--button-hover": color || variant ? colors.hover : void 0,
		"--button-color": colors.color,
		"--button-bd": color || variant ? colors.border : void 0,
		"--button-hover-color": color || variant ? colors.hoverColor : void 0
	} };
});
var Button = polymorphicFactory((_props) => {
	const props = useProps("Button", null, _props);
	const { style, vars, className, color, disabled, children, leftSection, rightSection, fullWidth, variant, radius, loading, loaderProps, gradient, classNames, styles, unstyled, "data-disabled": dataDisabled, autoContrast, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Button",
		props,
		classes: Button_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	const hasLeftSection = !!leftSection;
	const hasRightSection = !!rightSection;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		...getStyles("root", { active: !disabled && !loading && !dataDisabled }),
		unstyled,
		variant,
		disabled: disabled || loading,
		mod: [{
			disabled: disabled || dataDisabled,
			loading,
			block: fullWidth,
			"with-left-section": hasLeftSection,
			"with-right-section": hasRightSection
		}, mod],
		...others,
		children: [typeof loading === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
			mounted: loading,
			transition: loaderTransition,
			duration: 150,
			children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "span",
				...getStyles("loader", { style: transitionStyles }),
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {
					color: "var(--button-color)",
					size: "calc(var(--button-height) / 1.8)",
					...loaderProps
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			...getStyles("inner"),
			children: [
				leftSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					component: "span",
					...getStyles("section"),
					mod: { position: "left" },
					children: leftSection
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					component: "span",
					mod: { loading },
					...getStyles("label"),
					children
				}),
				rightSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					component: "span",
					...getStyles("section"),
					mod: { position: "right" },
					children: rightSection
				})
			]
		})]
	});
});
Button.classes = Button_module_default;
Button.varsResolver = varsResolver;
Button.displayName = "@mantine/core/Button";
Button.Group = ButtonGroup;
Button.GroupSection = ButtonGroupSection;
//#endregion
export { Button as t };
