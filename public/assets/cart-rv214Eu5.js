import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Clock } from "./clock-nu73FJZO.js";
import { n as EmptyCart } from "./empty-states-DMCYhOTG.js";
import { t as TriangleAlert } from "./triangle-alert-MgdfjtL6.js";
import { B as muted, Cn as Stethoscope, F as buttonStyles, Fn as Pill, H as useCartStore, Hr as Grid, I as darkGreen, Ir as ThemeIcon, L as green, P as WebsiteLayout, Pn as Plus, Pr as Title, R as ink, Rn as Minus, Sn as Trash2, Ur as Alert, V as soft, Vr as Image, bn as Truck, ht as SectionHeading, jr as useNavigate, mt as ProductCard, rr as ArrowRight, z as line } from "./index-BRcLwOKn.js";
//#region src/features/damorex/cart/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var productPrices = {
	"1": 2500,
	"2": 3500,
	"3": 1200,
	"4": 4500,
	"5": 2800,
	"6": 1800,
	"7": 3200,
	"8": 1500,
	"9": 5200,
	"10": 900
};
function getMockPrice(id) {
	return productPrices[id] || 2500;
}
var productInfo = {
	"1": {
		name: "Amoxicillin 500mg",
		genericName: "Amoxicillin Trihydrate",
		dosage: "500mg Capsule",
		isRx: true
	},
	"2": {
		name: "Artemether/Lumefantrine 80/480",
		genericName: "Artemether + Lumefantrine",
		dosage: "80mg/480mg Tablet",
		isRx: true
	},
	"3": {
		name: "Paracetamol 500mg",
		genericName: "Paracetamol",
		dosage: "500mg Tablet",
		isRx: false
	},
	"4": {
		name: "Omeprazole 20mg",
		genericName: "Omeprazole",
		dosage: "20mg Capsule",
		isRx: false
	},
	"5": {
		name: "Metformin 500mg",
		genericName: "Metformin HCl",
		dosage: "500mg Tablet",
		isRx: true
	},
	"6": {
		name: "Ibuprofen 400mg",
		genericName: "Ibuprofen",
		dosage: "400mg Tablet",
		isRx: false
	},
	"7": {
		name: "Atorvastatin 10mg",
		genericName: "Atorvastatin Calcium",
		dosage: "10mg Tablet",
		isRx: true
	},
	"8": {
		name: "Vitamin C 1000mg",
		genericName: "Ascorbic Acid",
		dosage: "1000mg Chewable",
		isRx: false
	},
	"9": {
		name: "Lisinopril 5mg",
		genericName: "Lisinopril",
		dosage: "5mg Tablet",
		isRx: true
	},
	"10": {
		name: "Cetirizine 10mg",
		genericName: "Cetirizine HCl",
		dosage: "10mg Tablet",
		isRx: false
	}
};
function getProductName(id) {
	return productInfo[id]?.name || "Medication";
}
function getProductGeneric(id) {
	return productInfo[id]?.genericName || "Generic";
}
function getProductDosage(id) {
	return productInfo[id]?.dosage || "";
}
function isRxRequired(id) {
	return productInfo[id]?.isRx || false;
}
function cartSubtotal(items) {
	return items.reduce((sum, i) => sum + getMockPrice(i.productId) * i.quantity, 0);
}
function formatPrice(n) {
	return `₦${n.toLocaleString()}`;
}
var mockFrequentlyBought = [
	{
		id: "fb1",
		name: "Multivitamin Complex",
		code: "MVC-001",
		barcode: null,
		category: null,
		genericProduct: {
			id: "gp-fb1",
			name: "Multivitamins",
			dosageForm: "Tablet",
			strength: null,
			isPrescriptionRequired: false,
			generalUse: "Daily nutrition",
			pharmaceutics: null
		},
		baseUomId: "uom-1",
		isActive: true,
		createdAt: ""
	},
	{
		id: "fb2",
		name: "Vitamin D3 2000IU",
		code: "VD3-001",
		barcode: null,
		category: null,
		genericProduct: {
			id: "gp-fb2",
			name: "Cholecalciferol",
			dosageForm: "Softgel",
			strength: "2000IU",
			isPrescriptionRequired: false,
			generalUse: "Bone health",
			pharmaceutics: null
		},
		baseUomId: "uom-1",
		isActive: true,
		createdAt: ""
	},
	{
		id: "fb3",
		name: "Probiotic 30 Billion",
		code: "PRO-001",
		barcode: null,
		category: null,
		genericProduct: {
			id: "gp-fb3",
			name: "Probiotic Blend",
			dosageForm: "Capsule",
			strength: "30B CFU",
			isPrescriptionRequired: false,
			generalUse: "Gut health",
			pharmaceutics: null
		},
		baseUomId: "uom-1",
		isActive: true,
		createdAt: ""
	}
];
var mockRecentlyViewed = [
	{
		id: "rv1",
		name: "Zinc 15mg",
		code: "ZNC-001",
		barcode: null,
		category: null,
		genericProduct: {
			id: "gp-rv1",
			name: "Zinc Sulfate",
			dosageForm: "Tablet",
			strength: "15mg",
			isPrescriptionRequired: false,
			generalUse: "Immune support",
			pharmaceutics: null
		},
		baseUomId: "uom-1",
		isActive: true,
		createdAt: ""
	},
	{
		id: "rv2",
		name: "CoQ10 100mg",
		code: "COQ-001",
		barcode: null,
		category: null,
		genericProduct: {
			id: "gp-rv2",
			name: "Coenzyme Q10",
			dosageForm: "Softgel",
			strength: "100mg",
			isPrescriptionRequired: false,
			generalUse: "Heart health",
			pharmaceutics: null
		},
		baseUomId: "uom-1",
		isActive: true,
		createdAt: ""
	},
	{
		id: "rv3",
		name: "Omega-3 Fish Oil",
		code: "OMG-001",
		barcode: null,
		category: null,
		genericProduct: {
			id: "gp-rv3",
			name: "Omega-3 Fatty Acids",
			dosageForm: "Softgel",
			strength: "1000mg",
			isPrescriptionRequired: false,
			generalUse: "Heart & brain health",
			pharmaceutics: null
		},
		baseUomId: "uom-1",
		isActive: true,
		createdAt: ""
	}
];
function CartItemRow({ productId, quantity }) {
	const { updateQuantity, removeItem, saveForLater } = useCartStore();
	const price = getMockPrice(productId);
	const lineTotal = price * quantity;
	const rx = isRxRequired(productId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		radius: 20,
		p: "md",
		withBorder: true,
		style: { borderColor: line },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				wrap: "nowrap",
				align: "center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "md",
					wrap: "nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
						src: `https://placehold.co/80x80/16A34A/white?text=Rx`,
						alt: getProductName(productId),
						w: 72,
						h: 72,
						fit: "contain",
						style: {
							borderRadius: 14,
							background: "#F1F8F4",
							border: `1px solid ${line}`,
							minWidth: 72
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 6,
							mb: 2,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								size: "md",
								children: getProductName(productId)
							}), rx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: "orange",
								variant: "light",
								size: "sm",
								radius: "xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 4,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { size: 10 }), "Rx Required"]
								})
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							c: muted,
							children: getProductGeneric(productId)
						}),
						getProductDosage(productId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							c: muted,
							children: getProductDosage(productId)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							fw: 800,
							size: "sm",
							c: green,
							mt: 2,
							children: [formatPrice(price), "/unit"]
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "md",
					wrap: "nowrap",
					align: "center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 4,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
									radius: "xl",
									variant: "light",
									color: "gray",
									size: "sm",
									onClick: () => updateQuantity(productId, quantity - 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									style: {
										minWidth: 24,
										textAlign: "center"
									},
									children: quantity
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
									radius: "xl",
									variant: "light",
									color: "gray",
									size: "sm",
									onClick: () => updateQuantity(productId, quantity + 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							style: {
								minWidth: 80,
								textAlign: "right"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 950,
								size: "md",
								children: formatPrice(lineTotal)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
								radius: "xl",
								variant: "subtle",
								color: "gray",
								size: "sm",
								onClick: () => saveForLater(productId),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
								radius: "xl",
								variant: "subtle",
								color: "red",
								size: "sm",
								onClick: () => removeItem(productId),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})]
						})
					]
				})]
			}), rx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { size: 16 }),
				color: "orange",
				variant: "light",
				radius: "lg",
				p: "xs",
				styles: {
					body: { padding: "6px 0" },
					message: { fontSize: 13 }
				},
				children: "This item requires a valid prescription. Our pharmacist will review your order before dispatch."
			}) : null]
		})
	});
}
function CartPage() {
	const { items, totalItems, savedForLater, moveToCart, removeSaved, clearCart } = useCartStore();
	const navigate = useNavigate();
	const subtotal = cartSubtotal(items);
	const deliveryFee = subtotal >= 1e4 ? 0 : 1500;
	const total = subtotal + deliveryFee;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				align: "end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					className: "damorex-heading",
					style: { color: ink },
					children: "Shopping Cart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					c: muted,
					size: "lg",
					lh: 1.7,
					children: [
						totalItems,
						" item",
						totalItems !== 1 ? "s" : "",
						" in your cart"
					]
				})] }), items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "subtle",
					color: "red",
					radius: "xl",
					size: "sm",
					onClick: clearCart,
					children: "Clear Cart"
				}) : null]
			}), !items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCart, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 12,
					lg: 8
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartItemRow, {
							productId: item.productId,
							quantity: item.quantity
						}, item.productId)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							radius: 20,
							p: "md",
							withBorder: true,
							style: {
								borderColor: line,
								background: "#FFFBEB"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								wrap: "nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									color: "orange",
									variant: "light",
									size: "md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 800,
									size: "sm",
									children: "Drug Interaction Notice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xs",
									c: muted,
									children: "Always inform your pharmacist about other medications you are taking. Some medicines may interact with each other."
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							radius: 20,
							p: "md",
							withBorder: true,
							style: {
								borderColor: line,
								background: "#EFF6FF"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								wrap: "nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									color: "blue",
									variant: "light",
									size: "md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 800,
									size: "sm",
									children: "Prescription Reminder"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xs",
									c: muted,
									children: "Have your prescription ready. Our pharmacists will validate all prescription-required items before dispatch."
								})] })]
							})
						}),
						savedForLater.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							radius: 24,
							p: "xl",
							withBorder: true,
							style: { borderColor: line },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: "md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										gap: 6,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											size: 18,
											color: muted
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
											fw: 900,
											size: "md",
											children: [
												"Saved for Later (",
												savedForLater.length,
												")"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
									savedForLater.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										justify: "space-between",
										wrap: "nowrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
											gap: "sm",
											wrap: "nowrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
												src: "https://placehold.co/48x48/16A34A/white?text=Rx",
												alt: getProductName(item.productId),
												w: 44,
												h: 44,
												fit: "contain",
												style: {
													borderRadius: 10,
													background: "#F1F8F4",
													border: `1px solid ${line}`
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
												fw: 800,
												size: "sm",
												children: getProductName(item.productId)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
												size: "xs",
												c: muted,
												children: ["Qty: ", item.quantity]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
											gap: 6,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "xs",
												radius: "xl",
												variant: "light",
												color: "green",
												onClick: () => moveToCart(item.productId),
												children: "Move to Cart"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "xs",
												radius: "xl",
												variant: "subtle",
												color: "red",
												onClick: () => removeSaved(item.productId),
												children: "Remove"
											})]
										})]
									}, item.productId))
								]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Recommendations",
							title: "Frequently Bought Together",
							text: "Customers who bought items in your cart also purchased these"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
							mt: "md",
							children: mockFrequentlyBought.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
								span: {
									base: 6,
									sm: 4
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p })
							}, p.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Continue browsing",
							title: "Recently Viewed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
							mt: "md",
							children: mockRecentlyViewed.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
								span: {
									base: 6,
									sm: 4
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p })
							}, p.id))
						})] })
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 12,
					lg: 4
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: {
						position: "sticky",
						top: 100
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 24,
						p: "xl",
						withBorder: true,
						style: {
							borderColor: line,
							background: soft
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									size: "lg",
									children: "Order Summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
										c: muted,
										children: [
											"Subtotal (",
											totalItems,
											" item",
											totalItems !== 1 ? "s" : "",
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 800,
										children: formatPrice(subtotal)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: muted,
										children: "Delivery Fee"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 800,
										children: deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)
									})]
								}),
								subtotal < 1e4 && subtotal > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "xs",
									c: green,
									children: [
										"Add ₦",
										(1e4 - subtotal).toLocaleString(),
										" more for free delivery"
									]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										size: "lg",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 950,
										size: "lg",
										c: darkGreen,
										children: formatPrice(total)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Enter coupon code",
									radius: "xl",
									styles: { input: { borderColor: line } },
									rightSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "xs",
										radius: "xl",
										color: "green",
										variant: "light",
										style: { marginRight: 4 },
										children: "Apply"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									radius: "xl",
									size: "lg",
									fullWidth: true,
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 20 }),
									styles: buttonStyles,
									style: { background: green },
									onClick: () => navigate({ to: "/damorex/checkout" }),
									children: "Proceed to Checkout"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									justify: "center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
										size: 14,
										color: muted
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										c: muted,
										children: "Free delivery above ₦10,000"
									})]
								}),
								items.some((i) => isRxRequired(i.productId)) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { size: 16 }),
									color: "orange",
									variant: "light",
									radius: "lg",
									p: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 700,
										size: "sm",
										children: "Prescription items in cart"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										children: "You will need to validate your prescription during checkout."
									})]
								}) : null
							]
						})
					})
				})
			})] })]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/cart.tsx?tsr-split=component
var SplitComponent = CartPage;
//#endregion
export { SplitComponent as component };
