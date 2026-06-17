import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as SelectField } from "./select-D0Rn_P4j.js";
import { Yt as RxPage, cn as normalizeRows, jn as Search, on as getOption, rn as JsonPreviewDialog, sn as getString, un as useCommunicationList } from "./index-DwQ-NyPQ.js";
import { a as MESSAGE_STATUS_OPTIONS, o as MESSAGE_TYPE_OPTIONS } from "./constants-CPyAcdXH.js";
import { t as PaginatedDataTable } from "./paginated-data-table-KStfIuKA.js";
//#region src/features/communication/components/message-logs.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
		key: "status",
		label: "Status",
		width: "120px"
	},
	{
		key: "sentAt",
		label: "Sent At",
		width: "150px"
	},
	{
		key: "deliveredAt",
		label: "Delivered At",
		width: "150px"
	}
];
function MessageLogsPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)(getOption(""));
	const [typeFilter, setTypeFilter] = (0, import_react.useState)(getOption(""));
	const [selectedRow] = (0, import_react.useState)(null);
	const [isJsonDialogOpen, setIsJsonDialogOpen] = (0, import_react.useState)(false);
	const { data: logs = [], isLoading } = useCommunicationList("message-logs", search, (0, import_react.useMemo)(() => {
		const params = {};
		if (statusFilter) params.status = statusFilter;
		if (typeFilter) params.messageType = typeFilter;
		return params;
	}, [statusFilter, typeFilter]));
	const normalizedRows = (0, import_react.useMemo)(() => normalizeRows(logs), [logs]);
	const getStatusBadge = (status) => {
		return {
			sent: "bg-green-100 text-green-800",
			delivered: "bg-blue-100 text-blue-800",
			read: "bg-purple-100 text-purple-800",
			failed: "bg-red-100 text-red-800",
			cancelled: "bg-gray-100 text-gray-800",
			scheduled: "bg-yellow-100 text-yellow-800",
			sending: "bg-orange-100 text-orange-800"
		}[status] || "bg-gray-100 text-gray-800";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RxPage, {
		title: "Message Logs",
		description: "View sent messages and delivery status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search messages...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "",
						placeholder: "Filter by status",
						options: MESSAGE_STATUS_OPTIONS,
						value: statusFilter,
						onChange: (option) => setStatusFilter(option),
						className: "w-48"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "",
						placeholder: "Filter by type",
						options: MESSAGE_TYPE_OPTIONS,
						value: typeFilter,
						onChange: (option) => setTypeFilter(option),
						className: "w-48"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginatedDataTable, {
				rows: normalizedRows,
				columns: columns.map((col) => ({
					...col,
					render: col.key === "status" ? (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: getStatusBadge(getString(value)),
						children: getString(value)
					}) : void 0
				})),
				isLoading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonPreviewDialog, {
				data: selectedRow || {},
				title: "Message Log Details",
				open: isJsonDialogOpen,
				onOpenChange: setIsJsonDialogOpen
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/communication/message-logs/route.tsx?tsr-split=component
var SplitComponent = MessageLogsPage;
//#endregion
export { SplitComponent as component };
