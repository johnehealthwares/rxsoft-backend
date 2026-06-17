import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
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
import { Lr as Title, Wr as Grid, jn as Search } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { O as useResultDashboard, T as useLgas, U as useVerifyResult, h as useCreateResult, k as useResults } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/ResultsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ResultsPage() {
	const { data: dashboard } = useResultDashboard();
	const { data: lgas } = useLgas();
	const createResult = useCreateResult();
	const verifyResult = useVerifyResult();
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)(null);
	const [lgaFilter, setLgaFilter] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const { data: resultsData } = useResults((0, import_react.useMemo)(() => {
		const p = {
			page,
			limit: 20
		};
		if (search) p.search = search;
		if (statusFilter) p.status = statusFilter;
		if (lgaFilter) p.lgaId = lgaFilter;
		return p;
	}, [
		search,
		statusFilter,
		lgaFilter,
		page
	]));
	const [opened, { open, close }] = useDisclosure(false);
	const [form, setForm] = (0, import_react.useState)({
		pollingUnitId: "",
		lgaId: "",
		wardId: "",
		apmVotes: 0,
		pdpVotes: 0,
		apcVotes: 0,
		otherVotes: 0,
		registeredVoters: 0,
		enteredBy: "",
		notes: ""
	});
	const statCards = [
		{
			label: "Total Entries",
			value: dashboard?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Submitted",
			value: dashboard?.submitted ?? 0,
			color: "#EAB308"
		},
		{
			label: "Verified",
			value: dashboard?.verified ?? 0,
			color: "#16A34A"
		},
		{
			label: "APM Votes",
			value: (dashboard?.totalApmVotes ?? 0).toLocaleString(),
			color: apmBlue
		},
		{
			label: "PDP Votes",
			value: (dashboard?.totalPdpVotes ?? 0).toLocaleString(),
			color: "#DC2626"
		},
		{
			label: "APC Votes",
			value: (dashboard?.totalApcVotes ?? 0).toLocaleString(),
			color: "#2563EB"
		}
	];
	const handleCreate = () => {
		createResult.mutate({
			...form,
			otherVotes: form.otherVotes || 0,
			wardId: form.wardId || ""
		}, { onSuccess: () => {
			close();
			setForm({
				pollingUnitId: "",
				lgaId: "",
				wardId: "",
				apmVotes: 0,
				pdpVotes: 0,
				apcVotes: 0,
				otherVotes: 0,
				registeredVoters: 0,
				enteredBy: "",
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
					children: "Result Collation Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: open,
					style: { background: apmBlue },
					children: "Enter Result"
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
						placeholder: "Search PU ID...",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }),
						value: search,
						onChange: (e) => {
							setSearch(e.currentTarget.value);
							setPage(1);
						},
						style: { flex: 1 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Status",
						clearable: true,
						data: [
							{
								value: "draft",
								label: "Draft"
							},
							{
								value: "submitted",
								label: "Submitted"
							},
							{
								value: "verified",
								label: "Verified"
							},
							{
								value: "disputed",
								label: "Disputed"
							}
						],
						value: statusFilter,
						onChange: (v) => {
							setStatusFilter(v);
							setPage(1);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "LGA",
						clearable: true,
						data: (lgas ?? []).map((l) => ({
							value: l.id,
							label: l.name
						})),
						value: lgaFilter,
						onChange: (v) => {
							setLgaFilter(v);
							setPage(1);
						},
						searchable: true
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "PU ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "APM" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "PDP" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "APC" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Total" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(resultsData?.items ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Td, {
							style: { color: muted },
							children: [r.pollingUnitId.slice(0, 8), "..."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							style: { color: apmBlue },
							children: r.apmVotes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: "#DC2626" },
							children: r.pdpVotes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: "#2563EB" },
							children: r.apcVotes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: r.totalVotes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: r.status === "verified" ? "green" : r.status === "submitted" ? "yellow" : "gray",
							children: r.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: r.status !== "verified" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xs",
							variant: "light",
							color: "green",
							onClick: () => verifyResult.mutate(r.id),
							children: "Verify"
						}) })
					] }, r.id)), (resultsData?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 7,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No results match filters"
					}) })] })]
				}), resultsData && Math.ceil(resultsData.total / 20) > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
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
								Math.ceil(resultsData.total / 20)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							disabled: page >= Math.ceil(resultsData.total / 20),
							onClick: () => setPage(page + 1),
							children: "Next"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "Enter Result",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
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
							label: "LGA",
							data: (lgas ?? []).map((l) => ({
								value: l.id,
								label: l.name
							})),
							value: form.lgaId || null,
							onChange: (v) => setForm({
								...form,
								lgaId: v ?? ""
							}),
							searchable: true,
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "APM Votes",
							type: "number",
							value: form.apmVotes,
							onChange: (e) => setForm({
								...form,
								apmVotes: parseInt(e.currentTarget.value) || 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "PDP Votes",
							type: "number",
							value: form.pdpVotes,
							onChange: (e) => setForm({
								...form,
								pdpVotes: parseInt(e.currentTarget.value) || 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "APC Votes",
							type: "number",
							value: form.apcVotes,
							onChange: (e) => setForm({
								...form,
								apcVotes: parseInt(e.currentTarget.value) || 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Other Votes",
							type: "number",
							value: form.otherVotes,
							onChange: (e) => setForm({
								...form,
								otherVotes: parseInt(e.currentTarget.value) || 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Registered Voters",
							type: "number",
							value: form.registeredVoters,
							onChange: (e) => setForm({
								...form,
								registeredVoters: parseInt(e.currentTarget.value) || 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Entered By",
							value: form.enteredBy,
							onChange: (e) => setForm({
								...form,
								enteredBy: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: handleCreate,
							style: { background: apmBlue },
							mt: "sm",
							children: "Submit Result"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/results.tsx?tsr-split=component
var SplitComponent = ResultsPage;
//#endregion
export { SplitComponent as component };
