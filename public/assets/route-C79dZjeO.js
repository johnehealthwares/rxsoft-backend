import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ConfirmDialog } from "./confirm-dialog-CxiN0Wjp.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as SelectField } from "./select-D0Rn_P4j.js";
import { Fn as Plus, Wr as Grid, Yt as RxPage, cn as normalizeRows, in as getDirtyPayload, ln as useCommunicationCrud, on as getOption, rn as JsonPreviewDialog, tn as JsonEditorField, un as useCommunicationList } from "./index-DuM1cidb.js";
import { r as CHANNEL_TYPE_OPTIONS } from "./constants-CPyAcdXH.js";
import { t as PaginatedDataTable } from "./paginated-data-table-BAfnYkVx.js";
//#region src/features/communication/components/communication-channels.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var defaultFormState = {
	name: "",
	description: "",
	type: getOption("email"),
	provider: "",
	config: {},
	isActive: true,
	priority: 1,
	rateLimit: 100,
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
		key: "provider",
		label: "Provider",
		width: "150px"
	},
	{
		key: "isActive",
		label: "Active",
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
	}
];
function CommunicationChannelsPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedRow, setSelectedRow] = (0, import_react.useState)(null);
	const [isCreateOpen, setIsCreateOpen] = (0, import_react.useState)(false);
	const [isEditOpen, setIsEditOpen] = (0, import_react.useState)(false);
	const [isJsonOpen, setIsJsonOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [formState, setFormState] = (0, import_react.useState)(defaultFormState);
	const { data: channels = [], isLoading } = useCommunicationList("communication-channels", search);
	const { createMutation, updateMutation, deleteMutation } = useCommunicationCrud("communication-channels");
	const rows = (0, import_react.useMemo)(() => normalizeRows(channels), [channels]);
	function openCreate() {
		setSelectedRow(null);
		setFormState(defaultFormState);
		setIsCreateOpen(true);
	}
	async function handleSave() {
		const payload = { ...formState };
		delete payload.id;
		if (formState.id) await updateMutation.mutateAsync({
			id: formState.id,
			payload: getDirtyPayload(selectedRow || {}, payload)
		});
		else await createMutation.mutateAsync(payload);
		setIsCreateOpen(false);
		setIsEditOpen(false);
	}
	async function handleDelete() {
		if (!selectedRow?.id) return;
		await deleteMutation.mutateAsync(String(selectedRow.id));
		setIsDeleteOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RxPage, {
		title: "Communication Channels",
		description: "Manage communication channels and providers",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: openCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "New Channel"]
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
				opened: isCreateOpen || isEditOpen,
				onClose: () => {
					setIsCreateOpen(false);
					setIsEditOpen(false);
				},
				title: isEditOpen ? "Edit Channel" : "Create Channel",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Name",
								value: formState.name,
								onChange: (e) => setFormState((p) => ({
									...p,
									name: e.target.value
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "Type",
								options: CHANNEL_TYPE_OPTIONS,
								value: formState.type,
								onChange: (value) => setFormState((p) => ({
									...p,
									type: value
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Provider",
								value: formState.provider,
								onChange: (e) => setFormState((p) => ({
									...p,
									provider: e.target.value
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: "Active",
								checked: formState.isActive,
								onChange: (e) => setFormState((p) => ({
									...p,
									isActive: e.currentTarget.checked
								}))
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Priority",
								type: "number",
								value: formState.priority,
								onChange: (e) => setFormState((p) => ({
									...p,
									priority: Number(e.target.value) || 1
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Rate Limit",
								type: "number",
								value: formState.rateLimit,
								onChange: (e) => setFormState((p) => ({
									...p,
									rateLimit: Number(e.target.value) || 100
								}))
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
							label: "Config",
							value: formState.config,
							onChange: (value) => setFormState((p) => ({
								...p,
								config: value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
							label: "Metadata",
							value: formState.metadata,
							onChange: (value) => setFormState((p) => ({
								...p,
								metadata: value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "flex-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "default",
								onClick: () => {
									setIsCreateOpen(false);
									setIsEditOpen(false);
								},
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handleSave,
								loading: createMutation.isPending || updateMutation.isPending,
								children: "Save"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonPreviewDialog, {
				data: selectedRow || {},
				title: "Channel JSON",
				open: isJsonOpen,
				onOpenChange: setIsJsonOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: isDeleteOpen,
				onOpenChange: setIsDeleteOpen,
				title: "Delete Channel",
				desc: "This action cannot be undone",
				handleConfirm: handleDelete,
				isLoading: deleteMutation.isPending
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/communication/communication-channels/route.tsx?tsr-split=component
var SplitComponent = CommunicationChannelsPage;
//#endregion
export { SplitComponent as component };
