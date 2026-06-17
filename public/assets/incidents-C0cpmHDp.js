import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Lr as Title, Wr as Grid } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DZbjExJ-.js";
import { C as useIncidents, L as useUpdateIncident, S as useIncidentStats, f as useCreateIncident } from "./admin-hooks-B1eYS0FA.js";
//#region src/features/apm/admin/IncidentsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function IncidentsPage() {
	const { data: stats } = useIncidentStats();
	const createIncident = useCreateIncident();
	const updateIncident = useUpdateIncident();
	const [typeFilter, setTypeFilter] = (0, import_react.useState)(null);
	const [severityFilter, setSeverityFilter] = (0, import_react.useState)(null);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const { data: incidentsData } = useIncidents((0, import_react.useMemo)(() => {
		const p = {
			page,
			limit: 20
		};
		if (typeFilter) p.category = typeFilter;
		if (severityFilter) p.severity = severityFilter;
		if (statusFilter) p.status = statusFilter;
		return p;
	}, [
		typeFilter,
		severityFilter,
		statusFilter,
		page
	]));
	const [opened, { open, close }] = useDisclosure(false);
	const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		pollingUnitId: "",
		type: "other",
		description: "",
		severity: "medium",
		reportedBy: ""
	});
	const statCards = [
		{
			label: "Total Reports",
			value: stats?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Open",
			value: stats?.open ?? 0,
			color: "#EAB308"
		},
		{
			label: "Critical",
			value: stats?.critical ?? 0,
			color: "#DC2626"
		},
		{
			label: "Escalated",
			value: stats?.escalated ?? 0,
			color: "#8B5CF6"
		}
	];
	const severityColor = (s) => s === "critical" ? "red" : s === "high" ? "orange" : s === "medium" ? "yellow" : "gray";
	const typeColor = (t) => t === "violence" ? "red" : t === "intimidation" ? "orange" : t === "rigging" ? "pink" : t === "equipment-failure" ? "yellow" : "gray";
	const handleCreate = () => {
		createIncident.mutate(form, { onSuccess: () => {
			close();
			setForm({
				pollingUnitId: "",
				type: "other",
				description: "",
				severity: "medium",
				reportedBy: ""
			});
		} });
	};
	const handleEscalate = (id, field) => {
		updateIncident.mutate({
			id,
			data: { [field]: true }
		});
	};
	const handleResolve = (id) => {
		updateIncident.mutate({
			id,
			data: { status: "resolved" }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					style: { color: ink },
					children: "Election Protection — Incident Reports"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: open,
					style: { background: apmBlue },
					children: "Report Incident"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: statCards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 6,
					sm: 4,
					md: 3
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					padding: "md",
					radius: "md",
					withBorder: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 2,
						align: "center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							style: { color: muted },
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 800,
							style: {
								fontSize: "1.5rem",
								color: s.color,
								lineHeight: 1.2
							},
							children: s.value
						})]
					})
				})
			}, s.label)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Type",
						clearable: true,
						data: [
							{
								value: "violence",
								label: "Violence"
							},
							{
								value: "intimidation",
								label: "Intimidation"
							},
							{
								value: "rigging",
								label: "Rigging"
							},
							{
								value: "equipment-failure",
								label: "Equipment Failure"
							},
							{
								value: "other",
								label: "Other"
							}
						],
						value: typeFilter,
						onChange: (v) => {
							setTypeFilter(v);
							setPage(1);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Severity",
						clearable: true,
						data: [
							{
								value: "low",
								label: "Low"
							},
							{
								value: "medium",
								label: "Medium"
							},
							{
								value: "high",
								label: "High"
							},
							{
								value: "critical",
								label: "Critical"
							}
						],
						value: severityFilter,
						onChange: (v) => {
							setSeverityFilter(v);
							setPage(1);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Status",
						clearable: true,
						data: [{
							value: "open",
							label: "Open"
						}, {
							value: "resolved",
							label: "Resolved"
						}],
						value: statusFilter,
						onChange: (v) => {
							setStatusFilter(v);
							setPage(1);
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				padding: "lg",
				radius: "md",
				withBorder: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					striped: true,
					highlightOnHover: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Type" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Description" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Severity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Legal" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Security" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(incidentsData?.items ?? []).map((inc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: typeColor(inc.type),
							children: inc.type
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: {
								maxWidth: 200,
								overflow: "hidden",
								textOverflow: "ellipsis",
								color: muted
							},
							children: inc.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: severityColor(inc.severity),
							children: inc.severity
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: inc.status === "resolved" ? "green" : inc.status === "open" ? "yellow" : "gray",
							children: inc.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: inc.legalEscalation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: "violet",
							children: "Yes"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: { color: muted },
							children: "—"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: inc.securityEscalation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: "red",
							children: "Yes"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: { color: muted },
							children: "—"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "xs",
								variant: "light",
								onClick: () => {
									setDetail(inc);
									openDetail();
								},
								children: "View"
							}), inc.status !== "resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								!inc.legalEscalation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xs",
									variant: "light",
									color: "violet",
									onClick: () => handleEscalate(inc.id, "legalEscalation"),
									children: "Legal"
								}),
								!inc.securityEscalation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xs",
									variant: "light",
									color: "red",
									onClick: () => handleEscalate(inc.id, "securityEscalation"),
									children: "Security"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xs",
									variant: "light",
									color: "green",
									onClick: () => handleResolve(inc.id),
									children: "Resolve"
								})
							] })]
						}) })
					] }, inc.id)), (incidentsData?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 7,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No incidents match filters"
					}) })] })]
				}), incidentsData && Math.ceil(incidentsData.total / 20) > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "center",
					mt: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							disabled: page <= 1,
							onClick: () => setPage(page - 1),
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							style: { color: "#64748B" },
							children: [
								"Page ",
								page,
								" of ",
								Math.ceil(incidentsData.total / 20)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							disabled: page >= Math.ceil(incidentsData.total / 20),
							onClick: () => setPage(page + 1),
							children: "Next"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: detailOpened,
				onClose: closeDetail,
				title: "Incident Detail",
				size: "md",
				children: detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Type:" }),
								" ",
								detail.type
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Severity:" }),
								" ",
								detail.severity
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Status:" }),
								" ",
								detail.status
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Reported By:" }),
								" ",
								detail.reportedBy ?? "—"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Reported At:" }),
								" ",
								detail.reportedAt ? new Date(detail.reportedAt).toLocaleString() : "—"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Description:" }),
								" ",
								detail.description
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Legal Escalation:" }),
								" ",
								detail.legalEscalation ? "Yes" : "No"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Security Escalation:" }),
								" ",
								detail.securityEscalation ? "Yes" : "No"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Notes:" }),
								" ",
								detail.notes ?? "—"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "Report Incident",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Type",
							data: [
								{
									value: "violence",
									label: "Violence"
								},
								{
									value: "intimidation",
									label: "Intimidation"
								},
								{
									value: "rigging",
									label: "Rigging"
								},
								{
									value: "equipment-failure",
									label: "Equipment Failure"
								},
								{
									value: "other",
									label: "Other"
								}
							],
							value: form.type,
							onChange: (v) => setForm({
								...form,
								type: v ?? "other"
							}),
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Description",
							required: true,
							value: form.description,
							onChange: (e) => setForm({
								...form,
								description: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Severity",
							data: [
								{
									value: "low",
									label: "Low"
								},
								{
									value: "medium",
									label: "Medium"
								},
								{
									value: "high",
									label: "High"
								},
								{
									value: "critical",
									label: "Critical"
								}
							],
							value: form.severity,
							onChange: (v) => setForm({
								...form,
								severity: v ?? "medium"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Reported By",
							data: [
								{
									value: "Polling Agent",
									label: "Polling Agent"
								},
								{
									value: "Ward Supervisor",
									label: "Ward Supervisor"
								},
								{
									value: "Security Observer",
									label: "Security Observer"
								},
								{
									value: "Party Agent",
									label: "Party Agent"
								}
							],
							value: form.reportedBy,
							onChange: (v) => setForm({
								...form,
								reportedBy: v ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Polling Unit ID",
							value: form.pollingUnitId,
							onChange: (e) => setForm({
								...form,
								pollingUnitId: e.currentTarget.value
							}),
							placeholder: "Optional"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: handleCreate,
							style: { background: apmBlue },
							mt: "sm",
							children: "Submit Report"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/incidents.tsx?tsr-split=component
var SplitComponent = IncidentsPage;
//#endregion
export { SplitComponent as component };
