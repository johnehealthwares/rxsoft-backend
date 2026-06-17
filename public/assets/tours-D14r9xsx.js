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
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Lr as Title, Wr as Grid } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DZbjExJ-.js";
import { J as useWards, M as useTourStats, N as useTours, T as useLgas, V as useUpdateTour, _ as useCreateTour } from "./admin-hooks-B1eYS0FA.js";
//#region src/features/apm/admin/ToursPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ToursPage() {
	const { data: toursData, isLoading } = useTours();
	const { data: stats } = useTourStats();
	const { data: lgas } = useLgas();
	const createTour = useCreateTour();
	const updateTour = useUpdateTour();
	const [opened, { open, close }] = useDisclosure(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		lgaId: "",
		wardId: "",
		visitType: "rally",
		tourDate: "",
		description: "",
		expectedAttendees: 0,
		notes: ""
	});
	const wardsQuery = useWards(form.lgaId);
	const statCards = [
		{
			label: "Total Tours",
			value: stats?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Planned",
			value: stats?.planned ?? 0,
			color: "#94A3B8"
		},
		{
			label: "Completed",
			value: stats?.completed ?? 0,
			color: "#16A34A"
		},
		{
			label: "Attendees",
			value: stats?.totalAttendees ?? 0,
			color: apmBlue
		},
		{
			label: "Signups",
			value: stats?.totalSignups ?? 0,
			color: "#16A34A"
		}
	];
	const resetForm = () => setForm({
		title: "",
		lgaId: "",
		wardId: "",
		visitType: "rally",
		tourDate: "",
		description: "",
		expectedAttendees: 0,
		notes: ""
	});
	const handleSubmit = () => {
		const payload = {
			title: form.title,
			lgaId: form.lgaId,
			wardId: form.wardId || void 0,
			visitType: form.visitType,
			tourDate: form.tourDate || void 0,
			description: form.description || void 0,
			expectedAttendees: form.expectedAttendees || void 0,
			notes: form.notes || void 0
		};
		if (editId) updateTour.mutate({
			id: editId,
			data: payload
		}, { onSuccess: () => {
			close();
			resetForm();
			setEditId(null);
		} });
		else createTour.mutate(payload, { onSuccess: () => {
			close();
			resetForm();
		} });
	};
	const openEdit = (tour) => {
		setEditId(tour.id);
		setForm({
			title: tour.title,
			lgaId: tour.lgaId,
			wardId: tour.wardId ?? "",
			visitType: tour.visitType,
			tourDate: tour.tourDate?.slice(0, 16) ?? "",
			description: tour.description ?? "",
			expectedAttendees: tour.expectedAttendees,
			notes: tour.notes ?? ""
		});
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
					children: "Candidate Tour Intelligence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						resetForm();
						setEditId(null);
						open();
					},
					style: { background: apmBlue },
					children: "New Tour"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: statCards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 6,
					sm: 4,
					md: 2.4
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Title" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Type" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Attendees" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Signups" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(toursData?.items ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: t.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "light",
							children: t.visitType
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: t.tourDate ? new Date(t.tourDate).toLocaleDateString() : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: t.actualAttendees ?? t.expectedAttendees ?? 0 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							style: { color: "#16A34A" },
							children: t.volunteerSignups
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: t.status === "completed" ? "green" : t.status === "cancelled" ? "red" : "yellow",
							children: t.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xs",
							variant: "light",
							color: "gray",
							onClick: () => openEdit(t),
							children: "Edit"
						}) })
					] }, t.id)), (toursData?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 7,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No tours yet"
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: editId ? "Edit Tour" : "New Tour",
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
							label: "Type",
							data: [
								"rally",
								"town-hall",
								"meeting",
								"stakeholder",
								"inspection",
								"other"
							].map((v) => ({
								value: v,
								label: v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
							})),
							value: form.visitType,
							onChange: (v) => setForm({
								...form,
								visitType: v ?? "rally"
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
							label: "Date & Time",
							type: "datetime-local",
							value: form.tourDate,
							onChange: (e) => setForm({
								...form,
								tourDate: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Expected Attendees",
							type: "number",
							value: form.expectedAttendees,
							onChange: (e) => setForm({
								...form,
								expectedAttendees: parseInt(e.currentTarget.value) || 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Description",
							value: form.description,
							onChange: (e) => setForm({
								...form,
								description: e.currentTarget.value
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							fullWidth: true,
							onClick: handleSubmit,
							style: { background: apmBlue },
							mt: "sm",
							children: [editId ? "Update" : "Create", " Tour"]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/tours.tsx?tsr-split=component
var SplitComponent = ToursPage;
//#endregion
export { SplitComponent as component };
