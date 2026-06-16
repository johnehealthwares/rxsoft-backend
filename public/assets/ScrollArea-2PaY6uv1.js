import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { M as createVarsResolver, V as rem, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as useIsomorphicEffect } from "./use-isomorphic-effect-n8PrQSeG.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
import { c as useMergeRefs } from "./floating-ui.react-UElBUAAs.js";
//#region node_modules/@mantine/hooks/esm/utils/use-callback-ref/use-callback-ref.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCallbackRef(callback) {
	const callbackRef = (0, import_react.useRef)(callback);
	(0, import_react.useEffect)(() => {
		callbackRef.current = callback;
	});
	return (0, import_react.useMemo)(() => ((...args) => callbackRef.current?.(...args)), []);
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-debounced-callback/use-debounced-callback.mjs
function useDebouncedCallback(callback, options) {
	const { delay, flushOnUnmount, leading, maxWait } = typeof options === "number" ? {
		delay: options,
		flushOnUnmount: false,
		leading: false,
		maxWait: void 0
	} : options;
	const handleCallback = useCallbackRef(callback);
	const debounceTimerRef = (0, import_react.useRef)(0);
	const maxWaitTimerRef = (0, import_react.useRef)(0);
	const latestArgsRef = (0, import_react.useRef)(null);
	const lastCallback = (0, import_react.useMemo)(() => {
		const currentCallback = Object.assign((...args) => {
			window.clearTimeout(debounceTimerRef.current);
			latestArgsRef.current = args;
			const isFirstCall = currentCallback._isFirstCall;
			currentCallback._isFirstCall = false;
			function clearTimeoutAndLeadingRef() {
				window.clearTimeout(debounceTimerRef.current);
				window.clearTimeout(maxWaitTimerRef.current);
				debounceTimerRef.current = 0;
				maxWaitTimerRef.current = 0;
				currentCallback._isFirstCall = true;
				currentCallback._hasPendingCallback = false;
			}
			function startMaxWaitTimer() {
				if (maxWait !== void 0 && maxWaitTimerRef.current === 0) maxWaitTimerRef.current = window.setTimeout(() => {
					if (debounceTimerRef.current !== 0) {
						const latestArgs = latestArgsRef.current;
						clearTimeoutAndLeadingRef();
						handleCallback(...latestArgs);
					}
				}, maxWait);
			}
			if (leading && isFirstCall) {
				handleCallback(...args);
				const resetLeadingState = () => {
					clearTimeoutAndLeadingRef();
				};
				const flush = () => {
					if (debounceTimerRef.current !== 0) {
						clearTimeoutAndLeadingRef();
						handleCallback(...args);
					}
				};
				const cancel = () => {
					clearTimeoutAndLeadingRef();
				};
				currentCallback.flush = flush;
				currentCallback.cancel = cancel;
				debounceTimerRef.current = window.setTimeout(resetLeadingState, delay);
				startMaxWaitTimer();
				return;
			}
			if (leading && !isFirstCall) {
				currentCallback._hasPendingCallback = true;
				const flush = () => {
					if (debounceTimerRef.current !== 0) {
						clearTimeoutAndLeadingRef();
						handleCallback(...args);
					}
				};
				const cancel = () => {
					clearTimeoutAndLeadingRef();
				};
				currentCallback.flush = flush;
				currentCallback.cancel = cancel;
				const resetLeadingState = () => {
					clearTimeoutAndLeadingRef();
				};
				debounceTimerRef.current = window.setTimeout(resetLeadingState, delay);
				startMaxWaitTimer();
				return;
			}
			currentCallback._hasPendingCallback = true;
			const flush = () => {
				if (debounceTimerRef.current !== 0) {
					clearTimeoutAndLeadingRef();
					handleCallback(...args);
				}
			};
			const cancel = () => {
				clearTimeoutAndLeadingRef();
			};
			currentCallback.flush = flush;
			currentCallback.cancel = cancel;
			debounceTimerRef.current = window.setTimeout(flush, delay);
			startMaxWaitTimer();
		}, {
			flush: () => {},
			cancel: () => {},
			isPending: () => currentCallback._hasPendingCallback,
			_isFirstCall: true,
			_hasPendingCallback: false
		});
		return currentCallback;
	}, [
		handleCallback,
		delay,
		leading,
		maxWait
	]);
	(0, import_react.useEffect)(() => () => {
		if (flushOnUnmount) lastCallback.flush();
		else lastCallback.cancel();
	}, [lastCallback, flushOnUnmount]);
	return lastCallback;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.context.mjs
var [ScrollAreaProvider, useScrollAreaContext] = createSafeContext("ScrollArea.Root component was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/use-resize-observer.mjs
function useResizeObserver(element, onResize) {
	const handleResize = (0, import_react.useEffectEvent)(onResize);
	useIsomorphicEffect(() => {
		let rAF = 0;
		if (element) {
			const resizeObserver = new ResizeObserver(() => {
				cancelAnimationFrame(rAF);
				rAF = window.requestAnimationFrame(handleResize);
			});
			resizeObserver.observe(element);
			return () => {
				window.cancelAnimationFrame(rAF);
				resizeObserver.unobserve(element);
			};
		}
	}, [element]);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaCorner/ScrollAreaCorner.mjs
var import_jsx_runtime = require_jsx_runtime();
function Corner(props) {
	const { style, ...others } = props;
	const ctx = useScrollAreaContext();
	const [width, setWidth] = (0, import_react.useState)(0);
	const [height, setHeight] = (0, import_react.useState)(0);
	const hasSize = Boolean(width && height);
	useResizeObserver(ctx.scrollbarX, () => {
		const h = ctx.scrollbarX?.offsetHeight || 0;
		ctx.onCornerHeightChange(h);
		setHeight(h);
	});
	useResizeObserver(ctx.scrollbarY, () => {
		const w = ctx.scrollbarY?.offsetWidth || 0;
		ctx.onCornerWidthChange(w);
		setWidth(w);
	});
	return hasSize ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...others,
		style: {
			...style,
			width,
			height
		}
	}) : null;
}
function ScrollAreaCorner(props) {
	const ctx = useScrollAreaContext();
	const hasBothScrollbarsVisible = Boolean(ctx.scrollbarX && ctx.scrollbarY);
	return ctx.type !== "scroll" && hasBothScrollbarsVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { ...props }) : null;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaRoot/ScrollAreaRoot.mjs
var defaultProps$1 = {
	scrollHideDelay: 1e3,
	type: "hover"
};
function ScrollAreaRoot(_props) {
	const { type, scrollHideDelay, scrollbars, getStyles, ref, ...others } = useProps("ScrollAreaRoot", defaultProps$1, _props);
	const [scrollArea, setScrollArea] = (0, import_react.useState)(null);
	const [viewport, setViewport] = (0, import_react.useState)(null);
	const [content, setContent] = (0, import_react.useState)(null);
	const [scrollbarX, setScrollbarX] = (0, import_react.useState)(null);
	const [scrollbarY, setScrollbarY] = (0, import_react.useState)(null);
	const [cornerWidth, setCornerWidth] = (0, import_react.useState)(0);
	const [cornerHeight, setCornerHeight] = (0, import_react.useState)(0);
	const [scrollbarXEnabled, setScrollbarXEnabled] = (0, import_react.useState)(false);
	const [scrollbarYEnabled, setScrollbarYEnabled] = (0, import_react.useState)(false);
	const rootRef = useMergedRef(ref, (node) => setScrollArea(node));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaProvider, {
		value: {
			type,
			scrollHideDelay,
			scrollArea,
			viewport,
			onViewportChange: setViewport,
			content,
			onContentChange: setContent,
			scrollbarX,
			onScrollbarXChange: setScrollbarX,
			scrollbarXEnabled,
			onScrollbarXEnabledChange: setScrollbarXEnabled,
			scrollbarY,
			onScrollbarYChange: setScrollbarY,
			scrollbarYEnabled,
			onScrollbarYEnabledChange: setScrollbarYEnabled,
			onCornerWidthChange: setCornerWidth,
			onCornerHeightChange: setCornerHeight,
			getStyles
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...others,
			ref: rootRef,
			__vars: {
				"--sa-corner-width": scrollbars !== "xy" ? "0px" : `${cornerWidth}px`,
				"--sa-corner-height": scrollbars !== "xy" ? "0px" : `${cornerHeight}px`
			}
		})
	});
}
ScrollAreaRoot.displayName = "@mantine/core/ScrollAreaRoot";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/get-thumb-ratio.mjs
function getThumbRatio(viewportSize, contentSize) {
	const ratio = viewportSize / contentSize;
	return Number.isNaN(ratio) ? 0 : ratio;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/get-thumb-size.mjs
function getThumbSize(sizes) {
	const ratio = getThumbRatio(sizes.viewport, sizes.content);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
	return Math.max(thumbSize, 18);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/linear-scale.mjs
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/get-thumb-offset-from-scroll.mjs
function clamp(value, [min, max]) {
	return Math.min(max, Math.max(min, value));
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
	const thumbSizePx = getThumbSize(sizes);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const scrollbar = sizes.scrollbar.size - scrollbarPadding;
	const maxScrollPos = sizes.content - sizes.viewport;
	const maxThumbPos = scrollbar - thumbSizePx;
	const scrollWithoutMomentum = clamp(scrollPos, dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0]);
	return linearScale([0, maxScrollPos], [0, maxThumbPos])(scrollWithoutMomentum);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/get-scroll-position-from-pointer.mjs
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
	const thumbSizePx = getThumbSize(sizes);
	const thumbCenter = thumbSizePx / 2;
	const offset = pointerOffset || thumbCenter;
	const thumbOffsetFromEnd = thumbSizePx - offset;
	const minPointerPos = sizes.scrollbar.paddingStart + offset;
	const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
	const maxScrollPos = sizes.content - sizes.viewport;
	const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
	return linearScale([minPointerPos, maxPointerPos], scrollRange)(pointerPos);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/is-scrolling-within-scrollbar-bounds.mjs
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
	return scrollPos > 0 && scrollPos < maxScrollPos;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/to-int.mjs
function toInt(value) {
	return value ? parseInt(value, 10) : 0;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/compose-event-handlers.mjs
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return (event) => {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event.defaultPrevented) ourEventHandler?.(event);
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/Scrollbar.context.mjs
var [ScrollbarProvider, useScrollbarContext] = createSafeContext("ScrollAreaScrollbar was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/Scrollbar.mjs
function Scrollbar(props) {
	const { sizes, hasThumb, onThumbChange, onThumbPointerUp, onThumbPointerDown, onThumbPositionChange, onDragScroll, onWheelScroll, onResize, ref, ...scrollbarProps } = props;
	const context = useScrollAreaContext();
	const [scrollbar, setScrollbar] = (0, import_react.useState)(null);
	const composeRefs = useMergedRef(ref, (node) => setScrollbar(node));
	const rectRef = (0, import_react.useRef)(null);
	const prevWebkitUserSelectRef = (0, import_react.useRef)("");
	const { viewport } = context;
	const maxScrollPos = sizes.content - sizes.viewport;
	const handleWheelScroll = (0, import_react.useEffectEvent)(onWheelScroll);
	const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
	const handleResize = useDebouncedCallback(onResize, 10);
	const handleDragScroll = (event) => {
		if (rectRef.current) onDragScroll({
			x: event.clientX - rectRef.current.left,
			y: event.clientY - rectRef.current.top
		});
	};
	(0, import_react.useEffect)(() => {
		const handleWheel = (event) => {
			const element = event.target;
			if (scrollbar?.contains(element)) handleWheelScroll(event, maxScrollPos);
		};
		document.addEventListener("wheel", handleWheel, { passive: false });
		return () => document.removeEventListener("wheel", handleWheel, { passive: false });
	}, [
		viewport,
		scrollbar,
		maxScrollPos
	]);
	(0, import_react.useEffect)(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
	useResizeObserver(scrollbar, handleResize);
	useResizeObserver(context.content, handleResize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollbarProvider, {
		value: {
			scrollbar,
			hasThumb,
			onThumbChange: useCallbackRef(onThumbChange),
			onThumbPointerUp: useCallbackRef(onThumbPointerUp),
			onThumbPositionChange: handleThumbPositionChange,
			onThumbPointerDown: useCallbackRef(onThumbPointerDown)
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...scrollbarProps,
			ref: composeRefs,
			"data-mantine-scrollbar": true,
			style: {
				position: "absolute",
				...scrollbarProps.style
			},
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				event.preventDefault();
				if (event.button === 0) {
					event.target.setPointerCapture(event.pointerId);
					rectRef.current = scrollbar.getBoundingClientRect();
					prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
					document.body.style.webkitUserSelect = "none";
					handleDragScroll(event);
				}
			}),
			onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
			onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
				const element = event.target;
				if (element.hasPointerCapture(event.pointerId)) {
					event.preventDefault();
					element.releasePointerCapture(event.pointerId);
				}
			}),
			onLostPointerCapture: () => {
				document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
				rectRef.current = null;
			}
		})
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollbarX.mjs
var ScrollAreaScrollbarX = (props) => {
	const { sizes, onSizesChange, style, ref: forwardedRef, ...others } = props;
	const ctx = useScrollAreaContext();
	const [computedStyle, setComputedStyle] = (0, import_react.useState)();
	const ref = (0, import_react.useRef)(null);
	const composeRefs = useMergedRef(forwardedRef, ref, ctx.onScrollbarXChange);
	(0, import_react.useEffect)(() => {
		if (ref.current) setComputedStyle(getComputedStyle(ref.current));
	}, [ref]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
		"data-orientation": "horizontal",
		...others,
		ref: composeRefs,
		sizes,
		style: {
			...style,
			["--sa-thumb-width"]: `${getThumbSize(sizes)}px`
		},
		onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
		onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
		onWheelScroll: (event, maxScrollPos) => {
			if (ctx.viewport) {
				const scrollPos = ctx.viewport.scrollLeft + event.deltaX;
				props.onWheelScroll(scrollPos);
				if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
			}
		},
		onResize: () => {
			if (ref.current && ctx.viewport && computedStyle) onSizesChange({
				content: ctx.viewport.scrollWidth,
				viewport: ctx.viewport.offsetWidth,
				scrollbar: {
					size: ref.current.clientWidth,
					paddingStart: toInt(computedStyle.paddingLeft),
					paddingEnd: toInt(computedStyle.paddingRight)
				}
			});
		}
	});
};
ScrollAreaScrollbarX.displayName = "@mantine/core/ScrollAreaScrollbarX";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollbarY.mjs
function ScrollAreaScrollbarY(props) {
	const { sizes, onSizesChange, style, ref: forwardedRef, ...others } = props;
	const context = useScrollAreaContext();
	const [computedStyle, setComputedStyle] = (0, import_react.useState)();
	const ref = (0, import_react.useRef)(null);
	const composeRefs = useMergedRef(forwardedRef, ref, context.onScrollbarYChange);
	(0, import_react.useEffect)(() => {
		if (ref.current) setComputedStyle(window.getComputedStyle(ref.current));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
		...others,
		"data-orientation": "vertical",
		ref: composeRefs,
		sizes,
		style: {
			["--sa-thumb-height"]: `${getThumbSize(sizes)}px`,
			...style
		},
		onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
		onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
		onWheelScroll: (event, maxScrollPos) => {
			if (context.viewport) {
				const scrollPos = context.viewport.scrollTop + event.deltaY;
				props.onWheelScroll(scrollPos);
				if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
			}
		},
		onResize: () => {
			if (ref.current && context.viewport && computedStyle) onSizesChange({
				content: context.viewport.scrollHeight,
				viewport: context.viewport.offsetHeight,
				scrollbar: {
					size: ref.current.clientHeight,
					paddingStart: toInt(computedStyle.paddingTop),
					paddingEnd: toInt(computedStyle.paddingBottom)
				}
			});
		}
	});
}
ScrollAreaScrollbarY.displayName = "@mantine/core/ScrollAreaScrollbarY";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarVisible.mjs
function ScrollAreaScrollbarVisible(props) {
	const { orientation = "vertical", ...scrollbarProps } = props;
	const { dir } = useDirection();
	const context = useScrollAreaContext();
	const thumbRef = (0, import_react.useRef)(null);
	const pointerOffsetRef = (0, import_react.useRef)(0);
	const [sizes, setSizes] = (0, import_react.useState)({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	});
	const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
	const commonProps = {
		...scrollbarProps,
		sizes,
		onSizesChange: setSizes,
		hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
		onThumbChange: (thumb) => {
			thumbRef.current = thumb;
		},
		onThumbPointerUp: () => {
			pointerOffsetRef.current = 0;
		},
		onThumbPointerDown: (pointerPos) => {
			pointerOffsetRef.current = pointerPos;
		}
	};
	const getScrollPosition = (pointerPos, direction) => getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, direction);
	if (orientation === "horizontal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarX, {
		...commonProps,
		onThumbPositionChange: () => {
			if (context.viewport && thumbRef.current) {
				const scrollPos = context.viewport.scrollLeft;
				const offset = getThumbOffsetFromScroll(scrollPos, sizes, dir);
				thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
			}
		},
		onWheelScroll: (scrollPos) => {
			if (context.viewport) context.viewport.scrollLeft = scrollPos;
		},
		onDragScroll: (pointerPos) => {
			if (context.viewport) context.viewport.scrollLeft = getScrollPosition(pointerPos, dir);
		}
	});
	if (orientation === "vertical") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarY, {
		...commonProps,
		onThumbPositionChange: () => {
			if (context.viewport && thumbRef.current) {
				const scrollPos = context.viewport.scrollTop;
				const offset = getThumbOffsetFromScroll(scrollPos, sizes);
				if (sizes.scrollbar.size === 0) thumbRef.current.style.setProperty("--thumb-opacity", "0");
				else thumbRef.current.style.setProperty("--thumb-opacity", "1");
				thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
			}
		},
		onWheelScroll: (scrollPos) => {
			if (context.viewport) context.viewport.scrollTop = scrollPos;
		},
		onDragScroll: (pointerPos) => {
			if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
		}
	});
	return null;
}
ScrollAreaScrollbarVisible.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarAuto.mjs
function ScrollAreaScrollbarAuto(props) {
	const context = useScrollAreaContext();
	const { forceMount, ...scrollbarProps } = props;
	const [visible, setVisible] = (0, import_react.useState)(false);
	const isHorizontal = props.orientation === "horizontal";
	const handleResize = useDebouncedCallback(() => {
		if (context.viewport) {
			const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
			const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
			setVisible(isHorizontal ? isOverflowX : isOverflowY);
		}
	}, 10);
	useResizeObserver(context.viewport, handleResize);
	useResizeObserver(context.content, handleResize);
	if (forceMount || visible) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
		"data-state": visible ? "visible" : "hidden",
		...scrollbarProps
	});
	return null;
}
ScrollAreaScrollbarAuto.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarHover.mjs
function ScrollAreaScrollbarHover(props) {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext();
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const { scrollArea } = context;
		let hideTimer = 0;
		if (scrollArea) {
			const handlePointerEnter = () => {
				window.clearTimeout(hideTimer);
				setVisible(true);
			};
			const handlePointerLeave = () => {
				hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
			};
			scrollArea.addEventListener("pointerenter", handlePointerEnter);
			scrollArea.addEventListener("pointerleave", handlePointerLeave);
			return () => {
				window.clearTimeout(hideTimer);
				scrollArea.removeEventListener("pointerenter", handlePointerEnter);
				scrollArea.removeEventListener("pointerleave", handlePointerLeave);
			};
		}
	}, [context.scrollArea, context.scrollHideDelay]);
	if (forceMount || visible) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarAuto, {
		"data-state": visible ? "visible" : "hidden",
		...scrollbarProps
	});
	return null;
}
ScrollAreaScrollbarHover.displayName = "@mantine/core/ScrollAreaScrollbarHover";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarScroll.mjs
function ScrollAreaScrollbarScroll(props) {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext();
	const isHorizontal = props.orientation === "horizontal";
	const [state, setState] = (0, import_react.useState)("hidden");
	const debounceScrollEnd = useDebouncedCallback(() => setState("idle"), 100);
	(0, import_react.useEffect)(() => {
		if (state === "idle") {
			const hideTimer = window.setTimeout(() => setState("hidden"), context.scrollHideDelay);
			return () => window.clearTimeout(hideTimer);
		}
	}, [state, context.scrollHideDelay]);
	(0, import_react.useEffect)(() => {
		const { viewport } = context;
		const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
		if (viewport) {
			let prevScrollPos = viewport[scrollDirection];
			const handleScroll = () => {
				const scrollPos = viewport[scrollDirection];
				if (prevScrollPos !== scrollPos) {
					setState("scrolling");
					debounceScrollEnd();
				}
				prevScrollPos = scrollPos;
			};
			viewport.addEventListener("scroll", handleScroll);
			return () => viewport.removeEventListener("scroll", handleScroll);
		}
	}, [
		context.viewport,
		isHorizontal,
		debounceScrollEnd
	]);
	if (forceMount || state !== "hidden") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
		"data-state": state === "hidden" ? "hidden" : "visible",
		...scrollbarProps,
		onPointerEnter: composeEventHandlers(props.onPointerEnter, () => setState("interacting")),
		onPointerLeave: composeEventHandlers(props.onPointerLeave, () => setState("idle"))
	});
	return null;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbar.mjs
