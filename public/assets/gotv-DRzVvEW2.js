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
import { t as Progress } from "./Progress-fJwpknH9.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Lr as Title, Wr as Grid, jn as Search } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { I as useUpdateGotv, b as useGotvRecords, d as useCreateGotv, x as useGotvStats } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/GotvPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GotvPage() {
	const { data: stats } = useGotvStats();
	const createGotv = useCreateGotv();
	const updateGotv = useUpdateGotv();
	const [search, setSearch] = (0, import_react.useState)("");
	const [turnedOutFilter, setTurnedOutFilter] = (0, import_react.useState)(null);
	const [contactedViaFilter, setContactedViaFilter] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const { data: gotvData } = useGotvRecords((0, import_react.useMemo)(() => {
		const p = {
			page,
			limit: 20
		};
		if (search) p.search = search;
		if (turnedOutFilter) p.turnedOut = turnedOutFilter;
		if (contactedViaFilter) p.contactedVia = contactedViaFilter;
		return p;
	}, [
		search,
		turnedOutFilter,
		contactedViaFilter,
		page
	]));
	const [opened, { open, close }] = useDisclosure(false);
	const [form, setForm] = (0, import_react.useState)({
		pollingUnitId: "",
		supporterName: "",
		supporterPhone: "",
		contactedVia: "sms",
		notes: ""
	});
	const statCards = [
		{
			label: "Total Supporters",
			value: stats?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Contacted",
			value: stats?.contacted ?? 0,
			color: "#EAB308"
		},
		{
			label: "Turned Out",
			value: stats?.turnedOut ?? 0,
			color: "#16A34A"
		},
		{
			label: "Turnout Rate",
			value: `${stats?.turnoutRate ?? 0}%`,
			color: "#16A34A"
		}
	];
	const handleCreate = () => {
		createGotv.mutate({
			pollingUnitId: form.pollingUnitId,
			supporterName: form.supporterName,
			supporterPhone: form.supporterPhone || void 0,
			contactedVia: form.contactedVia,
			notes: form.notes || void 0
		}, { onSuccess: () => {
			close();
			setForm({
				pollingUnitId: "",
				supporterName: "",
				supporterPhone: "",
				contactedVia: "sms",
				notes: ""
			});
		} });
	};
	const handleToggleTurnout = (record) => {
		updateGotv.mutate({
			id: record.id,
			data: { turnedOut: !record.turnedOut }
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
					children: "Get-Out-The-Vote Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: open,
					style: { background: apmBlue },
					children: "Add Supporter"
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				padding: "lg",
				radius: "md",
				withBorder: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							style: { color: muted },
							children: "Turnout Progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: stats?.turnoutRate ?? 0,
							color: "green",
							size: "lg",
							radius: "md"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "xs",
							style: { color: muted },
							children: [
								stats?.turnedOut ?? 0,
								" of ",
								stats?.total ?? 0,
								" supporters voted"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						placeholder: "Search supporter...",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }),
						value: search,
						onChange: (e) => {
							setSearch(e.currentTarget.value);
							setPage(1);
						},
						style: { flex: 1 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Turned Out",
						clearable: true,
						data: [{
							value: "true",
							label: "Voted"
						}, {
							value: "false",
							label: "Not Voted"
						}],
						value: turnedOutFilter,
						onChange: (v) => {
							setTurnedOutFilter(v);
							setPage(1);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						placeholder: "Contact Via",
						clearable: true,
						data: [
							{
								value: "sms",
								label: "SMS"
							},
							{
								value: "whatsapp",
								label: "WhatsApp"
							},
							{
								value: "phone",
								label: "Phone Call"
							},
							{
								value: "visit",
								label: "Visit"
							}
						],
						value: contactedViaFilter,
						onChange: (v) => {
							setContactedViaFilter(v);
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Supporter" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Phone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Contacted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Via" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Turned Out" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(gotvData?.items ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: r.supporterName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: r.supporterPhone ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: r.contacted ? "green" : "gray",
							children: r.contacted ? "Yes" : "No"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: r.contactedVia ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: r.turnedOut ? "green" : "red",
							children: r.turnedOut ? "Yes" : "No"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xs",
							variant: "light",
							color: r.turnedOut ? "gray" : "green",
							onClick: () => handleToggleTurnout(r),
							children: r.turnedOut ? "Undo" : "Mark Voted"
						}) })
					] }, r.id)), (gotvData?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 6,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No supporters match filters"
					}) })] })]
				}), gotvData && Math.ceil(gotvData.total / 20) > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
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
								Math.ceil(gotvData.total / 20)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							disabled: page >= Math.ceil(gotvData.total / 20),
							onClick: () => setPage(page + 1),
							children: "Next"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "Add Supporter",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Supporter Name",
							required: true,
							value: form.supporterName,
							onChange: (e) => setForm({
								...form,
								supporterName: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Phone",
							value: form.supporterPhone,
							onChange: (e) => setForm({
								...form,
								supporterPhone: e.currentTarget.value
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
							label: "Contact Via",
							data: [
								{
									value: "sms",
									label: "SMS"
								},
								{
									value: "whatsapp",
									label: "WhatsApp"
								},
								{
									value: "phone",
									label: "Phone Call"
								},
								{
									value: "visit",
									label: "Visit"
								}
							],
							value: form.contactedVia,
							onChange: (v) => setForm({
								...form,
								contactedVia: v ?? "sms"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: handleCreate,
							style: { background: apmBlue },
							mt: "sm",
							children: "Add Supporter"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/gotv.tsx?tsr-split=component
var SplitComponent = GotvPage;
//#endregion
export { SplitComponent as component };
