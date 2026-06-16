import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as randomId } from "./random-id-4PbbZuoM.js";
import { t as useIsomorphicEffect } from "./use-isomorphic-effect-n8PrQSeG.js";
//#region node_modules/@mantine/hooks/esm/use-id/use-id.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useId$1(staticId) {
	const [uuid, setUuid] = (0, import_react.useState)(`mantine-${(0, import_react.useId)().replace(/:/g, "")}`);
	useIsomorphicEffect(() => {
		setUuid(randomId());
	}, []);
	if (typeof staticId === "string") return staticId;
	return uuid;
}
//#endregion
export { useId$1 as t };
