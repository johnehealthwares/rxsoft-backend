import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { s as EmptyPrescriptions } from "./empty-states-DMCYhOTG.js";
import { B as muted, Ir as ThemeIcon, P as WebsiteLayout, Pr as Title, Qn as Check, R as ink, Wn as Eye, gn as X, it as usePrescriptions, qn as Clock3, z as line } from "./index-BRcLwOKn.js";
import { r as PrescriptionLoader } from "./loaders-CcOWIeHC.js";
//#region src/features/damorex/prescriptions/list.tsx
var import_jsx_runtime = require_jsx_runtime();
var statusColors = {
	Pending: "yellow",
	"Under Review": "blue",
	Approved: "green",
	Rejected: "red",
	Fulfilled: "teal"
};
var statusIcons = {
	Pending: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 20 }),
	"Under Review": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 }),
	Approved: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 20 }),
	Rejected: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 }),
	Fulfilled: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 20 })
};
function MyPrescriptionsPage() {
	const { data: prescriptions, isLoading } = usePrescriptions();
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
				children: "My Prescriptions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "Track the status of your uploaded prescriptions."
			})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrescriptionLoader, {}) : !prescriptions?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPrescriptions, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: "sm",
				children: prescriptions.map((prescription) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 20,
					p: "lg",
					withBorder: true,
					style: { borderColor: line },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						wrap: "nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: 4,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 8,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										radius: "xl",
										color: statusColors[prescription.status] || "gray",
										children: prescription.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: muted,
										children: new Date(prescription.createdAt).toLocaleDateString()
									})]
								}),
								prescription.pharmacistNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "sm",
									c: muted,
									lh: 1.7,
									children: ["Pharmacist note: ", prescription.pharmacistNotes]
								}) : null,
								prescription.files?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "xs",
									c: muted,
									children: [prescription.files.length, " file(s) uploaded"]
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
							radius: "xl",
							color: statusColors[prescription.status] || "gray",
							variant: "light",
							children: statusIcons[prescription.status] || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 20 })
						})]
					})
				}, prescription.id))
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/my-prescriptions.tsx?tsr-split=component
var SplitComponent = MyPrescriptionsPage;
//#endregion
export { SplitComponent as component };
