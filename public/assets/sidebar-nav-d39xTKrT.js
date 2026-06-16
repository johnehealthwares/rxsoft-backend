import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
import { t as Collapse } from "./Collapse-viS-xhqU.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Link } from "./link-D-damaRz.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { Ir as ThemeIcon, Rr as Tooltip, Xn as ChevronRight } from "./index-BRcLwOKn.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bell = createLucideIcon("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
//#endregion
//#region src/features/settings/components/sidebar-nav.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SidebarNavItem({ item, pathname, collapsed = false, expanded = false, resetExpandState, index }) {
	const hasChildren = Boolean(item.items?.length);
	const active = (0, import_react.useMemo)(() => {
		if (!item.url) return false;
		return pathname === item.url || pathname.startsWith(`${item.url}/`) || (item.items || []).some((sub) => pathname === sub.url);
	}, [pathname, item]);
	/**
	* Automatically open submenu
	* when one of the children is active
	*/
	const [opened, { toggle }] = useDisclosure(active);
	const Icon = item.icon;
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnstyledButton, {
		onClick: () => {
			if (hasChildren) {
				toggle();
				resetExpandState(index, expanded);
			}
		},
		style: {
			width: "100%",
			borderRadius: 10,
			transition: "all 140ms ease",
			background: active ? "var(--mantine-color-blue-light)" : "transparent"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			justify: "space-between",
			wrap: "nowrap",
			px: "sm",
			py: 10,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "sm",
				wrap: "nowrap",
				children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
					size: 34,
					radius: "md",
					variant: active ? "filled" : "light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 })
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					fw: active ? 700 : 500,
					c: active ? "blue" : void 0,
					children: item.title
				}), item.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					c: "dimmed",
					children: item.title
				})] })]
			}), !collapsed && hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: opened ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 }) })]
		})
	});
	/**
	* COLLAPSED SIDEBAR MODE
	*/
	if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		label: item.title,
		position: "right",
		withArrow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { children: item.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.url,
			children: button
		}) : button })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: 4,
		children: [item.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.url,
			children: button
		}) : button, hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
			expanded,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: 2,
				pl: 20,
				children: item.items?.map((subItem) => {
					const subActive = pathname === subItem.url;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: subItem.url,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnstyledButton, {
							style: {
								width: "100%",
								borderRadius: 8,
								padding: "10px 5px",
								transition: "all 140ms ease",
								background: subActive ? "var(--mantine-color-gray-1)" : "transparent"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "sm",
								children: [subItem.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(subItem.icon, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: subActive ? 600 : 500,
									children: subItem.title
								})]
							})
						})
					}, subItem.title);
				})
			})
		})]
	});
}
//#endregion
export { Bell as n, SidebarNavItem as t };
