import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Hr as Pagination, Lr as Title } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DZbjExJ-.js";
import { B as useUpdateStakeholder, J as useWards, T as useLgas, g as useCreateStakeholder, j as useStakeholders } from "./admin-hooks-B1eYS0FA.js";
//#region src/features/apm/admin/StakeholdersPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var roleOptions = [
	"chairman",
	"councillor",
	"party-leader",
	"youth-leader",
	"women-leader",
	"religious-leader",
	"community-leader"
].map((r) => ({
	value: r,
	label: r.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}));
var affiliationOptions = [
	"PDP",
	"APC",
	"APM",
	"LP",
	"Other"
].map((a) => ({
	value: a,
	label: a
}));
var influenceOptions = [
	"high",
	"medium",
	"low"
].map((i) => ({
	value: i,
	label: i.charAt(0).toUpperCase() + i.slice(1)
}));
var statusOptions = [
	"untouched",
	"engaged",
	"leaning",
	"won",
	"lost",
	"hostile"
].map((s) => ({
	value: s,
	label: s.charAt(0).toUpperCase() + s.slice(1)
}));
function statusColor(status) {
	switch (status) {
		case "won": return "green";
		case "leaning": return "yellow";
		case "engaged": return "blue";
		case "lost": return "red";
		case "hostile": return "orange";
		default: return "gray";
	}
}
function StakeholdersPage() {
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [opened, { open, close }] = useDisclosure(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		role: "",
		lgaId: "",
		wardId: "",
		affiliation: "",
		influenceLevel: "medium",
		conversionStatus: "untouched",
		notes: ""
	});
	const { data, isLoading } = useStakeholders({
		page,
		limit: 20,
		search: search || void 0
	});
	const { data: lgas } = useLgas();
	const wardsQuery = useWards(form.lgaId);
	const createMutation = useCreateStakeholder();
	const updateMutation = useUpdateStakeholder();
	const resetForm = () => {
		setForm({
			name: "",
			phone: "",
			email: "",
			role: "",
			lgaId: "",
			wardId: "",
			affiliation: "",
			influenceLevel: "medium",
			conversionStatus: "untouched",
			notes: ""
		});
		setEditingId(null);
	};
	const handleSubmit = () => {
		if (editingId) updateMutation.mutate({
			id: editingId,
			data: form
		}, { onSuccess: close });
		else createMutation.mutate(form, { onSuccess: close });
	};
	const handleEdit = (stakeholder) => {
		setForm({
			name: stakeholder.name,
			phone: stakeholder.phone ?? "",
			email: stakeholder.email ?? "",
			role: stakeholder.role ?? "",
			lgaId: stakeholder.lgaId,
			wardId: stakeholder.wardId ?? "",
			affiliation: stakeholder.affiliation ?? "",
			influenceLevel: stakeholder.influenceLevel,
			conversionStatus: stakeholder.conversionStatus,
			notes: stakeholder.notes ?? ""
		});
		setEditingId(stakeholder.id);
		open();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					style: { color: ink },
					children: "Stakeholder Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						resetForm();
						open();
					},
					style: { background: apmBlue },
					children: "Add Stakeholder"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				placeholder: "Search stakeholders...",
				value: search,
				onChange: (e) => {
					setSearch(e.currentTarget.value);
					setPage(1);
				},
				style: { maxWidth: 400 }
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				height: 400,
				radius: "md"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Affiliation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Influence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(data?.items ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, {
						style: { cursor: "pointer" },
						onClick: () => handleEdit(s),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								fw: 600,
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								style: { color: muted },
								children: s.phone ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: s.role ? s.role.replace(/-/g, " ") : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: s.affiliation === "APM" ? "green" : s.affiliation === "PDP" ? "blue" : "gray",
								children: s.affiliation ?? "—"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: s.influenceLevel === "high" ? "red" : s.influenceLevel === "medium" ? "yellow" : "gray",
								children: s.influenceLevel
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: statusColor(s.conversionStatus),
								children: s.conversionStatus
							}) })
						]
					}, s.id)), (data?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 6,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No stakeholders found"
					}) })] })]
				}), data && data.total > data.limit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
					justify: "center",
					mt: "md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
						total: Math.ceil(data.total / data.limit),
						value: page,
						onChange: setPage
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: editingId ? "Edit Stakeholder" : "Add Stakeholder",
				size: "lg",
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
							value: form.phone ?? "",
							onChange: (e) => setForm({
								...form,
								phone: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Email",
							value: form.email ?? "",
							onChange: (e) => setForm({
								...form,
								email: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Role",
							data: roleOptions,
							value: form.role || null,
							onChange: (v) => setForm({
								...form,
								role: v ?? ""
							}),
							clearable: true
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
							clearable: true,
							disabled: !form.lgaId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Affiliation",
							data: affiliationOptions,
							value: form.affiliation || null,
							onChange: (v) => setForm({
								...form,
								affiliation: v ?? ""
							}),
							clearable: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Influence Level",
							data: influenceOptions,
							value: form.influenceLevel,
							onChange: (v) => setForm({
								...form,
								influenceLevel: v ?? "medium"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Conversion Status",
							data: statusOptions,
							value: form.conversionStatus,
							onChange: (v) => setForm({
								...form,
								conversionStatus: v ?? "untouched"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Notes",
							value: form.notes ?? "",
							onChange: (e) => setForm({
								...form,
								notes: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							fullWidth: true,
							onClick: handleSubmit,
							style: { background: apmBlue },
							mt: "sm",
							children: [editingId ? "Update" : "Create", " Stakeholder"]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/stakeholders.tsx?tsr-split=component
var SplitComponent = StakeholdersPage;
//#endregion
export { SplitComponent as component };
