import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { b as useMantineEnv, f as useProps, m as useMantineTheme, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { i as useDidUpdate, r as useReducedMotion } from "./Transition-Cmaaz8Kh.js";
import { n as mergeRefs } from "./use-merged-ref-BDko4TTF.js";
import { t as require_react_dom } from "./react-dom-BklfeObY.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as getStyleObject } from "./get-style-object-B7AYNdux.js";
//#region node_modules/@mantine/hooks/esm/use-collapse/use-collapse.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function getAutoHeightDuration(height) {
	if (!height || typeof height === "string") return 0;
	const constant = height / 36;
	return Math.round((4 + 15 * constant ** .25 + constant / 5) * 10);
}
function getElementHeight(elementRef) {
	return elementRef.current ? elementRef.current.scrollHeight : "auto";
}
function useCollapse({ transitionDuration, transitionTimingFunction = "ease", onTransitionEnd, onTransitionStart, expanded, keepMounted }) {
	const collapsedStyles = {
		height: 0,
		overflow: "hidden",
		...keepMounted ? {} : { display: "none" }
	};
	const onTransitionStartEvent = (0, import_react.useEffectEvent)(() => onTransitionStart?.());
	const elementRef = (0, import_react.useRef)(null);
	const [styles, setStylesRaw] = (0, import_react.useState)(expanded ? {} : collapsedStyles);
	const [state, setState] = (0, import_react.useState)(expanded ? "entered" : "exited");
	const setStyles = (newStyles) => {
		(0, import_react_dom.flushSync)(() => setStylesRaw(newStyles));
	};
	const mergeStyles = (newStyles) => {
		setStyles((oldStyles) => ({
			...oldStyles,
			...newStyles
		}));
	};
	const getTransitionStyles = (height) => {
		const duration = transitionDuration ?? getAutoHeightDuration(height);
		return { transition: `height ${duration}ms ${transitionTimingFunction}, opacity ${duration}ms ${transitionTimingFunction}` };
	};
	useDidUpdate(() => {
		if (transitionDuration !== 0) onTransitionStartEvent();
		if (expanded) window.requestAnimationFrame(() => {
			(0, import_react_dom.flushSync)(() => setState("entering"));
			mergeStyles({
				willChange: "height",
				display: "block",
				overflow: "hidden"
			});
			window.requestAnimationFrame(() => {
				const height = getElementHeight(elementRef);
				mergeStyles({
					...getTransitionStyles(height),
					height
				});
			});
		});
		else window.requestAnimationFrame(() => {
			(0, import_react_dom.flushSync)(() => setState("exiting"));
			const height = getElementHeight(elementRef);
			mergeStyles({
				...getTransitionStyles(height),
				willChange: "height",
				height
			});
			window.requestAnimationFrame(() => mergeStyles({
				height: 0,
				overflow: "hidden"
			}));
		});
	}, [expanded]);
	const handleTransitionEnd = (event) => {
		if (event.target !== elementRef.current || event.propertyName !== "height") return;
		if (expanded) {
			const height = getElementHeight(elementRef);
			if (height === styles.height) setStyles({});
			else mergeStyles({ height });
			setState("entered");
			onTransitionEnd?.();
		} else if (styles.height === 0) {
			setStyles(collapsedStyles);
			setState("exited");
			onTransitionEnd?.();
		}
	};
	return {
		state,
		getCollapseProps: (input) => ({
			"aria-hidden": !expanded,
			inert: !expanded,
			ref: mergeRefs(elementRef, input?.ref),
			onTransitionEnd: handleTransitionEnd,
			style: {
				boxSizing: "border-box",
				...input?.style,
				...styles
			}
		})
	};
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-collapse/use-horizontal-collapse.mjs
function getAutoWidthDuration(width) {
	if (!width || typeof width === "string") return 0;
	const constant = width / 36;
	return Math.round((4 + 15 * constant ** .25 + constant / 5) * 10);
}
function getElementWidth(elementRef) {
	return elementRef.current ? elementRef.current.scrollWidth : "auto";
}
function useHorizontalCollapse({ transitionDuration, transitionTimingFunction = "ease", onTransitionEnd, onTransitionStart, expanded, keepMounted }) {
	const collapsedStyles = {
		width: 0,
		overflow: "hidden",
		...keepMounted ? {} : { display: "none" }
	};
	const onTransitionStartEvent = (0, import_react.useEffectEvent)(() => onTransitionStart?.());
	const elementRef = (0, import_react.useRef)(null);
	const [styles, setStylesRaw] = (0, import_react.useState)(expanded ? {} : collapsedStyles);
	const [state, setState] = (0, import_react.useState)(expanded ? "entered" : "exited");
	const setStyles = (newStyles) => {
		(0, import_react_dom.flushSync)(() => setStylesRaw(newStyles));
	};
	const mergeStyles = (newStyles) => {
		setStyles((oldStyles) => ({
			...oldStyles,
			...newStyles
		}));
	};
	const getTransitionStyles = (width) => {
		const duration = transitionDuration ?? getAutoWidthDuration(width);
		return { transition: `width ${duration}ms ${transitionTimingFunction}, opacity ${duration}ms ${transitionTimingFunction}` };
	};
	useDidUpdate(() => {
		if (transitionDuration !== 0) onTransitionStartEvent();
		if (expanded) window.requestAnimationFrame(() => {
			(0, import_react_dom.flushSync)(() => setState("entering"));
			mergeStyles({
				willChange: "width",
				display: "block",
				overflow: "hidden"
			});
			window.requestAnimationFrame(() => {
				const width = getElementWidth(elementRef);
				mergeStyles({
					...getTransitionStyles(width),
					width
				});
			});
		});
		else window.requestAnimationFrame(() => {
			(0, import_react_dom.flushSync)(() => setState("exiting"));
			const width = getElementWidth(elementRef);
			mergeStyles({
				...getTransitionStyles(width),
				willChange: "width",
				width
			});
			window.requestAnimationFrame(() => mergeStyles({
				width: 0,
				overflow: "hidden"
			}));
		});
	}, [expanded]);
	const handleTransitionEnd = (event) => {
		if (event.target !== elementRef.current || event.propertyName !== "width") return;
		if (expanded) {
			const width = getElementWidth(elementRef);
			if (width === styles.width) setStyles({});
			else mergeStyles({ width });
			setState("entered");
			onTransitionEnd?.();
		} else if (styles.width === 0) {
			setStyles(collapsedStyles);
			setState("exited");
			onTransitionEnd?.();
		}
	};
	return {
		state,
		getCollapseProps: (input) => ({
			"aria-hidden": !expanded,
			inert: !expanded,
			ref: mergeRefs(elementRef, input?.ref),
			onTransitionEnd: handleTransitionEnd,
			style: {
				boxSizing: "border-box",
				...input?.style,
				...styles
			}
		})
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Collapse/Collapse.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = {
	transitionDuration: 200,
	transitionTimingFunction: "ease",
	animateOpacity: true,
	orientation: "vertical"
};
var Collapse = factory((props) => {
	const { children, expanded, transitionDuration, transitionTimingFunction, style, onTransitionEnd, onTransitionStart, animateOpacity, keepMounted, ref, orientation, ...others } = useProps("Collapse", defaultProps, props);
	const env = useMantineEnv();
	const theme = useMantineTheme();
	const shouldReduceMotion = useReducedMotion();
	const duration = (theme.respectReducedMotion ? shouldReduceMotion : false) ? 0 : transitionDuration;
	const collapse = (orientation === "horizontal" ? useHorizontalCollapse : useCollapse)({
		expanded,
		transitionDuration: duration,
		transitionTimingFunction,
		onTransitionEnd,
		onTransitionStart,
		keepMounted: false
	});
	if (duration === 0) {
		if (keepMounted === true && env !== "test") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Activity, {
			mode: expanded ? "visible" : "hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				...others,
				children
			})
		});
		return expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...others,
			children
		}) : null;
	}
	const isExited = collapse.state === "exited";
	let content;
	if (keepMounted === false) content = isExited ? null : children;
	else if (keepMounted === true) content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Activity, {
		mode: isExited ? "hidden" : "visible",
		children
	});
	else content = children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...others,
		...collapse.getCollapseProps({
			style: {
				opacity: expanded || !animateOpacity ? 1 : 0,
				transition: animateOpacity ? `opacity ${duration}ms ${transitionTimingFunction}` : "none",
				...getStyleObject(style, theme)
			},
			ref
		}),
		children: content
	});
});
Collapse.displayName = "@mantine/core/Collapse";
//#endregion
export { Collapse as t };
