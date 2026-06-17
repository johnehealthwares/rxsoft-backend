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
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { Lr as Title, Wr as Grid } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { G as useVolunteerStats, H as useUpdateVolunteerAssignment, J as useWards, T as useLgas, W as useVolunteerAssignments, v as useCreateVolunteerAssignment } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/VolunteersPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function VolunteersPage() {
	const { data: assignments, isLoading } = useVolunteerAssignments();
	const { data: stats } = useVolunteerStats();
	const { data: lgas } = useLgas();
	const createAssignment = useCreateVolunteerAssignment();
	const updateAssignment = useUpdateVolunteerAssignment();
	const [opened, { open, close }] = useDisclosure(false);
	const [form, setForm] = (0, import_react.useState)({
		volunteerId: "",
		lgaId: "",
		wardId: "",
		role: "",
		notes: ""
	});
	const [editId, setEditId] = (0, import_react.useState)(null);
	const wardsQuery = useWards(form.lgaId);
	const statCards = [
		{
			label: "Total Volunteers",
			value: stats?.totalVolunteers ?? 0,
			color: apmBlue
		},
		{
			label: "Assignments",
			value: stats?.totalAssignments ?? 0,
			color: apmBlue
		},
		{
			label: "Active",
			value: stats?.activeAssignments ?? 0,
			color: "#16A34A"
		}
	];
	const resetForm = () => {
		setForm({
			volunteerId: "",
			lgaId: "",
			wardId: "",
			role: "",
			notes: ""
		});
		setEditId(null);
	};
	const handleSubmit = () => {
		if (editId) updateAssignment.mutate({
			id: editId,
			data: {
				wardId: form.wardId || void 0,
				role: form.role || void 0,
				notes: form.notes || void 0
			}
		}, { onSuccess: () => {
			close();
			resetForm();
		} });
		else createAssignment.mutate({
			volunteerId: form.volunteerId,
			lgaId: form.lgaId,
			wardId: form.wardId || void 0,
			role: form.role || void 0,
			notes: form.notes || void 0
		}, { onSuccess: () => {
			close();
			resetForm();
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
					children: "Volunteer Assignments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						resetForm();
						open();
					},
					style: { background: apmBlue },
					children: "Assign Volunteer"
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
								color: s.color
							},
							children: s.value
						})]
					})
				})
			}, s.label)) }),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Volunteer ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Role" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Assigned" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(assignments?.items ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Td, {
							fw: 600,
							children: [a.volunteerId.slice(0, 8), "…"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: a.role ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: a.status === "active" ? "green" : a.status === "inactive" ? "gray" : "yellow",
							children: a.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: a.assignedAt ? new Date(a.assignedAt).toLocaleDateString() : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xs",
							variant: "light",
							color: "gray",
							onClick: () => {
								setEditId(a.id);
								setForm({
									...form,
									wardId: a.wardId ?? "",
									role: a.role ?? "",
									notes: a.notes ?? ""
								});
								open();
							},
							children: "Edit"
						}) })
					] }, a.id)), (assignments?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 5,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No assignments yet"
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: editId ? "Edit Assignment" : "Assign Volunteer",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Role",
							data: [
								"canvasser",
								"team-lead",
								"agent",
								"mobilizer",
								"data-entry"
							].map((r) => ({
								value: r,
								label: r.replace(/-/g, " ")
							})),
							value: form.role || null,
							onChange: (v) => setForm({
								...form,
								role: v ?? ""
							}),
							clearable: true
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
							onClick: handleSubmit,
							style: { background: apmBlue },
							mt: "sm",
							children: editId ? "Update" : "Assign"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/volunteers.tsx?tsr-split=component
var SplitComponent = VolunteersPage;
//#endregion
export { SplitComponent as component };
