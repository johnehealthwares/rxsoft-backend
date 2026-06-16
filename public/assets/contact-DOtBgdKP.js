import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { n as MessageCircle, t as Phone } from "./phone-MyagsAGu.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { B as muted, Bn as Mail, F as buttonStyles, I as darkGreen, Ir as ThemeIcon, L as green, P as WebsiteLayout, Pr as Title, Qn as Check, R as ink, kn as Send, lt as useSubmitContact, z as line } from "./index-BRcLwOKn.js";
import { n as PageLoader } from "./loaders-CcOWIeHC.js";
//#region src/features/damorex/contact/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [success, setSuccess] = (0, import_react.useState)(false);
	const { mutate: submit, isPending } = useSubmitContact();
	const handleSubmit = () => {
		submit({
			name,
			email,
			phone: phone || void 0,
			subject,
			message
		}, { onSuccess: () => setSuccess(true) });
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
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
					size: 64,
					color: "green",
					mx: "auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 32 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 2,
					className: "damorex-heading",
					mt: "md",
					children: "Message Sent"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					lh: 1.7,
					mt: "sm",
					children: "We'll get back to you within 24 hours."
				})
			]
		})
	}) });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
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
				children: "Contact Us"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "We're here to help. Send us a message."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				grow: true,
				align: "start",
				gap: "lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 24,
					p: "xl",
					withBorder: true,
					style: {
						borderColor: line,
						flex: 1
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
								label: "Your Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Full name",
									radius: "xl",
									value: name,
									onChange: (e) => setName(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "you@example.com",
									radius: "xl",
									value: email,
									onChange: (e) => setEmail(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
								label: "Phone (optional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "+234",
									radius: "xl",
									value: phone,
									onChange: (e) => setPhone(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
								label: "Subject",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "How can we help?",
									radius: "xl",
									value: subject,
									onChange: (e) => setSubject(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
								label: "Message",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									placeholder: "Your message...",
									radius: "xl",
									minRows: 4,
									value: message,
									onChange: (e) => setMessage(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								radius: "xl",
								size: "md",
								fullWidth: true,
								leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 18 }),
								styles: buttonStyles,
								style: { background: green },
								onClick: handleSubmit,
								loading: isPending,
								disabled: !name || !email || !subject || !message,
								children: "Send Message"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 24,
					p: "xl",
					style: {
						background: darkGreen,
						color: "#fff",
						flex: 1
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								size: "lg",
								children: "Get in Touch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 44,
									style: { background: "rgba(255,255,255,0.16)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 22 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 800,
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "rgba(255,255,255,0.76)",
									size: "sm",
									children: "+234"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 44,
									style: { background: "rgba(255,255,255,0.16)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 22 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 800,
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "rgba(255,255,255,0.76)",
									size: "sm",
									children: "info@damorex.com"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 44,
									style: { background: "rgba(255,255,255,0.16)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 22 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 800,
									children: "WhatsApp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "rgba(255,255,255,0.76)",
									size: "sm",
									children: "Chat with our team"
								})] })]
							})
						]
					})
				})]
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/contact.tsx?tsr-split=component
var SplitComponent = ContactPage;
//#endregion
export { SplitComponent as component };
