import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { F as getRadius, L as getSize, M as createVarsResolver, N as getFontSize, V as rem, c as extractStyleProps, d as useStyles, f as useProps, n as polymorphicFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useResolvedStylesApi } from "./use-resolved-styles-api-DyPXwNb0.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as CloseButton } from "./CloseButton-DrI2P31g.js";
//#region node_modules/@mantine/core/esm/components/Input/Input.context.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var InputContext = (0, import_react.createContext)({ size: "sm" });
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputClearButton/InputClearButton.mjs
var import_jsx_runtime = require_jsx_runtime();
var InputClearButton = factory((_props) => {
	const props = useProps("InputClearButton", null, _props);
	const { size, variant, vars, classNames, styles, ...others } = props;
	const ctx = (0, import_react.use)(InputContext);
	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
		classNames,
		styles,
		props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
		variant: variant || "transparent",
		size: size || ctx?.size || "sm",
		classNames: resolvedClassNames,
		styles: resolvedStyles,
		__staticSelector: "InputClearButton",
		style: {
			pointerEvents: "all",
			background: "var(--input-bg)",
			...others.style
		},
		...others
	});
});
InputClearButton.displayName = "@mantine/core/InputClearButton";
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputClearSection/InputClearSection.mjs
var clearSectionOffset = {
	xs: 7,
	sm: 8,
	md: 10,
	lg: 12,
	xl: 15
};
function InputClearSection({ __clearable, __clearSection, rightSection, __defaultRightSection, size = "sm", __clearSectionMode = "both" }) {
	const clearSection = __clearable && __clearSection;
	if (__clearSectionMode === "rightSection") return rightSection === null ? null : rightSection || __defaultRightSection;
	if (__clearSectionMode === "clear") return rightSection === null ? null : clearSection || __defaultRightSection;
	if (clearSection && (rightSection || __defaultRightSection)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-combined-clear-section": true,
		style: {
			display: "flex",
			gap: 2,
			alignItems: "center",
			paddingInlineEnd: clearSectionOffset[size]
		},
		children: [clearSection, rightSection || __defaultRightSection]
	});
	return rightSection === null ? null : rightSection || clearSection || __defaultRightSection;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputWrapper.context.mjs
