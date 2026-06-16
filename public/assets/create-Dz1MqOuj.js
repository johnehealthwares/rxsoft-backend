import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { n as Route, or as getModelConfig } from "./index-BRcLwOKn.js";
import { t as DataPageForm } from "./data-page-form-DlDLU2vV.js";
//#region src/routes/_authenticated/$moduleId/$page/create.tsx?tsr-split=component
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
