import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Tabs } from "./Tabs-oGU2Pok4.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Anchor } from "./Anchor-DyykEMLS.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { n as MessageCircle, r as MapPin } from "./phone-MyagsAGu.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Rating } from "./Rating-Bjzx64bU.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as BookOpen } from "./book-open-D9F3OwEf.js";
import { t as CalendarClock } from "./calendar-clock-B1k3tdZz.js";
import { t as CircleDollarSign } from "./circle-dollar-sign-CqxmB95d.js";
import { t as FileUp } from "./file-up-B7FXjQGu.js";
import { t as HeartPulse } from "./heart-pulse-__ikndAu.js";
import { t as PackageCheck } from "./package-check-BGabzg7m.js";
import { t as Smartphone } from "./smartphone-7uezS56l.js";
import { t as Star } from "./star-DwsFN-Yw.js";
import { t as UsersRound } from "./users-round-BqVBa2b5.js";
import { An as Search, B as muted, Bn as Mail, Cn as Stethoscope, Ct as buildWhatsAppUrl, Dn as ShieldCheck, En as ShoppingCart, Et as websiteApi, F as buttonStyles, Fn as Pill, H as useCartStore, Hr as Grid, I as darkGreen, Ir as ThemeIcon, Kn as CreditCard, L as green, P as WebsiteLayout, Pn as Plus, Pr as Title, R as ink, Rn as Minus, St as WEBSITE_PRESCRIPTION_PHONE, V as soft, Vr as Image, Xn as ChevronRight, _n as User, bn as Truck, ft as OutlineButton, ht as SectionHeading, jr as useNavigate, kt as useChatbotStore, nr as Baby, pt as PrimaryButton, tr as BadgeCheck, wn as Sparkles, wt as toHL7Prescription, xt as QUESTIONNAIRE_CODES, yn as Upload, z as line, zn as MessageSquare } from "./index-BRcLwOKn.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BellRing = createLucideIcon("bell-ring", [
	["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}],
	["path", {
		d: "M22 8c0-2.3-.8-4.3-2-6",
		key: "5bb3ad"
	}],
	["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}],
	["path", {
		d: "M4 2C2.8 3.7 2 5.7 2 8",
		key: "tap9e0"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var WalletCards = createLucideIcon("wallet-cards", [
	["path", {
		d: "M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21",
		key: "1vwh6y"
	}],
	["path", {
		d: "M3 7h18",
		key: "1uiuf2"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]
]);
//#endregion
//#region src/features/damorex/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var heroImage = new URL("/assets/nappy-jkQzYGJ7dBA-unsplash-CgldIxpq.jpg", "" + import.meta.url).href;
var pharmacistImage = new URL("/assets/myriam-zilles-KltoLK6Mk-g-unsplash-BI0kpoMW.jpg", "" + import.meta.url).href;
var deliveryImage = new URL("/assets/markus-winkler-pOu_UmkOG-0-unsplash-Ct3PdF74.jpg", "" + import.meta.url).href;
var productImage = new URL("/assets/generic_product_image-DTN0cYH-.png", "" + import.meta.url).href;
var quickSearches = [
	"Malaria",
	"Diabetes",
	"Hypertension",
	"Pain Relief",
	"Vitamins",
	"Family Care"
];
var trustItems = [
	{
		label: "Licensed Pharmacists",
		icon: BadgeCheck
	},
	{
		label: "Genuine Medicines",
		icon: ShieldCheck
	},
	{
		label: "Same-Day Delivery",
		icon: Truck
	},
	{
		label: "Secure Payments",
		icon: CreditCard
	}
];
var healthConcerns = [
	{
		title: "Diabetes Care",
		count: "180+ products",
		icon: HeartPulse,
		slug: "diabetes"
	},
	{
		title: "Hypertension",
		count: "120+ products",
		icon: Stethoscope,
		slug: "hypertension"
	},
	{
		title: "Heart Health",
		count: "95+ products",
		icon: HeartPulse,
		slug: "heart-disease"
	},
	{
		title: "Malaria Treatment",
		count: "140+ products",
		icon: Pill,
		slug: "malaria"
	},
	{
		title: "Women's Health",
		count: "110+ products",
		icon: UsersRound,
		slug: "women-health"
	},
	{
		title: "Men's Health",
		count: "90+ products",
		icon: User,
		slug: "mens-health"
	},
	{
		title: "Children's Health",
		count: "130+ products",
		icon: Baby,
		slug: "child-health"
	},
	{
		title: "Mental Wellness",
		count: "70+ products",
		icon: Sparkles,
		slug: "mental-wellness"
	},
	{
		title: "Vitamins & Supplements",
		count: "240+ products",
		icon: Plus,
		slug: "vitamins-supplements"
	},
	{
		title: "Weight Management",
		count: "65+ products",
		icon: Minus,
		slug: "weight-management"
	},
	{
		title: "Respiratory Care",
		count: "85+ products",
		icon: Stethoscope,
		slug: "respiratory-care"
	},
	{
		title: "Digestive Health",
		count: "100+ products",
		icon: Pill,
		slug: "digestive-health"
	}
];
var categories = [
	{
		title: "Prescription Medicines",
		count: "1,200+ items",
		icon: FileUp,
		slug: "prescription-medicines"
	},
	{
		title: "OTC Medicines",
		count: "780+ items",
		icon: Pill,
		slug: "otc-medicines"
	},
	{
		title: "Supplements",
		count: "420+ items",
		icon: Sparkles,
		slug: "supplements"
	},
	{
		title: "Wellness Products",
		count: "360+ items",
		icon: HeartPulse,
		slug: "wellness"
	},
	{
		title: "Medical Devices",
		count: "160+ items",
		icon: Stethoscope,
		slug: "medical-devices"
	},
	{
		title: "Personal Care",
		count: "510+ items",
		icon: UsersRound,
		slug: "personal-care"
	},
	{
		title: "Baby Care",
		count: "190+ items",
		icon: Baby,
		slug: "baby-care"
	},
	{
		title: "First Aid",
		count: "115+ items",
		icon: PackageCheck,
		slug: "first-aid"
	},
	{
		title: "Supermarket Essentials",
		count: "650+ items",
		icon: ShoppingCart,
		slug: "supermarket-essentials"
	}
];
var products = [
	{
		id: "coartem-20120",
		name: "Coartem 20/120mg Tablets",
		generic: "Artemether / Lumefantrine",
		price: "₦4,800",
		badge: "Best seller",
		availability: "In stock today",
		prescription: "Prescription may be required",
		rating: 4.8
	},
	{
		id: "norvasc-5mg",
		name: "Norvasc 5mg Tablets",
		generic: "Amlodipine",
		price: "₦8,950",
		badge: "Most ordered",
		availability: "Available in 3 branches",
		prescription: "Prescription required",
		rating: 4.7
	},
	{
		id: "wellwoman",
		name: "Wellwoman Original",
		generic: "Multivitamin supplement",
		price: "₦18,500",
		badge: "New arrival",
		availability: "In stock today",
		prescription: "No prescription needed",
		rating: 4.9
	},
	{
		id: "accuchek-strips",
		name: "Accu-Chek Active Strips",
		generic: "Blood glucose test strips",
		price: "₦16,200",
		badge: "Family care",
		availability: "Low stock",
		prescription: "No prescription needed",
		rating: 4.6
	}
];
var whyItems = [
	{
		title: "Genuine Medicines",
		text: "100% authentic medicines sourced from licensed suppliers.",
		icon: ShieldCheck
	},
	{
		title: "Licensed Pharmacists",
		text: "Professional pharmaceutical support before and after you order.",
		icon: BadgeCheck
	},
	{
		title: "Same-Day Delivery",
		text: "Fast delivery across supported locations when you order early.",
		icon: Truck
	},
	{
		title: "Secure Payments",
		text: "Protected card, transfer and cash-on-delivery options.",
		icon: WalletCards
	},
	{
		title: "Refill Reminders",
		text: "Helpful reminders for chronic medicines and recurring care.",
		icon: BellRing
	},
	{
		title: "Multi-Branch Availability",
		text: "Access inventory across Damorex branches for faster fulfillment.",
		icon: PackageCheck
	}
];
var testimonials = [
	{
		name: "Aisha M.",
		text: "My prescription was reviewed quickly and delivered the same evening. The pharmacist explained everything clearly.",
		focus: "Verified prescription order"
	},
	{
		name: "Tunde A.",
		text: "I use Damorex for my BP refills. The reminders and WhatsApp support make it easy to stay consistent.",
		focus: "Chronic refill customer"
	},
	{
		name: "Mrs. Adeyemi",
		text: "Authentic products, neat packaging and polite delivery. It feels like a pharmacy I can trust.",
		focus: "Verified purchase"
	}
];
var articles = [
	{
		title: "How to use malaria medicines safely",
		slug: "how-to-use-malaria-medicines-safely"
	},
	{
		title: "Managing blood pressure refills without missed doses",
		slug: "managing-blood-pressure-refills"
	},
	{
		title: "A simple family guide to first aid essentials",
		slug: "family-guide-first-aid-essentials"
	}
];
function DamorexPage() {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [subscribing, setSubscribing] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			pt: {
				base: 34,
				md: 56
			},
			pb: 32,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
				gap: {
					base: 28,
					lg: 44
				},
				align: "center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						lg: 6
					},
					style: { minWidth: 0 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 22,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								radius: "xl",
								size: "lg",
								color: "green",
								variant: "light",
								leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
								w: "fit-content",
								children: "Licensed pharmacy care online"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: 14,
								className: "hero-copy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 1,
									className: "damorex-heading hero-title",
									style: {
										color: ink,
										maxWidth: "100%",
										width: "min(100%, calc(100vw - 32px))",
										overflowWrap: "break-word"
									},
									children: "Your Trusted Online Pharmacy. Fast, Safe & Convenient."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xl",
									c: muted,
									lh: 1.7,
									maw: 650,
									style: { width: "min(100%, calc(100vw - 32px))" },
									children: "Order medicines, upload prescriptions, consult pharmacists and get same-day delivery across Lagos, Ogun and Oyo."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								className: "hero-search",
								shadow: "md",
								radius: 24,
								p: {
									base: 12,
									sm: 16
								},
								style: {
									border: `1px solid ${line}`,
									boxShadow: "0 28px 80px rgba(15, 111, 53, 0.14)",
									width: "min(100%, calc(100vw - 32px))"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									gap: 12,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										gap: 10,
										wrap: "nowrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
											radius: "xl",
											size: 44,
											color: "green",
											variant: "light",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 22 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"aria-label": "Search medicines",
											placeholder: "Search by medicine name, generic name, brand name or health concern...",
											size: "lg",
											radius: "xl",
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.currentTarget.value),
											onKeyDown: (e) => {
												if (e.key === "Enter") navigate({ to: `/damorex/search?q=${encodeURIComponent(searchQuery)}` });
											},
											style: {
												flex: 1,
												minWidth: 0
											},
											styles: { input: {
												borderColor: "#CFE5D7",
												color: ink,
												minHeight: 52,
												minWidth: 0
											} }
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										gap: 8,
										children: quickSearches.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "light",
											color: "green",
											radius: "xl",
											size: "xs",
											styles: buttonStyles,
											onClick: () => navigate({ to: `/damorex/search?q=${encodeURIComponent(tag)}` }),
											children: tag
										}, tag))
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								className: "hero-actions",
								style: { width: "min(100%, calc(100vw - 32px))" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
										leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 18 }),
										onClick: () => navigate({ to: "/damorex/shop" }),
										children: "Shop Medicines"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
										leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 18 }),
										onClick: () => navigate({ to: "/damorex/upload-prescription" }),
										children: "Upload Prescription"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "md",
										radius: "xl",
										variant: "light",
										color: "green",
										leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }),
										styles: buttonStyles,
										onClick: () => {
											const url = `https://wa.me/${WEBSITE_PRESCRIPTION_PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`${QUESTIONNAIRE_CODES.PHARMACY_ORDER}\r\nHello Damorex, I want to order medicines`)}`;
											window.open(url, "_blank");
										},
										children: "Order via WhatsApp"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
								className: "hero-trust",
								cols: {
									base: 1,
									sm: 2,
									md: 4
								},
								spacing: 12,
								style: { width: "min(100%, calc(100vw - 32px))" },
								children: trustItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
									radius: 18,
									p: "sm",
									withBorder: true,
									style: {
										borderColor: "#D8EEE0",
										background: "rgba(255, 255, 255, 0.82)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										gap: 8,
										wrap: "nowrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
											radius: "xl",
											color: "green",
											variant: "light",
											size: 30,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: 16 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "sm",
											fw: 800,
											lh: 1.2,
											children: item.label
										})]
									})
								}, item.label))
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						lg: 6
					},
					style: { minWidth: 0 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						style: {
							position: "relative",
							minHeight: 520
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
								radius: 32,
								p: 0,
								style: {
									overflow: "hidden",
									minHeight: 520,
									border: `1px solid ${line}`,
									boxShadow: "0 36px 90px rgba(15, 23, 42, 0.14)",
									position: "relative"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
										src: heroImage,
										alt: "Nigerian customer receiving healthcare support",
										h: 520,
										fit: "cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
										position: "absolute",
										inset: 0,
										background: "linear-gradient(180deg, rgba(15, 23, 42, 0.05), rgba(15, 111, 53, 0.72))",
										mixBlendMode: "multiply"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
										radius: 22,
										p: "lg",
										style: {
											position: "absolute",
											left: 22,
											right: 22,
											bottom: 22,
											background: "rgba(255, 255, 255, 0.92)",
											backdropFilter: "blur(12px)"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
											justify: "space-between",
											gap: "md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
												gap: 2,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
													fw: 900,
													c: ink,
													children: "Pharmacist review in progress"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
													size: "sm",
													c: muted,
													children: "Prescription checked, branch stock confirmed, dispatch queued."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
												radius: "xl",
												size: 48,
												color: "green",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { size: 24 })
											})]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								radius: 24,
								p: "md",
								visibleFrom: "md",
								style: {
									position: "absolute",
									top: 36,
									left: -18,
									width: 230,
									background: "#fff",
									boxShadow: "0 24px 60px rgba(14, 165, 233, 0.18)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 10,
									wrap: "nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
										radius: "xl",
										color: "blue",
										variant: "light",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 20 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										children: "Same-day dispatch"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										c: muted,
										children: "Express delivery slots"
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								radius: 24,
								p: "md",
								visibleFrom: "md",
								style: {
									position: "absolute",
									top: 156,
									right: -10,
									width: 240,
									background: "#fff",
									boxShadow: "0 24px 60px rgba(22, 163, 74, 0.18)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 10,
									wrap: "nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
										radius: "xl",
										color: "green",
										variant: "light",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { size: 20 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										children: "2,500+ medicines"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										c: muted,
										children: "Across Damorex branches"
									})] })]
								})
							})
						]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			py: {
				base: 36,
				md: 54
			},
			style: { background: soft },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
					gap: "lg",
					align: "stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: {
							base: 12,
							lg: 5
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							radius: 28,
							p: {
								base: "lg",
								md: "xl"
							},
							h: "100%",
							style: {
								background: darkGreen,
								color: "#fff",
								boxShadow: "0 26px 70px rgba(15, 111, 53, 0.22)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: "md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
										radius: "xl",
										size: 52,
										style: { background: "rgba(255,255,255,0.15)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 26 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
										order: 2,
										className: "damorex-heading",
										children: "Have a Prescription?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: "rgba(255,255,255,0.82)",
										lh: 1.7,
										children: "Upload your doctor's prescription and our licensed pharmacists will review and prepare your medications."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										gap: 8,
										children: [
											"JPG",
											"PNG",
											"PDF"
										].map((format) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											color: "gray",
											variant: "white",
											radius: "xl",
											children: [format, " upload"]
										}, format))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										radius: "xl",
										size: "md",
										color: "gray",
										variant: "white",
										leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 18 }),
										w: "fit-content",
										styles: buttonStyles,
										onClick: () => navigate({ to: "/damorex/upload-prescription" }),
										children: "Upload Prescription"
									})
								]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: {
							base: 12,
							lg: 7
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
							cols: {
								base: 1,
								sm: 3
							},
							h: "100%",
							children: [
								{
									title: "1. Upload",
									text: "Send prescription images or PDFs securely."
								},
								{
									title: "2. Pharmacist Review",
									text: "A licensed pharmacist validates details and stock."
								},
								{
									title: "3. Dispatch",
									text: "Pay securely and receive delivery updates."
								}
							].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								className: "lift-card",
								radius: 24,
								p: "xl",
								withBorder: true,
								style: {
									borderColor: line,
									background: "#fff",
									minHeight: 220
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									justify: "space-between",
									h: "100%",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										c: green,
										children: step.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: muted,
										mt: 8,
										lh: 1.7,
										children: step.text
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
										radius: "xl",
										color: "green",
										variant: "light",
										size: 42,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 22 })
									})]
								})
							}, step.title))
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			py: {
				base: 48,
				md: 76
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Shop by health concern",
					title: "Find the right care faster",
					text: "Browse practical care groups built around the health needs Nigerian families search for every day."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
					cols: {
						base: 2,
						sm: 3,
						lg: 4
					},
					spacing: "md",
					children: healthConcerns.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "lift-card",
						radius: 22,
						p: "lg",
						withBorder: true,
						style: {
							borderColor: line,
							boxShadow: "0 16px 46px rgba(15, 23, 42, 0.05)",
							cursor: "pointer"
						},
						onClick: () => navigate({ to: `/damorex/health-concerns/${item.slug}` }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 46,
									color: "green",
									variant: "light",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: 22 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: item.count
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Anchor, {
									underline: "never",
									c: green,
									fw: 900,
									size: "sm",
									className: "damorex-link",
									onClick: (e) => {
										e.stopPropagation();
										navigate({ to: `/damorex/health-concerns/${item.slug}` });
									},
									children: ["Shop care ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
								})
							]
						})
					}, item.title))
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						align: "end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Shop by category",
							title: "Everyday medicines and wellness essentials"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							visibleFrom: "sm",
							radius: "xl",
							variant: "subtle",
							color: "green",
							rightSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 }),
							styles: buttonStyles,
							onClick: () => navigate({ to: "/damorex/categories" }),
							children: "View all categories"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						className: "mobile-scroll",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
							cols: {
								base: 1,
								sm: 2,
								lg: 3
							},
							spacing: "md",
							children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								className: "lift-card",
								radius: 24,
								p: "lg",
								withBorder: true,
								style: {
									borderColor: line,
									background: "#fff",
									cursor: "pointer"
								},
								onClick: () => navigate({ to: `/damorex/categories/${item.slug}` }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									wrap: "nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										gap: "md",
										wrap: "nowrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
											radius: 16,
											size: 52,
											color: "green",
											variant: "light",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: 24 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											fw: 900,
											children: item.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "sm",
											c: muted,
											children: item.count
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
										"aria-label": `Shop ${item.title}`,
										radius: "xl",
										color: "green",
										variant: "light",
										onClick: (e) => {
											e.stopPropagation();
											navigate({ to: `/damorex/categories/${item.slug}` });
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 18 })
									})]
								})
							}, item.title))
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			py: {
				base: 48,
				md: 76
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "space-between",
					align: "end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Featured products",
						title: "Popular picks from Damorex",
						text: "Realistic product cards with availability, ratings, prescription status and WhatsApp ordering."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						defaultValue: "best",
						visibleFrom: "md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.List, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
								value: "best",
								children: "Best Sellers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
								value: "ordered",
								children: "Most Ordered"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
								value: "new",
								children: "New Arrivals"
							})
						] })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
					cols: {
						base: 1,
						sm: 2,
						lg: 4
					},
					spacing: "md",
					children: products.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lift-card",
						radius: 24,
						withBorder: true,
						padding: "md",
						style: {
							borderColor: line,
							boxShadow: "0 18px 52px rgba(15, 23, 42, 0.06)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Section, {
							style: {
								background: "#F1F8F4",
								borderBottom: `1px solid ${line}`,
								position: "relative",
								cursor: "pointer"
							},
							onClick: () => navigate({ to: `/damorex/shop/${item.id}` }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								radius: "xl",
								color: "green",
								style: {
									position: "absolute",
									top: 12,
									left: 12
								},
								children: item.badge
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: item.mediumImageUrl || item.imageUrl || productImage,
								alt: item.name,
								h: 190,
								fit: "contain",
								p: "lg"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							mt: "md",
							gap: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									lh: 1.25,
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: item.generic
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
										value: item.rating,
										fractions: 2,
										readOnly: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										c: muted,
										children: item.rating
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									align: "center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 950,
										size: "xl",
										c: darkGreen,
										children: item.price
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										color: item.availability.includes("Low") ? "yellow" : "green",
										variant: "light",
										radius: "xl",
										children: item.availability
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xs",
									c: muted,
									children: item.prescription
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									grow: true,
									gap: 8,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											color: "green",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 16 }),
											styles: buttonStyles,
											style: { background: green },
											onClick: () => {
												useCartStore.getState().addItem(item.id);
												notifications.show({
													message: "Added to cart",
													color: "green",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 18 })
												});
											},
											children: "Add"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "light",
											color: "green",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 16 }),
											styles: buttonStyles,
											onClick: () => {
												const hl7 = toHL7Prescription({
													product: item,
													quantity: 1
												}, {
													questionnaireCode: QUESTIONNAIRE_CODES.PRODUCT_INQUIRY,
													customerName: item.name
												});
												window.open(buildWhatsAppUrl(hl7, WEBSITE_PRESCRIPTION_PHONE, QUESTIONNAIRE_CODES.PRODUCT_INQUIRY), "_blank");
											},
											children: "WhatsApp"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "filled",
											color: "blue",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 16 }),
											styles: buttonStyles,
											onClick: () => {
												const hl7 = toHL7Prescription({
													product: item,
													quantity: 1
												}, {
													questionnaireCode: QUESTIONNAIRE_CODES.PRODUCT_INQUIRY,
													customerName: item.name
												});
												useChatbotStore.getState().openWith(hl7, QUESTIONNAIRE_CODES.PRODUCT_INQUIRY);
											},
											children: "Chat"
										})
									]
								})
							]
						})]
					}, item.name))
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SimpleGrid, {
					cols: {
						base: 1,
						lg: 2
					},
					spacing: "xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 30,
						p: {
							base: "lg",
							md: "xl"
						},
						withBorder: true,
						style: {
							borderColor: line,
							background: "#fff"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
									eyebrow: "Speak with a pharmacist",
									title: "Professional support before you buy",
									text: "Get medication advice, drug information, refill guidance and wellness support from a friendly Damorex pharmacist."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
									cols: {
										base: 1,
										sm: 2
									},
									children: [
										"Medication advice",
										"Drug information",
										"Refill guidance",
										"Wellness support"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										gap: 8,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
											radius: "xl",
											color: "green",
											variant: "light",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { size: 16 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											fw: 800,
											children: item
										})]
									}, item))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 18 }),
									onClick: () => navigate({ to: "/damorex/consult-pharmacist" }),
									children: "Book Consultation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }),
									onClick: () => {
										const url = `https://wa.me/${WEBSITE_PRESCRIPTION_PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`${QUESTIONNAIRE_CODES.HEALTH_CONSULTATION}\r\nHello Damorex, I want to speak with a pharmacist`)}`;
										window.open(url, "_blank");
									},
									children: "WhatsApp Pharmacist"
								})] })
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						radius: 30,
						p: 0,
						style: {
							overflow: "hidden",
							minHeight: 420,
							position: "relative",
							boxShadow: "0 24px 70px rgba(15, 23, 42, 0.10)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: pharmacistImage,
								alt: "Friendly pharmacist consultation",
								h: 420,
								fit: "cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
								position: "absolute",
								inset: 0,
								background: "linear-gradient(180deg, rgba(15,23,42,0.02), rgba(15,111,53,0.68))"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								radius: 22,
								p: "lg",
								style: {
									position: "absolute",
									left: 20,
									right: 20,
									bottom: 20,
									background: "rgba(255, 255, 255, 0.93)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										children: "Average response"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: muted,
										size: "sm",
										children: "WhatsApp pharmacist replies in minutes"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										color: "green",
										radius: "xl",
										children: "Online now"
									})]
								})
							})
						]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			py: {
				base: 48,
				md: 76
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Why choose Damorex",
					title: "Trust signals that matter in healthcare"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
					cols: {
						base: 1,
						sm: 2,
						lg: 3
					},
					spacing: "md",
					children: whyItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						className: "lift-card",
						radius: 24,
						p: "xl",
						withBorder: true,
						style: { borderColor: line },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								size: 50,
								color: "green",
								variant: "light",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: 24 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								size: "lg",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								lh: 1.7,
								children: item.text
							})] })]
						})
					}, item.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			py: {
				base: 48,
				md: 76
			},
			style: { background: "#F0F9F5" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
					gap: "xl",
					align: "center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid.Col, {
						span: {
							base: 12,
							lg: 5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Delivery coverage",
							title: "Fast dispatch across Lagos, Ogun and Oyo",
							text: "Choose same-day delivery, scheduled delivery or express dispatch where available."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
							mt: "xl",
							cols: {
								base: 1,
								sm: 3
							},
							children: [
								"Same Day Delivery",
								"Scheduled Delivery",
								"Express Dispatch"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								radius: 20,
								p: "md",
								withBorder: true,
								style: {
									borderColor: "#CDEDD8",
									background: "#fff"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									children: item
								})
							}, item))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: {
							base: 12,
							lg: 7
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							radius: 30,
							p: {
								base: "lg",
								md: "xl"
							},
							style: {
								minHeight: 360,
								background: "radial-gradient(circle at 25% 28%, rgba(22,163,74,0.28), transparent 18%), radial-gradient(circle at 55% 55%, rgba(14,165,233,0.22), transparent 20%), radial-gradient(circle at 75% 32%, rgba(34,197,94,0.24), transparent 16%), #FFFFFF",
								border: `1px solid ${line}`,
								position: "relative",
								overflow: "hidden"
							},
							children: [[
								{
									city: "Lagos",
									top: "28%",
									left: "26%"
								},
								{
									city: "Ogun State",
									top: "56%",
									left: "52%"
								},
								{
									city: "Oyo State",
									top: "32%",
									left: "74%"
								}
							].map((pin) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								radius: "xl",
								p: "sm",
								style: {
									position: "absolute",
									top: pin.top,
									left: pin.left,
									transform: "translate(-50%, -50%)",
									boxShadow: "0 18px 42px rgba(15, 111, 53, 0.18)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									wrap: "nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										size: 16,
										color: green
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										size: "sm",
										children: pin.city
									})]
								})
							}, pin.city)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: deliveryImage,
								alt: "Delivery and pharmacy logistics",
								radius: 24,
								h: 150,
								w: 220,
								fit: "cover",
								style: {
									position: "absolute",
									right: 22,
									bottom: 22,
									border: "6px solid #fff",
									boxShadow: "0 20px 54px rgba(15, 23, 42, 0.18)"
								}
							})]
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			py: {
				base: 48,
				md: 76
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SimpleGrid, {
				cols: {
					base: 1,
					lg: 2
				},
				spacing: "xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 30,
					p: {
						base: "lg",
						md: "xl"
					},
					style: {
						background: darkGreen,
						color: "#fff"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								size: 54,
								style: { background: "rgba(255,255,255,0.16)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 26 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								order: 2,
								className: "damorex-heading",
								children: "Loyalty & Rewards"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: "rgba(255,255,255,0.82)",
								mt: 8,
								lh: 1.7,
								children: "Earn points on purchases, redeem rewards, unlock referral bonuses and receive exclusive discounts."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								color: "gray",
								variant: "white",
								radius: "xl",
								w: "fit-content",
								leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, { size: 18 }),
								styles: buttonStyles,
								onClick: () => navigate({ to: "/damorex/rewards" }),
								children: "Join Rewards Program"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 30,
					p: {
						base: "lg",
						md: "xl"
					},
					withBorder: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Mobile app coming soon",
							title: "Manage your health anywhere.",
							text: "Android and iOS experiences are planned for refills, reminders, deliveries and pharmacist chat."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							size: "lg",
							radius: "xl",
							color: "green",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 14 }),
							children: "Android"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							size: "lg",
							radius: "xl",
							color: "blue",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 14 }),
							children: "iOS"
						})] })]
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						align: "end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Customer stories",
							title: "Trusted by families and chronic care customers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: "green",
							radius: "xl",
							size: "lg",
							children: "Verified purchase badges"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: {
							base: 1,
							md: 3
						},
						spacing: "md",
						children: testimonials.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
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
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										justify: "space-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
											value: 5,
											readOnly: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											color: "green",
											variant: "light",
											children: "Verified"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
										c: ink,
										lh: 1.7,
										children: [
											"“",
											item.text,
											"”"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: muted,
										children: item.focus
									})] })
								]
							})
						}, item.name))
					})]
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						lg: 7
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Health blog",
							title: "Practical health education from the pharmacy team"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
							cols: {
								base: 1,
								md: 3
							},
							children: articles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								className: "lift-card",
								radius: 24,
								p: "lg",
								withBorder: true,
								style: { borderColor: line },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									h: "100%",
									justify: "space-between",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
											radius: "xl",
											color: "green",
											variant: "light",
											size: 46,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 22 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											fw: 900,
											lh: 1.3,
											children: article.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
											c: green,
											fw: 900,
											underline: "never",
											className: "damorex-link",
											onClick: () => navigate({ to: `/damorex/blog/${article.slug}` }),
											children: "Read article"
										})
									]
								})
							}, article.title))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						lg: 5
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 30,
						p: {
							base: "lg",
							md: "xl"
						},
						style: {
							background: "radial-gradient(circle at top right, rgba(14,165,233,0.18), transparent 35%), #0F172A",
							color: "#fff",
							minHeight: "100%"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									color: "blue",
									size: 54,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 26 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 2,
									className: "damorex-heading",
									children: "Stay Healthy. Stay Informed."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "rgba(255,255,255,0.76)",
									mt: 8,
									lh: 1.7,
									children: "Get health tips, promotions and refill reminders sent to your inbox or phone."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									gap: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										fw: 800,
										mb: 6,
										children: "Email address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"aria-label": "Email address",
										placeholder: "you@example.com",
										radius: "xl",
										size: "md",
										value: email,
										onChange: (e) => setEmail(e.currentTarget.value)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										fw: 800,
										mb: 6,
										children: "Phone number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"aria-label": "Phone number",
										placeholder: "+234",
										radius: "xl",
										size: "md",
										value: phone,
										onChange: (e) => setPhone(e.currentTarget.value)
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									radius: "xl",
									color: "green",
									size: "md",
									leftSection: subscribing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {
										size: 18,
										color: "white"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { size: 18 }),
									styles: buttonStyles,
									style: { background: green },
									disabled: subscribing,
									onClick: async () => {
										if (!email && !phone) return;
										setSubscribing(true);
										try {
											await websiteApi.subscribe({
												email,
												phone: phone || void 0
											});
											notifications.show({
												message: "Subscribed successfully!",
												color: "green"
											});
											setEmail("");
											setPhone("");
										} catch {
											notifications.show({
												message: "Subscription failed. Try again.",
												color: "red"
											});
										} finally {
											setSubscribing(false);
										}
									},
									children: "Subscribe"
								})
							]
						})
					})
				})]
			})
		})
	] });
}
//#endregion
export { DamorexPage as t };
