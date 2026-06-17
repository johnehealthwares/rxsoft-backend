import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Link } from "./link-D-damaRz.js";
import { Jt as DataPageShell, Sr as lisApi, Wr as Grid, Yt as RxPage, Zn as CircleCheck } from "./index-DwQ-NyPQ.js";
import { n as lisResources } from "./resources-ClFmKpTS.js";
//#region src/features/lis/pages/lis-page.tsx
var import_jsx_runtime = require_jsx_runtime();
function LisPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Laboratory Information System",
		description: "Manage LIS test catalogs, sample handling, locations, priorities and reference ranges.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: "dimmed",
				children: "Choose a LIS resource to manage, then open it in its own dedicated page."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: lisResources.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 12,
					sm: 6,
					md: 4
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					shadow: "sm",
					padding: "lg",
					radius: "md",
					withBorder: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 600,
							children: resource.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: "dimmed",
							size: "sm",
							children: resource.description
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							component: Link,
							to: `/lis/${resource.key}`,
							variant: "light",
							children: ["Manage ", resource.title]
						})]
					})
				})
			}, resource.key)) })]
		})
	});
}
//#endregion
//#region src/features/lis/pages/resource-page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function resourceToConfig(resource) {
	return {
		id: resource.key,
		title: resource.title,
		description: resource.description,
		endpoint: resource.endpoint,
		columns: resource.columns,
		modalTitle: `Add ${resource.title}`,
		tabGroups: resource.tabGroups,
		createFields: resource.createFields,
		createFieldGroups: resource.createFieldGroups,
		buildCreatePayload: (values) => values,
		buildUpdatePayload: (values) => values,
		canDelete: true
	};
}
function LisResourcePage({ resource }) {
	const [coverage, setCoverage] = (0, import_react.useState)("");
	async function checkCoverage(formState) {
		const testId = String(formState.testId ?? "");
		if (!testId) return;
		const issues = (await lisApi.get(`/lis/reference-ranges/coverage/${testId}`)).data?.issues ?? [];
		setCoverage(issues.length ? issues.map((issue) => issue.message).join("\n") : "No uncovered or overlapping ranges found.");
	}
	const renderCreateExtras = resource.key === "reference-ranges" ? ({ formState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "light",
			leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }),
			onClick: () => checkCoverage(formState),
			children: "Check Coverage"
		}), coverage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value: coverage,
			readOnly: true,
			minRows: 3
		}) : null]
	}) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...resourceToConfig(resource),
		renderCreateExtras
	} });
}
//#endregion
export { LisPage as n, LisResourcePage as t };
