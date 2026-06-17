import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Progress } from "./Progress-fJwpknH9.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { Lr as Title, Wr as Grid } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { A as useSentimentDashboard } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/SentimentPage.tsx
var import_jsx_runtime = require_jsx_runtime();
function SentimentPage() {
	const { data, isLoading } = useSentimentDashboard();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
		height: 500,
		radius: "md"
	});
	const statCards = [
		{
			label: "Total Feedback",
			value: data?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Positive",
			value: data?.positive ?? 0,
			color: "#16A34A"
		},
		{
			label: "Negative",
			value: data?.negative ?? 0,
			color: "#DC2626"
		},
		{
			label: "Neutral",
			value: data?.neutral ?? 0,
			color: "#94A3B8"
		},
		{
			label: "Sentiment Score",
			value: `${data?.sentimentScore ?? 0}%`,
			color: (data?.sentimentScore ?? 0) >= 0 ? "#16A34A" : "#DC2626"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 3,
				style: { color: ink },
				children: "Sentiment Analysis"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: statCards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 6,
					sm: 4,
					md: 2.4
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
			data && data.total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				padding: "lg",
				radius: "md",
				withBorder: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 700,
					mb: "md",
					style: { color: "#1E293B" },
					children: "Sentiment Distribution"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "space-between",
							mb: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								fw: 600,
								style: { color: "#16A34A" },
								children: "Positive"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "sm",
								style: { color: "#64748B" },
								children: [Math.round(data.positive / data.total * 100), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: data.positive / data.total * 100,
							color: "green",
							size: "lg"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "space-between",
							mb: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								fw: 600,
								style: { color: "#64748B" },
								children: "Neutral"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "sm",
								style: { color: "#64748B" },
								children: [Math.round(data.neutral / data.total * 100), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: data.neutral / data.total * 100,
							color: "gray",
							size: "lg"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "space-between",
							mb: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								fw: 600,
								style: { color: "#DC2626" },
								children: "Negative"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "sm",
								style: { color: "#64748B" },
								children: [Math.round(data.negative / data.total * 100), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: data.negative / data.total * 100,
							color: "red",
							size: "lg"
						})] })
					]
				})]
			}),
			data?.topicBreakdown && data.topicBreakdown.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				padding: "lg",
				radius: "md",
				withBorder: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 700,
					mb: "md",
					style: { color: "#1E293B" },
					children: "Topics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					striped: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Topic" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Mentions" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: data.topicBreakdown.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						fw: 600,
						children: t.topic
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: t.count })] }, t.topic)) })]
				})]
			}),
			data?.byLga && data.byLga.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				padding: "lg",
				radius: "md",
				withBorder: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 700,
					mb: "md",
					style: { color: "#1E293B" },
					children: "Sentiment by LGA"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					striped: true,
					highlightOnHover: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "LGA" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Total" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Positive" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Negative" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Neutral" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: data.byLga.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: l.lga
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: l.total }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: { color: "#16A34A" },
							fw: 600,
							children: l.positive
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: { color: "#DC2626" },
							fw: 600,
							children: l.negative
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: "#64748B" },
							children: l.neutral
						})
					] }, l.lga)) })]
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/sentiment.tsx?tsr-split=component
var SplitComponent = SentimentPage;
//#endregion
export { SplitComponent as component };
