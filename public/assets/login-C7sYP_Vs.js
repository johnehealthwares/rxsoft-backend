import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Tabs } from "./Tabs-oGU2Pok4.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Phone } from "./phone-C5YX5jYe.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { B as line, Et as useAuthStore, F as WebsiteLayout, I as buttonStyles, Lr as Title, Pr as useNavigate, R as green, Un as Mail, V as muted, or as ArrowRight, sr as Apple, vn as User, yn as UserPlus, z as ink } from "./index-DwQ-NyPQ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
//#endregion
//#region src/features/damorex/auth/login.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("login");
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [loginLoading, setLoginLoading] = (0, import_react.useState)(false);
	const [regName, setRegName] = (0, import_react.useState)("");
	const [regEmail, setRegEmail] = (0, import_react.useState)("");
	const [regPhone, setRegPhone] = (0, import_react.useState)("");
	const [regPassword, setRegPassword] = (0, import_react.useState)("");
	const [regConfirm, setRegConfirm] = (0, import_react.useState)("");
	const [regLoading, setRegLoading] = (0, import_react.useState)(false);
	const authLogin = useAuthStore((s) => s.login);
	const authRegister = useAuthStore((s) => s.register);
	const handleLogin = async () => {
		if (!loginEmail || !loginPassword) return;
		setLoginLoading(true);
		try {
			await authLogin(loginEmail, loginPassword);
			notifications.show({
				message: "Signed in successfully",
				color: "green"
			});
			navigate({ to: "/damorex" });
		} catch {
			notifications.show({
				message: "Invalid credentials. Try again.",
				color: "red"
			});
		} finally {
			setLoginLoading(false);
		}
	};
	const handleRegister = async () => {
		if (!regName || !regPassword || regPassword !== regConfirm) {
			notifications.show({
				message: "Please fill all fields and ensure passwords match.",
				color: "red"
			});
			return;
		}
		setRegLoading(true);
		try {
			await authRegister({
				username: regName,
				email: regEmail || void 0,
				phone: regPhone || void 0,
				password: regPassword
			});
			notifications.show({
				message: "Account created successfully",
				color: "green"
			});
			navigate({ to: "/damorex" });
		} catch {
			notifications.show({
				message: "Registration failed. Try again.",
				color: "red"
			});
		} finally {
			setRegLoading(false);
		}
	};
	const handleSocialLogin = (provider) => {
		console.log(`Social login with ${provider}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onChange: setTab,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.List, {
					grow: true,
					mb: "xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
						value: "login",
						fw: 800,
						children: "Sign In"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
						value: "register",
						fw: 800,
						children: "Create Account"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
					value: "login",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 30,
						p: "xl",
						withBorder: true,
						style: { borderColor: line },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 2,
									className: "damorex-heading",
									children: "Welcome Back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: muted,
									lh: 1.7,
									children: "Sign in to access your prescriptions, orders and rewards."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Email or Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "you@example.com or +234",
									radius: "xl",
									size: "md",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 18 }),
									value: loginEmail,
									onChange: (e) => setLoginEmail(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									placeholder: "Enter your password",
									radius: "xl",
									size: "md",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 18 }),
									value: loginPassword,
									onChange: (e) => setLoginPassword(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										label: "Remember me",
										color: "green",
										size: "xs"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										fw: 800,
										c: green,
										style: { cursor: "pointer" },
										onClick: () => navigate({ to: "/damorex/forgot-password" }),
										children: "Forgot password?"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									radius: "xl",
									size: "lg",
									fullWidth: true,
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 }),
									styles: buttonStyles,
									loading: loginLoading,
									style: { background: green },
									onClick: handleLogin,
									children: "Sign In"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {
									label: "or sign in with",
									labelPosition: "center"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									grow: true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "outline",
											color: "gray",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 16 }),
											styles: buttonStyles,
											onClick: () => handleSocialLogin("Google"),
											style: {
												borderColor: line,
												color: ink
											},
											children: "Google"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "outline",
											color: "gray",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Apple, { size: 16 }),
											styles: buttonStyles,
											onClick: () => handleSocialLogin("Apple"),
											style: {
												borderColor: line,
												color: ink
											},
											children: "Apple"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "outline",
											color: "gray",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "#1877F2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
											}),
											styles: buttonStyles,
											onClick: () => handleSocialLogin("Facebook"),
											style: {
												borderColor: line,
												color: ink
											},
											children: "Facebook"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {
									label: "or",
									labelPosition: "center"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									radius: "xl",
									variant: "light",
									color: "green",
									fullWidth: true,
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 18 }),
									styles: buttonStyles,
									children: "Sign in with OTP"
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
					value: "register",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 30,
						p: "xl",
						withBorder: true,
						style: { borderColor: line },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 2,
									className: "damorex-heading",
									children: "Create Account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: muted,
									lh: 1.7,
									children: "Join Damorex for faster ordering, refills and rewards."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Your full name",
									radius: "xl",
									size: "md",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 18 }),
									value: regName,
									onChange: (e) => setRegName(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "you@example.com",
									radius: "xl",
									size: "md",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 18 }),
									value: regEmail,
									onChange: (e) => setRegEmail(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "+234",
									radius: "xl",
									size: "md",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 18 }),
									value: regPhone,
									onChange: (e) => setRegPhone(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									placeholder: "Create a strong password",
									radius: "xl",
									size: "md",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 18 }),
									value: regPassword,
									onChange: (e) => setRegPassword(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Confirm Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									placeholder: "Repeat your password",
									radius: "xl",
									size: "md",
									value: regConfirm,
									onChange: (e) => setRegConfirm(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									radius: "xl",
									size: "lg",
									fullWidth: true,
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 18 }),
									styles: buttonStyles,
									loading: regLoading,
									style: { background: green },
									onClick: handleRegister,
									children: "Create Account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {
									label: "or register with",
									labelPosition: "center"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									grow: true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "outline",
											color: "gray",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 16 }),
											styles: buttonStyles,
											onClick: () => handleSocialLogin("Google"),
											style: {
												borderColor: line,
												color: ink
											},
											children: "Google"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "outline",
											color: "gray",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Apple, { size: 16 }),
											styles: buttonStyles,
											onClick: () => handleSocialLogin("Apple"),
											style: {
												borderColor: line,
												color: ink
											},
											children: "Apple"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											radius: "xl",
											variant: "outline",
											color: "gray",
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "#1877F2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
											}),
											styles: buttonStyles,
											onClick: () => handleSocialLogin("Facebook"),
											style: {
												borderColor: line,
												color: ink
											},
											children: "Facebook"
										})
									]
								})
							]
						})
					})
				})
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/login.tsx?tsr-split=component
var SplitComponent = AuthPage;
//#endregion
export { SplitComponent as component };
