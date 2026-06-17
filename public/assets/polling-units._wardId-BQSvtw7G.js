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
import { t as NumberInput } from "./NumberInput-Dzj2A-5Q.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as useRouter } from "./useRouter-BXm9s-pB.js";
import { Ir as useParams, Lr as Title } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted, r as apmGreen } from "./layout-DZbjExJ-.js";
import { q as useWardPollingUnits, z as useUpdatePollingUnit } from "./admin-hooks-B1eYS0FA.js";
//#region src/features/apm/admin/PollingUnitsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PollingUnitsPage() {
	const { wardId } = useParams({ from: "/apm/admin/polling-units/$wardId" });
	const { data: pus, isLoading } = useWardPollingUnits(wardId);
	const updatePu = useUpdatePollingUnit();
	const router = useRouter();
	const [opened, { open, close }] = useDisclosure(false);
	const [selectedPu, setSelectedPu] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({});
	const openEditModal = (pu) => {
		setSelectedPu(pu);
		setForm({
			riskLevel: pu.riskLevel,
			conversionStatus: pu.conversionStatus,
			registeredVoters: pu.registeredVoters,
			pastResultApm: pu.pastResultApm,
			pastResultPdp: pu.pastResultPdp,
			pastResultApc: pu.pastResultApc,
			pastResultOther: pu.pastResultOther,
			assignedAgentName: pu.assignedAgentName ?? "",
			assignedAgentPhone: pu.assignedAgentPhone ?? "",
			notes: pu.notes ?? ""
		});
		open();
	};
	const handleSave = () => {
		if (!selectedPu) return;
		updatePu.mutate({
			id: selectedPu.id,
			data: form
		}, { onSuccess: close });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "subtle",
				onClick: () => router.history.back(),
				children: "← Back"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 3,
				style: { color: ink },
				children: "Polling Units"
			})] }),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				height: 400,
				radius: "md"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				padding: "lg",
				radius: "md",
				withBorder: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					striped: true,
					highlightOnHover: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Code" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Registered Voters" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "APM (Prev)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "PDP (Prev)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Risk" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Conversion" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Agent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(pus ?? []).map((pu) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							style: { fontSize: 13 },
							children: pu.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: {
								maxWidth: 200,
								overflow: "hidden",
								textOverflow: "ellipsis"
							},
							children: pu.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: pu.registeredVoters.toLocaleString() }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 600,
							style: { color: apmGreen },
							children: pu.pastResultApm
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 600,
							style: { color: "#3B82F6" },
							children: pu.pastResultPdp
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: pu.riskLevel === "red" ? "red" : pu.riskLevel === "yellow" ? "yellow" : pu.riskLevel === "green" ? "green" : "gray",
							children: pu.riskLevel
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: pu.conversionStatus === "won" ? "green" : pu.conversionStatus === "engaged" ? "blue" : pu.conversionStatus === "lost" ? "red" : "gray",
							children: pu.conversionStatus
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: {
								fontSize: 13,
								color: muted
							},
							children: pu.assignedAgentName ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xs",
							variant: "light",
							style: { color: apmBlue },
							onClick: () => openEditModal(pu),
							children: "Edit"
						}) })
					] }, pu.id)), (pus ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 9,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No polling units found for this ward"
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: `Edit: ${selectedPu?.code ?? ""}`,
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Risk Level",
							data: [
								"green",
								"yellow",
								"red",
								"grey"
							].map((v) => ({
								value: v,
								label: v.charAt(0).toUpperCase() + v.slice(1)
							})),
							value: form.riskLevel,
							onChange: (v) => setForm({
								...form,
								riskLevel: v ?? "grey"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Conversion Status",
							data: [
								"untouched",
								"engaged",
								"won",
								"lost"
							].map((v) => ({
								value: v,
								label: v.charAt(0).toUpperCase() + v.slice(1)
							})),
							value: form.conversionStatus,
							onChange: (v) => setForm({
								...form,
								conversionStatus: v ?? "untouched"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
							label: "Registered Voters",
							value: form.registeredVoters,
							min: 0,
							onChange: (v) => setForm({
								...form,
								registeredVoters: v ?? 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							grow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
								label: "APM (Prev)",
								value: form.pastResultApm,
								min: 0,
								onChange: (v) => setForm({
									...form,
									pastResultApm: v ?? 0
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
								label: "PDP (Prev)",
								value: form.pastResultPdp,
								min: 0,
								onChange: (v) => setForm({
									...form,
									pastResultPdp: v ?? 0
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							grow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
								label: "APC (Prev)",
								value: form.pastResultApc,
								min: 0,
								onChange: (v) => setForm({
									...form,
									pastResultApc: v ?? 0
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
								label: "Other (Prev)",
								value: form.pastResultOther,
								min: 0,
								onChange: (v) => setForm({
									...form,
									pastResultOther: v ?? 0
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Agent Name",
							value: form.assignedAgentName,
							onChange: (e) => setForm({
								...form,
								assignedAgentName: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Agent Phone",
							value: form.assignedAgentPhone,
							onChange: (e) => setForm({
								...form,
								assignedAgentPhone: e.currentTarget.value
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
							onClick: handleSave,
							style: { background: apmBlue },
							mt: "sm",
							children: "Save Changes"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/polling-units.$wardId.tsx?tsr-split=component
var SplitComponent = PollingUnitsPage;
//#endregion
export { SplitComponent as component };
