import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { M as createVarsResolver, R as getSpacing, d as useStyles, f as useProps, n as polymorphicFactory, t as Box } from "./Box-7OfPvxF3.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as Collapse } from "./Collapse-viS-xhqU.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Tooltip } from "./Tooltip-Ta-fBfrz.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as AccordionChevron } from "./AccordionChevron-CiIiRDF8.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { n as useLocation, t as Radio } from "./radio-DYQKZT7J.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as Activity } from "./activity-BM4mJHEH.js";
import { t as ArrowLeft } from "./arrow-left-BfcK4CG9.js";
import { t as Bell } from "./bell-BuQOfW8j.js";
import { t as FileText } from "./file-text-ZMRlE-dq.js";
import { t as Menu } from "./menu-cuEt1kgn.js";
import { t as Route } from "./route-CpdHfZn0.js";
import { t as Shield } from "./shield-ExkQp_iG.js";
import { t as Users } from "./users-CqLhX-NX.js";
import { Lr as Title, Nr as Outlet, Pr as useNavigate, Vn as MessageCircle, _n as X, nr as ChartColumn } from "./index-DwQ-NyPQ.js";
//#region node_modules/@mantine/core/esm/components/NavLink/NavLink.module.mjs
var NavLink_module_default = {
	"root": "m_f0824112",
	"description": "m_57492dcc",
	"section": "m_690090b5",
	"label": "m_1f6ac4c4",
	"body": "m_f07af9d2",
	"children": "m_e17b862f",
	"chevron": "m_1fd8a00b"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/NavLink/NavLink.mjs
var import_jsx_runtime = require_jsx_runtime();
var varsResolver = createVarsResolver((theme, { variant, color, childrenOffset, autoContrast }) => {
	const colors = theme.variantColorResolver({
		color: color || theme.primaryColor,
		theme,
		variant: variant || "light",
		autoContrast
	});
	return {
		root: {
			"--nl-bg": color || variant ? colors.background : void 0,
			"--nl-hover": color || variant ? colors.hover : void 0,
			"--nl-color": color || variant ? colors.color : void 0
		},
		children: { "--nl-offset": getSpacing(childrenOffset) }
	};
});
var NavLink = polymorphicFactory((_props) => {
	const props = useProps("NavLink", null, _props);
	const { classNames, className, style, styles, unstyled, vars, opened, defaultOpened, onChange, children, active, disabled, leftSection, rightSection, label, description, disableRightSectionRotation, noWrap, childrenOffset, autoContrast, mod, attributes, onClick, onKeyDown, keepMounted, ...others } = props;
	const getStyles = useStyles({
		name: "NavLink",
		props,
		classes: NavLink_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	const [_opened, setOpened] = useUncontrolled({
		value: opened,
		defaultValue: defaultOpened,
		finalValue: false,
		onChange
	});
	const withChildren = !!children;
	const handleClick = (event) => {
		onClick?.(event);
		if (withChildren) {
			event.preventDefault();
			setOpened(!_opened);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnstyledButton, {
		...getStyles("root"),
		component: "a",
		onClick: handleClick,
		onKeyDown: (event) => {
			onKeyDown?.(event);
			if (event.nativeEvent.code === "Space" && withChildren) {
				event.preventDefault();
				setOpened(!_opened);
			}
		},
		unstyled,
		mod: [{
			disabled,
			active,
			expanded: _opened
		}, mod],
		...others,
		children: [
			leftSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "span",
				...getStyles("section"),
				mod: { position: "left" },
				children: leftSection
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				...getStyles("body"),
				mod: { "no-wrap": noWrap },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					component: "span",
					...getStyles("label"),
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					component: "span",
					mod: { active },
					...getStyles("description"),
					children: description
				})]
			}),
			(withChildren || rightSection !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				...getStyles("section"),
				component: "span",
				mod: {
					rotate: _opened && !disableRightSectionRotation,
					position: "right"
				},
				children: withChildren ? rightSection !== void 0 ? rightSection : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionChevron, { ...getStyles("chevron") }) : rightSection
			})
		]
	}), withChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
		expanded: _opened,
		keepMounted,
		...getStyles("collapse"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...getStyles("children"),
			children
		})
	})] });
});
NavLink.classes = NavLink_module_default;
NavLink.varsResolver = varsResolver;
NavLink.displayName = "@mantine/core/NavLink";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Footprints = createLucideIcon("footprints", [
	["path", {
		d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
		key: "1dudjm"
	}],
	["path", {
		d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
		key: "l2t8xc"
	}],
	["path", {
		d: "M16 17h4",
		key: "1dejxt"
	}],
	["path", {
		d: "M4 13h4",
		key: "1bwh8b"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var HeartHandshake = createLucideIcon("heart-handshake", [["path", {
	d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
	key: "17lmqv"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Map = createLucideIcon("map", [
	["path", {
		d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
		key: "169xi5"
	}],
	["path", {
		d: "M15 5.764v15",
		key: "1pn4in"
	}],
	["path", {
		d: "M9 3.236v15",
		key: "1uimfh"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserCheck = createLucideIcon("user-check", [
	["path", {
		d: "m16 11 2 2 4-4",
		key: "9rsbq5"
	}],
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Vote = createLucideIcon("vote", [
	["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}],
	["path", {
		d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z",
		key: "1ezoue"
	}],
	["path", {
		d: "M22 19H2",
		key: "nuriw5"
	}]
]);
//#endregion
//#region src/features/apm/admin/AdminLayout.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var adminNavItems = [
	{
		label: "Dashboard",
		path: "/apm/admin/conversion",
		icon: ChartColumn
	},
	{
		label: "LGAs",
		path: "/apm/admin/lgas",
		icon: Map
	},
	{
		label: "Stakeholders",
		path: "/apm/admin/stakeholders",
		icon: Users
	},
	{
		label: "Tours",
		path: "/apm/admin/tours",
		icon: Route
	},
	{
		label: "Canvassing",
		path: "/apm/admin/canvassing",
		icon: Footprints
	},
	{
		label: "Content",
		path: "/apm/admin/content",
		icon: FileText
	},
	{
		label: "Listening",
		path: "/apm/admin/listening",
		icon: Radio
	},
	{
		label: "Sentiment",
		path: "/apm/admin/sentiment",
		icon: Activity
	},
	{
		label: "Volunteers",
		path: "/apm/admin/volunteers",
		icon: HeartHandshake
	},
	{
		label: "WhatsApp",
		path: "/apm/admin/whatsapp",
		icon: MessageCircle
	},
	{
		label: "Agents",
		path: "/apm/admin/agents",
		icon: UserCheck
	},
	{
		label: "Results",
		path: "/apm/admin/results",
		icon: Vote
	},
	{
		label: "Protection",
		path: "/apm/admin/incidents",
		icon: Shield
	},
	{
		label: "GOTV",
		path: "/apm/admin/gotv",
		icon: Bell
	}
];
var sidebarBg = "#002D5A";
var sidebarActive = "rgba(255,255,255,0.12)";
var sidebarHover = "rgba(255,255,255,0.06)";
var sidebarText = "#94A3B8";
var sidebarTextActive = "#fff";
function AdminLayout() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		style: {
			minHeight: "100vh",
			display: "flex",
			background: "#F8FAFC"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			style: {
				width: collapsed ? 60 : 220,
				background: sidebarBg,
				color: "#fff",
				display: "flex",
				flexDirection: "column",
				transition: "width 0.2s ease",
				overflow: "hidden",
				flexShrink: 0,
				position: "sticky",
				top: 0,
				height: "100vh"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: {
						padding: collapsed ? "12px 0" : "12px 16px",
						borderBottom: "1px solid rgba(255,255,255,0.08)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: collapsed ? "center" : "space-between",
						wrap: "nowrap",
						children: [!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							style: { lineHeight: 1.2 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								order: 5,
								style: {
									color: "#fff",
									fontSize: 14,
									whiteSpace: "nowrap"
								},
								children: "APM Campaign"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								style: {
									color: sidebarText,
									fontSize: 10,
									whiteSpace: "nowrap"
								},
								children: "Oyo 2027"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
							variant: "subtle",
							color: "gray",
							size: "sm",
							onClick: () => setCollapsed(!collapsed),
							style: {
								color: sidebarText,
								flexShrink: 0
							},
							children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					style: { flex: 1 },
					px: collapsed ? 4 : 8,
					py: 8,
					children: adminNavItems.map((item) => {
						const active = pathname === item.path;
						const link = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: collapsed ? void 0 : item.label,
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: collapsed ? 18 : 16 }),
							active,
							onClick: () => navigate({ to: item.path }),
							styles: {
								root: {
									borderRadius: 6,
									marginBottom: 2,
									padding: collapsed ? "8px 0" : "8px 12px",
									color: active ? sidebarTextActive : sidebarText,
									background: active ? sidebarActive : "transparent",
									"&:hover": { background: active ? sidebarActive : sidebarHover },
									justifyContent: collapsed ? "center" : void 0
								},
								label: {
									fontSize: 13,
									fontWeight: active ? 600 : 400
								},
								section: { marginRight: collapsed ? 0 : 10 },
								body: { flex: collapsed ? 0 : void 0 }
							}
						}, item.path);
						if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							style: {
								display: "flex",
								justifyContent: "center",
								marginBottom: 2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								label: item.label,
								position: "right",
								withArrow: true,
								children: link
							})
						}, item.path);
						return link;
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: {
						padding: collapsed ? 8 : "8px 12px",
						borderTop: "1px solid rgba(255,255,255,0.08)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						label: collapsed ? void 0 : "Back to Site",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: collapsed ? 18 : 16 }),
						onClick: () => navigate({ to: "/apm" }),
						styles: {
							root: {
								borderRadius: 6,
								color: sidebarText,
								"&:hover": { background: sidebarHover },
								padding: collapsed ? "8px 0" : "8px 12px",
								justifyContent: collapsed ? "center" : void 0
							},
							section: { marginRight: collapsed ? 0 : 10 },
							body: { flex: collapsed ? 0 : void 0 }
						}
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			style: {
				flex: 1,
				minWidth: 0,
				display: "flex",
				flexDirection: "column"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				py: "sm",
				px: "lg",
				style: {
					background: "#fff",
					borderBottom: "1px solid #E2E8F0"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
					variant: "subtle",
					color: "gray",
					onClick: () => setCollapsed(!collapsed),
					size: "sm",
					style: { color: "#64748B" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					style: { color: "#64748B" },
					children: "APM Campaign Management — Oyo State 2027"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				p: "lg",
				style: {
					flex: 1,
					overflow: "auto"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
//#region src/routes/apm/admin/route.tsx?tsr-split=component
var SplitComponent = AdminLayout;
//#endregion
export { SplitComponent as component };
