import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { D as parseThemeColor, d as useStyles, f as useProps, m as useMantineTheme, n as polymorphicFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as getSingleElementChild, r as isElement } from "./OptionalPortal-COfBOdxY.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { n as findElementAncestor, t as createScopedKeydownHandler } from "./create-scoped-keydown-handler-BmWf1hwa.js";
import { t as Popover } from "./Popover-Cd9aInuj.js";
import { t as createEventHandler } from "./create-event-handler-Ak4zfbwp.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useResolvedStylesApi } from "./use-resolved-styles-api-DyPXwNb0.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as AccordionChevron } from "./AccordionChevron-CiIiRDF8.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
//#region node_modules/@mantine/core/esm/core/utils/get-context-item-index/get-context-item-index.mjs
function getContextItemIndex(elementSelector, parentSelector, node) {
	if (!node) return null;
	return Array.from(findElementAncestor(node, parentSelector)?.querySelectorAll(elementSelector) || []).findIndex((element) => element === node);
}
//#endregion
//#region node_modules/@mantine/core/esm/utils/Floating/use-delayed-hover.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDelayedHover({ open, close, openDelay, closeDelay }) {
	const openTimeout = (0, import_react.useRef)(-1);
	const closeTimeout = (0, import_react.useRef)(-1);
	const clearTimeouts = () => {
		window.clearTimeout(openTimeout.current);
		window.clearTimeout(closeTimeout.current);
	};
	const openDropdown = () => {
		clearTimeouts();
		if (openDelay === 0 || openDelay === void 0) open();
		else openTimeout.current = window.setTimeout(open, openDelay);
	};
	const closeDropdown = () => {
		clearTimeouts();
		if (closeDelay === 0 || closeDelay === void 0) close();
		else closeTimeout.current = window.setTimeout(close, closeDelay);
	};
	(0, import_react.useEffect)(() => clearTimeouts, []);
	return {
		openDropdown,
		closeDropdown
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/Menu.context.mjs
var [MenuContextProvider, useMenuContext] = createSafeContext("Menu component was not found in the tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/Menu.module.mjs
var Menu_module_default = {
	"dropdown": "m_dc9b7c9f",
	"label": "m_9bfac126",
	"divider": "m_efdf90cb",
	"item": "m_99ac2aa1",
	"itemLabel": "m_5476e0d3",
	"itemSection": "m_8b75e504",
	"chevron": "m_b85b0bed"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuDivider/MenuDivider.mjs
var import_jsx_runtime = require_jsx_runtime();
var MenuDivider = factory((props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("MenuDivider", null, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useMenuContext().getStyles("divider", {
			className,
			style,
			styles,
			classNames
		}),
		...others
	});
});
MenuDivider.classes = Menu_module_default;
MenuDivider.displayName = "@mantine/core/MenuDivider";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuDropdown/MenuDropdown.mjs
var MenuDropdown = factory((props) => {
	const { classNames, className, style, styles, vars, onMouseEnter, onMouseLeave, onKeyDown, children, ref, ...others } = useProps("MenuDropdown", null, props);
	const wrapperRef = (0, import_react.useRef)(null);
	const ctx = useMenuContext();
	const handleKeyDown = createEventHandler(onKeyDown, (event) => {
		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			event.preventDefault();
			wrapperRef.current?.querySelectorAll("[data-menu-item]:not(:disabled)")[0]?.focus();
		}
	});
	const handleMouseEnter = createEventHandler(onMouseEnter, () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown());
	const handleMouseLeave = createEventHandler(onMouseLeave, () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.closeDropdown());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover.Dropdown, {
		...others,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		role: "menu",
		"aria-orientation": "vertical",
		ref: useMergedRef(ref, wrapperRef),
		...ctx.getStyles("dropdown", {
			className,
			style,
			styles,
			classNames,
			withStaticClass: false
		}),
		tabIndex: -1,
		"data-menu-dropdown": true,
		onKeyDown: handleKeyDown,
		children: [ctx.withInitialFocusPlaceholder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: -1,
			"data-autofocus": true,
			"data-mantine-stop-propagation": true,
			style: { outline: 0 }
		}), children]
	});
});
MenuDropdown.classes = Menu_module_default;
MenuDropdown.displayName = "@mantine/core/MenuDropdown";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuSub/MenuSub.context.mjs
var SubMenuContext = (0, import_react.createContext)(null);
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuItem/MenuItem.mjs
var MenuItem = polymorphicFactory((props) => {
	const { classNames, className, style, styles, vars, color, closeMenuOnClick, leftSection, rightSection, children, disabled, "data-disabled": dataDisabled, ref, ...others } = useProps("MenuItem", null, props);
	const ctx = useMenuContext();
	const subCtx = (0, import_react.use)(SubMenuContext);
	const theme = useMantineTheme();
	const { dir } = useDirection();
	const itemRef = (0, import_react.useRef)(null);
	const _others = others;
	const handleClick = createEventHandler(_others.onClick, () => {
		if (dataDisabled) return;
		if (typeof closeMenuOnClick === "boolean") closeMenuOnClick && ctx.closeDropdownImmediately();
		else ctx.closeOnItemClick && ctx.closeDropdownImmediately();
	});
	const colors = color ? theme.variantColorResolver({
		color,
		theme,
		variant: "light"
	}) : void 0;
	const parsedThemeColor = color ? parseThemeColor({
		color,
		theme
	}) : null;
	const handleKeydown = createEventHandler(_others.onKeyDown, (event) => {
		if (event.key === "ArrowLeft" && subCtx) {
			subCtx.close();
			subCtx.focusParentItem();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		onMouseDown: (event) => event.preventDefault(),
		...others,
		unstyled: ctx.unstyled,
		tabIndex: ctx.menuItemTabIndex,
		...ctx.getStyles("item", {
			className,
			style,
			styles,
			classNames
		}),
		ref: useMergedRef(itemRef, ref),
		role: "menuitem",
		disabled,
		"data-menu-item": true,
		"data-disabled": disabled || dataDisabled || void 0,
		"data-mantine-stop-propagation": true,
		onClick: handleClick,
		onKeyDown: createScopedKeydownHandler({
			siblingSelector: "[data-menu-item]:not([data-disabled])",
			parentSelector: "[data-menu-dropdown]",
			activateOnFocus: false,
			loop: ctx.loop,
			dir,
			orientation: "vertical",
			onKeyDown: handleKeydown
		}),
		__vars: {
			"--menu-item-color": parsedThemeColor?.isThemeColor && parsedThemeColor?.shade === void 0 ? `var(--mantine-color-${parsedThemeColor.color}-6)` : colors?.color,
			"--menu-item-hover": colors?.hover
		},
		children: [
			leftSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...ctx.getStyles("itemSection", {
					styles,
					classNames
				}),
				"data-position": "left",
				children: leftSection
			}),
			children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...ctx.getStyles("itemLabel", {
					styles,
					classNames
				}),
				children
			}),
			rightSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...ctx.getStyles("itemSection", {
					styles,
					classNames
				}),
				"data-position": "right",
				children: rightSection
			})
		]
	});
});
MenuItem.classes = Menu_module_default;
MenuItem.displayName = "@mantine/core/MenuItem";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuLabel/MenuLabel.mjs
var MenuLabel = factory((props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("MenuLabel", null, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useMenuContext().getStyles("label", {
			className,
			style,
			styles,
			classNames
		}),
		...others
	});
});
MenuLabel.classes = Menu_module_default;
MenuLabel.displayName = "@mantine/core/MenuLabel";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuSubDropdown/MenuSubDropdown.mjs
var MenuSubDropdown = factory((props) => {
	const { classNames, className, style, styles, vars, onMouseEnter, onMouseLeave, onKeyDown, children, ref, ...others } = useProps("MenuSubDropdown", null, props);
	const wrapperRef = (0, import_react.useRef)(null);
	const ctx = useMenuContext();
	const subCtx = (0, import_react.use)(SubMenuContext);
	const handleMouseEnter = createEventHandler(onMouseEnter, subCtx?.open);
	const handleMouseLeave = createEventHandler(onMouseLeave, subCtx?.close);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Dropdown, {
		...others,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		role: "menu",
		"aria-orientation": "vertical",
		ref: useMergedRef(ref, wrapperRef),
		...ctx.getStyles("dropdown", {
			className,
			style,
			styles,
			classNames,
			withStaticClass: false
		}),
		tabIndex: -1,
		"data-menu-dropdown": true,
		children
	});
});
MenuSubDropdown.classes = Menu_module_default;
MenuSubDropdown.displayName = "@mantine/core/MenuSubDropdown";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuSubItem/MenuSubItem.mjs
var MenuSubItem = polymorphicFactory((props) => {
	const { classNames, className, style, styles, vars, color, leftSection, rightSection, children, disabled, "data-disabled": dataDisabled, closeMenuOnClick, ref, ...others } = useProps("MenuSubItem", null, props);
	const ctx = useMenuContext();
	const subCtx = (0, import_react.use)(SubMenuContext);
	const theme = useMantineTheme();
	const { dir } = useDirection();
	const itemRef = (0, import_react.useRef)(null);
	const _others = others;
	const colors = color ? theme.variantColorResolver({
		color,
		theme,
		variant: "light"
	}) : void 0;
	const parsedThemeColor = color ? parseThemeColor({
		color,
		theme
	}) : null;
	const handleKeydown = createEventHandler(_others.onKeyDown, (event) => {
		if (event.key === "ArrowRight") {
			subCtx?.open();
			subCtx?.focusFirstItem();
		}
		if (event.key === "ArrowLeft" && subCtx?.parentContext) {
			subCtx.parentContext.close();
			subCtx.parentContext.focusParentItem();
		}
	});
	const handleClick = createEventHandler(_others.onClick, () => {
		if (!dataDisabled && closeMenuOnClick) ctx.closeDropdownImmediately();
	});
	const handleMouseEnter = createEventHandler(_others.onMouseEnter, subCtx?.open);
	const handleMouseLeave = createEventHandler(_others.onMouseLeave, subCtx?.close);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		onMouseDown: (event) => event.preventDefault(),
		...others,
		unstyled: ctx.unstyled,
		tabIndex: ctx.menuItemTabIndex,
		...ctx.getStyles("item", {
			className,
			style,
			styles,
			classNames
		}),
		ref: useMergedRef(itemRef, ref),
		role: "menuitem",
		disabled,
		"data-menu-item": true,
		"data-sub-menu-item": true,
		"data-disabled": disabled || dataDisabled || void 0,
		"data-mantine-stop-propagation": true,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		onClick: handleClick,
		onKeyDown: createScopedKeydownHandler({
			siblingSelector: "[data-menu-item]:not([data-disabled])",
			parentSelector: "[data-menu-dropdown]",
			activateOnFocus: false,
			loop: ctx.loop,
			dir,
			orientation: "vertical",
			onKeyDown: handleKeydown
		}),
		__vars: {
			"--menu-item-color": parsedThemeColor?.isThemeColor && parsedThemeColor?.shade === void 0 ? `var(--mantine-color-${parsedThemeColor.color}-6)` : colors?.color,
			"--menu-item-hover": colors?.hover
		},
		children: [
			leftSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...ctx.getStyles("itemSection", {
					styles,
					classNames
				}),
				"data-position": "left",
				children: leftSection
			}),
			children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...ctx.getStyles("itemLabel", {
					styles,
					classNames
				}),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...ctx.getStyles("itemSection", {
					styles,
					classNames
				}),
				"data-position": "right",
				children: rightSection || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionChevron, {
					...ctx.getStyles("chevron"),
					size: 14
				})
			})
		]
	});
});
MenuSubItem.classes = Menu_module_default;
MenuSubItem.displayName = "@mantine/core/MenuSubItem";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuSubTarget/MenuSubTarget.mjs
function MenuSubTarget({ children, refProp }) {
	if (!isElement(children)) throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");
	useMenuContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Target, {
		refProp,
		popupType: "menu",
		children
	});
}
MenuSubTarget.displayName = "@mantine/core/MenuSubTarget";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuSub/MenuSub.mjs
var defaultProps$2 = {
	offset: 0,
	position: "right-start",
	transitionProps: { duration: 0 },
	openDelay: 0,
	middlewares: { shift: { crossAxis: true } }
};
function MenuSub(_props) {
	const { children, closeDelay, openDelay, ...others } = useProps("MenuSub", defaultProps$2, _props);
	const id = useId$1();
	const [opened, { open, close }] = useDisclosure(false);
	const ctx = (0, import_react.use)(SubMenuContext);
	const { openDropdown, closeDropdown } = useDelayedHover({
		open,
		close,
		closeDelay,
		openDelay
	});
	const focusFirstItem = () => window.setTimeout(() => {
		document.getElementById(`${id}-dropdown`)?.querySelectorAll("[data-menu-item]:not([data-disabled])")[0]?.focus();
	}, 16);
	const focusParentItem = () => window.setTimeout(() => {
		document.getElementById(`${id}-target`)?.focus();
	}, 16);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubMenuContext, {
		value: {
			opened,
			close: closeDropdown,
			open: openDropdown,
			focusFirstItem,
			focusParentItem,
			parentContext: ctx
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover, {
			opened,
			withinPortal: false,
			withArrow: false,
			id,
			...others,
			children
		})
	});
}
MenuSub.extend = (input) => input;
MenuSub.displayName = "@mantine/core/MenuSub";
MenuSub.Target = MenuSubTarget;
MenuSub.Dropdown = MenuSubDropdown;
MenuSub.Item = MenuSubItem;
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/MenuTarget/MenuTarget.mjs
var defaultProps$1 = { refProp: "ref" };
function MenuTarget(props) {
	const { children, refProp, ...others } = useProps("MenuTarget", defaultProps$1, props);
	const child = getSingleElementChild(children);
	if (!child) throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");
	const ctx = useMenuContext();
	const _childProps = child.props;
	const onClick = createEventHandler(_childProps.onClick, () => {
		if (ctx.trigger === "click") ctx.toggleDropdown();
		else if (ctx.trigger === "click-hover") {
			ctx.setOpenedViaClick(true);
			if (!ctx.opened) ctx.openDropdown();
		}
	});
	const onMouseEnter = createEventHandler(_childProps.onMouseEnter, () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown());
	const onMouseLeave = createEventHandler(_childProps.onMouseLeave, () => {
		if (ctx.trigger === "hover") ctx.closeDropdown();
		else if (ctx.trigger === "click-hover" && !ctx.openedViaClick) ctx.closeDropdown();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Target, {
		refProp,
		popupType: "menu",
		...others,
		children: (0, import_react.cloneElement)(child, {
			onClick,
			onMouseEnter,
			onMouseLeave,
			"data-expanded": ctx.opened ? true : void 0
		})
	});
}
MenuTarget.displayName = "@mantine/core/MenuTarget";
//#endregion
//#region node_modules/@mantine/core/esm/components/Menu/Menu.mjs
var defaultProps = {
	trapFocus: true,
	closeOnItemClick: true,
	withInitialFocusPlaceholder: true,
	clickOutsideEvents: [
		"mousedown",
		"touchstart",
		"keydown"
	],
	loop: true,
	trigger: "click",
	openDelay: 0,
	closeDelay: 100,
	menuItemTabIndex: -1
};
var Menu = factory((_props) => {
	const props = useProps("Menu", defaultProps, _props);
	const { children, onOpen, onClose, opened, defaultOpened, trapFocus, onChange, closeOnItemClick, loop, closeOnEscape, trigger, openDelay, closeDelay, classNames, styles, unstyled, variant, vars, menuItemTabIndex, keepMounted, withInitialFocusPlaceholder, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Menu",
		classes: Menu_module_default,
		props,
		classNames,
		styles,
		unstyled,
		attributes
	});
	const [_opened, setOpened] = useUncontrolled({
		value: opened,
		defaultValue: defaultOpened,
		finalValue: false,
		onChange
	});
	const [openedViaClick, setOpenedViaClick] = (0, import_react.useState)(false);
	const close = () => {
		setOpened(false);
		setOpenedViaClick(false);
		_opened && onClose?.();
	};
	const open = () => {
		setOpened(true);
		!_opened && onOpen?.();
	};
	const toggleDropdown = () => {
		_opened ? close() : open();
	};
	const { openDropdown, closeDropdown } = useDelayedHover({
		open,
		close,
		closeDelay,
		openDelay
	});
	const getItemIndex = (node) => getContextItemIndex("[data-menu-item]", "[data-menu-dropdown]", node);
	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
		classNames,
		styles,
		props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContextProvider, {
		value: {
			getStyles,
			opened: _opened,
			toggleDropdown,
			getItemIndex,
			openedViaClick,
			setOpenedViaClick,
			closeOnItemClick,
			closeDropdown: trigger === "click" ? close : closeDropdown,
			openDropdown: trigger === "click" ? open : openDropdown,
			closeDropdownImmediately: close,
			loop,
			trigger,
			unstyled,
			menuItemTabIndex,
			withInitialFocusPlaceholder
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover, {
			returnFocus: true,
			...others,
			opened: _opened,
			onChange: toggleDropdown,
			defaultOpened,
			trapFocus: keepMounted ? false : trapFocus,
			closeOnEscape,
			__staticSelector: "Menu",
			classNames: resolvedClassNames,
			styles: resolvedStyles,
			unstyled,
			variant,
			keepMounted,
			children
		})
	});
});
Menu.displayName = "@mantine/core/Menu";
Menu.classes = Menu_module_default;
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;
Menu.Target = MenuTarget;
Menu.Divider = MenuDivider;
Menu.Sub = MenuSub;
//#endregion
//#region src/components/confirm-dialog.tsx
function ConfirmDialog(props) {
	const { title, desc, description, children, className, confirmText, cancelBtnText, destructive, isLoading, disabled = false, handleConfirm, onConfirm, onOpenChange, ...actions } = props;
	const dialogDescription = desc ?? description;
	const confirmHandler = onConfirm ?? handleConfirm;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		opened: props.open,
		onClose: () => handleConfirm && handleConfirm(),
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			fw: 700,
			size: "lg",
			children: title
		}),
		centered: true,
		...actions,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					children: dialogDescription
				}),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "flex-end",
					mt: "lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						onClick: () => onOpenChange && onOpenChange(false),
						children: cancelBtnText ?? "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						color: destructive ? "red" : "blue",
						onClick: confirmHandler,
						disabled: disabled || isLoading,
						loading: isLoading,
						children: confirmText ?? "Continue"
					})]
				})
			]
		})
	});
}
//#endregion
export { Menu as n, ConfirmDialog as t };
