import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { F as getRadius, I as getShadow, M as createVarsResolver, V as rem, b as useMantineEnv, d as useStyles, f as useProps, j as clsx, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { n as getSingleElementChild, t as OptionalPortal } from "./OptionalPortal-COfBOdxY.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as getDefaultZIndex } from "./get-default-z-index-DH-2Ba3K.js";
import { t as noop } from "./noop-BsaY-mWI.js";
import { i as useDidUpdate, t as Transition } from "./Transition-Cmaaz8Kh.js";
import { t as useIsomorphicEffect } from "./use-isomorphic-effect-n8PrQSeG.js";
import { i as useFocusReturn, n as Overlay, t as FocusTrap } from "./FocusTrap-BEeCNLEU.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { n as FloatingArrow, r as getRefProp, t as getFloatingPosition } from "./get-floating-position-DV1ZVGN3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useResolvedStylesApi } from "./use-resolved-styles-api-DyPXwNb0.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
import { _ as size, d as flip, f as hide, g as shift, h as offset, i as useFloating, m as limitShift, p as inline, u as arrow, v as autoUpdate } from "./floating-ui.react-UElBUAAs.js";
//#region node_modules/@mantine/core/esm/core/utils/close-on-escape/close-on-escape.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function closeOnEscape(callback, options = { active: true }) {
	if (typeof callback !== "function" || !options.active) return options.onKeyDown || noop;
	return (event) => {
		if (event.key === "Escape") {
			callback(event);
			options.onTrigger?.();
		}
	};
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-click-outside/use-click-outside.mjs
var DEFAULT_EVENTS = ["mousedown", "touchstart"];
function useClickOutside(callback, events, nodes, enabled = true) {
	const ref = (0, import_react.useRef)(null);
	const eventsList = events || DEFAULT_EVENTS;
	const listener = (0, import_react.useEffectEvent)((event) => {
		const { target } = event ?? {};
		if (!document.body.contains(target) && target?.tagName !== "HTML") return;
		const path = event.composedPath();
		if (Array.isArray(nodes)) nodes.every((node) => !!node && !path.includes(node)) && callback(event);
		else if (ref.current && !path.includes(ref.current)) callback(event);
	});
	const eventsKey = eventsList.join(",");
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const events = eventsKey.split(",");
		events.forEach((fn) => document.addEventListener(fn, listener));
		return () => {
			events.forEach((fn) => document.removeEventListener(fn, listener));
		};
	}, [eventsKey, enabled]);
	return ref;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Popover/Popover.context.mjs
