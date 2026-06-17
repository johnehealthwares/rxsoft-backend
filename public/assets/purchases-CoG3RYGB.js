import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Tooltip } from "./Tooltip-Ta-fBfrz.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Drawer } from "./Drawer-rwUhgHFQ.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as NumberInput } from "./NumberInput-Dzj2A-5Q.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Switch } from "./Switch-BPgr54EU.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { n as useQueryClient } from "./QueryClientProvider-DlcixLz9.js";
import { t as useMutation } from "./useMutation-CaMFWIEn.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as FileText } from "./file-text-ZMRlE-dq.js";
import { An as Send, Cn as Trash2, Fn as Plus, Lr as Title, Mr as create, Nn as RefreshCcw, Vr as PasswordInput, _n as X, jr as rxsoftApi, kn as Settings, tr as Check } from "./index-DwQ-NyPQ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Printer = createLucideIcon("printer", [
	["path", {
		d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
		key: "143wyd"
	}],
	["path", {
		d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
		key: "1itne7"
	}],
	["rect", {
		x: "6",
		y: "14",
		width: "12",
		height: "8",
		rx: "1",
		key: "1ue0tg"
	}]
]);
//#endregion
//#region src/features/damorex/po/api/poApi.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var poKeys = {
	list: (search) => ["purchase-orders", search || ""],
	detail: (id) => ["purchase-orders", id || ""]
};
var receiptKeys = { byPo: (poId) => ["goods-receipts", poId] };
function usePurchaseOrders(search) {
	return useQuery({
		queryKey: poKeys.list(search),
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/purchases", { params: {
				search: search || "",
				limit: 50
			} });
			return data?.data ?? data ?? [];
		},
		staleTime: 3e4
	});
}
function useCreatePurchaseOrder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload) => {
			const { data } = await rxsoftApi.post("/purchases", payload);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries(poKeys.list());
		}
	});
}
function useSuppliers(search) {
	return useQuery({
		queryKey: ["suppliers", search],
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/suppliers", { params: {
				search,
				limit: 20
			} });
			return data?.data ?? data ?? [];
		},
		staleTime: 6e4
	});
}
function useCreateSupplier() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload) => {
			const { data } = await rxsoftApi.post("/suppliers", payload);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["suppliers"] });
		}
	});
}
function useWarehouses(search) {
	return useQuery({
		queryKey: ["warehouses", search],
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/warehouses", { params: {
				search,
				limit: 20
			} });
			return data?.data ?? data ?? [];
		},
		staleTime: 6e4
	});
}
function useReceiveGoods() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ poId, payload }) => {
			const { data } = await rxsoftApi.post(`/purchases/${poId}/receive`, payload);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries(poKeys.list());
			qc.invalidateQueries(receiptKeys.byPo(""));
		}
	});
}
function useUnpostGoods() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ poId, payload }) => {
			const { data } = await rxsoftApi.post(`/purchases/${poId}/unpost`, payload);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries(poKeys.list());
			qc.invalidateQueries(receiptKeys.byPo(""));
		}
	});
}
function useItems(search) {
	return useQuery({
		queryKey: ["catalog-items", search],
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/items", { params: {
				search,
				limit: 20
			} });
			return data?.data ?? data ?? [];
		},
		staleTime: 6e4
	});
}
function useItemUoms(itemId) {
	return useQuery({
		queryKey: ["item-uoms", itemId],
		queryFn: async () => {
			if (!itemId) return [];
			const { data } = await rxsoftApi.get(`/items/${itemId}/uoms`);
			return data?.data ?? data ?? [];
		},
		enabled: !!itemId,
		staleTime: 12e4
	});
}
//#endregion
//#region src/features/damorex/po/components/PoLinesTable.tsx
var import_jsx_runtime = require_jsx_runtime();
function UomSelect({ itemId, value, onChange }) {
	const { data: uoms = [], isLoading } = useItemUoms(itemId || null);
	const opts = (Array.isArray(uoms) ? uoms : []).map((u) => ({
		value: u.id,
		label: `${u.code || u.name || u.id}`
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
		size: "xs",
		placeholder: isLoading ? "Loading..." : "UOM",
		data: opts,
		value: value || null,
		onChange: (v) => onChange(v || ""),
		searchable: true,
		clearable: true,
		w: 100,
		disabled: !itemId
	});
}
function PoLinesTable({ lines, onUpdateLine, onRemoveLine, onAddLine, onPostLine, onUnpostLine }) {
	const { data: items = [] } = useItems("");
	const itemOpts = (Array.isArray(items) ? items : []).map((i) => ({
		value: i.id,
		label: `${i.code || ""} ${i.name || ""}`
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
		withTableBorder: true,
		withColumnBorders: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, {
			bg: "#a6d5e5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Item" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "UOM" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Ordered Qty" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Received Qty" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Purchase Cost" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Discount %" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Tax %" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Subtotal" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Total" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Actions" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: lines.map((line) => {
			const isExistingLine = !line.isDraft;
			const canPost = isExistingLine && !line.isPosted && line.receivedQty > 0;
			const canUnpost = isExistingLine && line.isPosted;
			const canDelete = line.isDraft && !line.isPosted;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					size: "xs",
					placeholder: "Select item",
					data: itemOpts,
					value: line.itemId || null,
					onChange: (v) => {
						onUpdateLine(line.id, { itemId: v || "" });
						const item = (Array.isArray(items) ? items : []).find((i) => i.id === v);
						if (item) onUpdateLine(line.id, {
							itemCode: item.code,
							itemName: item.name,
							uomId: item.saleUomId || ""
						});
					},
					searchable: true,
					clearable: true,
					w: 220
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UomSelect, {
					itemId: line.itemId,
					value: line.uomId,
					onChange: (v) => onUpdateLine(line.id, { uomId: v })
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					size: "xs",
					min: .001,
					value: line.orderedQty,
					onChange: (v) => onUpdateLine(line.id, { orderedQty: Number(v) || 0 }),
					w: 80,
					disabled: isExistingLine
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					size: "xs",
					min: 0,
					value: line.receivedQty,
					onChange: (v) => onUpdateLine(line.id, { receivedQty: Number(v) || 0 }),
					w: 80
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					size: "xs",
					min: 0,
					value: line.unitCost,
					onChange: (v) => onUpdateLine(line.id, { unitCost: Number(v) || 0 }),
					w: 90,
					decimalScale: 2
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					size: "xs",
					min: 0,
					max: 100,
					value: line.discountPercent,
					onChange: (v) => onUpdateLine(line.id, { discountPercent: Number(v) || 0 }),
					w: 70
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					size: "xs",
					min: 0,
					max: 100,
					value: line.taxPercent,
					onChange: (v) => onUpdateLine(line.id, { taxPercent: Number(v) || 0 }),
					w: 70
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					children: line.lineSubtotal.toFixed(2)
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					fw: 700,
					children: line.lineTotal.toFixed(2)
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Td, { children: [
					canPost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						label: "Post",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
							size: "sm",
							color: "green",
							variant: "light",
							onClick: () => onPostLine(line),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 })
						})
					}),
					canUnpost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						label: "Unpost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
							size: "sm",
							color: "orange",
							variant: "light",
							onClick: () => onUnpostLine(line),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
						})
					}),
					canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						label: "Delete",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
							size: "sm",
							color: "red",
							variant: "light",
							onClick: () => onRemoveLine(line.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
						})
					})
				] })
			] }, line.id);
		}) })]
	});
}
//#endregion
//#region src/features/damorex/po/store/usePoStore.ts
var emptyLine = () => ({
	id: crypto.randomUUID(),
	itemId: "",
	orderedQty: 1,
	receivedQty: 0,
	uomId: "",
	unitCost: 0,
	discountPercent: 0,
	taxPercent: 0,
	lineSubtotal: 0,
	lineTotal: 0,
	isDraft: true,
	isPosted: false
});
var defaultTabState = () => ({
	id: crypto.randomUUID(),
	label: `PO ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
	supplierId: "",
	supplierName: "",
	warehouseId: "",
	warehouseName: "",
	expectedDate: "",
	note: "",
	receiptNumber: "",
	receivedDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
	lines: [emptyLine()],
	pendingPoId: null,
	pendingPoLabel: ""
});
var usePoStore = create((set, get) => ({
	tabs: [defaultTabState()],
	activeTabId: "",
	defaultWarehouseId: "",
	defaultWarehouseName: "",
	autoPrint: false,
	autoReceiptNumber: true,
	settingsOpened: false,
	addTab: () => {
		const tab = defaultTabState();
		set((s) => ({
			tabs: [...s.tabs, tab],
			activeTabId: tab.id
		}));
	},
	closeTab: (id) => set((s) => {
		const filtered = s.tabs.filter((t) => t.id !== id);
		if (filtered.length === 0) {
			const tab = defaultTabState();
			return {
				tabs: [tab],
				activeTabId: tab.id
			};
		}
		return {
			tabs: filtered,
			activeTabId: s.activeTabId === id ? filtered[filtered.length - 1].id : s.activeTabId
		};
	}),
	setActiveTab: (id) => set({ activeTabId: id }),
	updateTab: (id, updates) => set((s) => ({ tabs: s.tabs.map((t) => t.id === id ? {
		...t,
		...updates
	} : t) })),
	setSupplier: (id, name) => {
		const active = get().activeTabId;
		get().updateTab(active, {
			supplierId: id,
			supplierName: name
		});
	},
	setWarehouse: (id, name) => {
		const active = get().activeTabId;
		get().updateTab(active, {
			warehouseId: id,
			warehouseName: name
		});
	},
	setExpectedDate: (date) => {
		const active = get().activeTabId;
		get().updateTab(active, { expectedDate: date });
	},
	setNote: (note) => {
		const active = get().activeTabId;
		get().updateTab(active, { note });
	},
	setReceiptNumber: (num) => {
		const active = get().activeTabId;
		get().updateTab(active, { receiptNumber: num });
	},
	setReceivedDate: (date) => {
		const active = get().activeTabId;
		get().updateTab(active, { receivedDate: date });
	},
	setPendingPo: (id, label) => {
		const active = get().activeTabId;
		get().updateTab(active, {
			pendingPoId: id,
			pendingPoLabel: label ?? ""
		});
	},
	addLine: (line) => {
		const active = get().activeTabId;
		const tab = get().tabs.find((t) => t.id === active);
		if (!tab) return;
		get().updateTab(active, { lines: [...tab.lines, {
			...emptyLine(),
			...line
		}] });
	},
	updateLine: (lineId, updates) => {
		const active = get().activeTabId;
		const tab = get().tabs.find((t) => t.id === active);
		if (!tab) return;
		get().updateTab(active, { lines: tab.lines.map((line) => {
			if (line.id !== lineId) return line;
			const updated = {
				...line,
				...updates
			};
			const raw = updated.orderedQty * updated.unitCost;
			updated.lineSubtotal = +(raw - raw * (updated.discountPercent / 100)).toFixed(2);
			const tax = updated.lineSubtotal * (updated.taxPercent / 100);
			updated.lineTotal = +(updated.lineSubtotal + tax).toFixed(2);
			return updated;
		}) });
	},
	removeLine: (lineId) => {
		const active = get().activeTabId;
		const tab = get().tabs.find((t) => t.id === active);
		if (!tab) return;
		get().updateTab(active, { lines: tab.lines.filter((l) => l.id !== lineId) });
	},
	resetActiveTab: () => {
		const active = get().activeTabId;
		get().updateTab(active, {
			...defaultTabState(),
			id: active
		});
	},
	resetAll: () => {
		const tab = defaultTabState();
		set({
			tabs: [tab],
			activeTabId: tab.id
		});
	},
	setDefaultWarehouse: (id, name) => set({
		defaultWarehouseId: id,
		defaultWarehouseName: name
	}),
	setAutoPrint: (v) => set({ autoPrint: v }),
	setAutoReceiptNumber: (v) => set({ autoReceiptNumber: v }),
	setSettingsOpened: (v) => set({ settingsOpened: v })
}));
//#endregion
//#region src/features/damorex/po/components/PoSettingsDrawer.tsx
function PoSettingsDrawer() {
	const { settingsOpened, setSettingsOpened, defaultWarehouseId, defaultWarehouseName, autoPrint, autoReceiptNumber, setDefaultWarehouse, setAutoPrint, setAutoReceiptNumber } = usePoStore();
	const { data: warehouses = [] } = useWarehouses();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		opened: settingsOpened,
		onClose: () => setSettingsOpened(false),
		title: "Purchase Order Settings",
		position: "right",
		size: "sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				label: "Default Warehouse",
				placeholder: "Select default warehouse",
				data: (Array.isArray(warehouses) ? warehouses : []).map((w) => ({
					value: w.id,
					label: w.name
				})),
				value: defaultWarehouseId || null,
				onChange: (v, opt) => {
					if (v) setDefaultWarehouse(v, opt.label);
				},
				searchable: true,
				clearable: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Auto Print on Post",
				checked: autoPrint,
				onChange: (e) => setAutoPrint(e.currentTarget.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Auto Generate Receipt #",
				checked: autoReceiptNumber,
				onChange: (e) => setAutoReceiptNumber(e.currentTarget.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setSettingsOpened(false),
				children: "Save"
			})
		] })
	});
}
//#endregion
//#region src/features/damorex/po/components/PoSummary.tsx
function PoSummary({ lines, receivedDate, onReceivedDateChange, onPostAll, onSaveDraft, onSubmitApprove, saving, submitting }) {
	const totalAmount = lines.reduce((sum, l) => sum + l.lineTotal, 0);
	const postedLines = lines.filter((l) => l.isPosted).length;
	const pendingPostLines = lines.filter((l) => !l.isDraft && !l.isPosted && l.receivedQty > 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		p: "md",
		withBorder: true,
		bg: "#c7e6f1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			justify: "space-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Received Date",
						type: "date",
						size: "xs",
						value: receivedDate,
						onChange: (e) => onReceivedDateChange(e.currentTarget.value),
						w: 160
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "xs",
						children: ["Lines: ", lines.length]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "xs",
						children: ["Posted: ", postedLines]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "xs",
						children: ["Pending Post: ", pendingPostLines]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Title, {
						order: 3,
						children: ["Total: ₦", totalAmount.toFixed(2)]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [
				pendingPostLines > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "xs",
					color: "green",
					onClick: onPostAll,
					children: [
						"Post All (",
						pendingPostLines,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "xs",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 14 }),
					onClick: onSaveDraft,
					loading: saving,
					children: "Save as Draft"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "xs",
					color: "green",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 14 }),
					onClick: onSubmitApprove,
					loading: submitting,
					children: "Submit & Approve"
				})
			] })]
		})
	});
}
//#endregion
//#region src/features/damorex/po/components/QuickAddSupplierModal.tsx
function QuickAddSupplierModal({ opened, onClose, onSupplierCreated }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const mutation = useCreateSupplier();
	async function handleSubmit() {
		if (!name.trim()) return;
		const result = await mutation.mutateAsync({
			name: name.trim(),
			phone: phone.trim() || void 0,
			email: email.trim() || void 0,
			address: address.trim() || void 0
		});
		onSupplierCreated({
			id: result.id,
			name: result.name
		});
		setName("");
		setPhone("");
		setEmail("");
		setAddress("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		opened,
		onClose,
		title: "Quick Add Supplier",
		centered: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				label: "Name",
				value: name,
				onChange: (e) => setName(e.currentTarget.value),
				placeholder: "Supplier name",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				label: "Phone",
				value: phone,
				onChange: (e) => setPhone(e.currentTarget.value),
				placeholder: "Phone number"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				label: "Email",
				value: email,
				onChange: (e) => setEmail(e.currentTarget.value),
				placeholder: "Email address",
				type: "email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				label: "Address",
				value: address,
				onChange: (e) => setAddress(e.currentTarget.value),
				placeholder: "Address"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				grow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: mutation.isPending,
					onClick: handleSubmit,
					children: "Create Supplier"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "light",
					onClick: onClose,
					children: "Cancel"
				})]
			})
		] })
	});
}
//#endregion
//#region src/features/damorex/po/components/PoToolbar.tsx
function PoToolbar({ onNew, onReset, onPrint, onSettings }) {
	const { tabs, activeTabId, setSupplier, setWarehouse, setReceiptNumber, setPendingPo } = usePoStore();
	const activeTab = tabs.find((t) => t.id === activeTabId);
	const supplierId = activeTab?.supplierId ?? "";
	const warehouseId = activeTab?.warehouseId ?? "";
	const receiptNumber = activeTab?.receiptNumber ?? "";
	const pendingPoId = activeTab?.pendingPoId ?? null;
	const [supplierSearch, setSupplierSearch] = (0, import_react.useState)("");
	const [warehouseSearch, setWarehouseSearch] = (0, import_react.useState)("");
	const [poSearch, setPoSearch] = (0, import_react.useState)("");
	const [supplierModal, setSupplierModal] = (0, import_react.useState)(false);
	const { data: suppliers = [] } = useSuppliers(supplierSearch);
	const { data: warehouses = [] } = useWarehouses(warehouseSearch);
	const { data: orders = [] } = usePurchaseOrders(poSearch);
	const supplierOpts = (Array.isArray(suppliers) ? suppliers : []).map((s) => ({
		value: s.id,
		label: s.name
	}));
	const warehouseOpts = (Array.isArray(warehouses) ? warehouses : []).map((w) => ({
		value: w.id,
		label: w.name
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
		px: "md",
		py: "xs",
		bg: "#bfe0ea",
		gap: "sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				size: "xs",
				placeholder: "Pending PO",
				data: (Array.isArray(orders) ? orders : []).filter((o) => o.status === "approved" || o.status === "partially_received").map((o) => ({
					value: o.id,
					label: `${o.invoiceNumber || o.purchaseOrderNumber}:${o.supplier?.name || ""}:${o.receiptNumber || ""}`
				})),
				value: pendingPoId || null,
				onChange: (v) => {
					if (!v) {
						setPendingPo(null);
						return;
					}
					const po = (Array.isArray(orders) ? orders : []).find((o) => o.id === v);
					if (po) {
						setPendingPo(po.id, po.invoiceNumber || po.purchaseOrderNumber);
						setSupplier(po.supplier?.id || "", po.supplier?.name || "");
						setWarehouse(po.warehouse?.id || "", po.warehouse?.name || "");
						usePoStore.getState().setExpectedDate(po.expectedDate || "");
						usePoStore.getState().setNote(po.note || "");
						usePoStore.getState().updateTab(activeTabId, { lines: (po.lines || []).map((l) => ({
							id: crypto.randomUUID(),
							itemId: l.itemId,
							orderedQty: l.orderedQty,
							receivedQty: l.receivedQty || 0,
							uomId: l.uomId,
							unitCost: l.unitCost,
							discountPercent: l.discountPercent || 0,
							taxPercent: l.taxPercent || 0,
							lineSubtotal: l.lineSubtotal || 0,
							lineTotal: l.lineTotal || 0,
							isDraft: false,
							isPosted: Number(l.receivedQty || 0) > 0
						})) });
					}
				},
				onSearchChange: setPoSearch,
				searchable: true,
				clearable: true,
				w: 320
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				size: "xs",
				placeholder: "Supplier",
				data: supplierOpts,
				value: supplierId || null,
				onChange: (v, opt) => {
					if (v) setSupplier(v, opt.label);
				},
				onSearchChange: setSupplierSearch,
				searchable: true,
				clearable: true,
				w: 200
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "xs",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }),
				onClick: () => setSupplierModal(true),
				children: "+ Supplier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				size: "xs",
				placeholder: "Warehouse",
				data: warehouseOpts,
				value: warehouseId || null,
				onChange: (v, opt) => {
					if (v) setWarehouse(v, opt.label);
				},
				onSearchChange: setWarehouseSearch,
				searchable: true,
				clearable: true,
				w: 200
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				size: "xs",
				placeholder: "Receipt #",
				value: receiptNumber,
				onChange: (e) => setReceiptNumber(e.currentTarget.value),
				w: 140
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "xs",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }),
				onClick: onNew,
				children: "New"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "xs",
				color: "red",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { size: 14 }),
				onClick: onReset,
				children: "Reset"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
				size: "lg",
				variant: "light",
				onClick: onPrint,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
				size: "lg",
				variant: "light",
				onClick: onSettings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
				size: "xs",
				c: "dimmed",
				ml: "auto",
				children: ["User: ", activeTab?.supplierName || "N/A"]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAddSupplierModal, {
		opened: supplierModal,
		onClose: () => setSupplierModal(false),
		onSupplierCreated: (s) => {
			setSupplier(s.id, s.name);
			setSupplierModal(false);
		}
	})] });
}
//#endregion
//#region src/features/damorex/po/utils/print.ts
function printPo(po) {
	const linesHtml = po.lines.map((l) => `
    <tr>
      <td>${l.itemCode || ""} ${l.itemName || ""}</td>
      <td style="text-align:right">${l.orderedQty}</td>
      <td style="text-align:right">${l.unitCost.toFixed(2)}</td>
      <td style="text-align:right">${l.lineTotal.toFixed(2)}</td>
    </tr>`).join("");
	const win = window.open("", "_blank");
	if (!win) return;
	win.document.write(`
    <html>
    <head>
      <title>Purchase Order - ${po.purchaseOrderNumber || "N/A"}</title>
      <style>
        body { font-family: 'Courier New', monospace; font-size: 12px; padding: 20px; }
        h1 { font-size: 18px; margin-bottom: 4px; }
        .info { margin-bottom: 12px; }
        .info div { margin-bottom: 2px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th, td { border: 1px solid #000; padding: 4px 8px; text-align: left; }
        th { background: #eee; }
        .total { font-weight: bold; margin-top: 8px; text-align: right; }
        @media print { body { margin: 0; padding: 12px; } }
      </style>
    </head>
    <body>
      <h1>PURCHASE ORDER</h1>
      <div class="info">
        <div><strong>PO#:</strong> ${po.purchaseOrderNumber || "N/A"}</div>
        <div><strong>Supplier:</strong> ${po.supplierName || "N/A"}</div>
        <div><strong>Warehouse:</strong> ${po.warehouseName || "N/A"}</div>
        <div><strong>Order Date:</strong> ${po.orderDate || "N/A"}</div>
        <div><strong>Expected:</strong> ${po.expectedDate || "N/A"}</div>
      </div>
      <table>
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Unit Cost</th><th>Total</th></tr>
        </thead>
        <tbody>${linesHtml}</tbody>
      </table>
      <div class="total">Total: ₦${po.totalCost.toFixed(2)}</div>
      <script>window.print();window.close();<\/script>
    </body>
    </html>
  `);
	win.document.close();
}
//#endregion
//#region src/features/damorex/po/components/UnpostPasswordModal.tsx
function UnpostPasswordModal({ opened, onClose, onConfirm, loading }) {
	const [password, setPassword] = (0, import_react.useState)("");
	function handleSubmit() {
		onConfirm(password);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		opened,
		onClose,
		title: "Unpost Goods Receipt",
		centered: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "sm",
				children: "Enter password to unpost this receipt line:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
				label: "Password",
				value: password,
				onChange: (e) => setPassword(e.currentTarget.value),
				placeholder: "password12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				grow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading,
					onClick: handleSubmit,
					children: "Confirm Unpost"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "light",
					onClick: onClose,
					children: "Cancel"
				})]
			})
		] })
	});
}
//#endregion
//#region src/features/damorex/po/purchases.tsx
function PurchasesPage() {
	const { tabs, activeTabId, setActiveTab, addTab, closeTab, resetActiveTab, resetAll, autoPrint, defaultWarehouseId, settingsOpened, setSettingsOpened } = usePoStore();
	const activeTab = tabs.find((t) => t.id === activeTabId);
	const supplierId = activeTab?.supplierId ?? "";
	const warehouseId = activeTab?.warehouseId ?? "";
	const expectedDate = activeTab?.expectedDate ?? "";
	const note = activeTab?.note ?? "";
	const receiptNumber = activeTab?.receiptNumber ?? "";
	const receivedDate = activeTab?.receivedDate ?? "";
	const lines = activeTab?.lines ?? [];
	const pendingPoId = activeTab?.pendingPoId ?? null;
	const [unpostModal, setUnpostModal] = (0, import_react.useState)(false);
	const [unpostTargetLine, setUnpostTargetLine] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!usePoStore.getState().activeTabId && tabs.length > 0) setActiveTab(tabs[0].id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (defaultWarehouseId && warehouseId !== defaultWarehouseId && !warehouseId) usePoStore.getState().setWarehouse(defaultWarehouseId, "");
	}, [defaultWarehouseId]);
	const createMutation = useCreatePurchaseOrder();
	const receiveMutation = useReceiveGoods();
	const unpostMutation = useUnpostGoods();
	async function handleSaveDraft() {
		await createMutation.mutateAsync({
			supplierId,
			warehouseId,
			expectedDate: expectedDate || void 0,
			note: note || void 0,
			status: "draft",
			lines: lines.map((l) => ({
				itemId: l.itemId,
				orderedQty: l.orderedQty,
				uomId: l.uomId || void 0,
				unitCost: l.unitCost,
				discountPercent: l.discountPercent,
				taxPercent: l.taxPercent
			}))
		});
		resetActiveTab();
	}
	async function handleSubmitApprove() {
		await createMutation.mutateAsync({
			supplierId,
			warehouseId,
			expectedDate: expectedDate || void 0,
			note: note || void 0,
			status: "approved",
			lines: lines.map((l) => ({
				itemId: l.itemId,
				orderedQty: l.orderedQty,
				uomId: l.uomId || void 0,
				unitCost: l.unitCost,
				discountPercent: l.discountPercent,
				taxPercent: l.taxPercent
			}))
		});
		resetActiveTab();
	}
	async function handlePostLine(line) {
		if (!pendingPoId) return;
		const payload = {
			purchaseOrderId: pendingPoId,
			receivedDate: new Date(receivedDate || /* @__PURE__ */ new Date()).toISOString(),
			receiptNumber: receiptNumber || void 0,
			lines: [{
				itemId: line.itemId,
				orderedQty: line.orderedQty,
				receivedQty: line.receivedQty,
				uomId: line.uomId,
				unitCost: line.unitCost
			}]
		};
		await receiveMutation.mutateAsync({
			poId: pendingPoId,
			payload
		});
		usePoStore.getState().updateLine(line.id, { isPosted: true });
		if (autoPrint) printPo({
			purchaseOrderNumber: receiptNumber,
			supplierName: usePoStore.getState().tabs.find((t) => t.id === activeTabId)?.supplierName,
			warehouseName: usePoStore.getState().tabs.find((t) => t.id === activeTabId)?.warehouseName,
			orderDate: (/* @__PURE__ */ new Date()).toISOString(),
			lines: [line],
			totalCost: line.lineTotal
		});
	}
	function handleUnpostLine(line) {
		setUnpostTargetLine(line.id);
		setUnpostModal(true);
	}
	async function handleConfirmUnpost(password) {
		if (!pendingPoId || !unpostTargetLine) return;
		const receiptLineId = unpostTargetLine;
		await unpostMutation.mutateAsync({
			poId: pendingPoId,
			payload: {
				receiptLineId,
				password
			}
		});
		usePoStore.getState().updateLine(unpostTargetLine, { isPosted: false });
		setUnpostModal(false);
		setUnpostTargetLine(null);
	}
	function handlePostAll() {
		const unposted = lines.filter((l) => !l.isDraft && !l.isPosted && l.receivedQty > 0);
		for (const line of unposted) handlePostLine(line);
	}
	function handlePrint() {
		printPo({
			purchaseOrderNumber: receiptNumber,
			supplierName: usePoStore.getState().tabs.find((t) => t.id === activeTabId)?.supplierName || "",
			warehouseName: usePoStore.getState().tabs.find((t) => t.id === activeTabId)?.warehouseName || "",
			orderDate: (/* @__PURE__ */ new Date()).toISOString(),
			lines: lines.map((l) => ({
				itemCode: l.itemCode,
				itemName: l.itemName,
				orderedQty: l.orderedQty,
				unitCost: l.unitCost,
				lineTotal: l.lineTotal
			})),
			totalCost: lines.reduce((s, l) => s + l.lineTotal, 0)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		bg: "#b7dce9",
		h: "100vh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: 0,
				h: "100%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						px: "md",
						py: 4,
						bg: "#d9edf5",
						gap: 4,
						children: [tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 4,
							p: "xs",
							style: {
								cursor: "pointer",
								borderRadius: 4,
								background: tab.id === activeTabId ? "#a6d5e5" : "transparent"
							},
							onClick: () => setActiveTab(tab.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								fw: 600,
								children: tab.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
								size: "xs",
								variant: "subtle",
								onClick: (e) => {
									e.stopPropagation();
									closeTab(tab.id);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
							})]
						}, tab.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
							size: "sm",
							ml: 4,
							onClick: addTab,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoToolbar, {
						onNew: addTab,
						onReset: resetActiveTab,
						onPrint: handlePrint,
						onSettings: () => setSettingsOpened(true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						flex: 1,
						style: { overflow: "auto" },
						p: "md",
						children: activeTab && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							withBorder: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoLinesTable, {
								lines: activeTab.lines,
								onUpdateLine: (id, updates) => usePoStore.getState().updateLine(id, updates),
								onRemoveLine: (id) => usePoStore.getState().removeLine(id),
								onAddLine: () => usePoStore.getState().addLine(),
								onPostLine: handlePostLine,
								onUnpostLine: handleUnpostLine
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
								p: "xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xs",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }),
									onClick: () => usePoStore.getState().addLine(),
									children: "Add Line"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoSummary, {
							lines: activeTab.lines,
							receivedDate: activeTab.receivedDate,
							onReceivedDateChange: (d) => usePoStore.getState().setReceivedDate(d),
							onPostAll: handlePostAll,
							onSaveDraft: handleSaveDraft,
							onSubmitApprove: handleSubmitApprove,
							saving: createMutation.isPending,
							submitting: createMutation.isPending
						})] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoSettingsDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnpostPasswordModal, {
				opened: unpostModal,
				onClose: () => {
					setUnpostModal(false);
					setUnpostTargetLine(null);
				},
				onConfirm: handleConfirmUnpost,
				loading: unpostMutation.isPending
			})
		]
	});
}
//#endregion
//#region src/routes/damorex/purchases/index.tsx?tsr-split=component
var SplitComponent = PurchasesPage;
//#endregion
export { SplitComponent as component };
