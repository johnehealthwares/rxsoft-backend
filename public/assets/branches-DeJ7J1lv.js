import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { r as MapPin, t as Phone } from "./phone-MyagsAGu.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { B as muted, K as useBranches, P as WebsiteLayout, Pr as Title, R as ink, Xn as ChevronRight, jr as useNavigate, qn as Clock3, z as line } from "./index-BRcLwOKn.js";
//#region src/features/damorex/branches/list.tsx
var import_jsx_runtime = require_jsx_runtime();
function BranchesPage() {
	const { data: branches, isLoading } = useBranches();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 1,
				className: "damorex-heading",
				style: { color: ink },
				children: "Our Branches"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "Visit any of our pharmacy locations."
			})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "Loading branches..." }) : !branches?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				children: "No branches listed yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: "sm",
				children: branches.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					className: "lift-card",
					radius: 24,
					p: "lg",
					withBorder: true,
					style: {
						borderColor: line,
						cursor: "pointer"
					},
					onClick: () => navigate({ to: `/damorex/branches/${branch.id}` }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: 6,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									size: "lg",
									children: branch.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										size: 14,
										color: muted
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: muted,
										children: branch.address
									})]
								}),
								branch.openingHours ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
										size: 14,
										color: muted
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: muted,
										children: branch.openingHours
									})]
								}) : null,
								branch.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
										size: 14,
										color: muted
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: muted,
										children: branch.phone
									})]
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							size: 20,
							color: muted
						})]
					})
				}, branch.id))
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/branches.tsx?tsr-split=component
var SplitComponent = BranchesPage;
//#endregion
export { SplitComponent as component };
