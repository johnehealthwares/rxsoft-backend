import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { C as rgba, F as getRadius, M as createVarsResolver, V as rem, d as useStyles, f as useProps, n as polymorphicFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as getSingleElementChild } from "./OptionalPortal-COfBOdxY.js";
import { t as getDefaultZIndex } from "./get-default-z-index-DH-2Ba3K.js";
import { i as useDidUpdate } from "./Transition-Cmaaz8Kh.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/hooks/esm/use-focus-return/use-focus-return.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useFocusReturn({ opened, shouldReturnFocus = true }) {
	const lastActiveElement = (0, import_react.useRef)(null);
	const returnFocus = () => {
		if (lastActiveElement.current && "focus" in lastActiveElement.current && typeof lastActiveElement.current.focus === "function") lastActiveElement.current?.focus({ preventScroll: true });
	};
	useDidUpdate(() => {
		let timeout = -1;
		const clearFocusTimeout = (event) => {
			if (event.key === "Tab") window.clearTimeout(timeout);
		};
		document.addEventListener("keydown", clearFocusTimeout);
		if (opened) lastActiveElement.current = document.activeElement;
		else if (shouldReturnFocus) {
			const activeElementAtClose = document.activeElement;
			timeout = window.setTimeout(() => {
				const currentActiveElement = document.activeElement;
				if (currentActiveElement === null || currentActiveElement === document.body || currentActiveElement === activeElementAtClose) returnFocus();
			}, 10);
		}
		return () => {
			window.clearTimeout(timeout);
			document.removeEventListener("keydown", clearFocusTimeout);
		};
	}, [opened, shouldReturnFocus]);
	return returnFocus;
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-focus-trap/tabbable.mjs
var TABBABLE_NODES = /input|select|textarea|button|object/;
var FOCUS_SELECTOR = "a, input, select, textarea, button, object, [tabindex]";
function hidden(element) {
	return element.style.display === "none";
}
function visible(element) {
	if (element.getAttribute("aria-hidden") || element.getAttribute("hidden") || element.getAttribute("type") === "hidden") return false;
	let parentElement = element;
	while (parentElement) {
		if (parentElement === document.body || parentElement.nodeType === 11) break;
		if (hidden(parentElement)) return false;
		parentElement = parentElement.parentNode;
	}
	return true;
}
function getElementTabIndex(element) {
	let tabIndex = element.getAttribute("tabindex");
	if (tabIndex === null) tabIndex = void 0;
	return parseInt(tabIndex, 10);
}
function focusable(element) {
	const nodeName = element.nodeName.toLowerCase();
	const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
	return (TABBABLE_NODES.test(nodeName) && !element.disabled || (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN)) && visible(element);
}
function tabbable(element) {
	const tabIndex = getElementTabIndex(element);
	return (Number.isNaN(tabIndex) || tabIndex >= 0) && focusable(element);
}
function findTabbableDescendants(element) {
	return Array.from(element.querySelectorAll(FOCUS_SELECTOR)).filter(tabbable);
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-focus-trap/scope-tab.mjs
function scopeTab(node, event) {
	const tabbable = findTabbableDescendants(node);
	if (!tabbable.length) {
		event.preventDefault();
		return;
	}
	const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
	const root = node.getRootNode();
	let leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement;
	const activeElement = root.activeElement;
	if (activeElement.tagName === "INPUT" && activeElement.getAttribute("type") === "radio") leavingFinalTabbable = tabbable.filter((element) => element.getAttribute("type") === "radio" && element.getAttribute("name") === activeElement.getAttribute("name")).includes(finalTabbable);
	if (!leavingFinalTabbable) return;
	event.preventDefault();
	const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
	if (target) target.focus();
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-focus-trap/use-focus-trap.mjs
function useFocusTrap(active = true) {
	const ref = (0, import_react.useRef)(null);
	const focusNode = (node) => {
		let focusElement = node.querySelector("[data-autofocus]");
		if (!focusElement) {
			const children = Array.from(node.querySelectorAll(FOCUS_SELECTOR));
			focusElement = children.find(tabbable) || children.find(focusable) || null;
			if (!focusElement && focusable(node)) focusElement = node;
		}
		if (focusElement) focusElement.focus({ preventScroll: true });
		else console.warn("[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node", node);
	};
	const setRef = (0, import_react.useCallback)((node) => {
		if (!active) return;
		if (node === null) {
			ref.current = null;
			return;
		}
		if (ref.current === node) return;
		setTimeout(() => {
			if (node.getRootNode()) focusNode(node);
			else console.warn("[@mantine/hooks/use-focus-trap] Ref node is not part of the dom", node);
		});
		ref.current = node;
	}, [active]);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		if (ref.current) setTimeout(() => {
			if (ref.current) focusNode(ref.current);
		});
		const handleKeyDown = (event) => {
			if (event.key === "Tab" && ref.current) scopeTab(ref.current, event);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [active]);
	return setRef;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/VisuallyHidden/VisuallyHidden.module.mjs
var import_jsx_runtime = require_jsx_runtime();
var VisuallyHidden_module_default = { "root": "m_515a97f8" };
//#endregion
//#region node_modules/@mantine/core/esm/components/VisuallyHidden/VisuallyHidden.mjs
var VisuallyHidden = factory((_props) => {
	const props = useProps("VisuallyHidden", null, _props);
	const { classNames, className, style, styles, unstyled, vars, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "span",
		...useStyles({
			name: "VisuallyHidden",
			classes: VisuallyHidden_module_default,
			props,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes
		})("root"),
		...others
	});
});
VisuallyHidden.classes = VisuallyHidden_module_default;
VisuallyHidden.displayName = "@mantine/core/VisuallyHidden";
//#endregion
//#region node_modules/@mantine/core/esm/components/Overlay/Overlay.module.mjs
var Overlay_module_default = { "root": "m_9814e45f" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Overlay/Overlay.mjs
var defaultProps = { zIndex: getDefaultZIndex("modal") };
var varsResolver = createVarsResolver((_, { gradient, color, backgroundOpacity, blur, radius, zIndex }) => ({ root: {
	"--overlay-bg": gradient || (color !== void 0 || backgroundOpacity !== void 0) && rgba(color || "#000", backgroundOpacity ?? .6) || void 0,
	"--overlay-filter": blur ? `blur(${rem(blur)})` : void 0,
	"--overlay-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--overlay-z-index": zIndex?.toString()
} }));
var Overlay = polymorphicFactory((_props) => {
	const props = useProps("Overlay", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, fixed, center, children, radius, zIndex, gradient, blur, color, backgroundOpacity, mod, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "Overlay",
			props,
			classes: Overlay_module_default,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes,
			vars,
			varsResolver
		})("root"),
		mod: [{
			center,
			fixed
		}, mod],
		...others,
		children
	});
});
Overlay.classes = Overlay_module_default;
Overlay.varsResolver = varsResolver;
Overlay.displayName = "@mantine/core/Overlay";
//#endregion
//#region node_modules/@mantine/core/esm/components/FocusTrap/FocusTrap.mjs
function FocusTrap({ children, active = true, refProp = "ref", innerRef }) {
	const ref = useMergedRef(useFocusTrap(active), innerRef);
	const child = getSingleElementChild(children);
	if (!child) return children;
	return (0, import_react.cloneElement)(child, { [refProp]: ref });
}
function FocusTrapInitialFocus(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisuallyHidden, {
		tabIndex: -1,
		"data-autofocus": true,
		...props
	});
}
FocusTrap.displayName = "@mantine/core/FocusTrap";
FocusTrapInitialFocus.displayName = "@mantine/core/FocusTrapInitialFocus";
FocusTrap.InitialFocus = FocusTrapInitialFocus;
//#endregion
export { useFocusReturn as i, Overlay as n, VisuallyHidden as r, FocusTrap as t };
