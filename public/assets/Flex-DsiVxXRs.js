import { d as useStyles, f as useProps, l as hashStyleProps, m as useMantineTheme, n as polymorphicFactory, o as useRandomClassName, s as parseStyleProps, t as Box, u as InlineStyles, y as useMantineDeduplicateInlineStyles, z as filterProps } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Flex/flex-props.mjs
var FLEX_STYLE_PROPS_DATA = {
	gap: {
		type: "spacing",
		property: "gap"
	},
	rowGap: {
		type: "spacing",
		property: "rowGap"
	},
	columnGap: {
		type: "spacing",
		property: "columnGap"
	},
	align: {
		type: "identity",
		property: "alignItems"
	},
	justify: {
		type: "identity",
		property: "justifyContent"
	},
	wrap: {
		type: "identity",
		property: "flexWrap"
	},
	direction: {
		type: "identity",
		property: "flexDirection"
	}
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Flex/Flex.module.mjs
var Flex_module_default = { "root": "m_8bffd616" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Flex/Flex.mjs
var import_jsx_runtime = require_jsx_runtime();
var Flex = polymorphicFactory((_props) => {
	const props = useProps("Flex", null, _props);
	const { classNames, className, style, styles, unstyled, vars, gap, rowGap, columnGap, align, justify, wrap, direction, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Flex",
		classes: Flex_module_default,
		props,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars
	});
	const theme = useMantineTheme();
	const randomClassName = useRandomClassName();
	const parsedStyleProps = parseStyleProps({
		styleProps: {
			gap,
			rowGap,
			columnGap,
			align,
			justify,
			wrap,
			direction
		},
		theme,
		data: FLEX_STYLE_PROPS_DATA
	});
	const deduplicateInlineStyles = useMantineDeduplicateInlineStyles();
	const responsiveClassName = deduplicateInlineStyles && parsedStyleProps.hasResponsiveStyles ? hashStyleProps(parsedStyleProps.styles, parsedStyleProps.media) : randomClassName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStyles, {
		selector: `.${responsiveClassName}`,
		styles: parsedStyleProps.styles,
		media: parsedStyleProps.media,
		deduplicate: deduplicateInlineStyles
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("root", {
			className: responsiveClassName,
			style: filterProps(parsedStyleProps.inlineStyles)
		}),
		...others
	})] });
});
Flex.classes = Flex_module_default;
Flex.displayName = "@mantine/core/Flex";
//#endregion
export { Flex as t };
