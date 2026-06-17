import { F as getRadius, M as createVarsResolver, V as rem, d as useStyles, f as useProps, i as genericFactory, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { n as getSafeId } from "./Tabs-oGU2Pok4.js";
import { t as createScopedKeydownHandler } from "./create-scoped-keydown-handler-BmWf1hwa.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useId$1 } from "./use-id-ClzfxyRT.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as Collapse } from "./Collapse-viS-xhqU.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as AccordionChevron } from "./AccordionChevron-CiIiRDF8.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { B as line, F as WebsiteLayout, H as soft, I as buttonStyles, L as darkGreen, Lr as Title, R as green, Un as Mail, V as muted, Vn as MessageCircle, z as ink } from "./index-DuM1cidb.js";
//#region node_modules/@mantine/core/esm/components/Accordion/Accordion.context.mjs
var [AccordionProvider, useAccordionContext] = createSafeContext("Accordion component was not found in the tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Accordion/AccordionItem.context.mjs
var [AccordionItemProvider, useAccordionItemContext] = createSafeContext("Accordion.Item component was not found in the tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Accordion/Accordion.module.mjs
var Accordion_module_default = {
	"root": "m_9bdbb667",
	"panel": "m_df78851f",
	"content": "m_4ba554d4",
	"itemTitle": "m_8fa820a0",
	"control": "m_4ba585b8",
	"control--default": "m_6939a5e9",
	"control--contained": "m_4271d21b",
	"label": "m_df3ffa0f",
	"chevron": "m_3f35ae96",
	"icon": "m_9bd771fe",
	"item": "m_9bd7b098",
	"item--default": "m_fe19b709",
	"item--contained": "m_1f921b3b",
	"item--filled": "m_2cdf939a",
	"item--separated": "m_9f59b069"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Accordion/AccordionControl/AccordionControl.mjs
var import_jsx_runtime = require_jsx_runtime();
var AccordionControl = factory((props) => {
	const { classNames, className, style, styles, vars, chevron, icon, onClick, onKeyDown, children, disabled, mod, ...others } = useProps("AccordionControl", null, props);
	const { value } = useAccordionItemContext();
	const ctx = useAccordionContext();
	const isActive = ctx.isItemActive(value);
	const shouldWrapWithHeading = typeof ctx.order === "number";
	const Heading = `h${ctx.order}`;
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		...ctx.getStyles("control", {
			className,
			classNames,
			style,
			styles,
			variant: ctx.variant
		}),
		unstyled: ctx.unstyled,
		mod: [
			"accordion-control",
			{
				active: isActive,
				"chevron-position": ctx.chevronPosition,
				disabled
			},
			mod
		],
		onClick: (event) => {
			onClick?.(event);
			ctx.onChange(value);
		},
		type: "button",
		disabled,
		"aria-expanded": isActive,
		"aria-controls": ctx.getRegionId(value),
		id: ctx.getControlId(value),
		onKeyDown: createScopedKeydownHandler({
			siblingSelector: "[data-accordion-control]",
			parentSelector: "[data-accordion]",
			activateOnFocus: false,
			loop: ctx.loop,
			orientation: "vertical",
			onKeyDown
		}),
		...others,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "span",
				mod: {
					rotate: !ctx.disableChevronRotation && isActive,
					position: ctx.chevronPosition
				},
				...ctx.getStyles("chevron", {
					classNames,
					styles
				}),
				children: chevron || ctx.chevron
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...ctx.getStyles("label", {
					classNames,
					styles
				}),
				children
			}),
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "span",
				mod: { "chevron-position": ctx.chevronPosition },
				...ctx.getStyles("icon", {
					classNames,
					styles
				}),
				children: icon
			})
		]
	});
	return shouldWrapWithHeading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
		...ctx.getStyles("itemTitle", {
			classNames,
			styles
		}),
		children: content
	}) : content;
});
AccordionControl.displayName = "@mantine/core/AccordionControl";
AccordionControl.classes = Accordion_module_default;
//#endregion
//#region node_modules/@mantine/core/esm/components/Accordion/AccordionItem/AccordionItem.mjs
var AccordionItem = factory((props) => {
	const { classNames, className, style, styles, vars, value, mod, ...others } = useProps("AccordionItem", null, props);
	const ctx = useAccordionContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItemProvider, {
		value: { value },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			mod: [{ active: ctx.isItemActive(value) }, mod],
			...ctx.getStyles("item", {
				className,
				classNames,
				styles,
				style,
				variant: ctx.variant
			}),
			...others
		})
	});
});
AccordionItem.displayName = "@mantine/core/AccordionItem";
AccordionItem.classes = Accordion_module_default;
//#endregion
//#region node_modules/@mantine/core/esm/components/Accordion/AccordionPanel/AccordionPanel.mjs
var AccordionPanel = factory((props) => {
	const { classNames, className, style, styles, vars, children, keepMounted, ...others } = useProps("AccordionPanel", null, props);
	const { value } = useAccordionItemContext();
	const ctx = useAccordionContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
		...ctx.getStyles("panel", {
			className,
			classNames,
			style,
			styles
		}),
		expanded: ctx.isItemActive(value),
		transitionDuration: ctx.transitionDuration ?? 200,
		role: "region",
		id: ctx.getRegionId(value),
		"aria-labelledby": ctx.getControlId(value),
		keepMounted: keepMounted ?? ctx.keepMounted,
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...ctx.getStyles("content", {
				classNames,
				styles
			}),
			children
		})
	});
});
AccordionPanel.displayName = "@mantine/core/AccordionPanel";
AccordionPanel.classes = Accordion_module_default;
//#endregion
//#region node_modules/@mantine/core/esm/components/Accordion/Accordion.mjs
var defaultProps = {
	multiple: false,
	disableChevronRotation: false,
	chevronPosition: "right",
	variant: "default",
	chevronSize: "auto",
	chevronIconSize: 16
};
var varsResolver = createVarsResolver((_, { transitionDuration, chevronSize, radius }) => ({ root: {
	"--accordion-transition-duration": transitionDuration === void 0 ? void 0 : `${transitionDuration}ms`,
	"--accordion-chevron-size": chevronSize === void 0 ? void 0 : rem(chevronSize),
	"--accordion-radius": radius === void 0 ? void 0 : getRadius(radius)
} }));
var Accordion = genericFactory((_props) => {
	const props = useProps("Accordion", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, children, multiple, value, defaultValue, onChange, id, loop, transitionDuration, disableChevronRotation, chevronPosition, chevronSize, order, chevron, variant, radius, chevronIconSize, attributes, keepMounted, ...others } = props;
	const uid = useId$1(id);
	const [_value, handleChange] = useUncontrolled({
		value,
		defaultValue,
		finalValue: multiple ? [] : null,
		onChange
	});
	const isItemActive = (itemValue) => Array.isArray(_value) ? _value.includes(itemValue) : itemValue === _value;
	const handleItemChange = (itemValue) => {
		handleChange(Array.isArray(_value) ? _value.includes(itemValue) ? _value.filter((selectedValue) => selectedValue !== itemValue) : [..._value, itemValue] : itemValue === _value ? null : itemValue);
	};
	const getStyles = useStyles({
		name: "Accordion",
		classes: Accordion_module_default,
		props,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionProvider, {
		value: {
			isItemActive,
			onChange: handleItemChange,
			getControlId: getSafeId(`${uid}-control`, "Accordion.Item component was rendered with invalid value or without value"),
			getRegionId: getSafeId(`${uid}-panel`, "Accordion.Item component was rendered with invalid value or without value"),
			chevron: chevron === null ? null : chevron || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionChevron, { size: chevronIconSize }),
			transitionDuration,
			disableChevronRotation,
			chevronPosition,
			order,
			loop,
			getStyles,
			variant,
			unstyled,
			keepMounted
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			...getStyles("root"),
			id: uid,
			...others,
			variant,
			"data-accordion": true,
			children
		})
	});
});
Accordion.classes = Accordion_module_default;
Accordion.varsResolver = varsResolver;
Accordion.displayName = "@mantine/core/Accordion";
Accordion.Item = AccordionItem;
Accordion.Panel = AccordionPanel;
Accordion.Control = AccordionControl;
Accordion.Chevron = AccordionChevron;
//#endregion
//#region src/features/damorex/pages/faq.tsx
var faqs = [
	{
		question: "How do I place an order?",
		answer: "Browse our catalogue and add medicines to your cart. At checkout, upload your prescription if required, choose your delivery address and select a payment method. After confirming your order, our pharmacists will review it and you will receive dispatch updates via SMS and WhatsApp."
	},
	{
		question: "Do I need a prescription?",
		answer: "Some medicines require a valid prescription from a licensed doctor. Prescription-only medicines (antibiotics, hypertension drugs, insulin, etc.) cannot be dispensed without one. Over-the-counter (OTC) products like vitamins, supplements, pain relievers and first aid items can be ordered freely. Our pharmacists verify each order to ensure compliance with regulatory requirements."
	},
	{
		question: "How does prescription upload work?",
		answer: "After adding items to your cart, you will be prompted to upload a clear photo or PDF of your prescription. A licensed Damorex pharmacist reviews the prescription to confirm the medicines, dosage and quantity match. If everything is correct, your order moves to dispatch. If there are any issues, our team will contact you via WhatsApp or phone to resolve them."
	},
	{
		question: "What areas do you deliver to?",
		answer: "We currently deliver across Lagos State, Ogun State and Oyo State. Coverage includes major cities and towns within these states. We are actively expanding to more regions. Enter your delivery address at checkout to confirm if we serve your location."
	},
	{
		question: "How much is delivery?",
		answer: "Delivery is free for orders above ₦10,000. For orders below ₦10,000, delivery fees range from ₦1,500 to ₦3,000 depending on your location and the delivery option selected. Express and scheduled delivery options may have different rates displayed at checkout."
	},
	{
		question: "What payment methods do you accept?",
		answer: "We accept debit and credit cards (Visa, Mastercard, Verve), bank transfers, USSD payments and cash on delivery. All online payments are processed securely through encrypted payment gateways. Your payment information is never stored on our servers."
	},
	{
		question: "How long does delivery take?",
		answer: "Same-day delivery is available for orders placed before 2 PM within select zones. Scheduled delivery allows you to pick a convenient time slot. Express dispatch is available for urgent orders at an additional fee. Standard delivery typically takes 1 to 3 business days depending on your location."
	},
	{
		question: "Can I return medicines?",
		answer: "For safety and hygiene reasons, Damorex does not accept returns or exchanges on dispensed medicines once they have left the pharmacy. If you receive a damaged, expired or incorrect product, contact our support team within 24 hours of delivery and we will investigate and resolve the issue promptly."
	},
	{
		question: "How do I consult a pharmacist?",
		answer: "You can reach our pharmacists through WhatsApp chat, phone call or by booking a consultation on our website. Our pharmacists are available to answer medication questions, provide drug information, advise on dosage and help with refill management. Typical response time is under 5 minutes on WhatsApp during business hours."
	},
	{
		question: "Is my data safe?",
		answer: "Yes. Damorex takes data privacy and security seriously. All personal information, medical records and prescription data are encrypted and stored securely in compliance with Nigerian data protection regulations. We never share your data with third parties without your explicit consent. You can read our full privacy policy for more details."
	}
];
function FaqPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			py: {
				base: 48,
				md: 72
			},
			style: {
				background: `linear-gradient(135deg, ${darkGreen} 0%, #0B4A28 50%, #0F172A 100%)`,
				color: "#fff"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 16,
					maw: 760,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 1,
						className: "damorex-heading hero-title",
						children: "Frequently Asked Questions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "lg",
						lh: 1.7,
						c: "rgba(255,255,255,0.78)",
						children: "Everything you need to know about ordering from Damorex"
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				maw: 860,
				mx: "auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					variant: "separated",
					radius: "xl",
					styles: {
						item: {
							borderColor: line,
							background: "#fff",
							marginBottom: 12,
							boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)"
						},
						control: {
							padding: "20px 24px",
							fontSize: 16,
							fontWeight: 900,
							color: ink
						},
						panel: { padding: "0 24px 24px" },
						chevron: { color: green }
					},
					children: faqs.map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion.Item, {
						value: faq.question,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion.Control, { children: faq.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion.Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: muted,
							lh: 1.7,
							children: faq.answer
						}) })]
					}, faq.question))
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			py: {
				base: 48,
				md: 64
			},
			style: { background: soft },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 20,
					align: "center",
					style: { textAlign: "center" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 2,
							className: "damorex-heading",
							c: ink,
							children: "Still have questions?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: muted,
							size: "lg",
							lh: 1.7,
							maw: 520,
							children: "Our support team and pharmacists are ready to help with any questions you may have."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							size: "md",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 18 }),
							styles: buttonStyles,
							style: { background: green },
							children: "Contact Us"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							size: "md",
							variant: "outline",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }),
							styles: buttonStyles,
							style: {
								borderColor: "#B9D9C6",
								color: darkGreen,
								background: "#fff"
							},
							onClick: () => window.open("https://wa.me/234", "_blank"),
							children: "WhatsApp Us"
						})] })
					]
				})
			})
		})
	] });
}
//#endregion
//#region src/routes/damorex/faq.tsx?tsr-split=component
var SplitComponent = FaqPage;
//#endregion
export { SplitComponent as component };
