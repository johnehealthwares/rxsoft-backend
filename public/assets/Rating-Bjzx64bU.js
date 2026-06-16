import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { E as getThemeColor, L as getSize, M as createVarsResolver, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as clamp } from "./clamp-D3RIMnnl.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { r as useMergedRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
//#region node_modules/@mantine/core/esm/components/Rating/Rating.context.mjs
var [RatingProvider, useRatingContext] = createSafeContext("Rating was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Rating/StarSymbol/StarIcon.mjs
var import_jsx_runtime = require_jsx_runtime();
function StarIcon(props) {
	const { width, height, style, ...others } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		style: {
			width,
			height,
			...style
		},
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" })
	});
}
StarIcon.displayName = "@mantine/core/StarIcon";
//#endregion
//#region node_modules/@mantine/core/esm/components/Rating/StarSymbol/StarSymbol.mjs
function StarSymbol({ type }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarIcon, {
		...useRatingContext().getStyles("starSymbol"),
		"data-filled": type === "full" || void 0
	});
}
StarSymbol.displayName = "@mantine/core/StarSymbol";
//#endregion
//#region node_modules/@mantine/core/esm/components/Rating/RatingItem/RatingItem.mjs
function RatingItem({ getSymbolLabel, emptyIcon, fullIcon, full, active, value, readOnly, fractionValue, color, id, onBlur, onChange, onInputChange, style, ...others }) {
	const ctx = useRatingContext();
	const _fullIcon = typeof fullIcon === "function" ? fullIcon(value) : fullIcon;
	const _emptyIcon = typeof emptyIcon === "function" ? emptyIcon(value) : emptyIcon;
	const { dir } = useDirection();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...ctx.getStyles("input"),
		onKeyDown: (event) => (event.key === " " || event.key === "Enter") && onChange(value),
		id,
		type: "radio",
		"data-active": active || void 0,
		"aria-label": getSymbolLabel?.(value),
		value,
		onBlur,
		onChange: onInputChange,
		...others
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: readOnly ? "div" : "label",
		...ctx.getStyles("label"),
		"data-read-only": readOnly || void 0,
		htmlFor: id,
		onClick: readOnly ? void 0 : () => onChange(value),
		__vars: { "--rating-item-z-index": (fractionValue === 1 ? void 0 : active ? 2 : 0)?.toString() },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...ctx.getStyles("symbolBody"),
			__vars: { "--rating-symbol-clip-path": fractionValue === 1 ? void 0 : dir === "ltr" ? `inset(0 ${active ? 100 - fractionValue * 100 : 100}% 0 0)` : `inset(0 0 0 ${active ? 100 - fractionValue * 100 : 100}% )` },
			children: full ? _fullIcon || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarSymbol, { type: "full" }) : _emptyIcon || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarSymbol, { type: "empty" })
		})
	})] });
}
RatingItem.displayName = "@mantine/core/RatingItem";
//#endregion
//#region node_modules/@mantine/core/esm/components/Rating/Rating.module.mjs
var Rating_module_default = {
	"root": "m_f8d312f2",
	"symbolGroup": "m_61734bb7",
	"starSymbol": "m_5662a89a",
	"input": "m_211007ba",
	"label": "m_21342ee4",
	"symbolBody": "m_fae05d6a"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Rating/Rating.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function roundValueTo(value, to) {
	const rounded = Math.round(value / to) * to;
	const precision = `${to}`.split(".")[1]?.length || 0;
	return Number(rounded.toFixed(precision));
}
var defaultProps = {
	size: "sm",
	getSymbolLabel: (value) => `${value}`,
	count: 5,
	fractions: 1,
	color: "yellow"
};
var varsResolver = createVarsResolver((theme, { size, color }) => ({ root: {
	"--rating-size": getSize(size, "rating-size"),
	"--rating-color": getThemeColor(color, theme)
} }));
var Rating = factory((_props) => {
	const props = useProps("Rating", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, name, id, value, defaultValue, onChange, fractions, count, onMouseEnter, readOnly, allowClear, onMouseMove, onHover, onMouseLeave, onTouchStart, onTouchEnd, size, variant, getSymbolLabel, color, emptySymbol, fullSymbol, highlightSelectedOnly, attributes, ref, ...others } = props;
	const getStyles = useStyles({
		name: "Rating",
		classes: Rating_module_default,
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
	const { dir } = useDirection();
	const _name = useId$1(name);
	const _id = useId$1(id);
	const rootRef = (0, import_react.useRef)(null);
	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: 0,
		onChange
	});
	const [hovered, setHovered] = (0, import_react.useState)(-1);
	const [isOutside, setOutside] = (0, import_react.useState)(true);
	const _fractions = Math.floor(fractions);
	const _count = Math.floor(count);
	const decimalUnit = 1 / _fractions;
	const stableValueRounded = roundValueTo(_value, decimalUnit);
	const finalValue = hovered !== -1 ? hovered : stableValueRounded;
	const getRatingFromCoordinates = (x) => {
		if (!rootRef.current) return 0;
		const { left, right, width } = rootRef.current.getBoundingClientRect();
		const symbolWidth = width / _count;
		return clamp(roundValueTo((dir === "rtl" ? right - x : x - left) / symbolWidth + decimalUnit / 2, decimalUnit), decimalUnit, _count);
	};
	const handleMouseEnter = (event) => {
		onMouseEnter?.(event);
		!readOnly && setOutside(false);
	};
	const handleMouseMove = (event) => {
		onMouseMove?.(event);
		if (readOnly) return;
		const rounded = getRatingFromCoordinates(event.clientX);
		setHovered(rounded);
		rounded !== hovered && onHover?.(rounded);
	};
	const handleMouseLeave = (event) => {
		onMouseLeave?.(event);
		if (readOnly) return;
		setHovered(-1);
		setOutside(true);
		hovered !== -1 && onHover?.(-1);
	};
	const handleTouchStart = (event) => {
		const { touches } = event;
		if (touches.length !== 1) return;
		if (!readOnly) {
			const touch = touches[0];
			setValue(getRatingFromCoordinates(touch.clientX));
		}
		onTouchStart?.(event);
	};
	const handleTouchEnd = (event) => {
		event.preventDefault();
		onTouchEnd?.(event);
	};
	const handleItemBlur = () => isOutside && setHovered(-1);
	const handleInputChange = (event) => {
		if (!readOnly) if (typeof event === "number") setHovered(event);
		else setHovered(parseFloat(event.target.value));
	};
	const handleChange = (event) => {
		if (!readOnly) {
			const newValue = typeof event === "number" ? event : parseFloat(event.target.value);
			if (allowClear && newValue === stableValueRounded) setValue(0);
			else setValue(newValue);
		}
	};
	const items = Array(_count).fill(0).map((_, index) => {
		const integerValue = index + 1;
		const fractionItems = Array.from(new Array(index === 0 ? _fractions + 1 : _fractions));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-active": !readOnly && Math.ceil(hovered) === integerValue || void 0,
			...getStyles("symbolGroup"),
			children: fractionItems.map((__, fractionIndex) => {
				const fractionValue = decimalUnit * (index === 0 ? fractionIndex : fractionIndex + 1);
				const symbolValue = roundValueTo(integerValue - 1 + fractionValue, decimalUnit);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingItem, {
					getSymbolLabel,
					emptyIcon: emptySymbol,
					fullIcon: fullSymbol,
					full: highlightSelectedOnly ? symbolValue === finalValue : symbolValue <= finalValue,
					active: symbolValue === finalValue,
					checked: symbolValue === stableValueRounded,
					readOnly,
					fractionValue,
					value: symbolValue,
					name: _name,
					onChange: handleChange,
					onBlur: handleItemBlur,
					onInputChange: handleInputChange,
					id: `${_id}-${index}-${fractionIndex}`
				}, `${integerValue}-${symbolValue}`);
			})
		}, integerValue);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingProvider, {
		value: { getStyles },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			ref: useMergedRef(rootRef, ref),
			...getStyles("root"),
			onMouseMove: handleMouseMove,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onTouchStart: handleTouchStart,
			onTouchEnd: handleTouchEnd,
			variant,
			size,
			id: _id,
			...others,
			children: items
		})
	});
});
Rating.classes = Rating_module_default;
Rating.varsResolver = varsResolver;
Rating.displayName = "@mantine/core/Rating";
//#endregion
export { Rating as t };
