import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { r as MapPin, t as Phone } from "./phone-MyagsAGu.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { B as muted, Bn as Mail, G as useBranch, Ir as ThemeIcon, Nr as useParams, P as WebsiteLayout, Pr as Title, R as ink, qn as Clock3, z as line } from "./index-BRcLwOKn.js";
//#region src/features/damorex/branches/detail.tsx
var import_jsx_runtime = require_jsx_runtime();
function BranchDetailPage() {
	const { id } = useParams({ from: "/damorex/branches/$id" });
	const { data: branch, isLoading } = useBranch(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
		py: {
			base: 28,
			md: 48
		},
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "Loading branch..." }) : !branch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			c: muted,
			children: "Branch not found."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 1,
				className: "damorex-heading",
				style: { color: ink },
				children: branch.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				radius: 24,
				p: "xl",
				withBorder: true,
				style: { borderColor: line },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								color: "green",
								variant: "light",
								size: 44,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 22 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									children: "Address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: muted,
									children: branch.address
								}),
								branch.city ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: branch.city
								}) : null
							] })]
						}),
						branch.openingHours ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								color: "green",
								variant: "light",
								size: 44,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 22 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: "Opening Hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								children: branch.openingHours
							})] })]
						}) : null,
						branch.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								color: "green",
								variant: "light",
								size: 44,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 22 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: "Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								children: branch.phone
							})] })]
						}) : null,
						branch.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								color: "green",
								variant: "light",
								size: 44,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 22 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								children: branch.email
							})] })]
						}) : null
					]
				})
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/branches.$id.tsx?tsr-split=component
var SplitComponent = BranchDetailPage;
//#endregion
export { SplitComponent as component };
