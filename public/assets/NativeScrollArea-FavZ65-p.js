import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { I as getShadow, R as getSpacing, j as clsx, t as Box } from "./Box-7OfPvxF3.js";
import { t as OptionalPortal } from "./OptionalPortal-COfBOdxY.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as getDefaultZIndex } from "./get-default-z-index-DH-2Ba3K.js";
import { r as useReducedMotion, t as Transition } from "./Transition-Cmaaz8Kh.js";
import { i as useFocusReturn, n as Overlay, t as FocusTrap } from "./FocusTrap-BEeCNLEU.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { n as useWindowEvent, t as ReactRemoveScroll } from "./Combination-_d56CT5F.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as CloseButton } from "./CloseButton-DrI2P31g.js";
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBase.context.mjs
var [ModalBaseProvider, useModalBaseContext] = createSafeContext("ModalBase component was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/use-lock-scroll.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useLockScroll({ opened, transitionDuration }) {
	const [shouldLockScroll, setShouldLockScroll] = (0, import_react.useState)(opened);
	const timeout = (0, import_react.useRef)(-1);
	const _transitionDuration = useReducedMotion() ? 0 : transitionDuration;
	(0, import_react.useEffect)(() => {
		if (opened) {
			setShouldLockScroll(true);
			window.clearTimeout(timeout.current);
		} else if (_transitionDuration === 0) setShouldLockScroll(false);
		else timeout.current = window.setTimeout(() => setShouldLockScroll(false), _transitionDuration);
		return () => window.clearTimeout(timeout.current);
	}, [opened, _transitionDuration]);
	return shouldLockScroll;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/use-modal.mjs
function useModal({ id, transitionProps, opened, trapFocus, closeOnEscape, onClose, returnFocus }) {
	const _id = useId$1(id);
	const [titleMounted, setTitleMounted] = (0, import_react.useState)(false);
	const [bodyMounted, setBodyMounted] = (0, import_react.useState)(false);
	const shouldLockScroll = useLockScroll({
		opened,
		transitionDuration: typeof transitionProps?.duration === "number" ? transitionProps?.duration : 200
	});
	useWindowEvent("keydown", (event) => {
		if (event.key === "Escape" && closeOnEscape && !event.isComposing && opened) event.target?.getAttribute("data-mantine-stop-propagation") !== "true" && onClose();
	}, { capture: true });
	useFocusReturn({
		opened,
		shouldReturnFocus: trapFocus && returnFocus
	});
	return {
		_id,
		titleMounted,
		bodyMounted,
		shouldLockScroll,
		setTitleMounted,
		setBodyMounted
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBase.mjs
var import_jsx_runtime = require_jsx_runtime();
function ModalBase({ keepMounted, opened, onClose, id, transitionProps, onExitTransitionEnd, onEnterTransitionEnd, trapFocus, closeOnEscape, returnFocus, closeOnClickOutside, withinPortal, portalProps, lockScroll, children, zIndex, shadow, padding, __vars, unstyled, removeScrollProps, ...others }) {
	const { _id, titleMounted, bodyMounted, shouldLockScroll, setTitleMounted, setBodyMounted } = useModal({
		id,
		transitionProps,
		opened,
		trapFocus,
		closeOnEscape,
		onClose,
		returnFocus
	});
	const { key: removeScrollKey, ...otherRemoveScrollProps } = removeScrollProps || {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalPortal, {
		...portalProps,
		withinPortal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseProvider, {
			value: {
				opened,
				onClose,
				closeOnClickOutside,
				onExitTransitionEnd,
				onEnterTransitionEnd,
				transitionProps: {
					...transitionProps,
					keepMounted
				},
				getTitleId: () => `${_id}-title`,
				getBodyId: () => `${_id}-body`,
				titleMounted,
				bodyMounted,
				setTitleMounted,
				setBodyMounted,
				trapFocus,
				closeOnEscape,
				zIndex,
				unstyled
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
				enabled: shouldLockScroll && lockScroll,
				...otherRemoveScrollProps,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					...others,
					id: _id,
					__vars: {
						...__vars,
						"--mb-z-index": (zIndex || getDefaultZIndex("modal")).toString(),
						"--mb-shadow": getShadow(shadow),
						"--mb-padding": getSpacing(padding)
					},
					children
				})
			}, removeScrollKey)
		})
	});
}
ModalBase.displayName = "@mantine/core/ModalBase";
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/use-modal-body-id.mjs
function useModalBodyId() {
	const ctx = useModalBaseContext();
	(0, import_react.useEffect)(() => {
		ctx.setBodyMounted(true);
		return () => ctx.setBodyMounted(false);
	}, []);
	return ctx.getBodyId();
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBase.module.mjs
var ModalBase_module_default = {
	"title": "m_615af6c9",
	"header": "m_b5489c3c",
	"inner": "m_60c222c7",
	"content": "m_fd1ab0aa",
	"close": "m_606cb269",
	"body": "m_5df29311"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBaseBody.mjs
function ModalBaseBody({ className, ...others }) {
	const bodyId = useModalBodyId();
	const ctx = useModalBaseContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		id: bodyId,
		className: clsx({ [ModalBase_module_default.body]: !ctx.unstyled }, className),
		...others
	});
}
ModalBaseBody.displayName = "@mantine/core/ModalBaseBody";
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBaseCloseButton.mjs
function ModalBaseCloseButton({ className, onClick, ...others }) {
	const ctx = useModalBaseContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
		...others,
		onClick: (event) => {
			ctx.onClose();
			onClick?.(event);
		},
		className: clsx({ [ModalBase_module_default.close]: !ctx.unstyled }, className),
		unstyled: ctx.unstyled
	});
}
ModalBaseCloseButton.displayName = "@mantine/core/ModalBaseCloseButton";
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBaseContent.mjs
function ModalBaseContent({ transitionProps, className, innerProps, onKeyDown, style, ref, ...others }) {
	const ctx = useModalBaseContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
		mounted: ctx.opened,
		transition: "pop",
		...ctx.transitionProps,
		onExited: () => {
			ctx.onExitTransitionEnd?.();
			ctx.transitionProps?.onExited?.();
		},
		onEntered: () => {
			ctx.onEnterTransitionEnd?.();
			ctx.transitionProps?.onEntered?.();
		},
		...transitionProps,
		children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...innerProps,
			className: clsx({ [ModalBase_module_default.inner]: !ctx.unstyled }, innerProps.className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTrap, {
				active: ctx.opened && ctx.trapFocus,
				innerRef: ref,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					...others,
					component: "section",
					role: "dialog",
					tabIndex: -1,
					"aria-modal": true,
					"aria-describedby": ctx.bodyMounted ? ctx.getBodyId() : void 0,
					"aria-labelledby": ctx.titleMounted ? ctx.getTitleId() : void 0,
					style: [style, transitionStyles],
					className: clsx({ [ModalBase_module_default.content]: !ctx.unstyled }, className),
					unstyled: ctx.unstyled,
					children: others.children
				})
			})
		})
	});
}
ModalBaseContent.displayName = "@mantine/core/ModalBaseContent";
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBaseHeader.mjs
function ModalBaseHeader({ className, ...others }) {
	const ctx = useModalBaseContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "header",
		className: clsx({ [ModalBase_module_default.header]: !ctx.unstyled }, className),
		...others
	});
}
ModalBaseHeader.displayName = "@mantine/core/ModalBaseHeader";
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/use-modal-transition.mjs
var DEFAULT_TRANSITION = {
	duration: 200,
	timingFunction: "ease",
	transition: "fade"
};
function useModalTransition(transitionOverride) {
	const ctx = useModalBaseContext();
	return {
		...DEFAULT_TRANSITION,
		...ctx.transitionProps,
		...transitionOverride
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBaseOverlay.mjs
function ModalBaseOverlay({ onClick, transitionProps, style, visible, ...others }) {
	const ctx = useModalBaseContext();
	const transition = useModalTransition(transitionProps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
		mounted: visible !== void 0 ? visible : ctx.opened,
		...transition,
		transition: "fade",
		children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
			fixed: true,
			style: [style, transitionStyles],
			zIndex: ctx.zIndex,
			unstyled: ctx.unstyled,
			onClick: (event) => {
				onClick?.(event);
				ctx.closeOnClickOutside && ctx.onClose();
			},
			...others
		})
	});
}
ModalBaseOverlay.displayName = "@mantine/core/ModalBaseOverlay";
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/use-modal-title-id.mjs
function useModalTitle() {
	const ctx = useModalBaseContext();
	(0, import_react.useEffect)(() => {
		ctx.setTitleMounted(true);
		return () => ctx.setTitleMounted(false);
	}, []);
	return ctx.getTitleId();
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/ModalBaseTitle.mjs
function ModalBaseTitle({ className, ...others }) {
	const id = useModalTitle();
	const ctx = useModalBaseContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "h2",
		className: clsx({ [ModalBase_module_default.title]: !ctx.unstyled }, className),
		id,
		...others
	});
}
ModalBaseTitle.displayName = "@mantine/core/ModalBaseTitle";
//#endregion
//#region node_modules/@mantine/core/esm/components/ModalBase/NativeScrollArea.mjs
function NativeScrollArea({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { ModalBaseContent as a, ModalBase as c, ModalBaseHeader as i, ModalBaseTitle as n, ModalBaseCloseButton as o, ModalBaseOverlay as r, ModalBaseBody as s, NativeScrollArea as t };
