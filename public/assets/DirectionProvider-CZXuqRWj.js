import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/core/DirectionProvider/DirectionProvider.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
require_jsx_runtime();
var DirectionContext = (0, import_react.createContext)({
	dir: "ltr",
	toggleDirection: () => {},
	setDirection: () => {}
});
function useDirection() {
	return (0, import_react.use)(DirectionContext);
}
//#endregion
export { useDirection as t };
