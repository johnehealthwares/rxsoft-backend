import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { o as EmptyOrders } from "./empty-states-DOEWtCUZ.js";
import { B as line, F as WebsiteLayout, Hn as MapPin, I as buttonStyles, Lr as Title, R as green, V as muted, dt as useTrackOrder, jn as Search, z as ink } from "./index-DwQ-NyPQ.js";
import { n as PageLoader } from "./loaders-DXtlW3kz.js";
//#region src/features/damorex/orders/track.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function TrackOrderPage() {
	const [code, setCode] = (0, import_react.useState)("");
	const [searchCode, setSearchCode] = (0, import_react.useState)("");
	const { data: order, isLoading } = useTrackOrder(searchCode);
	const handleSearch = () => setSearchCode(code);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					className: "damorex-heading",
					style: { color: ink },
					children: "Track Order"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					size: "lg",
					lh: 1.7,
					children: "Enter your tracking code to see real-time delivery updates."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 24,
					p: "lg",
					withBorder: true,
					style: { borderColor: line },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Enter tracking code",
						radius: "xl",
						size: "lg",
						value: code,
						onChange: (e) => setCode(e.currentTarget.value),
						style: { flex: 1 },
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
						styles: { input: { borderColor: "#CFE5D7" } }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						radius: "xl",
						size: "lg",
						styles: buttonStyles,
						style: { background: green },
						onClick: handleSearch,
						loading: isLoading,
						children: "Track"
					})] })
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) : searchCode && order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: { borderColor: line },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								justify: "space-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									fw: 900,
									size: "lg",
									children: ["Order ", order.code || `#${order.id.slice(0, 8)}`]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									size: "lg",
									radius: "xl",
									color: "green",
									children: order.status
								})]
							}),
							order.deliveryAddress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: 8,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									size: 18,
									color: green
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: muted,
									children: order.deliveryAddress
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "sm",
								c: muted,
								children: ["Placed on ", new Date(order.createdAt).toLocaleDateString()]
							})
						]
					})
				}) : searchCode && !isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyOrders, {
					title: "Order not found",
					message: "Check your tracking code and try again."
				}) : null
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/track-order.$code.tsx?tsr-split=component
var SplitComponent = TrackOrderPage;
//#endregion
export { SplitComponent as component };
