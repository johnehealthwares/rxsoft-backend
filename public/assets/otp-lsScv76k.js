import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { L as getSize, M as createVarsResolver, d as useStyles, f as useProps, r as factory } from "./Box-7OfPvxF3.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { t as assignRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useResolvedStylesApi } from "./use-resolved-styles-api-DyPXwNb0.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as InputBase } from "./InputBase-BW3lt9NS.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Link } from "./link-D-damaRz.js";
import { D as AuthLayout, Lr as Title, O as u, Pr as useNavigate, _r as object, gn as useForm, vr as string } from "./index-DwQ-NyPQ.js";
import { t as showSubmittedData } from "./show-submitted-data-D4i2jyT0.js";
//#region node_modules/@mantine/core/esm/components/PinInput/create-pin-array/create-pin-array.mjs
function createPinArray(length, value) {
	if (length < 1) return [];
	const values = new Array(length).fill("");
	if (value) {
		const splitted = value.trim().split("");
		for (let i = 0; i < Math.min(length, splitted.length); i += 1) values[i] = splitted[i] === " " ? "" : splitted[i];
	}
	return values;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/PinInput/PinInput.module.mjs
var PinInput_module_default = {
	"root": "m_f1cb205a",
	"pinInput": "m_cb288ead"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/PinInput/PinInput.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var regex = {
	number: /^[0-9]+$/,
	alphanumeric: /^[a-zA-Z0-9]+$/i
};
var defaultProps = {
	gap: "sm",
	length: 4,
	manageFocus: true,
	oneTimeCode: true,
	placeholder: "○",
	type: "alphanumeric",
	ariaLabel: "PinInput",
	size: "sm"
};
var varsResolver = createVarsResolver((_, { size }) => ({ root: { "--pin-input-size": getSize(size ?? "sm", "pin-input-size") } }));
var PinInput = factory((props) => {
	const { name, form, className, value, defaultValue, variant, gap, style, size, classNames, styles, unstyled, length, onChange, onComplete, manageFocus, autoFocus, error, radius, disabled, oneTimeCode, placeholder, type, mask, readOnly, inputType, inputMode, ariaLabel, vars, id, hiddenInputProps, rootRef, getInputProps, attributes, ref, ...others } = useProps("PinInput", defaultProps, props);
	const uuid = useId$1(id);
	const getStyles = useStyles({
		name: "PinInput",
		classes: PinInput_module_default,
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
	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
		classNames,
		styles,
		props
	});
	const [focusedIndex, setFocusedIndex] = (0, import_react.useState)(-1);
	const inputsRef = (0, import_react.useRef)([]);
	const currentLength = length ?? 4;
	const completedRef = (0, import_react.useRef)(false);
	const [_value, setValues] = useUncontrolled({
		value: value !== void 0 ? createPinArray(currentLength, value) : void 0,
		defaultValue: defaultValue?.split("").slice(0, currentLength),
		finalValue: createPinArray(currentLength, ""),
		onChange: (val) => {
			const stringValue = val.join("").trim();
			onChange?.(stringValue);
			if (stringValue.length === currentLength && !completedRef.current) {
				completedRef.current = true;
				onComplete?.(stringValue);
			} else if (stringValue.length < currentLength) completedRef.current = false;
		}
	});
	const currentValue = _value.length !== currentLength ? createPinArray(currentLength, _value.join("")) : _value;
	const _valueToString = currentValue.join("").trim();
	const validate = (code) => {
		return (type instanceof RegExp ? type : type && type in regex ? regex[type] : null)?.test(code);
	};
	const focusInputField = (dir, index) => {
		if (!manageFocus) return;
		if (dir === "next") {
			const nextIndex = index + 1;
			if (nextIndex < currentLength) inputsRef.current[nextIndex]?.focus();
		} else if (dir === "prev") {
			const prevIndex = index - 1;
			if (prevIndex >= 0) inputsRef.current[prevIndex]?.focus();
		}
	};
	const setFieldValue = (val, index) => {
		const values = [...currentValue];
		values[index] = val;
		setValues(values);
		return values;
	};
	const handleChange = (event, index) => {
		const inputValue = event.target.value;
		if (inputValue.length > 1) {
			if (inputValue.length > 2) {
				if (validate(inputValue)) {
					setValues(createPinArray(currentLength, inputValue));
					const filledCount = Math.min(inputValue.length, currentLength);
					if (filledCount < currentLength) focusInputField("next", filledCount - 1);
				}
				return;
			}
			const newChar = inputValue.split("")[inputValue.length - 1];
			if (validate(newChar)) {
				setFieldValue(newChar, index);
				focusInputField("next", index);
			}
			return;
		}
		if (inputValue.length === 1) if (validate(inputValue)) {
			setFieldValue(inputValue, index);
			focusInputField("next", index);
		} else setFieldValue("", index);
		else if (inputValue.length === 0) setFieldValue("", index);
	};
	const handleKeyDown = (event, index) => {
		const { ctrlKey, metaKey, key, shiftKey, target } = event;
		const inputValue = target.value;
		if (inputMode === "numeric") {
			const allowedKeys = [
				"Backspace",
				"Tab",
				"Control",
				"Delete",
				"ArrowLeft",
				"ArrowRight"
			];
			const isPasteShortcut = (ctrlKey || metaKey) && key === "v";
			if (!(allowedKeys.includes(key) || isPasteShortcut || !Number.isNaN(Number(key)))) {
				event.preventDefault();
				return;
			}
		}
		switch (key) {
			case "ArrowLeft":
				event.preventDefault();
				focusInputField("prev", index);
				break;
			case "ArrowRight":
				event.preventDefault();
				focusInputField("next", index);
				break;
			case "Tab":
				if (shiftKey) {
					if (index > 0 && manageFocus) {
						event.preventDefault();
						focusInputField("prev", index);
					}
				}
				break;
			case " ":
				event.preventDefault();
				focusInputField("next", index);
				break;
			case "Delete":
				event.preventDefault();
				setFieldValue("", index);
				break;
			case "Backspace":
				if (inputValue === "") {
					event.preventDefault();
					focusInputField("prev", index);
				} else {
					setFieldValue("", index);
					if (index < currentLength - 1) {
						event.preventDefault();
						focusInputField("prev", index);
					}
				}
				break;
			default: if (inputValue.length > 0 && key === currentValue[index]) {
				event.preventDefault();
				focusInputField("next", index);
			}
		}
	};
	const handleFocus = (event, index) => {
		event.target.select();
		setFocusedIndex(index);
	};
	const handleBlur = () => {
		setFocusedIndex(-1);
	};
	const handlePaste = (event) => {
		event.preventDefault();
		const pasteData = event.clipboardData.getData("text/plain").replace(/[\n\r\s]+/g, "");
		if (validate(pasteData.trim())) {
			const pasteArray = createPinArray(currentLength, pasteData);
			setValues(pasteArray);
			const filledCount = pasteArray.filter((val) => val !== "").length;
			if (filledCount >= currentLength) inputsRef.current[currentLength - 1]?.focus();
			else inputsRef.current[filledCount]?.focus();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		...others,
		...getStyles("root"),
		ref: rootRef,
		role: "group",
		id: uuid,
		gap,
		unstyled,
		wrap: "nowrap",
		variant,
		__size: size,
		dir: "ltr",
		children: currentValue.map((char, index) => /* @__PURE__ */ (0, import_react.createElement)(Input, {
			component: "input",
			...getStyles("pinInput", { style: {
				"--input-padding": "0",
				"--input-text-align": "center"
			} }),
			classNames: resolvedClassNames,
			styles: resolvedStyles,
			size,
			__staticSelector: "PinInput",
			id: `${uuid}-${index + 1}`,
			key: `${uuid}-${index}`,
			inputMode: inputMode || (type === "number" ? "numeric" : "text"),
			onChange: (event) => handleChange(event, index),
			onKeyDown: (event) => handleKeyDown(event, index),
			onFocus: (event) => handleFocus(event, index),
			onBlur: handleBlur,
			onPaste: handlePaste,
			type: inputType || (mask ? "password" : type === "number" ? "tel" : "text"),
			radius,
			error,
			variant,
			disabled,
			ref: (node) => {
				if (node) {
					index === 0 && assignRef(ref, node);
					inputsRef.current[index] = node;
				}
			},
			autoComplete: oneTimeCode ? "one-time-code" : "off",
			placeholder: focusedIndex === index ? "" : placeholder,
			value: char,
			autoFocus: autoFocus && index === 0,
			unstyled,
			"aria-label": ariaLabel,
			readOnly,
			...getInputProps?.(index)
		}))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "hidden",
		name,
		form,
		value: _valueToString,
		...hiddenInputProps
	})] });
});
PinInput.classes = {
	...PinInput_module_default,
	...InputBase.classes
};
PinInput.varsResolver = varsResolver;
PinInput.displayName = "@mantine/core/PinInput";
//#endregion
//#region src/features/auth/otp/components/otp-form.tsx
var formSchema = object({ otp: string().min(6, "Please enter the 6-digit code.").max(6, "Please enter the 6-digit code.") });
function OtpForm({ className, ...props }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: u(formSchema),
		defaultValues: { otp: "" }
	});
	const otp = form.watch("otp");
	function onSubmit(data) {
		setIsLoading(true);
		showSubmittedData(data);
		setTimeout(() => {
			setIsLoading(false);
			navigate({ to: "/" });
		}, 1e3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: form.handleSubmit(onSubmit),
		className,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					fw: 500,
					children: "One-Time Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinInput, {
					length: 6,
					value: form.watch("otp"),
					onChange: (value) => form.setValue("otp", value),
					error: !!form.formState.errors.otp,
					type: "number",
					inputMode: "numeric",
					oneTimeCode: true
				}),
				form.formState.errors.otp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					c: "red",
					children: form.formState.errors.otp.message
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			mt: "sm",
			loading: isLoading,
			disabled: otp.length < 6 || isLoading,
			children: "Verify"
		})]
	});
}
//#endregion
//#region src/features/auth/otp/pages/otp-page.tsx
function Otp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		withBorder: true,
		radius: "md",
		p: "lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 4,
					children: "Two-factor Authentication"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					c: "dimmed",
					mt: "xs",
					children: [
						"Please enter the authentication code. ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"We have sent the authentication code to your email."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpForm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					ta: "center",
					c: "dimmed",
					children: [
						"Haven't received it?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sign-in",
							className: "underline underline-offset-4 hover:text-primary",
							children: "Resend a new code"
						}),
						"."
					]
				})
			]
		})
	}) });
}
//#endregion
//#region src/routes/(auth)/otp.tsx?tsr-split=component
var SplitComponent = Otp;
//#endregion
export { SplitComponent as component };
