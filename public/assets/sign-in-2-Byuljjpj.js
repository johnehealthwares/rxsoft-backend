import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as Link } from "./link-D-damaRz.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { Ar as useAuthStore, O as u, Vr as PasswordInput, _r as object, gn as useForm, vr as string } from "./index-DwQ-NyPQ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogIn = createLucideIcon("log-in", [
	["path", {
		d: "m10 17 5-5-5-5",
		key: "1bsop3"
	}],
	["path", {
		d: "M15 12H3",
		key: "6jk70r"
	}],
	["path", {
		d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
		key: "u53s6r"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Logs = createLucideIcon("logs", [
	["path", {
		d: "M3 5h1",
		key: "1mv5vm"
	}],
	["path", {
		d: "M3 12h1",
		key: "lp3yf2"
	}],
	["path", {
		d: "M3 19h1",
		key: "w6f3n9"
	}],
	["path", {
		d: "M8 5h1",
		key: "1nxr5w"
	}],
	["path", {
		d: "M8 12h1",
		key: "1con00"
	}],
	["path", {
		d: "M8 19h1",
		key: "k7p10e"
	}],
	["path", {
		d: "M13 5h8",
		key: "a7qcls"
	}],
	["path", {
		d: "M13 12h8",
		key: "h98zly"
	}],
	["path", {
		d: "M13 19h8",
		key: "c3s6r1"
	}]
]);
//#endregion
//#region src/features/auth/sign-in/assets/dashboard-dark.png
var dashboard_dark_default = "/assets/dashboard-dark-XXx_X8s4.png";
//#endregion
//#region src/features/auth/sign-in/assets/dashboard-light.png
var dashboard_light_default = "/assets/dashboard-light-P68E3aSp.png";
//#endregion
//#region src/features/auth/sign-in/components/user-auth-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var formSchema = object({
	username: string().min(1, "Please enter your username"),
	password: string().min(1, "Please enter your password")
});
function UserAuthForm({ className, redirectTo, ...props }) {
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const login = useAuthStore((state) => state.login);
	const error = useAuthStore((state) => state.error);
	const form = useForm({
		resolver: u(formSchema),
		defaultValues: {
			username: "admin",
			password: "test"
		}
	});
	async function onSubmit(data) {
		setIsLoading(true);
		await login(data.username, data.password);
		setIsLoading(false);
		if (useAuthStore.getState().user) window.location.href = redirectTo || "/";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		onSubmit: form.handleSubmit(onSubmit),
		className,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					label: "Username",
					placeholder: "admin",
					...form.register("username"),
					error: form.formState.errors.username?.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { position: "relative" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
						label: "Password",
						placeholder: "********",
						...form.register("password"),
						error: form.formState.errors.password?.message
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						style: {
							position: "absolute",
							right: 0,
							top: 0,
							fontSize: 12,
							color: "var(--mantine-color-dimmed)"
						},
						children: "Forgot password?"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: "red",
					size: "sm",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: isLoading,
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { size: 16 }),
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {
					label: "Or continue with",
					labelPosition: "center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					grow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "GitHub"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Facebook"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/features/auth/sign-in/sign-in-2.tsx
function SignIn2() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logs, { className: "me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-medium",
						children: "RxSoft Admin"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-sm flex-col justify-center space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col space-y-2 text-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold tracking-tight",
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Enter your email and password below ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"to log into your account"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAuthForm, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-8 text-center text-sm text-muted-foreground",
						children: [
							"By clicking sign in, you agree to our",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/terms",
								className: "underline underline-offset-4 hover:text-primary",
								children: "Terms of Service"
							}),
							" ",
							"and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/privacy",
								className: "underline underline-offset-4 hover:text-primary",
								children: "Privacy Policy"
							}),
							"."
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-full overflow-hidden bg-muted max-lg:hidden [&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: dashboard_light_default,
				className: "dark:hidden",
				width: 1024,
				height: 1151,
				alt: "RxSoft-Admin"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: dashboard_dark_default,
				className: "hidden dark:block",
				width: 1024,
				height: 1138,
				alt: "RxSoft-Admin"
			})]
		})]
	});
}
//#endregion
//#region src/routes/(auth)/sign-in-2.tsx?tsr-split=component
var SplitComponent = SignIn2;
//#endregion
export { SplitComponent as component };
