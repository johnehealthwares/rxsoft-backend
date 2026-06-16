import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { r as MapPin } from "./phone-MyagsAGu.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { o as EmptyOrders } from "./empty-states-DMCYhOTG.js";
import { t as Package } from "./package-Cis-Q__o.js";
import { B as muted, Fr as Timeline, Kn as CreditCard, L as green, Nr as useParams, P as WebsiteLayout, Pr as Title, Qn as Check, R as ink, bn as Truck, nt as useOrder, z as line } from "./index-BRcLwOKn.js";
import { n as PageLoader } from "./loaders-CcOWIeHC.js";
//#region src/features/damorex/orders/detail.tsx
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
function OrderDetailPage() {
	const { id } = useParams({ from: "/damorex/orders_/$id" });
	const { data: order, isLoading } = useOrder(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) : !order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyOrders, {
			title: "Order not found",
			message: "We couldn't find an order with that ID. It may have been removed or the link may be incorrect."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Title, {
						order: 1,
						className: "damorex-heading",
						style: { color: ink },
						children: ["Order ", order.code || `#${order.id.slice(0, 8)}`]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						size: "lg",
						radius: "xl",
						color: statusColors[order.status] || "gray",
						children: order.status
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					size: "sm",
					children: new Date(order.createdAt).toLocaleDateString()
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: { borderColor: line },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						className: "damorex-heading",
						mb: "md",
						children: "Delivery Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 8,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 18,
								color: green
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { children: [
								order.deliveryAddress,
								order.city ? `, ${order.city}` : "",
								order.state ? `, ${order.state}` : ""
							] })]
						}), order.paymentMethod ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 8,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
								size: 18,
								color: green
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: order.paymentMethod })]
						}) : null]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: { borderColor: line },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						className: "damorex-heading",
						mb: "md",
						children: "Order Timeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Timeline, {
						active: 3,
						bulletSize: 24,
						lineWidth: 2,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline.Item, {
								bullet: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 12 }),
								title: "Order Placed",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: new Date(order.createdAt).toLocaleString()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline.Item, {
								bullet: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }),
								title: "Confirmed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline.Item, {
								bullet: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 12 }),
								title: "Processing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline.Item, {
								bullet: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }),
								title: "Dispatched"
							})
						]
					})]
				}),
				order.lines?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: { borderColor: line },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						className: "damorex-heading",
						mb: "md",
						children: "Items"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						gap: "sm",
						children: order.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "space-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: line.productId ? `Product #${line.productId.slice(0, 8)}` : "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									c: muted,
									children: ["x", line.quantity]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									fw: 800,
									children: ["₦", line.unitPrice?.toLocaleString() || 0]
								})]
							})]
						}, line.id))
					})]
				}) : null
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/orders_.$id.tsx?tsr-split=component
var SplitComponent = OrderDetailPage;
//#endregion
export { SplitComponent as component };
