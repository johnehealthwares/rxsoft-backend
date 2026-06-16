import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ConfirmDialog } from "./confirm-dialog-CxiN0Wjp.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as SelectField } from "./select-DJXsgV1Q.js";
import { Hr as Grid, Jt as RxPage, Pn as Plus, an as getOption, cn as useCommunicationCrud, en as JsonEditorField, ln as useCommunicationList, nn as JsonPreviewDialog, on as getString, rn as getDirtyPayload, sn as normalizeRows, tn as DialogActions } from "./index-BRcLwOKn.js";
import { n as BROADCAST_STATUS_OPTIONS } from "./constants-CPyAcdXH.js";
import { t as PaginatedDataTable } from "./paginated-data-table-D1vrbZ0O.js";
//#region src/features/communication/components/broadcasts.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var defaultFormState = {
	name: "",
	description: "",
	messageTemplateId: "",
	channelIds: [],
	recipientCriteria: {},
	scheduledAt: "",
	status: {
		value: "draft",
		label: "Draft"
	},
	totalRecipients: 0,
	sentCount: 0,
	failedCount: 0,
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
		key: "status",
		label: "Status"
	},
	{
		key: "totalRecipients",
		label: "Recipients"
	},
	{
		key: "sentCount",
		label: "Sent"
	},
	{
		key: "scheduledAt",
		label: "Scheduled"
	},
	{
		key: "createdAt",
		label: "Created"
	}
];
function BroadcastsPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedRow, setSelectedRow] = (0, import_react.useState)(null);
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [isJsonOpen, setIsJsonOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [formState, setFormState] = (0, import_react.useState)(defaultFormState);
	const { data: broadcasts = [], isLoading } = useCommunicationList("broadcasts", search);
	const { createMutation, updateMutation, deleteMutation } = useCommunicationCrud("broadcasts");
	const rows = (0, import_react.useMemo)(() => normalizeRows(broadcasts), [broadcasts]);
	const openCreate = () => {
		setFormState(defaultFormState);
		setSelectedRow(null);
		setIsFormOpen(true);
	};
	const openEdit = (row) => {
		setSelectedRow(row);
		setFormState({
			id: getString(row.id),
			name: getString(row.name),
			description: getString(row.description),
			messageTemplateId: getString(row.messageTemplateId),
			channelIds: row.channelIds ?? [],
			recipientCriteria: row.recipientCriteria ?? {},
			scheduledAt: getString(row.scheduledAt),
			status: getOption(row.status) || getOption("draft"),
			totalRecipients: Number(row.totalRecipients ?? 0),
			sentCount: Number(row.sentCount ?? 0),
			failedCount: Number(row.failedCount ?? 0),
			metadata: row.metadata ?? {}
		});
		setIsFormOpen(true);
	};
	const openDelete = (row) => {
		setSelectedRow(row);
		setIsDeleteOpen(true);
	};
	const openJson = (row) => {
		setSelectedRow(row);
		setIsJsonOpen(true);
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
		title: "Broadcasts",
		description: "Manage mass communication campaigns",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: openCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "New Broadcast"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginatedDataTable, {
				rows,
				columns: columns.map((col) => ({
					...col,
					render: col.key === "status" ? (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "light",
						children: getString(value)
					}) : void 0
				})),
				isLoading,
				searchValue: search,
				onSearchChange: setSearch,
				actionCellProps: { actions: [
					{
						label: "View JSON",
						onClick: openJson
					},
					{
						label: "Edit",
						onClick: openEdit
					},
					{
						label: "Delete",
						onClick: openDelete
					}
				] }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: isFormOpen,
				onClose: () => setIsFormOpen(false),
				title: formState.id ? "Edit Broadcast" : "Create Broadcast",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Name",
						required: true,
						value: formState.name,
						onChange: (e) => setFormState((p) => ({
							...p,
							name: e.target.value
						}))
					}),
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Template ID",
							value: formState.messageTemplateId,
							onChange: (e) => setFormState((p) => ({
								...p,
								messageTemplateId: e.target.value
							}))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "Status",
							options: BROADCAST_STATUS_OPTIONS,
							value: formState.status,
							onChange: (value) => setFormState((p) => ({
								...p,
								status: value
							}))
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						type: "datetime-local",
						label: "Schedule",
						value: formState.scheduledAt,
						onChange: (e) => setFormState((p) => ({
							...p,
							scheduledAt: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
						label: "Recipient Criteria",
						value: formState.recipientCriteria,
						onChange: (v) => setFormState((p) => ({
							...p,
							recipientCriteria: v
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
				title: "Broadcast JSON"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: isDeleteOpen,
				onOpenChange: setIsDeleteOpen,
				title: "Delete Broadcast",
				desc: "This cannot be undone",
				handleConfirm: handleDelete,
				isLoading: deleteMutation.isPending
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/communication/broadcasts/route.tsx?tsr-split=component
var SplitComponent = BroadcastsPage;
//#endregion
export { SplitComponent as component };
