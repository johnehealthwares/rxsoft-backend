import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { g as MantineContext, x as useMantineStyleNonce } from "./Box-7OfPvxF3.js";
import { t as noop } from "./noop-BsaY-mWI.js";
import { a as useMediaQuery } from "./Transition-Cmaaz8Kh.js";
//#region node_modules/@mantine/hooks/esm/use-color-scheme/use-color-scheme.mjs
function useColorScheme(initialValue, options) {
	return useMediaQuery("(prefers-color-scheme: dark)", initialValue === "dark", options) ? "dark" : "light";
}
//#endregion
//#region node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-mantine-color-scheme.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function disableTransition(nonce) {
	const style = document.createElement("style");
	style.setAttribute("data-mantine-styles", "inline");
	style.innerHTML = "*, *::before, *::after {transition: none !important;}";
	style.setAttribute("data-mantine-disable-transition", "true");
	nonce && style.setAttribute("nonce", nonce);
	document.head.appendChild(style);
	const clear = () => document.querySelectorAll("[data-mantine-disable-transition]").forEach((element) => element.remove());
	return clear;
}
function useMantineColorScheme({ keepTransitions } = {}) {
	const clearStylesRef = (0, import_react.useRef)(noop);
	const timeoutRef = (0, import_react.useRef)(-1);
	const ctx = (0, import_react.use)(MantineContext);
	const nonceValue = (0, import_react.useRef)(useMantineStyleNonce()?.());
	if (!ctx) throw new Error("[@mantine/core] MantineProvider was not found in tree");
	const setColorScheme = (value) => {
		ctx.setColorScheme(value);
		clearStylesRef.current = keepTransitions ? () => {} : disableTransition(nonceValue.current);
		window.clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			clearStylesRef.current?.();
		}, 10);
	};
	const clearColorScheme = () => {
		ctx.clearColorScheme();
		clearStylesRef.current = keepTransitions ? () => {} : disableTransition(nonceValue.current);
		window.clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			clearStylesRef.current?.();
		}, 10);
	};
	const osColorScheme = useColorScheme("light", { getInitialValueInEffect: false });
	const computedColorScheme = ctx.colorScheme === "auto" ? osColorScheme : ctx.colorScheme;
	const toggleColorScheme = (0, import_react.useCallback)(() => setColorScheme(computedColorScheme === "light" ? "dark" : "light"), [setColorScheme, computedColorScheme]);
	(0, import_react.useEffect)(() => () => {
		clearStylesRef.current?.();
		window.clearTimeout(timeoutRef.current);
	}, []);
	return {
		colorScheme: ctx.colorScheme,
		setColorScheme,
		clearColorScheme,
		toggleColorScheme
	};
}
//#endregion
export { useMantineColorScheme as t };
