import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { Lr as Title } from "./index-DwQ-NyPQ.js";
//#region src/features/settings/components/content-section.tsx
var import_jsx_runtime = require_jsx_runtime();
function ContentSection({ title, desc, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		h: "100%",
		flex: 1,
		gap: 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 3,
				size: "lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "sm",
				c: "dimmed",
				children: desc
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { my: "md" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				style: {
					height: "100%",
					width: "100%",
					overflowY: "auto",
					scrollBehavior: "smooth",
					paddingRight: "1rem",
					paddingBottom: "3rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: {
						marginInline: "-0.25rem",
						paddingInline: "0.375rem",
						maxWidth: "36rem"
					},
					children
				})
			})
		]
	});
}
//#endregion
export { ContentSection as t };
