import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as Bell } from "./bell-BuQOfW8j.js";
import { t as SidebarNavItem } from "./sidebar-nav-DbZ3EIBK.js";
import { Lr as Title, Nr as Outlet } from "./index-DuM1cidb.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Monitor = createLucideIcon("monitor", [
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "21",
		y2: "21",
		key: "1svkeh"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "17",
		y2: "21",
		key: "vw1qmm"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Palette = createLucideIcon("palette", [
	["path", {
		d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
		key: "e79jfc"
	}],
	["circle", {
		cx: "13.5",
		cy: "6.5",
		r: ".5",
		fill: "currentColor",
		key: "1okk4w"
	}],
	["circle", {
		cx: "17.5",
		cy: "10.5",
		r: ".5",
		fill: "currentColor",
		key: "f64h9f"
	}],
	["circle", {
		cx: "6.5",
		cy: "12.5",
		r: ".5",
		fill: "currentColor",
		key: "qy21gx"
	}],
	["circle", {
		cx: "8.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "fotxhn"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Settings2 = createLucideIcon("settings-2", [
	["path", {
		d: "M14 17H5",
		key: "gfn3mx"
	}],
	["path", {
		d: "M19 7h-9",
		key: "6i9tg"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "3",
		key: "18b49y"
	}],
	["circle", {
		cx: "7",
		cy: "7",
		r: "3",
		key: "dfmy0x"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserCog = createLucideIcon("user-cog", [
	["path", {
		d: "M10 15H6a4 4 0 0 0-4 4v2",
		key: "1nfge6"
	}],
	["path", {
		d: "m14.305 16.53.923-.382",
		key: "1itpsq"
	}],
	["path", {
		d: "m15.228 13.852-.923-.383",
		key: "eplpkm"
	}],
	["path", {
		d: "m16.852 12.228-.383-.923",
		key: "13v3q0"
	}],
	["path", {
		d: "m16.852 17.772-.383.924",
		key: "1i8mnm"
	}],
	["path", {
		d: "m19.148 12.228.383-.923",
		key: "1q8j1v"
	}],
	["path", {
		d: "m19.53 18.696-.382-.924",
		key: "vk1qj3"
	}],
	["path", {
		d: "m20.772 13.852.924-.383",
		key: "n880s0"
	}],
	["path", {
		d: "m20.772 16.148.924.383",
		key: "1g6xey"
	}],
	["circle", {
		cx: "18",
		cy: "15",
		r: "3",
		key: "gjjjvw"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
//#endregion
//#region src/layout/main.tsx
var import_jsx_runtime = require_jsx_runtime();
function Main({ fixed, className, fluid, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		"data-layout": fixed ? "fixed" : "auto",
		...props
	});
}
//#endregion
//#region src/features/settings/pages/settings-page.tsx
var sidebarNavItems = [
	{
		title: "Profile",
		url: "/settings",
		icon: UserCog
	},
	{
		title: "Account",
		url: "/settings/account",
		icon: Settings2
	},
	{
		title: "Appearance",
		url: "/settings/appearance",
		icon: Palette
	},
	{
		title: "Notifications",
		url: "/settings/notifications",
		icon: Bell
	},
	{
		title: "Display",
		url: "/settings/display",
		icon: Monitor
	}
];
function Settings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Main, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 1,
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: "dimmed",
				children: "Manage your account settings and set e-mail preferences."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { my: "md" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			style: {
				display: "flex",
				flex: 1,
				overflow: "hidden",
				gap: "2rem",
				flexDirection: "column"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { hiddenFrom: "lg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					align: "flex-start",
					gap: "xl",
					wrap: "nowrap",
					visibleFrom: "lg",
					style: {
						flex: 1,
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						style: {
							width: "20%",
							position: "sticky",
							top: 0
						},
						children: sidebarNavItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNavItem, {
							pathname: item.title,
							expanded: false,
							index: i,
							item,
							resetExpandState: () => 2
						}, item.title))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						style: {
							flex: 1,
							overflow: "hidden",
							padding: "0.25rem"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					hiddenFrom: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			]
		})
	] });
}
//#endregion
//#region src/routes/_authenticated/rxsoft/settings/route.tsx?tsr-split=component
var SplitComponent = Settings;
//#endregion
export { SplitComponent as component };
