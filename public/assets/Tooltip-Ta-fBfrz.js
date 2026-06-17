import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { E as getThemeColor, F as getRadius, M as createVarsResolver, d as useStyles, f as useProps, j as clsx, m as useMantineTheme, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as getSingleElementChild, t as OptionalPortal } from "./OptionalPortal-COfBOdxY.js";
import { t as getDefaultZIndex } from "./get-default-z-index-DH-2Ba3K.js";
import { i as useDidUpdate, t as Transition } from "./Transition-Cmaaz8Kh.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { n as FloatingArrow, r as getRefProp, t as getFloatingPosition } from "./get-floating-position-DV1ZVGN3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as getStyleObject } from "./get-style-object-B7AYNdux.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
import { a as useFocus, d as flip, g as shift, h as offset, i as useFloating, l as useRole, n as useDelayGroup, o as useHover, p as inline, r as useDismiss, s as useInteractions, t as FloatingDelayGroup, u as arrow, v as autoUpdate, y as getOverflowAncestors } from "./floating-ui.react-UElBUAAs.js";
//#region node_modules/@mantine/core/esm/components/Transition/get-transition-props/get-transition-props.mjs
var defaultTransition = {
	duration: 100,
	transition: "fade"
};
function getTransitionProps(transitionProps, componentTransition) {
	return {
		...defaultTransition,
		...componentTransition,
		...transitionProps
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Tooltip/TooltipFloating/use-floating-tooltip.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useFloatingTooltip({ offset, position, defaultOpened }) {
	const [opened, setOpened] = (0, import_react.useState)(defaultOpened);
	const boundaryRef = (0, import_react.useRef)(null);
	const { x, y, elements, refs, update, placement } = useFloating({
		placement: position,
		middleware: [shift({
			crossAxis: true,
			padding: 5,
			rootBoundary: "document"
		})]
	});
	const horizontalOffset = placement.includes("right") ? offset : position.includes("left") ? offset * -1 : 0;
	const verticalOffset = placement.includes("bottom") ? offset : position.includes("top") ? offset * -1 : 0;
	const handleMouseMove = (0, import_react.useCallback)(({ clientX, clientY }) => {
		refs.setPositionReference({ getBoundingClientRect() {
			return {
				width: 0,
				height: 0,
				x: clientX,
				y: clientY,
				left: clientX + horizontalOffset,
				top: clientY + verticalOffset,
				right: clientX,
				bottom: clientY
			};
		} });
	}, [elements.reference]);
	(0, import_react.useEffect)(() => {
		if (refs.floating.current) {
			const boundary = boundaryRef.current;
			boundary.addEventListener("mousemove", handleMouseMove);
			const parents = getOverflowAncestors(refs.floating.current);
			parents.forEach((parent) => {
				parent.addEventListener("scroll", update);
			});
			return () => {
				boundary.removeEventListener("mousemove", handleMouseMove);
				parents.forEach((parent) => {
					parent.removeEventListener("scroll", update);
				});
			};
		}
	}, [
		elements.reference,
		refs.floating.current,
		update,
		handleMouseMove,
		opened
	]);
	return {
		handleMouseMove,
		x,
		y,
		opened,
		setOpened,
		boundaryRef,
		floating: refs.setFloating
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Tooltip/Tooltip.module.mjs
var Tooltip_module_default = {
	"tooltip": "m_1b3c8819",
	"arrow": "m_f898399f"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Tooltip/TooltipFloating/TooltipFloating.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps$2 = {
	refProp: "ref",
	withinPortal: true,
	offset: 10,
	position: "right",
	zIndex: getDefaultZIndex("popover")
};
var varsResolver$1 = createVarsResolver((theme, { radius, color }) => ({ tooltip: {
	"--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--tooltip-bg": color ? getThemeColor(color, theme) : void 0,
	"--tooltip-color": color ? "var(--mantine-color-white)" : void 0
} }));
var TooltipFloating = factory((_props) => {
	const props = useProps("TooltipFloating", defaultProps$2, _props);
	const { children, refProp, withinPortal, style, className, classNames, styles, unstyled, radius, color, label, offset, position, multiline, zIndex, disabled, defaultOpened, variant, vars, portalProps, attributes, ref, ...others } = props;
	const theme = useMantineTheme();
	const getStyles = useStyles({
		name: "TooltipFloating",
		props,
		classes: Tooltip_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		rootSelector: "tooltip",
		vars,
		varsResolver: varsResolver$1
	});
	const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip({
		offset,
		position,
		defaultOpened
	});
	const child = getSingleElementChild(children);
	if (!child) throw new Error("[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported");
	const targetRef = useMergedRef(boundaryRef, getRefProp(child), ref);
	const childProps = child.props;
	const onMouseEnter = (event) => {
		childProps.onMouseEnter?.(event);
		handleMouseMove(event);
		setOpened(true);
	};
	const onMouseLeave = (event) => {
		childProps.onMouseLeave?.(event);
		setOpened(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalPortal, {
		...portalProps,
		withinPortal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...others,
			...getStyles("tooltip", { style: {
				...getStyleObject(style, theme),
				zIndex,
				display: !disabled && opened ? "block" : "none",
				top: (y && Math.round(y)) ?? "",
				left: (x && Math.round(x)) ?? ""
			} }),
			variant,
			ref: floating,
			mod: { multiline },
			children: label
		})
	}), (0, import_react.cloneElement)(child, {
		...childProps,
		[refProp]: targetRef,
		onMouseEnter,
		onMouseLeave
	})] });
});
TooltipFloating.classes = Tooltip_module_default;
TooltipFloating.varsResolver = varsResolver$1;
TooltipFloating.displayName = "@mantine/core/TooltipFloating";
//#endregion
//#region node_modules/@mantine/core/esm/components/Tooltip/TooltipGroup/TooltipGroup.mjs
var TooltipGroupContext = (0, import_react.createContext)({ withinGroup: false });
var defaultProps$1 = {
	openDelay: 0,
	closeDelay: 0
};
function TooltipGroup(props) {
	const { openDelay, closeDelay, children } = useProps("TooltipGroup", defaultProps$1, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipGroupContext, {
		value: { withinGroup: true },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingDelayGroup, {
			delay: {
				open: openDelay,
				close: closeDelay
			},
			children
		})
	});
}
TooltipGroup.displayName = "@mantine/core/TooltipGroup";
TooltipGroup.extend = (c) => c;
//#endregion
//#region node_modules/@mantine/core/esm/components/Tooltip/use-tooltip.mjs
function getDefaultMiddlewares(middlewares) {
	if (middlewares === void 0) return {
		shift: true,
		flip: true
	};
	const result = { ...middlewares };
	if (middlewares.shift === void 0) result.shift = true;
	if (middlewares.flip === void 0) result.flip = true;
	return result;
}
function getTooltipMiddlewares(settings) {
	const middlewaresOptions = getDefaultMiddlewares(settings.middlewares);
	const middlewares = [offset(settings.offset)];
	if (middlewaresOptions.shift) middlewares.push(shift(typeof middlewaresOptions.shift === "boolean" ? { padding: 8 } : {
		padding: 8,
		...middlewaresOptions.shift
	}));
	if (middlewaresOptions.flip) middlewares.push(typeof middlewaresOptions.flip === "boolean" ? flip() : flip(middlewaresOptions.flip));
	middlewares.push(arrow({
		element: settings.arrowRef,
		padding: settings.arrowOffset
	}));
	if (middlewaresOptions.inline) middlewares.push(typeof middlewaresOptions.inline === "boolean" ? inline() : inline(middlewaresOptions.inline));
	else if (settings.inline) middlewares.push(inline());
	return middlewares;
}
function useTooltip(settings) {
	const [uncontrolledOpened, setUncontrolledOpened] = (0, import_react.useState)(settings.defaultOpened);
	const opened = typeof settings.opened === "boolean" ? settings.opened : uncontrolledOpened;
	const withinGroup = (0, import_react.use)(TooltipGroupContext).withinGroup;
	const uid = useId$1();
	const onChange = (0, import_react.useCallback)((_opened) => {
		setUncontrolledOpened(_opened);
		if (_opened) setCurrentId(uid);
	}, [uid]);
	const { x, y, context, refs, placement, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} } } = useFloating({
		strategy: settings.strategy,
		placement: settings.position,
		open: opened,
		onOpenChange: onChange,
		middleware: getTooltipMiddlewares(settings),
		whileElementsMounted: autoUpdate
	});
	const { delay: groupDelay, currentId, setCurrentId } = useDelayGroup(context, { id: uid });
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useHover(context, {
			enabled: settings.events?.hover,
			delay: withinGroup ? groupDelay : {
				open: settings.openDelay,
				close: settings.closeDelay
			},
			mouseOnly: !settings.events?.touch
		}),
		useFocus(context, {
			enabled: settings.events?.focus,
			visibleOnly: true
		}),
		useRole(context, { role: "tooltip" }),
		useDismiss(context, { enabled: typeof settings.opened === "undefined" })
	]);
	useDidUpdate(() => {
		settings.onPositionChange?.(placement);
	}, [placement]);
	const isGroupPhase = opened && currentId && currentId !== uid;
	return {
		x,
		y,
		arrowX,
		arrowY,
		reference: refs.setReference,
		floating: refs.setFloating,
		getFloatingProps,
		getReferenceProps,
		isGroupPhase,
		opened,
		placement
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs
var defaultProps = {
	position: "top",
	refProp: "ref",
	withinPortal: true,
	arrowSize: 4,
	arrowOffset: 5,
	arrowRadius: 0,
	arrowPosition: "side",
	offset: 5,
	transitionProps: {
		duration: 100,
		transition: "fade"
	},
	events: {
		hover: true,
		focus: false,
		touch: false
	},
	zIndex: getDefaultZIndex("popover"),
	middlewares: {
		flip: true,
		shift: true,
		inline: false
	}
};
var varsResolver = createVarsResolver((theme, { radius, color, variant, autoContrast }) => {
	const colors = theme.variantColorResolver({
		theme,
		color: color || theme.primaryColor,
		autoContrast,
		variant: variant || "filled"
	});
	return { tooltip: {
		"--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
		"--tooltip-bg": color ? colors.background : void 0,
		"--tooltip-color": color ? colors.color : void 0
	} };
});
var Tooltip = factory((_props) => {
	const props = useProps("Tooltip", defaultProps, _props);
	const { children, position, refProp, label, openDelay, closeDelay, onPositionChange, opened, defaultOpened, withinPortal, radius, color, classNames, styles, unstyled, style, className, withArrow, arrowSize, arrowOffset, arrowRadius, arrowPosition, offset, transitionProps, multiline, events, zIndex, disabled, onClick, onMouseEnter, onMouseLeave, inline, variant, keepMounted, vars, portalProps, mod, floatingStrategy, middlewares, autoContrast, attributes, target, ref, ...others } = props;
	const { dir } = useDirection();
	const arrowRef = (0, import_react.useRef)(null);
	const tooltip = useTooltip({
		position: getFloatingPosition(dir, position),
		closeDelay,
		openDelay,
		onPositionChange,
		opened,
		defaultOpened,
		events,
		arrowRef,
		arrowOffset,
		offset: typeof offset === "number" ? offset + (withArrow ? arrowSize / 2 : 0) : offset,
		inline,
		strategy: floatingStrategy,
		middlewares
	});
	(0, import_react.useEffect)(() => {
		const targetNode = target instanceof HTMLElement ? target : typeof target === "string" ? document.querySelector(target) : target?.current || null;
		if (targetNode) tooltip.reference(targetNode);
	}, [target, tooltip]);
	const getStyles = useStyles({
		name: "Tooltip",
		props,
		classes: Tooltip_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		rootSelector: "tooltip",
		vars,
		varsResolver
	});
	const child = getSingleElementChild(children);
	if (!target && !child) throw new Error("[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported");
	const tooltipStyles = getStyles("tooltip");
	if (target) {
		const transition = getTransitionProps(transitionProps, {
			duration: 100,
			transition: "fade"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalPortal, {
			...portalProps,
			withinPortal,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
				...transition,
				keepMounted,
				mounted: !disabled && !!tooltip.opened,
				duration: tooltip.isGroupPhase ? 10 : transition.duration,
				children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					...others,
					"data-fixed": floatingStrategy === "fixed" || void 0,
					variant,
					mod: [{ multiline }, mod],
					...tooltipStyles,
					...tooltip.getFloatingProps({
						ref: tooltip.floating,
						className: tooltipStyles.className,
						style: {
							...tooltipStyles.style,
							...transitionStyles,
							zIndex,
							top: tooltip.y ?? 0,
							left: tooltip.x ?? 0
						}
					}),
					children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingArrow, {
						ref: arrowRef,
						arrowX: tooltip.arrowX,
						arrowY: tooltip.arrowY,
						visible: withArrow,
						position: tooltip.placement,
						arrowSize,
						arrowOffset,
						arrowRadius,
						arrowPosition,
						...getStyles("arrow")
					})]
				})
			})
		}) });
	}
	const childProps = child.props;
	const targetRef = useMergedRef(tooltip.reference, getRefProp(child), ref);
	const transition = getTransitionProps(transitionProps, {
		duration: 100,
		transition: "fade"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalPortal, {
		...portalProps,
		withinPortal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
			...transition,
			keepMounted,
			mounted: !disabled && !!tooltip.opened,
			duration: tooltip.isGroupPhase ? 10 : transition.duration,
			children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				...others,
				"data-fixed": floatingStrategy === "fixed" || void 0,
				variant,
				mod: [{ multiline }, mod],
				...tooltip.getFloatingProps({
					ref: tooltip.floating,
					className: getStyles("tooltip").className,
					style: {
						...getStyles("tooltip").style,
						...transitionStyles,
						zIndex,
						top: tooltip.y ?? 0,
						left: tooltip.x ?? 0
					}
				}),
				children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingArrow, {
					ref: arrowRef,
					arrowX: tooltip.arrowX,
					arrowY: tooltip.arrowY,
					visible: withArrow,
					position: tooltip.placement,
					arrowSize,
					arrowOffset,
					arrowRadius,
					arrowPosition,
					...getStyles("arrow")
				})]
			})
		})
	}), (0, import_react.cloneElement)(child, tooltip.getReferenceProps({
		onClick,
		onMouseEnter,
		onMouseLeave,
		onMouseMove: props.onMouseMove,
		onPointerDown: props.onPointerDown,
		onPointerEnter: props.onPointerEnter,
		...childProps,
		className: clsx(className, childProps.className),
		[refProp]: targetRef
	}))] });
});
Tooltip.classes = Tooltip_module_default;
Tooltip.varsResolver = varsResolver;
Tooltip.displayName = "@mantine/core/Tooltip";
Tooltip.Floating = TooltipFloating;
Tooltip.Group = TooltipGroup;
//#endregion
export { Tooltip as t };
