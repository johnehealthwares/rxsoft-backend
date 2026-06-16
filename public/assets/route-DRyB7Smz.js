import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ConfirmDialog } from "./confirm-dialog-CxiN0Wjp.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Hr as Grid, Jt as RxPage, Pn as Plus, cn as useCommunicationCrud, en as JsonEditorField, ln as useCommunicationList, nn as JsonPreviewDialog, rn as getDirtyPayload, sn as normalizeRows, tn as DialogActions } from "./index-BRcLwOKn.js";
import { f as TEMPLATE_TYPE_OPTIONS, o as MESSAGE_TYPE_OPTIONS } from "./constants-CPyAcdXH.js";
import { t as PaginatedDataTable } from "./paginated-data-table-D1vrbZ0O.js";
//#region src/features/communication/components/message-templates.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var defaultFormState = {
	name: "",
	description: "",
	templateType: "message",
	messageType: "text",
	subject: "",
	content: "",
	variables: {},
	isActive: true,
	metadata: {}
};
var columns = [
	{
		key: "id",
		label: "ID"
	},
	{
		key: "name",
		label: "Name"
	},
	{
		key: "templateType",
		label: "Type"
	},
	{
		key: "messageType",
		label: "Message Type"
	},
	{
		key: "isActive",
		label: "Active"
	},
	{
		key: "createdAt",
		label: "Created"
	}
];
function MessageTemplatesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedRow, setSelectedRow] = (0, import_react.useState)(null);
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [isJsonOpen, setIsJsonOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [formState, setFormState] = (0, import_react.useState)(defaultFormState);
	const { data: templates = [], isLoading } = useCommunicationList("message-templates", search);
	const { createMutation, updateMutation, deleteMutation } = useCommunicationCrud("message-templates");
	const rows = (0, import_react.useMemo)(() => normalizeRows(templates), [templates]);
	const openCreate = () => {
		setFormState(defaultFormState);
		setSelectedRow(null);
		setIsFormOpen(true);
	};
	const handleSave = async () => {
		const payload = { ...formState };
		delete payload.id;
		if (formState.id) await updateMutation.mutateAsync({
			id: formState.id,
			payload: getDirtyPayload(selectedRow || {}, payload)
		});
		else await createMutation.mutateAsync(payload);
		setIsFormOpen(false);
	};
	const handleDelete = async () => {
		if (selectedRow?.id) {
			await deleteMutation.mutateAsync(String(selectedRow.id));
			setIsDeleteOpen(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RxPage, {
		title: "Message Templates",
		description: "Manage reusable message templates",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: openCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "New Template"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginatedDataTable, {
				rows,
				columns,
				isLoading,
				searchValue: search,
				onSearchChange: setSearch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: isFormOpen,
				onClose: () => setIsFormOpen(false),
				title: formState.id ? "Edit Template" : "Create Template",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Name",
							required: true,
							value: formState.name,
							onChange: (e) => setFormState((p) => ({
								...p,
								name: e.target.value
							}))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Template Type",
							data: TEMPLATE_TYPE_OPTIONS,
							value: formState.templateType,
							onChange: (v) => setFormState((p) => ({
								...p,
								templateType: v || ""
							}))
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						label: "Description",
						value: formState.description,
						onChange: (e) => setFormState((p) => ({
							...p,
							description: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Message Type",
							data: MESSAGE_TYPE_OPTIONS,
							value: formState.messageType,
							onChange: (v) => setFormState((p) => ({
								...p,
								messageType: v || ""
							}))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: 6,
						style: {
							display: "flex",
							alignItems: "flex-end"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: "Active",
							checked: formState.isActive,
							onChange: (e) => setFormState((p) => ({
								...p,
								isActive: e.currentTarget.checked
							}))
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Subject",
						value: formState.subject,
						onChange: (e) => setFormState((p) => ({
							...p,
							subject: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						label: "Content",
						required: true,
						rows: 6,
						value: formState.content,
						onChange: (e) => setFormState((p) => ({
							...p,
							content: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
						label: "Variables",
						value: formState.variables,
						onChange: (v) => setFormState((p) => ({
							...p,
							variables: v
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
						label: "Metadata",
						value: formState.metadata,
						onChange: (v) => setFormState((p) => ({
							...p,
							metadata: v
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogActions, {
						onSave: handleSave,
						onCancel: () => setIsFormOpen(false),
						isLoading: createMutation.isPending || updateMutation.isPending
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonPreviewDialog, {
				data: selectedRow || {},
				open: isJsonOpen,
				onOpenChange: setIsJsonOpen,
				title: "Message Template JSON"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: isDeleteOpen,
				onOpenChange: setIsDeleteOpen,
				title: "Delete Template",
				desc: "This cannot be undone",
				handleConfirm: handleDelete,
				isLoading: deleteMutation.isPending
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/communication/message-templates/route.tsx?tsr-split=component
var SplitComponent = MessageTemplatesPage;
//#endregion
export { SplitComponent as component };
