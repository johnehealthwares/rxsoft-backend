import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
//#region node_modules/@mantine/core/esm/core/utils/create-safe-context/create-safe-context.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function createSafeContext(errorMessage) {
	const Context = (0, import_react.createContext)(null);
	const useSafeContext = () => {
		const ctx = (0, import_react.use)(Context);
		if (ctx === null) throw new Error(errorMessage);
		return ctx;
	};
	return [Context, useSafeContext];
}
//#endregion
export { createSafeContext as t };
