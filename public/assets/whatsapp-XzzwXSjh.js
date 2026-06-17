import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Anchor } from "./Anchor-DyykEMLS.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as NumberInput } from "./NumberInput-Dzj2A-5Q.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Lr as Title } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted } from "./layout-DZbjExJ-.js";
import { Y as useWhatsAppGroups, y as useCreateWhatsAppGroup } from "./admin-hooks-B1eYS0FA.js";
//#region src/features/apm/admin/WhatsAppGroupsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var levelOptions = [
	"state",
	"senatorial",
	"lga",
	"ward"
].map((l) => ({
	value: l,
	label: l.charAt(0).toUpperCase() + l.slice(1)
}));
function WhatsAppGroupsPage() {
	const [level, setLevel] = (0, import_react.useState)("state");
	const [opened, { open, close }] = useDisclosure(false);
	const [form, setForm] = (0, import_react.useState)({
		level: "state",
		name: "",
		description: "",
		groupLink: "",
		adminName: "",
		adminPhone: "",
		memberCount: 0
	});
	const { data: groups, isLoading } = useWhatsAppGroups(level);
	const createMutation = useCreateWhatsAppGroup();
	const handleSubmit = () => {
		createMutation.mutate(form, { onSuccess: () => {
			close();
			setForm({
				level: "state",
				name: "",
				description: "",
				groupLink: "",
				adminName: "",
				adminPhone: "",
				memberCount: 0
			});
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
					children: "WhatsApp Command Groups"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: open,
					style: { background: apmBlue },
					children: "Add Group"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { children: [
				"state",
				"senatorial",
				"lga",
				"ward"
			].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				style: {
					cursor: "pointer",
					textTransform: "capitalize",
					background: level === l ? apmBlue : "#E2E8F0",
					color: level === l ? "#fff" : muted,
					padding: "8px 16px"
				},
				onClick: () => setLevel(l),
				children: l
			}, l)) }),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Group Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Level" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Admin" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Members" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Link" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [(groups ?? []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 600,
							children: g.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: g.level === "state" ? "blue" : g.level === "senatorial" ? "violet" : g.level === "lga" ? "teal" : "gray",
							children: g.level
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							style: { color: muted },
							children: g.adminName ? `${g.adminName}${g.adminPhone ? ` (${g.adminPhone})` : ""}` : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: g.memberCount }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: g.groupLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
							href: g.groupLink,
							target: "_blank",
							size: "sm",
							children: "Open"
						}) : "—" })
					] }, g.id)), (groups ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						colSpan: 5,
						style: {
							textAlign: "center",
							color: "#64748B"
						},
						children: "No WhatsApp groups found for this level"
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened,
				onClose: close,
				title: "Add WhatsApp Group",
				size: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Level",
							data: levelOptions,
							value: form.level,
							onChange: (v) => setForm({
								...form,
								level: v ?? "state"
							}),
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Group Name",
							required: true,
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Description",
							value: form.description,
							onChange: (e) => setForm({
								...form,
								description: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Group Link",
							value: form.groupLink,
							onChange: (e) => setForm({
								...form,
								groupLink: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Admin Name",
							value: form.adminName,
							onChange: (e) => setForm({
								...form,
								adminName: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Admin Phone",
							value: form.adminPhone,
							onChange: (e) => setForm({
								...form,
								adminPhone: e.currentTarget.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
							label: "Member Count",
							value: form.memberCount,
							min: 0,
							onChange: (v) => setForm({
								...form,
								memberCount: v ?? 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							onClick: handleSubmit,
							style: { background: apmBlue },
							mt: "sm",
							children: "Create Group"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/apm/admin/whatsapp.tsx?tsr-split=component
var SplitComponent = WhatsAppGroupsPage;
//#endregion
export { SplitComponent as component };
