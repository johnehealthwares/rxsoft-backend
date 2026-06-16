import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { B as em, M as createVarsResolver, R as getSpacing, U as keys, V as rem, _ as useMantineContext, d as useStyles, f as useProps, j as clsx, m as useMantineTheme, n as polymorphicFactory, r as factory, t as Box, u as InlineStyles } from "./Box-7OfPvxF3.js";
import { n as getBreakpointValue, t as getSortedBreakpoints } from "./get-sorted-breakpoints-NgDLRp_t.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as getDefaultZIndex } from "./get-default-z-index-DH-2Ba3K.js";
import { t as useIsomorphicEffect } from "./use-isomorphic-effect-n8PrQSeG.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { n as useWindowEvent, t as ReactRemoveScroll } from "./Combination-_d56CT5F.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/AppShell/AppShell.context.mjs
var [AppShellProvider, useAppShellContext] = createSafeContext("AppShell was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShell.module.mjs
var AppShell_module_default = {
	"root": "m_89ab340",
	"navbar": "m_45252eee",
	"aside": "m_9cdde9a",
	"header": "m_3b16f56b",
	"main": "m_8983817",
	"footer": "m_3840c879",
	"section": "m_6dcfc7c7"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellAside/AppShellAside.mjs
var import_jsx_runtime = require_jsx_runtime();
var AppShellAside = factory((_props) => {
	const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, mod, ...others } = useProps("AppShellAside", null, _props);
	const ctx = useAppShellContext();
	if (ctx.disabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "aside",
		mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
		...ctx.getStyles("aside", {
			className: clsx({ [ReactRemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, className),
			classNames,
			styles,
			style
		}),
		...others,
		__vars: { "--app-shell-aside-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)` }
	});
});
AppShellAside.classes = AppShell_module_default;
AppShellAside.displayName = "@mantine/core/AppShellAside";
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellFooter/AppShellFooter.mjs
var AppShellFooter = factory((_props) => {
	const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, mod, ...others } = useProps("AppShellFooter", null, _props);
	const ctx = useAppShellContext();
	if (ctx.disabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "footer",
		mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
		...ctx.getStyles("footer", {
			className: clsx({ [ReactRemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, className),
			classNames,
			styles,
			style
		}),
		...others,
		__vars: { "--app-shell-footer-z-index": (zIndex ?? ctx.zIndex)?.toString() }
	});
});
AppShellFooter.classes = AppShell_module_default;
AppShellFooter.displayName = "@mantine/core/AppShellFooter";
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellHeader/AppShellHeader.mjs
var AppShellHeader = factory((_props) => {
	const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, mod, ...others } = useProps("AppShellHeader", null, _props);
	const ctx = useAppShellContext();
	if (ctx.disabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "header",
		mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
		...ctx.getStyles("header", {
			className: clsx({ [ReactRemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, className),
			classNames,
			styles,
			style
		}),
		...others,
		__vars: { "--app-shell-header-z-index": (zIndex ?? ctx.zIndex)?.toString() }
	});
});
AppShellHeader.classes = AppShell_module_default;
AppShellHeader.displayName = "@mantine/core/AppShellHeader";
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMain/AppShellMain.mjs
var AppShellMain = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("AppShellMain", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "main",
		...useAppShellContext().getStyles("main", {
			className,
			style,
			classNames,
			styles
		}),
		...others
	});
});
AppShellMain.classes = AppShell_module_default;
AppShellMain.displayName = "@mantine/core/AppShellMain";
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellNavbar/AppShellNavbar.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var AppShellNavbar = factory((_props) => {
	const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, mod, ...others } = useProps("AppShellNavbar", null, _props);
	const ctx = useAppShellContext();
	if (ctx.disabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "nav",
		mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
		...ctx.getStyles("navbar", {
			className,
			classNames,
			styles,
			style
		}),
		...others,
		__vars: { "--app-shell-navbar-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)` }
	});
});
AppShellNavbar.classes = AppShell_module_default;
AppShellNavbar.displayName = "@mantine/core/AppShellNavbar";
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellSection/AppShellSection.mjs
var AppShellSection = polymorphicFactory((_props) => {
	const { classNames, className, style, styles, vars, grow, mod, ...others } = useProps("AppShellSection", null, _props);
	const ctx = useAppShellContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		mod: [{ grow }, mod],
		...ctx.getStyles("section", {
			className,
			style,
			classNames,
			styles
		}),
		...others
	});
});
AppShellSection.classes = AppShell_module_default;
AppShellSection.displayName = "@mantine/core/AppShellSection";
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/get-base-size/get-base-size.mjs
function getBaseSize(size) {
	if (typeof size === "object") return size.base;
	return size;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/is-primitive-size/is-primitive-size.mjs
function isPrimitiveSize(size) {
	const isBaseSize = typeof size === "object" && size !== null && typeof size.base !== "undefined" && Object.keys(size).length === 1;
	return typeof size === "number" || typeof size === "string" || isBaseSize;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/is-responsive-size/is-responsive-size.mjs
function isResponsiveSize(size) {
	if (typeof size !== "object" || size === null) return false;
	if (Object.keys(size).length === 1 && "base" in size) return false;
	return true;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-aside-variables/assign-aside-variables.mjs
function assignAsideVariables({ baseStyles, minMediaStyles, maxMediaStyles, aside, theme, mode }) {
	const asideWidth = aside?.width;
	const collapsedAsideTransform = "translateX(var(--app-shell-aside-width))";
	const collapsedAsideTransformRtl = "translateX(calc(var(--app-shell-aside-width) * -1))";
	if (aside?.breakpoint && !aside?.collapsed?.mobile) {
		maxMediaStyles[aside?.breakpoint] = maxMediaStyles[aside?.breakpoint] || {};
		if (mode === "fixed") {
			maxMediaStyles[aside?.breakpoint]["--app-shell-aside-width"] = "100%";
			maxMediaStyles[aside?.breakpoint]["--app-shell-aside-offset"] = "0px";
		} else {
			maxMediaStyles[aside?.breakpoint]["--app-shell-aside-width"] = "0px";
			maxMediaStyles[aside?.breakpoint]["--app-shell-aside-offset"] = "0px";
		}
	}
	if (isPrimitiveSize(asideWidth)) {
		const baseSize = rem(getBaseSize(asideWidth));
		baseStyles["--app-shell-aside-width"] = baseSize;
		baseStyles["--app-shell-aside-offset"] = baseSize;
	}
	if (isResponsiveSize(asideWidth)) {
		if (typeof asideWidth.base !== "undefined") {
			baseStyles["--app-shell-aside-width"] = rem(asideWidth.base);
			baseStyles["--app-shell-aside-offset"] = rem(asideWidth.base);
		}
		keys(asideWidth).forEach((key) => {
			if (key !== "base") {
				minMediaStyles[key] = minMediaStyles[key] || {};
				minMediaStyles[key]["--app-shell-aside-width"] = rem(asideWidth[key]);
				minMediaStyles[key]["--app-shell-aside-offset"] = rem(asideWidth[key]);
			}
		});
	}
	if (aside?.breakpoint && mode === "static") {
		minMediaStyles[aside.breakpoint] = minMediaStyles[aside.breakpoint] || {};
		minMediaStyles[aside.breakpoint]["--app-shell-aside-position"] = "sticky";
		minMediaStyles[aside.breakpoint]["--app-shell-aside-grid-row"] = "2";
		minMediaStyles[aside.breakpoint]["--app-shell-aside-grid-column"] = "3";
		minMediaStyles[aside.breakpoint]["--app-shell-main-column-end"] = "3";
	}
	if (aside?.collapsed?.desktop) {
		const breakpointValue = aside.breakpoint;
		minMediaStyles[breakpointValue] = minMediaStyles[breakpointValue] || {};
		minMediaStyles[breakpointValue]["--app-shell-aside-transform"] = collapsedAsideTransform;
		minMediaStyles[breakpointValue]["--app-shell-aside-transform-rtl"] = collapsedAsideTransformRtl;
		if (mode === "fixed") minMediaStyles[breakpointValue]["--app-shell-aside-offset"] = "0px !important";
		else {
			minMediaStyles[breakpointValue]["--app-shell-aside-width"] = "0px";
			minMediaStyles[breakpointValue]["--app-shell-aside-display"] = "none";
			minMediaStyles[breakpointValue]["--app-shell-main-column-end"] = "-1";
		}
		minMediaStyles[breakpointValue]["--app-shell-aside-scroll-locked-visibility"] = "hidden";
	}
	if (aside?.collapsed?.mobile) {
		const breakpointValue = getBreakpointValue(aside.breakpoint, theme.breakpoints) - .1;
		maxMediaStyles[breakpointValue] = maxMediaStyles[breakpointValue] || {};
		if (mode === "fixed") {
			maxMediaStyles[breakpointValue]["--app-shell-aside-width"] = "100%";
			maxMediaStyles[breakpointValue]["--app-shell-aside-offset"] = "0px";
		} else maxMediaStyles[breakpointValue]["--app-shell-aside-width"] = "0px";
		maxMediaStyles[breakpointValue]["--app-shell-aside-transform"] = collapsedAsideTransform;
		maxMediaStyles[breakpointValue]["--app-shell-aside-transform-rtl"] = collapsedAsideTransformRtl;
		maxMediaStyles[breakpointValue]["--app-shell-aside-scroll-locked-visibility"] = "hidden";
	}
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-footer-variables/assign-footer-variables.mjs
function assignFooterVariables({ baseStyles, minMediaStyles, footer, mode }) {
	const footerHeight = footer?.height;
	const collapsedFooterTransform = "translateY(var(--app-shell-footer-height))";
	const shouldOffset = mode === "static" ? true : footer?.offset ?? true;
	if (mode === "static" && footer) {
		baseStyles["--app-shell-footer-position"] = "sticky";
		baseStyles["--app-shell-footer-grid-column"] = "1 / -1";
		baseStyles["--app-shell-footer-grid-row"] = "3";
	}
	if (isPrimitiveSize(footerHeight)) {
		const baseSize = rem(getBaseSize(footerHeight));
		baseStyles["--app-shell-footer-height"] = baseSize;
		if (shouldOffset) baseStyles["--app-shell-footer-offset"] = baseSize;
	}
	if (isResponsiveSize(footerHeight)) {
		if (typeof footerHeight.base !== "undefined") {
			baseStyles["--app-shell-footer-height"] = rem(footerHeight.base);
			if (shouldOffset) baseStyles["--app-shell-footer-offset"] = rem(footerHeight.base);
		}
		keys(footerHeight).forEach((key) => {
			if (key !== "base") {
				minMediaStyles[key] = minMediaStyles[key] || {};
				minMediaStyles[key]["--app-shell-footer-height"] = rem(footerHeight[key]);
				if (shouldOffset) minMediaStyles[key]["--app-shell-footer-offset"] = rem(footerHeight[key]);
			}
		});
	}
	if (footer?.collapsed) {
		baseStyles["--app-shell-footer-transform"] = collapsedFooterTransform;
		if (mode === "fixed") baseStyles["--app-shell-footer-offset"] = "0px !important";
	}
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-header-variables/assign-header-variables.mjs
function assignHeaderVariables({ baseStyles, minMediaStyles, header, mode }) {
	const headerHeight = header?.height;
	const collapsedHeaderTransform = "translateY(calc(var(--app-shell-header-height) * -1))";
	const shouldOffset = mode === "static" ? true : header?.offset ?? true;
	if (mode === "static" && header) {
		baseStyles["--app-shell-header-position"] = "sticky";
		baseStyles["--app-shell-header-grid-column"] = "1 / -1";
		baseStyles["--app-shell-header-grid-row"] = "1";
	}
	if (isPrimitiveSize(headerHeight)) {
		const baseSize = rem(getBaseSize(headerHeight));
		baseStyles["--app-shell-header-height"] = baseSize;
		if (shouldOffset) baseStyles["--app-shell-header-offset"] = baseSize;
	}
	if (isResponsiveSize(headerHeight)) {
		if (typeof headerHeight.base !== "undefined") {
			baseStyles["--app-shell-header-height"] = rem(headerHeight.base);
			if (shouldOffset) baseStyles["--app-shell-header-offset"] = rem(headerHeight.base);
		}
		keys(headerHeight).forEach((key) => {
			if (key !== "base") {
				minMediaStyles[key] = minMediaStyles[key] || {};
				minMediaStyles[key]["--app-shell-header-height"] = rem(headerHeight[key]);
				if (shouldOffset) minMediaStyles[key]["--app-shell-header-offset"] = rem(headerHeight[key]);
			}
		});
	}
	if (header?.collapsed) {
		baseStyles["--app-shell-header-transform"] = collapsedHeaderTransform;
		if (mode === "fixed") baseStyles["--app-shell-header-offset"] = "0px !important";
	}
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-navbar-variables/assign-navbar-variables.mjs
function assignNavbarVariables({ baseStyles, minMediaStyles, maxMediaStyles, navbar, theme, mode }) {
	const navbarWidth = navbar?.width;
	const collapsedNavbarTransform = "translateX(calc(var(--app-shell-navbar-width) * -1))";
	const collapsedNavbarTransformRtl = "translateX(var(--app-shell-navbar-width))";
	if (navbar?.breakpoint && !navbar?.collapsed?.mobile) {
		maxMediaStyles[navbar?.breakpoint] = maxMediaStyles[navbar?.breakpoint] || {};
		maxMediaStyles[navbar?.breakpoint]["--app-shell-navbar-offset"] = "0px";
		maxMediaStyles[navbar?.breakpoint]["--app-shell-navbar-width"] = "100%";
		if (mode === "static") maxMediaStyles[navbar?.breakpoint]["--app-shell-navbar-grid-width"] = "0px";
	}
	if (isPrimitiveSize(navbarWidth)) {
		const baseSize = rem(getBaseSize(navbarWidth));
		baseStyles["--app-shell-navbar-width"] = baseSize;
		baseStyles["--app-shell-navbar-offset"] = baseSize;
		if (mode === "static") baseStyles["--app-shell-navbar-grid-width"] = baseSize;
	}
	if (isResponsiveSize(navbarWidth)) {
		if (typeof navbarWidth.base !== "undefined") {
			baseStyles["--app-shell-navbar-width"] = rem(navbarWidth.base);
			baseStyles["--app-shell-navbar-offset"] = rem(navbarWidth.base);
			if (mode === "static") baseStyles["--app-shell-navbar-grid-width"] = rem(navbarWidth.base);
		}
		keys(navbarWidth).forEach((key) => {
			if (key !== "base") {
				minMediaStyles[key] = minMediaStyles[key] || {};
				minMediaStyles[key]["--app-shell-navbar-width"] = rem(navbarWidth[key]);
				minMediaStyles[key]["--app-shell-navbar-offset"] = rem(navbarWidth[key]);
				if (mode === "static") minMediaStyles[key]["--app-shell-navbar-grid-width"] = rem(navbarWidth[key]);
			}
		});
	}
	if (navbar?.breakpoint && mode === "static") {
		minMediaStyles[navbar.breakpoint] = minMediaStyles[navbar.breakpoint] || {};
		minMediaStyles[navbar.breakpoint]["--app-shell-navbar-position"] = "sticky";
		minMediaStyles[navbar.breakpoint]["--app-shell-navbar-grid-row"] = "2";
		minMediaStyles[navbar.breakpoint]["--app-shell-navbar-grid-column"] = "1";
		minMediaStyles[navbar.breakpoint]["--app-shell-main-column-start"] = "2";
	}
	if (navbar?.collapsed?.desktop) {
		const breakpointValue = navbar.breakpoint;
		minMediaStyles[breakpointValue] = minMediaStyles[breakpointValue] || {};
		minMediaStyles[breakpointValue]["--app-shell-navbar-transform"] = collapsedNavbarTransform;
		minMediaStyles[breakpointValue]["--app-shell-navbar-transform-rtl"] = collapsedNavbarTransformRtl;
		if (mode === "fixed") minMediaStyles[breakpointValue]["--app-shell-navbar-offset"] = "0px !important";
		else {
			minMediaStyles[breakpointValue]["--app-shell-navbar-width"] = "0px";
			minMediaStyles[breakpointValue]["--app-shell-navbar-display"] = "none";
			minMediaStyles[breakpointValue]["--app-shell-main-column-start"] = "1";
		}
	}
	if (navbar?.collapsed?.mobile) {
		const breakpointValue = getBreakpointValue(navbar.breakpoint, theme.breakpoints) - .1;
		maxMediaStyles[breakpointValue] = maxMediaStyles[breakpointValue] || {};
		maxMediaStyles[breakpointValue]["--app-shell-navbar-width"] = "100%";
		maxMediaStyles[breakpointValue]["--app-shell-navbar-offset"] = "0px";
		if (mode === "static") maxMediaStyles[breakpointValue]["--app-shell-navbar-grid-width"] = "0px";
		maxMediaStyles[breakpointValue]["--app-shell-navbar-transform"] = collapsedNavbarTransform;
		maxMediaStyles[breakpointValue]["--app-shell-navbar-transform-rtl"] = collapsedNavbarTransformRtl;
	}
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/get-padding-value/get-padding-value.mjs
function getPaddingValue(padding) {
	return Number(padding) === 0 ? "0px" : getSpacing(padding);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-padding-variables/assign-padding-variables.mjs
function assignPaddingVariables({ padding, baseStyles, minMediaStyles }) {
	if (isPrimitiveSize(padding)) baseStyles["--app-shell-padding"] = getPaddingValue(getBaseSize(padding));
	if (isResponsiveSize(padding)) {
		if (padding.base) baseStyles["--app-shell-padding"] = getPaddingValue(padding.base);
		keys(padding).forEach((key) => {
			if (key !== "base") {
				minMediaStyles[key] = minMediaStyles[key] || {};
				minMediaStyles[key]["--app-shell-padding"] = getPaddingValue(padding[key]);
			}
		});
	}
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/get-variables/get-variables.mjs
function getVariables({ navbar, header, footer, aside, padding, theme, mode }) {
	const minMediaStyles = {};
	const maxMediaStyles = {};
	const baseStyles = {};
	if (mode === "static") {
		baseStyles["--app-shell-main-grid-column"] = "1 / -1";
		baseStyles["--app-shell-main-grid-row"] = "2";
	}
	assignNavbarVariables({
		baseStyles,
		minMediaStyles,
		maxMediaStyles,
		navbar,
		theme,
		mode
	});
	assignAsideVariables({
		baseStyles,
		minMediaStyles,
		maxMediaStyles,
		aside,
		theme,
		mode
	});
	assignHeaderVariables({
		baseStyles,
		minMediaStyles,
		header,
		mode
	});
	assignFooterVariables({
		baseStyles,
		minMediaStyles,
		footer,
		mode
	});
	assignPaddingVariables({
		baseStyles,
		minMediaStyles,
		padding
	});
	const minMedia = getSortedBreakpoints(keys(minMediaStyles), theme.breakpoints).map((breakpoint) => ({
		query: `(min-width: ${em(breakpoint.px)})`,
		styles: minMediaStyles[breakpoint.value]
	}));
	const maxMedia = getSortedBreakpoints(keys(maxMediaStyles), theme.breakpoints).map((breakpoint) => ({
		query: `(max-width: ${em(breakpoint.px)})`,
		styles: maxMediaStyles[breakpoint.value]
	}));
	return {
		baseStyles,
		media: [...minMedia, ...maxMedia]
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/AppShellMediaStyles.mjs
function AppShellMediaStyles({ navbar, header, aside, footer, padding, mode, selector }) {
	const theme = useMantineTheme();
	const ctx = useMantineContext();
	const { media, baseStyles } = getVariables({
		navbar,
		header,
		footer,
		aside,
		padding,
		theme,
		mode
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStyles, {
		media,
		styles: baseStyles,
		selector: selector || ctx.cssVariablesSelector
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/use-resizing/use-resizing.mjs
function useResizing({ transitionDuration, disabled }) {
	const [resizing, setResizing] = (0, import_react.useState)(true);
	const resizingTimeout = (0, import_react.useRef)(-1);
	const disabledTimeout = (0, import_react.useRef)(-1);
	useWindowEvent("resize", () => {
		setResizing(true);
		clearTimeout(resizingTimeout.current);
		resizingTimeout.current = window.setTimeout(() => (0, import_react.startTransition)(() => {
			setResizing(false);
		}), 200);
	});
	useIsomorphicEffect(() => {
		setResizing(true);
		clearTimeout(disabledTimeout.current);
		disabledTimeout.current = window.setTimeout(() => (0, import_react.startTransition)(() => {
			setResizing(false);
		}), transitionDuration || 0);
	}, [disabled, transitionDuration]);
	return resizing;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/AppShell/AppShell.mjs
var defaultProps = {
	withBorder: true,
	padding: 0,
	transitionDuration: 200,
	transitionTimingFunction: "ease",
	zIndex: getDefaultZIndex("app"),
	mode: "fixed"
};
var varsResolver = createVarsResolver((_, { transitionDuration, transitionTimingFunction }) => ({ root: {
	"--app-shell-transition-duration": `${transitionDuration}ms`,
	"--app-shell-transition-timing-function": transitionTimingFunction
} }));
var AppShell = factory((_props) => {
	const props = useProps("AppShell", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, navbar, withBorder, padding, transitionDuration, transitionTimingFunction, header, zIndex, layout, disabled, aside, footer, offsetScrollbars = true, mode, mod, attributes, id, ...others } = props;
	const getStyles = useStyles({
		name: "AppShell",
		classes: AppShell_module_default,
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
	const resizing = useResizing({
		disabled,
		transitionDuration
	});
	const _id = useId$1(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShellProvider, {
		value: {
			getStyles,
			withBorder,
			zIndex,
			disabled,
			offsetScrollbars,
			mode
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShellMediaStyles, {
			navbar,
			header,
			aside,
			footer,
			padding,
			mode,
			selector: mode === "static" ? `#${_id}` : void 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...getStyles("root"),
			id: _id,
			mod: [{
				resizing,
				layout,
				disabled,
				mode
			}, mod],
			...others
		})]
	});
});
AppShell.classes = AppShell_module_default;
AppShell.varsResolver = varsResolver;
AppShell.displayName = "@mantine/core/AppShell";
AppShell.Navbar = AppShellNavbar;
AppShell.Header = AppShellHeader;
AppShell.Main = AppShellMain;
AppShell.Aside = AppShellAside;
AppShell.Footer = AppShellFooter;
AppShell.Section = AppShellSection;
//#endregion
export { AppShell as t };
