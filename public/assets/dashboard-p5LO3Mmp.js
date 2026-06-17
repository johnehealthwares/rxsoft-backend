import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as FileText } from "./file-text-ZMRlE-dq.js";
import { t as Package } from "./package-Cis-Q__o.js";
import { t as Star } from "./star-DwsFN-Yw.js";
import { B as line, F as WebsiteLayout, Lr as Title, Pr as useNavigate, V as muted, Vn as MessageCircle, Wr as Grid, X as useConsultations, at as usePrescriptions, ct as useRewards, it as useOrders, z as ink, zr as ThemeIcon } from "./index-DuM1cidb.js";
import { n as PageLoader } from "./loaders-Dr-tBb5Z.js";
//#region src/features/damorex/dashboard/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const navigate = useNavigate();
	const { data: orders, isLoading: ordersLoading } = useOrders();
	const { data: prescriptions, isLoading: prescriptionsLoading } = usePrescriptions();
	const { data: consultations, isLoading: consultationsLoading } = useConsultations();
	const { data: rewards, isLoading: rewardsLoading } = useRewards();
	const activeOrders = orders?.filter((o) => !["Delivered", "Cancelled"].includes(o.status))?.length || 0;
	const pendingPrescriptions = prescriptions?.filter((p) => p.status === "Pending")?.length || 0;
	if (ordersLoading || prescriptionsLoading || consultationsLoading || rewardsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 1,
				className: "damorex-heading",
				style: { color: ink },
				children: "My Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 6,
						md: 3
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						className: "lift-card",
						radius: 24,
						p: "lg",
						withBorder: true,
						style: {
							borderColor: line,
							cursor: "pointer"
						},
						onClick: () => navigate({ to: "/damorex/orders" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							align: "center",
							gap: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 48,
									color: "green",
									variant: "light",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 24 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 950,
									size: "xl",
									children: activeOrders
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: "Active Orders"
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 6,
						md: 3
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						className: "lift-card",
						radius: 24,
						p: "lg",
						withBorder: true,
						style: {
							borderColor: line,
							cursor: "pointer"
						},
						onClick: () => navigate({ to: "/damorex/my-prescriptions" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							align: "center",
							gap: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 48,
									color: "green",
									variant: "light",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 24 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 950,
									size: "xl",
									children: pendingPrescriptions
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: "Pending Rx"
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 6,
						md: 3
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						className: "lift-card",
						radius: 24,
						p: "lg",
						withBorder: true,
						style: {
							borderColor: line,
							cursor: "pointer"
						},
						onClick: () => navigate({ to: "/damorex/consultations" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							align: "center",
							gap: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 48,
									color: "green",
									variant: "light",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 24 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 950,
									size: "xl",
									children: consultations?.length || 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: "Consultations"
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 6,
						md: 3
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						className: "lift-card",
						radius: 24,
						p: "lg",
						withBorder: true,
						style: {
							borderColor: line,
							cursor: "pointer"
						},
						onClick: () => navigate({ to: "/damorex/rewards" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							align: "center",
							gap: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 48,
									color: "green",
									variant: "light",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 24 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 950,
									size: "xl",
									children: rewards?.totalPoints || 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: "Reward Points"
								})
							]
						})
					})
				})
			] })]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/dashboard.tsx?tsr-split=component
var SplitComponent = DashboardPage;
//#endregion
export { SplitComponent as component };
