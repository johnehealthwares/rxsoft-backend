import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { Jt as DataPageShell, cr as FormProvider } from "./index-DwQ-NyPQ.js";
import { n as uomCategoryConfig } from "./schema-BSteaVgs.js";
//#region src/features/rxsoft/pages/uom-category/create.tsx
var import_jsx_runtime = require_jsx_runtime();
//#endregion
//#region src/features/rxsoft/pages/uom-category/index.tsx
function RxUomCategoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormProvider, {
		initialState: {},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: uomCategoryConfig })
	});
}
//#endregion
//#region src/routes/_authenticated/rxsoft/uom-category/index.tsx?tsr-split=component
var SplitComponent = RxUomCategoryPage;
//#endregion
export { SplitComponent as component };
