import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { F as getRadius, L as getSize, M as createVarsResolver, R as getSpacing, d as useStyles, f as useProps, n as polymorphicFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Avatar/Avatar.module.mjs
var Avatar_module_default = {
	"group": "m_11def92b",
	"root": "m_f85678b6",
	"image": "m_11f8ac07",
	"placeholder": "m_104cd71f"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Avatar/AvatarGroup/AvatarGroup.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AvatarGroupContext = (0, import_react.createContext)({ withinGroup: false });
var varsResolver$1 = createVarsResolver((_, { spacing }) => ({ group: { "--ag-spacing": getSpacing(spacing) } }));
var AvatarGroup = factory((_props) => {
	const props = useProps("AvatarGroup", null, _props);
	const { classNames, className, style, styles, unstyled, vars, spacing, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarGroupContext, {
		value: { withinGroup: true },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...useStyles({
				name: "AvatarGroup",
				classes: Avatar_module_default,
				props,
				className,
				style,
				classNames,
				styles,
				unstyled,
				attributes,
				vars,
				varsResolver: varsResolver$1,
				rootSelector: "group"
			})("group"),
			...others
		})
	});
});
AvatarGroup.classes = Avatar_module_default;
AvatarGroup.varsResolver = varsResolver$1;
AvatarGroup.displayName = "@mantine/core/AvatarGroup";
//#endregion
//#region node_modules/@mantine/core/esm/components/Avatar/AvatarPlaceholderIcon.mjs
function AvatarPlaceholderIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...props,
		"data-avatar-placeholder-icon": true,
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z",
			fill: "currentColor",
			fillRule: "evenodd",
			clipRule: "evenodd"
		})
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Avatar/get-initials-color/get-initials-color.mjs
function hashCode(input) {
	let hash = 0;
	for (let i = 0; i < input.length; i += 1) {
		const char = input.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}
	return hash;
}
var defaultColors = [
	"blue",
	"cyan",
	"grape",
	"green",
	"indigo",
	"lime",
	"orange",
	"pink",
	"red",
	"teal",
	"violet"
];
function getInitialsColor(name, colors = defaultColors) {
	const hash = hashCode(name);
	return colors[Math.abs(hash) % colors.length];
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Avatar/get-initials/get-initials.mjs
function getInitials(name, limit = 2) {
	const splitted = name.split(" ");
	if (splitted.length === 1) return name.slice(0, limit).toUpperCase();
	return splitted.map((word) => word[0]).slice(0, limit).join("").toUpperCase();
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Avatar/Avatar.mjs
var varsResolver = createVarsResolver((theme, { size, radius, variant, gradient, color, autoContrast, name, allowedInitialsColors }) => {
	const _color = color === "initials" && typeof name === "string" ? getInitialsColor(name, allowedInitialsColors) : color;
	const colors = theme.variantColorResolver({
		color: _color || "gray",
		theme,
		gradient,
		variant: variant || "light",
		autoContrast
	});
	return { root: {
		"--avatar-size": getSize(size, "avatar-size"),
		"--avatar-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--avatar-bg": _color || variant ? colors.background : void 0,
		"--avatar-color": _color || variant ? colors.color : void 0,
		"--avatar-bd": _color || variant ? colors.border : void 0
	} };
});
var Avatar = polymorphicFactory((_props) => {
	const props = useProps("Avatar", null, _props);
	const { classNames, className, style, styles, unstyled, vars, src, alt, radius, color, gradient, imageProps, children, autoContrast, mod, name, allowedInitialsColors, attributes, ...others } = props;
	const groupCtx = (0, import_react.use)(AvatarGroupContext);
	const [error, setError] = (0, import_react.useState)(!src);
	const getStyles = useStyles({
		name: "Avatar",
		props,
		classes: Avatar_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	(0, import_react.useEffect)(() => setError(!src), [src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("root"),
		mod: [{ "within-group": groupCtx.withinGroup }, mod],
		...others,
		children: error || !src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			...getStyles("placeholder"),
			title: alt,
			children: children || typeof name === "string" && getInitials(name) || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarPlaceholderIcon, {})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			...imageProps,
			...getStyles("image"),
			src,
			alt,
			onError: (event) => {
				setError(true);
				imageProps?.onError?.(event);
			}
		})
	});
});
Avatar.classes = Avatar_module_default;
Avatar.varsResolver = varsResolver;
Avatar.displayName = "@mantine/core/Avatar";
Avatar.Group = AvatarGroup;
//#endregion
export { Avatar as t };
