import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as UsersRound } from "./users-round-BqVBa2b5.js";
import { Lr as Title, Vn as MessageCircle, Wr as Grid } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DsBYIIU2.js";
import { a as PrimaryButton, o as SectionHeading } from "./components-C313Z28z.js";
import { u as useRegisterVolunteer } from "./hooks-BM0Vr-3Y.js";
//#region src/features/apm/volunteer/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function VolunteerPage() {
	const { mutate, isPending } = useRegisterVolunteer();
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [lga, setLga] = (0, import_react.useState)("");
	const [ward, setWard] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !phone) return;
		mutate({
			name,
			phone,
			email: email || void 0,
			lga: lga || void 0,
			ward: ward || void 0,
			skills: skills || void 0
		}, { onSuccess: () => {
			setName("");
			setPhone("");
			setEmail("");
			setLga("");
			setWard("");
			setSkills("");
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: `linear-gradient(135deg, ${soft} 0%, #DBEAFE 30%, #ffffff 100%)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Become a Volunteer",
				subtitle: "The success of this movement depends on people like you. Register and help us build a better Oyo."
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
						gap: "lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {
								size: 40,
								color: apmBlue
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								order: 3,
								style: {
									fontSize: "1.3rem",
									fontWeight: 700,
									color: ink
								},
								children: "Why Volunteer?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								gap: "sm",
								children: [
									"Be part of a movement shaping Oyo State's future",
									"Connect with like-minded citizens across all 33 LGAs",
									"Develop leadership and community organizing skills",
									"Receive campaign updates, talking points, and content packs",
									"Help ensure continuity, stability, and progress"
								].map((reason, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
										size: "sm",
										style: {
											color: apmBlue,
											fontWeight: 700
										},
										children: [i + 1, "."]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										style: { color: muted },
										children: reason
									})]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								style: {
									background: "#DCFCE7",
									borderRadius: 12,
									padding: 20
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										size: 20,
										color: "#1F8A3B"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										fw: 700,
										style: { color: "#1F8A3B" },
										children: "Join our WhatsApp Community"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										style: { color: "#166534" },
										children: "For instant updates and assignments"
									})] })]
								})
							})
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
							children: "Registration Form"
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
											label: "Phone Number *",
											placeholder: "08123456789",
											value: phone,
											onChange: (e) => setPhone(e.target.value),
											required: true,
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
									label: "Email",
									placeholder: "you@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									styles: {
										input: { borderColor: "#E2E8F0" },
										label: {
											color: ink,
											fontWeight: 500
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
									gap: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
										span: {
											base: 12,
											sm: 6
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											label: "LGA",
											placeholder: "Your Local Government Area",
											value: lga,
											onChange: (e) => setLga(e.target.value),
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
											label: "Ward",
											placeholder: "Your ward (optional)",
											value: ward,
											onChange: (e) => setWard(e.target.value),
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
									label: "Skills / Interests",
									placeholder: "e.g., community organising, social media, events, door-to-door",
									value: skills,
									onChange: (e) => setSkills(e.target.value),
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
									children: isPending ? "Registering..." : "Register as Volunteer"
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
//#region src/routes/apm/volunteer.tsx?tsr-split=component
var SplitComponent = VolunteerPage;
//#endregion
export { SplitComponent as component };
