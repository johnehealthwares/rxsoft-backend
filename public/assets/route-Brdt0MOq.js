import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ConfirmDialog } from "./confirm-dialog-CxiN0Wjp.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as SelectField } from "./select-D0Rn_P4j.js";
import { Fn as Plus, Lr as Title, Wr as Grid, Yt as RxPage, cn as normalizeRows, in as getDirtyPayload, ln as useCommunicationCrud, on as getOption, rn as JsonPreviewDialog, tn as JsonEditorField, un as useCommunicationList } from "./index-DuM1cidb.js";
import { i as MESSAGE_PRIORITY_OPTIONS, o as MESSAGE_TYPE_OPTIONS } from "./constants-CPyAcdXH.js";
import { t as PaginatedDataTable } from "./paginated-data-table-BAfnYkVx.js";
//#region src/features/communication/components/messages.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var defaultFormState = {
	recipientId: "",
	recipientEmail: "",
	recipientPhone: "",
	channelId: "",
	templateId: "",
	messageType: getOption("text"),
	subject: "",
	content: "",
	priority: getOption("normal"),
	status: "draft",
	scheduledAt: "",
	metadata: {}
};
var columns = [
	{
		key: "id",
		label: "ID",
		width: "80px"
	},
	{
		key: "recipientEmail",
		label: "Recipient",
		width: "200px"
	},
	{
		key: "messageType",
		label: "Type",
		width: "100px"
	},
	{
		key: "subject",
		label: "Subject",
		width: "200px"
	},
	{
		key: "priority",
		label: "Priority",
		width: "100px"
	},
	{
		key: "status",
		label: "Status",
		width: "100px"
	},
	{
		key: "createdAt",
		label: "Created",
		width: "150px"
	}
];
function MessagesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedRow] = (0, import_react.useState)(null);
	const [isCreateOpen, setIsCreateOpen] = (0, import_react.useState)(false);
	const [isEditOpen, setIsEditOpen] = (0, import_react.useState)(false);
	const [isJsonOpen, setIsJsonOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [formState, setFormState] = (0, import_react.useState)(defaultFormState);
	const { data: messages = [], isLoading } = useCommunicationList("messages", search);
	const { createMutation, updateMutation, deleteMutation } = useCommunicationCrud("messages");
	const rows = (0, import_react.useMemo)(() => normalizeRows(messages), [messages]);
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
	const handleDelete = async () => {
		if (!selectedRow?.id) return;
		await deleteMutation.mutateAsync(String(selectedRow.id));
		setIsDeleteOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RxPage, {
		title: "Messages",
		description: "Manage individual messages and communications",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: handleCreate,
			leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }),
			children: "New Message"
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
				opened: isCreateOpen,
				onClose: () => setIsCreateOpen(false),
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 4,
					children: "Create Message"
				}),
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Recipient Email",
								value: formState.recipientEmail,
								onChange: (e) => setFormState((p) => ({
									...p,
									recipientEmail: e.target.value
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Recipient Phone",
								value: formState.recipientPhone,
								onChange: (e) => setFormState((p) => ({
									...p,
									recipientPhone: e.target.value
								}))
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "Message Type",
								options: MESSAGE_TYPE_OPTIONS,
								value: formState.messageType,
								onChange: (v) => setFormState((p) => ({
									...p,
									messageType: v
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "Priority",
								options: MESSAGE_PRIORITY_OPTIONS,
								value: formState.priority,
								onChange: (v) => setFormState((p) => ({
									...p,
									priority: v
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
							minRows: 4,
							value: formState.content,
							onChange: (e) => setFormState((p) => ({
								...p,
								content: e.target.value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Schedule Send",
							type: "datetime-local",
							value: formState.scheduledAt,
							onChange: (e) => setFormState((p) => ({
								...p,
								scheduledAt: e.target.value
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
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 4,
					children: "Edit Message"
				}),
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Recipient Email",
							value: formState.recipientEmail,
							onChange: (e) => setFormState((p) => ({
								...p,
								recipientEmail: e.target.value
							}))
						}),
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
							minRows: 4,
							value: formState.content,
							onChange: (e) => setFormState((p) => ({
								...p,
								content: e.target.value
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
				title: "Message JSON",
				open: isJsonOpen,
				onOpenChange: setIsJsonOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: isDeleteOpen,
				onOpenChange: setIsDeleteOpen,
				title: "Delete Message",
				description: "This action cannot be undone.",
				onConfirm: handleDelete,
				isLoading: deleteMutation.isPending
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/communication/messages/route.tsx?tsr-split=component
var SplitComponent = MessagesPage;
//#endregion
export { SplitComponent as component };
