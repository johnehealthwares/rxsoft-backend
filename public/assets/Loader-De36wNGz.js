import { E as getThemeColor, L as getSize, M as createVarsResolver, d as useStyles, f as useProps, j as clsx, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Loader/Loader.module.mjs
var Loader_module_default = {
	"root": "m_5ae2e3c",
	"barsLoader": "m_7a2bd4cd",
	"bar": "m_870bb79",
	"bars-loader-animation": "m_5d2b3b9d",
	"dotsLoader": "m_4e3f22d7",
	"dot": "m_870c4af",
	"loader-dots-animation": "m_aac34a1",
	"ovalLoader": "m_b34414df",
	"oval-loader-animation": "m_f8e89c4b"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Loader/loaders/Bars.mjs
var import_jsx_runtime = require_jsx_runtime();
var Bars = ({ className, ...others }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
	component: "span",
	className: clsx(Loader_module_default.barsLoader, className),
	...others,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: Loader_module_default.bar }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: Loader_module_default.bar }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: Loader_module_default.bar })
	]
});
Bars.displayName = "@mantine/core/Bars";
//#endregion
//#region node_modules/@mantine/core/esm/components/Loader/loaders/Dots.mjs
var Dots = ({ className, ...others }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
	component: "span",
	className: clsx(Loader_module_default.dotsLoader, className),
	...others,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: Loader_module_default.dot }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: Loader_module_default.dot }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: Loader_module_default.dot })
	]
});
Dots.displayName = "@mantine/core/Dots";
//#endregion
//#region node_modules/@mantine/core/esm/components/Loader/loaders/Oval.mjs
var Oval = ({ className, ...others }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
	component: "span",
	className: clsx(Loader_module_default.ovalLoader, className),
	...others
});
Oval.displayName = "@mantine/core/Oval";
//#endregion
//#region node_modules/@mantine/core/esm/components/Loader/Loader.mjs
var defaultLoaders = {
	bars: Bars,
	oval: Oval,
	dots: Dots
};
var defaultProps = {
	loaders: defaultLoaders,
	type: "oval"
};
var varsResolver = createVarsResolver((theme, { size, color }) => ({ root: {
	"--loader-size": getSize(size, "loader-size"),
	"--loader-color": color ? getThemeColor(color, theme) : void 0
} }));
var Loader = factory((_props) => {
	const props = useProps("Loader", defaultProps, _props);
	const { size, color, type, vars, className, style, classNames, styles, unstyled, loaders, variant, children, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Loader",
		props,
		classes: Loader_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	if (children) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("root"),
		...others,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("root"),
		component: loaders[type],
		variant,
		size,
		...others
	});
});
Loader.defaultLoaders = defaultLoaders;
Loader.classes = Loader_module_default;
Loader.varsResolver = varsResolver;
Loader.displayName = "@mantine/core/Loader";
//#endregion
export { Loader as t };
