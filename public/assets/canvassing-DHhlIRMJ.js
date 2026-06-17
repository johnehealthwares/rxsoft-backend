import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Tabs } from "./Tabs-oGU2Pok4.js";
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
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Lr as Title, Wr as Grid } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { J as useWards, T as useLgas, a as useCanvassingStats, i as useCanvassingSessions, l as useCreateCanvassingSession, r as useAllVisitStats } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/CanvassingPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CanvassingPage() {
	const { data: stats, isLoading: statsLoading } = useCanvassingStats();
	const { data: sessionsData, isLoading: sessionsLoading } = useCanvassingSessions();
	const { data: visitStats } = useAllVisitStats();
	const { data: lgas } = useLgas();
	const createSession = useCreateCanvassingSession();
	const [opened, { open, close }] = useDisclosure(false);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		lgaId: "",
		wardId: "",
		teamLead: "",
		teamSize: 1,
		scheduledDate: "",
		notes: ""
	});
	const wardsQuery = useWards(form.lgaId);
	const statCards = [
		{
			label: "Total Sessions",
			value: stats?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Planned",
			value: stats?.planned ?? 0,
			color: "#94A3B8"
		},
		{
			label: "In Progress",
			value: stats?.inProgress ?? 0,
			color: "#EAB308"
		},
		{
			label: "Completed",
			value: stats?.completed ?? 0,
			color: "#16A34A"
		},
		{
			label: "Total Visits",
			value: stats?.totalVisits ?? 0,
			color: apmBlue
		},
		{
			label: "Support Rate",
			value: visitStats?.supportRate ?? 0,
			color: "#16A34A"
		}
	];
	const handleCreate = () => {
		createSession.mutate({
			title: form.title,
			lgaId: form.lgaId,
			wardId: form.wardId || void 0,
			teamLead: form.teamLead || void 0,
			teamSize: form.teamSize,
			scheduledDate: form.scheduledDate || void 0,
			notes: form.notes || void 0
		}, { onSuccess: () => {
			close();
			setForm({
				title: "",
				lgaId: "",
				wardId: "",
				teamLead: "",
				teamSize: 1,
				scheduledDate: "",
				notes: ""
			});
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					style: { color: ink },
					children: "Canvassing Operations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: open,
					style: { background: apmBlue },
					children: "New Session"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: statCards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 6,
					sm: 4,
					md: 2
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
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							fw: 800,
							style: {
								fontSize: "1.5rem",
								color: s.color,
								lineHeight: 1.2
							},
							children: [s.value, s.label === "Support Rate" ? "%" : ""]
						})]
					})
				})
			}, s.label)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "all",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.List, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
						value: "all",
						children: "All Sessions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
						value: "planned",
						children: "Planned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
						value: "in-progress",
						children: "In Progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
						value: "completed",
						children: "Completed"
					})
				] }), [
					"all",
					"planned",
					"in-progress",
					"completed"
				].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
					value: tab,
					pt: "md",
					children: sessionsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						height: 300,
						radius: "md"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						padding: "lg",
						radius: "md",
						withBorder: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
							striped: true,
							highlightOnHover: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Title" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Team Lead" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Team Size" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Scheduled" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(sessionsData?.items ?? []).filter((s) => tab === "all" || s.status === tab).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
									fw: 600,
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									color: s.status === "completed" ? "green" : s.status === "in-progress" ? "yellow" : "gray",
									children: s.status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
									style: { color: muted },
									children: s.teamLead ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: s.teamSize }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
									style: { color: muted },
									children: s.scheduledDate ? new Date(s.scheduledDate).toLocaleDateString() : "—"
								})
							] }, s.id)), sessionsData?.items?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								colSpan: 5,
								style: {
									textAlign: "center",
									color: "#64748B"
								},
								children: "No sessions yet"
							}) })] })]
						})
					})
				}, tab))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "New Canvassing Session",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Title",
							required: true,
							value: form.title,
							onChange: (e) => setForm({
								...form,
								title: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "LGA",
							data: (lgas ?? []).map((l) => ({
								value: l.id,
								label: l.name
							})),
							value: form.lgaId || null,
							onChange: (v) => setForm({
								...form,
								lgaId: v ?? "",
								wardId: ""
							}),
							searchable: true,
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Ward",
							data: (wardsQuery.data ?? []).map((w) => ({
								value: w.id,
								label: w.name
							})),
							value: form.wardId || null,
							onChange: (v) => setForm({
								...form,
								wardId: v ?? ""
							}),
							clearable: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Team Lead",
							value: form.teamLead,
							onChange: (e) => setForm({
								...form,
								teamLead: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Team Size",
							type: "number",
							value: form.teamSize,
							onChange: (e) => setForm({
								...form,
								teamSize: parseInt(e.currentTarget.value) || 1
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Scheduled Date",
							type: "datetime-local",
							value: form.scheduledDate,
							onChange: (e) => setForm({
								...form,
								scheduledDate: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Notes",
							value: form.notes,
							onChange: (e) => setForm({
								...form,
								notes: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: handleCreate,
							style: { background: apmBlue },
							mt: "sm",
							children: "Create Session"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/canvassing.tsx?tsr-split=component
var SplitComponent = CanvassingPage;
//#endregion
export { SplitComponent as component };
