import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { B as line, F as WebsiteLayout, Hn as MapPin, L as darkGreen, Lr as Title, V as muted, Xn as Clock3, et as useDeliveryAreas, xn as Truck, z as ink, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
//#region src/features/damorex/delivery/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function DeliveryAreasPage() {
	const { data: areas, isLoading } = useDeliveryAreas();
	const grouped = areas?.reduce((acc, area) => {
		if (!acc[area.state]) acc[area.state] = [];
		acc[area.state].push(area);
		return acc;
	}, {}) || {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
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
				children: "Delivery Coverage"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "We deliver across Lagos, Ogun, Oyo and surrounding areas."
			})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "Loading delivery areas..." }) : !areas?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				radius: 24,
				p: "xl",
				withBorder: true,
				style: {
					borderColor: line,
					textAlign: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
					radius: "xl",
					size: 56,
					color: "green",
					variant: "light",
					mx: "auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 26 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 900,
					mt: "md",
					children: "No delivery areas listed yet"
				})]
			}) : Object.entries(grouped).map(([state, stateAreas]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 3,
				className: "damorex-heading",
				mb: "md",
				c: ink,
				children: state
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: "sm",
				children: stateAreas.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 20,
					p: "md",
					withBorder: true,
					style: { borderColor: line },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						wrap: "nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								color: "green",
								variant: "light",
								size: 36,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: area.city
							}), area.estimatedDeliveryHours ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: 4,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
									size: 12,
									color: muted
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "xs",
									c: muted,
									children: [area.estimatedDeliveryHours, "h estimated"]
								})]
							}) : null] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							ta: "right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								fw: 950,
								c: darkGreen,
								children: ["₦", area.deliveryFee.toLocaleString()]
							}), area.freeDeliveryAbove ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "xs",
								c: muted,
								children: ["Free above ₦", area.freeDeliveryAbove.toLocaleString()]
							}) : null]
						})]
					})
				}, area.id))
			})] }, state))]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/delivery-areas.tsx?tsr-split=component
var SplitComponent = DeliveryAreasPage;
//#endregion
export { SplitComponent as component };
