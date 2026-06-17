import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { lr as getModelConfig, ur as Route } from "./index-DuM1cidb.js";
import { t as DataPageForm } from "./data-page-form-Db64R4xs.js";
//#region src/routes/_authenticated/$page/create.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GenericCreatePage() {
	const { page } = Route.useParams();
	const [modelConfig, setModelConfig] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getModelConfig(page).then(setModelConfig);
	}, [page]);
	if (!modelConfig) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Loading..." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageForm, { config: modelConfig });
}
//#endregion
export { GenericCreatePage as component };