var [PopoverContextProvider, usePopoverContext] = createSafeContext("Popover component was not found in the tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Popover/Popover.module.mjs
var Popover_module_default = {
	"dropdown": "m_38a85659",
	"arrow": "m_a31dc6c1",
	"overlay": "m_3d7bc908"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Popover/PopoverDropdown/PopoverDropdown.mjs
var import_jsx_runtime = require_jsx_runtime();
var PopoverDropdown = factory((_props) => {
	const props = useProps("PopoverDropdown", null, _props);
	const { className, style, vars, children, onKeyDownCapture, variant, classNames, styles, ref, ...others } = props;
	const ctx = usePopoverContext();
	const returnFocus = useFocusReturn({
		opened: ctx.opened,
		shouldReturnFocus: ctx.returnFocus
	});
	const accessibleProps = ctx.withRoles ? {
		"aria-labelledby": ctx.getTargetId(),
		id: ctx.getDropdownId(),
		role: "dialog",
		tabIndex: -1
	} : {};
	const mergedRef = useMergedRef(ref, ctx.floating);
	if (ctx.disabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalPortal, {
		...ctx.portalProps,
		withinPortal: ctx.withinPortal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
			mounted: ctx.opened,
			...ctx.transitionProps,
			transition: ctx.transitionProps?.transition || "fade",
			duration: ctx.transitionProps?.duration ?? 150,
			keepMounted: ctx.keepMounted,
			exitDuration: typeof ctx.transitionProps?.exitDuration === "number" ? ctx.transitionProps.exitDuration : ctx.transitionProps?.duration,
			children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTrap, {
				active: ctx.trapFocus && ctx.opened,
				innerRef: mergedRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					...accessibleProps,
					...others,
					variant,
					onKeyDownCapture: closeOnEscape(() => {
						ctx.onClose?.();
						ctx.onDismiss?.();
					}, {
						active: ctx.closeOnEscape,
						onTrigger: returnFocus,
						onKeyDown: onKeyDownCapture
					}),
					"data-position": ctx.placement,
					"data-fixed": ctx.floatingStrategy === "fixed" || void 0,
					...ctx.getStyles("dropdown", {
						className,
						props,
						classNames,
						styles,
						style: [
							{
								...transitionStyles,
								zIndex: ctx.zIndex,
								top: ctx.y ?? 0,
								left: ctx.x ?? 0,
								width: ctx.width === "target" ? void 0 : rem(ctx.width),
								...ctx.referenceHidden ? { display: "none" } : null
							},
							ctx.resolvedStyles?.dropdown,
							styles?.dropdown,
							style
						]
					}),
					children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingArrow, {
						ref: ctx.arrowRef,
						arrowX: ctx.arrowX,
						arrowY: ctx.arrowY,
						visible: ctx.withArrow,
						position: ctx.placement,
						arrowSize: ctx.arrowSize,
						arrowRadius: ctx.arrowRadius,
						arrowOffset: ctx.arrowOffset,
						arrowPosition: ctx.arrowPosition,
						...ctx.getStyles("arrow", {
							props,
							classNames,
							styles
						})
					})]
				})
			})
		})
	});
});
PopoverDropdown.classes = Popover_module_default;
PopoverDropdown.displayName = "@mantine/core/PopoverDropdown";
//#endregion
//#region node_modules/@mantine/core/esm/components/Popover/PopoverTarget/PopoverTarget.mjs
var defaultProps$1 = {
	refProp: "ref",
	popupType: "dialog"
};
var PopoverTarget = factory((props) => {
	const { children, refProp, popupType, ref, ...others } = useProps("PopoverTarget", defaultProps$1, props);
	const child = getSingleElementChild(children);
	if (!child) throw new Error("Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");
	const forwardedProps = others;
	const ctx = usePopoverContext();
	const targetRef = useMergedRef(ctx.reference, getRefProp(child), ref);
	const accessibleProps = ctx.withRoles ? {
		"aria-haspopup": popupType,
		"aria-expanded": ctx.opened,
		"aria-controls": ctx.opened ? ctx.getDropdownId() : void 0,
		id: ctx.getTargetId()
	} : {};
	const childProps = child.props;
	return (0, import_react.cloneElement)(child, {
		...forwardedProps,
		...accessibleProps,
		...ctx.targetProps,
		className: clsx(ctx.targetProps.className, forwardedProps.className, childProps.className),
		[refProp]: targetRef,
		...!ctx.controlled ? { onClick: (event) => {
			ctx.onToggle();
			childProps.onClick?.(event);
		} } : null
	});
});
PopoverTarget.displayName = "@mantine/core/PopoverTarget";
//#endregion
//#region node_modules/@mantine/core/esm/components/Popover/use-popover.mjs
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
function getPopoverMiddlewares(options, getFloating, env) {
	const middlewaresOptions = getDefaultMiddlewares(options.middlewares);
	const middlewares = [offset(options.offset), hide()];
	if (options.dropdownVisible && env !== "test" && options.preventPositionChangeWhenVisible) middlewaresOptions.flip = false;
	if (middlewaresOptions.flip) middlewares.push(typeof middlewaresOptions.flip === "boolean" ? flip() : flip(middlewaresOptions.flip));
	if (middlewaresOptions.shift) middlewares.push(shift(typeof middlewaresOptions.shift === "boolean" ? {
		limiter: limitShift(),
		padding: 5
	} : {
		limiter: limitShift(),
		padding: 5,
		...middlewaresOptions.shift
	}));
	if (middlewaresOptions.inline) middlewares.push(typeof middlewaresOptions.inline === "boolean" ? inline() : inline(middlewaresOptions.inline));
	middlewares.push(arrow({
		element: options.arrowRef,
		padding: options.arrowOffset
	}));
	if (middlewaresOptions.size || options.width === "target") middlewares.push(size({
		...typeof middlewaresOptions.size === "boolean" ? {} : middlewaresOptions.size,
		apply({ rects, availableWidth, availableHeight, ...rest }) {
			const styles = getFloating().refs.floating.current?.style ?? {};
			if (middlewaresOptions.size) if (typeof middlewaresOptions.size === "object" && !!middlewaresOptions.size.apply) middlewaresOptions.size.apply({
				rects,
				availableWidth,
				availableHeight,
				...rest
			});
			else Object.assign(styles, {
				maxWidth: `${availableWidth}px`,
				maxHeight: `${availableHeight}px`
			});
			if (options.width === "target") Object.assign(styles, { width: `${rects.reference.width}px` });
		}
	}));
	return middlewares;
}
function usePopover(options) {
	const env = useMantineEnv();
	const [_opened, setOpened] = useUncontrolled({
		value: options.opened,
		defaultValue: options.defaultOpened,
		finalValue: false,
		onChange: options.onChange
	});
	const previouslyOpened = (0, import_react.useRef)(_opened);
	const onClose = () => {
		if (_opened && !options.disabled) setOpened(false);
	};
	const onToggle = () => {
		if (!options.disabled) setOpened(!_opened);
	};
	const floating = useFloating({
		strategy: options.strategy,
		placement: options.preventPositionChangeWhenVisible ? options.positionRef.current : options.position,
		middleware: getPopoverMiddlewares(options, () => floating, env),
		whileElementsMounted: !options.keepMounted ? autoUpdate : void 0
	});
	(0, import_react.useEffect)(() => {
		if (!floating.refs.reference.current || !floating.refs.floating.current) return;
		if (_opened) return autoUpdate(floating.refs.reference.current, floating.refs.floating.current, floating.update);
	}, [_opened, floating.update]);
	useDidUpdate(() => {
		options.onPositionChange?.(floating.placement);
		options.positionRef.current = floating.placement;
	}, [floating.placement, options.preventPositionChangeWhenVisible]);
	useDidUpdate(() => {
		if (_opened !== previouslyOpened.current) if (!_opened) options.onClose?.();
		else options.onOpen?.();
		previouslyOpened.current = _opened;
	}, [
		_opened,
		options.onClose,
		options.onOpen
	]);
	useIsomorphicEffect(() => {
		let timeout = -1;
		if (_opened) timeout = window.setTimeout(() => options.setDropdownVisible(true), 4);
		return () => {
			window.clearTimeout(timeout);
		};
	}, [_opened, options.position]);
	return {
		floating,
		controlled: typeof options.opened === "boolean",
		opened: _opened,
		onClose,
		onToggle
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Popover/Popover.mjs
var defaultProps = {
	position: "bottom",
	offset: 8,
	transitionProps: {
		transition: "fade",
		duration: 150
	},
	middlewares: {
		flip: true,
		shift: true,
		inline: false
	},
	arrowSize: 7,
	arrowOffset: 5,
	arrowRadius: 0,
	arrowPosition: "side",
	closeOnClickOutside: true,
	withinPortal: true,
	closeOnEscape: true,
	trapFocus: false,
	withRoles: true,
	returnFocus: false,
	withOverlay: false,
	hideDetached: true,
	clickOutsideEvents: ["mousedown", "touchstart"],
	zIndex: getDefaultZIndex("popover"),
	__staticSelector: "Popover",
	width: "max-content"
};
var varsResolver = createVarsResolver((_, { radius, shadow }) => ({ dropdown: {
	"--popover-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--popover-shadow": getShadow(shadow)
} }));
function Popover(_props) {
	const props = useProps("Popover", defaultProps, _props);
	const { children, position, offset, onPositionChange, opened, transitionProps, onExitTransitionEnd, onEnterTransitionEnd, width, middlewares, withArrow, arrowSize, arrowOffset, arrowRadius, arrowPosition, unstyled, classNames, styles, closeOnClickOutside, withinPortal, portalProps, closeOnEscape, clickOutsideEvents, trapFocus, onClose, onDismiss, onOpen, onChange, zIndex, radius, shadow, id, defaultOpened, __staticSelector, withRoles, disabled, returnFocus, variant, keepMounted, vars, floatingStrategy, withOverlay, overlayProps, hideDetached, attributes, preventPositionChangeWhenVisible, ...others } = props;
	const getStyles = useStyles({
		name: __staticSelector,
		props,
		classes: Popover_module_default,
		classNames,
		styles,
		unstyled,
		attributes,
		rootSelector: "dropdown",
		vars,
		varsResolver
	});
	const { resolvedStyles } = useResolvedStylesApi({
		classNames,
		styles,
		props
	});
	const [dropdownVisible, setDropdownVisible] = (0, import_react.useState)(opened ?? defaultOpened ?? false);
	const positionRef = (0, import_react.useRef)(position);
	const arrowRef = (0, import_react.useRef)(null);
	const [targetNode, setTargetNode] = (0, import_react.useState)(null);
	const [dropdownNode, setDropdownNode] = (0, import_react.useState)(null);
	const { dir } = useDirection();
	const env = useMantineEnv();
	const uid = useId$1(id);
	const popover = usePopover({
		middlewares,
		width,
		position: getFloatingPosition(dir, position),
		offset: typeof offset === "number" ? offset + (withArrow ? arrowSize / 2 : 0) : offset,
		arrowRef,
		arrowOffset,
		onPositionChange,
		opened,
		defaultOpened,
		onChange,
		onOpen,
		onClose,
		onDismiss,
		strategy: floatingStrategy,
		dropdownVisible,
		setDropdownVisible,
		positionRef,
		disabled,
		preventPositionChangeWhenVisible,
		keepMounted
	});
	useClickOutside(() => {
		if (closeOnClickOutside) {
			popover.onClose();
			onDismiss?.();
		}
	}, clickOutsideEvents, [targetNode, dropdownNode]);
	const reference = (0, import_react.useCallback)((node) => {
		setTargetNode(node);
		popover.floating.refs.setReference(node);
	}, [popover.floating.refs.setReference]);
	const floating = (0, import_react.useCallback)((node) => {
		setDropdownNode(node);
		popover.floating.refs.setFloating(node);
	}, [popover.floating.refs.setFloating]);
	const onExited = (0, import_react.useCallback)(() => {
		transitionProps?.onExited?.();
		onExitTransitionEnd?.();
		setDropdownVisible(false);
		if (!preventPositionChangeWhenVisible) positionRef.current = position;
	}, [
		transitionProps?.onExited,
		onExitTransitionEnd,
		preventPositionChangeWhenVisible,
		position
	]);
	const onEntered = (0, import_react.useCallback)(() => {
		transitionProps?.onEntered?.();
		onEnterTransitionEnd?.();
	}, [transitionProps?.onEntered, onEnterTransitionEnd]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContextProvider, {
		value: {
			returnFocus,
			disabled,
			controlled: popover.controlled,
			reference,
			floating,
			x: popover.floating.x,
			y: popover.floating.y,
			arrowX: popover.floating?.middlewareData?.arrow?.x,
			arrowY: popover.floating?.middlewareData?.arrow?.y,
			opened: popover.opened,
			arrowRef,
			transitionProps: {
				...transitionProps,
				onExited,
				onEntered
			},
			width,
			withArrow,
			arrowSize,
			arrowOffset,
			arrowRadius,
			arrowPosition,
			placement: popover.floating.placement,
			trapFocus,
			withinPortal,
			portalProps,
			zIndex,
			radius,
			shadow,
			closeOnEscape,
			onDismiss,
			onClose: popover.onClose,
			onToggle: popover.onToggle,
			getTargetId: () => uid,
			getDropdownId: () => `${uid}-dropdown`,
			withRoles,
			targetProps: others,
			__staticSelector,
			classNames,
			styles,
			unstyled,
			variant,
			keepMounted,
			getStyles,
			resolvedStyles,
			floatingStrategy,
			referenceHidden: hideDetached && env !== "test" ? popover.floating.middlewareData.hide?.referenceHidden : false
		},
		children: [children, withOverlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
			transition: "fade",
			mounted: popover.opened,
			duration: transitionProps?.duration || 250,
			exitDuration: transitionProps?.exitDuration || 250,
			children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalPortal, {
				withinPortal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
					...overlayProps,
					...getStyles("overlay", {
						className: overlayProps?.className,
						style: [transitionStyles, overlayProps?.style]
					})
				})
			})
		})]
	});
}
Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.varsResolver = varsResolver;
Popover.displayName = "@mantine/core/Popover";
Popover.extend = (input) => input;
Popover.withProps = (fixedProps) => {
	const Extended = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover, {
		...fixedProps,
		...props
	});
	Extended.extend = Popover.extend;
	Extended.displayName = `WithProps(${Popover.displayName})`;
	return Extended;
};
//#endregion
export { Popover as t };
