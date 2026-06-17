import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { E as getThemeColor, F as getRadius, L as getSize, M as createVarsResolver, V as rem, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as clamp } from "./clamp-D3RIMnnl.js";
import { t as Transition } from "./Transition-Cmaaz8Kh.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
//#region node_modules/@mantine/hooks/esm/use-move/use-move.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useMove(onChange, handlers, dir = "ltr") {
	const mounted = (0, import_react.useRef)(false);
	const isSliding = (0, import_react.useRef)(false);
	const frame = (0, import_react.useRef)(0);
	const cleanupRef = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		mounted.current = true;
		return () => {
			cleanupRef.current?.();
		};
	}, []);
	return {
		ref: (0, import_react.useCallback)((node) => {
			const onScrub = ({ x, y }) => {
				cancelAnimationFrame(frame.current);
				frame.current = requestAnimationFrame(() => {
					if (mounted.current && node) {
						node.style.userSelect = "none";
						const rect = node.getBoundingClientRect();
						if (rect.width && rect.height) {
							const _x = clamp((x - rect.left) / rect.width, 0, 1);
							onChange({
								x: dir === "ltr" ? _x : 1 - _x,
								y: clamp((y - rect.top) / rect.height, 0, 1)
							});
						}
					}
				});
			};
			const bindEvents = () => {
				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener("mouseup", stopScrubbing);
				document.addEventListener("touchmove", onTouchMove, { passive: false });
				document.addEventListener("touchend", stopScrubbing);
			};
			const unbindEvents = () => {
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", stopScrubbing);
				document.removeEventListener("touchmove", onTouchMove);
				document.removeEventListener("touchend", stopScrubbing);
			};
			const startScrubbing = () => {
				if (!isSliding.current && mounted.current) {
					isSliding.current = true;
					typeof handlers?.onScrubStart === "function" && handlers.onScrubStart();
					setActive(true);
					bindEvents();
				}
			};
			const stopScrubbing = () => {
				if (isSliding.current && mounted.current) {
					isSliding.current = false;
					setActive(false);
					unbindEvents();
					setTimeout(() => {
						typeof handlers?.onScrubEnd === "function" && handlers.onScrubEnd();
					}, 0);
				}
			};
			const onMouseDown = (event) => {
				startScrubbing();
				event.preventDefault();
				onMouseMove(event);
			};
			const onMouseMove = (event) => onScrub({
				x: event.clientX,
				y: event.clientY
			});
			const onTouchStart = (event) => {
				if (event.cancelable) event.preventDefault();
				startScrubbing();
				onTouchMove(event);
			};
			const onTouchMove = (event) => {
				if (event.cancelable) event.preventDefault();
				onScrub({
					x: event.changedTouches[0].clientX,
					y: event.changedTouches[0].clientY
				});
			};
			node?.addEventListener("mousedown", onMouseDown);
			node?.addEventListener("touchstart", onTouchStart, { passive: false });
			cleanupRef.current = () => {
				unbindEvents();
				cancelAnimationFrame(frame.current);
			};
			return () => {
				if (node) {
					node.removeEventListener("mousedown", onMouseDown);
					node.removeEventListener("touchstart", onTouchStart);
				}
			};
		}, [dir, onChange]),
		active
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/find-closest-number/find-closest-number.mjs
function findClosestNumber(value, numbers) {
	if (numbers.length === 0) return value;
	return numbers.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/Slider.context.mjs
var [SliderProvider, useSliderContext] = createSafeContext("SliderProvider was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/SliderRoot/SliderRoot.mjs
var import_jsx_runtime = require_jsx_runtime();
function SliderRoot({ size, disabled, variant, color, thumbSize, radius, orientation, ...others }) {
	const { getStyles } = useSliderContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		tabIndex: -1,
		variant,
		size,
		...getStyles("root"),
		mod: { orientation },
		...others
	});
}
SliderRoot.displayName = "@mantine/core/SliderRoot";
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/Thumb/Thumb.mjs
function Thumb({ max, min, value, position, label, dragging, onMouseDown, onKeyDownCapture, labelTransitionProps, labelAlwaysOn, thumbLabel, onFocus, onBlur, showLabelOnHover, isHovered, children = null, disabled, orientation = "horizontal", ref }) {
	const { getStyles } = useSliderContext();
	const [focused, setFocused] = (0, import_react.useState)(false);
	const isVisible = labelAlwaysOn || dragging || focused || showLabelOnHover && isHovered;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		tabIndex: disabled ? -1 : 0,
		role: "slider",
		"aria-label": thumbLabel,
		"aria-valuemax": max,
		"aria-valuemin": min,
		"aria-valuenow": value,
		"aria-disabled": disabled,
		"aria-orientation": orientation,
		ref,
		__vars: { "--slider-thumb-offset": `${position}%` },
		...getStyles("thumb", { focusable: true }),
		mod: {
			dragging,
			disabled
		},
		onFocus: (event) => {
			setFocused(true);
			typeof onFocus === "function" && onFocus(event);
		},
		onBlur: (event) => {
			setFocused(false);
			typeof onBlur === "function" && onBlur(event);
		},
		onTouchStart: onMouseDown,
		onMouseDown,
		onKeyDownCapture,
		onClick: (event) => event.stopPropagation(),
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
			mounted: label != null && !!isVisible,
			transition: "fade",
			duration: 0,
			...labelTransitionProps,
			children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...getStyles("label", { style: transitionStyles }),
				children: label
			})
		})]
	});
}
Thumb.displayName = "@mantine/core/SliderThumb";
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/utils/get-position/get-position.mjs
function getPosition({ value, min, max }) {
	const position = (value - min) / (max - min) * 100;
	return Math.min(Math.max(position, 0), 100);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/Marks/is-mark-filled.mjs
function isMarkFilled({ mark, offset, value, inverted = false, startPointValue }) {
	if (typeof startPointValue === "number" && !inverted) return mark.value >= startPointValue && mark.value <= value || mark.value <= startPointValue && mark.value >= value;
	return inverted ? typeof offset === "number" ? mark.value <= offset || mark.value >= value : mark.value >= value : typeof offset === "number" ? mark.value >= offset && mark.value <= value : mark.value <= value;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/Marks/Marks.mjs
function Marks({ marks, min, max, disabled, value, offset, inverted, startPointValue }) {
	const { getStyles } = useSliderContext();
	if (!marks) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: marks.map((mark, index) => {
		if (mark.hidden) return null;
		return /* @__PURE__ */ (0, import_react.createElement)(Box, {
			...getStyles("markWrapper"),
			__vars: { "--mark-offset": `${getPosition({
				value: mark.value,
				min,
				max
			})}%` },
			key: index
		}, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...getStyles("mark"),
			mod: {
				filled: isMarkFilled({
					mark,
					value,
					offset,
					inverted,
					startPointValue
				}),
				disabled
			}
		}), mark.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...getStyles("markLabel"),
			children: mark.label
		}));
	}) });
}
Marks.displayName = "@mantine/core/SliderMarks";
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/Track/Track.mjs
function Track({ filled, children, offset, disabled, marksOffset, inverted, startPointValue, containerProps, ...others }) {
	const { getStyles } = useSliderContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...getStyles("trackContainer"),
		mod: { disabled },
		...containerProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			...getStyles("track"),
			mod: {
				inverted,
				disabled
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					mod: {
						inverted,
						disabled
					},
					__vars: {
						"--slider-bar-width": `calc(${filled}% + 2 * var(--slider-size))`,
						"--slider-bar-offset": `calc(${offset}% - var(--slider-size))`
					},
					...getStyles("bar")
				}),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marks, {
					...others,
					offset: marksOffset,
					disabled,
					inverted,
					startPointValue
				})
			]
		})
	});
}
Track.displayName = "@mantine/core/SliderTrack";
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/utils/get-change-value/get-change-value.mjs
function getChangeValue({ value, containerWidth, min, max, step, precision }) {
	const dx = (!containerWidth ? value : Math.min(Math.max(value, 0), containerWidth) / containerWidth) * (max - min);
	const nextValue = (dx !== 0 ? Math.round(dx / step) * step : 0) + min;
	const nextValueWithinStep = Math.max(nextValue, min);
	if (precision !== void 0) return Number(nextValueWithinStep.toFixed(precision));
	return nextValueWithinStep;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/utils/get-floating-value/get-floating-value.mjs
function getFloatingValue(value, precision) {
	return parseFloat(value.toFixed(precision));
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/utils/get-precision/get-precision.mjs
function getPrecision(step) {
	if (!step) return 0;
	const split = step.toString().split(".");
	return split.length > 1 ? split[1].length : 0;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/utils/get-step-mark-value/get-step-mark-value.mjs
function getNextMarkValue(currentValue, marks) {
	const nextMark = [...marks].sort((a, b) => a.value - b.value).find((mark) => mark.value > currentValue);
	return nextMark ? nextMark.value : currentValue;
}
function getPreviousMarkValue(currentValue, marks) {
	const previousMark = [...marks].sort((a, b) => b.value - a.value).find((mark) => mark.value < currentValue);
	return previousMark ? previousMark.value : currentValue;
}
function getFirstMarkValue(marks) {
	const sortedMarks = [...marks].sort((a, b) => a.value - b.value);
	return sortedMarks.length > 0 ? sortedMarks[0].value : 0;
}
function getLastMarkValue(marks) {
	const sortedMarks = [...marks].sort((a, b) => a.value - b.value);
	return sortedMarks.length > 0 ? sortedMarks[sortedMarks.length - 1].value : 100;
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/Slider.module.mjs
var Slider_module_default = {
	"root": "m_dd36362e",
	"label": "m_c9357328",
	"thumb": "m_c9a9a60a",
	"trackContainer": "m_a8645c2",
	"track": "m_c9ade57f",
	"bar": "m_38aeed47",
	"markWrapper": "m_b7b0423a",
	"mark": "m_dd33bc19",
	"markLabel": "m_68c77a5b"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Slider/Slider/Slider.mjs
var defaultProps = {
	radius: "xl",
	min: 0,
	max: 100,
	step: 1,
	marks: [],
	label: (f) => f,
	labelTransitionProps: {
		transition: "fade",
		duration: 0
	},
	thumbLabel: "",
	showLabelOnHover: true,
	scale: (v) => v,
	size: "md"
};
var varsResolver = createVarsResolver((theme, { size, color, thumbSize, radius }) => ({ root: {
	"--slider-size": getSize(size, "slider-size"),
	"--slider-color": color ? getThemeColor(color, theme) : void 0,
	"--slider-radius": radius === void 0 ? void 0 : getRadius(radius),
	"--slider-thumb-size": thumbSize !== void 0 ? rem(thumbSize) : "calc(var(--slider-size) * 2)"
} }));
var Slider = factory((_props) => {
	const props = useProps("Slider", defaultProps, _props);
	const { classNames, styles, value, onChange, onChangeEnd, size, min, max, domain, step, precision: _precision, defaultValue, name, marks, label, labelTransitionProps, labelAlwaysOn, thumbLabel, showLabelOnHover, thumbChildren, disabled, unstyled, scale, inverted, startPointValue, orientation, className, style, vars, hiddenInputProps, restrictToMarks, thumbProps, attributes, ref, ...others } = props;
	const getStyles = useStyles({
		name: "Slider",
		props,
		classes: Slider_module_default,
		classNames,
		className,
		styles,
		style,
		attributes,
		vars,
		varsResolver,
		unstyled
	});
	const { dir } = useDirection();
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [_value, setValue] = useUncontrolled({
		value: typeof value === "number" ? clamp(value, min, max) : value,
		defaultValue: typeof defaultValue === "number" ? clamp(defaultValue, min, max) : defaultValue,
		finalValue: clamp(0, min, max),
		onChange
	});
	const valueRef = (0, import_react.useRef)(_value);
	const onChangeEndRef = (0, import_react.useRef)(onChangeEnd);
	(0, import_react.useEffect)(() => {
		onChangeEndRef.current = onChangeEnd;
	}, [onChangeEnd]);
	const root = (0, import_react.useRef)(null);
	const thumb = (0, import_react.useRef)(null);
	const [domainMin, domainMax] = domain || [min, max];
	const position = getPosition({
		value: _value,
		min: domainMin,
		max: domainMax
	});
	const scaledValue = scale(_value);
	const _label = typeof label === "function" ? label(scaledValue) : label;
	const precision = _precision ?? getPrecision(step);
	const hasStartPoint = typeof startPointValue === "number" && !inverted;
	const startPosition = hasStartPoint ? getPosition({
		value: startPointValue,
		min: domainMin,
		max: domainMax
	}) : 0;
	const trackOffset = hasStartPoint ? Math.min(position, startPosition) : 0;
	const trackFilled = hasStartPoint ? Math.abs(position - startPosition) : position;
	const handleChange = (0, import_react.useCallback)(({ x }) => {
		if (!disabled) {
			const clampedValue = clamp(getChangeValue({
				value: x,
				min: domainMin,
				max: domainMax,
				step,
				precision
			}), min, max);
			setValue(restrictToMarks && marks?.length ? findClosestNumber(clampedValue, marks.map((mark) => mark.value)) : clampedValue);
			valueRef.current = clampedValue;
		}
	}, [
		disabled,
		min,
		max,
		domainMin,
		domainMax,
		step,
		precision,
		setValue,
		marks,
		restrictToMarks
	]);
	const { ref: container, active } = useMove(({ x, y }) => handleChange({ x: orientation === "vertical" ? 1 - y : x }), { onScrubEnd: (0, import_react.useCallback)(() => {
		if (!disabled && onChangeEndRef.current) {
			const finalValue = restrictToMarks && marks?.length ? findClosestNumber(valueRef.current, marks.map((mark) => mark.value)) : valueRef.current;
			onChangeEndRef.current(finalValue);
		}
	}, [
		disabled,
		marks,
		restrictToMarks
	]) }, dir);
	const callOnChangeEnd = (0, import_react.useCallback)((value) => {
		if (!disabled && onChangeEndRef.current) onChangeEndRef.current(value);
	}, [disabled]);
	const handleTrackKeydownCapture = (event) => {
		if (!disabled) switch (event.key) {
			case "ArrowUp": {
				event.preventDefault();
				thumb.current?.focus();
				if (restrictToMarks && marks) {
					const nextValue = getNextMarkValue(_value, marks);
					setValue(nextValue);
					callOnChangeEnd(nextValue);
					break;
				}
				const nextValue = getFloatingValue(Math.min(Math.max(_value + step, domainMin), domainMax), precision);
				setValue(nextValue);
				callOnChangeEnd(nextValue);
				break;
			}
			case "ArrowRight": {
				event.preventDefault();
				thumb.current?.focus();
				if (restrictToMarks && marks) {
					const nextValue = dir === "rtl" ? getPreviousMarkValue(_value, marks) : getNextMarkValue(_value, marks);
					setValue(nextValue);
					callOnChangeEnd(nextValue);
					break;
				}
				const nextValue = getFloatingValue(Math.min(Math.max(dir === "rtl" ? _value - step : _value + step, domainMin), domainMax), precision);
				setValue(nextValue);
				callOnChangeEnd(nextValue);
				break;
			}
			case "ArrowDown": {
				event.preventDefault();
				thumb.current?.focus();
				if (restrictToMarks && marks) {
					const nextValue = getPreviousMarkValue(_value, marks);
					setValue(nextValue);
					callOnChangeEnd(nextValue);
					break;
				}
				const nextValue = getFloatingValue(Math.min(Math.max(_value - step, domainMin), domainMax), precision);
				setValue(nextValue);
				callOnChangeEnd(nextValue);
				break;
			}
			case "ArrowLeft": {
				event.preventDefault();
				thumb.current?.focus();
				if (restrictToMarks && marks) {
					const nextValue = dir === "rtl" ? getNextMarkValue(_value, marks) : getPreviousMarkValue(_value, marks);
					setValue(nextValue);
					callOnChangeEnd(nextValue);
					break;
				}
				const nextValue = getFloatingValue(Math.min(Math.max(dir === "rtl" ? _value + step : _value - step, domainMin), domainMax), precision);
				setValue(nextValue);
				callOnChangeEnd(nextValue);
				break;
			}
			case "Home":
				event.preventDefault();
				thumb.current?.focus();
				if (restrictToMarks && marks) {
					setValue(getFirstMarkValue(marks));
					callOnChangeEnd(getFirstMarkValue(marks));
					break;
				}
				setValue(min);
				callOnChangeEnd(min);
				break;
			case "End":
				event.preventDefault();
				thumb.current?.focus();
				if (restrictToMarks && marks) {
					setValue(getLastMarkValue(marks));
					callOnChangeEnd(getLastMarkValue(marks));
					break;
				}
				setValue(max);
				callOnChangeEnd(max);
				break;
			default: break;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderProvider, {
		value: { getStyles },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SliderRoot, {
			...others,
			ref: useMergedRef(ref, root),
			onKeyDownCapture: handleTrackKeydownCapture,
			onMouseDownCapture: () => root.current?.focus(),
			size,
			disabled,
			orientation,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Track, {
				inverted,
				offset: trackOffset,
				filled: trackFilled,
				marks,
				min: domainMin,
				max: domainMax,
				value: scaledValue,
				startPointValue: hasStartPoint ? startPointValue : void 0,
				disabled,
				containerProps: {
					ref: container,
					onMouseEnter: showLabelOnHover ? () => setHovered(true) : void 0,
					onMouseLeave: showLabelOnHover ? () => setHovered(false) : void 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
					max: domainMax,
					min: domainMin,
					value: scaledValue,
					position,
					dragging: active,
					label: _label,
					ref: thumb,
					labelTransitionProps,
					labelAlwaysOn,
					thumbLabel,
					showLabelOnHover,
					isHovered: hovered,
					disabled,
					orientation,
					...thumbProps,
					children: thumbChildren
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				name,
				value: scaledValue,
				...hiddenInputProps
			})]
		})
	});
});
Slider.classes = Slider_module_default;
Slider.varsResolver = varsResolver;
Slider.displayName = "@mantine/core/Slider";
//#endregion
export { Slider as t };
