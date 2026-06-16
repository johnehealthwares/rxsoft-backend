import { E as getThemeColor, F as getRadius, L as getSize, M as createVarsResolver, d as useStyles, f as useProps, m as useMantineTheme, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { n as getContrastColor, t as getAutoContrastValue } from "./get-auto-contrast-value-KJxlU8Ss.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useResolvedStylesApi } from "./use-resolved-styles-api-DyPXwNb0.js";
//#region node_modules/@mantine/core/esm/components/Progress/Progress.context.mjs
var [ProgressProvider, useProgressContext] = createSafeContext("Progress.Root component was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Progress/Progress.module.mjs
var Progress_module_default = {
	"root": "m_db6d6462",
	"section": "m_2242eb65",
	"stripes-animation": "m_81a374bd",
	"stripes-animation-vertical": "m_e0fb7a86",
	"label": "m_91e40b74"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Progress/ProgressLabel/ProgressLabel.mjs
var import_jsx_runtime = require_jsx_runtime();
var ProgressLabel = factory((props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ProgressLabel", null, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useProgressContext().getStyles("label", {
			className,
			style,
			classNames,
			styles
		}),
		...others
	});
});
ProgressLabel.classes = Progress_module_default;
ProgressLabel.displayName = "@mantine/core/ProgressLabel";
//#endregion
//#region node_modules/@mantine/core/esm/components/Progress/ProgressRoot/ProgressRoot.mjs
var varsResolver = createVarsResolver((_, { size, radius, transitionDuration }) => ({ root: {
	"--progress-size": getSize(size, "progress-size"),
	"--progress-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--progress-transition-duration": typeof transitionDuration === "number" ? `${transitionDuration}ms` : void 0
} }));
var ProgressRoot = factory((_props) => {
	const props = useProps("ProgressRoot", null, _props);
	const { classNames, className, style, styles, unstyled, vars, autoContrast, transitionDuration, orientation, attributes, mod, ...others } = props;
	const getStyles = useStyles({
		name: "Progress",
		classes: Progress_module_default,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressProvider, {
		value: {
			getStyles,
			autoContrast
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			mod: [{ orientation }, mod],
			...getStyles("root"),
			...others
		})
	});
});
ProgressRoot.classes = Progress_module_default;
ProgressRoot.varsResolver = varsResolver;
ProgressRoot.displayName = "@mantine/core/ProgressRoot";
//#endregion
//#region node_modules/@mantine/core/esm/components/Progress/ProgressSection/ProgressSection.mjs
var defaultProps = { withAria: true };
var ProgressSection = factory((props) => {
	const { classNames, className, style, styles, vars, value, withAria, color, striped, animated, mod, ...others } = useProps("ProgressSection", defaultProps, props);
	const ctx = useProgressContext();
	const theme = useMantineTheme();
	const ariaAttributes = withAria ? {
		role: "progressbar",
		"aria-valuemax": 100,
		"aria-valuemin": 0,
		"aria-valuenow": value,
		"aria-valuetext": `${value}%`
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...ctx.getStyles("section", {
			className,
			classNames,
			styles,
			style
		}),
		...others,
		...ariaAttributes,
		mod: [{
			striped: striped || animated,
			animated
		}, mod],
		__vars: {
			"--progress-section-size": `${value}%`,
			"--progress-section-color": getThemeColor(color, theme),
			"--progress-label-color": getAutoContrastValue(ctx.autoContrast, theme) ? getContrastColor({
				color,
				theme,
				autoContrast: ctx.autoContrast
			}) : void 0
		}
	});
});
ProgressSection.classes = Progress_module_default;
ProgressSection.displayName = "@mantine/core/ProgressSection";
//#endregion
//#region node_modules/@mantine/core/esm/components/Progress/Progress.mjs
var Progress = factory((_props) => {
	const props = useProps("Progress", null, _props);
	const { value, classNames, styles, vars, color, striped, animated, "aria-label": label, ...others } = props;
	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
		classNames,
		styles,
		props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRoot, {
		classNames: resolvedClassNames,
		styles: resolvedStyles,
		vars,
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressSection, {
			value,
			color,
			striped,
			animated,
			"aria-label": label
		})
	});
});
Progress.classes = Progress_module_default;
Progress.displayName = "@mantine/core/Progress";
Progress.Section = ProgressSection;
Progress.Root = ProgressRoot;
Progress.Label = ProgressLabel;
//#endregion
export { Progress as t };
