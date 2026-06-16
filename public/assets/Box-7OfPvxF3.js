import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/core/utils/keys/keys.mjs
function keys(object) {
	return Object.keys(object);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/deep-merge/deep-merge.mjs
function isObject(item) {
	return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
	const result = { ...target };
	const _source = source;
	if (isObject(target) && isObject(source)) Object.keys(source).forEach((key) => {
		if (isObject(_source[key])) if (!(key in target)) result[key] = _source[key];
		else result[key] = deepMerge(result[key], _source[key]);
		else result[key] = _source[key];
	});
	return result;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/camel-to-kebab-case/camel-to-kebab-case.mjs
function camelToKebabCase(value) {
	return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/units-converters/rem.mjs
function scaleRem(remValue) {
	if (remValue === "0rem") return "0rem";
	return `calc(${remValue} * var(--mantine-scale))`;
}
function createConverter(units, { shouldScale = false } = {}) {
	function converter(value) {
		if (value === 0 || value === "0") return `0${units}`;
		if (typeof value === "number") {
			const val = `${value / 16}${units}`;
			return shouldScale ? scaleRem(val) : val;
		}
		if (typeof value === "string") {
			if (value === "") return value;
			if (value.startsWith("calc(") || value.startsWith("clamp(") || value.includes("rgba(")) return value;
			if (value.includes(",")) return value.split(",").map((val) => converter(val)).join(",");
			if (value.includes(" ")) return value.split(" ").map((val) => converter(val)).join(" ");
			const replaced = value.replace("px", "");
			if (!Number.isNaN(Number(replaced))) {
				const val = `${Number(replaced) / 16}${units}`;
				return shouldScale ? scaleRem(val) : val;
			}
		}
		return value;
	}
	return converter;
}
var rem = createConverter("rem", { shouldScale: true });
var em = createConverter("em");
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/filter-props/filter-props.mjs
function filterProps(props) {
	return Object.keys(props).reduce((acc, key) => {
		if (props[key] !== void 0) acc[key] = props[key];
		return acc;
	}, {});
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/is-number-like/is-number-like.mjs
function isNumberLike(value) {
	if (typeof value === "number") return true;
	if (typeof value === "string") {
		if (value.startsWith("calc(") || value.startsWith("var(") || value.includes(" ") && value.trim() !== "") return true;
		const cssUnitsRegex = /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
		return value.trim().split(/\s+/).every((val) => cssUnitsRegex.test(val));
	}
	return false;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
function getSize(size, prefix = "size", convertToRem = true) {
	if (size === void 0) return;
	return isNumberLike(size) ? convertToRem ? rem(size) : size : `var(--${prefix}-${size})`;
}
function getSpacing(size) {
	return getSize(size, "mantine-spacing");
}
function getRadius(size) {
	if (size === void 0) return "var(--mantine-radius-default)";
	return getSize(size, "mantine-radius");
}
function getFontSize(size) {
	return getSize(size, "mantine-font-size");
}
function getLineHeight(size) {
	return getSize(size, "mantine-line-height", false);
}
function getShadow(size) {
	if (!size) return;
	return getSize(size, "mantine-shadow", false);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
function createVarsResolver(resolver) {
	return resolver;
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/resolve-class-names/resolve-class-names.mjs
var EMPTY_CLASS_NAMES = {};
function mergeClassNames(objects) {
	const merged = {};
	objects.forEach((obj) => {
		Object.entries(obj).forEach(([key, value]) => {
			if (merged[key]) merged[key] = clsx(merged[key], value);
			else merged[key] = value;
		});
	});
	return merged;
}
function resolveClassNames({ theme, classNames, props, stylesCtx }) {
	return mergeClassNames((Array.isArray(classNames) ? classNames : [classNames]).map((item) => typeof item === "function" ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES));
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-styles/resolve-styles.mjs
function resolveStyles({ theme, styles, props, stylesCtx }) {
	const arrayStyles = Array.isArray(styles) ? styles : [styles];
	const result = {};
	for (const style of arrayStyles) if (typeof style === "function") Object.assign(result, style(theme, props, stylesCtx));
	else if (style) Object.assign(result, style);
	return result;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-primary-shade/get-primary-shade.mjs
function getPrimaryShade(theme, colorScheme) {
	if (typeof theme.primaryShade === "number") return theme.primaryShade;
	if (colorScheme === "dark") return theme.primaryShade.dark;
	return theme.primaryShade.light;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/to-rgba/to-rgba.mjs
function isHexColor(hex) {
	return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(hex);
}
function hexToRgba(color) {
	let hexString = color.replace("#", "");
	if (hexString.length === 3) {
		const shorthandHex = hexString.split("");
		hexString = [
			shorthandHex[0],
			shorthandHex[0],
			shorthandHex[1],
			shorthandHex[1],
			shorthandHex[2],
			shorthandHex[2]
		].join("");
	}
	if (hexString.length === 8) {
		const alpha = parseInt(hexString.slice(6, 8), 16) / 255;
		return {
			r: parseInt(hexString.slice(0, 2), 16),
			g: parseInt(hexString.slice(2, 4), 16),
			b: parseInt(hexString.slice(4, 6), 16),
			a: alpha
		};
	}
	const parsed = parseInt(hexString, 16);
	return {
		r: parsed >> 16 & 255,
		g: parsed >> 8 & 255,
		b: parsed & 255,
		a: 1
	};
}
function rgbStringToRgba(color) {
	const [r, g, b, a] = color.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
	return {
		r,
		g,
		b,
		a: a === void 0 ? 1 : a
	};
}
function hslStringToRgba(hslaString) {
	const matches = hslaString.match(/^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i);
	if (!matches) return {
		r: 0,
		g: 0,
		b: 0,
		a: 1
	};
	const h = parseInt(matches[1], 10);
	const s = parseInt(matches[2], 10) / 100;
	const l = parseInt(matches[3], 10) / 100;
	const a = matches[5] ? parseFloat(matches[5]) : void 0;
	const chroma = (1 - Math.abs(2 * l - 1)) * s;
	const huePrime = h / 60;
	const x = chroma * (1 - Math.abs(huePrime % 2 - 1));
	const m = l - chroma / 2;
	let r;
	let g;
	let b;
	if (huePrime >= 0 && huePrime < 1) {
		r = chroma;
		g = x;
		b = 0;
	} else if (huePrime >= 1 && huePrime < 2) {
		r = x;
		g = chroma;
		b = 0;
	} else if (huePrime >= 2 && huePrime < 3) {
		r = 0;
		g = chroma;
		b = x;
	} else if (huePrime >= 3 && huePrime < 4) {
		r = 0;
		g = x;
		b = chroma;
	} else if (huePrime >= 4 && huePrime < 5) {
		r = x;
		g = 0;
		b = chroma;
	} else {
		r = chroma;
		g = 0;
		b = x;
	}
	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
		a: a || 1
	};
}
function toRgba(color) {
	if (isHexColor(color)) return hexToRgba(color);
	if (color.startsWith("rgb")) return rgbStringToRgba(color);
	if (color.startsWith("hsl")) return hslStringToRgba(color);
	return {
		r: 0,
		g: 0,
		b: 0,
		a: 1
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/luminance/luminance.mjs
function gammaCorrect(c) {
	return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
}
function getLightnessFromOklch(oklchColor) {
	const match = oklchColor.match(/oklch\((.*?)%\s/);
	return match ? parseFloat(match[1]) : null;
}
function luminance(color) {
	if (color.startsWith("oklch(")) return (getLightnessFromOklch(color) || 0) / 100;
	const { r, g, b } = toRgba(color);
	const sR = r / 255;
	const sG = g / 255;
	const sB = b / 255;
	const rLinear = gammaCorrect(sR);
	const gLinear = gammaCorrect(sG);
	const bLinear = gammaCorrect(sB);
	return .2126 * rLinear + .7152 * gLinear + .0722 * bLinear;
}
function isLightColor(color, luminanceThreshold = .179) {
	if (color.startsWith("var(")) return false;
	return luminance(color) > luminanceThreshold;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/parse-theme-color/parse-theme-color.mjs
function parseThemeColor({ color, theme, colorScheme }) {
	if (typeof color !== "string") throw new Error(`[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof color}`);
	if (color === "bright") return {
		color,
		value: colorScheme === "dark" ? theme.white : theme.black,
		shade: void 0,
		isThemeColor: false,
		isLight: isLightColor(colorScheme === "dark" ? theme.white : theme.black, theme.luminanceThreshold),
		variable: "--mantine-color-bright"
	};
	if (color === "dimmed") return {
		color,
		value: colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[7],
		shade: void 0,
		isThemeColor: false,
		isLight: isLightColor(colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6], theme.luminanceThreshold),
		variable: "--mantine-color-dimmed"
	};
	if (color === "white" || color === "black") return {
		color,
		value: color === "white" ? theme.white : theme.black,
		shade: void 0,
		isThemeColor: false,
		isLight: isLightColor(color === "white" ? theme.white : theme.black, theme.luminanceThreshold),
		variable: `--mantine-color-${color}`
	};
	const [_color, shade] = color.split(".");
	const colorShade = shade ? Number(shade) : void 0;
	const isThemeColor = _color in theme.colors;
	if (isThemeColor) {
		const colorValue = colorShade !== void 0 ? theme.colors[_color][colorShade] : theme.colors[_color][getPrimaryShade(theme, colorScheme || "light")];
		return {
			color: _color,
			value: colorValue,
			shade: colorShade,
			isThemeColor,
			isLight: isLightColor(colorValue, theme.luminanceThreshold),
			variable: shade ? `--mantine-color-${_color}-${colorShade}` : `--mantine-color-${_color}-filled`
		};
	}
	return {
		color,
		value: color,
		isThemeColor,
		isLight: isLightColor(color, theme.luminanceThreshold),
		shade: colorShade,
		variable: void 0
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-theme-color/get-theme-color.mjs
function getThemeColor(color, theme) {
	const parsed = parseThemeColor({
		color: color || theme.primaryColor,
		theme
	});
	return parsed.variable ? `var(${parsed.variable})` : color;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/darken/darken.mjs
function darken(color, alpha) {
	if (color.startsWith("var(")) return `color-mix(in srgb, ${color}, black ${alpha * 100}%)`;
	const { r, g, b, a } = toRgba(color);
	const f = 1 - alpha;
	const dark = (input) => Math.round(input * f);
	return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-gradient/get-gradient.mjs
function getGradient(gradient, theme) {
	const merged = {
		from: gradient?.from || theme.defaultGradient.from,
		to: gradient?.to || theme.defaultGradient.to,
		deg: gradient?.deg ?? theme.defaultGradient.deg ?? 0
	};
	const fromColor = getThemeColor(merged.from, theme);
	const toColor = getThemeColor(merged.to, theme);
	return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/rgba/rgba.mjs
function rgba(color, alpha) {
	if (typeof color !== "string" || alpha > 1 || alpha < 0) return "rgba(0, 0, 0, 1)";
	if (color.startsWith("var(")) return `color-mix(in srgb, ${color}, transparent ${(1 - alpha) * 100}%)`;
	if (color.startsWith("oklch")) {
		if (color.includes("/")) return color.replace(/\/\s*[\d.]+\s*\)/, `/ ${alpha})`);
		return color.replace(")", ` / ${alpha})`);
	}
	const { r, g, b } = toRgba(color);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
var alpha = rgba;
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/color-functions/default-variant-colors-resolver/default-variant-colors-resolver.mjs
var defaultVariantColorsResolver = ({ color, theme, variant, gradient, autoContrast }) => {
	const parsed = parseThemeColor({
		color,
		theme
	});
	const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
	if (variant === "none") return {
		background: "transparent",
		hover: "transparent",
		color: "inherit",
		border: "none"
	};
	if (variant === "filled") {
		const textColor = _autoContrast ? parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)" : "var(--mantine-color-white)";
		if (parsed.isThemeColor) {
			if (parsed.shade === void 0) return {
				background: `var(--mantine-color-${color}-filled)`,
				hover: `var(--mantine-color-${color}-filled-hover)`,
				color: textColor,
				border: `${rem(1)} solid transparent`
			};
			return {
				background: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
				hover: `var(--mantine-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
				color: textColor,
				border: `${rem(1)} solid transparent`
			};
		}
		return {
			background: color,
			hover: darken(color, .1),
			color: textColor,
			border: `${rem(1)} solid transparent`
		};
	}
	if (variant === "light") {
		if (parsed.isThemeColor) {
			if (parsed.shade === void 0) return {
				background: `var(--mantine-color-${color}-light)`,
				hover: `var(--mantine-color-${color}-light-hover)`,
				color: `var(--mantine-color-${color}-light-color)`,
				border: `${rem(1)} solid transparent`
			};
			const parsedColor = theme.colors[parsed.color][parsed.shade];
			return {
				background: parsedColor,
				hover: darken(parsedColor, .1),
				color: `var(--mantine-color-${parsed.color}-light-color)`,
				border: `${rem(1)} solid transparent`
			};
		}
		return {
			background: rgba(color, .1),
			hover: rgba(color, .12),
			color,
			border: `${rem(1)} solid transparent`
		};
	}
	if (variant === "outline") {
		if (parsed.isThemeColor) {
			if (parsed.shade === void 0) return {
				background: "transparent",
				hover: `var(--mantine-color-${color}-outline-hover)`,
				color: `var(--mantine-color-${color}-outline)`,
				border: `${rem(1)} solid var(--mantine-color-${color}-outline)`
			};
			return {
				background: "transparent",
				hover: rgba(theme.colors[parsed.color][parsed.shade], .05),
				color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
				border: `${rem(1)} solid var(--mantine-color-${parsed.color}-${parsed.shade})`
			};
		}
		return {
			background: "transparent",
			hover: rgba(color, .05),
			color,
			border: `${rem(1)} solid ${color}`
		};
	}
	if (variant === "subtle") {
		if (parsed.isThemeColor) {
			if (parsed.shade === void 0) return {
				background: "transparent",
				hover: `var(--mantine-color-${color}-light-hover)`,
				color: `var(--mantine-color-${color}-light-color)`,
				border: `${rem(1)} solid transparent`
			};
			const parsedColor = theme.colors[parsed.color][parsed.shade];
			return {
				background: "transparent",
				hover: rgba(parsedColor, .12),
				color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
				border: `${rem(1)} solid transparent`
			};
		}
		return {
			background: "transparent",
			hover: rgba(color, .12),
			color,
			border: `${rem(1)} solid transparent`
		};
	}
	if (variant === "transparent") {
		if (parsed.isThemeColor) {
			if (parsed.shade === void 0) return {
				background: "transparent",
				hover: "transparent",
				color: `var(--mantine-color-${color}-light-color)`,
				border: `${rem(1)} solid transparent`
			};
			return {
				background: "transparent",
				hover: "transparent",
				color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
				border: `${rem(1)} solid transparent`
			};
		}
		return {
			background: "transparent",
			hover: "transparent",
			color,
			border: `${rem(1)} solid transparent`
		};
	}
	if (variant === "white") {
		if (parsed.isThemeColor) {
			if (parsed.shade === void 0) return {
				background: "var(--mantine-color-white)",
				hover: darken(theme.white, .01),
				color: `var(--mantine-color-${color}-filled)`,
				border: `${rem(1)} solid transparent`
			};
			return {
				background: "var(--mantine-color-white)",
				hover: darken(theme.white, .01),
				color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
				border: `${rem(1)} solid transparent`
			};
		}
		return {
			background: "var(--mantine-color-white)",
			hover: darken(theme.white, .01),
			color,
			border: `${rem(1)} solid transparent`
		};
	}
	if (variant === "gradient") return {
		background: getGradient(gradient, theme),
		hover: getGradient(gradient, theme),
		color: "var(--mantine-color-white)",
		border: "none"
	};
	if (variant === "default") return {
		background: "var(--mantine-color-default)",
		hover: "var(--mantine-color-default-hover)",
		color: "var(--mantine-color-default-color)",
		border: `${rem(1)} solid var(--mantine-color-default-border)`
	};
	return {};
};
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/Mantine.context.mjs
var MantineContext = (0, import_react.createContext)(null);
function useMantineContext() {
	const ctx = (0, import_react.use)(MantineContext);
	if (!ctx) throw new Error("[@mantine/core] MantineProvider was not found in tree");
	return ctx;
}
function useMantineCssVariablesResolver() {
	return useMantineContext().cssVariablesResolver;
}
function useMantineClassNamesPrefix() {
	return useMantineContext().classNamesPrefix;
}
function useMantineStyleNonce() {
	return useMantineContext().getStyleNonce;
}
function useMantineWithStaticClasses() {
	return useMantineContext().withStaticClasses;
}
function useMantineIsHeadless() {
	return useMantineContext().headless;
}
function useMantineSxTransform() {
	return useMantineContext().stylesTransform?.sx;
}
function useMantineStylesTransform() {
	return useMantineContext().stylesTransform?.styles;
}
function useMantineEnv() {
	return useMantineContext().env || "default";
}
function useMantineDeduplicateInlineStyles() {
	return useMantineContext().deduplicateInlineStyles;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/default-colors.mjs
var DEFAULT_COLORS = {
	dark: [
		"#C9C9C9",
		"#b8b8b8",
		"#828282",
		"#696969",
		"#424242",
		"#3b3b3b",
		"#2e2e2e",
		"#242424",
		"#1f1f1f",
		"#141414"
	],
	gray: [
		"#f8f9fa",
		"#f1f3f5",
		"#e9ecef",
		"#dee2e6",
		"#ced4da",
		"#adb5bd",
		"#868e96",
		"#495057",
		"#343a40",
		"#212529"
	],
	red: [
		"#fff5f5",
		"#ffe3e3",
		"#ffc9c9",
		"#ffa8a8",
		"#ff8787",
		"#ff6b6b",
		"#fa5252",
		"#f03e3e",
		"#e03131",
		"#c92a2a"
	],
	pink: [
		"#fff0f6",
		"#ffdeeb",
		"#fcc2d7",
		"#faa2c1",
		"#f783ac",
		"#f06595",
		"#e64980",
		"#d6336c",
		"#c2255c",
		"#a61e4d"
	],
	grape: [
		"#f8f0fc",
		"#f3d9fa",
		"#eebefa",
		"#e599f7",
		"#da77f2",
		"#cc5de8",
		"#be4bdb",
		"#ae3ec9",
		"#9c36b5",
		"#862e9c"
	],
	violet: [
		"#f3f0ff",
		"#e5dbff",
		"#d0bfff",
		"#b197fc",
		"#9775fa",
		"#845ef7",
		"#7950f2",
		"#7048e8",
		"#6741d9",
		"#5f3dc4"
	],
	indigo: [
		"#edf2ff",
		"#dbe4ff",
		"#bac8ff",
		"#91a7ff",
		"#748ffc",
		"#5c7cfa",
		"#4c6ef5",
		"#4263eb",
		"#3b5bdb",
		"#364fc7"
	],
	blue: [
		"#e7f5ff",
		"#d0ebff",
		"#a5d8ff",
		"#74c0fc",
		"#4dabf7",
		"#339af0",
		"#228be6",
		"#1c7ed6",
		"#1971c2",
		"#1864ab"
	],
	cyan: [
		"#e3fafc",
		"#c5f6fa",
		"#99e9f2",
		"#66d9e8",
		"#3bc9db",
		"#22b8cf",
		"#15aabf",
		"#1098ad",
		"#0c8599",
		"#0b7285"
	],
	teal: [
		"#e6fcf5",
		"#c3fae8",
		"#96f2d7",
		"#63e6be",
		"#38d9a9",
		"#20c997",
		"#12b886",
		"#0ca678",
		"#099268",
		"#087f5b"
	],
	green: [
		"#ebfbee",
		"#d3f9d8",
		"#b2f2bb",
		"#8ce99a",
		"#69db7c",
		"#51cf66",
		"#40c057",
		"#37b24d",
		"#2f9e44",
		"#2b8a3e"
	],
	lime: [
		"#f4fce3",
		"#e9fac8",
		"#d8f5a2",
		"#c0eb75",
		"#a9e34b",
		"#94d82d",
		"#82c91e",
		"#74b816",
		"#66a80f",
		"#5c940d"
	],
	yellow: [
		"#fff9db",
		"#fff3bf",
		"#ffec99",
		"#ffe066",
		"#ffd43b",
		"#fcc419",
		"#fab005",
		"#f59f00",
		"#f08c00",
		"#e67700"
	],
	orange: [
		"#fff4e6",
		"#ffe8cc",
		"#ffd8a8",
		"#ffc078",
		"#ffa94d",
		"#ff922b",
		"#fd7e14",
		"#f76707",
		"#e8590c",
		"#d9480f"
	]
};
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/default-theme.mjs
var DEFAULT_FONT_FAMILY = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
var DEFAULT_THEME = {
	scale: 1,
	fontSmoothing: true,
	focusRing: "auto",
	white: "#fff",
	black: "#000",
	colors: DEFAULT_COLORS,
	primaryShade: {
		light: 6,
		dark: 8
	},
	primaryColor: "blue",
	variantColorResolver: defaultVariantColorsResolver,
	autoContrast: false,
	luminanceThreshold: .3,
	fontFamily: DEFAULT_FONT_FAMILY,
	fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
	respectReducedMotion: false,
	cursorType: "default",
	defaultGradient: {
		from: "blue",
		to: "cyan",
		deg: 45
	},
	defaultRadius: "md",
	activeClassName: "mantine-active",
	focusClassName: "",
	headings: {
		fontFamily: DEFAULT_FONT_FAMILY,
		fontWeight: "700",
		textWrap: "wrap",
		sizes: {
			h1: {
				fontSize: rem(34),
				lineHeight: "1.3"
			},
			h2: {
				fontSize: rem(26),
				lineHeight: "1.35"
			},
			h3: {
				fontSize: rem(22),
				lineHeight: "1.4"
			},
			h4: {
				fontSize: rem(18),
				lineHeight: "1.45"
			},
			h5: {
				fontSize: rem(16),
				lineHeight: "1.5"
			},
			h6: {
				fontSize: rem(14),
				lineHeight: "1.5"
			}
		}
	},
	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20)
	},
	lineHeights: {
		xs: "1.4",
		sm: "1.45",
		md: "1.55",
		lg: "1.6",
		xl: "1.65"
	},
	fontWeights: {
		regular: "400",
		medium: "600",
		bold: "700"
	},
	radius: {
		xs: rem(2),
		sm: rem(4),
		md: rem(8),
		lg: rem(16),
		xl: rem(32)
	},
	spacing: {
		xs: rem(10),
		sm: rem(12),
		md: rem(16),
		lg: rem(20),
		xl: rem(32)
	},
	breakpoints: {
		xs: "36em",
		sm: "48em",
		md: "62em",
		lg: "75em",
		xl: "88em"
	},
	shadows: {
		xs: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), 0 ${rem(1)} ${rem(2)} rgba(0, 0, 0, 0.1)`,
		sm: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(10)} ${rem(15)} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(7)} ${rem(7)} ${rem(-5)}`,
		md: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(20)} ${rem(25)} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(10)} ${rem(10)} ${rem(-5)}`,
		lg: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(28)} ${rem(23)} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(12)} ${rem(12)} ${rem(-7)}`,
		xl: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(36)} ${rem(28)} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(17)} ${rem(17)} ${rem(-7)}`
	},
	other: {},
	components: {}
};
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/merge-mantine-theme/merge-mantine-theme.mjs
var INVALID_PRIMARY_COLOR_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color";
var INVALID_PRIMARY_SHADE_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function isValidPrimaryShade(shade) {
	if (shade < 0 || shade > 9) return false;
	return parseInt(shade.toString(), 10) === shade;
}
function validateMantineTheme(theme) {
	if (!(theme.primaryColor in theme.colors)) throw new Error(INVALID_PRIMARY_COLOR_ERROR);
	if (typeof theme.primaryShade === "object") {
		if (!isValidPrimaryShade(theme.primaryShade.dark) || !isValidPrimaryShade(theme.primaryShade.light)) throw new Error(INVALID_PRIMARY_SHADE_ERROR);
	}
	if (typeof theme.primaryShade === "number" && !isValidPrimaryShade(theme.primaryShade)) throw new Error(INVALID_PRIMARY_SHADE_ERROR);
}
function mergeMantineTheme(currentTheme, themeOverride) {
	if (!themeOverride) {
		validateMantineTheme(currentTheme);
		return currentTheme;
	}
	const result = deepMerge(currentTheme, themeOverride);
	if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) result.headings.fontFamily = themeOverride.fontFamily;
	validateMantineTheme(result);
	return result;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs
var import_jsx_runtime = require_jsx_runtime();
var MantineThemeContext = (0, import_react.createContext)(null);
var useSafeMantineTheme = () => (0, import_react.use)(MantineThemeContext) || DEFAULT_THEME;
function useMantineTheme() {
	const ctx = (0, import_react.use)(MantineThemeContext);
	if (!ctx) throw new Error("@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app");
	return ctx;
}
function MantineThemeProvider({ theme, children, inherit = true }) {
	const parentTheme = useSafeMantineTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MantineThemeContext, {
		value: (0, import_react.useMemo)(() => mergeMantineTheme(inherit ? parentTheme : DEFAULT_THEME, theme), [
			theme,
			parentTheme,
			inherit
		]),
		children
	});
}
MantineThemeProvider.displayName = "@mantine/core/MantineThemeProvider";
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
function useProps(component, defaultProps, props) {
	const theme = useMantineTheme();
	const contextPropsPayload = theme.components[component]?.defaultProps;
	const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
	return {
		...defaultProps,
		...contextProps,
		...filterProps(props)
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-global-class-names/get-global-class-names.mjs
var FOCUS_CLASS_NAMES = {
	always: "mantine-focus-always",
	auto: "mantine-focus-auto",
	never: "mantine-focus-never"
};
/** Returns classes that are defined globally (focus and active styles) based on options */
function getGlobalClassNames({ theme, options, unstyled }) {
	return clsx(options?.focusable && !unstyled && (theme.focusClassName || FOCUS_CLASS_NAMES[theme.focusRing]), options?.active && !unstyled && theme.activeClassName);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-options-class-names/get-options-class-names.mjs
function getOptionsClassNames({ selector, stylesCtx, options, props, theme }) {
	return resolveClassNames({
		theme,
		classNames: options?.classNames,
		props: options?.props || props,
		stylesCtx
	})[selector];
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-resolved-class-names/get-resolved-class-names.mjs
function getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }) {
	return resolveClassNames({
		theme,
		classNames,
		props,
		stylesCtx
	})[selector];
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-root-class-name/get-root-class-name.mjs
/** Adds `className` to the list if given selector is root */
function getRootClassName({ rootSelector, selector, className }) {
	return rootSelector === selector ? className : void 0;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-selector-class-name/get-selector-class-name.mjs
/** Returns class for given selector from library styles (`*.module.css`) */
function getSelectorClassName({ selector, classes, unstyled }) {
	return unstyled ? void 0 : classes[selector];
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-static-class-names/get-static-class-names.mjs
/** Returns static component classes, for example, `.mantine-Input-wrapper` */
function getStaticClassNames({ themeName, classNamesPrefix, selector, withStaticClass }) {
	if (withStaticClass === false) return [];
	return themeName.map((n) => `${classNamesPrefix}-${n}-${selector}`);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-variant-class-name/get-variant-class-name.mjs
/** Returns variant className, variant is always separated from selector with `--`, for example, `tab--default` */
function getVariantClassName({ options, classes, selector, unstyled }) {
	return options?.variant && !unstyled ? classes[`${selector}--${options.variant}`] : void 0;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-class-name.mjs
function getClassName({ theme, options, themeName, selector, classNamesPrefix, resolvedClassNames, resolvedThemeClassNames, classes, unstyled, className, rootSelector, props, stylesCtx, withStaticClasses, headless, transformedStyles }) {
	return clsx(getGlobalClassNames({
		theme,
		options,
		unstyled: unstyled || headless
	}), resolvedThemeClassNames.map((m) => m[selector]), getVariantClassName({
		options,
		classes,
		selector,
		unstyled: unstyled || headless
	}), resolvedClassNames[selector], getResolvedClassNames({
		selector,
		stylesCtx,
		theme,
		classNames: transformedStyles,
		props
	}), getOptionsClassNames({
		selector,
		stylesCtx,
		options,
		props,
		theme
	}), getRootClassName({
		rootSelector,
		selector,
		className
	}), getSelectorClassName({
		selector,
		classes,
		unstyled: unstyled || headless
	}), withStaticClasses && !headless && getStaticClassNames({
		themeName,
		classNamesPrefix,
		selector,
		withStaticClass: options?.withStaticClass
	}), options?.className);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-style/resolve-style.mjs
function resolveStyle({ style, theme }) {
	if (Array.isArray(style)) return style.reduce((acc, item) => ({
		...acc,
		...resolveStyle({
			style: item,
			theme
		})
	}), {});
	if (typeof style === "function") return style(theme);
	if (style == null) return {};
	return style;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/get-style.mjs
function getStyle({ theme, selector, options, props, stylesCtx, rootSelector, withStylesTransform, resolvedStyles, resolvedThemeStyles, resolvedVars, resolvedRootStyle }) {
	return {
		...resolvedThemeStyles[selector],
		...resolvedStyles[selector],
		...!withStylesTransform && resolveStyles({
			theme,
			styles: options?.styles,
			props: options?.props || props,
			stylesCtx
		})[selector],
		...resolvedVars[selector],
		...rootSelector === selector ? resolvedRootStyle : null,
		...resolveStyle({
			style: options?.style,
			theme
		})
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-vars/merge-vars.mjs
function mergeVars(vars) {
	return vars.reduce((acc, current) => {
		if (current) Object.keys(current).forEach((key) => {
			acc[key] = {
				...acc[key],
				...filterProps(current[key])
			};
		});
		return acc;
	}, {});
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/use-transformed-styles.mjs
function useStylesTransform({ props, stylesCtx, themeName, theme }) {
	const stylesTransform = useMantineStylesTransform()?.();
	const getTransformedStyles = (styles) => {
		if (!stylesTransform) return [];
		return [...styles.map((style) => stylesTransform(style, {
			props,
			theme,
			ctx: stylesCtx
		})), ...themeName.map((n) => stylesTransform(theme.components[n]?.styles, {
			props,
			theme,
			ctx: stylesCtx
		}))].filter(Boolean);
	};
	return {
		getTransformedStyles,
		withStylesTransform: !!stylesTransform
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs
function useStyles({ name, classes, props, stylesCtx, className, style, rootSelector = "root", unstyled, classNames, styles, vars, varsResolver, attributes }) {
	const theme = useMantineTheme();
	const classNamesPrefix = useMantineClassNamesPrefix();
	const withStaticClasses = useMantineWithStaticClasses();
	const headless = useMantineIsHeadless();
	const themeName = (Array.isArray(name) ? name : [name]).filter((n) => n);
	const { withStylesTransform, getTransformedStyles } = useStylesTransform({
		props,
		stylesCtx,
		themeName,
		theme
	});
	const resolvedClassNames = resolveClassNames({
		theme,
		classNames,
		props,
		stylesCtx
	});
	const resolvedThemeClassNames = themeName.map((n) => resolveClassNames({
		theme,
		classNames: theme.components[n]?.classNames,
		props,
		stylesCtx
	}));
	const resolvedComponentStyles = withStylesTransform ? {} : resolveStyles({
		theme,
		styles,
		props,
		stylesCtx
	});
	const resolvedThemeStyles = {};
	if (!withStylesTransform) for (const n of themeName) {
		const resolved = resolveStyles({
			theme,
			styles: theme.components[n]?.styles,
			props,
			stylesCtx
		});
		for (const key of Object.keys(resolved)) resolvedThemeStyles[key] = {
			...resolvedThemeStyles[key],
			...resolved[key]
		};
	}
	const resolvedVars = mergeVars([
		headless ? {} : varsResolver?.(theme, props, stylesCtx),
		...themeName.map((n) => theme.components?.[n]?.vars?.(theme, props, stylesCtx)),
		vars?.(theme, props, stylesCtx)
	]);
	const resolvedRootStyle = resolveStyle({
		style,
		theme
	});
	return (selector, options) => ({
		...attributes?.[selector],
		className: getClassName({
			theme,
			options,
			themeName,
			selector,
			classNamesPrefix,
			resolvedClassNames,
			resolvedThemeClassNames,
			classes,
			unstyled,
			className,
			rootSelector,
			props,
			stylesCtx,
			withStaticClasses,
			headless,
			transformedStyles: getTransformedStyles([options?.styles, styles])
		}),
		style: getStyle({
			theme,
			selector,
			options,
			props,
			stylesCtx,
			rootSelector,
			withStylesTransform,
			resolvedStyles: resolvedComponentStyles,
			resolvedThemeStyles,
			resolvedVars,
			resolvedRootStyle
		})
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/core/InlineStyles/css-object-to-string/css-object-to-string.mjs
function cssObjectToString(css) {
	return keys(css).reduce((acc, rule) => css[rule] !== void 0 ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc, "").trim();
}
//#endregion
//#region node_modules/@mantine/core/esm/core/InlineStyles/styles-to-string/styles-to-string.mjs
function stylesToString({ selector, styles, media, container }) {
	const baseStyles = styles ? cssObjectToString(styles) : "";
	const mediaQueryStyles = !Array.isArray(media) ? [] : media.map((item) => `@media${item.query}{${selector}{${cssObjectToString(item.styles)}}}`);
	const containerStyles = !Array.isArray(container) ? [] : container.map((item) => `@container ${item.query}{${selector}{${cssObjectToString(item.styles)}}}`);
	return `${baseStyles ? `${selector}{${baseStyles}}` : ""}${mediaQueryStyles.join("")}${containerStyles.join("")}`.trim();
}
//#endregion
//#region node_modules/@mantine/core/esm/core/InlineStyles/InlineStyles.mjs
function simpleHash(str) {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) hash = (hash << 5) + hash + str.charCodeAt(i) & 4294967295;
	return (hash >>> 0).toString(36);
}
function InlineStyles({ deduplicate, ...props }) {
	const nonce = useMantineStyleNonce();
	const css = stylesToString(props);
	if (deduplicate) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		href: `mantine-${simpleHash(css)}`,
		precedence: "mantine",
		nonce: nonce?.(),
		children: css
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		"data-mantine-styles": "inline",
		nonce: nonce?.(),
		dangerouslySetInnerHTML: { __html: css }
	});
}
//#endregion
//#region node_modules/@mantine/core/esm/core/InlineStyles/hash-styles.mjs
function djb2Hash(str) {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) hash = (hash << 5) + hash + str.charCodeAt(i) & 4294967295;
	return (hash >>> 0).toString(36);
}
function hashStyleProps(styles, media) {
	return `__mdi__-${djb2Hash(`${styles ? cssObjectToString(styles) : ""}|${Array.isArray(media) ? media.map((m) => `${m.query}:${cssObjectToString(m.styles)}`).join("|") : ""}`)}`;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/extract-style-props/extract-style-props.mjs
function extractStyleProps(others) {
	const { m, mx, my, mt, mb, ml, mr, me, ms, mis, mie, p, px, py, pt, pb, pl, pr, pe, ps, pis, pie, bd, bdrs, bg, c, opacity, ff, fz, fw, lts, ta, lh, fs, tt, td, w, miw, maw, h, mih, mah, bgsz, bgp, bgr, bga, pos, top, left, bottom, right, inset, display, flex, hiddenFrom, visibleFrom, lightHidden, darkHidden, sx, ...rest } = others;
	return {
		styleProps: filterProps({
			m,
			mx,
			my,
			mt,
			mb,
			ml,
			mr,
			me,
			ms,
			mis,
			mie,
			p,
			px,
			py,
			pt,
			pb,
			pl,
			pr,
			pis,
			pie,
			pe,
			ps,
			bd,
			bg,
			c,
			opacity,
			ff,
			fz,
			fw,
			lts,
			ta,
			lh,
			fs,
			tt,
			td,
			w,
			miw,
			maw,
			h,
			mih,
			mah,
			bgsz,
			bgp,
			bgr,
			bga,
			pos,
			top,
			left,
			bottom,
			right,
			inset,
			display,
			flex,
			bdrs,
			hiddenFrom,
			visibleFrom,
			lightHidden,
			darkHidden,
			sx
		}),
		rest
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/style-props-data.mjs
var STYlE_PROPS_DATA = {
	m: {
		type: "spacing",
		property: "margin"
	},
	mt: {
		type: "spacing",
		property: "marginTop"
	},
	mb: {
		type: "spacing",
		property: "marginBottom"
	},
	ml: {
		type: "spacing",
		property: "marginLeft"
	},
	mr: {
		type: "spacing",
		property: "marginRight"
	},
	ms: {
		type: "spacing",
		property: "marginInlineStart"
	},
	me: {
		type: "spacing",
		property: "marginInlineEnd"
	},
	mis: {
		type: "spacing",
		property: "marginInlineStart"
	},
	mie: {
		type: "spacing",
		property: "marginInlineEnd"
	},
	mx: {
		type: "spacing",
		property: "marginInline"
	},
	my: {
		type: "spacing",
		property: "marginBlock"
	},
	p: {
		type: "spacing",
		property: "padding"
	},
	pt: {
		type: "spacing",
		property: "paddingTop"
	},
	pb: {
		type: "spacing",
		property: "paddingBottom"
	},
	pl: {
		type: "spacing",
		property: "paddingLeft"
	},
	pr: {
		type: "spacing",
		property: "paddingRight"
	},
	ps: {
		type: "spacing",
		property: "paddingInlineStart"
	},
	pe: {
		type: "spacing",
		property: "paddingInlineEnd"
	},
	pis: {
		type: "spacing",
		property: "paddingInlineStart"
	},
	pie: {
		type: "spacing",
		property: "paddingInlineEnd"
	},
	px: {
		type: "spacing",
		property: "paddingInline"
	},
	py: {
		type: "spacing",
		property: "paddingBlock"
	},
	bd: {
		type: "border",
		property: "border"
	},
	bdrs: {
		type: "radius",
		property: "borderRadius"
	},
	bg: {
		type: "color",
		property: "background"
	},
	c: {
		type: "textColor",
		property: "color"
	},
	opacity: {
		type: "identity",
		property: "opacity"
	},
	ff: {
		type: "fontFamily",
		property: "fontFamily"
	},
	fz: {
		type: "fontSize",
		property: "fontSize"
	},
	fw: {
		type: "identity",
		property: "fontWeight"
	},
	lts: {
		type: "size",
		property: "letterSpacing"
	},
	ta: {
		type: "identity",
		property: "textAlign"
	},
	lh: {
		type: "lineHeight",
		property: "lineHeight"
	},
	fs: {
		type: "identity",
		property: "fontStyle"
	},
	tt: {
		type: "identity",
		property: "textTransform"
	},
	td: {
		type: "identity",
		property: "textDecoration"
	},
	w: {
		type: "spacing",
		property: "width"
	},
	miw: {
		type: "spacing",
		property: "minWidth"
	},
	maw: {
		type: "spacing",
		property: "maxWidth"
	},
	h: {
		type: "spacing",
		property: "height"
	},
	mih: {
		type: "spacing",
		property: "minHeight"
	},
	mah: {
		type: "spacing",
		property: "maxHeight"
	},
	bgsz: {
		type: "size",
		property: "backgroundSize"
	},
	bgp: {
		type: "identity",
		property: "backgroundPosition"
	},
	bgr: {
		type: "identity",
		property: "backgroundRepeat"
	},
	bga: {
		type: "identity",
		property: "backgroundAttachment"
	},
	pos: {
		type: "identity",
		property: "position"
	},
	top: {
		type: "size",
		property: "top"
	},
	left: {
		type: "size",
		property: "left"
	},
	bottom: {
		type: "size",
		property: "bottom"
	},
	right: {
		type: "size",
		property: "right"
	},
	inset: {
		type: "size",
		property: "inset"
	},
	display: {
		type: "identity",
		property: "display"
	},
	flex: {
		type: "identity",
		property: "flex"
	}
};
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/color-resolver/color-resolver.mjs
function colorResolver(color, theme) {
	const parsedColor = parseThemeColor({
		color,
		theme
	});
	if (parsedColor.color === "dimmed") return "var(--mantine-color-dimmed)";
	if (parsedColor.color === "bright") return "var(--mantine-color-bright)";
	return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color;
}
function textColorResolver(color, theme) {
	const parsedColor = parseThemeColor({
		color,
		theme
	});
	if (parsedColor.isThemeColor && parsedColor.shade === void 0) return `var(--mantine-color-${parsedColor.color}-text)`;
	return colorResolver(color, theme);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/border-resolver/border-resolver.mjs
function borderResolver(value, theme) {
	if (typeof value === "number") return rem(value);
	if (typeof value === "string") {
		const [size, style, ...colorTuple] = value.split(" ").filter((val) => val.trim() !== "");
		let result = `${rem(size)}`;
		style && (result += ` ${style}`);
		colorTuple.length > 0 && (result += ` ${colorResolver(colorTuple.join(" "), theme)}`);
		return result.trim();
	}
	return value;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/font-family-resolver/font-family-resolver.mjs
var values = {
	text: "var(--mantine-font-family)",
	mono: "var(--mantine-font-family-monospace)",
	monospace: "var(--mantine-font-family-monospace)",
	heading: "var(--mantine-font-family-headings)",
	headings: "var(--mantine-font-family-headings)"
};
function fontFamilyResolver(fontFamily) {
	if (typeof fontFamily === "string" && fontFamily in values) return values[fontFamily];
	return fontFamily;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/font-size-resolver/font-size-resolver.mjs
var headings$1 = [
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6"
];
function fontSizeResolver(value, theme) {
	if (typeof value === "string" && value in theme.fontSizes) return `var(--mantine-font-size-${value})`;
	if (typeof value === "string" && headings$1.includes(value)) return `var(--mantine-${value}-font-size)`;
	if (typeof value === "number") return rem(value);
	if (typeof value === "string") return rem(value);
	return value;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/identity-resolver/identity-resolver.mjs
function identityResolver(value) {
	return value;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/line-height-resolver/line-height-resolver.mjs
var headings = [
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6"
];
function lineHeightResolver(value, theme) {
	if (typeof value === "string" && value in theme.lineHeights) return `var(--mantine-line-height-${value})`;
	if (typeof value === "string" && headings.includes(value)) return `var(--mantine-${value}-line-height)`;
	return value;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/radius-resolver/radius-resolver.mjs
function radiusResolver(value, theme) {
	if (typeof value === "string" && value in theme.radius) return `var(--mantine-radius-${value})`;
	if (typeof value === "number") return rem(value);
	if (typeof value === "string") return rem(value);
	return value;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/size-resolver/size-resolver.mjs
function sizeResolver(value) {
	if (typeof value === "number") return rem(value);
	return value;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/spacing-resolver/spacing-resolver.mjs
function spacingResolver(value, theme) {
	if (typeof value === "number") return rem(value);
	if (typeof value === "string") {
		const mod = value.replace("-", "");
		if (!(mod in theme.spacing)) return rem(value);
		const variable = `--mantine-spacing-${mod}`;
		return value.startsWith("-") ? `calc(var(${variable}) * -1)` : `var(${variable})`;
	}
	return value;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/resolvers/index.mjs
var resolvers = {
	color: colorResolver,
	textColor: textColorResolver,
	fontSize: fontSizeResolver,
	spacing: spacingResolver,
	radius: radiusResolver,
	identity: identityResolver,
	size: sizeResolver,
	lineHeight: lineHeightResolver,
	fontFamily: fontFamilyResolver,
	border: borderResolver
};
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/sort-media-queries.mjs
function replaceMediaQuery(query) {
	return query.replace("(min-width: ", "").replace("em)", "");
}
function sortMediaQueries({ media, ...props }) {
	const sortedMedia = Object.keys(media).sort((a, b) => Number(replaceMediaQuery(a)) - Number(replaceMediaQuery(b))).map((query) => ({
		query,
		styles: media[query]
	}));
	return {
		...props,
		media: sortedMedia
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/parse-style-props.mjs
function hasResponsiveStyles(styleProp) {
	if (typeof styleProp !== "object" || styleProp === null) return false;
	const breakpoints = Object.keys(styleProp);
	if (breakpoints.length === 1 && breakpoints[0] === "base") return false;
	return true;
}
function getBaseValue(value) {
	if (typeof value === "object" && value !== null) {
		if ("base" in value) return value.base;
		return;
	}
	return value;
}
function getBreakpointKeys(value) {
	if (typeof value === "object" && value !== null) return keys(value).filter((key) => key !== "base");
	return [];
}
function getBreakpointValue(value, breakpoint) {
	if (typeof value === "object" && value !== null && breakpoint in value) return value[breakpoint];
	return value;
}
function parseStyleProps({ styleProps, data, theme }) {
	return sortMediaQueries(keys(styleProps).reduce((acc, styleProp) => {
		if (styleProp === "hiddenFrom" || styleProp === "visibleFrom" || styleProp === "sx") return acc;
		const propertyData = data[styleProp];
		const properties = Array.isArray(propertyData.property) ? propertyData.property : [propertyData.property];
		const baseValue = getBaseValue(styleProps[styleProp]);
		if (!hasResponsiveStyles(styleProps[styleProp])) {
			properties.forEach((property) => {
				acc.inlineStyles[property] = resolvers[propertyData.type](baseValue, theme);
			});
			return acc;
		}
		acc.hasResponsiveStyles = true;
		const breakpoints = getBreakpointKeys(styleProps[styleProp]);
		properties.forEach((property) => {
			if (baseValue != null) acc.styles[property] = resolvers[propertyData.type](baseValue, theme);
			breakpoints.forEach((breakpoint) => {
				const bp = `(min-width: ${theme.breakpoints[breakpoint]})`;
				acc.media[bp] = {
					...acc.media[bp],
					[property]: resolvers[propertyData.type](getBreakpointValue(styleProps[styleProp], breakpoint), theme)
				};
			});
		});
		return acc;
	}, {
		hasResponsiveStyles: false,
		styles: {},
		inlineStyles: {},
		media: {}
	}));
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/use-random-classname/use-random-classname.mjs
function useRandomClassName() {
	return `__m__-${(0, import_react.useId)().replace(/[:«»]/g, "")}`;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/factory/create-polymorphic-component.mjs
function createPolymorphicComponent(component) {
	return component;
}
var polymorphic = createPolymorphicComponent;
//#endregion
//#region node_modules/@mantine/core/esm/core/factory/factory.mjs
function identity(value) {
	return value;
}
function factory(ui) {
	const Component = ui;
	Component.extend = identity;
	Component.withProps = (fixedProps) => {
		const Extended = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
			...fixedProps,
			...props
		});
		Extended.extend = Component.extend;
		Extended.displayName = `WithProps(${Component.displayName})`;
		return Extended;
	};
	return Component;
}
function genericFactory(ui) {
	return factory(ui);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/factory/polymorphic-factory.mjs
function polymorphicFactory(ui) {
	const Component = ui;
	Component.withProps = (fixedProps) => {
		const Extended = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
			...fixedProps,
			...props
		});
		Extended.extend = Component.extend;
		Extended.displayName = `WithProps(${Component.displayName})`;
		return Extended;
	};
	Component.extend = identity;
	return Component;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/get-box-mod/get-box-mod.mjs
function transformModKey(key) {
	return `data-${(key.startsWith("data-") ? key.slice(5) : key).replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
}
function getMod(props) {
	return Object.keys(props).reduce((acc, key) => {
		const value = props[key];
		if (value === void 0 || value === "" || value === false || value === null) return acc;
		acc[transformModKey(key)] = props[key];
		return acc;
	}, {});
}
function getBoxMod(mod) {
	if (!mod) return null;
	if (typeof mod === "string") return { [transformModKey(mod)]: true };
	if (Array.isArray(mod)) return [...mod].reduce((acc, value) => ({
		...acc,
		...getBoxMod(value)
	}), {});
	return getMod(mod);
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/get-box-style/get-box-style.mjs
function mergeStyles(styles, theme) {
	if (Array.isArray(styles)) return [...styles].reduce((acc, item) => ({
		...acc,
		...mergeStyles(item, theme)
	}), {});
	if (typeof styles === "function") return styles(theme);
	if (styles == null) return {};
	return styles;
}
function getBoxStyle({ theme, style, vars, styleProps }) {
	const _style = mergeStyles(style, theme);
	const _vars = mergeStyles(vars, theme);
	return {
		..._style,
		..._vars,
		...styleProps
	};
}
//#endregion
//#region node_modules/@mantine/core/esm/core/Box/Box.mjs
function _Box({ component, style, __vars, className, variant, mod, size, hiddenFrom, visibleFrom, lightHidden, darkHidden, renderRoot, __size, ref, ...others }) {
	const theme = useMantineTheme();
	const Element = component || "div";
	const { styleProps, rest } = extractStyleProps(others);
	const transformedSx = useMantineSxTransform()?.()?.(styleProps.sx);
	const randomClassName = useRandomClassName();
	const parsedStyleProps = parseStyleProps({
		styleProps,
		theme,
		data: STYlE_PROPS_DATA
	});
	const deduplicateInlineStyles = useMantineDeduplicateInlineStyles();
	const responsiveClassName = deduplicateInlineStyles && parsedStyleProps.hasResponsiveStyles ? hashStyleProps(parsedStyleProps.styles, parsedStyleProps.media) : randomClassName;
	const props = {
		ref,
		style: getBoxStyle({
			theme,
			style,
			vars: __vars,
			styleProps: parsedStyleProps.inlineStyles
		}),
		className: clsx(className, transformedSx, {
			[responsiveClassName]: parsedStyleProps.hasResponsiveStyles,
			"mantine-light-hidden": lightHidden,
			"mantine-dark-hidden": darkHidden,
			[`mantine-hidden-from-${hiddenFrom}`]: hiddenFrom,
			[`mantine-visible-from-${visibleFrom}`]: visibleFrom
		}),
		"data-variant": variant,
		"data-size": isNumberLike(size) ? void 0 : size || void 0,
		size: __size,
		...getBoxMod(mod),
		...rest
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStyles, {
		selector: `.${responsiveClassName}`,
		styles: parsedStyleProps.styles,
		media: parsedStyleProps.media,
		deduplicate: deduplicateInlineStyles
	}), typeof renderRoot === "function" ? renderRoot(props) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Element, { ...props })] });
}
_Box.displayName = "@mantine/core/Box";
var Box = polymorphic(_Box);
//#endregion
export { resolveClassNames as A, em as B, rgba as C, parseThemeColor as D, getThemeColor as E, getRadius as F, deepMerge as H, getShadow as I, getSize as L, createVarsResolver as M, getFontSize as N, getPrimaryShade as O, getLineHeight as P, getSpacing as R, alpha as S, darken as T, keys as U, rem as V, useMantineContext as _, polymorphic as a, useMantineEnv as b, extractStyleProps as c, useStyles as d, useProps as f, MantineContext as g, DEFAULT_THEME as h, genericFactory as i, clsx as j, resolveStyles as k, hashStyleProps as l, useMantineTheme as m, polymorphicFactory as n, useRandomClassName as o, MantineThemeProvider as p, factory as r, parseStyleProps as s, Box as t, InlineStyles as u, useMantineCssVariablesResolver as v, getGradient as w, useMantineStyleNonce as x, useMantineDeduplicateInlineStyles as y, filterProps as z };
