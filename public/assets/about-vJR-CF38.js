import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { n as Heart } from "./phone-C5YX5jYe.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Shield } from "./shield-ExkQp_iG.js";
import { t as Star } from "./star-DwsFN-Yw.js";
import { t as Users } from "./users-CqLhX-NX.js";
import { B as line, Dn as ShoppingCart, F as WebsiteLayout, H as soft, L as darkGreen, Lr as Title, Pr as useNavigate, R as green, V as muted, Wr as Grid, gt as SectionHeading, ir as BadgeCheck, mt as PrimaryButton, xn as Truck, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
//#region src/features/damorex/pages/about.tsx
var import_jsx_runtime = require_jsx_runtime();
var stats = [
	{
		value: "10,000+",
		label: "Customers"
	},
	{
		value: "2,500+",
		label: "Medicines"
	},
	{
		value: "3",
		label: "States Covered"
	},
	{
		value: "100%",
		label: "Genuine Products"
	}
];
var values = [
	{
		title: "Trust",
		text: "Every medicine dispensed is verified for authenticity and sourced from licensed manufacturers and distributors.",
		icon: Shield
	},
	{
		title: "Care",
		text: "Our pharmacists take the time to understand your health needs and provide professional guidance with every order.",
		icon: Heart
	},
	{
		title: "Innovation",
		text: "We use technology to make pharmacy services faster, more transparent and more convenient for Nigerian families.",
		icon: Star
	},
	{
		title: "Accessibility",
		text: "Quality healthcare should be within reach for everyone. We deliver to homes across three states with expanding coverage.",
		icon: Users
	},
	{
		title: "Quality",
		text: "From storage to delivery, every medicine is handled according to strict pharmaceutical standards and regulations.",
		icon: BadgeCheck
	},
	{
		title: "Community",
		text: "We are building a health-conscious community by educating customers and supporting local healthcare initiatives.",
		icon: Truck
	}
];
function AboutPage() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			py: {
				base: 48,
				md: 80
			},
			style: {
				background: `linear-gradient(135deg, ${darkGreen} 0%, #0B4A28 50%, #0F172A 100%)`,
				color: "#fff"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 24,
					maw: 820,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							tt: "uppercase",
							size: "xs",
							fw: 900,
							c: "rgba(255,255,255,0.6)",
							lts: 1.4,
							children: "About Damorex"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 1,
							className: "damorex-heading hero-title",
							children: "Your Health. Our Purpose."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "lg",
							lh: 1.7,
							c: "rgba(255,255,255,0.78)",
							maw: 680,
							children: "Damorex is a Nigerian online pharmacy dedicated to making healthcare accessible, safe and convenient through technology and genuine pharmaceutical care."
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			py: {
				base: 48,
				md: 76
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
				gap: "xl",
				align: "center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						lg: 6
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
								eyebrow: "Our story",
								title: "Built on a foundation of care and trust"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								lh: 1.7,
								children: "Damorex was founded with a simple but powerful belief: that every Nigerian deserves access to genuine medicines and professional pharmaceutical care without leaving their home. What started as a single pharmacy outlet has grown into a technology-driven healthcare platform serving thousands of customers across Lagos, Ogun and Oyo states."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								lh: 1.7,
								children: "We recognised that busy families, chronic care patients and working professionals often struggle to find time for pharmacy visits. Long queues, traffic, medicine shortages and concerns about product authenticity were common frustrations. Damorex was built to solve these problems — combining a robust inventory system, licensed pharmacists and reliable logistics into a seamless online experience."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								lh: 1.7,
								children: "Our mission is to become the most trusted pharmacy platform in Nigeria by putting patient safety, product quality and convenience at the centre of everything we do. We envision a future where healthcare access is not limited by geography, traffic or time of day."
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						lg: 6
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: 2,
						spacing: "md",
						children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							radius: 24,
							p: "xl",
							withBorder: true,
							style: {
								borderColor: line,
								textAlign: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 950,
								size: "xl",
								c: green,
								className: "damorex-heading",
								children: stat.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: muted,
								mt: 4,
								children: stat.label
							})]
						}, stat.label))
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			py: {
				base: 48,
				md: 76
			},
			style: { background: soft },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Our values",
						title: "What guides every decision we make",
						text: "These principles shape how we serve our customers, handle medicines and build the future of pharmacy in Nigeria."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: {
							base: 1,
							sm: 2,
							lg: 3
						},
						spacing: "md",
						children: values.map((value) => {
							const Icon = value.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								className: "lift-card",
								radius: 24,
								p: "xl",
								withBorder: true,
								style: {
									borderColor: line,
									background: "#fff"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									gap: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
										radius: "xl",
										size: 50,
										color: "green",
										variant: "light",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 24 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										size: "lg",
										children: value.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: muted,
										lh: 1.7,
										mt: 6,
										children: value.text
									})] })]
								})
							}, value.title);
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			py: {
				base: 48,
				md: 76
			},
			style: { background: darkGreen },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 24,
					align: "center",
					style: { textAlign: "center" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
							radius: "xl",
							size: 58,
							style: { background: "rgba(255,255,255,0.15)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
								size: 28,
								color: "#fff"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 2,
							className: "damorex-heading",
							c: "#fff",
							children: "Join thousands of Nigerians who trust Damorex"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: "rgba(255,255,255,0.78)",
							size: "lg",
							lh: 1.7,
							maw: 560,
							children: "Browse genuine medicines and healthcare products. Our pharmacists are ready to help."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 18 }),
							onClick: () => navigate({ to: "/damorex/shop" }),
							children: "Shop Medicines"
						})
					]
				})
			})
		})
	] });
}
//#endregion
//#region src/routes/damorex/about.tsx?tsr-split=component
var SplitComponent = AboutPage;
//#endregion
export { SplitComponent as component };
