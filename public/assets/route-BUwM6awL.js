import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Switch } from "./Switch-BPgr54EU.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as Braces } from "./braces-Df4bl00R.js";
import { t as SelectField } from "./select-D0Rn_P4j.js";
import { Cn as Trash2, Fn as Plus, Ln as Pencil, Wr as Grid, Yt as RxPage, an as getObject, cn as normalizeRows, in as getDirtyPayload, ln as useCommunicationCrud, on as getOption, rn as JsonPreviewDialog, sn as getString, tn as JsonEditorField, un as useCommunicationList } from "./index-DwQ-NyPQ.js";
import { s as NOTIFICATION_TYPE_OPTIONS } from "./constants-CPyAcdXH.js";
import { t as PaginatedDataTable } from "./paginated-data-table-KStfIuKA.js";
//#region src/features/communication/components/notification-templates.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var defaultFormState = {
	name: "",
	description: "",
	type: getOption("info"),
	title: "",
	message: "",
	actionUrl: "",
	actionText: "",
	variables: {},
	isActive: true,
	metadata: {}
};
var columns = [
	{
		key: "id",
		label: "ID",
		width: "80px"
	},
	{
		key: "name",
		label: "Name",
		width: "200px"
	},
	{
		key: "type",
		label: "Type",
		width: "120px"
	},
	{
		key: "title",
		label: "Title",
		width: "200px"
	},
	{
		key: "isActive",
		label: "Active",
		width: "100px"
	},
	{
		key: "createdAt",
		label: "Created",
		width: "150px"
	},
	{
		key: "updatedAt",
		label: "Updated",
		width: "150px"
	}
];
function NotificationTemplatesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedRow, setSelectedRow] = (0, import_react.useState)(null);
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [jsonOpen, setJsonOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(defaultFormState);
	const { data: templates = [], isLoading } = useCommunicationList("notification-templates", search);
	const { createMutation, updateMutation, deleteMutation } = useCommunicationCrud("notification-templates");
	const rows = (0, import_react.useMemo)(() => normalizeRows(templates), [templates]);
	function openCreate() {
		setForm(defaultFormState);
		setCreateOpen(true);
	}
	function openEdit(row) {
		setSelectedRow(row);
		setForm({
			id: getString(row.id),
			name: getString(row.name),
			description: getString(row.description),
			type: getOption(row.type),
			title: getString(row.title),
			message: getString(row.message),
			actionUrl: getString(row.actionUrl),
			actionText: getString(row.actionText),
			variables: getObject(row.variables),
			isActive: Boolean(row.isActive),
			metadata: getObject(row.metadata)
		});
		setEditOpen(true);
	}
	function openJson(row) {
		setSelectedRow(row);
		setJsonOpen(true);
	}
	function openDelete(row) {
		setSelectedRow(row);
		setDeleteOpen(true);
	}
	async function handleSave() {
		const payload = { ...form };
		delete payload.id;
		if (form.id) {
			await updateMutation.mutateAsync({
				id: form.id,
				payload: getDirtyPayload(selectedRow || {}, payload)
			});
			setEditOpen(false);
		} else {
			await createMutation.mutateAsync(payload);
			setCreateOpen(false);
		}
	}
	async function confirmDelete() {
		if (selectedRow?.id) {
			await deleteMutation.mutateAsync(String(selectedRow.id));
			setDeleteOpen(false);
		}
	}
	const actions = [
		{
			label: "View JSON",
			icon: Braces,
			onClick: openJson
		},
		{
			label: "Edit",
			icon: Pencil,
			onClick: openEdit
		},
		{
			label: "Delete",
			icon: Trash2,
			onClick: openDelete,
			variant: "destructive"
		}
	];
	function FormFields() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Name",
						required: true,
						value: form.name,
						onChange: (e) => setForm((p) => ({
							...p,
							name: e.currentTarget.value
						}))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Type",
						options: NOTIFICATION_TYPE_OPTIONS,
						value: form.type,
						onChange: (value) => setForm((p) => ({
							...p,
							type: value
						}))
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					label: "Description",
					value: form.description,
					onChange: (e) => setForm((p) => ({
						...p,
						description: e.currentTarget.value
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					label: "Title",
					required: true,
					value: form.title,
					onChange: (e) => setForm((p) => ({
						...p,
						title: e.currentTarget.value
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					label: "Message",
					required: true,
					value: form.message,
					onChange: (e) => setForm((p) => ({
						...p,
						message: e.currentTarget.value
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Action URL",
						value: form.actionUrl,
						onChange: (e) => setForm((p) => ({
							...p,
							actionUrl: e.currentTarget.value
						}))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Action Text",
						value: form.actionText,
						onChange: (e) => setForm((p) => ({
							...p,
							actionText: e.currentTarget.value
						}))
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					label: "Active",
					checked: form.isActive,
					onChange: (e) => setForm((p) => ({
						...p,
						isActive: e.currentTarget.checked
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
					label: "Variables",
					value: form.variables,
					onChange: (v) => setForm((p) => ({
						...p,
						variables: v
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
					label: "Metadata",
					value: form.metadata,
					onChange: (v) => setForm((p) => ({
						...p,
						metadata: v
					}))
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RxPage, {
		title: "Notification Templates",
		description: "Manage reusable notification templates",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: openCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), "New Template"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginatedDataTable, {
				rows,
				columns,
				isLoading,
				searchValue: search,
				onSearchChange: setSearch,
				actionCellProps: { actions }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				opened: createOpen,
				onClose: () => setCreateOpen(false),
				title: "Create Template",
				size: "lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFields, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "flex-end",
					mt: "md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						onClick: () => setCreateOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSave,
						loading: createMutation.isPending,
						children: "Save"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				opened: editOpen,
				onClose: () => setEditOpen(false),
				title: "Edit Template",
				size: "lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFields, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "flex-end",
					mt: "md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						onClick: () => setEditOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSave,
						loading: updateMutation.isPending,
						children: "Save"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonPreviewDialog, {
				data: selectedRow || {},
				title: "Notification Template JSON",
				open: jsonOpen,
				onOpenChange: setJsonOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				opened: deleteOpen,
				onClose: () => setDeleteOpen(false),
				title: "Delete Template",
				centered: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					children: "Are you sure you want to delete this template? This action cannot be undone."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "flex-end",
					mt: "md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						onClick: () => setDeleteOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						color: "red",
						loading: deleteMutation.isPending,
						onClick: confirmDelete,
						children: "Delete"
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/communication/notification-templates/route.tsx?tsr-split=component
var SplitComponent = NotificationTemplatesPage;
//#endregion
export { SplitComponent as component };
