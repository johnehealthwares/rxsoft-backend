import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { a as EmptyHealthConcerns } from "./empty-states-DMCYhOTG.js";
import { B as muted, P as WebsiteLayout, Pr as Title, R as ink, dt as HealthConcernCard, tt as useHealthConcerns } from "./index-BRcLwOKn.js";
import { o as SectionLoader } from "./loaders-CcOWIeHC.js";
//#region src/features/damorex/health-concerns/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function HealthConcernsPage() {
	const { data: concerns, isLoading } = useHealthConcerns();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					className: "damorex-heading",
					style: { color: ink },
					children: "Health Concerns"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					size: "lg",
					lh: 1.7,
					children: "Browse medicines and educational content organized by health condition."
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLoader, {}) : !concerns?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHealthConcerns, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
					cols: {
						base: 2,
						sm: 3,
						lg: 4
					},
					spacing: "md",
					children: concerns.map((concern, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthConcernCard, {
						concern,
						index: i
					}, concern.id))
				})
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/health-concerns.tsx?tsr-split=component
var SplitComponent = HealthConcernsPage;
//#endregion
export { SplitComponent as component };
