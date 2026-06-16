import { c as extractStyleProps, f as useProps, n as polymorphicFactory } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Input } from "./Input-BAf-8_ks.js";
//#region node_modules/@mantine/core/esm/components/Input/use-input-props.mjs
function useInputProps(component, defaultProps, _props) {
	const props = useProps(component, defaultProps, _props);
	const { label, description, error, required, classNames, styles, className, unstyled, __staticSelector, __stylesApiProps, errorProps, labelProps, descriptionProps, wrapperProps: _wrapperProps, id, size, style, inputContainer, inputWrapperOrder, withAsterisk, variant, vars, mod, attributes, ...others } = props;
	const { styleProps, rest } = extractStyleProps(others);
	const wrapperProps = {
		label,
		description,
		error,
		required,
		classNames,
		className,
		__staticSelector,
		__stylesApiProps: __stylesApiProps || props,
		errorProps,
		labelProps,
		descriptionProps,
		unstyled,
		styles,
		size,
		style,
		inputContainer,
		inputWrapperOrder,
		withAsterisk,
		variant,
		id,
		mod,
		attributes,
		..._wrapperProps
	};
	return {
		...rest,
		classNames,
		styles,
		unstyled,
		wrapperProps: {
			...wrapperProps,
			...styleProps
		},
		inputProps: {
			required,
			classNames,
			styles,
			unstyled,
			size,
			__staticSelector,
			__stylesApiProps: __stylesApiProps || props,
			error,
			variant,
			id,
			attributes
		}
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/InputBase/InputBase.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = {
	__staticSelector: "InputBase",
	withAria: true,
	size: "sm"
};
var InputBase = polymorphicFactory((props) => {
	const { inputProps, wrapperProps, ...others } = useInputProps("InputBase", defaultProps, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
		...wrapperProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			...inputProps,
			...others
		})
	});
});
InputBase.classes = {
	...Input.classes,
	...Input.Wrapper.classes
};
InputBase.displayName = "@mantine/core/InputBase";
//#endregion
export { useInputProps as n, InputBase as t };
