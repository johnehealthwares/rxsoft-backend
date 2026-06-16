import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { E as getThemeColor, F as getRadius, M as createVarsResolver, b as useMantineEnv, d as useStyles, f as useProps, m as useMantineTheme, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as createScopedKeydownHandler } from "./create-scoped-keydown-handler-BmWf1hwa.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { n as getContrastColor, t as getAutoContrastValue } from "./get-auto-contrast-value-KJxlU8Ss.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
//#region node_modules/@mantine/core/esm/core/utils/get-safe-id/get-safe-id.mjs
function getSafeId(uid, errorMessage) {
	return (value) => {
		if (typeof value !== "string" || value.trim().length === 0) throw new Error(errorMessage);
		return `${uid}-${value}`;
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Tabs/Tabs.context.mjs
var [TabsProvider, useTabsContext] = createSafeContext("Tabs component was not found in the tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Tabs/Tabs.module.mjs
var Tabs_module_default = {
	"root": "m_89d60db1",
	"list--default": "m_576c9d4",
	"list": "m_89d33d6d",
	"tab": "m_4ec4dce6",
	"panel": "m_b0c91715",
	"tabSection": "m_fc420b1f",
	"tabLabel": "m_42bbd1ae",
	"tab--default": "m_539e827b",
	"list--outline": "m_6772fbd5",
	"tab--outline": "m_b59ab47c",
	"tab--pills": "m_c3381914"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Tabs/TabsList/TabsList.mjs
var import_jsx_runtime = require_jsx_runtime();
var TabsList = factory((_props) => {
	const props = useProps("TabsList", null, _props);
	const { children, className, grow, justify, classNames, styles, style, mod, ...others } = props;
	const ctx = useTabsContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...ctx.getStyles("list", {
			className,
			style,
			classNames,
			styles,
			props,
			variant: ctx.variant
		}),
		role: "tablist",
		variant: ctx.variant,
		mod: [{
			grow,
			orientation: ctx.orientation,
			placement: ctx.orientation === "vertical" && ctx.placement,
			inverted: ctx.inverted
		}, mod],
		"aria-orientation": ctx.orientation,
		__vars: { "--tabs-justify": justify },
		...others,
		children
	});
});
TabsList.classes = Tabs_module_default;
TabsList.displayName = "@mantine/core/TabsList";
//#endregion
//#region node_modules/@mantine/core/esm/components/Tabs/TabsPanel/TabsPanel.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var TabsPanel = factory((_props) => {
	const props = useProps("TabsPanel", null, _props);
	const { children, className, value, classNames, styles, style, mod, keepMounted, ...others } = props;
	const env = useMantineEnv();
	const ctx = useTabsContext();
	const active = ctx.value === value;
	const shouldKeepMounted = ctx.keepMounted || keepMounted;
	const useActivity = ctx.keepMountedMode !== "display-none";
	const content = shouldKeepMounted && useActivity && env !== "test" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Activity, {
		mode: active ? "visible" : "hidden",
		children
	}) : shouldKeepMounted ? children : active ? children : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...ctx.getStyles("panel", {
			className,
			classNames,
			styles,
			style: [style, !active ? { display: "none" } : void 0],
			props
		}),
		mod: [{ orientation: ctx.orientation }, mod],
		role: "tabpanel",
		id: ctx.getPanelId(value),
		"aria-labelledby": ctx.getTabId(value),
		...others,
		children: content
	});
});
TabsPanel.classes = Tabs_module_default;
TabsPanel.displayName = "@mantine/core/TabsPanel";
//#endregion
//#region node_modules/@mantine/core/esm/components/Tabs/TabsTab/TabsTab.mjs
var TabsTab = factory((_props) => {
	const props = useProps("TabsTab", null, _props);
	const { className, children, rightSection, leftSection, value, onClick, onKeyDown, disabled, color, style, classNames, styles, vars, mod, tabIndex, ...others } = props;
	const theme = useMantineTheme();
	const { dir } = useDirection();
	const ctx = useTabsContext();
	const active = value === ctx.value;
	const activateTab = (event) => {
		ctx.onChange(ctx.allowTabDeactivation ? value === ctx.value ? null : value : value);
		onClick?.(event);
	};
	const stylesApiProps = {
		classNames,
		styles,
		props
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		...ctx.getStyles("tab", {
			className,
			style,
			variant: ctx.variant,
			...stylesApiProps
		}),
		disabled,
		unstyled: ctx.unstyled,
		variant: ctx.variant,
		mod: [{
			active,
			disabled,
			orientation: ctx.orientation,
			inverted: ctx.inverted,
			placement: ctx.orientation === "vertical" && ctx.placement
		}, mod],
		role: "tab",
		id: ctx.getTabId(value),
		"aria-selected": active,
		tabIndex: tabIndex !== void 0 ? tabIndex : active || ctx.value === null ? 0 : -1,
		"aria-controls": ctx.getPanelId(value),
		onClick: activateTab,
		__vars: { "--tabs-color": color ? getThemeColor(color, theme) : void 0 },
		onKeyDown: createScopedKeydownHandler({
			siblingSelector: "[role=\"tab\"]",
			parentSelector: "[role=\"tablist\"]",
			activateOnFocus: ctx.activateTabWithKeyboard,
			loop: ctx.loop,
			orientation: ctx.orientation || "horizontal",
			dir,
			onKeyDown
		}),
		...others,
		children: [
			leftSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...ctx.getStyles("tabSection", stylesApiProps),
				"data-position": "left",
				children: leftSection
			}),
			children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...ctx.getStyles("tabLabel", stylesApiProps),
				children
			}),
			rightSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...ctx.getStyles("tabSection", stylesApiProps),
				"data-position": "right",
				children: rightSection
			})
		]
	});
});
TabsTab.classes = Tabs_module_default;
TabsTab.displayName = "@mantine/core/TabsTab";
//#endregion
//#region node_modules/@mantine/core/esm/components/Tabs/Tabs.mjs
var VALUE_ERROR = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";
var defaultProps = {
	keepMounted: true,
	keepMountedMode: "activity",
	orientation: "horizontal",
	loop: true,
	activateTabWithKeyboard: true,
	variant: "default",
	placement: "left"
};
var varsResolver = createVarsResolver((theme, { radius, color, autoContrast }) => ({ root: {
	"--tabs-radius": getRadius(radius),
	"--tabs-color": getThemeColor(color, theme),
	"--tabs-text-color": getAutoContrastValue(autoContrast, theme) ? getContrastColor({
		color,
		theme,
		autoContrast
	}) : void 0
} }));
var Tabs = factory((_props) => {
	const props = useProps("Tabs", defaultProps, _props);
	const { defaultValue, value, onChange, orientation, children, loop, id, activateTabWithKeyboard, allowTabDeactivation, variant, color, radius, inverted, placement, keepMounted, keepMountedMode, classNames, styles, unstyled, className, style, vars, autoContrast, mod, attributes, ...others } = props;
	const uid = useId$1(id);
	const [currentTab, setCurrentTab] = useUncontrolled({
		value,
		defaultValue,
		finalValue: null,
		onChange
	});
	const getStyles = useStyles({
		name: "Tabs",
		props,
		classes: Tabs_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		value: {
			placement,
			value: currentTab,
			orientation,
			id: uid,
			loop,
			activateTabWithKeyboard,
			getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
			getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
			onChange: setCurrentTab,
			allowTabDeactivation,
			variant,
			color,
			radius,
			inverted,
			keepMounted,
			keepMountedMode,
			unstyled,
			getStyles
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			id: uid,
			variant,
			mod: [{
				orientation,
				inverted: orientation === "horizontal" && inverted,
				placement: orientation === "vertical" && placement
			}, mod],
			...getStyles("root"),
			...others,
			children
		})
	});
});
Tabs.classes = Tabs_module_default;
Tabs.varsResolver = varsResolver;
Tabs.displayName = "@mantine/core/Tabs";
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
//#endregion
export { getSafeId as n, Tabs as t };
