import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { Yt as RxPage, dr as Route } from "./index-DuM1cidb.js";
import { t as getLisResourceByKey } from "./resources-ClFmKpTS.js";
import { t as LisResourcePage } from "./pages-jNiQ_sbL.js";
//#region src/routes/_authenticated/lis/$resourceKey.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	const { resourceKey } = Route.useParams();
	const resource = getLisResourceByKey(resourceKey);
	if (!resource) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Laboratory Information System",
		description: "Manage LIS test catalogs, sample handling, locations, priorities and reference ranges.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: "dimmed",
				children: "Choose a LIS resource to manage, then open it in its own dedicated page."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LisResourcePage, { resource })]
		})
	});
}
//#endregion
export { RouteComponent as component };
