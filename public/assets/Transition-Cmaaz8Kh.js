import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { b as useMantineEnv, d as useStyles, f as useProps, m as useMantineTheme, n as polymorphicFactory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_react_dom } from "./react-dom-BklfeObY.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/hooks/esm/use-media-query/use-media-query.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function getInitialValue(query, initialValue) {
	if (typeof initialValue === "boolean") return initialValue;
	if (typeof window !== "undefined" && "matchMedia" in window) return window.matchMedia(query).matches;
	return false;
}
function useMediaQuery(query, initialValue, { getInitialValueInEffect } = { getInitialValueInEffect: true }) {
	const [matches, setMatches] = (0, import_react.useState)(getInitialValueInEffect ? initialValue : getInitialValue(query));
	(0, import_react.useEffect)(() => {
		try {
			if ("matchMedia" in window) {
				const mediaQuery = window.matchMedia(query);
				setMatches(mediaQuery.matches);
				const callback = (event) => setMatches(event.matches);
				mediaQuery.addEventListener("change", callback);
				return () => {
					mediaQuery.removeEventListener("change", callback);
				};
			}
		} catch (e) {
			return;
		}
	}, [query]);
	return matches || false;
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-did-update/use-did-update.mjs
function useDidUpdate(fn, dependencies) {
	const mounted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => () => {
		mounted.current = false;
	}, []);
	(0, import_react.useEffect)(() => {
		if (mounted.current) return fn();
		mounted.current = true;
	}, dependencies);
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-reduced-motion/use-reduced-motion.mjs
function useReducedMotion(initialValue, options) {
	return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/UnstyledButton/UnstyledButton.module.mjs
var UnstyledButton_module_default = { "root": "m_87cf2631" };
//#endregion
//#region node_modules/@mantine/core/esm/components/UnstyledButton/UnstyledButton.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = { __staticSelector: "UnstyledButton" };
var UnstyledButton = polymorphicFactory((_props) => {
	const props = useProps("UnstyledButton", defaultProps, _props);
	const { className, component = "button", __staticSelector, unstyled, classNames, styles, style, attributes, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: __staticSelector,
			props,
			classes: UnstyledButton_module_default,
			className,
			style,
			classNames,
			styles,
			unstyled,
			attributes
		})("root", { focusable: true }),
		component,
		type: component === "button" ? "button" : void 0,
		...others
	});
});
UnstyledButton.classes = UnstyledButton_module_default;
UnstyledButton.displayName = "@mantine/core/UnstyledButton";
//#endregion
//#region node_modules/@mantine/core/esm/components/Transition/transitions.mjs
var popIn = (from) => ({
	in: {
		opacity: 1,
		transform: "scale(1)"
	},
	out: {
		opacity: 0,
		transform: `scale(.9) translateY(${from === "bottom" ? 10 : -10}px)`
	},
	transitionProperty: "transform, opacity"
});
var transitions = {
	fade: {
		in: { opacity: 1 },
		out: { opacity: 0 },
		transitionProperty: "opacity"
	},
	"fade-up": {
		in: {
			opacity: 1,
			transform: "translateY(0)"
		},
		out: {
			opacity: 0,
			transform: "translateY(30px)"
		},
		transitionProperty: "opacity, transform"
	},
	"fade-down": {
		in: {
			opacity: 1,
			transform: "translateY(0)"
		},
		out: {
			opacity: 0,
			transform: "translateY(-30px)"
		},
		transitionProperty: "opacity, transform"
	},
	"fade-left": {
		in: {
			opacity: 1,
			transform: "translateX(0)"
		},
		out: {
			opacity: 0,
			transform: "translateX(30px)"
		},
		transitionProperty: "opacity, transform"
	},
	"fade-right": {
		in: {
			opacity: 1,
			transform: "translateX(0)"
		},
		out: {
			opacity: 0,
			transform: "translateX(-30px)"
		},
		transitionProperty: "opacity, transform"
	},
	scale: {
		in: {
			opacity: 1,
			transform: "scale(1)"
		},
		out: {
			opacity: 0,
			transform: "scale(0)"
		},
		common: { transformOrigin: "top" },
		transitionProperty: "transform, opacity"
	},
	"scale-y": {
		in: {
			opacity: 1,
			transform: "scaleY(1)"
		},
		out: {
			opacity: 0,
			transform: "scaleY(0)"
		},
		common: { transformOrigin: "top" },
		transitionProperty: "transform, opacity"
	},
	"scale-x": {
		in: {
			opacity: 1,
			transform: "scaleX(1)"
		},
		out: {
			opacity: 0,
			transform: "scaleX(0)"
		},
		common: { transformOrigin: "left" },
		transitionProperty: "transform, opacity"
	},
	"skew-up": {
		in: {
			opacity: 1,
			transform: "translateY(0) skew(0deg, 0deg)"
		},
		out: {
			opacity: 0,
			transform: "translateY(-20px) skew(-10deg, -5deg)"
		},
		common: { transformOrigin: "top" },
		transitionProperty: "transform, opacity"
	},
	"skew-down": {
		in: {
			opacity: 1,
			transform: "translateY(0) skew(0deg, 0deg)"
		},
		out: {
			opacity: 0,
			transform: "translateY(20px) skew(-10deg, -5deg)"
		},
		common: { transformOrigin: "bottom" },
		transitionProperty: "transform, opacity"
	},
	"rotate-left": {
		in: {
			opacity: 1,
			transform: "translateY(0) rotate(0deg)"
		},
		out: {
			opacity: 0,
			transform: "translateY(20px) rotate(-5deg)"
		},
		common: { transformOrigin: "bottom" },
		transitionProperty: "transform, opacity"
	},
	"rotate-right": {
		in: {
			opacity: 1,
			transform: "translateY(0) rotate(0deg)"
		},
		out: {
			opacity: 0,
			transform: "translateY(20px) rotate(5deg)"
		},
		common: { transformOrigin: "top" },
		transitionProperty: "transform, opacity"
	},
	"slide-down": {
		in: {
			opacity: 1,
			transform: "translateY(0)"
		},
		out: {
			opacity: 0,
			transform: "translateY(-100%)"
		},
		common: { transformOrigin: "top" },
		transitionProperty: "transform, opacity"
	},
	"slide-up": {
		in: {
			opacity: 1,
			transform: "translateY(0)"
		},
		out: {
			opacity: 0,
			transform: "translateY(100%)"
		},
		common: { transformOrigin: "bottom" },
		transitionProperty: "transform, opacity"
	},
	"slide-left": {
		in: {
			opacity: 1,
			transform: "translateX(0)"
		},
		out: {
			opacity: 0,
			transform: "translateX(100%)"
		},
		common: { transformOrigin: "left" },
		transitionProperty: "transform, opacity"
	},
	"slide-right": {
		in: {
			opacity: 1,
			transform: "translateX(0)"
		},
		out: {
			opacity: 0,
			transform: "translateX(-100%)"
		},
		common: { transformOrigin: "right" },
		transitionProperty: "transform, opacity"
	},
	pop: {
		...popIn("bottom"),
		common: { transformOrigin: "center center" }
	},
	"pop-bottom-left": {
		...popIn("bottom"),
		common: { transformOrigin: "bottom left" }
	},
	"pop-bottom-right": {
		...popIn("bottom"),
		common: { transformOrigin: "bottom right" }
	},
	"pop-top-left": {
		...popIn("top"),
		common: { transformOrigin: "top left" }
	},
	"pop-top-right": {
		...popIn("top"),
		common: { transformOrigin: "top right" }
	}
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Transition/get-transition-styles/get-transition-styles.mjs
var transitionStatuses = {
	entering: "in",
	entered: "in",
	exiting: "out",
	exited: "out",
	"pre-exiting": "out",
	"pre-entering": "out"
};
function getTransitionStyles({ transition, state, duration, timingFunction }) {
	const shared = {
		WebkitBackfaceVisibility: "hidden",
		transitionDuration: `${duration}ms`,
		transitionTimingFunction: timingFunction
	};
	if (typeof transition === "string") {
		if (!(transition in transitions)) return {};
		return {
			transitionProperty: transitions[transition].transitionProperty,
			...shared,
			...transitions[transition].common,
			...transitions[transition][transitionStatuses[state]]
		};
	}
	return {
		transitionProperty: transition.transitionProperty,
		...shared,
		...transition.common,
		...transition[transitionStatuses[state]]
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Transition/use-transition.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function useTransition({ duration, exitDuration, timingFunction, mounted, onEnter, onExit, onEntered, onExited, enterDelay, exitDelay }) {
	const theme = useMantineTheme();
	const shouldReduceMotion = useReducedMotion();
	const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
	const [transitionDuration, setTransitionDuration] = (0, import_react.useState)(reduceMotion ? 0 : duration);
	const [transitionStatus, setStatus] = (0, import_react.useState)(mounted ? "entered" : "exited");
	const transitionTimeoutRef = (0, import_react.useRef)(-1);
	const delayTimeoutRef = (0, import_react.useRef)(-1);
	const rafRef = (0, import_react.useRef)(-1);
	function clearAllTimeouts() {
		window.clearTimeout(transitionTimeoutRef.current);
		window.clearTimeout(delayTimeoutRef.current);
		cancelAnimationFrame(rafRef.current);
	}
	const handleStateChange = (shouldMount) => {
		clearAllTimeouts();
		const preHandler = shouldMount ? onEnter : onExit;
		const handler = shouldMount ? onEntered : onExited;
		const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration;
		setTransitionDuration(newTransitionDuration);
		if (newTransitionDuration === 0) {
			typeof preHandler === "function" && preHandler();
			typeof handler === "function" && handler();
			setStatus(shouldMount ? "entered" : "exited");
		} else rafRef.current = requestAnimationFrame(() => {
			import_react_dom.flushSync(() => {
				setStatus(shouldMount ? "pre-entering" : "pre-exiting");
			});
			rafRef.current = requestAnimationFrame(() => {
				typeof preHandler === "function" && preHandler();
				setStatus(shouldMount ? "entering" : "exiting");
				transitionTimeoutRef.current = window.setTimeout(() => {
					typeof handler === "function" && handler();
					setStatus(shouldMount ? "entered" : "exited");
				}, newTransitionDuration);
			});
		});
	};
	const handleTransitionWithDelay = (shouldMount) => {
		clearAllTimeouts();
		if (typeof (shouldMount ? enterDelay : exitDelay) !== "number") {
			handleStateChange(shouldMount);
			return;
		}
		delayTimeoutRef.current = window.setTimeout(() => {
			handleStateChange(shouldMount);
		}, shouldMount ? enterDelay : exitDelay);
	};
	useDidUpdate(() => {
		handleTransitionWithDelay(mounted);
	}, [mounted]);
	(0, import_react.useEffect)(() => () => {
		clearAllTimeouts();
	}, []);
	return {
		transitionDuration,
		transitionStatus,
		transitionTimingFunction: timingFunction || "ease"
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Transition/Transition.mjs
function Transition({ keepMounted, transition = "fade", duration = 250, exitDuration = duration, mounted, children, timingFunction = "ease", onExit, onEntered, onEnter, onExited, enterDelay, exitDelay }) {
	const env = useMantineEnv();
	const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
		mounted,
		exitDuration,
		duration,
		timingFunction,
		onExit,
		onEntered,
		onEnter,
		onExited,
		enterDelay,
		exitDelay
	});
	if (env === "test") return mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children({}) }) : keepMounted ? children({ display: "none" }) : null;
	if (transitionDuration === 0) {
		if (keepMounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Activity, {
			mode: mounted ? "visible" : "hidden",
			children: children({})
		});
		return mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children({}) }) : null;
	}
	const isExited = transitionStatus === "exited";
	if (keepMounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Activity, {
		mode: isExited ? "hidden" : "visible",
		children: children(isExited ? {} : getTransitionStyles({
			transition,
			duration: transitionDuration,
			state: transitionStatus,
			timingFunction: transitionTimingFunction
		}))
	});
	return isExited ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children(getTransitionStyles({
		transition,
		duration: transitionDuration,
		state: transitionStatus,
		timingFunction: transitionTimingFunction
	})) });
}
Transition.displayName = "@mantine/core/Transition";
//#endregion
export { useMediaQuery as a, useDidUpdate as i, UnstyledButton as n, useReducedMotion as r, Transition as t };
