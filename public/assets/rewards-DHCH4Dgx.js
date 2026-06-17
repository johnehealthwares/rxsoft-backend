import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { l as EmptyRewards } from "./empty-states-CnzeOGKL.js";
import { t as Star } from "./star-DwsFN-Yw.js";
import { t as Users } from "./users-CqLhX-NX.js";
import { B as line, F as WebsiteLayout, Kn as Gift, L as darkGreen, Lr as Title, R as green, V as muted, ct as useRewards, zr as ThemeIcon } from "./index-DuM1cidb.js";
import { n as PageLoader } from "./loaders-Dr-tBb5Z.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Ticket = createLucideIcon("ticket", [
	["path", {
		d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
		key: "qn84l0"
	}],
	["path", {
		d: "M13 5v2",
		key: "dyzc3o"
	}],
	["path", {
		d: "M13 17v2",
		key: "1ont0d"
	}],
	["path", {
		d: "M13 11v2",
		key: "1wjjxi"
	}]
]);
//#endregion
//#region src/features/damorex/rewards/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function RewardsPage() {
	const { data, isLoading } = useRewards();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) });
	if (!data || !data.totalPoints && !data.transactions?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRewards, {})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 30,
					p: "xl",
					style: {
						background: darkGreen,
						color: "#fff"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						align: "center",
						gap: "md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								size: 64,
								style: { background: "rgba(255,255,255,0.16)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 28 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								order: 2,
								className: "damorex-heading",
								children: `${data?.totalPoints || 0}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: "rgba(255,255,255,0.82)",
								size: "lg",
								children: "Reward Points"
							})
						]
					})
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
						children: "How to Earn Points"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						gap: "md",
						children: [
							{
								icon: ShoppingCartIcon,
								title: "Make a Purchase",
								text: "Earn points on every medicine order."
							},
							{
								icon: Users,
								title: "Refer a Friend",
								text: "Earn bonus points when friends sign up and order."
							},
							{
								icon: Gift,
								title: "Birthday Bonus",
								text: "Special points on your birthday."
							},
							{
								icon: Ticket,
								title: "Promotions",
								text: "Earn bonus points during promotional periods."
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								color: "green",
								variant: "light",
								size: 44,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: 22 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: muted,
								children: item.text
							})] })]
						}, item.title))
					})]
				}),
				data?.transactions && data.transactions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: { borderColor: line },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						className: "damorex-heading",
						mb: "md",
						children: "Transaction History"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						gap: "sm",
						children: data.transactions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "space-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								fw: 800,
								children: t.type === "earned" ? "Points Earned" : t.type === "redeemed" ? "Points Redeemed" : t.type === "referral_bonus" ? "Referral Bonus" : "Expired"
							}), t.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								c: muted,
								children: t.description
							}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								fw: 950,
								c: t.type === "earned" || t.type === "referral_bonus" ? green : "red",
								children: [t.type === "earned" || t.type === "referral_bonus" ? "+" : "-", t.points]
							})]
						}, t.id))
					})]
				}) : null
			]
		})
	}) });
}
function ShoppingCartIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "8",
				cy: "21",
				r: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "19",
				cy: "21",
				r: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" })
		]
	});
}
//#endregion
//#region src/routes/damorex/rewards.tsx?tsr-split=component
var SplitComponent = RewardsPage;
//#endregion
export { SplitComponent as component };
