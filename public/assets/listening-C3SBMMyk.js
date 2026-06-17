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
import { Lr as Title, Wr as Grid } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { D as useMentions, E as useListeningStats, R as useUpdateMentionStatus, m as useCreateResponse, p as useCreateMention } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/ListeningPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var platformColors = {
	facebook: "#1877F2",
	whatsapp: "#25D366",
	twitter: "#1DA1F2",
	tiktok: "#000",
	instagram: "#E4405F",
	radio: "#F59E0B",
	blog: "#8B5CF6"
};
function ListeningPage() {
	const { data: mentionsData, isLoading } = useMentions();
	const { data: stats } = useListeningStats();
	const createMention = useCreateMention();
	const updateStatus = useUpdateMentionStatus();
	const createResponse = useCreateResponse();
	const [opened, { open, close }] = useDisclosure(false);
	const [responseOpened, { open: openResponse, close: closeResponse }] = useDisclosure(false);
	const [selectedMentionId, setSelectedMentionId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		platform: "twitter",
		title: "",
		content: "",
		mentionUrl: "",
		sentiment: "neutral",
		reach: 0,
		source: "",
		category: "",
		isUrgent: false
	});
	const [responseForm, setResponseForm] = (0, import_react.useState)({
		content: "",
		responseType: "rebuttal",
		publishedBy: "",
		platform: ""
	});
	const statCards = [
		{
			label: "Total Mentions",
			value: stats?.total ?? 0,
			color: apmBlue
		},
		{
			label: "Urgent",
			value: stats?.urgent ?? 0,
			color: "#DC2626"
		},
		{
			label: "Facebook",
			value: stats?.facebook ?? 0,
			color: platformColors.facebook
		},
		{
			label: "Twitter/X",
			value: stats?.twitter ?? 0,
			color: platformColors.twitter
		},
		{
			label: "WhatsApp",
			value: stats?.whatsapp ?? 0,
			color: platformColors.whatsapp
		},
		{
			label: "TikTok",
			value: stats?.tiktok ?? 0,
			color: platformColors.tiktok
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					style: { color: ink },
					children: "Digital Listening Room"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setForm({
							platform: "twitter",
							title: "",
							content: "",
							mentionUrl: "",
							sentiment: "neutral",
							reach: 0,
							source: "",
							category: "",
							isUrgent: false
						});
						open();
					},
					style: { background: apmBlue },
					children: "Log Mention"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Platform" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Title" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Sentiment" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Reach" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Category" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(mentionsData?.items ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, {
						style: m.isUrgent ? { background: "#FEF2F2" } : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								style: {
									background: platformColors[m.platform] || "#64748B",
									color: "#fff"
								},
								children: m.platform
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								fw: 600,
								style: {
									maxWidth: 250,
									overflow: "hidden",
									textOverflow: "ellipsis"
								},
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: m.sentiment === "positive" ? "green" : m.sentiment === "negative" ? "red" : "gray",
								children: m.sentiment ?? "—"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: m.reach.toLocaleString() }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								style: { color: muted },
								children: m.category ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: m.status === "new" ? "red" : m.status === "addressed" ? "green" : "gray",
								children: m.status
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: 4,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xs",
									variant: "light",
									color: "green",
									onClick: () => updateStatus.mutate({
										id: m.id,
										status: m.status === "new" ? "reviewing" : "addressed"
									}),
									children: m.status === "new" ? "Review" : m.status === "reviewing" ? "Resolve" : "Reopen"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xs",
									variant: "light",
									color: "blue",
									onClick: () => {
										setSelectedMentionId(m.id);
										setResponseForm({
											content: "",
											responseType: "rebuttal",
											publishedBy: "",
											platform: m.platform
										});
										openResponse();
									},
									children: "Respond"
								})]
							}) })
						]
					}, m.id)), (mentionsData?.items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 7,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No mentions logged"
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "Log Mention",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Platform",
							data: [
								"facebook",
								"whatsapp",
								"twitter",
								"tiktok",
								"instagram",
								"radio",
								"blog",
								"other"
							].map((p) => ({
								value: p,
								label: p.charAt(0).toUpperCase() + p.slice(1)
							})),
							value: form.platform,
							onChange: (v) => setForm({
								...form,
								platform: v ?? "twitter"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Title",
							required: true,
							value: form.title,
							onChange: (e) => setForm({
								...form,
								title: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Content",
							value: form.content,
							onChange: (e) => setForm({
								...form,
								content: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "URL",
							value: form.mentionUrl,
							onChange: (e) => setForm({
								...form,
								mentionUrl: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Sentiment",
							data: [
								"positive",
								"negative",
								"neutral"
							].map((v) => ({
								value: v,
								label: v.charAt(0).toUpperCase() + v.slice(1)
							})),
							value: form.sentiment,
							onChange: (v) => setForm({
								...form,
								sentiment: v ?? "neutral"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Reach",
							type: "number",
							value: form.reach,
							onChange: (e) => setForm({
								...form,
								reach: parseInt(e.currentTarget.value) || 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Category",
							data: [
								"awareness",
								"credibility",
								"imposition",
								"fake-news",
								"grievance",
								"other"
							].map((v) => ({
								value: v,
								label: v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
							})),
							value: form.category || null,
							onChange: (v) => setForm({
								...form,
								category: v ?? ""
							}),
							clearable: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Source",
							data: [
								"organic",
								"monitoring",
								"supporter-report",
								"media"
							].map((v) => ({
								value: v,
								label: v.charAt(0).toUpperCase() + v.slice(1)
							})),
							value: form.source || null,
							onChange: (v) => setForm({
								...form,
								source: v ?? ""
							}),
							clearable: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: () => createMention.mutate(form, { onSuccess: close }),
							style: { background: apmBlue },
							mt: "sm",
							children: "Log Mention"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: responseOpened,
				onClose: closeResponse,
				title: "Rapid Response",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Response Type",
							data: [
								"rebuttal",
								"clarification",
								"acknowledgment",
								"escalation"
							].map((v) => ({
								value: v,
								label: v.charAt(0).toUpperCase() + v.slice(1)
							})),
							value: responseForm.responseType,
							onChange: (v) => setResponseForm({
								...responseForm,
								responseType: v ?? "rebuttal"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Response Content",
							required: true,
							minRows: 4,
							value: responseForm.content,
							onChange: (e) => setResponseForm({
								...responseForm,
								content: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Published By",
							value: responseForm.publishedBy,
							onChange: (e) => setResponseForm({
								...responseForm,
								publishedBy: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: () => {
								if (selectedMentionId) createResponse.mutate({
									mentionId: selectedMentionId,
									...responseForm
								}, { onSuccess: closeResponse });
							},
							style: { background: apmBlue },
							mt: "sm",
							children: "Publish Response"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/listening.tsx?tsr-split=component
var SplitComponent = ListeningPage;
//#endregion
export { SplitComponent as component };
