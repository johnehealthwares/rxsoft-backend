import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Center } from "./Center-UaCPHyv3.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { Lr as Title } from "./index-DwQ-NyPQ.js";
//#region src/features/errors/maintenance-error.tsx
var import_jsx_runtime = require_jsx_runtime();
function MaintenanceError() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
		style: {
			height: "100vh",
			width: "100%"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			align: "center",
			gap: "xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					size: "6rem",
					children: "503"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 500,
					children: "Website is under maintenance!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					c: "dimmed",
					ta: "center",
					children: [
						"The site is not available at the moment. ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"We'll be back online shortly."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
					mt: "md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Learn more"
					})
				})
			]
		})
	});
}
//#endregion
//#region src/routes/(errors)/503.tsx?tsr-split=component
var SplitComponent = MaintenanceError;
//#endregion
export { SplitComponent as component };
