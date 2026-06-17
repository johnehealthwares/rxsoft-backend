import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Phone } from "./phone-C5YX5jYe.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { i as EmptyConsultations } from "./empty-states-CnzeOGKL.js";
import { t as Video } from "./video-D3Fnvoza.js";
import { B as line, F as WebsiteLayout, Lr as Title, V as muted, Vn as MessageCircle, X as useConsultations, z as ink } from "./index-DuM1cidb.js";
import { n as PageLoader } from "./loaders-Dr-tBb5Z.js";
//#region src/features/damorex/consultations/list.tsx
var import_jsx_runtime = require_jsx_runtime();
var channelIcons = {
	WhatsApp: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 16 }),
	Phone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 16 }),
	"Video Call": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 16 })
};
function ConsultationsPage() {
	const { data: consultations, isLoading } = useConsultations();
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
				children: "My Consultations"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "History of your pharmacist consultations."
			})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) : !consultations?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyConsultations, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: "sm",
				children: consultations.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 20,
					p: "lg",
					withBorder: true,
					style: { borderColor: line },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: 4,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 8,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										radius: "xl",
										color: c.status === "Completed" ? "green" : c.status === "In Progress" ? "blue" : "yellow",
										children: c.status
									})]
								}),
								c.symptoms ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: c.symptoms
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xs",
									c: muted,
									children: new Date(c.createdAt).toLocaleDateString()
								})
							]
						}), channelIcons[c.channel] || null]
					})
				}, c.id))
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/consultations.tsx?tsr-split=component
var SplitComponent = ConsultationsPage;
//#endregion
export { SplitComponent as component };