function ScrollAreaScrollbar(props) {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext();
	const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
	const isHorizontal = props.orientation === "horizontal";
	(0, import_react.useEffect)(() => {
		isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
		return () => {
			isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
		};
	}, [
		isHorizontal,
		onScrollbarXEnabledChange,
		onScrollbarYEnabledChange
	]);
	return context.type === "hover" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarHover, {
		...scrollbarProps,
		forceMount
	}) : context.type === "scroll" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarScroll, {
		...scrollbarProps,
		forceMount
	}) : context.type === "auto" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarAuto, {
		...scrollbarProps,
		forceMount
	}) : context.type === "always" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, { ...scrollbarProps }) : null;
}
ScrollAreaScrollbar.displayName = "@mantine/core/ScrollAreaScrollbar";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/utils/add-unlinked-scroll-listener.mjs
function addUnlinkedScrollListener(node, handler = () => {}) {
	let prevPosition = {
		left: node.scrollLeft,
		top: node.scrollTop
	};
	let rAF = 0;
	(function loop() {
		const position = {
			left: node.scrollLeft,
			top: node.scrollTop
		};
		const isHorizontalScroll = prevPosition.left !== position.left;
		const isVerticalScroll = prevPosition.top !== position.top;
		if (isHorizontalScroll || isVerticalScroll) handler();
		prevPosition = position;
		rAF = window.requestAnimationFrame(loop);
	})();
	return () => window.cancelAnimationFrame(rAF);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaThumb/ScrollAreaThumb.mjs
function Thumb(props) {
	const { style, ref: forwardedRef, ...others } = props;
	const scrollAreaContext = useScrollAreaContext();
	const scrollbarContext = useScrollbarContext();
	const { onThumbPositionChange } = scrollbarContext;
	const composedRef = useMergedRef(forwardedRef, (node) => scrollbarContext.onThumbChange(node));
	const removeUnlinkedScrollListenerRef = (0, import_react.useRef)(void 0);
	const debounceScrollEnd = useDebouncedCallback(() => {
		if (removeUnlinkedScrollListenerRef.current) {
			removeUnlinkedScrollListenerRef.current();
			removeUnlinkedScrollListenerRef.current = void 0;
		}
	}, 100);
	(0, import_react.useEffect)(() => {
		const { viewport } = scrollAreaContext;
		if (viewport) {
			const handleScroll = () => {
				debounceScrollEnd();
				if (!removeUnlinkedScrollListenerRef.current) {
					removeUnlinkedScrollListenerRef.current = addUnlinkedScrollListener(viewport, onThumbPositionChange);
					onThumbPositionChange();
				}
			};
			onThumbPositionChange();
			viewport.addEventListener("scroll", handleScroll);
			return () => viewport.removeEventListener("scroll", handleScroll);
		}
	}, [
		scrollAreaContext.viewport,
		debounceScrollEnd,
		onThumbPositionChange
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
		...others,
		ref: composedRef,
		style: {
			width: "var(--sa-thumb-width)",
			height: "var(--sa-thumb-height)",
			...style
		},
		onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
			const thumbRect = event.target.getBoundingClientRect();
			const x = event.clientX - thumbRect.left;
			const y = event.clientY - thumbRect.top;
			scrollbarContext.onThumbPointerDown({
				x,
				y
			});
		}),
		onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
	});
}
Thumb.displayName = "@mantine/core/ScrollAreaThumb";
function ScrollAreaThumb(props) {
	const { forceMount, ...thumbProps } = props;
	const scrollbarContext = useScrollbarContext();
	if (forceMount || scrollbarContext.hasThumb) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { ...thumbProps });
	return null;
}
ScrollAreaThumb.displayName = "@mantine/core/ScrollAreaThumb";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaViewport/ScrollAreaViewport.mjs
function ScrollAreaViewport({ children, style, ref, onWheel, ...others }) {
	const ctx = useScrollAreaContext();
	const rootRef = useMergedRef(ref, ctx.onViewportChange);
	const handleWheel = (event) => {
		onWheel?.(event);
		if (ctx.scrollbarXEnabled && ctx.viewport && event.shiftKey) {
			const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = ctx.viewport;
			const isAtTop = scrollTop < 1;
			const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1;
			if (scrollWidth > clientWidth && (isAtTop || isAtBottom)) event.stopPropagation();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...others,
		ref: rootRef,
		onWheel: handleWheel,
		style: {
			overflowX: ctx.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: ctx.scrollbarYEnabled ? "scroll" : "hidden",
			...style
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...ctx.getStyles("content"),
			ref: ctx.onContentChange,
			children
		})
	});
}
ScrollAreaViewport.displayName = "@mantine/core/ScrollAreaViewport";
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.module.mjs
var ScrollArea_module_default = {
	"root": "m_d57069b5",
	"content": "m_b1336c6",
	"viewport": "m_c0783ff9",
	"viewportInner": "m_f8f631dd",
	"scrollbar": "m_c44ba933",
	"thumb": "m_d8b5e363",
	"corner": "m_21657268"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.mjs
var defaultProps = {
	scrollHideDelay: 1e3,
	type: "hover",
	scrollbars: "xy"
};
var varsResolver = createVarsResolver((_, { scrollbarSize, overscrollBehavior, scrollbars }) => {
	let overrideOverscrollBehavior = overscrollBehavior;
	if (overscrollBehavior && scrollbars) {
		if (scrollbars === "x") overrideOverscrollBehavior = `${overscrollBehavior} auto`;
		else if (scrollbars === "y") overrideOverscrollBehavior = `auto ${overscrollBehavior}`;
	}
	return { root: {
		"--scrollarea-scrollbar-size": rem(scrollbarSize),
		"--scrollarea-over-scroll-behavior": overrideOverscrollBehavior
	} };
});
var ScrollArea = factory((_props) => {
	const props = useProps("ScrollArea", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, scrollbarSize, vars, type, scrollHideDelay, viewportProps, viewportRef, onScrollPositionChange, children, offsetScrollbars, scrollbars, onBottomReached, onTopReached, onLeftReached, onRightReached, overscrollBehavior, startScrollPosition, attributes, ...others } = props;
	const [scrollbarHovered, setScrollbarHovered] = (0, import_react.useState)(false);
	const [verticalThumbVisible, setVerticalThumbVisible] = (0, import_react.useState)(false);
	const [horizontalThumbVisible, setHorizontalThumbVisible] = (0, import_react.useState)(false);
	const prevAtTopRef = (0, import_react.useRef)(true);
	const prevAtBottomRef = (0, import_react.useRef)(false);
	const prevAtLeftRef = (0, import_react.useRef)(true);
	const prevAtRightRef = (0, import_react.useRef)(false);
	const getStyles = useStyles({
		name: "ScrollArea",
		props,
		classes: ScrollArea_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	const localViewportRef = (0, import_react.useRef)(null);
	const [viewportElement, setViewportElement] = (0, import_react.useState)(null);
	const combinedViewportRef = useMergeRefs([
		viewportRef,
		localViewportRef,
		(0, import_react.useCallback)((node) => {
			setViewportElement((current) => current === node ? current : node);
		}, [])
	]);
	useResizeObserver(offsetScrollbars === "present" ? viewportElement : null, () => {
		const element = localViewportRef.current;
		if (element) {
			setVerticalThumbVisible(element.scrollHeight > element.clientHeight);
			setHorizontalThumbVisible(element.scrollWidth > element.clientWidth);
		}
	});
	useIsomorphicEffect(() => {
		if (startScrollPosition && localViewportRef.current) localViewportRef.current.scrollTo({
			left: startScrollPosition.x ?? 0,
			top: startScrollPosition.y ?? 0
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollAreaRoot, {
		getStyles,
		type: type === "never" ? "always" : type,
		scrollHideDelay,
		scrollbars,
		...getStyles("root"),
		...others,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaViewport, {
				...viewportProps,
				...getStyles("viewport", { style: viewportProps?.style }),
				ref: combinedViewportRef,
				"data-offset-scrollbars": offsetScrollbars === true ? "xy" : offsetScrollbars || void 0,
				"data-scrollbars": scrollbars || void 0,
				"data-horizontal-hidden": offsetScrollbars === "present" && !horizontalThumbVisible ? "true" : void 0,
				"data-vertical-hidden": offsetScrollbars === "present" && !verticalThumbVisible ? "true" : void 0,
				onScroll: (e) => {
					viewportProps?.onScroll?.(e);
					onScrollPositionChange?.({
						x: e.currentTarget.scrollLeft,
						y: e.currentTarget.scrollTop
					});
					const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
					const isAtBottom = scrollTop - (scrollHeight - clientHeight) >= -.8;
					const isAtTop = scrollTop === 0;
					if (isAtBottom && !prevAtBottomRef.current) onBottomReached?.();
					if (isAtTop && !prevAtTopRef.current) onTopReached?.();
					prevAtBottomRef.current = isAtBottom;
					prevAtTopRef.current = isAtTop;
					const isAtRight = scrollLeft - (scrollWidth - clientWidth) >= -.8;
					const isAtLeft = scrollLeft === 0;
					if (isAtRight && !prevAtRightRef.current) onRightReached?.();
					if (isAtLeft && !prevAtLeftRef.current) onLeftReached?.();
					prevAtRightRef.current = isAtRight;
					prevAtLeftRef.current = isAtLeft;
				},
				children
			}),
			(scrollbars === "xy" || scrollbars === "x") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
				...getStyles("scrollbar"),
				orientation: "horizontal",
				"data-hidden": type === "never" || offsetScrollbars === "present" && !horizontalThumbVisible ? true : void 0,
				forceMount: true,
				onMouseEnter: () => setScrollbarHovered(true),
				onMouseLeave: () => setScrollbarHovered(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { ...getStyles("thumb") })
			}),
			(scrollbars === "xy" || scrollbars === "y") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
				...getStyles("scrollbar"),
				orientation: "vertical",
				"data-hidden": type === "never" || offsetScrollbars === "present" && !verticalThumbVisible ? true : void 0,
				forceMount: true,
				onMouseEnter: () => setScrollbarHovered(true),
				onMouseLeave: () => setScrollbarHovered(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { ...getStyles("thumb") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaCorner, {
				...getStyles("corner"),
				"data-hovered": scrollbarHovered || void 0,
				"data-hidden": type === "never" || void 0
			})
		]
	});
});
ScrollArea.displayName = "@mantine/core/ScrollArea";
var ScrollAreaAutosize = factory((props) => {
	const { children, classNames, styles, scrollbarSize, scrollHideDelay, type, dir, offsetScrollbars, overscrollBehavior, viewportRef, onScrollPositionChange, unstyled, variant, viewportProps, scrollbars, style, vars, onBottomReached, onTopReached, startScrollPosition, onOverflowChange, ...others } = useProps("ScrollAreaAutosize", defaultProps, props);
	const viewportObserverRef = (0, import_react.useRef)(null);
	const [viewportObserverElement, setViewportObserverElement] = (0, import_react.useState)(null);
	const combinedViewportRef = useMergeRefs([
		viewportRef,
		viewportObserverRef,
		(0, import_react.useCallback)((node) => {
			setViewportObserverElement((current) => current === node ? current : node);
		}, [])
	]);
	const overflowingRef = (0, import_react.useRef)(false);
	const didMountRef = (0, import_react.useRef)(false);
	const handleOverflowCheck = (0, import_react.useEffectEvent)(() => {
		const el = viewportObserverRef.current;
		if (!el || !onOverflowChange) return;
		const isOverflowing = el.scrollHeight > el.clientHeight;
		if (isOverflowing !== overflowingRef.current) {
			if (didMountRef.current) onOverflowChange(isOverflowing);
			else {
				didMountRef.current = true;
				if (isOverflowing) onOverflowChange(true);
			}
			overflowingRef.current = isOverflowing;
		}
	});
	useResizeObserver(onOverflowChange ? viewportObserverElement : null, handleOverflowCheck);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...others,
		variant,
		style: [{
			display: "flex",
			overflow: "hidden"
		}, style],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			style: {
				display: "flex",
				flexDirection: "column",
				flex: 1,
				overflow: "hidden",
				...scrollbars === "y" && { minWidth: 0 },
				...scrollbars === "x" && { minHeight: 0 },
				...scrollbars === "xy" && {
					minWidth: 0,
					minHeight: 0
				},
				...scrollbars === false && {
					minWidth: 0,
					minHeight: 0
				}
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				classNames,
				styles,
				scrollHideDelay,
				scrollbarSize,
				type,
				dir,
				offsetScrollbars,
				overscrollBehavior,
				viewportRef: combinedViewportRef,
				onScrollPositionChange,
				unstyled,
				variant,
				viewportProps,
				vars,
				scrollbars,
				onBottomReached,
				onTopReached,
				startScrollPosition,
				"data-autosize": "true",
				children
			})
		})
	});
});
ScrollArea.classes = ScrollArea_module_default;
ScrollArea.varsResolver = varsResolver;
ScrollAreaAutosize.displayName = "@mantine/core/ScrollAreaAutosize";
ScrollAreaAutosize.classes = ScrollArea_module_default;
ScrollArea.Autosize = ScrollAreaAutosize;
//#endregion
export { ScrollArea as t };
