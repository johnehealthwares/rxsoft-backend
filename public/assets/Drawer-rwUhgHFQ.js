import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { L as getSize, M as createVarsResolver, V as rem, d as useStyles, f as useProps, r as factory } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as getDefaultZIndex } from "./get-default-z-index-DH-2Ba3K.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
import { a as ModalBaseContent, c as ModalBase, i as ModalBaseHeader, n as ModalBaseTitle, o as ModalBaseCloseButton, r as ModalBaseOverlay, s as ModalBaseBody, t as NativeScrollArea } from "./NativeScrollArea-FavZ65-p.js";
//#region node_modules/@mantine/core/esm/components/Drawer/Drawer.context.mjs
var [DrawerProvider, useDrawerContext] = createSafeContext("Drawer component was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/Drawer.module.mjs
var Drawer_module_default = {
	"root": "m_f11b401e",
	"header": "m_5a7c2c9",
	"content": "m_b8a05bbd",
	"inner": "m_31cd769a"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerBody.mjs
var import_jsx_runtime = require_jsx_runtime();
var DrawerBody = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("DrawerBody", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseBody, {
		...useDrawerContext().getStyles("body", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
DrawerBody.classes = Drawer_module_default;
DrawerBody.displayName = "@mantine/core/DrawerBody";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerCloseButton.mjs
var DrawerCloseButton = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("DrawerCloseButton", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseCloseButton, {
		...useDrawerContext().getStyles("close", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
DrawerCloseButton.classes = Drawer_module_default;
DrawerCloseButton.displayName = "@mantine/core/DrawerCloseButton";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerContent.mjs
var DrawerContent = factory((_props) => {
	const { classNames, className, style, styles, vars, children, radius, __hidden, ...others } = useProps("DrawerContent", null, _props);
	const ctx = useDrawerContext();
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
		...others,
		radius: radius || ctx.radius || 0,
		"data-hidden": __hidden || void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scroll, {
			style: { height: "calc(100vh - var(--drawer-offset) * 2)" },
			children
		})
	});
});
DrawerContent.classes = Drawer_module_default;
DrawerContent.displayName = "@mantine/core/DrawerContent";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerHeader.mjs
var DrawerHeader = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("DrawerHeader", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseHeader, {
		...useDrawerContext().getStyles("header", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
DrawerHeader.classes = Drawer_module_default;
DrawerHeader.displayName = "@mantine/core/DrawerHeader";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerOverlay.mjs
var DrawerOverlay = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("DrawerOverlay", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseOverlay, {
		...useDrawerContext().getStyles("overlay", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
DrawerOverlay.classes = Drawer_module_default;
DrawerOverlay.displayName = "@mantine/core/DrawerOverlay";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerRoot.mjs
function getDrawerAlign(position) {
	switch (position) {
		case "top": return "flex-start";
		case "bottom": return "flex-end";
		default: return;
	}
}
function getDrawerFlex(position) {
	if (position === "top" || position === "bottom") return "0 0 calc(100% - var(--drawer-offset, 0rem) * 2)";
}
var transitions = {
	top: "slide-down",
	bottom: "slide-up",
	left: "slide-right",
	right: "slide-left"
};
var rtlTransitions = {
	top: "slide-down",
	bottom: "slide-up",
	right: "slide-right",
	left: "slide-left"
};
var defaultProps$1 = {
	closeOnClickOutside: true,
	withinPortal: true,
	lockScroll: true,
	trapFocus: true,
	returnFocus: true,
	closeOnEscape: true,
	keepMounted: false,
	zIndex: getDefaultZIndex("modal"),
	position: "left"
};
var varsResolver = createVarsResolver((_, { position, size, offset }) => ({ root: {
	"--drawer-size": getSize(size, "drawer-size"),
	"--drawer-flex": getDrawerFlex(position),
	"--drawer-height": position === "left" || position === "right" ? void 0 : "var(--drawer-size)",
	"--drawer-align": getDrawerAlign(position),
	"--drawer-justify": position === "right" ? "flex-end" : void 0,
	"--drawer-offset": rem(offset)
} }));
var DrawerRoot = factory((_props) => {
	const props = useProps("DrawerRoot", defaultProps$1, _props);
	const { classNames, className, style, styles, unstyled, vars, scrollAreaComponent, position, transitionProps, radius, attributes, ...others } = props;
	const { dir } = useDirection();
	const getStyles = useStyles({
		name: "Drawer",
		classes: Drawer_module_default,
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
	const drawerTransition = (dir === "rtl" ? rtlTransitions : transitions)[position];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerProvider, {
		value: {
			scrollAreaComponent,
			getStyles,
			radius
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBase, {
			...getStyles("root"),
			transitionProps: {
				transition: drawerTransition,
				...transitionProps
			},
			"data-offset-scrollbars": scrollAreaComponent === ScrollArea.Autosize || void 0,
			unstyled,
			...others
		})
	});
});
DrawerRoot.classes = Drawer_module_default;
DrawerRoot.varsResolver = varsResolver;
DrawerRoot.displayName = "@mantine/core/DrawerRoot";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerStack.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DrawerStackContext = (0, import_react.createContext)(null);
function DrawerStack({ children }) {
	const [stack, setStack] = (0, import_react.useState)([]);
	const [maxZIndex, setMaxZIndex] = (0, import_react.useState)(getDefaultZIndex("modal"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerStackContext, {
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
DrawerStack.displayName = "@mantine/core/DrawerStack";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/DrawerTitle.mjs
var DrawerTitle = factory((_props) => {
	const { classNames, className, style, styles, vars, ...others } = useProps("DrawerTitle", null, _props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBaseTitle, {
		...useDrawerContext().getStyles("title", {
			classNames,
			style,
			styles,
			className
		}),
		...others
	});
});
DrawerTitle.classes = Drawer_module_default;
DrawerTitle.displayName = "@mantine/core/DrawerTitle";
//#endregion
//#region node_modules/@mantine/core/esm/components/Drawer/Drawer.mjs
var defaultProps = {
	closeOnClickOutside: true,
	withinPortal: true,
	lockScroll: true,
	trapFocus: true,
	returnFocus: true,
	closeOnEscape: true,
	keepMounted: false,
	zIndex: getDefaultZIndex("modal"),
	withOverlay: true,
	withCloseButton: true
};
var Drawer = factory((_props) => {
	const { title, withOverlay, overlayProps, withCloseButton, closeButtonProps, children, opened, stackId, zIndex, ...others } = useProps("Drawer", defaultProps, _props);
	const ctx = (0, import_react.use)(DrawerStackContext);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerRoot, {
		opened,
		zIndex: ctx && stackId ? ctx.getZIndex(stackId) : zIndex,
		...others,
		...stackProps,
		children: [withOverlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {
			visible: overlayVisible,
			transitionProps: ctx && stackId ? { duration: 0 } : void 0,
			...overlayProps
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			__hidden: ctx && stackId && opened ? stackId !== ctx.currentId : false,
			children: [hasHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: title }), withCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerCloseButton, { ...closeButtonProps })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBody, { children })]
		})]
	});
});
Drawer.classes = Drawer_module_default;
Drawer.displayName = "@mantine/core/Drawer";
Drawer.Root = DrawerRoot;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.CloseButton = DrawerCloseButton;
Drawer.Stack = DrawerStack;
//#endregion
export { Drawer as t };
