import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { F as getRadius, L as getSize, M as createVarsResolver, V as rem, d as useStyles, f as useProps, r as factory } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as getDefaultZIndex } from "./get-default-z-index-DH-2Ba3K.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { a as ModalBaseContent, c as ModalBase, i as ModalBaseHeader, n as ModalBaseTitle, o as ModalBaseCloseButton, r as ModalBaseOverlay, s as ModalBaseBody, t as NativeScrollArea } from "./NativeScrollArea-FavZ65-p.js";
//#region node_modules/@mantine/core/esm/components/Modal/Modal.context.mjs
var [ModalProvider, useModalContext] = createSafeContext("Modal component was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/Modal.module.mjs
var Modal_module_default = {
	"root": "m_9df02822",
	"content": "m_54c44539",
	"inner": "m_1f958f16",
	"header": "m_d0e2b9cd"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalBody.mjs
var import_jsx_runtime = require_jsx_runtime();
var ModalBody = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ModalBody", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseBody, {
		...useModalContext().getStyles("body", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
ModalBody.classes = Modal_module_default;
ModalBody.displayName = "@mantine/core/ModalBody";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalCloseButton.mjs
var ModalCloseButton = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ModalCloseButton", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseCloseButton, {
		...useModalContext().getStyles("close", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
ModalCloseButton.classes = Modal_module_default;
ModalCloseButton.displayName = "@mantine/core/ModalCloseButton";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalContent.mjs
var ModalContent = factory((_props) => {
	const { classNames, className, style, styles, vars, children, __hidden, ...others } = useProps("ModalContent", null, _props);
	const ctx = useModalContext();
	const Scroll = ctx.scrollAreaComponent || NativeScrollArea;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseContent, {
		...ctx.getStyles("content", {
			className,
			style,
			styles,
			classNames
		}),
		innerProps: ctx.getStyles("inner", {
			className,
			style,
			styles,
			classNames
		}),
		"data-full-screen": ctx.fullScreen || void 0,
		"data-modal-content": true,
		"data-hidden": __hidden || void 0,
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scroll, {
			style: { maxHeight: ctx.fullScreen ? "100dvh" : `calc(100dvh - (${rem(ctx.yOffset)} * 2))` },
			children
		})
	});
});
ModalContent.classes = Modal_module_default;
ModalContent.displayName = "@mantine/core/ModalContent";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalHeader.mjs
var ModalHeader = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ModalHeader", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseHeader, {
		...useModalContext().getStyles("header", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
ModalHeader.classes = Modal_module_default;
ModalHeader.displayName = "@mantine/core/ModalHeader";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalOverlay.mjs
var ModalOverlay = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ModalOverlay", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseOverlay, {
		...useModalContext().getStyles("overlay", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
ModalOverlay.classes = Modal_module_default;
ModalOverlay.displayName = "@mantine/core/ModalOverlay";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalRoot.mjs
var defaultProps$1 = {
	__staticSelector: "Modal",
	closeOnClickOutside: true,
	withinPortal: true,
	lockScroll: true,
	trapFocus: true,
	returnFocus: true,
	closeOnEscape: true,
	keepMounted: false,
	zIndex: getDefaultZIndex("modal"),
	transitionProps: {
		duration: 200,
		transition: "fade-down"
	},
	yOffset: "5dvh"
};
var varsResolver = createVarsResolver((_, { radius, size, yOffset, xOffset }) => ({ root: {
	"--modal-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--modal-size": getSize(size, "modal-size"),
	"--modal-y-offset": rem(yOffset),
	"--modal-x-offset": rem(xOffset)
} }));
var ModalRoot = factory((_props) => {
	const props = useProps("ModalRoot", defaultProps$1, _props);
	const { classNames, className, style, styles, unstyled, vars, yOffset, scrollAreaComponent, radius, fullScreen, centered, xOffset, __staticSelector, attributes, ...others } = props;
	const getStyles = useStyles({
		name: __staticSelector,
		classes: Modal_module_default,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalProvider, {
		value: {
			yOffset,
			scrollAreaComponent,
			getStyles,
			fullScreen
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBase, {
			...getStyles("root"),
			"data-full-screen": fullScreen || void 0,
			"data-centered": centered || void 0,
			"data-offset-scrollbars": scrollAreaComponent === ScrollArea.Autosize || void 0,
			unstyled,
			...others
		})
	});
});
ModalRoot.classes = Modal_module_default;
ModalRoot.varsResolver = varsResolver;
ModalRoot.displayName = "@mantine/core/ModalRoot";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalStack.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var ModalStackContext = (0, import_react.createContext)(null);
function ModalStack({ children }) {
	const [stack, setStack] = (0, import_react.useState)([]);
	const [maxZIndex, setMaxZIndex] = (0, import_react.useState)(getDefaultZIndex("modal"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalStackContext, {
		value: {
			stack,
			addModal: (id, zIndex) => {
				setStack((current) => [...new Set([...current, id])]);
				setMaxZIndex((current) => typeof zIndex === "number" && typeof current === "number" ? Math.max(current, zIndex) : current);
			},
			removeModal: (id) => setStack((current) => current.filter((currentId) => currentId !== id)),
			getZIndex: (id) => `calc(${maxZIndex} + ${stack.indexOf(id)} + 1)`,
			currentId: stack[stack.length - 1],
			maxZIndex
		},
		children
	});
}
ModalStack.displayName = "@mantine/core/ModalStack";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/ModalTitle.mjs
var ModalTitle = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("ModalTitle", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseTitle, {
		...useModalContext().getStyles("title", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
ModalTitle.classes = Modal_module_default;
ModalTitle.displayName = "@mantine/core/ModalTitle";
//#endregion
//#region node_modules/@mantine/core/esm/components/Modal/Modal.mjs
var defaultProps = {
	closeOnClickOutside: true,
	withinPortal: true,
	lockScroll: true,
	trapFocus: true,
	returnFocus: true,
	closeOnEscape: true,
	keepMounted: false,
	zIndex: getDefaultZIndex("modal"),
	transitionProps: {
		duration: 200,
		transition: "fade-down"
	},
	withOverlay: true,
	withCloseButton: true
};
var Modal = factory((_props) => {
	const { title, withOverlay, overlayProps, withCloseButton, closeButtonProps, children, radius, opened, stackId, zIndex, ...others } = useProps("Modal", defaultProps, _props);
	const ctx = (0, import_react.use)(ModalStackContext);
	const hasHeader = !!title || withCloseButton;
	const stackProps = ctx && stackId ? {
		closeOnEscape: ctx.currentId === stackId,
		trapFocus: ctx.currentId === stackId,
		zIndex: ctx.getZIndex(stackId)
	} : {};
	const overlayVisible = withOverlay === false ? false : stackId && ctx ? ctx.currentId === stackId : opened;
	(0, import_react.useEffect)(() => {
		if (ctx && stackId) opened ? ctx.addModal(stackId, zIndex || getDefaultZIndex("modal")) : ctx.removeModal(stackId);
	}, [
		opened,
		stackId,
		zIndex
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalRoot, {
		radius,
		opened,
		zIndex: ctx && stackId ? ctx.getZIndex(stackId) : zIndex,
		...others,
		...stackProps,
		children: [withOverlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalOverlay, {
			visible: overlayVisible,
			transitionProps: ctx && stackId ? { duration: 0 } : void 0,
			...overlayProps
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalContent, {
			radius,
			__hidden: ctx && stackId && opened ? stackId !== ctx.currentId : false,
			children: [hasHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalHeader, { children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalTitle, { children: title }), withCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalCloseButton, { ...closeButtonProps })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBody, { children })]
		})]
	});
});
Modal.classes = Modal_module_default;
Modal.displayName = "@mantine/core/Modal";
Modal.Root = ModalRoot;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.CloseButton = ModalCloseButton;
Modal.Stack = ModalStack;
//#endregion
export { Modal as t };
