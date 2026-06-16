import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { L as getSize, N as getFontSize, d as useStyles, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { n as InputWrapperContext, t as Input } from "./Input-BAf-8_ks.js";
//#region node_modules/@mantine/core/esm/utils/InputsGroupFieldset/InputsGroupFieldset.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function InputsGroupFieldset({ children, role }) {
	const ctx = (0, import_react.use)(InputWrapperContext);
	if (!ctx) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role,
		"aria-labelledby": ctx.labelId,
		"aria-describedby": ctx.describedBy,
		children
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/utils/InlineInput/InlineInput.module.mjs
var InlineInput_module_default = {
	"root": "m_5f75b09e",
	"body": "m_5f6e695e",
	"labelWrapper": "m_d3ea56bb",
	"label": "m_8ee546b8",
	"description": "m_328f68c0",
	"error": "m_8e8a99cc"
};
//#endregion
//#region node_modules/@mantine/core/esm/utils/InlineInput/InlineInput.mjs
var InlineInputClasses = InlineInput_module_default;
function InlineInput({ __staticSelector, __stylesApiProps, className, classNames, styles, unstyled, children, label, description, id, disabled, error, size, labelPosition = "left", bodyElement = "div", labelElement = "label", variant, style, vars, mod, attributes, ...others }) {
	const getStyles = useStyles({
		name: __staticSelector,
		props: __stylesApiProps,
		className,
		style,
		classes: InlineInput_module_default,
		classNames,
		styles,
		unstyled,
		attributes
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("root"),
		__vars: {
			"--label-fz": getFontSize(size),
			"--label-lh": getSize(size, "label-lh")
		},
		mod: [{ "label-position": labelPosition }, mod],
		variant,
		size,
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			component: bodyElement,
			htmlFor: bodyElement === "label" ? id : void 0,
			...getStyles("body"),
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				...getStyles("labelWrapper"),
				"data-disabled": disabled || void 0,
				children: [
					label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						component: labelElement,
						htmlFor: labelElement === "label" ? id : void 0,
						...getStyles("label"),
						"data-disabled": disabled || void 0,
						children: label
					}),
					description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Description, {
						size,
						__inheritStyles: false,
						...getStyles("description"),
						children: description
					}),
					error && typeof error !== "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Error, {
						size,
						__inheritStyles: false,
						...getStyles("error"),
						children: error
					})
				]
			})]
		})
	});
}
InlineInput.displayName = "@mantine/core/InlineInput";
//#endregion
export { InlineInputClasses as n, InputsGroupFieldset as r, InlineInput as t };
