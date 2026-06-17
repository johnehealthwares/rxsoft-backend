import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Progress } from "./Progress-fJwpknH9.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as ArrowLeft } from "./arrow-left-BfcK4CG9.js";
import { t as FileUp } from "./file-up-B7FXjQGu.js";
import { t as Package } from "./package-Cis-Q__o.js";
import { t as TriangleAlert } from "./triangle-alert-MgdfjtL6.js";
import { At as useChatbotStore, B as line, Bn as MessageSquare, Br as Stepper, Ct as WEBSITE_PRESCRIPTION_PHONE, Dn as ShoppingCart, Et as useAuthStore, F as WebsiteLayout, Gr as Alert, H as soft, Hn as MapPin, I as buttonStyles, In as Pill, L as darkGreen, Lr as Title, Pr as useNavigate, Q as useCreateOrder, R as green, St as QUESTIONNAIRE_CODES, Tt as toHL7Prescription, U as useCartStore, Ur as Image, V as muted, Vn as MessageCircle, Wr as Grid, Yn as CreditCard, et as useDeliveryAreas, or as ArrowRight, tr as Check, wn as Stethoscope, wt as buildWhatsAppUrl, xn as Truck, z as ink, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShoppingBag = createLucideIcon("shopping-bag", [
	["path", {
		d: "M16 10a4 4 0 0 1-8 0",
		key: "1ltviw"
	}],
	["path", {
		d: "M3.103 6.034h17.794",
		key: "awc11p"
	}],
	["path", {
		d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
		key: "o988cm"
	}]
]);
//#endregion
//#region src/features/damorex/checkout/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
function isRxRequired(id) {
	return productInfo[id]?.isRx || false;
}
function getMockPrice2(id) {
	return productPrices[id] || 2500;
}
function formatPrice(n) {
	return `₦${n.toLocaleString()}`;
}
var mockDeliveryAreas = [
	{
		id: "da-1",
		state: "Lagos",
		city: "Ikeja",
		deliveryFee: 1e3,
		minOrderAmount: 0,
		freeDeliveryAbove: 1e4,
		estimatedDeliveryHours: 24
	},
	{
		id: "da-2",
		state: "Lagos",
		city: "Lekki",
		deliveryFee: 1500,
		minOrderAmount: 0,
		freeDeliveryAbove: 1e4,
		estimatedDeliveryHours: 48
	},
	{
		id: "da-3",
		state: "Lagos",
		city: "Victoria Island",
		deliveryFee: 1500,
		minOrderAmount: 0,
		freeDeliveryAbove: 1e4,
		estimatedDeliveryHours: 24
	},
	{
		id: "da-4",
		state: "Ogun",
		city: "Abeokuta",
		deliveryFee: 2e3,
		minOrderAmount: 0,
		freeDeliveryAbove: 15e3,
		estimatedDeliveryHours: 72
	},
	{
		id: "da-5",
		state: "Oyo",
		city: "Ibadan",
		deliveryFee: 2e3,
		minOrderAmount: 0,
		freeDeliveryAbove: 15e3,
		estimatedDeliveryHours: 72
	}
];
function CheckoutPage() {
	const { items, totalItems, clearCart } = useCartStore();
	const { isAuthenticated } = useAuthStore();
	const { mutate: placeOrder, isPending } = useCreateOrder();
	const { data: deliveryAreasData, isLoading: areasLoading } = useDeliveryAreas();
	const navigate = useNavigate();
	const deliveryAreas = deliveryAreasData && deliveryAreasData.length > 0 ? deliveryAreasData : mockDeliveryAreas;
	const [step, setStep] = (0, import_react.useState)(0);
	const [address, setAddress] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [state_, setState_] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [deliveryAreaId, setDeliveryAreaId] = (0, import_react.useState)(null);
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("Card");
	const [promoCode, setPromoCode] = (0, import_react.useState)("");
	const [placedOrder, setPlacedOrder] = (0, import_react.useState)(null);
	const selectedArea = deliveryAreas.find((a) => a.id === deliveryAreaId);
	const subtotal = items.reduce((sum, i) => sum + getMockPrice2(i.productId) * i.quantity, 0);
	const deliveryFee = selectedArea ? subtotal >= (selectedArea.freeDeliveryAbove || Infinity) ? 0 : selectedArea.deliveryFee : subtotal >= 1e4 ? 0 : 1500;
	const total = subtotal + deliveryFee;
	const rxItems = items.filter((i) => isRxRequired(i.productId));
	const canGoNext = () => {
		switch (step) {
			case 0: return items.length > 0;
			case 1: return !!address && !!city && !!state_ && !!phone && !!deliveryAreaId;
			case 2: return true;
			case 3: return !!paymentMethod;
			default: return true;
		}
	};
	const handlePlaceOrder = () => {
		placeOrder({
			deliveryAddress: address,
			city,
			state: state_,
			phone,
			paymentMethod: paymentMethod || "Card",
			shippingMethod: "standard",
			notes: promoCode ? `Promo: ${promoCode}` : void 0
		}, {
			onSuccess: (order) => {
				clearCart();
				setPlacedOrder(order);
				setStep(4);
			},
			onError: () => {
				setStep(4);
				setPlacedOrder({
					id: "ERR",
					code: `DMX-${Date.now().toString(36).toUpperCase()}`,
					deliveryAddress: address,
					city,
					state: state_,
					phone,
					paymentMethod: paymentMethod || "Card",
					status: "Pending",
					notes: null,
					createdAt: (/* @__PURE__ */ new Date()).toISOString(),
					lines: []
				});
			}
		});
	};
	if (step === 4 && placedOrder) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
		py: 80,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
			radius: 30,
			p: "xl",
			withBorder: true,
			style: {
				borderColor: line,
				textAlign: "center"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
					radius: "xl",
					size: 72,
					color: "green",
					mx: "auto",
					style: { background: green },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 36 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 2,
					className: "damorex-heading",
					mt: "lg",
					children: "Order Placed!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					lh: 1.7,
					mt: "sm",
					maw: 420,
					mx: "auto",
					children: "Your order has been placed successfully. You'll receive tracking updates via SMS and WhatsApp."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 16,
					p: "md",
					mt: "lg",
					withBorder: true,
					style: {
						borderColor: line,
						background: soft,
						display: "inline-block"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 4,
						align: "center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							c: muted,
							tt: "uppercase",
							fw: 700,
							children: "Order Number"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 950,
							size: "xl",
							style: {
								color: darkGreen,
								letterSpacing: "0.02em"
							},
							children: placedOrder.code
						})]
					})
				}),
				selectedArea ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "center",
					mt: "md",
					gap: "xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
						size: 14,
						color: muted
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "sm",
						c: muted,
						children: [
							"Estimated delivery: ",
							selectedArea.estimatedDeliveryHours || 48,
							" hours"
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "center",
					mt: "xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						radius: "xl",
						color: "green",
						styles: buttonStyles,
						style: { background: green },
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 18 }),
						onClick: () => navigate({ to: "/damorex/orders" }),
						children: "Track Order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						radius: "xl",
						variant: "light",
						color: "green",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 18 }),
						onClick: () => navigate({ to: "/damorex/shop" }),
						children: "Continue Shopping"
					})]
				})
			]
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
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
					children: "Checkout"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					c: muted,
					size: "lg",
					lh: 1.7,
					children: [
						totalItems,
						" item",
						totalItems !== 1 ? "s" : "",
						" · Complete your order"
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stepper, {
					active: step,
					onStepClick: setStep,
					color: "green",
					radius: "lg",
					size: "sm",
					allowNextStepsSelect: false,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper.Step, {
							label: "Cart Review",
							description: "Review items"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper.Step, {
							label: "Delivery",
							description: "Address & area"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper.Step, {
							label: "Prescription",
							description: "Validate Rx"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper.Step, {
							label: "Payment",
							description: "Pay"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper.Step, {
							label: "Confirmation",
							description: "Done"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: (step + 1) / 5 * 100,
					color: "green",
					size: "sm",
					radius: "xl"
				}),
				!isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: {
						borderColor: line,
						textAlign: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
							radius: "xl",
							size: 56,
							color: "green",
							variant: "light",
							mx: "auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 24 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 900,
							mt: "md",
							size: "lg",
							children: "Sign in to continue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: muted,
							size: "sm",
							mt: 4,
							children: "Please sign in to proceed with checkout."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							mt: "lg",
							color: "green",
							styles: buttonStyles,
							style: { background: green },
							onClick: () => navigate({ to: "/damorex/login" }),
							children: "Sign In"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCartReview, {
						items,
						subtotal,
						totalItems
					}),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepDeliveryDetails, {
						address,
						setAddress,
						city,
						setCity,
						state_,
						setState_,
						phone,
						setPhone,
						deliveryAreaId,
						setDeliveryAreaId,
						deliveryAreas,
						areasLoading,
						selectedArea,
						items
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPrescriptionValidation, { rxItems }),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPayment, {
						paymentMethod,
						setPaymentMethod,
						promoCode,
						setPromoCode,
						items,
						subtotal,
						deliveryFee,
						total,
						totalItems
					})
				] }),
				isAuthenticated && step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "space-between",
					mt: "lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						radius: "xl",
						variant: "light",
						color: "gray",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 18 }),
						onClick: () => {
							if (step === 0) navigate({ to: "/damorex/cart" });
							else setStep(step - 1);
						},
						disabled: step === 3 && isPending,
						children: step === 0 ? "Back to Cart" : "Previous"
					}), step < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						radius: "xl",
						color: "green",
						rightSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 }),
						styles: buttonStyles,
						style: { background: green },
						onClick: () => setStep(step + 1),
						disabled: !canGoNext(),
						children: "Continue"
					}) : step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						radius: "xl",
						size: "lg",
						color: "green",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 18 }),
						styles: buttonStyles,
						style: { background: green },
						onClick: handlePlaceOrder,
						loading: isPending,
						disabled: !canGoNext(),
						children: ["Place Order · ", formatPrice(total)]
					}) : null]
				}) : null
			]
		})
	}) });
}
function StepCartReview({ items, subtotal, totalItems }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		radius: 24,
		p: "xl",
		withBorder: true,
		style: { borderColor: line },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: 6,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
						size: 20,
						color: green
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 900,
						size: "lg",
						children: "Cart Review"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				items.map((item) => {
					const rx = isRxRequired(item.productId);
					const price = getMockPrice2(item.productId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						wrap: "nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "md",
							wrap: "nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: "https://placehold.co/56x56/16A34A/white?text=Rx",
								alt: getProductName(item.productId),
								w: 48,
								h: 48,
								fit: "contain",
								style: {
									borderRadius: 10,
									background: "#F1F8F4",
									border: `1px solid ${line}`
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: 4,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 800,
									size: "sm",
									children: getProductName(item.productId)
								}), rx ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									color: "orange",
									variant: "light",
									size: "xs",
									radius: "xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { size: 8 }), " Rx"]
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								c: muted,
								children: getProductGeneric(item.productId)
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "lg",
							wrap: "nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "sm",
								c: muted,
								children: ["x", item.quantity]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 800,
								style: {
									minWidth: 70,
									textAlign: "right"
								},
								children: formatPrice(price * item.quantity)
							})]
						})]
					}, item.productId);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "space-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						c: muted,
						children: [
							"Subtotal (",
							totalItems,
							" items)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 800,
						children: formatPrice(subtotal)
					})]
				})
			]
		})
	});
}
function StepDeliveryDetails({ address, setAddress, city, setCity, state_, setState_, phone, setPhone, deliveryAreaId, setDeliveryAreaId, deliveryAreas, areasLoading, selectedArea, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		radius: 24,
		p: "xl",
		withBorder: true,
		style: { borderColor: line },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: 6,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						size: 20,
						color: green
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 900,
						size: "lg",
						children: "Delivery Details"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					label: "Street Address",
					placeholder: "House number, street name",
					radius: "xl",
					value: address,
					onChange: (e) => setAddress(e.currentTarget.value),
					styles: { input: { borderColor: line } }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "City",
						placeholder: "Lagos",
						radius: "xl",
						value: city,
						onChange: (e) => setCity(e.currentTarget.value),
						styles: { input: { borderColor: line } }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "State",
						placeholder: "Lagos",
						radius: "xl",
						value: state_,
						onChange: (e) => setState_(e.currentTarget.value),
						styles: { input: { borderColor: line } }
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					label: "Phone Number",
					placeholder: "+234 800 000 0000",
					radius: "xl",
					value: phone,
					onChange: (e) => setPhone(e.currentTarget.value),
					styles: { input: { borderColor: line } }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					label: "Delivery Area",
					placeholder: areasLoading ? "Loading areas..." : "Select your delivery area",
					data: deliveryAreas.map((a) => ({
						value: a.id,
						label: `${a.city}, ${a.state} — ${formatPrice(a.deliveryFee)} fee`
					})),
					value: deliveryAreaId,
					onChange: setDeliveryAreaId,
					radius: "xl",
					searchable: true,
					nothingFoundMessage: "No areas found"
				}),
				selectedArea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 16,
					p: "md",
					withBorder: true,
					style: {
						borderColor: line,
						background: soft
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
							radius: "xl",
							color: "green",
							variant: "light",
							size: "md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 800,
								size: "sm",
								children: "Estimated Delivery Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: muted,
								children: selectedArea.estimatedDeliveryHours ? `${selectedArea.estimatedDeliveryHours} hours` : "1-3 business days"
							}),
							selectedArea.freeDeliveryAbove && subtotalValue(items) >= selectedArea.freeDeliveryAbove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								c: green,
								children: "Free delivery applies"
							}) : null
						] })]
					})
				}) : null,
				!areasLoading && deliveryAreas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }),
					color: "orange",
					variant: "light",
					radius: "lg",
					children: "No delivery areas loaded. Using default rates."
				}) : null
			]
		})
	});
}
function subtotalValue(items) {
	return items.reduce((sum, i) => sum + getMockPrice2(i.productId) * i.quantity, 0);
}
function StepPrescriptionValidation({ rxItems }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		radius: 24,
		p: "xl",
		withBorder: true,
		style: { borderColor: line },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: 6,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, {
						size: 20,
						color: green
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 900,
						size: "lg",
						children: "Prescription Validation"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				rxItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 16,
					p: "md",
					withBorder: true,
					style: {
						borderColor: line,
						background: soft
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
							radius: "xl",
							color: "green",
							variant: "light",
							size: "md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 800,
							size: "sm",
							children: "No prescription-required items"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							c: muted,
							children: "All items in your cart are over-the-counter."
						})] })]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						c: muted,
						children: "The following items require a valid prescription. Please upload your prescription or contact a pharmacist for assistance."
					}),
					rxItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						wrap: "nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "sm",
							wrap: "nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								color: "orange",
								variant: "light",
								size: "md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 800,
								size: "sm",
								children: getProductName(item.productId)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "xs",
								c: muted,
								children: ["Qty: ", item.quantity]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							color: "orange",
							variant: "light",
							radius: "xl",
							children: "Prescription Required"
						})]
					}, item.productId)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							color: "green",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 18 }),
							styles: buttonStyles,
							style: { background: green },
							onClick: () => navigate({ to: "/damorex/upload-prescription" }),
							children: "Upload Prescription"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							variant: "light",
							color: "green",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }),
							onClick: () => {
								const cart = useCartStore.getState().items;
								const hl7 = cart.map((ci) => ci.product).filter(Boolean).length > 0 ? toHL7Prescription(cart, { questionnaireCode: QUESTIONNAIRE_CODES.PHARMACY_ORDER }) : "";
								window.open(buildWhatsAppUrl(hl7, WEBSITE_PRESCRIPTION_PHONE, QUESTIONNAIRE_CODES.PHARMACY_ORDER), "_blank");
							},
							children: "Contact Pharmacist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							variant: "filled",
							color: "blue",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 18 }),
							onClick: () => {
								const cart = useCartStore.getState().items;
								const hl7 = cart.length > 0 ? toHL7Prescription(cart, { questionnaireCode: QUESTIONNAIRE_CODES.PHARMACY_ORDER }) : "";
								useChatbotStore.getState().openWith(hl7, QUESTIONNAIRE_CODES.PHARMACY_ORDER);
							},
							children: "Chat"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { size: 16 }),
						color: "blue",
						variant: "light",
						radius: "lg",
						children: "Our pharmacists will review your prescription and may contact you for clarification."
					})
				] })
			]
		})
	});
}
function StepPayment({ paymentMethod, setPaymentMethod, promoCode, setPromoCode, items, subtotal, deliveryFee, total, totalItems }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
		span: {
			base: 12,
			md: 7
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			radius: 24,
			p: "xl",
			withBorder: true,
			style: { borderColor: line },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
							size: 20,
							color: green
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 900,
							size: "lg",
							children: "Payment Method"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Select payment method",
						data: [
							{
								value: "Card",
								label: "Card Payment (Paystack)"
							},
							{
								value: "Transfer",
								label: "Bank Transfer"
							},
							{
								value: "COD",
								label: "Cash on Delivery"
							}
						],
						value: paymentMethod,
						onChange: setPaymentMethod,
						radius: "xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 800,
						size: "sm",
						children: "Promo Code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Enter promo code",
						radius: "xl",
						value: promoCode,
						onChange: (e) => setPromoCode(e.currentTarget.value),
						styles: { input: { borderColor: line } },
						rightSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xs",
							radius: "xl",
							color: "green",
							variant: "light",
							style: { marginRight: 4 },
							children: "Apply"
						})
					})
				]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
		span: {
			base: 12,
			md: 5
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
					items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							c: muted,
							children: [
								getProductName(item.productId),
								" x",
								item.quantity
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 700,
							size: "sm",
							children: formatPrice(getMockPrice2(item.productId) * item.quantity)
						})]
					}, item.productId)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: muted,
							children: "Subtotal"
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
					})
				]
			})
		})
	})] });
}
//#endregion
//#region src/routes/damorex/checkout.tsx?tsr-split=component
var SplitComponent = CheckoutPage;
//#endregion
export { SplitComponent as component };
