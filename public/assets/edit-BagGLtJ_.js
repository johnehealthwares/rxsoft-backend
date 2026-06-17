import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { c as RxUomEditPage, t as Route } from "./index-DuM1cidb.js";
//#region src/routes/_authenticated/rxsoft/uoms/$uomId/edit.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function UomEditRoute() {
	const { uomId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxUomEditPage, { uomId });
}
//#endregion
export { UomEditRoute as component };
