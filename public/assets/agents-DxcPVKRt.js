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
import { Lr as Title, Wr as Grid, jn as Search } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DZbjExJ-.js";
import { P as useUpdateAgent, c as useCreateAgent, n as useAgents, t as useAgentStats } from "./admin-hooks-B1eYS0FA.js";
//#region src/features/apm/admin/AgentsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AgentsPage() {
	const { data: stats } = useAgentStats();
	const [search, setSearch] = (0, import_react.useState)("");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)(null);
	const [trainingFilter, setTrainingFilter] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const { data: agentsData } = useAgents((0, import_react.useMemo)(() => {
		const p = {
			page,
			limit: 20
		};
		if (search) p.search = search;
		if (roleFilter) p.category = roleFilter;
		if (trainingFilter) p.trainingStatus = trainingFilter;
		return p;
	}, [
		search,
		roleFilter,
		trainingFilter,
		page
	]));
	const createAgent = useCreateAgent();
	const updateAgent = useUpdateAgent();
	const [opened, { open, close }] = useDisclosure(false);
	const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
	const [editTarget, setEditTarget] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		pollingUnitId: "",
		name: "",
		phone: "",
		role: "agent"
	});
	const statCards = [
		{
			label: "Total Agents",
			value: stats?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Trained",
			value: stats?.trained ?? 0,
			color: "#16A34A"
		},
		{
			label: "Active",
			value: stats?.assigned ?? 0,
			color: "#16A34A"
		},
		{
			label: "Standard",
			value: stats?.agent ?? 0,
			color: apmBlue
		},
		{
			label: "Backups",
			value: stats?.backup ?? 0,
			color: "#EAB308"
		},
		{
			label: "Supervisors",
			value: stats?.supervisor ?? 0,
			color: "#8B5CF6"
		}
	];
	const handleCreate = () => {
		createAgent.mutate(form, { onSuccess: () => {
			close();
			setForm({
				pollingUnitId: "",
				name: "",
				phone: "",
				role: "agent"
			});
		} });
	};
	const handleUpdateTraining = (agent) => {
		const newStatus = agent.trainingStatus === "trained" ? "untrained" : "trained";
		updateAgent.mutate({
			id: agent.id,
			data: { trainingStatus: newStatus }
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
					children: "Agent Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: open,
					style: { background: apmBlue },
					children: "Register Agent"
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						placeholder: "Search by name...",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }),
						value: search,
						onChange: (e) => {
							setSearch(e.currentTarget.value);
							setPage(1);
						},
						style: { flex: 1 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Role",
						clearable: true,
						data: [
							{
								value: "agent",
								label: "Agent"
							},
							{
								value: "backup-agent",
								label: "Backup Agent"
							},
							{
								value: "ward-supervisor",
								label: "Ward Supervisor"
							},
							{
								value: "lga-collation",
								label: "LGA Collation"
							}
						],
						value: roleFilter,
						onChange: (v) => {
							setRoleFilter(v);
							setPage(1);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Training",
						clearable: true,
						data: [{
							value: "trained",
							label: "Trained"
						}, {
							value: "untrained",
							label: "Untrained"
						}],
						value: trainingFilter,
						onChange: (v) => {
							setTrainingFilter(v);
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Phone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Role" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Training" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(agentsData?.items ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: a.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: a.role === "ward-supervisor" ? "violet" : a.role === "backup-agent" ? "yellow" : "blue",
							children: a.role
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: a.trainingStatus === "trained" ? "green" : "gray",
							children: a.trainingStatus
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: a.isActive ? "green" : "red",
							children: a.isActive ? "Active" : "Inactive"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "xs",
								variant: "light",
								onClick: () => {
									setEditTarget(a);
									openEdit();
								},
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "xs",
								variant: "light",
								color: a.trainingStatus === "trained" ? "gray" : "green",
								onClick: () => handleUpdateTraining(a),
								children: a.trainingStatus === "trained" ? "Untrain" : "Train"
							})]
						}) })
					] }, a.id)), (agentsData?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 6,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No agents match filters"
					}) })] })]
				}), agentsData && Math.ceil(agentsData.total / 20) > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
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
								Math.ceil(agentsData.total / 20)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							disabled: page >= Math.ceil(agentsData.total / 20),
							onClick: () => setPage(page + 1),
							children: "Next"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "Register Polling Agent",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Name",
							required: true,
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Phone",
							required: true,
							value: form.phone,
							onChange: (e) => setForm({
								...form,
								phone: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Polling Unit ID",
							required: true,
							value: form.pollingUnitId,
							onChange: (e) => setForm({
								...form,
								pollingUnitId: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Role",
							data: [
								{
									value: "agent",
									label: "Agent"
								},
								{
									value: "backup-agent",
									label: "Backup Agent"
								},
								{
									value: "ward-supervisor",
									label: "Ward Supervisor"
								},
								{
									value: "lga-collation",
									label: "LGA Collation"
								}
							],
							value: form.role,
							onChange: (v) => setForm({
								...form,
								role: v ?? "agent"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: handleCreate,
							style: { background: apmBlue },
							mt: "sm",
							children: "Register"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: editOpened,
				onClose: closeEdit,
				title: "Edit Agent",
				size: "md",
				children: editTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Name",
							value: editTarget.name,
							onChange: (e) => setEditTarget({
								...editTarget,
								name: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Phone",
							value: editTarget.phone,
							onChange: (e) => setEditTarget({
								...editTarget,
								phone: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Role",
							data: [
								{
									value: "agent",
									label: "Agent"
								},
								{
									value: "backup-agent",
									label: "Backup Agent"
								},
								{
									value: "ward-supervisor",
									label: "Ward Supervisor"
								},
								{
									value: "lga-collation",
									label: "LGA Collation"
								}
							],
							value: editTarget.role,
							onChange: (v) => setEditTarget({
								...editTarget,
								role: v ?? "agent"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Notes",
							value: editTarget.notes ?? "",
							onChange: (e) => setEditTarget({
								...editTarget,
								notes: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: () => {
								updateAgent.mutate({
									id: editTarget.id,
									data: {
										name: editTarget.name,
										phone: editTarget.phone,
										role: editTarget.role,
										notes: editTarget.notes
									}
								});
								closeEdit();
							},
							style: { background: "#0066CC" },
							mt: "sm",
							children: "Save"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/agents.tsx?tsr-split=component
var SplitComponent = AgentsPage;
//#endregion
export { SplitComponent as component };
