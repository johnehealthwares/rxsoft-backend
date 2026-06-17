import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { r as Route, s as RxUomDetailsPage } from "./index-DwQ-NyPQ.js";
//#region src/routes/_authenticated/rxsoft/uoms/$uomId.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function UomDetailsRoute() {
	const { uomId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxUomDetailsPage, { uomId });
}
//#endregion
export { UomDetailsRoute as component };
