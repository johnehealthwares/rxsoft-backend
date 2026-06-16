import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as useRouter } from "./useRouter-BXm9s-pB.js";
import { g as replaceEqualDeep, n as invariant, t as useStore } from "./useStore-D2OWgQ7j.js";
import { n as matchContext, t as dummyMatchContext } from "./matchContext-BSve_Qwq.js";
//#region node_modules/@tanstack/react-router/dist/esm/useMatch.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var dummyStore = {
	get: () => void 0,
	subscribe: () => ({ unsubscribe: () => {} })
};
/**
* Read and select the nearest or targeted route match.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchHook
*/
function useMatch(opts) {
	const router = useRouter();
	const nearestMatchId = import_react.useContext(opts.from ? dummyMatchContext : matchContext);
	const key = opts.from ?? nearestMatchId;
	const matchStore = key ? opts.from ? router.stores.getRouteMatchStore(key) : router.stores.matchStores.get(key) : void 0;
	const previousResult = import_react.useRef(void 0);
	return useStore(matchStore ?? dummyStore, (match) => {
		if ((opts.shouldThrow ?? true) && !match) invariant();
		if (match === void 0) return;
		const selected = opts.select ? opts.select(match) : match;
		if (opts.structuralSharing ?? router.options.defaultStructuralSharing) {
			const shared = replaceEqualDeep(previousResult.current, selected);
			previousResult.current = shared;
			return shared;
		}
		return selected;
	});
}
//#endregion
export { useMatch as t };
