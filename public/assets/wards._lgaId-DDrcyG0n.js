import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Slider } from "./Slider-COVJCz_o.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
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
import { Ir as useParams, Lr as Title, Pr as useNavigate } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { F as useUpdateConversionScore, K as useWardConversion, T as useLgas } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/WardsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function statusColor(status) {
	switch (status) {
		case "green": return "#16A34A";
		case "yellow": return "#EAB308";
		case "red": return "#DC2626";
		case "grey": return "#94A3B8";
		default: return "#94A3B8";
	}
}
function WardsPage() {
	const { lgaId } = useParams({ from: "/apm/admin/wards/$lgaId" });
	const { data: wards, isLoading } = useWardConversion(lgaId);
	const { data: lgas } = useLgas();
	const updateScore = useUpdateConversionScore();
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);
	const [selectedWard, setSelectedWard] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(50);
	const [status, setStatus] = (0, import_react.useState)("grey");
	const [notes, setNotes] = (0, import_react.useState)("");
	const lgaName = (lgas ?? []).find((l) => l.id === lgaId)?.name ?? "Unknown";
	const openScoreModal = (ward) => {
		setSelectedWard(ward);
		setScore(ward.score);
		setStatus(ward.status);
		setNotes("");
		open();
	};
	const handleSaveScore = () => {
		if (!selectedWard) return;
		updateScore.mutate({
			entityType: "ward",
			entityId: selectedWard.id,
			data: {
				score,
				status,
				notes,
				assessedBy: "admin"
			}
		}, { onSuccess: close });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "subtle",
				onClick: () => navigate({ to: "/apm/admin/lgas" }),
				children: "← Back to LGAs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Title, {
				order: 3,
				style: { color: ink },
				children: [lgaName, " — Wards"]
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Ward" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Code" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Score" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Polling Units" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "APM-Friendly PUs" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(wards ?? []).map((ward) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: ward.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: ward.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							fw: 700,
							style: { color: statusColor(ward.status) },
							children: [ward.score, "%"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: ward.status === "green" ? "green" : ward.status === "yellow" ? "yellow" : ward.status === "red" ? "red" : "gray",
							children: ward.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: ward.pollingUnitCount }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 700,
							style: { color: "#16A34A" },
							children: ward.wonPollingUnits
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "xs",
								variant: "light",
								style: { color: apmBlue },
								onClick: () => openScoreModal(ward),
								children: "Score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "xs",
								variant: "light",
								color: "gray",
								onClick: () => navigate({ to: `/apm/admin/polling-units/${ward.id}` }),
								children: "PUs"
							})]
						}) })
					] }, ward.id)), (wards ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 7,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No ward data found for this LGA"
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: `Score: ${selectedWard?.name ?? ""}`,
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							style: { color: muted },
							children: [
								"Conversion Score: ",
								score,
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							value: score,
							onChange: setScore,
							min: 0,
							max: 100,
							label: `${score}%`,
							styles: { markLabel: { fontSize: 11 } }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { children: [
							"green",
							"yellow",
							"red",
							"grey"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							style: {
								cursor: "pointer",
								background: status === s ? statusColor(s) : "#E2E8F0",
								color: status === s ? "#fff" : muted,
								padding: "6px 12px"
							},
							onClick: () => setStatus(s),
							children: s
						}, s)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Notes",
							value: notes,
							onChange: (e) => setNotes(e.currentTarget.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: handleSaveScore,
							style: { background: apmBlue },
							children: "Save Score"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/wards.$lgaId.tsx?tsr-split=component
var SplitComponent = WardsPage;
//#endregion
export { SplitComponent as component };
