import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
//#region src/lib/show-submitted-data.tsx
var import_jsx_runtime = require_jsx_runtime();
function showSubmittedData(data, title = "You submitted the following values:") {
	notifications.show({
		title,
		message: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "text-white",
				children: JSON.stringify(data, null, 2)
			})
		})
	});
}
//#endregion
export { showSubmittedData as t };
