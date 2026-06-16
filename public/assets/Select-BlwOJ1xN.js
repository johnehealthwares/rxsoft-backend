import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { E as getThemeColor, L as getSize, M as createVarsResolver, N as getFontSize, V as rem, d as useStyles, f as useProps, i as genericFactory, j as clsx, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as getSingleElementChild, r as isElement } from "./OptionalPortal-COfBOdxY.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as Popover } from "./Popover-Cd9aInuj.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { r as getRefProp } from "./get-floating-position-DV1ZVGN3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useResolvedStylesApi } from "./use-resolved-styles-api-DyPXwNb0.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as InputBase } from "./InputBase-BW3lt9NS.js";
import { t as CheckIcon } from "./CheckIcon-DoyF_8Cf.js";
//#region node_modules/@mantine/hooks/esm/use-previous/use-previous.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function usePrevious(value) {
	const ref = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/find-element-in-shadow-dom/find-element-in-shadow-dom.mjs
function findElementBySelector(selector, root = document) {
	const element = root.querySelector(selector);
	if (element) return element;
	const allElements = root.querySelectorAll("*");
	for (let i = 0; i < allElements.length; i += 1) {
		const el = allElements[i];
		if (el.shadowRoot) {
			const shadowElement = findElementBySelector(selector, el.shadowRoot);
			if (shadowElement) return shadowElement;
		}
	}
	return null;
}
function findElementsBySelector(selector, root = document) {
	const results = [];
	const elements = root.querySelectorAll(selector);
	results.push(...Array.from(elements));
	const allElements = root.querySelectorAll("*");
	for (let i = 0; i < allElements.length; i += 1) {
		const el = allElements[i];
		if (el.shadowRoot) {
			const shadowElements = findElementsBySelector(selector, el.shadowRoot);
			results.push(...shadowElements);
		}
	}
	return results;
}
/**
* Gets the appropriate root element (Document or ShadowRoot) for DOM queries
* based on the provided target element reference.
*/
function getRootElement(targetElement) {
	if (!targetElement) return document;
	const root = targetElement.getRootNode();
	return root instanceof ShadowRoot || root instanceof Document ? root : document;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/get-parsed-combobox-data/get-parsed-combobox-data.mjs
function parseItem(item) {
	if (typeof item === "string") return {
		value: item,
		label: item
	};
	if (typeof item === "object" && "value" in item && !("label" in item)) return {
		value: item.value,
		label: `${item.value}`,
		disabled: item.disabled
	};
	if (typeof item === "object" && "group" in item) return {
		group: item.group,
		items: item.items.map((i) => parseItem(i))
	};
	if (typeof item === "number" || typeof item === "bigint" || typeof item === "boolean") return {
		value: item,
		label: `${item}`
	};
	return item;
}
function getParsedComboboxData(data) {
	if (!data) return [];
	return data.map((item) => parseItem(item));
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/get-options-lockup/get-options-lockup.mjs
function getOptionsLockup(options) {
	return options.reduce((acc, item) => {
		if ("group" in item) return {
			...acc,
			...getOptionsLockup(item.items)
		};
		acc[`${item.value}`] = item;
		return acc;
	}, {});
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/Combobox.module.mjs
var Combobox_module_default = {
	"dropdown": "m_88b62a41",
	"search": "m_985517d8",
	"options": "m_b2821a6e",
	"option": "m_92253aa5",
	"empty": "m_2530cd1d",
	"header": "m_858f94bd",
	"footer": "m_82b967cb",
	"group": "m_254f3e4f",
	"groupLabel": "m_2bb2e9e5",
	"chevron": "m_2943220b",
	"optionsDropdownOption": "m_390b5f4",
	"optionsDropdownCheckIcon": "m_8ee53fc2",
	"optionsDropdownCheckPlaceholder": "m_a530ee0a"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxChevron/ComboboxChevron.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps$6 = { error: null };
var varsResolver$1 = createVarsResolver((theme, { size, color }) => ({ chevron: {
	"--combobox-chevron-size": getSize(size, "combobox-chevron-size"),
	"--combobox-chevron-color": color ? getThemeColor(color, theme) : void 0
} }));
var ComboboxChevron = factory((_props) => {
	const props = useProps("ComboboxChevron", defaultProps$6, _props);
	const { size, error, style, className, classNames, styles, unstyled, vars, attributes, mod, ...others } = props;
	const getStyles = useStyles({
		name: "ComboboxChevron",
		classes: Combobox_module_default,
		props,
		style,
		className,
		classNames,
		styles,
		unstyled,
		vars,
		varsResolver: varsResolver$1,
		attributes,
		rootSelector: "chevron"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "svg",
		...others,
		...getStyles("chevron"),
		size,
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		mod: [
			"combobox-chevron",
			{ error },
			mod
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
			fill: "currentColor",
			fillRule: "evenodd",
			clipRule: "evenodd"
		})
	});
});
ComboboxChevron.classes = Combobox_module_default;
ComboboxChevron.varsResolver = varsResolver$1;
ComboboxChevron.displayName = "@mantine/core/ComboboxChevron";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/Combobox.context.mjs
var [ComboboxProvider, useComboboxContext] = createSafeContext("Combobox component was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxClearButton/ComboboxClearButton.mjs
function ComboboxClearButton({ onMouseDown, onClick, onClear, ...others }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.ClearButton, {
		tabIndex: -1,
		"aria-hidden": true,
		...others,
		onMouseDown: (event) => {
			event.preventDefault();
			onMouseDown?.(event);
		},
		onClick: (event) => {
			onClear();
			onClick?.(event);
		}
	});
}
ComboboxClearButton.displayName = "@mantine/core/ComboboxClearButton";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxDropdown/ComboboxDropdown.mjs
var ComboboxDropdown = factory((props) => {
	const { classNames, styles, className, style, hidden, ...others } = useProps("ComboboxDropdown", null, props);
	const ctx = useComboboxContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Dropdown, {
		...others,
		role: "presentation",
		"data-hidden": hidden || void 0,
		...ctx.getStyles("dropdown", {
			className,
			style,
			classNames,
			styles
		})
	});
});
ComboboxDropdown.classes = Combobox_module_default;
ComboboxDropdown.displayName = "@mantine/core/ComboboxDropdown";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxDropdownTarget/ComboboxDropdownTarget.mjs
var defaultProps$5 = { refProp: "ref" };
var ComboboxDropdownTarget = factory((props) => {
	const { children, refProp, ref } = useProps("ComboboxDropdownTarget", defaultProps$5, props);
	useComboboxContext();
	if (!isElement(children)) throw new Error("Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Target, {
		ref,
		refProp,
		children
	});
});
ComboboxDropdownTarget.displayName = "@mantine/core/ComboboxDropdownTarget";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxEmpty/ComboboxEmpty.mjs
var ComboboxEmpty = factory((props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ComboboxEmpty", null, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useComboboxContext().getStyles("empty", {
			className,
			classNames,
			styles,
			style
		}),
		...others
	});
});
ComboboxEmpty.classes = Combobox_module_default;
ComboboxEmpty.displayName = "@mantine/core/ComboboxEmpty";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/use-combobox-target-props/use-combobox-target-props.mjs
function useComboboxTargetProps({ onKeyDown, onClick, withKeyboardNavigation, withAriaAttributes, withExpandedAttribute, targetType, autoComplete }) {
	const ctx = useComboboxContext();
	const [selectedOptionId, setSelectedOptionId] = (0, import_react.useState)(null);
	const handleKeyDown = (event) => {
		onKeyDown?.(event);
		if (ctx.readOnly) return;
		if (withKeyboardNavigation) {
			if (event.nativeEvent.isComposing) return;
			if (event.nativeEvent.code === "ArrowDown") {
				event.preventDefault();
				if (!ctx.store.dropdownOpened) {
					ctx.store.openDropdown("keyboard");
					setSelectedOptionId(ctx.store.selectActiveOption());
					ctx.store.updateSelectedOptionIndex("selected", { scrollIntoView: true });
				} else setSelectedOptionId(ctx.store.selectNextOption());
			}
			if (event.nativeEvent.code === "ArrowUp") {
				event.preventDefault();
				if (!ctx.store.dropdownOpened) {
					ctx.store.openDropdown("keyboard");
					setSelectedOptionId(ctx.store.selectActiveOption());
					ctx.store.updateSelectedOptionIndex("selected", { scrollIntoView: true });
				} else setSelectedOptionId(ctx.store.selectPreviousOption());
			}
			if (event.nativeEvent.code === "Enter" || event.nativeEvent.code === "NumpadEnter") {
				if (event.nativeEvent.keyCode === 229) return;
				const selectedOptionIndex = ctx.store.getSelectedOptionIndex();
				if (ctx.store.dropdownOpened && selectedOptionIndex !== -1) {
					event.preventDefault();
					ctx.store.clickSelectedOption();
				} else if (targetType === "button") {
					event.preventDefault();
					ctx.store.openDropdown("keyboard");
				}
			}
			if (event.key === "Escape") ctx.store.closeDropdown("keyboard");
			if (event.nativeEvent.code === "Space") {
				if (targetType === "button") {
					event.preventDefault();
					ctx.store.toggleDropdown("keyboard");
				}
			}
		}
	};
	const ariaAttributes = withAriaAttributes ? {
		...withExpandedAttribute ? { role: "combobox" } : {},
		"aria-haspopup": "listbox",
		"aria-expanded": withExpandedAttribute ? !!(ctx.store.listId && ctx.store.dropdownOpened) : void 0,
		"aria-controls": ctx.store.dropdownOpened && ctx.store.listId ? ctx.store.listId : void 0,
		"aria-activedescendant": ctx.store.dropdownOpened ? selectedOptionId || void 0 : void 0,
		autoComplete,
		"data-expanded": ctx.store.dropdownOpened || void 0,
		"data-mantine-stop-propagation": ctx.store.dropdownOpened || void 0
	} : {};
	const handleClick = (event) => {
		if (targetType === "button") event.currentTarget.focus();
		onClick?.(event);
	};
	return {
		...ariaAttributes,
		onKeyDown: handleKeyDown,
		onClick: handleClick
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxEventsTarget/ComboboxEventsTarget.mjs
var defaultProps$4 = {
	refProp: "ref",
	targetType: "input",
	withKeyboardNavigation: true,
	withAriaAttributes: true,
	withExpandedAttribute: false,
	autoComplete: "off"
};
var ComboboxEventsTarget = factory((props) => {
	const { children, refProp, withKeyboardNavigation, withAriaAttributes, withExpandedAttribute, targetType, autoComplete, ref, ...others } = useProps("ComboboxEventsTarget", defaultProps$4, props);
	const child = getSingleElementChild(children);
	if (!child) throw new Error("Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");
	const ctx = useComboboxContext();
	return (0, import_react.cloneElement)(child, {
		...useComboboxTargetProps({
			targetType,
			withAriaAttributes,
			withKeyboardNavigation,
			withExpandedAttribute,
			onKeyDown: child.props.onKeyDown,
			onClick: child.props.onClick,
			autoComplete
		}),
		...others,
		[refProp]: useMergedRef(ref, ctx.store.targetRef, getRefProp(child))
	});
});
ComboboxEventsTarget.displayName = "@mantine/core/ComboboxEventsTarget";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxFooter/ComboboxFooter.mjs
var ComboboxFooter = factory((props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ComboboxFooter", null, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useComboboxContext().getStyles("footer", {
			className,
			classNames,
			style,
			styles
		}),
		...others,
		onMouseDown: (event) => {
			event.preventDefault();
		}
	});
});
ComboboxFooter.classes = Combobox_module_default;
ComboboxFooter.displayName = "@mantine/core/ComboboxFooter";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxGroup/ComboboxGroup.mjs
var ComboboxGroup = factory((props) => {
	const { classNames, className, style, styles, vars, children, label, id, ...others } = useProps("ComboboxGroup", null, props);
	const ctx = useComboboxContext();
	const _id = useId$1(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		role: "group",
		"aria-labelledby": label ? _id : void 0,
		...ctx.getStyles("group", {
			className,
			classNames,
			style,
			styles
		}),
		...others,
		children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: _id,
			...ctx.getStyles("groupLabel", {
				classNames,
				styles
			}),
			children: label
		}), children]
	});
});
ComboboxGroup.classes = Combobox_module_default;
ComboboxGroup.displayName = "@mantine/core/ComboboxGroup";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxHeader/ComboboxHeader.mjs
var ComboboxHeader = factory((props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ComboboxHeader", null, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useComboboxContext().getStyles("header", {
			className,
			classNames,
			style,
			styles
		}),
		...others,
		onMouseDown: (event) => {
			event.preventDefault();
		}
	});
});
ComboboxHeader.classes = Combobox_module_default;
ComboboxHeader.displayName = "@mantine/core/ComboboxHeader";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxHiddenInput/ComboboxHiddenInput.mjs
function ComboboxHiddenInput({ value, valuesDivider = ",", ...others }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "hidden",
		value: Array.isArray(value) ? value.join(valuesDivider) : value ? `${value}` : "",
		...others
	});
}
ComboboxHiddenInput.displayName = "@mantine/core/ComboboxHiddenInput";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxOption/ComboboxOption.mjs
var ComboboxOption = factory((_props) => {
	const props = useProps("ComboboxOption", null, _props);
	const { classNames, className, style, styles, vars, onClick, id, active, onMouseDown, onMouseOver, disabled, selected, mod, ...others } = props;
	const ctx = useComboboxContext();
	const uuid = (0, import_react.useId)();
	const _id = id || uuid;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...ctx.getStyles("option", {
			className,
			classNames,
			styles,
			style
		}),
		...others,
		id: _id,
		mod: [
			"combobox-option",
			{
				"combobox-active": active,
				"combobox-disabled": disabled,
				"combobox-selected": selected
			},
			mod
		],
		role: "option",
		onClick: (event) => {
			if (!disabled) {
				ctx.onOptionSubmit?.(props.value, props);
				onClick?.(event);
			} else event.preventDefault();
		},
		onMouseDown: (event) => {
			event.preventDefault();
			onMouseDown?.(event);
		},
		onMouseOver: (event) => {
			if (ctx.resetSelectionOnOptionHover) ctx.store.resetSelectedOption();
			onMouseOver?.(event);
		}
	});
});
ComboboxOption.classes = Combobox_module_default;
ComboboxOption.displayName = "@mantine/core/ComboboxOption";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxOptions/ComboboxOptions.mjs
var ComboboxOptions = factory((_props) => {
	const { classNames, className, style, styles, id, onMouseDown, labelledBy, ...others } = useProps("ComboboxOptions", null, _props);
	const ctx = useComboboxContext();
	const _id = useId$1(id);
	(0, import_react.useEffect)(() => {
		ctx.store.setListId(_id);
	}, [_id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...ctx.getStyles("options", {
			className,
			style,
			classNames,
			styles
		}),
		...others,
		id: _id,
		role: "listbox",
		"aria-labelledby": labelledBy,
		onMouseDown: (event) => {
			event.preventDefault();
			onMouseDown?.(event);
		}
	});
});
ComboboxOptions.classes = Combobox_module_default;
ComboboxOptions.displayName = "@mantine/core/ComboboxOptions";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxSearch/ComboboxSearch.mjs
var defaultProps$3 = {
	withAriaAttributes: true,
	withKeyboardNavigation: true
};
var ComboboxSearch = factory((_props) => {
	const { classNames, styles, unstyled, vars, withAriaAttributes, onKeyDown, onClick, withKeyboardNavigation, size, ref, ...others } = useProps("ComboboxSearch", defaultProps$3, _props);
	const ctx = useComboboxContext();
	const _styles = ctx.getStyles("search");
	const targetProps = useComboboxTargetProps({
		targetType: "input",
		withAriaAttributes,
		withKeyboardNavigation,
		withExpandedAttribute: false,
		onKeyDown,
		onClick,
		autoComplete: "off"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		ref: useMergedRef(ref, ctx.store.searchRef),
		classNames: [{ input: _styles.className }, classNames],
		styles: [{ input: _styles.style }, styles],
		size: size || ctx.size,
		...targetProps,
		...others,
		__staticSelector: "Combobox"
	});
});
ComboboxSearch.classes = Combobox_module_default;
ComboboxSearch.displayName = "@mantine/core/ComboboxSearch";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/ComboboxTarget/ComboboxTarget.mjs
var defaultProps$2 = {
	refProp: "ref",
	targetType: "input",
	withKeyboardNavigation: true,
	withAriaAttributes: true,
	withExpandedAttribute: false,
	autoComplete: "off"
};
var ComboboxTarget = factory((props) => {
	const { children, refProp, withKeyboardNavigation, withAriaAttributes, withExpandedAttribute, targetType, autoComplete, ref, ...others } = useProps("ComboboxTarget", defaultProps$2, props);
	const child = getSingleElementChild(children);
	if (!child) throw new Error("Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");
	const ctx = useComboboxContext();
	const clonedElement = (0, import_react.cloneElement)(child, {
		...useComboboxTargetProps({
			targetType,
			withAriaAttributes,
			withKeyboardNavigation,
			withExpandedAttribute,
			onKeyDown: child.props.onKeyDown,
			onClick: child.props.onClick,
			autoComplete
		}),
		...others
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Target, {
		refProp,
		ref: useMergedRef(ref, ctx.store.targetRef),
		children: clonedElement
	});
});
ComboboxTarget.displayName = "@mantine/core/ComboboxTarget";
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/use-combobox/get-index/get-index.mjs
function getPreviousIndex(currentIndex, elements, loop) {
	for (let i = currentIndex - 1; i >= 0; i -= 1) if (!elements[i].hasAttribute("data-combobox-disabled")) return i;
	if (loop) {
		for (let i = elements.length - 1; i > -1; i -= 1) if (!elements[i].hasAttribute("data-combobox-disabled")) return i;
	}
	return currentIndex;
}
function getNextIndex(currentIndex, elements, loop) {
	for (let i = currentIndex + 1; i < elements.length; i += 1) if (!elements[i].hasAttribute("data-combobox-disabled")) return i;
	if (loop) {
		for (let i = 0; i < elements.length; i += 1) if (!elements[i].hasAttribute("data-combobox-disabled")) return i;
	}
	return currentIndex;
}
function getFirstIndex(elements) {
	for (let i = 0; i < elements.length; i += 1) if (!elements[i].hasAttribute("data-combobox-disabled")) return i;
	return -1;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/use-combobox/use-combobox.mjs
function useCombobox({ defaultOpened, opened, onOpenedChange, onDropdownClose, onDropdownOpen, loop = true, scrollBehavior = "instant" } = {}) {
	const [dropdownOpened, setDropdownOpened] = useUncontrolled({
		value: opened,
		defaultValue: defaultOpened,
		finalValue: false,
		onChange: onOpenedChange
	});
	const listId = (0, import_react.useRef)(null);
	const selectedOptionIndex = (0, import_react.useRef)(-1);
	const searchRef = (0, import_react.useRef)(null);
	const targetRef = (0, import_react.useRef)(null);
	const focusSearchTimeout = (0, import_react.useRef)(-1);
	const focusTargetTimeout = (0, import_react.useRef)(-1);
	const selectedIndexUpdateTimeout = (0, import_react.useRef)(-1);
	const openDropdown = (0, import_react.useCallback)((eventSource = "unknown") => {
		if (!dropdownOpened) {
			setDropdownOpened(true);
			onDropdownOpen?.(eventSource);
		}
	}, [
		setDropdownOpened,
		onDropdownOpen,
		dropdownOpened
	]);
	const closeDropdown = (0, import_react.useCallback)((eventSource = "unknown") => {
		if (dropdownOpened) {
			setDropdownOpened(false);
			onDropdownClose?.(eventSource);
		}
	}, [
		setDropdownOpened,
		onDropdownClose,
		dropdownOpened
	]);
	const toggleDropdown = (0, import_react.useCallback)((eventSource = "unknown") => {
		if (dropdownOpened) closeDropdown(eventSource);
		else openDropdown(eventSource);
	}, [
		closeDropdown,
		openDropdown,
		dropdownOpened
	]);
	const clearSelectedItem = (0, import_react.useCallback)(() => {
		const root = getRootElement(targetRef.current);
		const selected = findElementBySelector(`#${listId.current} [data-combobox-selected]`, root);
		selected?.removeAttribute("data-combobox-selected");
		selected?.removeAttribute("aria-selected");
	}, []);
	const selectOption = (0, import_react.useCallback)((index) => {
		const root = getRootElement(targetRef.current);
		const list = findElementBySelector(`#${listId.current}`, root);
		const items = list ? findElementsBySelector("[data-combobox-option]", list) : null;
		if (!items) return null;
		const nextIndex = index >= items.length ? 0 : index < 0 ? items.length - 1 : index;
		selectedOptionIndex.current = nextIndex;
		if (items?.[nextIndex] && !items[nextIndex].hasAttribute("data-combobox-disabled")) {
			clearSelectedItem();
			items[nextIndex].setAttribute("data-combobox-selected", "true");
			items[nextIndex].setAttribute("aria-selected", "true");
			items[nextIndex].scrollIntoView({
				block: "nearest",
				behavior: scrollBehavior
			});
			return items[nextIndex].id;
		}
		return null;
	}, [scrollBehavior, clearSelectedItem]);
	const selectActiveOption = (0, import_react.useCallback)(() => {
		const root = getRootElement(targetRef.current);
		const activeOption = findElementBySelector(`#${listId.current} [data-combobox-active]`, root);
		if (activeOption) return selectOption(findElementsBySelector(`#${listId.current} [data-combobox-option]`, root).findIndex((option) => option === activeOption));
		return selectOption(0);
	}, [selectOption]);
	const selectNextOption = (0, import_react.useCallback)(() => {
		const root = getRootElement(targetRef.current);
		const items = findElementsBySelector(`#${listId.current} [data-combobox-option]`, root);
		return selectOption(getNextIndex(selectedOptionIndex.current, items, loop));
	}, [selectOption, loop]);
	const selectPreviousOption = (0, import_react.useCallback)(() => {
		const root = getRootElement(targetRef.current);
		const items = findElementsBySelector(`#${listId.current} [data-combobox-option]`, root);
		return selectOption(getPreviousIndex(selectedOptionIndex.current, items, loop));
	}, [selectOption, loop]);
	const selectFirstOption = (0, import_react.useCallback)(() => {
		const root = getRootElement(targetRef.current);
		return selectOption(getFirstIndex(findElementsBySelector(`#${listId.current} [data-combobox-option]`, root)));
	}, [selectOption]);
	const updateSelectedOptionIndex = (0, import_react.useCallback)((target = "selected", options) => {
		if (typeof target === "number") {
			selectedOptionIndex.current = target;
			const root = getRootElement(targetRef.current);
			const items = findElementsBySelector(`#${listId.current} [data-combobox-option]`, root);
			if (options?.scrollIntoView) items[target]?.scrollIntoView({
				block: "nearest",
				behavior: scrollBehavior
			});
			return;
		}
		selectedIndexUpdateTimeout.current = window.setTimeout(() => {
			const root = getRootElement(targetRef.current);
			const items = findElementsBySelector(`#${listId.current} [data-combobox-option]`, root);
			const index = items.findIndex((option) => option.hasAttribute(`data-combobox-${target}`));
			selectedOptionIndex.current = index;
			if (options?.scrollIntoView) items[index]?.scrollIntoView({
				block: "nearest",
				behavior: scrollBehavior
			});
		}, 0);
	}, []);
	const resetSelectedOption = (0, import_react.useCallback)(() => {
		selectedOptionIndex.current = -1;
		clearSelectedItem();
	}, [clearSelectedItem]);
	const clickSelectedOption = (0, import_react.useCallback)(() => {
		const root = getRootElement(targetRef.current);
		(findElementsBySelector(`#${listId.current} [data-combobox-option]`, root)?.[selectedOptionIndex.current])?.click();
	}, []);
	const setListId = (0, import_react.useCallback)((id) => {
		listId.current = id;
	}, []);
	const focusSearchInput = (0, import_react.useCallback)(() => {
		focusSearchTimeout.current = window.setTimeout(() => searchRef.current?.focus(), 0);
	}, []);
	const focusTarget = (0, import_react.useCallback)(() => {
		focusTargetTimeout.current = window.setTimeout(() => targetRef.current?.focus(), 0);
	}, []);
	const getSelectedOptionIndex = (0, import_react.useCallback)(() => selectedOptionIndex.current, []);
	(0, import_react.useEffect)(() => () => {
		window.clearTimeout(focusSearchTimeout.current);
		window.clearTimeout(focusTargetTimeout.current);
		window.clearTimeout(selectedIndexUpdateTimeout.current);
	}, []);
	return {
		dropdownOpened,
		openDropdown,
		closeDropdown,
		toggleDropdown,
		selectedOptionIndex: selectedOptionIndex.current,
		getSelectedOptionIndex,
		selectOption,
		selectFirstOption,
		selectActiveOption,
		selectNextOption,
		selectPreviousOption,
		resetSelectedOption,
		updateSelectedOptionIndex,
		listId: listId.current,
		setListId,
		clickSelectedOption,
		searchRef,
		focusSearchInput,
		targetRef,
		focusTarget
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/Combobox.mjs
var defaultProps$1 = {
	keepMounted: true,
	withinPortal: true,
	resetSelectionOnOptionHover: false,
	width: "target",
	transitionProps: {
		transition: "fade",
		duration: 0
	},
	size: "sm"
};
var varsResolver = createVarsResolver((_, { size, dropdownPadding }) => ({
	options: {
		"--combobox-option-fz": getFontSize(size),
		"--combobox-option-padding": getSize(size, "combobox-option-padding")
	},
	dropdown: {
		"--combobox-padding": dropdownPadding === void 0 ? void 0 : rem(dropdownPadding),
		"--combobox-option-fz": getFontSize(size),
		"--combobox-option-padding": getSize(size, "combobox-option-padding")
	}
}));
var Combobox = (_props) => {
	const props = useProps("Combobox", defaultProps$1, _props);
	const { classNames, styles, unstyled, children, store: controlledStore, vars, onOptionSubmit, onClose, size, dropdownPadding, resetSelectionOnOptionHover, __staticSelector, readOnly, attributes, ...others } = props;
	const uncontrolledStore = useCombobox();
	const store = controlledStore || uncontrolledStore;
	const getStyles = useStyles({
		name: __staticSelector || "Combobox",
		classes: Combobox_module_default,
		props,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	const onDropdownClose = () => {
		onClose?.();
		store.closeDropdown();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxProvider, {
		value: {
			getStyles,
			store,
			onOptionSubmit,
			size,
			resetSelectionOnOptionHover,
			readOnly
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover, {
			opened: store.dropdownOpened,
			preventPositionChangeWhenVisible: false,
			...others,
			onChange: (_opened) => !_opened && onDropdownClose(),
			withRoles: false,
			unstyled,
			children
		})
	});
};
var extendCombobox = (c) => c;
Combobox.extend = extendCombobox;
Combobox.classes = Combobox_module_default;
Combobox.varsResolver = varsResolver;
Combobox.displayName = "@mantine/core/Combobox";
Combobox.Target = ComboboxTarget;
Combobox.Dropdown = ComboboxDropdown;
Combobox.Options = ComboboxOptions;
Combobox.Option = ComboboxOption;
Combobox.Search = ComboboxSearch;
Combobox.Empty = ComboboxEmpty;
Combobox.Chevron = ComboboxChevron;
Combobox.Footer = ComboboxFooter;
Combobox.Header = ComboboxHeader;
Combobox.EventsTarget = ComboboxEventsTarget;
Combobox.DropdownTarget = ComboboxDropdownTarget;
Combobox.Group = ComboboxGroup;
Combobox.ClearButton = ComboboxClearButton;
Combobox.HiddenInput = ComboboxHiddenInput;
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/is-options-group.mjs
function isOptionsGroup(item) {
	return "group" in item;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/default-options-filter.mjs
function defaultOptionsFilter({ options, search, limit }) {
	const parsedSearch = search.trim().toLowerCase();
	const result = [];
	for (let i = 0; i < options.length; i += 1) {
		const item = options[i];
		if (result.length === limit) return result;
		if (isOptionsGroup(item)) result.push({
			group: item.group,
			items: defaultOptionsFilter({
				options: item.items,
				search,
				limit: limit - result.length
			})
		});
		if (!isOptionsGroup(item)) {
			if (item.label.toLowerCase().includes(parsedSearch)) result.push(item);
		}
	}
	return result;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/is-empty-combobox-data.mjs
function isEmptyComboboxData(data) {
	if (data.length === 0) return true;
	for (const item of data) {
		if (!("group" in item)) return false;
		if (item.items.length > 0) return false;
	}
	return true;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/validate-options.mjs
function validateOptions(options, valuesSet = /* @__PURE__ */ new Set()) {
	if (!Array.isArray(options)) return;
	for (const option of options) if (isOptionsGroup(option)) validateOptions(option.items, valuesSet);
	else {
		if (typeof option.value === "undefined") throw new Error("[@mantine/core] Each option must have value property");
		if (valuesSet.has(option.value)) throw new Error(`[@mantine/core] Duplicate options are not supported. Option with value "${option.value}" was provided more than once`);
		valuesSet.add(option.value);
	}
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/OptionsDropdown.mjs
function isValueChecked(value, optionValue) {
	return Array.isArray(value) ? value.includes(optionValue) : value === optionValue;
}
function Option({ data, withCheckIcon, withAlignedLabels, value, checkIconPosition, unstyled, renderOption }) {
	if (!isOptionsGroup(data)) {
		const checked = isValueChecked(value, data.value);
		const check = withCheckIcon && (checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: Combobox_module_default.optionsDropdownCheckIcon }) : withAlignedLabels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: Combobox_module_default.optionsDropdownCheckPlaceholder }) : null);
		const defaultContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			checkIconPosition === "left" && check,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.label }),
			checkIconPosition === "right" && check
		] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Option, {
			value: data.value,
			disabled: data.disabled,
			className: clsx({ [Combobox_module_default.optionsDropdownOption]: !unstyled }),
			"data-reverse": checkIconPosition === "right" || void 0,
			"data-checked": checked || void 0,
			"aria-selected": checked,
			active: checked,
			children: typeof renderOption === "function" ? renderOption({
				option: data,
				checked
			}) : defaultContent
		});
	}
	const options = data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
		data: item,
		value,
		unstyled,
		withCheckIcon,
		withAlignedLabels,
		checkIconPosition,
		renderOption
	}, `${item.value}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Group, {
		label: data.group,
		children: options
	});
}
function OptionsDropdown({ data, hidden, hiddenWhenEmpty, filter, search, limit, maxDropdownHeight, withScrollArea = true, filterOptions = true, withCheckIcon = false, withAlignedLabels = false, value, checkIconPosition, nothingFoundMessage, unstyled, labelId, renderOption, scrollAreaProps, "aria-label": ariaLabel }) {
	validateOptions(data);
	const filteredData = typeof search === "string" ? (filter || defaultOptionsFilter)({
		options: data,
		search: filterOptions ? search : "",
		limit: limit ?? Infinity
	}) : data;
	const isEmpty = isEmptyComboboxData(filteredData);
	const options = filteredData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
		data: item,
		withCheckIcon,
		withAlignedLabels,
		value,
		checkIconPosition,
		unstyled,
		renderOption
	}, isOptionsGroup(item) ? item.group : `${item.value}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Dropdown, {
		hidden: hidden || hiddenWhenEmpty && isEmpty,
		"data-composed": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Combobox.Options, {
			labelledBy: labelId,
			"aria-label": ariaLabel,
			children: [withScrollArea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea.Autosize, {
				mah: maxDropdownHeight ?? 220,
				type: "scroll",
				scrollbarSize: "var(--combobox-padding)",
				offsetScrollbars: "y",
				...scrollAreaProps,
				children: options
			}) : options, isEmpty && nothingFoundMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Empty, { children: nothingFoundMessage })]
		})
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Select/Select.mjs
var defaultProps = {
	size: "sm",
	withCheckIcon: true,
	allowDeselect: true,
	checkIconPosition: "left",
	openOnFocus: true
};
var Select = genericFactory((_props) => {
	const props = useProps("Select", defaultProps, _props);
	const { classNames, styles, unstyled, vars, dropdownOpened, defaultDropdownOpened, onDropdownClose, onDropdownOpen, onFocus, onBlur, onClick, onChange, data, value, defaultValue, selectFirstOptionOnChange, selectFirstOptionOnDropdownOpen, onOptionSubmit, comboboxProps, readOnly, disabled, filter, limit, withScrollArea, maxDropdownHeight, size, searchable, rightSection, checkIconPosition, withCheckIcon, withAlignedLabels, nothingFoundMessage, name, form, searchValue, defaultSearchValue, onSearchChange, allowDeselect, error, rightSectionPointerEvents, id, clearable, clearSectionMode, clearButtonProps, hiddenInputProps, renderOption, onClear, autoComplete, scrollAreaProps, __defaultRightSection, __clearSection, __clearable, chevronColor, autoSelectOnBlur, openOnFocus, attributes, ...others } = props;
	const parsedData = (0, import_react.useMemo)(() => getParsedComboboxData(data), [data]);
	const retainedSelectedOptions = (0, import_react.useRef)({});
	const optionsLockup = (0, import_react.useMemo)(() => getOptionsLockup(parsedData), [parsedData]);
	const _id = useId$1(id);
	const [_value, setValue, controlled] = useUncontrolled({
		value,
		defaultValue,
		finalValue: null,
		onChange
	});
	const selectedOption = _value != null ? `${_value}` in optionsLockup ? optionsLockup[`${_value}`] : retainedSelectedOptions.current[`${_value}`] : void 0;
	const previousSelectedOption = usePrevious(selectedOption);
	const [search, setSearch, searchControlled] = useUncontrolled({
		value: searchValue,
		defaultValue: defaultSearchValue,
		finalValue: selectedOption ? selectedOption.label : "",
		onChange: onSearchChange
	});
	const combobox = useCombobox({
		opened: dropdownOpened,
		defaultOpened: defaultDropdownOpened,
		onDropdownOpen: () => {
			onDropdownOpen?.();
			if (selectFirstOptionOnDropdownOpen) combobox.selectFirstOption();
			else combobox.updateSelectedOptionIndex("active", { scrollIntoView: true });
		},
		onDropdownClose: () => {
			onDropdownClose?.();
			setTimeout(combobox.resetSelectedOption, 0);
		}
	});
	const handleSearchChange = (value) => {
		setSearch(value);
		combobox.resetSelectedOption();
	};
	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
		props,
		styles,
		classNames
	});
	(0, import_react.useEffect)(() => {
		if (selectFirstOptionOnChange) combobox.selectFirstOption();
	}, [selectFirstOptionOnChange, search]);
	(0, import_react.useEffect)(() => {
		if (value === null) handleSearchChange("");
		if (value != null && selectedOption && (previousSelectedOption?.value !== selectedOption.value || previousSelectedOption?.label !== selectedOption.label)) handleSearchChange(selectedOption.label);
	}, [value, selectedOption]);
	(0, import_react.useEffect)(() => {
		if (!controlled && !searchControlled) handleSearchChange(_value != null ? `${_value}` in optionsLockup ? optionsLockup[`${_value}`]?.label : retainedSelectedOptions.current[`${_value}`]?.label || "" : "");
	}, [optionsLockup, _value]);
	(0, import_react.useEffect)(() => {
		if (_value) {
			if (`${_value}` in optionsLockup) retainedSelectedOptions.current[`${_value}`] = optionsLockup[`${_value}`];
		}
	}, [optionsLockup, _value]);
	const clearButton = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.ClearButton, {
		...clearButtonProps,
		onClear: () => {
			setValue(null, null);
			handleSearchChange("");
			onClear?.();
		}
	});
	const _clearable = clearable && !!_value && !disabled && !readOnly;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Combobox, {
		store: combobox,
		__staticSelector: "Select",
		classNames: resolvedClassNames,
		styles: resolvedStyles,
		unstyled,
		readOnly,
		size,
		attributes,
		keepMounted: autoSelectOnBlur,
		onOptionSubmit: (val) => {
			onOptionSubmit?.(val);
			const optionLockup = allowDeselect ? `${optionsLockup[val].value}` === `${_value}` ? null : optionsLockup[val] : optionsLockup[val];
			const nextValue = optionLockup ? optionLockup.value : null;
			nextValue !== _value && setValue(nextValue, optionLockup);
			!controlled && handleSearchChange(nextValue != null ? optionLockup?.label || "" : "");
			combobox.closeDropdown();
		},
		...comboboxProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Target, {
			targetType: searchable ? "input" : "button",
			autoComplete,
			withExpandedAttribute: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
				id: _id,
				__defaultRightSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Chevron, {
					size,
					error,
					unstyled,
					color: chevronColor
				}),
				__clearSection: clearButton,
				__clearable: _clearable,
				__clearSectionMode: clearSectionMode,
				rightSection,
				rightSectionPointerEvents: rightSectionPointerEvents || "none",
				...others,
				size,
				__staticSelector: "Select",
				disabled,
				readOnly: readOnly || !searchable,
				value: search,
				onChange: (event) => {
					handleSearchChange(event.currentTarget.value);
					combobox.openDropdown();
					selectFirstOptionOnChange && combobox.selectFirstOption();
				},
				onFocus: (event) => {
					openOnFocus && searchable && combobox.openDropdown();
					onFocus?.(event);
				},
				onBlur: (event) => {
					if (autoSelectOnBlur) combobox.clickSelectedOption();
					searchable && combobox.closeDropdown();
					const optionLockup = _value != null && (`${_value}` in optionsLockup ? optionsLockup[`${_value}`] : retainedSelectedOptions.current[`${_value}`]);
					handleSearchChange(optionLockup ? optionLockup.label || "" : "");
					onBlur?.(event);
				},
				onClick: (event) => {
					searchable ? combobox.openDropdown() : combobox.toggleDropdown();
					onClick?.(event);
				},
				classNames: resolvedClassNames,
				styles: resolvedStyles,
				unstyled,
				pointer: !searchable,
				error,
				attributes
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionsDropdown, {
			data: parsedData,
			hidden: readOnly || disabled,
			filter,
			search,
			limit,
			hiddenWhenEmpty: !nothingFoundMessage,
			withScrollArea,
			maxDropdownHeight,
			filterOptions: !!searchable && selectedOption?.label !== search,
			value: _value,
			checkIconPosition,
			withCheckIcon,
			withAlignedLabels,
			nothingFoundMessage,
			unstyled,
			labelId: others.label ? `${_id}-label` : void 0,
			"aria-label": others.label ? void 0 : others["aria-label"],
			renderOption,
			scrollAreaProps
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.HiddenInput, {
		value: _value,
		name,
		form,
		disabled,
		...hiddenInputProps
	})] });
});
Select.classes = {
	...InputBase.classes,
	...Combobox.classes
};
Select.displayName = "@mantine/core/Select";
//#endregion
export { Combobox as n, useCombobox as r, Select as t };
