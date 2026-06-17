import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Phone } from "./phone-C5YX5jYe.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { Hn as MapPin, Lr as Title, Un as Mail, Wr as Grid } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DZbjExJ-.js";
import { a as PrimaryButton, o as SectionHeading } from "./components-C9goD9gK.js";
import { d as useSubmitContact } from "./hooks-BXmKE04t.js";
//#region src/features/apm/contact/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { mutate, isPending } = useSubmitContact();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !email || !subject || !message) return;
		mutate({
			name,
			email,
			phone: phone || void 0,
			subject,
			message
		}, { onSuccess: () => {
			setName("");
			setEmail("");
			setPhone("");
			setSubject("");
			setMessage("");
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: `linear-gradient(135deg, ${soft} 0%, #DBEAFE 30%, #ffffff 100%)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Contact Us",
				subtitle: "Have questions, suggestions, or want to get involved? We'd love to hear from you."
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: "#fff" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
				gap: 48,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						md: 5
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								mb: "xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									size: 20,
									color: apmBlue
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 600,
									style: { color: ink },
									children: "Phone"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								style: { color: muted },
								children: "0800-CALL-APM"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								mb: "xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									size: 20,
									color: apmBlue
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 600,
									style: { color: ink },
									children: "Email"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								style: { color: muted },
								children: "contact@adekanmbi2027.apm.ng"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								mb: "xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									size: 20,
									color: apmBlue
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 600,
									style: { color: ink },
									children: "Campaign Headquarters"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								style: { color: muted },
								children: "Ibadan, Oyo State, Nigeria"
							})] })
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						md: 7
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						component: "form",
						onSubmit: handleSubmit,
						style: {
							padding: 40,
							borderRadius: 16,
							border: "1px solid #E2E8F0",
							background: "#fff"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 3,
							style: {
								fontSize: "1.2rem",
								fontWeight: 700,
								color: ink,
								marginBottom: 24
							},
							children: "Send a Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
									gap: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
										span: {
											base: 12,
											sm: 6
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											label: "Full Name *",
											placeholder: "Your full name",
											value: name,
											onChange: (e) => setName(e.target.value),
											required: true,
											styles: {
												input: { borderColor: "#E2E8F0" },
												label: {
													color: ink,
													fontWeight: 500
												}
											}
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
										span: {
											base: 12,
											sm: 6
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											label: "Email *",
											placeholder: "you@example.com",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											required: true,
											type: "email",
											styles: {
												input: { borderColor: "#E2E8F0" },
												label: {
													color: ink,
													fontWeight: 500
												}
											}
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: "Phone",
									placeholder: "08123456789",
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									styles: {
										input: { borderColor: "#E2E8F0" },
										label: {
											color: ink,
											fontWeight: 500
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: "Subject *",
									placeholder: "What is this about?",
									value: subject,
									onChange: (e) => setSubject(e.target.value),
									required: true,
									styles: {
										input: { borderColor: "#E2E8F0" },
										label: {
											color: ink,
											fontWeight: 500
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									label: "Message *",
									placeholder: "Write your message here...",
									value: message,
									onChange: (e) => setMessage(e.target.value),
									required: true,
									minRows: 4,
									styles: {
										input: { borderColor: "#E2E8F0" },
										label: {
											color: ink,
											fontWeight: 500
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
									onClick: handleSubmit,
									children: isPending ? "Sending..." : "Send Message"
								})
							]
						})]
					})
				})]
			})
		})
	})] });
}
//#endregion
//#region src/routes/apm/contact.tsx?tsr-split=component
var SplitComponent = ContactPage;
//#endregion
export { SplitComponent as component };
