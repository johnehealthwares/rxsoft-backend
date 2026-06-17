import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ConfirmDialog } from "./confirm-dialog-CxiN0Wjp.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Fn as Plus, Yt as RxPage, cn as normalizeRows, in as getDirtyPayload, ln as useCommunicationCrud, rn as JsonPreviewDialog, tn as JsonEditorField, un as useCommunicationList } from "./index-DwQ-NyPQ.js";
import { s as NOTIFICATION_TYPE_OPTIONS } from "./constants-CPyAcdXH.js";
import { t as PaginatedDataTable } from "./paginated-data-table-KStfIuKA.js";
//#region src/features/communication/components/notifications.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var defaultFormState = {
	title: "",
	message: "",
	type: "info",
	recipientIds: [],
	isBroadcast: false,
	scheduledAt: "",
	expiresAt: "",
	priority: "normal",
	metadata: {}
};
var columns = [
	{
		key: "id",
		label: "ID",
		width: "80px"
	},
	{
		key: "title",
		label: "Title",
		width: "200px"
	},
	{
		key: "type",
		label: "Type",
		width: "100px"
	},
	{
		key: "isBroadcast",
		label: "Broadcast",
		width: "100px"
	},
	{
		key: "priority",
		label: "Priority",
		width: "100px"
	},
	{
		key: "createdAt",
		label: "Created",
		width: "150px"
	},
	{
		key: "scheduledAt",
		label: "Scheduled",
		width: "150px"
	}
];
function NotificationsPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedRow, setSelectedRow] = (0, import_react.useState)(null);
	const [isCreateOpen, setIsCreateOpen] = (0, import_react.useState)(false);
	const [isEditOpen, setIsEditOpen] = (0, import_react.useState)(false);
	const [isJsonOpen, setIsJsonOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [formState, setFormState] = (0, import_react.useState)(defaultFormState);
	const { data: notifications = [], isLoading } = useCommunicationList("notifications", search);
	const { createMutation, updateMutation, deleteMutation } = useCommunicationCrud("notifications");
	const normalizedRows = (0, import_react.useMemo)(() => normalizeRows(notifications), [notifications]);
	const handleCreate = () => {
		setFormState(defaultFormState);
		setIsCreateOpen(true);
	};
	const handleSave = async () => {
		const payload = { ...formState };
		delete payload.id;
		if (formState.id) await updateMutation.mutateAsync({
			id: formState.id,
			payload: getDirtyPayload(selectedRow || {}, payload)
		});
		else await createMutation.mutateAsync(payload);
		setIsCreateOpen(false);
		setIsEditOpen(false);
	};
	const handleConfirmDelete = async () => {
		if (selectedRow?.id) {
			await deleteMutation.mutateAsync(String(selectedRow.id));
			setIsDeleteOpen(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RxPage, {
		title: "Notifications",
		description: "Manage system notifications and alerts",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: handleCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "New Notification"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginatedDataTable, {
				rows: normalizedRows,
				columns,
				isLoading,
				searchValue: search,
				onSearchChange: setSearch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: isCreateOpen,
				onClose: () => setIsCreateOpen(false),
				title: "Create Notification",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Title",
							value: formState.title,
							onChange: (e) => setFormState((p) => ({
								...p,
								title: e.target.value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Message",
							value: formState.message,
							onChange: (e) => setFormState((p) => ({
								...p,
								message: e.target.value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							grow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								label: "Type",
								data: NOTIFICATION_TYPE_OPTIONS,
								value: formState.type,
								onChange: (v) => setFormState((p) => ({
									...p,
									type: v || "info"
								}))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								label: "Priority",
								data: [
									{
										value: "low",
										label: "Low"
									},
									{
										value: "normal",
										label: "Normal"
									},
									{
										value: "high",
										label: "High"
									},
									{
										value: "urgent",
										label: "Urgent"
									}
								],
								value: formState.priority,
								onChange: (v) => setFormState((p) => ({
									...p,
									priority: v || "normal"
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: "Broadcast to all users",
							checked: formState.isBroadcast,
							onChange: (e) => setFormState((p) => ({
								...p,
								isBroadcast: e.currentTarget.checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							grow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Scheduled At",
								type: "datetime-local",
								value: formState.scheduledAt,
								onChange: (e) => setFormState((p) => ({
									...p,
									scheduledAt: e.target.value
								}))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Expires At",
								type: "datetime-local",
								value: formState.expiresAt,
								onChange: (e) => setFormState((p) => ({
									...p,
									expiresAt: e.target.value
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
							label: "Metadata",
							value: formState.metadata,
							onChange: (v) => setFormState((p) => ({
								...p,
								metadata: v
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "flex-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "default",
								onClick: () => setIsCreateOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handleSave,
								loading: createMutation.isPending,
								children: "Save"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: isEditOpen,
				onClose: () => setIsEditOpen(false),
				title: "Edit Notification",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Title",
							value: formState.title,
							onChange: (e) => setFormState((p) => ({
								...p,
								title: e.target.value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							label: "Message",
							value: formState.message,
							onChange: (e) => setFormState((p) => ({
								...p,
								message: e.target.value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							grow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								label: "Type",
								data: NOTIFICATION_TYPE_OPTIONS,
								value: formState.type,
								onChange: (v) => setFormState((p) => ({
									...p,
									type: v || "info"
								}))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								label: "Priority",
								data: [
									{
										value: "low",
										label: "Low"
									},
									{
										value: "normal",
										label: "Normal"
									},
									{
										value: "high",
										label: "High"
									},
									{
										value: "urgent",
										label: "Urgent"
									}
								],
								value: formState.priority,
								onChange: (v) => setFormState((p) => ({
									...p,
									priority: v || "normal"
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: "Broadcast to all users",
							checked: formState.isBroadcast,
							onChange: (e) => setFormState((p) => ({
								...p,
								isBroadcast: e.currentTarget.checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							grow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Scheduled At",
								type: "datetime-local",
								value: formState.scheduledAt,
								onChange: (e) => setFormState((p) => ({
									...p,
									scheduledAt: e.target.value
								}))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Expires At",
								type: "datetime-local",
								value: formState.expiresAt,
								onChange: (e) => setFormState((p) => ({
									...p,
									expiresAt: e.target.value
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
							label: "Metadata",
							value: formState.metadata,
							onChange: (v) => setFormState((p) => ({
								...p,
								metadata: v
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "flex-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "default",
								onClick: () => setIsEditOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handleSave,
								loading: updateMutation.isPending,
								children: "Save"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonPreviewDialog, {
				data: selectedRow || {},
				title: "Notification JSON",
				open: isJsonOpen,
				onOpenChange: setIsJsonOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: isDeleteOpen,
				onOpenChange: setIsDeleteOpen,
				title: "Delete Notification",
				description: "Are you sure you want to delete this notification?",
				onConfirm: handleConfirmDelete,
				isLoading: deleteMutation.isPending
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/communication/notifications/route.tsx?tsr-split=component
var SplitComponent = NotificationsPage;
//#endregion
export { SplitComponent as component };
