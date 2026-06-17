import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Link } from "./link-D-damaRz.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { Nr as Outlet } from "./index-DwQ-NyPQ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleParking = createLucideIcon("circle-parking", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M9 17V7h4a3 3 0 0 1 0 6H9",
	key: "1dfk2c"
}]]);
//#endregion
//#region src/routes/clerk/(auth)/route.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function ClerkAuthLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-e",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-slate-500" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "relative z-20 flex items-center text-lg font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleParking, { className: "me-2" }), "Multi Admin"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleParking, { className: "relative m-auto size-96" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-20 mt-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg",
							children: "“ Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, magni debitis inventore asperiores velit! ”"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
							className: "text-sm",
							children: "John Doe"
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex w-full flex-col items-center justify-center gap-4",
				children: [
					"Welcome to the example Clerk auth page. ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Back to",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "underline decoration-dashed underline-offset-2",
						children: "Dashboard"
					}),
					" ",
					"?",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				]
			})
		})]
	});
}
//#endregion
export { ClerkAuthLayout as component };