var InputWrapperContext = (0, import_react.createContext)({
	offsetBottom: false,
	offsetTop: false,
	describedBy: void 0,
	getStyles: null,
	inputId: void 0,
	labelId: void 0
});
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/Input.module.mjs
var Input_module_default = {
	"wrapper": "m_6c018570",
	"input": "m_8fb7ebe7",
	"section": "m_82577fc2",
	"placeholder": "m_88bacfd0",
	"root": "m_46b77525",
	"label": "m_8fdc1311",
	"required": "m_78a94662",
	"error": "m_8f816625",
	"description": "m_fe47ce59"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputDescription/InputDescription.mjs
var varsResolver$4 = createVarsResolver((_, { size }) => ({ description: { "--input-description-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})` } }));
var InputDescription = factory((_props) => {
	const props = useProps("InputDescription", null, _props);
	const { classNames, className, style, styles, unstyled, vars, __staticSelector, __inheritStyles = true, attributes, ...others } = useProps("InputDescription", null, props);
	const ctx = (0, import_react.use)(InputWrapperContext);
	const _getStyles = useStyles({
		name: ["InputWrapper", __staticSelector],
		props,
		classes: Input_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		rootSelector: "description",
		vars,
		varsResolver: varsResolver$4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "p",
		...(__inheritStyles && ctx?.getStyles || _getStyles)("description", ctx?.getStyles ? {
			className,
			style
		} : void 0),
		...others
	});
});
InputDescription.classes = Input_module_default;
InputDescription.varsResolver = varsResolver$4;
InputDescription.displayName = "@mantine/core/InputDescription";
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputError/InputError.mjs
var varsResolver$3 = createVarsResolver((_, { size }) => ({ error: { "--input-error-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})` } }));
var InputError = factory((_props) => {
	const props = useProps("InputError", null, _props);
	const { classNames, className, style, styles, unstyled, vars, attributes, __staticSelector, __inheritStyles = true, ...others } = props;
	const _getStyles = useStyles({
		name: ["InputWrapper", __staticSelector],
		props,
		classes: Input_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		rootSelector: "error",
		vars,
		varsResolver: varsResolver$3
	});
	const ctx = (0, import_react.use)(InputWrapperContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "p",
		...(__inheritStyles && ctx?.getStyles || _getStyles)("error", ctx?.getStyles ? {
			className,
			style
		} : void 0),
		...others
	});
});
InputError.classes = Input_module_default;
InputError.varsResolver = varsResolver$3;
InputError.displayName = "@mantine/core/InputError";
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputLabel/InputLabel.mjs
var defaultProps$2 = { labelElement: "label" };
var varsResolver$2 = createVarsResolver((_, { size }) => ({ label: {
	"--input-label-size": getFontSize(size),
	"--input-asterisk-color": void 0
} }));
var InputLabel = factory((_props) => {
	const props = useProps("InputLabel", defaultProps$2, _props);
	const { classNames, className, style, styles, unstyled, vars, labelElement, required, htmlFor, onMouseDown, children, __staticSelector, mod, attributes, ...others } = props;
	const _getStyles = useStyles({
		name: ["InputWrapper", __staticSelector],
		props,
		classes: Input_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		rootSelector: "label",
		vars,
		varsResolver: varsResolver$2
	});
	const ctx = (0, import_react.use)(InputWrapperContext);
	const getStyles = ctx?.getStyles || _getStyles;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		...getStyles("label", ctx?.getStyles ? {
			className,
			style
		} : void 0),
		component: labelElement,
		htmlFor: labelElement === "label" ? htmlFor : void 0,
		mod: [{ required }, mod],
		onMouseDown: (event) => {
			onMouseDown?.(event);
			if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		},
		...others,
		children: [children, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			...getStyles("required"),
			"aria-hidden": true,
			children: " *"
		})]
	});
});
InputLabel.classes = Input_module_default;
InputLabel.varsResolver = varsResolver$2;
InputLabel.displayName = "@mantine/core/InputLabel";
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputPlaceholder/InputPlaceholder.mjs
var InputPlaceholder = factory((_props) => {
	const props = useProps("InputPlaceholder", null, _props);
	const { classNames, className, style, styles, unstyled, vars, __staticSelector, error, mod, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: ["InputPlaceholder", __staticSelector],
			props,
			classes: Input_module_default,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes,
			rootSelector: "placeholder"
		})("placeholder"),
		mod: [{ error: !!error }, mod],
		component: "span",
		...others
	});
});
InputPlaceholder.classes = Input_module_default;
InputPlaceholder.displayName = "@mantine/core/InputPlaceholder";
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputWrapper/get-input-offsets/get-input-offsets.mjs
function getInputOffsets(inputWrapperOrder, { hasDescription, hasError }) {
	const inputIndex = inputWrapperOrder.findIndex((part) => part === "input");
	const aboveInput = inputWrapperOrder.slice(0, inputIndex);
	const belowInput = inputWrapperOrder.slice(inputIndex + 1);
	const offsetTop = hasDescription && aboveInput.includes("description") || hasError && aboveInput.includes("error");
	return {
		offsetBottom: hasDescription && belowInput.includes("description") || hasError && belowInput.includes("error"),
		offsetTop
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/InputWrapper/InputWrapper.mjs
var defaultProps$1 = {
	labelElement: "label",
	inputContainer: (children) => children,
	inputWrapperOrder: [
		"label",
		"description",
		"input",
		"error"
	]
};
var varsResolver$1 = createVarsResolver((_, { size }) => ({
	label: {
		"--input-label-size": getFontSize(size),
		"--input-asterisk-color": void 0
	},
	error: { "--input-error-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})` },
	description: { "--input-description-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})` }
}));
var InputWrapper = factory((_props) => {
	const props = useProps("InputWrapper", defaultProps$1, _props);
	const { classNames, className, style, styles, unstyled, vars, size, variant, __staticSelector, inputContainer, inputWrapperOrder, label, error, description, labelProps, descriptionProps, errorProps, labelElement, children, withAsterisk, id, required, __stylesApiProps, mod, attributes, ...others } = props;
	const getStyles = useStyles({
		name: ["InputWrapper", __staticSelector],
		props: __stylesApiProps || props,
		classes: Input_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver: varsResolver$1
	});
	const sharedProps = {
		size,
		variant,
		__staticSelector
	};
	const idBase = useId$1(id);
	const isRequired = typeof withAsterisk === "boolean" ? withAsterisk : required;
	const errorId = errorProps?.id || `${idBase}-error`;
	const descriptionId = descriptionProps?.id || `${idBase}-description`;
	const inputId = idBase;
	const hasError = !!error && typeof error !== "boolean";
	const hasDescription = !!description;
	const _describedBy = `${hasError ? errorId : ""} ${hasDescription ? descriptionId : ""}`;
	const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : void 0;
	const labelId = labelProps?.id || `${idBase}-label`;
	const _label = label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabel, {
		labelElement,
		id: labelId,
		htmlFor: inputId,
		required: isRequired,
		...sharedProps,
		...labelProps,
		children: label
	}, "label");
	const _description = hasDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputDescription, {
		...descriptionProps,
		...sharedProps,
		size: descriptionProps?.size || sharedProps.size,
		id: descriptionProps?.id || descriptionId,
		children: description
	}, "description");
	const _input = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: inputContainer(children) }, "input");
	const _error = hasError && /* @__PURE__ */ (0, import_react.createElement)(InputError, {
		...errorProps,
		...sharedProps,
		size: errorProps?.size || sharedProps.size,
		key: "error",
		id: errorProps?.id || errorId
	}, error);
	const content = inputWrapperOrder.map((part) => {
		switch (part) {
			case "label": return _label;
			case "input": return _input;
			case "description": return _description;
			case "error": return _error;
			default: return null;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputWrapperContext, {
		value: {
			getStyles,
			describedBy,
			inputId,
			labelId,
			...getInputOffsets(inputWrapperOrder, {
				hasDescription,
				hasError
			})
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			variant,
			size,
			mod: [{ error: !!error }, mod],
			id: labelElement === "label" ? void 0 : id,
			...getStyles("root"),
			...others,
			children: content
		})
	});
});
InputWrapper.classes = Input_module_default;
InputWrapper.varsResolver = varsResolver$1;
InputWrapper.displayName = "@mantine/core/InputWrapper";
//#endregion
//#region node_modules/@mantine/core/esm/components/Input/Input.mjs
var defaultProps = {
	variant: "default",
	leftSectionPointerEvents: "none",
	rightSectionPointerEvents: "none",
	withAria: true,
	withErrorStyles: true,
	size: "sm",
	loading: false,
	loadingPosition: "right"
};
var varsResolver = createVarsResolver((_, props, ctx) => ({ wrapper: {
	"--input-margin-top": ctx.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
	"--input-margin-bottom": ctx.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
	"--input-height": getSize(props.size, "input-height"),
	"--input-fz": getFontSize(props.size),
	"--input-radius": props.radius === void 0 ? void 0 : getRadius(props.radius),
	"--input-left-section-width": props.leftSectionWidth !== void 0 ? rem(props.leftSectionWidth) : void 0,
	"--input-right-section-width": props.rightSectionWidth !== void 0 ? rem(props.rightSectionWidth) : void 0,
	"--input-padding-y": props.multiline ? getSize(props.size, "input-padding-y") : void 0,
	"--input-left-section-pointer-events": props.leftSectionPointerEvents,
	"--input-right-section-pointer-events": props.rightSectionPointerEvents
} }));
var Input = polymorphicFactory((_props) => {
	const props = useProps("Input", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, required, __staticSelector, __stylesApiProps, size, wrapperProps, error, disabled, leftSection, leftSectionProps, leftSectionWidth, rightSection, rightSectionProps, rightSectionWidth, rightSectionPointerEvents, leftSectionPointerEvents, variant, vars, pointer, multiline, radius, id, withAria, withErrorStyles, mod, inputSize, attributes, __clearSection, __clearable, __clearSectionMode, __defaultRightSection, loading, loadingPosition, rootRef, ...others } = props;
	const { styleProps, rest } = extractStyleProps(others);
	const ctx = (0, import_react.use)(InputWrapperContext);
	const stylesCtx = {
		offsetBottom: ctx?.offsetBottom,
		offsetTop: ctx?.offsetTop
	};
	const getStyles = useStyles({
		name: ["Input", __staticSelector],
		props: __stylesApiProps || props,
		classes: Input_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		stylesCtx,
		rootSelector: "wrapper",
		vars,
		varsResolver
	});
	const ariaAttributes = withAria ? {
		required,
		disabled,
		"aria-invalid": error ? true : void 0,
		"aria-describedby": ctx?.describedBy,
		id: ctx?.inputId || id
	} : {};
	const loadingIndicator = loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: loadingPosition === "left" ? "calc(var(--input-left-section-size) / 2)" : "calc(var(--input-right-section-size) / 2)" }) : null;
	const _leftSection = loading && loadingPosition === "left" ? loadingIndicator : leftSection;
	const _rightSection = InputClearSection({
		__clearable,
		__clearSection,
		rightSection: loading && loadingPosition === "right" ? loadingIndicator : rightSection,
		__defaultRightSection,
		size,
		__clearSectionMode
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputContext, {
		value: { size: size || "sm" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			ref: rootRef,
			...getStyles("wrapper"),
			...styleProps,
			...wrapperProps,
			mod: [{
				error: !!error && withErrorStyles,
				pointer,
				disabled,
				multiline,
				"data-with-right-section": !!_rightSection,
				"data-with-left-section": !!_leftSection
			}, mod],
			variant,
			size,
			children: [
				_leftSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					...leftSectionProps,
					"data-position": "left",
					...getStyles("section", {
						className: leftSectionProps?.className,
						style: leftSectionProps?.style
					}),
					children: _leftSection
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					component: "input",
					...rest,
					...ariaAttributes,
					required,
					mod: {
						disabled,
						error: !!error && withErrorStyles
					},
					variant,
					__size: inputSize,
					...getStyles("input")
				}),
				_rightSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					...rightSectionProps,
					"data-position": "right",
					...getStyles("section", {
						className: rightSectionProps?.className,
						style: rightSectionProps?.style
					}),
					children: _rightSection
				})
			]
		})
	});
});
Input.classes = Input_module_default;
Input.varsResolver = varsResolver;
Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Error = InputError;
Input.Description = InputDescription;
Input.Placeholder = InputPlaceholder;
Input.ClearButton = InputClearButton;
Input.displayName = "@mantine/core/Input";
//#endregion
export { InputWrapperContext as n, Input as t };
