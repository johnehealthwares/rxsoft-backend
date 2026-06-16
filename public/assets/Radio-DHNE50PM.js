import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { D as parseThemeColor, E as getThemeColor, F as getRadius, L as getSize, M as createVarsResolver, V as rem, c as extractStyleProps, d as useStyles, f as useProps, i as genericFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { n as getContrastColor, t as getAutoContrastValue } from "./get-auto-contrast-value-KJxlU8Ss.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { r as InputsGroupFieldset, t as InlineInput } from "./InlineInput-BOQLHqBR.js";
//#region node_modules/@mantine/core/esm/components/Radio/RadioGroup/RadioGroup.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var RadioGroupContext = (0, import_react.createContext)(null);
var RadioGroup = genericFactory(((props) => {
	const { value, defaultValue, onChange, size, wrapperProps, children, name, readOnly, disabled, ...others } = useProps("RadioGroup", null, props);
	const _name = useId$1(name);
	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: "",
		onChange
	});
	const handleChange = (event) => !readOnly && setValue(typeof event === "string" ? event : event.currentTarget.value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupContext, {
		value: {
			value: _value,
			onChange: handleChange,
			size,
			name: _name,
			disabled
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
			size,
			...wrapperProps,
			...others,
			labelElement: "div",
			__staticSelector: "RadioGroup",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputsGroupFieldset, {
				role: "radiogroup",
				children
			})
		})
	});
}));
RadioGroup.classes = Input.Wrapper.classes;
RadioGroup.displayName = "@mantine/core/RadioGroup";
//#endregion
//#region node_modules/@mantine/core/esm/components/Radio/RadioCard/RadioCard.module.mjs
var RadioCard_module_default = { "card": "m_9dc8ae12" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Radio/RadioCard/RadioCard.mjs
var RadioCardContext = (0, import_react.createContext)(null);
var defaultProps$2 = { withBorder: true };
var varsResolver$2 = createVarsResolver((_, { radius }) => ({ card: { "--card-radius": getRadius(radius) } }));
var RadioCard = factory((_props) => {
	const props = useProps("RadioCard", defaultProps$2, _props);
	const { classNames, className, style, styles, unstyled, vars, checked, mod, withBorder, value, onClick, name, onKeyDown, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "RadioCard",
		classes: RadioCard_module_default,
		props,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver: varsResolver$2,
		rootSelector: "card"
	});
	const { dir } = useDirection();
	const ctx = (0, import_react.use)(RadioGroupContext);
	const _checked = typeof checked === "boolean" ? checked : ctx?.value === value || false;
	const _name = name || ctx?.name;
	const handleKeyDown = (event) => {
		onKeyDown?.(event);
		if (!_name) return;
		if ([
			"ArrowDown",
			"ArrowUp",
			"ArrowLeft",
			"ArrowRight"
		].includes(event.nativeEvent.code)) {
			event.preventDefault();
			const siblings = Array.from(document.querySelectorAll(`[role="radio"][name="${_name}"]`));
			const currentIndex = siblings.findIndex((element) => element === event.target);
			const nextIndex = currentIndex + 1 >= siblings.length ? 0 : currentIndex + 1;
			const prevIndex = currentIndex - 1 < 0 ? siblings.length - 1 : currentIndex - 1;
			if (event.nativeEvent.code === "ArrowDown") {
				siblings[nextIndex].focus();
				siblings[nextIndex].click();
			}
			if (event.nativeEvent.code === "ArrowUp") {
				siblings[prevIndex].focus();
				siblings[prevIndex].click();
			}
			if (event.nativeEvent.code === "ArrowLeft") {
				siblings[dir === "ltr" ? prevIndex : nextIndex].focus();
				siblings[dir === "ltr" ? prevIndex : nextIndex].click();
			}
			if (event.nativeEvent.code === "ArrowRight") {
				siblings[dir === "ltr" ? nextIndex : prevIndex].focus();
				siblings[dir === "ltr" ? nextIndex : prevIndex].click();
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioCardContext, {
		value: { checked: _checked },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnstyledButton, {
			mod: [{
				"with-border": withBorder,
				checked: _checked
			}, mod],
			...getStyles("card"),
			...others,
			role: "radio",
			"aria-checked": _checked,
			name: _name,
			onClick: (event) => {
				onClick?.(event);
				ctx?.onChange(value || "");
			},
			onKeyDown: handleKeyDown
		})
	});
});
RadioCard.displayName = "@mantine/core/RadioCard";
RadioCard.classes = RadioCard_module_default;
RadioCard.varsResolver = varsResolver$2;
//#endregion
//#region node_modules/@mantine/core/esm/components/Radio/RadioIcon.mjs
function RadioIcon({ size, style, ...others }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 5 5",
		style: {
			width: rem(size),
			height: rem(size),
			...style
		},
		"aria-hidden": true,
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "2.5",
			cy: "2.5",
			r: "2.5",
			fill: "currentColor"
		})
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Radio/RadioIndicator/RadioIndicator.module.mjs
var RadioIndicator_module_default = {
	"indicator": "m_717d7ff6",
	"icon": "m_3e4da632",
	"indicator--outline": "m_2980836c"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Radio/RadioIndicator/RadioIndicator.mjs
var defaultProps$1 = { icon: RadioIcon };
var varsResolver$1 = createVarsResolver((theme, { radius, color, size, iconColor, variant, autoContrast }) => {
	const parsedColor = parseThemeColor({
		color: color || theme.primaryColor,
		theme
	});
	const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
	return { indicator: {
		"--radio-size": getSize(size, "radio-size"),
		"--radio-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--radio-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
		"--radio-icon-size": getSize(size, "radio-icon-size"),
		"--radio-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({
			color,
			theme,
			autoContrast
		}) : void 0
	} };
});
var RadioIndicator = factory((_props) => {
	const props = useProps("RadioIndicator", defaultProps$1, _props);
	const { classNames, className, style, styles, unstyled, vars, icon: Icon, radius, color, iconColor, autoContrast, checked, mod, variant, disabled, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "RadioIndicator",
		classes: RadioIndicator_module_default,
		props,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver: varsResolver$1,
		rootSelector: "indicator"
	});
	const ctx = (0, import_react.use)(RadioCardContext);
	const _checked = typeof checked === "boolean" ? checked : ctx?.checked || false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("indicator", { variant }),
		variant,
		mod: [{
			checked: _checked,
			disabled
		}, mod],
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { ...getStyles("icon") })
	});
});
RadioIndicator.displayName = "@mantine/core/RadioIndicator";
RadioIndicator.classes = RadioIndicator_module_default;
RadioIndicator.varsResolver = varsResolver$1;
//#endregion
//#region node_modules/@mantine/core/esm/components/Radio/Radio.module.mjs
var Radio_module_default = {
	"root": "m_f3f1af94",
	"inner": "m_89c4f5e4",
	"icon": "m_f3ed6b2b",
	"radio": "m_8a3dbb89",
	"radio--outline": "m_1bfe9d39"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Radio/Radio.mjs
var defaultProps = {
	labelPosition: "right",
	withErrorStyles: true
};
var varsResolver = createVarsResolver((theme, { size, radius, color, iconColor, variant, autoContrast }) => {
	const parsedColor = parseThemeColor({
		color: color || theme.primaryColor,
		theme
	});
	const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
	return { root: {
		"--radio-size": getSize(size, "radio-size"),
		"--radio-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--radio-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
		"--radio-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({
			color,
			theme,
			autoContrast
		}) : void 0,
		"--radio-icon-size": getSize(size, "radio-icon-size")
	} };
});
var Radio = factory((_props) => {
	const props = useProps("Radio", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, id, size, label, labelPosition, description, error, radius, color, variant, disabled, wrapperProps, icon: Icon = RadioIcon, rootRef, iconColor, onChange, mod, attributes, withErrorStyles, checked, ...others } = props;
	const getStyles = useStyles({
		name: "Radio",
		classes: Radio_module_default,
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
	const ctx = (0, import_react.use)(RadioGroupContext);
	const contextSize = ctx?.size ?? size;
	const componentSize = props.size ? size : contextSize;
	const { styleProps, rest } = extractStyleProps(others);
	const uuid = useId$1(id);
	const contextChecked = ctx ? ctx.value === rest.value : void 0;
	const withContextProps = {
		checked: contextChecked ?? checked,
		name: rest.name ?? ctx?.name,
		onChange: (event) => {
			ctx?.onChange(event);
			onChange?.(event);
		},
		disabled: ctx?.disabled ?? disabled
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineInput, {
		...getStyles("root"),
		__staticSelector: "Radio",
		__stylesApiProps: props,
		id: uuid,
		size: componentSize,
		labelPosition,
		label,
		description,
		error,
		disabled: withContextProps.disabled,
		classNames,
		styles,
		unstyled,
		"data-checked": (contextChecked ?? checked) || void 0,
		variant,
		ref: rootRef,
		mod,
		attributes,
		...styleProps,
		...wrapperProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			...getStyles("inner"),
			mod: { "label-position": labelPosition },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				...getStyles("radio", {
					focusable: true,
					variant
				}),
				...rest,
				...withContextProps,
				component: "input",
				mod: {
					error: !!error,
					"with-error-styles": withErrorStyles
				},
				id: uuid,
				type: "radio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				...getStyles("icon"),
				"aria-hidden": true
			})]
		})
	});
});
Radio.classes = Radio_module_default;
Radio.varsResolver = varsResolver;
Radio.displayName = "@mantine/core/Radio";
Radio.Group = RadioGroup;
Radio.Card = RadioCard;
Radio.Indicator = RadioIndicator;
//#endregion
export { Radio as t };
