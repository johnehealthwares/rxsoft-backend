import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useMantineColorScheme } from "./use-mantine-color-scheme-C21-elMS.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Flex } from "./Flex-DsiVxXRs.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Drawer } from "./Drawer-rwUhgHFQ.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as NumberInput } from "./NumberInput-Dzj2A-5Q.js";
import { t as Radio } from "./Radio-DHNE50PM.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Switch } from "./Switch-BPgr54EU.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { n as useQueryClient } from "./QueryClientProvider-DlcixLz9.js";
import { t as useMutation } from "./useMutation-CaMFWIEn.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { t as Calculator } from "./calculator-B6foghpo.js";
import { Cn as Trash2, Fn as Plus, Lr as Title, Mr as create, Nn as RefreshCcw, Ot as persist, Wr as Grid, _n as X, jn as Search, jr as rxsoftApi, kn as Settings } from "./index-DuM1cidb.js";
//#region node_modules/@mantine/hooks/esm/use-hotkeys/parse-hotkey.mjs
var keyNameMap = {
	" ": "space",
	ArrowLeft: "arrowleft",
	ArrowRight: "arrowright",
	ArrowUp: "arrowup",
	ArrowDown: "arrowdown",
	Escape: "escape",
	Esc: "escape",
	esc: "escape",
	Enter: "enter",
	Tab: "tab",
	Backspace: "backspace",
	Delete: "delete",
	Insert: "insert",
	Home: "home",
	End: "end",
	PageUp: "pageup",
	PageDown: "pagedown",
	"+": "plus",
	"-": "minus",
	"*": "asterisk",
	"/": "slash"
};
function normalizeKey(key) {
	const lowerKey = key.replace("Key", "").toLowerCase();
	return keyNameMap[key] || lowerKey;
}
function parseHotkey(hotkey) {
	const keys = hotkey.toLowerCase().split("+").map((part) => part.trim());
	const modifiers = {
		alt: keys.includes("alt"),
		ctrl: keys.includes("ctrl"),
		meta: keys.includes("meta"),
		mod: keys.includes("mod"),
		shift: keys.includes("shift")
	};
	const reservedKeys = [
		"alt",
		"ctrl",
		"meta",
		"shift",
		"mod"
	];
	const freeKey = keys.find((key) => !reservedKeys.includes(key));
	return {
		...modifiers,
		key: freeKey === "[plus]" ? "+" : freeKey
	};
}
function isExactHotkey(hotkey, event, usePhysicalKeys) {
	const { alt, ctrl, meta, mod, shift, key } = hotkey;
	const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey, code: pressedCode } = event;
	if (alt !== altKey) return false;
	if (mod) {
		if (!ctrlKey && !metaKey) return false;
	} else {
		if (ctrl !== ctrlKey) return false;
		if (meta !== metaKey) return false;
	}
	if (shift !== shiftKey) return false;
	if (key && (usePhysicalKeys ? normalizeKey(pressedCode) === normalizeKey(key) : normalizeKey(pressedKey ?? pressedCode) === normalizeKey(key))) return true;
	return false;
}
function getHotkeyMatcher(hotkey, usePhysicalKeys) {
	return (event) => isExactHotkey(parseHotkey(hotkey), event, usePhysicalKeys);
}
//#endregion
//#region node_modules/@mantine/hooks/esm/use-hotkeys/use-hotkeys.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable = false) {
	if (event.target instanceof HTMLElement) {
		if (triggerOnContentEditable) return !tagsToIgnore.includes(event.target.tagName);
		return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
	}
	return true;
}
function useHotkeys(hotkeys, tagsToIgnore = [
	"INPUT",
	"TEXTAREA",
	"SELECT"
], triggerOnContentEditable = false) {
	const handleKeydown = (0, import_react.useEffectEvent)((event) => {
		hotkeys.forEach(([hotkey, handler, options = {
			preventDefault: true,
			usePhysicalKeys: false
		}]) => {
			if (getHotkeyMatcher(hotkey, options.usePhysicalKeys)(event) && shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)) {
				if (options.preventDefault) event.preventDefault();
				handler(event);
			}
		});
	});
	(0, import_react.useEffect)(() => {
		document.documentElement.addEventListener("keydown", handleKeydown);
		return () => document.documentElement.removeEventListener("keydown", handleKeydown);
	}, []);
}
//#endregion
//#region src/features/damorex/pos/components/CartTable.tsx
var import_jsx_runtime = require_jsx_runtime();
function CartTable({ session, onUpdateQty, onRemoveItem }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		radius: 0,
		bg: "#2f8a53",
		h: "100%",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			h: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				withTableBorder: true,
				withColumnBorders: true,
				stickyHeader: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, {
					bg: "#f0d56a",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "S/N" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "CODE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "ITEM NAME" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "PRICE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "UOM" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "QTY" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "TotalCost" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, {})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tbody, { children: [session.cart.map((item, index) => {
					const price = session.pricingMode === "wholesale" ? item.wholesalePrice : item.retailPrice;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, {
						bg: "#00185f",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								c: "lime",
								children: index + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								c: "lime",
								children: item.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								c: "lime",
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								c: "lime",
								children: price.toFixed(2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								c: "lime",
								children: item.uomName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								c: "lime",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
									size: "xs",
									min: 1,
									value: item.quantity,
									onChange: (v) => onUpdateQty(item.id, Number(v) || 1),
									w: 70,
									styles: { input: {
										color: "lime",
										background: "#00185f",
										borderColor: "#2f8a53"
									} }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
								c: "lime",
								children: (price * item.quantity * item.uomFactor).toFixed(2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
								color: "red",
								size: "sm",
								onClick: () => onRemoveItem(item.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							}) })
						]
					}, item.id);
				}), session.cart.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
					colSpan: 8,
					ta: "center",
					c: "lime",
					children: "Cart is empty"
				}) })] })]
			})
		})
	});
}
//#endregion
//#region src/features/damorex/pos/store/usePosStore.ts
function generateSaleCode() {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let code = "";
	for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * 36));
	return code;
}
var createEmptySession = () => ({
	id: crypto.randomUUID(),
	saleCode: generateSaleCode(),
	createdAt: (/* @__PURE__ */ new Date()).toISOString(),
	discount: 0,
	vatPercent: 0,
	pricingMode: "retail",
	held: false,
	status: "active",
	paidAmount: 0,
	changeAmount: 0,
	cart: []
});
var usePosStore = create()(persist((set) => ({
	sessions: [createEmptySession()],
	activeSessionId: null,
	createSession: (oldSessionId) => set((state) => {
		const session = createEmptySession();
		return {
			sessions: [...oldSessionId ? state.sessions.filter((s) => s.id !== oldSessionId) : state.sessions, session],
			activeSessionId: session.id
		};
	}),
	setActiveSession: (id) => set({ activeSessionId: id }),
	closeSession: (id) => set((state) => {
		const filtered = state.sessions.filter((s) => s.id !== id);
		return {
			sessions: filtered,
			activeSessionId: state.activeSessionId === id ? filtered[0]?.id ?? null : state.activeSessionId
		};
	}),
	addItem: (sessionId, item) => set((state) => ({ sessions: state.sessions.map((session) => {
		if (session.id !== sessionId) return session;
		const existing = session.cart.find((i) => i.code === item.code);
		if (existing) {
			existing.quantity += item.quantity;
			existing.lineTotal = getLineTotal(existing);
			return { ...session };
		}
		return {
			...session,
			cart: [...session.cart, item]
		};
	}) })),
	updateItem: (sessionId, itemId, updates) => set((state) => ({ sessions: state.sessions.map((session) => session.id === sessionId ? {
		...session,
		cart: session.cart.map((item) => item.id === itemId ? {
			...item,
			...updates,
			lineTotal: getLineTotal({
				...item,
				...updates
			})
		} : item)
	} : session) })),
	removeItem: (sessionId, itemId) => set((state) => ({ sessions: state.sessions.map((session) => session.id === sessionId ? {
		...session,
		cart: session.cart.filter((item) => item.id !== itemId)
	} : session) })),
	clearCart: (sessionId) => set((state) => ({ sessions: state.sessions.map((session) => session.id === sessionId ? {
		...session,
		cart: []
	} : session) })),
	setCustomer: (sessionId, customer) => set((state) => ({ sessions: state.sessions.map((session) => session.id === sessionId ? {
		...session,
		customer,
		customerId: customer.id,
		customerName: customer.name
	} : session) })),
	clearCustomer: (sessionId) => set((state) => ({ sessions: state.sessions.map((session) => session.id === sessionId ? {
		...session,
		customer: void 0,
		customerId: void 0,
		customerName: void 0
	} : session) })),
	setPriceList: (sessionId, priceListId, priceListName) => set((state) => ({ sessions: state.sessions.map((session) => session.id === sessionId ? {
		...session,
		priceListId,
		priceListName
	} : session) })),
	setPricingMode: (sessionId, mode) => set((state) => ({ sessions: state.sessions.map((session) => session.id === sessionId ? {
		...session,
		pricingMode: mode
	} : session) })),
	holdSale: (id) => set((state) => ({ sessions: state.sessions.map((session) => session.id === id ? {
		...session,
		held: true,
		status: "held"
	} : session) })),
	completeSale: (id, paidAmount, changeAmount) => set((state) => ({ sessions: state.sessions.map((session) => session.id === id ? {
		...session,
		status: "completed",
		paidAmount,
		changeAmount
	} : session) }))
}), { name: "pos-store" }));
function getLineTotal(item) {
	const price = item.pricingMode === "wholesale" ? item.wholesalePrice : item.retailPrice;
	return item.quantity * price * item.uomFactor;
}
//#endregion
//#region src/features/damorex/pos/components/HeldSalesDrawer.tsx
function HeldSalesDrawer({ opened, onClose, onResume }) {
	const sessions = usePosStore((state) => state.sessions);
	const heldSales = (0, import_react.useMemo)(() => sessions.filter((s) => s.held), [sessions]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		opened,
		onClose,
		title: "Held Sales",
		position: "right",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [heldSales.map((sale) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "light",
			onClick: () => {
				onResume(sale.id);
				onClose();
			},
			children: [
				sale.saleCode,
				" - ",
				sale.customerName || "Walk-in",
				" (₦",
				sale.cart.reduce((s, i) => s + i.lineTotal, 0).toFixed(2),
				")"
			]
		}, sale.id)), !heldSales.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "No held sales" })] })
	});
}
//#endregion
//#region src/features/damorex/api/posApi.ts
var salesKeys = {
	list: ["sales"],
	detail: (id) => ["sales", id]
};
var customerKeys = { list: (search) => ["customers", search] };
var priceListKeys = {
	list: (search) => ["price-lists", search],
	items: (id) => ["price-list-items", id]
};
var paymentMethodKeys = { list: ["payment-methods"] };
var userPosConfigKeys = { me: ["user-pos-config", "me"] };
async function createSale(payload) {
	const { data } = await rxsoftApi.post("/sales", payload);
	return data;
}
function useCreateSale(options) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload) => createSale(payload),
		onSuccess: (data) => {
			qc.invalidateQueries(salesKeys.list);
			options?.onSuccess?.(data);
		}
	});
}
function useSearchSales(search) {
	return useQuery({
		queryKey: [
			"sales",
			"search",
			search
		],
		queryFn: async () => {
			if (!search) return [];
			const { data } = await rxsoftApi.get("/sales", { params: {
				search,
				limit: 10
			} });
			return data?.data ?? data ?? [];
		},
		enabled: !!search && search.length >= 2,
		staleTime: 3e4
	});
}
function useCustomers(search) {
	return useQuery({
		queryKey: customerKeys.list(search),
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/customers", { params: {
				search,
				limit: 20
			} });
			return data?.data ?? data ?? [];
		},
		staleTime: 6e4
	});
}
function usePriceLists(search) {
	return useQuery({
		queryKey: priceListKeys.list(search),
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/price-lists/search", { params: {
				search,
				limit: 20
			} });
			return data?.data ?? data ?? [];
		},
		staleTime: 6e4
	});
}
function usePriceListItems(priceListId) {
	return useQuery({
		queryKey: priceListKeys.items(priceListId),
		queryFn: async () => {
			if (!priceListId) return [];
			const { data } = await rxsoftApi.get(`/price-lists/${priceListId}/items`, { params: { limit: 1e5 } });
			return data?.data ?? data ?? [];
		},
		enabled: !!priceListId,
		staleTime: 6e4
	});
}
function usePaymentMethods() {
	return useQuery({
		queryKey: paymentMethodKeys.list,
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/payment-methods", { params: { limit: 50 } });
			return data?.data ?? data ?? [];
		},
		staleTime: 6e4
	});
}
function useCreateCustomer() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload) => {
			const { data } = await rxsoftApi.post("/customers", payload);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries(customerKeys.list());
		}
	});
}
function useUserPosConfig() {
	return useQuery({
		queryKey: userPosConfigKeys.me,
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/user-pos-config/me");
			return data;
		},
		staleTime: 6e4
	});
}
function useUpdateUserPosConfig() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload) => {
			const { data } = await rxsoftApi.patch("/user-pos-config/me", payload);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries(userPosConfigKeys.me);
		}
	});
}
function useOrganisationConfig() {
	return useQuery({
		queryKey: ["organisation-config"],
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/organisation-config");
			return data;
		},
		staleTime: 6e4
	});
}
//#endregion
//#region src/features/damorex/pos/components/PaymentModal.tsx
function PaymentModal({ opened, onClose, totals, session, onComplete }) {
	const [paid, setPaid] = (0, import_react.useState)(totals.total);
	const [methodId, setMethodId] = (0, import_react.useState)(null);
	const { data: paymentMethods = [] } = usePaymentMethods();
	const { data: posConfig } = useQuery({
		queryKey: ["user-pos-config", "me"],
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/user-pos-config/me");
			return data;
		},
		staleTime: 6e4
	});
	const mutation = useCreateSale({ onSuccess: () => {
		onComplete();
		onClose();
	} });
	const methodOptions = (Array.isArray(paymentMethods) ? paymentMethods : []).map((pm) => ({
		value: pm.id,
		label: pm.name
	}));
	const balance = totals.total - paid;
	const change = paid > totals.total ? paid - totals.total : 0;
	function handleComplete() {
		const lines = (session.cart || []).map((item) => ({
			itemId: item.id,
			uomId: item.uomId || "",
			quantity: item.quantity,
			unitPrice: session.pricingMode === "wholesale" ? item.wholesalePrice : item.retailPrice
		}));
		const payload = {
			saleNumber: session.saleCode,
			saleChannel: "pos",
			storeId: posConfig?.storeId ?? "default",
			customerId: session.customerId || null,
			stockLocationId: posConfig?.stockLocationId ?? null,
			lines,
			payments: methodId ? [{
				paymentMethodId: methodId,
				amount: paid
			}] : []
		};
		mutation.mutate(payload);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		opened,
		onClose,
		title: "Payment",
		centered: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				label: "Payment Method",
				value: methodId,
				onChange: (v) => setMethodId(v || null),
				data: methodOptions,
				placeholder: "Select method",
				clearable: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
				label: "Amount Paid",
				value: paid,
				onChange: (v) => setPaid(Number(v) || 0),
				min: 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { children: ["Total: ₦", totals.total.toFixed(2)] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { children: ["Balance: ₦", Math.max(0, balance).toFixed(2)] }),
			change > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
				c: "green",
				children: ["Change: ₦", change.toFixed(2)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				grow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: mutation.isPending,
					onClick: handleComplete,
					disabled: !methodId,
					children: "Complete Sale"
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
//#region src/features/damorex/pos/components/PosSettingsDrawer.tsx
function PosSettingsDrawer({ opened, onClose }) {
	const { toggleColorScheme } = useMantineColorScheme();
	const { data: config, isLoading } = useUserPosConfig();
	const updateConfig = useUpdateUserPosConfig();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		opened,
		onClose,
		title: "POS Settings",
		position: "right",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		opened,
		onClose,
		title: "POS Settings",
		position: "right",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Auto Print",
				defaultChecked: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Show Stock",
				defaultChecked: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Expiry Warning",
				defaultChecked: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Toggle Theme",
				onClick: () => toggleColorScheme(),
				defaultChecked: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Allow POS",
				checked: config?.allowPos ?? true,
				onChange: (e) => updateConfig.mutate({ allowPos: e.currentTarget.checked })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				label: "Allow A4 Print (Wholesale)",
				checked: config?.allowA4Print ?? false,
				onChange: (e) => updateConfig.mutate({ allowA4Print: e.currentTarget.checked })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				label: "Store ID",
				placeholder: "default",
				value: config?.storeId ?? "",
				onChange: (e) => updateConfig.mutate({ storeId: e.currentTarget.value || null })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				label: "Stock Location",
				placeholder: "Select stock location",
				value: config?.stockLocationId,
				data: [],
				clearable: true,
				searchable: true,
				nothingFoundMessage: "No locations found",
				onChange: (value) => updateConfig.mutate({ stockLocationId: value })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
				label: "Login Timeout (minutes)",
				value: config?.loginTimeoutMinutes ?? 480,
				onChange: (v) => updateConfig.mutate({ loginTimeoutMinutes: v ? Number(v) : null }),
				min: 1,
				max: 1440
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Group, {
				label: "Tab Position",
				defaultValue: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
						value: "top",
						label: "Top"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
						value: "bottom",
						label: "Bottom"
					})]
				})
			})
		] })
	});
}
//#endregion
//#region src/features/damorex/pos/components/CustomerQuickAddModal.tsx
function CustomerQuickAddModal({ opened, onClose, onCustomerCreated }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const mutation = useCreateCustomer();
	async function handleSubmit() {
		if (!name.trim()) return;
		const result = await mutation.mutateAsync({
			name: name.trim(),
			phone: phone.trim() || void 0
		});
		onCustomerCreated({
			id: result.id,
			name: result.name
		});
		setName("");
		setPhone("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		opened,
		onClose,
		title: "Quick Add Customer",
		centered: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				label: "Name",
				value: name,
				onChange: (e) => setName(e.currentTarget.value),
				placeholder: "Customer name",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				label: "Phone",
				value: phone,
				onChange: (e) => setPhone(e.currentTarget.value),
				placeholder: "Phone number"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				grow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: mutation.isPending,
					onClick: handleSubmit,
					children: "Create Customer"
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
//#region src/features/damorex/pos/components/PosToolbar.tsx
function PosToolbar({ session, onCustomerChange, onPriceListChange, onPricingModeChange, onReset, onSettings, onLoadSale }) {
	const [customerModal, setCustomerModal] = (0, import_react.useState)(false);
	const [customerSearch, setCustomerSearch] = (0, import_react.useState)("");
	const [priceListSearch, setPriceListSearch] = (0, import_react.useState)("");
	const [saleSearch, setSaleSearch] = (0, import_react.useState)("");
	const { data: customers = [] } = useCustomers(customerSearch);
	const { data: priceLists = [] } = usePriceLists(priceListSearch);
	const { data: sales = [] } = useSearchSales(saleSearch);
	const customerData = (Array.isArray(customers) ? customers : []).map((c) => ({
		value: c.id,
		label: c.name
	}));
	const priceListData = (Array.isArray(priceLists) ? priceLists : []).map((p) => ({
		value: p.id,
		label: p.name
	}));
	const saleData = (Array.isArray(sales) ? sales : []).map((s) => ({
		value: s.id,
		label: `${s.saleNumber} - ₦${s.totalAmount?.toFixed(2) ?? "0.00"}`
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
		px: "md",
		py: "xs",
		bg: "#bfe0ea",
		gap: "sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "xs",
				color: session.pricingMode === "retail" ? "blue" : "gray",
				variant: session.pricingMode === "retail" ? "filled" : "outline",
				onClick: () => onPricingModeChange("retail"),
				children: "Single Item Selection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "xs",
				color: session.pricingMode === "wholesale" ? "blue" : "gray",
				variant: session.pricingMode === "wholesale" ? "filled" : "outline",
				onClick: () => onPricingModeChange("wholesale"),
				children: "Multiple Item Selection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				size: "xs",
				placeholder: "Choose Customer",
				data: customerData,
				value: session.customerId || null,
				onChange: (value, option) => {
					if (value) onCustomerChange(value, option.label);
				},
				onSearchChange: setCustomerSearch,
				searchable: true,
				clearable: true,
				w: 220
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "xs",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }),
				onClick: () => setCustomerModal(true),
				children: "+ Customer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
				fw: 700,
				size: "sm",
				children: ["Customer: ", session.customerName || "Walk-in"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				size: "xs",
				placeholder: "Price List",
				data: priceListData,
				value: session.priceListId || null,
				onChange: (value, option) => {
					if (value) onPriceListChange(value, option.label);
				},
				onSearchChange: setPriceListSearch,
				searchable: true,
				clearable: true,
				w: 200
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				size: "xs",
				placeholder: "Load Sale by #",
				data: saleData,
				onSearchChange: setSaleSearch,
				onChange: (value) => {
					if (value) onLoadSale(value);
				},
				searchable: true,
				clearable: true,
				w: 200,
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
				nothingFoundMessage: "No sales found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "xs",
				color: "red",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { size: 14 }),
				onClick: onReset,
				children: "Reset POS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
				size: "lg",
				variant: "light",
				onClick: onSettings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 18 })
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerQuickAddModal, {
		opened: customerModal,
		onClose: () => setCustomerModal(false),
		onCustomerCreated: (c) => {
			onCustomerChange(c.id, c.name);
			setCustomerModal(false);
		}
	})] });
}
//#endregion
//#region src/features/damorex/pos/components/StockAdjustModal.tsx
function StockAdjustModal({ opened, onClose, itemId, itemName, stockLocationId, currentQty, onAdjusted, uomName }) {
	const [newQty, setNewQty] = (0, import_react.useState)(currentQty);
	const adjustmentMutation = useMutation({
		mutationFn: async () => {
			const delta = newQty - currentQty;
			if (delta === 0) return;
			await rxsoftApi.post("/inventory/adjust-quantity", {
				itemId,
				locationId: stockLocationId,
				deltaQuantity: delta,
				reason: "POS stock adjustment"
			});
		},
		onSuccess: () => {
			notifications.show({
				message: `Stock updated to ${newQty} ${uomName ?? ""}`,
				color: "green"
			});
			onAdjusted();
			onClose();
		},
		onError: (err) => {
			notifications.show({
				color: "red",
				message: err?.response?.data?.message ?? err.message ?? "Failed to adjust stock"
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		opened,
		onClose,
		title: `Set Stock Qty - ${itemName}`,
		centered: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					c: "dimmed",
					children: [
						"Current stock: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							span: true,
							fw: 600,
							children: currentQty
						}),
						uomName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							span: true,
							children: [" ", uomName]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					label: `New Quantity (${uomName ?? "unit"})`,
					value: newQty,
					onChange: (v) => setNewQty(Number(v) || 0),
					min: 0,
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "flex-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => adjustmentMutation.mutate(),
						loading: adjustmentMutation.isPending,
						disabled: newQty === currentQty,
						children: "Update Stock"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/features/damorex/pos/components/ProductEntryTable.tsx
function ProductEntryTable({ session, onAddToCart, stockLocationId }) {
	const [selectedProductId, setSelectedProductId] = (0, import_react.useState)(null);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [uomId, setUomId] = (0, import_react.useState)(null);
	const [uomName, setUomName] = (0, import_react.useState)("");
	const [adjustModalOpen, setAdjustModalOpen] = (0, import_react.useState)(false);
	const [adjustItemId, setAdjustItemId] = (0, import_react.useState)("");
	const [adjustItemName, setAdjustItemName] = (0, import_react.useState)("");
	const [adjustUomName, setAdjustUomName] = (0, import_react.useState)("");
	const [adjustCurrentQty, setAdjustCurrentQty] = (0, import_react.useState)(0);
	const { data: priceListItems = [] } = usePriceListItems(session.priceListId);
	const { data: allUoms = [] } = useQuery({
		queryKey: ["uoms", "all"],
		queryFn: async () => {
			const { data } = await rxsoftApi.get("/uoms", { params: { limit: 100 } });
			return data?.data ?? data ?? [];
		},
		staleTime: 3e5
	});
	const uomMap = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const u of allUoms) map.set(u.id, u);
		return map;
	}, [allUoms]);
	const productOptions = (0, import_react.useMemo)(() => {
		return (Array.isArray(priceListItems) ? priceListItems : []).map((pli) => ({
			value: pli.item?.id || pli.id,
			label: `${pli.item?.code || ""} - ${pli.item?.name || ""}`,
			item: pli.item,
			retailPrice: pli.unitPrice,
			wholesalePrice: pli.unitPrice,
			uomId: pli.item?.saleUomId || pli.uomId || "",
			uomName: pli.item?.saleUomName || "Unit"
		}));
	}, [priceListItems]);
	const selectedProduct = productOptions.find((p) => p.value === selectedProductId);
	const itemCode = selectedProduct?.item?.code || selectedProductId?.slice(0, 8) || "";
	const retailPrice = selectedProduct?.retailPrice || 0;
	const wholesalePrice = selectedProduct?.wholesalePrice || 0;
	const effectivePrice = session.pricingMode === "wholesale" ? wholesalePrice : retailPrice;
	const uomFactor = (uomId ? uomMap.get(uomId) : null)?.factor ?? 1;
	const total = quantity * effectivePrice * uomFactor;
	const { data: stockQty = 0, refetch: refetchStock } = useQuery({
		queryKey: [
			"pos-stock-qty",
			selectedProductId,
			stockLocationId
		],
		queryFn: async () => {
			if (!selectedProductId || !stockLocationId) return 0;
			const { data: balances } = await rxsoftApi.get("/inventory/stock-balances", { params: {
				itemId: selectedProductId,
				locationId: stockLocationId,
				limit: 1
			} });
			const list = balances?.data ?? balances ?? [];
			return Number(list[0]?.quantityOnHand ?? 0);
		},
		enabled: !!selectedProductId && !!stockLocationId,
		staleTime: 3e4
	});
	(0, import_react.useEffect)(() => {
		if (selectedProduct) {
			setUomId(selectedProduct.uomId);
			setUomName(selectedProduct.uomName);
		}
	}, [selectedProduct]);
	function handleAdd() {
		if (!selectedProductId || !quantity) return;
		onAddToCart({
			id: selectedProductId,
			code: itemCode,
			name: selectedProduct?.label || "",
			retailPrice,
			wholesalePrice,
			quantity,
			uomId: uomId || selectedProduct?.uomId || "",
			uomName: uomName || selectedProduct?.uomName || "Unit",
			uomFactor,
			lineTotal: total
		});
		setSelectedProductId(null);
		setQuantity(1);
	}
	function openAdjustModal() {
		if (!selectedProductId || !stockLocationId) return;
		setAdjustItemId(selectedProductId);
		setAdjustItemName(selectedProduct?.label || itemCode);
		setAdjustUomName(uomName || selectedProduct?.uomName || "Unit");
		setAdjustCurrentQty(stockQty);
		setAdjustModalOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
		radius: 0,
		withBorder: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				striped: true,
				withTableBorder: true,
				withColumnBorders: true,
				horizontalSpacing: "xs",
				verticalSpacing: 4,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, {
					bg: "#a6d5e5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, {
							w: 40,
							children: "No"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "ITEM CODE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "ITEM NAME" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "RtPrice" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "StockQty" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "UOM" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "QUANTITY" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "TOTAL" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { w: 60 })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: itemCode || "-" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						size: "xs",
						placeholder: "Select product...",
						data: productOptions.map((p) => ({
							value: p.value,
							label: p.label
						})),
						value: selectedProductId,
						onChange: (v) => {
							setSelectedProductId(v);
							const prod = productOptions.find((p) => p.value === v);
							if (prod) {
								setUomId(prod.uomId);
								setUomName(prod.uomName);
							}
						},
						searchable: true,
						clearable: true,
						w: 280
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: retailPrice }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: stockLocationId && selectedProductId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
						onClick: openAdjustModal,
						style: {
							textDecoration: "underline",
							cursor: "pointer"
						},
						children: [stockQty, "hello"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnstyledButton, {
						onClick: openAdjustModal,
						style: {
							textDecoration: "underline",
							cursor: "pointer"
						},
						children: " Set Stock"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						size: "xs",
						data: Array.from(uomMap.values()).map((u) => ({
							value: u.id,
							label: u.name
						})),
						value: uomId,
						onChange: (v) => {
							setUomId(v);
							const u = v ? uomMap.get(v) : null;
							if (u) setUomName(u.name);
						},
						w: 80
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
						size: "xs",
						min: 1,
						value: quantity,
						onChange: (v) => setQuantity(Number(v) || 1),
						w: 80
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
						fw: 700,
						children: total.toFixed(2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "xs",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }),
						onClick: handleAdd,
						children: "Add"
					}) })
				] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				ta: "center",
				c: "blue",
				py: "xs",
				fw: 600,
				children: "Add to Cart"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockAdjustModal, {
				opened: adjustModalOpen,
				onClose: () => setAdjustModalOpen(false),
				itemId: adjustItemId,
				itemName: adjustItemName,
				stockLocationId: stockLocationId ?? "",
				currentQty: adjustCurrentQty,
				onAdjusted: () => refetchStock(),
				uomName: adjustUomName
			})
		]
	});
}
//#endregion
//#region src/features/damorex/pos/components/SalesSummary.tsx
function SalesSummary({ itemCount, totals, onCheckout, onHold, onNextCustomer, onSellPrint, onPrintWholesale, paidAmount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		radius: 0,
		withBorder: true,
		bg: "#c7e6f1",
		h: "100%",
		p: "md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 3,
				ta: "center",
				children: "Current Sales Summary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				withBorder: true,
				p: "xs",
				radius: 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					justify: "space-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						children: "Items on Cart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 700,
						children: itemCount
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				withBorder: true,
				p: "xs",
				radius: 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					justify: "space-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						children: "Total Cost"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						fw: 700,
						children: ["₦", totals.total.toFixed(2)]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				withBorder: true,
				p: "xs",
				radius: 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					justify: "space-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						children: "Total Paid"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 700,
						children: paidAmount > 0 ? `₦${paidAmount.toFixed(2)}` : "Not Yet Paid"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				fullWidth: true,
				mt: "md",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { size: 16 }),
				onClick: onCheckout,
				children: "Calculate Current Sales"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				mt: "md",
				p: "md",
				withBorder: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					ta: "center",
					fw: 700,
					children: "Total Cost"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Title, {
					order: 2,
					ta: "center",
					children: ["₦", totals.total.toFixed(2)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				fullWidth: true,
				mt: "md",
				onClick: onCheckout,
				children: "Sell Only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				fullWidth: true,
				mt: "xs",
				onClick: onSellPrint,
				children: "Sell Print"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				fullWidth: true,
				mt: "xs",
				onClick: onPrintWholesale,
				children: "Print Wholesale Receipt"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				fullWidth: true,
				mt: "xs",
				variant: "light",
				onClick: onHold,
				children: "Hold Sale"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				fullWidth: true,
				mt: "xs",
				variant: "outline",
				onClick: onNextCustomer,
				children: "Next Customer"
			})
		] })
	});
}
//#endregion
//#region src/features/damorex/pos/components/SaleTabs.tsx
function SaleTabs({ sessions, activeSessionId, onChange, onAdd, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
		px: "md",
		py: 4,
		bg: "#d9edf5",
		justify: "space-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			gap: 4,
			children: [sessions.map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: 4,
				p: "xs",
				style: {
					cursor: "pointer",
					borderRadius: 4,
					background: session.id === activeSessionId ? "#a6d5e5" : "transparent"
				},
				onClick: () => onChange(session.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					fw: 600,
					children: session.saleCode
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
					size: "xs",
					variant: "subtle",
					onClick: (e) => {
						e.stopPropagation();
						onClose(session.id);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
				})]
			}, session.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
				size: "sm",
				ml: 4,
				onClick: onAdd,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
			size: "sm",
			fw: 600,
			children: [
				"Selling to Customer:",
				" ",
				sessions.find((s) => s.id === activeSessionId)?.customerName || "Walk-in",
				" | SALE CODE =",
				" ",
				sessions.find((s) => s.id === activeSessionId)?.saleCode || "N/A"
			]
		})]
	});
}
//#endregion
//#region src/features/damorex/pos/utils/calculation.ts
function calculateTotals(session) {
	const subtotal = session.cart.reduce((sum, item) => {
		return sum + (session.pricingMode === "wholesale" ? item.wholesalePrice : item.retailPrice) * item.quantity * item.uomFactor;
	}, 0);
	const discount = subtotal * (session.discount / 100);
	const taxable = subtotal - discount;
	const vat = taxable * (session.vatPercent / 100);
	return {
		subtotal,
		discount,
		vat,
		total: taxable + vat
	};
}
//#endregion
//#region src/features/damorex/pos/utils/print.ts
function printPosReceipt(sale) {
	const linesHtml = sale.items.map((item) => `
    <tr>
      <td style="text-align:center">${item.qty}</td>
      <td>${item.name}</td>
      <td style="text-align:right">₦${item.total.toFixed(2)}</td>
    </tr>`).join("");
	const headerText = sale.header || "DAMOREX PHARMACY";
	const win = window.open("", "_blank");
	if (!win) return;
	win.document.write(`
    <html>
    <head>
      <title>Receipt - ${sale.saleNumber}</title>
      <style>
        body { font-family: 'Courier New', monospace; font-size: 11px; width: 58mm; margin: 0 auto; padding: 8px; }
        h2 { font-size: 14px; text-align: center; margin: 4px 0; }
        .header { text-align: center; margin-bottom: 8px; }
        .header div { margin: 2px 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 2px 4px; text-align: left; }
        th { border-bottom: 1px dashed #000; }
        .right { text-align: right; }
        .center { text-align: center; }
        .total-row td { border-top: 1px dashed #000; font-weight: bold; }
        .footer { text-align: center; margin-top: 8px; font-size: 10px; }
        hr { border: none; border-top: 1px dashed #000; margin: 4px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>${headerText}</h2>
        <div>Receipt #${sale.saleNumber}</div>
        <hr>
      </div>
      <table>
        <thead>
          <tr><th class="center">Qty</th><th>Item</th><th class="right">Amount</th></tr>
        </thead>
        <tbody>${linesHtml}</tbody>
      </table>
      <hr>
      <table>
        <tr><td>Subtotal</td><td class="right">₦${sale.subtotal.toFixed(2)}</td></tr>
        ${sale.discount ? `<tr><td>Discount</td><td class="right">-₦${sale.discount.toFixed(2)}</td></tr>` : ""}
        ${sale.vat ? `<tr><td>VAT</td><td class="right">₦${sale.vat.toFixed(2)}</td></tr>` : ""}
        <tr class="total-row"><td>TOTAL</td><td class="right">₦${sale.total.toFixed(2)}</td></tr>
        <tr><td>Paid</td><td class="right">₦${sale.paidAmount.toFixed(2)}</td></tr>
        <tr><td>Change</td><td class="right">₦${sale.changeAmount.toFixed(2)}</td></tr>
      </table>
      <div class="footer">
        <hr>
        <div>Thank you for your patronage!</div>
        <div>${(/* @__PURE__ */ new Date()).toLocaleString()}</div>
      </div>
      <script>window.print();window.close();<\/script>
    </body>
    </html>
  `);
	win.document.close();
}
function printA4Receipt(sale) {
	const linesHtml = sale.items.map((item) => `
    <tr>
      <td style="text-align:center">${item.qty}</td>
      <td>${item.code || ""}</td>
      <td>${item.name}</td>
      <td style="text-align:right">₦${item.price.toFixed(2)}</td>
      <td style="text-align:right">₦${item.total.toFixed(2)}</td>
    </tr>`).join("");
	const headerText = sale.header || "DAMOREX PHARMACY";
	const win = window.open("", "_blank");
	if (!win) return;
	win.document.write(`
    <html>
    <head>
      <title>Wholesale Receipt - ${sale.saleNumber}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12px; padding: 40px; }
        h1 { font-size: 20px; text-align: center; margin-bottom: 4px; }
        .header { text-align: center; margin-bottom: 16px; }
        .header div { margin: 2px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { border: 1px solid #000; padding: 6px 8px; text-align: left; }
        th { background: #f0f0f0; }
        .right { text-align: right; }
        .center { text-align: center; }
        .totals { margin-top: 12px; text-align: right; }
        .totals div { margin: 4px 0; }
        .footer { text-align: center; margin-top: 24px; font-size: 11px; }
        hr { border: none; border-top: 2px solid #000; margin: 8px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${headerText}</h1>
        <div><strong>Wholesale Receipt</strong></div>
        <div>Receipt #${sale.saleNumber}</div>
        <div>Customer: ${sale.customerName || "Walk-in"}</div>
        <div>Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</div>
      </div>
      <table>
        <thead>
          <tr><th class="center">Qty</th><th>Code</th><th>Item</th><th class="right">Unit Price</th><th class="right">Total</th></tr>
        </thead>
        <tbody>${linesHtml}</tbody>
      </table>
      <div class="totals">
        <div><strong>Subtotal:</strong> ₦${sale.subtotal.toFixed(2)}</div>
        ${sale.discount ? `<div><strong>Discount:</strong> -₦${sale.discount.toFixed(2)}</div>` : ""}
        ${sale.vat ? `<div><strong>VAT:</strong> ₦${sale.vat.toFixed(2)}</div>` : ""}
        <hr>
        <div style="font-size:14px"><strong>TOTAL: ₦${sale.total.toFixed(2)}</strong></div>
        <div><strong>Paid:</strong> ₦${sale.paidAmount.toFixed(2)}</div>
        <div><strong>Change:</strong> ₦${sale.changeAmount.toFixed(2)}</div>
      </div>
      <div class="footer">
        <p>Thank you for your patronage!</p>
      </div>
      <script>window.print();window.close();<\/script>
    </body>
    </html>
  `);
	win.document.close();
}
//#endregion
//#region src/features/damorex/pos/utils/useKeyboardShortcuts.ts
function useKeyboardShortcuts({ createSale, holdSale, payment }) {
	useHotkeys([
		["F2", createSale],
		["F4", holdSale],
		["F5", payment]
	]);
}
//#endregion
//#region src/features/damorex/pos/pos.tsx
function PosSalesPage() {
	const { sessions, activeSessionId, createSession, closeSession, setActiveSession, addItem, updateItem, removeItem, clearCart, setCustomer, setPriceList, setPricingMode, holdSale, completeSale } = usePosStore();
	const [paymentOpened, setPaymentOpened] = (0, import_react.useState)(false);
	const [heldSalesOpened, setHeldSalesOpened] = (0, import_react.useState)(false);
	const [settingsOpened, setSettingsOpened] = (0, import_react.useState)(false);
	const saleResultRef = (0, import_react.useRef)(null);
	const { data: orgConfig } = useOrganisationConfig();
	const { data: userPosConfig } = useUserPosConfig();
	const stockLocationId = userPosConfig?.stockLocationId;
	const activeSession = (0, import_react.useMemo)(() => sessions.find((s) => s.id === activeSessionId) ?? sessions[0], [sessions, activeSessionId]);
	const totals = (0, import_react.useMemo)(() => {
		if (!activeSession) return {
			subtotal: 0,
			discount: 0,
			vat: 0,
			total: 0
		};
		return calculateTotals(activeSession);
	}, [activeSession]);
	useKeyboardShortcuts({
		createSale: createSession,
		holdSale: () => {
			if (activeSession) holdSale(activeSession.id);
		},
		payment: () => setPaymentOpened(true)
	});
	if (!activeSession) return null;
	function handleCustomerChange(customerId, customerName) {
		setCustomer(activeSession.id, {
			id: customerId,
			name: customerName
		});
	}
	function handlePriceListChange(priceListId, priceListName) {
		setPriceList(activeSession.id, priceListId, priceListName);
	}
	function handleReset() {
		clearCart(activeSession.id);
		createSession(activeSession.id);
	}
	function handleHold() {
		holdSale(activeSession.id);
		createSession();
	}
	function handleSellPrint() {
		setPaymentOpened(true);
		saleResultRef.current = "print";
	}
	function handlePrintWholesale() {
		setPaymentOpened(true);
		saleResultRef.current = "print_wholesale";
	}
	function handlePaymentModalComplete(saleResult) {
		const printMode = saleResultRef.current;
		saleResultRef.current = null;
		completeSale(activeSession.id, totals.total, 0);
		if (printMode === "print") {
			const items = activeSession.cart.map((item) => {
				const price = activeSession.pricingMode === "wholesale" ? item.wholesalePrice : item.retailPrice;
				return {
					code: item.code,
					name: item.name,
					qty: item.quantity,
					price,
					total: price * item.quantity * item.uomFactor
				};
			});
			printPosReceipt({
				saleNumber: activeSession.saleCode,
				customerName: activeSession.customerName,
				items,
				subtotal: totals.subtotal,
				discount: totals.discount,
				vat: totals.vat,
				total: totals.total,
				paidAmount: totals.total,
				changeAmount: 0,
				header: orgConfig?.posHeader ?? void 0
			});
		} else if (printMode === "print_wholesale") {
			const items = activeSession.cart.map((item) => {
				const price = activeSession.pricingMode === "wholesale" ? item.wholesalePrice : item.retailPrice;
				return {
					code: item.code,
					name: item.name,
					qty: item.quantity,
					price,
					total: price * item.quantity * item.uomFactor
				};
			});
			printA4Receipt({
				saleNumber: activeSession.saleCode,
				customerName: activeSession.customerName,
				items,
				subtotal: totals.subtotal,
				discount: totals.discount,
				vat: totals.vat,
				total: totals.total,
				paidAmount: totals.total,
				changeAmount: 0,
				header: orgConfig?.posHeader ?? void 0
			});
		}
		createSession();
	}
	function handleLoadSale(saleId) {
		if (sessions.find((s) => s.id === saleId)) setActiveSession(saleId);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			bg: "#b7dce9",
			h: "100vh",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: 0,
				h: "100%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 0,
						withBorder: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaleTabs, {
							sessions,
							activeSessionId: activeSession.id,
							onChange: setActiveSession,
							onAdd: createSession,
							onClose: closeSession
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosToolbar, {
						session: activeSession,
						onCustomerChange: handleCustomerChange,
						onPriceListChange: handlePriceListChange,
						onPricingModeChange: (mode) => setPricingMode(activeSession.id, mode),
						onReset: handleReset,
						onSettings: () => setSettingsOpened(true),
						onLoadSale: handleLoadSale
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductEntryTable, {
						session: activeSession,
						onAddToCart: (item) => addItem(activeSession.id, item),
						stockLocationId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
						flex: 1,
						gap: 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: {
								base: 12,
								md: 9
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartTable, {
								session: activeSession,
								onUpdateQty: (itemId, qty) => updateItem(activeSession.id, itemId, { quantity: qty }),
								onRemoveItem: (itemId) => removeItem(activeSession.id, itemId)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: {
								base: 12,
								md: 3
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesSummary, {
								itemCount: activeSession.cart.length,
								totals,
								onCheckout: () => {
									saleResultRef.current = null;
									setPaymentOpened(true);
								},
								onHold: handleHold,
								onNextCustomer: handleReset,
								onSellPrint: handleSellPrint,
								onPrintWholesale: handlePrintWholesale,
								paidAmount: activeSession.paidAmount
							})
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentModal, {
			opened: paymentOpened,
			onClose: () => setPaymentOpened(false),
			session: activeSession,
			totals,
			onComplete: handlePaymentModalComplete
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeldSalesDrawer, {
			opened: heldSalesOpened,
			onClose: () => setHeldSalesOpened(false),
			onResume: (id) => setActiveSession(id)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosSettingsDrawer, {
			opened: settingsOpened,
			onClose: () => setSettingsOpened(false)
		})
	] });
}
//#endregion
//#region src/routes/damorex/pos.tsx?tsr-split=component
var SplitComponent = PosSalesPage;
//#endregion
export { SplitComponent as component };
