import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Rating } from "./Rating-Bjzx64bU.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { c as EmptyProducts } from "./empty-states-CnzeOGKL.js";
import { At as useChatbotStore, B as line, Bn as MessageSquare, Ct as WEBSITE_PRESCRIPTION_PHONE, Dn as ShoppingCart, F as WebsiteLayout, Fn as Plus, H as soft, I as buttonStyles, In as Pill, Ir as useParams, L as darkGreen, Lr as Title, R as green, St as QUESTIONNAIRE_CODES, Tt as toHL7Prescription, U as useCartStore, Ur as Image, V as muted, Vn as MessageCircle, Wr as Grid, ht as ProductCard, ir as BadgeCheck, ot as useProduct, wt as buildWhatsAppUrl, xn as Truck, z as ink, zn as Minus } from "./index-DuM1cidb.js";
import { n as PageLoader } from "./loaders-Dr-tBb5Z.js";
//#region src/features/damorex/shop/product.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ProductDetailPage() {
	const { slug } = useParams({ from: "/damorex/shop_/$slug" });
	const { data, isLoading } = useProduct(slug);
	const addItem = useCartStore((s) => s.addItem);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const product = data?.product;
	const gp = product?.genericProduct;
	const pharm = gp?.pharmaceutics;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) : !product ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyProducts, {
			title: "Product not found",
			message: "The product you're looking for doesn't exist or has been removed."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						md: 6
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 32,
						p: 0,
						style: {
							overflow: "hidden",
							background: "#F1F8F4",
							border: `1px solid ${line}`
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
							src: product.mediumImageUrl || product.imageUrl || "/assets/generic_product_image-DTN0cYH-.png",
							alt: product.name,
							h: 400,
							fit: "contain",
							p: "xl"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						md: 6
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									tt: "uppercase",
									fw: 800,
									lts: 1.2,
									children: product.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 1,
									className: "damorex-heading",
									style: {
										color: ink,
										marginTop: 4
									},
									children: product.name
								}),
								gp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "lg",
									c: muted,
									lh: 1.7,
									children: gp.name
								}) : null
							] }),
							pharm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								radius: 20,
								p: "md",
								style: {
									background: soft,
									border: `1px solid ${line}`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									gap: "xs",
									children: [
										pharm.commonBrandName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
											size: "sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Brand:" }),
												" ",
												pharm.commonBrandName
											]
										}) : null,
										pharm.commonGenericName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
											size: "sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Generic Name:" }),
												" ",
												pharm.commonGenericName
											]
										}) : null,
										pharm.dosage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
											size: "sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dosage:" }),
												" ",
												pharm.dosage
											]
										}) : null
									]
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								children: [gp?.isPrescriptionRequired ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									size: "lg",
									radius: "xl",
									color: "orange",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { size: 14 }),
									children: "Prescription required"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									size: "lg",
									radius: "xl",
									color: "green",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { size: 14 }),
									children: "No prescription needed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									size: "lg",
									radius: "xl",
									color: "green",
									variant: "light",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 14 }),
									children: "In stock"
								})]
							}),
							pharm?.indications ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								size: "lg",
								children: "Indications"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: muted,
								lh: 1.7,
								children: pharm.indications
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								radius: 20,
								p: "md",
								withBorder: true,
								style: { borderColor: line },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									gap: "md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
											fw: 950,
											size: "xl",
											c: darkGreen,
											children: ["₦", product.code?.length ? product.code.length * 500 : 0]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "sm",
											c: muted,
											children: "per unit"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
											gap: 8,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													radius: "xl",
													variant: "light",
													color: "gray",
													size: "sm",
													p: 8,
													onClick: () => setQuantity(Math.max(1, quantity - 1)),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 16 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
													fw: 900,
													size: "lg",
													style: {
														minWidth: 32,
														textAlign: "center"
													},
													children: quantity
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													radius: "xl",
													variant: "light",
													color: "gray",
													size: "sm",
													p: 8,
													onClick: () => setQuantity(quantity + 1),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 })
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
											grow: true,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													radius: "xl",
													size: "md",
													leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 18 }),
													styles: buttonStyles,
													style: { background: green },
													onClick: () => addItem(product.id, quantity),
													children: "Add to Cart"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													radius: "xl",
													size: "md",
													variant: "light",
													color: "green",
													leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }),
													styles: buttonStyles,
													onClick: () => {
														const hl7 = toHL7Prescription({
															product,
															quantity
														}, {
															questionnaireCode: QUESTIONNAIRE_CODES.PRODUCT_INQUIRY,
															customerName: product.name
														});
														window.open(buildWhatsAppUrl(hl7, WEBSITE_PRESCRIPTION_PHONE, QUESTIONNAIRE_CODES.PRODUCT_INQUIRY), "_blank");
													},
													children: "Order via WhatsApp"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													radius: "xl",
													size: "md",
													variant: "filled",
													color: "blue",
													leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 18 }),
													styles: buttonStyles,
													onClick: () => {
														const hl7 = toHL7Prescription({
															product,
															quantity
														}, {
															questionnaireCode: QUESTIONNAIRE_CODES.PRODUCT_INQUIRY,
															customerName: product.name
														});
														useChatbotStore.getState().openWith(hl7, QUESTIONNAIRE_CODES.PRODUCT_INQUIRY);
													},
													children: "Chat"
												})
											]
										})
									]
								})
							})
						]
					})
				})] }),
				pharm?.contraindications ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: { borderColor: line },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						className: "damorex-heading",
						mb: "md",
						children: "Drug Information"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: {
							base: 1,
							md: 3
						},
						spacing: "lg",
						children: pharm.contraindications ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 900,
							mb: 4,
							children: "Contraindications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: muted,
							lh: 1.7,
							children: pharm.contraindications
						})] }) : null
					})]
				}) : null,
				data?.reviews && data.reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					className: "damorex-heading",
					mb: "md",
					children: "Customer Reviews"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
					gap: "sm",
					children: data.reviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						radius: 20,
						p: "md",
						withBorder: true,
						style: { borderColor: line },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "space-between",
							mb: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 800,
								children: review.name || "Anonymous"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
								value: review.rating,
								readOnly: true
							})]
						}), review.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: muted,
							lh: 1.7,
							children: review.comment
						}) : null]
					}, review.id))
				})] }) : null,
				data?.related && data.related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					className: "damorex-heading",
					mb: "md",
					children: "Related Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
					cols: {
						base: 1,
						sm: 2,
						lg: 4
					},
					spacing: "md",
					children: data.related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})] }) : null
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/shop_.$slug.tsx?tsr-split=component
var SplitComponent = ProductDetailPage;
//#endregion
export { SplitComponent as component };
