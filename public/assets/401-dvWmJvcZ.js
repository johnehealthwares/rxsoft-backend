import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Center } from "./Center-UaCPHyv3.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as useRouter } from "./useRouter-BXm9s-pB.js";
import { Lr as Title, Pr as useNavigate } from "./index-DuM1cidb.js";
//#region src/features/errors/unauthorized-error.tsx
var import_jsx_runtime = require_jsx_runtime();
function UnauthorisedError() {
	const navigate = useNavigate();
	const { history } = useRouter();
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
					children: "401"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 500,
					children: "Unauthorized Access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					c: "dimmed",
					ta: "center",
					children: [
						"Please log in with the appropriate credentials ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"to access this resource."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					mt: "md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => history.go(-1),
						children: "Go Back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => navigate({ to: "/" }),
						children: "Back to Home"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/routes/(errors)/401.tsx?tsr-split=component
var SplitComponent = UnauthorisedError;
//#endregion
export { SplitComponent as component };
