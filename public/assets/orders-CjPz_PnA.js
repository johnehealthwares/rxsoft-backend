import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { o as EmptyOrders } from "./empty-states-DOEWtCUZ.js";
import { $n as ChevronRight, B as line, F as WebsiteLayout, Lr as Title, Pr as useNavigate, V as muted, it as useOrders, z as ink } from "./index-DwQ-NyPQ.js";
import { n as PageLoader } from "./loaders-DXtlW3kz.js";
//#region src/features/damorex/orders/list.tsx
var import_jsx_runtime = require_jsx_runtime();
var statusColors = {
	Pending: "yellow",
	Confirmed: "blue",
	Processing: "violet",
	Dispatched: "orange",
	"In Transit": "cyan",
	Delivered: "green",
	Cancelled: "red"
};
function OrdersPage() {
	const { data: orders, isLoading } = useOrders();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 1,
				className: "damorex-heading",
				style: { color: ink },
				children: "My Orders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "Track and manage your orders."
			})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) : !orders?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyOrders, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: "sm",
				children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 20,
					p: "lg",
					withBorder: true,
					style: {
						borderColor: line,
						cursor: "pointer"
					},
					onClick: () => navigate({ to: `/damorex/orders/${order.id}` }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: 8,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									children: order.code || `#${order.id.slice(0, 8)}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									radius: "xl",
									color: statusColors[order.status] || "gray",
									children: order.status
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: muted,
								children: new Date(order.createdAt).toLocaleDateString()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							size: 20,
							color: muted
						})]
					})
				}, order.id))
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/orders.tsx?tsr-split=component
var SplitComponent = OrdersPage;
//#endregion
export { SplitComponent as component };
