import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Code } from "./Code-CRGUvjCr.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { t as communicationApi } from "./communication-api-Cd2UxqAK.js";
import { Hr as Grid, Jt as RxPage, Ur as Alert } from "./index-BRcLwOKn.js";
//#region src/features/communication/pages/audit-center.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AuditCenterPage() {
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [searchId, setSearchId] = (0, import_react.useState)("");
	const { data: traces, isLoading: isListing, isError: hasListError, refetch } = useQuery({
		queryKey: [
			"communication",
			"flow",
			"traces"
		],
		queryFn: async () => {
			return (await communicationApi.get("/v1/flow/traces?limit=50")).data;
		},
		retry: false
	});
	const { data: audit, isLoading: isLoadingAudit, isError: hasAuditError } = useQuery({
		queryKey: [
			"communication",
			"flow",
			"audit",
			selectedId
		],
		queryFn: async () => {
			if (!selectedId) return null;
			return (await communicationApi.get(`/v1/flow/audit/${encodeURIComponent(selectedId)}`)).data;
		},
		enabled: !!selectedId,
		retry: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Audit Center",
		description: "Browse recent switch traces and inspect audit details for message delivery.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => refetch(),
			children: "Refresh Traces"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
			gap: "lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 12,
					xl: 7
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					withBorder: true,
					radius: "md",
					p: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								align: "flex-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									style: { flex: 1 },
									value: searchId,
									onChange: (e) => setSearchId(e.currentTarget.value),
									placeholder: "Search trace by message ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => setSelectedId(searchId.trim()),
									disabled: !searchId.trim(),
									children: "Load Audit"
								})]
							}),
							isListing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "sm" }),
							hasListError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
								color: "red",
								variant: "light",
								children: "Unable to load recent traces."
							}),
							Array.isArray(traces) && traces.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								gap: "xs",
								children: traces.map((trace) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									withBorder: true,
									radius: "md",
									p: "sm",
									onClick: () => setSelectedId(trace.messageId),
									style: { cursor: "pointer" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										justify: "space-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											fw: 500,
											children: trace.messageId
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
											size: "xs",
											c: "dimmed",
											children: ["Status: ", trace.status]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
											size: "xs",
											c: "dimmed",
											children: ["Events: ", trace.events?.length ?? 0]
										})]
									})
								}, trace.messageId))
							}) : !isListing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: "dimmed",
								children: "No recent traces available yet."
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 12,
					xl: 5
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					withBorder: true,
					radius: "md",
					p: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								justify: "space-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 600,
									children: "Audit Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "sm",
									c: "dimmed",
									children: ["Selected message ID: ", selectedId || "None"]
								})] }), selectedId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "light",
									size: "xs",
									onClick: () => setSelectedId(""),
									children: "Clear"
								})]
							}),
							isLoadingAudit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "sm" }),
							hasAuditError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
								color: "red",
								variant: "light",
								children: "Unable to load audit for this message."
							}),
							audit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								withBorder: true,
								radius: "md",
								p: "sm",
								bg: "gray.0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 600,
									children: "Audit Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
									h: 300,
									mt: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, {
										block: true,
										children: JSON.stringify(audit, null, 2)
									})
								})]
							}) : selectedId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: "dimmed",
								children: "No audit data found for this message ID."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: "dimmed",
								children: "Select a trace to view audit details."
							})
						]
					})
				})
			})]
		})
	});
}
//#endregion
//#region src/routes/_authenticated/communication/audit-center.tsx?tsr-split=component
var SplitComponent = AuditCenterPage;
//#endregion
export { SplitComponent as component };
