import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Anchor } from "./Anchor-DyykEMLS.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { Lr as Title, Pr as useNavigate, Wr as Grid } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted, r as apmGreen } from "./layout-DsBYIIU2.js";
import { s as useConversionDashboard, w as useLgaConversion } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/ConversionDashboard.tsx
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
function ConversionDashboard() {
	const { data: dashboard, isLoading: dashLoading } = useConversionDashboard();
	const { data: lgas, isLoading: lgasLoading } = useLgaConversion();
	useNavigate();
	if (dashLoading || lgasLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			height: 120,
			radius: "md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			height: 400,
			radius: "md"
		})]
	});
	const summary = dashboard?.summary;
	const conversion = dashboard?.conversion;
	const statCards = [
		{
			label: "LGAs",
			value: summary?.totalLgas ?? 0,
			color: apmBlue
		},
		{
			label: "Wards",
			value: summary?.totalWards ?? 0,
			color: apmBlue
		},
		{
			label: "Polling Units",
			value: summary?.totalPollingUnits ?? 0,
			color: apmBlue
		},
		{
			label: "Stakeholders",
			value: summary?.totalStakeholders ?? 0,
			color: apmBlue
		},
		{
			label: "APM-Friendly PUs",
			value: conversion?.apmFriendlyPollingUnits ?? 0,
			color: apmGreen
		},
		{
			label: "Contested PUs",
			value: conversion?.contestedPollingUnits ?? 0,
			color: "#EAB308"
		},
		{
			label: "Green LGAs",
			value: conversion?.greenLgas ?? 0,
			color: "#16A34A"
		},
		{
			label: "Red LGAs",
			value: conversion?.redLgas ?? 0,
			color: "#DC2626"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 3,
				style: { color: ink },
				children: "Conversion Dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: statCards.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 6,
					sm: 4,
					md: 3
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					padding: "lg",
					radius: "md",
					withBorder: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 4,
						align: "center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							style: { color: muted },
							children: stat.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 800,
							style: {
								fontSize: "clamp(1.5rem, 3vw, 2rem)",
								color: stat.color,
								lineHeight: 1.2
							},
							children: stat.value
						})]
					})
				})
			}, stat.label)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				padding: "lg",
				radius: "md",
				withBorder: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 4,
					mb: "md",
					style: { color: ink },
					children: "LGA Conversion Status"
				}), lgas && lgas.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					striped: true,
					highlightOnHover: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "LGA" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Code" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Score" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Wards" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Polling Units" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "APM-Friendly PUs" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: lgas.map((lga) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, {
						style: { cursor: "pointer" },
						onClick: () => {},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
								underline: "never",
								style: {
									color: apmBlue,
									fontWeight: 600
								},
								onClick: (e) => {
									e.stopPropagation();
								},
								children: lga.name
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								style: { color: muted },
								children: lga.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								fw: 700,
								style: { color: statusColor(lga.status) },
								children: [lga.score, "%"]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: lga.status === "green" ? "green" : lga.status === "yellow" ? "yellow" : lga.status === "red" ? "red" : "gray",
								children: lga.status
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: lga.wardCount }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: lga.pollingUnitCount }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 700,
								style: { color: apmGreen },
								children: lga.wonPollingUnits
							}) })
						]
					}, lga.id)) })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					style: { color: muted },
					children: "No LGA data available. Seed the database first."
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/conversion.tsx?tsr-split=component
var SplitComponent = ConversionDashboard;
//#endregion
export { SplitComponent as component };
