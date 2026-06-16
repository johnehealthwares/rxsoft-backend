import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { E as getThemeColor, F as getRadius, L as getSize, M as createVarsResolver, c as extractStyleProps, d as useStyles, f as useProps, i as genericFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { n as InlineInputClasses, r as InputsGroupFieldset, t as InlineInput } from "./InlineInput-BOQLHqBR.js";
//#region node_modules/@mantine/core/esm/components/Switch/SwitchGroup/SwitchGroup.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var SwitchGroupContext = (0, import_react.createContext)(null);
var defaultProps$1 = { hiddenInputValuesSeparator: "," };
var SwitchGroup = genericFactory(((props) => {
	const { value, defaultValue, onChange, size, wrapperProps, children, readOnly, name, hiddenInputValuesSeparator, hiddenInputProps, maxSelectedValues, disabled, ...others } = useProps("SwitchGroup", defaultProps$1, props);
	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: [],
		onChange
	});
	const handleChange = (event) => {
		const itemValue = event.currentTarget.value;
		if (readOnly) return;
		const isCurrentlySelected = _value.includes(itemValue);
		if (!isCurrentlySelected && maxSelectedValues && _value.length >= maxSelectedValues) return;
		setValue(isCurrentlySelected ? _value.filter((item) => item !== itemValue) : [..._value, itemValue]);
	};
	const isDisabled = (switchValue) => {
		if (disabled) return true;
		if (!maxSelectedValues) return false;
		const isCurrentlySelected = _value.includes(switchValue);
		const hasReachedLimit = _value.length >= maxSelectedValues;
		return !isCurrentlySelected && hasReachedLimit;
	};
	const hiddenInputValue = _value.join(hiddenInputValuesSeparator);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchGroupContext, {
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
			__staticSelector: "SwitchGroup",
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
SwitchGroup.classes = Input.Wrapper.classes;
SwitchGroup.displayName = "@mantine/core/SwitchGroup";
//#endregion
//#region node_modules/@mantine/core/esm/components/Switch/Switch.module.mjs
var Switch_module_default = {
	"root": "m_5f93f3bb",
	"input": "m_926b4011",
	"track": "m_9307d992",
	"thumb": "m_93039a1d",
	"trackLabel": "m_8277e082"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Switch/Switch.mjs
var defaultProps = {
	labelPosition: "right",
	withThumbIndicator: true
};
var varsResolver = createVarsResolver((theme, { radius, color, size }) => ({ root: {
	"--switch-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--switch-height": getSize(size, "switch-height"),
	"--switch-width": getSize(size, "switch-width"),
	"--switch-thumb-size": getSize(size, "switch-thumb-size"),
	"--switch-label-font-size": getSize(size, "switch-label-font-size"),
	"--switch-track-label-padding": getSize(size, "switch-track-label-padding"),
	"--switch-color": color ? getThemeColor(color, theme) : void 0
} }));
var Switch = factory((_props) => {
	const props = useProps("Switch", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, color, label, offLabel, onLabel, id, size, radius, wrapperProps, thumbIcon, checked, defaultChecked, onChange, labelPosition, description, error, disabled, variant, rootRef, mod, withThumbIndicator, attributes, ...others } = props;
	const ctx = (0, import_react.use)(SwitchGroupContext);
	const _size = size || ctx?.size;
	const getStyles = useStyles({
		name: "Switch",
		props,
		classes: Switch_module_default,
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
	const _disabled = disabled || ctx?.isDisabled?.(rest.value);
	const [_checked, handleChange] = useUncontrolled({
		value: withContextProps.checked ?? checked,
		defaultValue: defaultChecked,
		finalValue: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InlineInput, {
		...getStyles("root"),
		__staticSelector: "Switch",
		__stylesApiProps: props,
		id: uuid,
		size: _size,
		labelPosition,
		label,
		description,
		error,
		disabled: _disabled,
		bodyElement: "label",
		labelElement: "span",
		classNames,
		styles,
		unstyled,
		"data-checked": withContextProps.checked,
		variant,
		ref: rootRef,
		mod,
		attributes,
		inert: rest.inert,
		...styleProps,
		...wrapperProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			...rest,
			...withContextProps,
			disabled: _disabled,
			checked: _checked,
			"data-checked": withContextProps.checked,
			onChange: (event) => {
				withContextProps.onChange?.(event);
				handleChange(event.currentTarget.checked);
			},
			id: uuid,
			type: "checkbox",
			role: "switch",
			inert: rest.inert,
			...getStyles("input")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			"aria-hidden": "true",
			component: "span",
			mod: {
				error,
				"label-position": labelPosition,
				"without-labels": !onLabel && !offLabel
			},
			...getStyles("track"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "span",
				mod: {
					"reduce-motion": true,
					"with-thumb-indicator": withThumbIndicator && !thumbIcon
				},
				...getStyles("thumb"),
				children: thumbIcon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...getStyles("trackLabel"),
				children: _checked ? onLabel : offLabel
			})]
		})]
	});
});
Switch.classes = {
	...Switch_module_default,
	...InlineInputClasses
};
Switch.varsResolver = varsResolver;
Switch.displayName = "@mantine/core/Switch";
Switch.Group = SwitchGroup;
//#endregion
export { Switch as t };
