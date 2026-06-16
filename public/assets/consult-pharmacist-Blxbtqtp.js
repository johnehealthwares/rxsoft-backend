import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { n as MessageCircle, t as Phone } from "./phone-MyagsAGu.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as CalendarClock } from "./calendar-clock-B1k3tdZz.js";
import { t as Video } from "./video-D3Fnvoza.js";
import { B as muted, F as buttonStyles, Ir as ThemeIcon, L as green, P as WebsiteLayout, Pr as Title, Qn as Check, R as ink, X as useCreateConsultation, z as line } from "./index-BRcLwOKn.js";
import { t as ConsultationLoader } from "./loaders-CcOWIeHC.js";
//#region src/features/damorex/consultations/book.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function BookConsultationPage() {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [symptoms, setSymptoms] = (0, import_react.useState)("");
	const [questions, setQuestions] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("WhatsApp");
	const [success, setSuccess] = (0, import_react.useState)(false);
	const { mutate: submit, isPending } = useCreateConsultation();
	const handleSubmit = () => {
		submit({
			name,
			phone,
			email: email || void 0,
			symptoms: symptoms || void 0,
			questions: questions || void 0,
			channel: channel || void 0
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
					children: "Consultation Booked"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					c: muted,
					lh: 1.7,
					mt: "sm",
					children: [
						"A pharmacist will contact you via ",
						channel,
						" shortly."
					]
				})
			]
		})
	}) });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultationLoader, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
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
				children: "Consult a Pharmacist"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "Get professional medication advice and wellness support."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				radius: 30,
				p: "xl",
				withBorder: true,
				style: { borderColor: line },
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
							label: "Phone Number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "+234",
								radius: "xl",
								value: phone,
								onChange: (e) => setPhone(e.currentTarget.value),
								styles: { input: { borderColor: "#CFE5D7" } }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
							label: "Email (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "you@example.com",
								radius: "xl",
								value: email,
								onChange: (e) => setEmail(e.currentTarget.value),
								styles: { input: { borderColor: "#CFE5D7" } }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
							label: "Symptoms (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								placeholder: "Describe your symptoms...",
								radius: "xl",
								minRows: 3,
								value: symptoms,
								onChange: (e) => setSymptoms(e.currentTarget.value),
								styles: { input: { borderColor: "#CFE5D7" } }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
							label: "Questions (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								placeholder: "What would you like to ask the pharmacist?",
								radius: "xl",
								minRows: 3,
								value: questions,
								onChange: (e) => setQuestions(e.currentTarget.value),
								styles: { input: { borderColor: "#CFE5D7" } }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 800,
							size: "sm",
							children: "Preferred Communication"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { children: [
							"WhatsApp",
							"Phone",
							"Video Call"
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							radius: "xl",
							size: "lg",
							color: channel === c ? "green" : "gray",
							variant: channel === c ? "filled" : "light",
							style: { cursor: "pointer" },
							leftSection: c === "WhatsApp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 14 }) : c === "Phone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 14 }),
							onClick: () => setChannel(c),
							children: c
						}, c)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							size: "lg",
							fullWidth: true,
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 18 }),
							styles: buttonStyles,
							style: { background: green },
							onClick: handleSubmit,
							loading: isPending,
							disabled: !name || !phone,
							children: "Book Consultation"
						})
					]
				})
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/consult-pharmacist.tsx?tsr-split=component
var SplitComponent = BookConsultationPage;
//#endregion
export { SplitComponent as component };
