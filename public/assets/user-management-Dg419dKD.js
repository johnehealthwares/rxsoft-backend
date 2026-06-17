import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Flex } from "./Flex-DsiVxXRs.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as AppShell } from "./AppShell-s9IVO5Ws.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as useRouter } from "./useRouter-BXm9s-pB.js";
import { t as Link } from "./link-D-damaRz.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as ArrowLeft } from "./arrow-left-BfcK4CG9.js";
import { t as Moon } from "./moon-DQvJDxDs.js";
import { t as Users } from "./users-CqLhX-NX.js";
import { Gr as Alert, Lr as Title, Pr as useNavigate, fr as Route } from "./index-DuM1cidb.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sun = createLucideIcon("sun", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "m17.66 17.66 1.41 1.41",
		key: "ptbguv"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m6.34 17.66-1.41 1.41",
		key: "1m8zz5"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}]
]);
//#endregion
//#region src/routes/clerk/_authenticated/user-management.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var users = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "Admin"
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "Editor"
	},
	{
		id: 3,
		name: "Mike Johnson",
		email: "mike@example.com",
		role: "Viewer"
	}
];
function UserManagement() {
	Route.useSearch();
	const navigate = Route.useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const token = localStorage.getItem("token");
		setTimeout(() => {
			setIsAuthenticated(!!token);
			setLoading(false);
		}, 800);
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
		h: "100vh",
		align: "center",
		justify: "center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "lg" })
	});
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unauthorized, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		padding: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
			h: "100%",
			px: "md",
			align: "center",
			justify: "space-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 4,
				children: "User Management"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
				variant: "default",
				size: "lg",
				onClick: () => setDark((v) => !v),
				children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { size: 18 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "light",
				color: "red",
				onClick: () => {
					localStorage.removeItem("token");
					navigate({ to: "/sign-in" });
				},
				children: "Sign Out"
			})] })]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell.Main, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					justify: "space-between",
					align: "center",
					wrap: "wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 2,
						children: "User List"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 6,
						mt: 4,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: "dimmed",
								children: "Manage your users and their roles here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/users",
								style: {
									color: "#228be6",
									textDecoration: "underline"
								},
								children: "Learn More"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Add User" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					withBorder: true,
					radius: "md",
					p: "md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						striped: true,
						highlightOnHover: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "ID" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Email" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "Role" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: user.id }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: user.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: user.email }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: user.role })
						] }, user.id)) })]
					})
				})]
			})
		}) })]
	});
}
var COUNTDOWN = 5;
function Unauthorized() {
	const navigate = useNavigate();
	const { history } = useRouter();
	const [cancelled, setCancelled] = (0, import_react.useState)(false);
	const [countdown, setCountdown] = (0, import_react.useState)(COUNTDOWN);
	(0, import_react.useEffect)(() => {
		if (cancelled) return;
		const interval = setInterval(() => {
			setCountdown((prev) => prev > 0 ? prev - 1 : 0);
		}, 1e3);
		return () => clearInterval(interval);
	}, [cancelled]);
	(0, import_react.useEffect)(() => {
		if (countdown === 0) navigate({ to: "/sign-in" });
	}, [countdown, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
		h: "100vh",
		align: "center",
		justify: "center",
		p: "md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			shadow: "md",
			radius: "lg",
			p: "xl",
			withBorder: true,
			maw: 500,
			w: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				align: "center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 1,
						fz: "7rem",
						children: "401"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						children: "Unauthorized Access"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						ta: "center",
						c: "dimmed",
						children: "You must sign in to access this resource."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						variant: "light",
						color: "yellow",
						title: "Authentication Required",
						w: "100%",
						children: "Sign in to continue to the protected route."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						mt: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "default",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }),
							onClick: () => history.go(-1),
							children: "Go Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => navigate({ to: "/sign-in" }),
							children: "Sign In"
						})]
					}),
					!cancelled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 4,
						align: "center",
						mt: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							children: countdown > 0 ? `Redirecting in ${countdown}s` : "Redirecting..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "subtle",
							size: "xs",
							onClick: () => setCancelled(true),
							children: "Cancel Redirect"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { UserManagement as component };
