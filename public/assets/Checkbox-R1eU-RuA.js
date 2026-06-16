import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { D as parseThemeColor, E as getThemeColor, F as getRadius, L as getSize, M as createVarsResolver, c as extractStyleProps, d as useStyles, f as useProps, i as genericFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { n as getContrastColor, t as getAutoContrastValue } from "./get-auto-contrast-value-KJxlU8Ss.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { n as InlineInputClasses, r as InputsGroupFieldset, t as InlineInput } from "./InlineInput-BOQLHqBR.js";
import { n as CheckboxIcon } from "./CheckIcon-DoyF_8Cf.js";
//#region node_modules/@mantine/core/esm/components/Checkbox/CheckboxGroup/CheckboxGroup.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CheckboxGroupContext = (0, import_react.createContext)(null);
var defaultProps$3 = { hiddenInputValuesSeparator: "," };
var CheckboxGroup = genericFactory(((props) => {
	const { value, defaultValue, onChange, size, wrapperProps, children, readOnly, name, hiddenInputValuesSeparator, hiddenInputProps, maxSelectedValues, disabled, ...others } = useProps("CheckboxGroup", defaultProps$3, props);
	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: [],
		onChange
	});
	const handleChange = (event) => {
		const itemValue = typeof event === "string" ? event : event.currentTarget.value;
		if (readOnly) return;
		const isCurrentlySelected = _value.includes(itemValue);
		if (!isCurrentlySelected && maxSelectedValues && _value.length >= maxSelectedValues) return;
		setValue(isCurrentlySelected ? _value.filter((item) => item !== itemValue) : [..._value, itemValue]);
	};
	const isDisabled = (checkboxValue) => {
		if (disabled) return true;
		if (!maxSelectedValues) return false;
		const isCurrentlySelected = _value.includes(checkboxValue);
		const hasReachedLimit = _value.length >= maxSelectedValues;
		return !isCurrentlySelected && hasReachedLimit;
	};
	const hiddenInputValue = _value.join(hiddenInputValuesSeparator);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroupContext, {
		value: {
			value: _value,
			onChange: handleChange,
			size,
			isDisabled
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Input.Wrapper, {
			size,
			...wrapperProps,
			...others,
			labelElement: "div",
			__staticSelector: "CheckboxGroup",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputsGroupFieldset, {
				role: "group",
				children
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				name,
				value: hiddenInputValue,
				...hiddenInputProps
			})]
		})
	});
}));
CheckboxGroup.classes = Input.Wrapper.classes;
CheckboxGroup.displayName = "@mantine/core/CheckboxGroup";
//#endregion
//#region node_modules/@mantine/core/esm/components/Checkbox/CheckboxCard/CheckboxCard.module.mjs
var CheckboxCard_module_default = { "card": "m_26775b0a" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Checkbox/CheckboxCard/CheckboxCard.mjs
var CheckboxCardContext = (0, import_react.createContext)(null);
var defaultProps$2 = { withBorder: true };
var varsResolver$2 = createVarsResolver((_, { radius }) => ({ card: { "--card-radius": getRadius(radius) } }));
var CheckboxCard = factory((_props) => {
	const props = useProps("CheckboxCard", defaultProps$2, _props);
	const { classNames, className, style, styles, unstyled, vars, checked, mod, withBorder, value, onClick, defaultChecked, onChange, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "CheckboxCard",
		classes: CheckboxCard_module_default,
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
	const ctx = (0, import_react.use)(CheckboxGroupContext);
	const [_value, setValue] = useUncontrolled({
		value: typeof checked === "boolean" ? checked : ctx ? ctx.value.includes(value || "") : void 0,
		defaultValue: defaultChecked,
		finalValue: false,
		onChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxCardContext, {
		value: { checked: _value },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnstyledButton, {
			mod: [{
				"with-border": withBorder,
				checked: _value
			}, mod],
			...getStyles("card"),
			...others,
			role: "checkbox",
			"aria-checked": _value,
			onClick: (event) => {
				onClick?.(event);
				ctx?.onChange(value || "");
				setValue(!_value);
			}
		})
	});
});
CheckboxCard.displayName = "@mantine/core/CheckboxCard";
CheckboxCard.classes = CheckboxCard_module_default;
CheckboxCard.varsResolver = varsResolver$2;
//#endregion
//#region node_modules/@mantine/core/esm/components/Checkbox/CheckboxIndicator/CheckboxIndicator.module.mjs
var CheckboxIndicator_module_default = {
	"indicator": "m_5e5256ee",
	"icon": "m_1b1c543a",
	"indicator--outline": "m_76e20374"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Checkbox/CheckboxIndicator/CheckboxIndicator.mjs
var defaultProps$1 = {
	icon: CheckboxIcon,
	variant: "filled",
	radius: "sm"
};
var varsResolver$1 = createVarsResolver((theme, { radius, color, size, iconColor, variant, autoContrast }) => {
	const parsedColor = parseThemeColor({
		color: color || theme.primaryColor,
		theme
	});
	const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
	return { indicator: {
		"--checkbox-size": getSize(size, "checkbox-size"),
		"--checkbox-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--checkbox-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
		"--checkbox-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({
			color,
			theme,
			autoContrast
		}) : void 0
	} };
});
var CheckboxIndicator = factory((_props) => {
	const props = useProps("CheckboxIndicator", defaultProps$1, _props);
	const { classNames, className, style, styles, unstyled, vars, icon: Icon, indeterminate, radius, color, iconColor, autoContrast, checked, mod, variant, disabled, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "CheckboxIndicator",
		classes: CheckboxIndicator_module_default,
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
	const ctx = (0, import_react.use)(CheckboxCardContext);
	const _checked = typeof checked === "boolean" || typeof indeterminate === "boolean" ? checked || indeterminate : ctx?.checked || false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("indicator", { variant }),
		variant,
		mod: [{
			checked: _checked,
			disabled
		}, mod],
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			indeterminate,
			...getStyles("icon")
		})
	});
});
CheckboxIndicator.displayName = "@mantine/core/CheckboxIndicator";
CheckboxIndicator.classes = CheckboxIndicator_module_default;
CheckboxIndicator.varsResolver = varsResolver$1;
//#endregion
//#region node_modules/@mantine/core/esm/components/Checkbox/Checkbox.module.mjs
var Checkbox_module_default = {
	"root": "m_bf2d988c",
	"inner": "m_26062bec",
	"input": "m_26063560",
	"icon": "m_bf295423",
	"input--outline": "m_215c4542"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Checkbox/Checkbox.mjs
var defaultProps = {
	labelPosition: "right",
	icon: CheckboxIcon,
	withErrorStyles: true,
	variant: "filled",
	radius: "sm"
};
var varsResolver = createVarsResolver((theme, { radius, color, size, iconColor, variant, autoContrast }) => {
	const parsedColor = parseThemeColor({
		color: color || theme.primaryColor,
		theme
	});
	const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
	return { root: {
		"--checkbox-size": getSize(size, "checkbox-size"),
		"--checkbox-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--checkbox-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
		"--checkbox-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({
			color,
			theme,
			autoContrast
		}) : void 0
	} };
});
var Checkbox = factory((_props) => {
	const props = useProps("Checkbox", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, color, label, id, size, radius, wrapperProps, checked, labelPosition, description, error, disabled, variant, indeterminate, icon: Icon, rootRef, iconColor, onChange, autoContrast, mod, attributes, readOnly, onClick, withErrorStyles, ref, ...others } = props;
	const inputRef = (0, import_react.useRef)(null);
	const ctx = (0, import_react.use)(CheckboxGroupContext);
	const _size = size || ctx?.size;
	const getStyles = useStyles({
		name: "Checkbox",
		props,
		classes: Checkbox_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	const { styleProps, rest } = extractStyleProps(others);
	const uuid = useId$1(id);
	const withContextProps = {
		checked: ctx?.value.includes(rest.value) ?? checked,
		onChange: (event) => {
			ctx?.onChange(event);
			onChange?.(event);
		}
	};
	const isDisabledByGroup = ctx?.isDisabled?.(rest.value) ?? false;
	const finalDisabled = disabled || isDisabledByGroup;
	(0, import_react.useEffect)(() => {
		if (inputRef.current) {
			inputRef.current.indeterminate = indeterminate || false;
			if (indeterminate) inputRef.current.setAttribute("data-indeterminate", "true");
			else inputRef.current.removeAttribute("data-indeterminate");
		}
	}, [indeterminate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineInput, {
		...getStyles("root"),
		__staticSelector: "Checkbox",
		__stylesApiProps: props,
		id: uuid,
		size: _size,
		labelPosition,
		label,
		description,
		error,
		disabled: finalDisabled,
		classNames,
		styles,
		unstyled,
		"data-checked": withContextProps.checked || checked || void 0,
		variant,
		ref: rootRef,
		mod,
		attributes,
		inert: rest.inert,
		...styleProps,
		...wrapperProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			...getStyles("inner"),
			mod: { "data-label-position": labelPosition },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "input",
				id: uuid,
				ref: useMergedRef(inputRef, ref),
				mod: { error: !!error },
				...getStyles("input", {
					focusable: true,
					variant
				}),
				...rest,
				...withContextProps,
				disabled: finalDisabled,
				inert: rest.inert,
				type: "checkbox",
				onClick: (event) => {
					if (readOnly) event.preventDefault();
					onClick?.(event);
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				indeterminate,
				...getStyles("icon")
			})]
		})
	});
});
Checkbox.classes = {
	...Checkbox_module_default,
	...InlineInputClasses
};
Checkbox.varsResolver = varsResolver;
Checkbox.displayName = "@mantine/core/Checkbox";
Checkbox.Group = CheckboxGroup;
Checkbox.Indicator = CheckboxIndicator;
Checkbox.Card = CheckboxCard;
//#endregion
export { Checkbox as t };
