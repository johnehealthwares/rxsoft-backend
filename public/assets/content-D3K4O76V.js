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
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Lr as Title, Wr as Grid } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DsBYIIU2.js";
import { o as useContentAssets, u as useCreateContentAsset } from "./admin-hooks-Bgvrjqtv.js";
//#region src/features/apm/admin/ContentFactoryPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ContentFactoryPage() {
	const { data, isLoading } = useContentAssets();
	const createContent = useCreateContentAsset();
	const [opened, { open, close }] = useDisclosure(false);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		type: "flyer",
		assetUrl: "",
		language: "English",
		tags: "",
		messageKey: ""
	});
	const typeCounts = {};
	(data?.items ?? []).forEach((c) => {
		typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					style: { color: ink },
					children: "Content Factory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setForm({
							title: "",
							type: "flyer",
							assetUrl: "",
							language: "English",
							tags: "",
							messageKey: ""
						});
						open();
					},
					style: { background: apmBlue },
					children: "Add Content"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [Object.entries(typeCounts).map(([type, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "xs",
							style: { color: muted },
							children: [type, "s"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 800,
							style: {
								fontSize: "1.5rem",
								color: apmBlue
							},
							children: count
						})]
					})
				})
			}, type)), Object.keys(typeCounts).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					style: {
						color: "#64748B",
						textAlign: "center"
					},
					children: "No content assets yet"
				})
			})] }),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Language" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Link" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: (data?.items ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "light",
							children: c.type
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: c.language ?? "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: c.status === "published" ? "green" : c.status === "draft" ? "gray" : "yellow",
							children: c.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xs",
							variant: "light",
							component: "a",
							href: c.assetUrl,
							target: "_blank",
							children: "Open"
						}) })
					] }, c.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "Add Content Asset",
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
								"flyer",
								"video",
								"voice-note",
								"infographic",
								"poster",
								"social-media",
								"script"
							].map((v) => ({
								value: v,
								label: v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
							})),
							value: form.type,
							onChange: (v) => setForm({
								...form,
								type: v ?? "flyer"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Asset URL",
							required: true,
							value: form.assetUrl,
							onChange: (e) => setForm({
								...form,
								assetUrl: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Language",
							value: form.language,
							onChange: (e) => setForm({
								...form,
								language: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Message Key",
							value: form.messageKey,
							onChange: (e) => setForm({
								...form,
								messageKey: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Tags (comma-separated)",
							value: form.tags,
							onChange: (e) => setForm({
								...form,
								tags: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: () => createContent.mutate(form, { onSuccess: close }),
							style: { background: apmBlue },
							mt: "sm",
							children: "Create"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/content.tsx?tsr-split=component
var SplitComponent = ContentFactoryPage;
//#endregion
export { SplitComponent as component };
