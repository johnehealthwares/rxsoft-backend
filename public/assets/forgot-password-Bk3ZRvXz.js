import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as ArrowLeft } from "./arrow-left-BfcK4CG9.js";
import { B as line, F as WebsiteLayout, I as buttonStyles, Lr as Title, Pr as useNavigate, R as green, Un as Mail, V as muted, tr as Check, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
//#region src/features/damorex/auth/forgot-password.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
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
					children: "Check Your Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					c: muted,
					lh: 1.7,
					mt: "sm",
					children: [
						"If an account exists for ",
						email,
						", you'll receive a reset link."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					radius: "xl",
					mt: "lg",
					variant: "light",
					color: "green",
					onClick: () => navigate({ to: "/damorex/login" }),
					children: "Back to Sign In"
				})
			]
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
		py: 80,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			radius: 30,
			p: "xl",
			withBorder: true,
			style: { borderColor: line },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "subtle",
						color: "gray",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 18 }),
						onClick: () => navigate({ to: "/damorex/login" }),
						styles: buttonStyles,
						children: "Back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 2,
						className: "damorex-heading",
						children: "Reset Password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						c: muted,
						lh: 1.7,
						children: "Enter your email address and we'll send a reset link."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Wrapper, {
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "you@example.com",
							radius: "xl",
							size: "md",
							value: email,
							onChange: (e) => setEmail(e.currentTarget.value),
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 18 }),
							styles: { input: { borderColor: "#CFE5D7" } }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						radius: "xl",
						size: "lg",
						fullWidth: true,
						styles: buttonStyles,
						style: { background: green },
						onClick: () => setSent(true),
						disabled: !email,
						children: "Send Reset Link"
					})
				]
			})
		})
	}) });
}
//#endregion
//#region src/routes/damorex/forgot-password.tsx?tsr-split=component
var SplitComponent = ForgotPasswordPage;
//#endregion
export { SplitComponent as component };
