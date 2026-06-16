import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
//#region node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function assignRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (typeof ref === "object" && ref !== null && "current" in ref) ref.current = value;
}
function mergeRefs(...refs) {
	const cleanupMap = /* @__PURE__ */ new Map();
	return (node) => {
		refs.forEach((ref) => {
			const cleanup = assignRef(ref, node);
			if (cleanup) cleanupMap.set(ref, cleanup);
		});
		if (cleanupMap.size > 0) return () => {
			refs.forEach((ref) => {
				const cleanup = cleanupMap.get(ref);
				if (cleanup && typeof cleanup === "function") cleanup();
				else assignRef(ref, null);
			});
			cleanupMap.clear();
		};
	};
}
function useMergedRef(...refs) {
	return (0, import_react.useCallback)(mergeRefs(...refs), refs);
}
//#endregion
export { mergeRefs as n, useMergedRef as r, assignRef as t };
