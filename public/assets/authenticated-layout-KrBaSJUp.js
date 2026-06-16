import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { n as Menu, t as ConfirmDialog } from "./confirm-dialog-CxiN0Wjp.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { n as UnstyledButton } from "./Transition-Cmaaz8Kh.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as AppShell } from "./AppShell-s9IVO5Ws.js";
import { t as Avatar } from "./Avatar-CoRVm6w9.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as useRouter } from "./useRouter-BXm9s-pB.js";
import { g as replaceEqualDeep, t as useStore } from "./useStore-D2OWgQ7j.js";
import { t as Link } from "./link-D-damaRz.js";
import { a as useModuleName, i as useModuleId, o as useSetSelectedModule } from "./module-context-B1aR60OK.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { n as Bell, t as SidebarNavItem } from "./sidebar-nav-d39xTKrT.js";
import { t as BookOpen } from "./book-open-D9F3OwEf.js";
import { t as Braces } from "./braces-Df4bl00R.js";
import { t as Building2 } from "./building-2-B-Q1DIUW.js";
import { t as FileText } from "./file-text-ZMRlE-dq.js";
import { t as HeartPulse } from "./heart-pulse-__ikndAu.js";
import { t as MessagesSquare } from "./messages-square-BVzimKsr.js";
import { t as Package } from "./package-Cis-Q__o.js";
import { t as Shield } from "./shield-ExkQp_iG.js";
import { t as Tags } from "./tags-BzJ52kNM.js";
import { t as Users } from "./users-CqLhX-NX.js";
import { $n as ChartColumn, Ar as Outlet, At as useModuleTitle, Dn as ShieldCheck, Dr as useAuthStore, En as ShoppingCart, Fn as Pill, Kn as CreditCard, Ln as PackageSearch, Nn as Receipt, Tr as setCookie, Vn as LogOut, bn as Truck, jr as useNavigate, tr as BadgeCheck, vr as modules, wn as Sparkles, wr as getCookie, zn as MessageSquare } from "./index-BRcLwOKn.js";
import { n as lisResources } from "./resources-ClFmKpTS.js";
//#region node_modules/@tanstack/react-router/dist/esm/useLocation.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Read the current location from the router state with optional selection.
* Useful for subscribing to just the pieces of location you care about.
*
* Options:
* - `select`: Project the `location` object to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The current location (or selected value).
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLocationHook
*/
function useLocation(opts) {
	const router = useRouter();
	const previousResult = (0, import_react.useRef)(void 0);
	return useStore(router.stores.location, (location) => {
		const selected = opts?.select ? opts.select(location) : location;
		if (opts?.structuralSharing ?? router.options.defaultStructuralSharing) {
			const shared = replaceEqualDeep(previousResult.current, selected);
			previousResult.current = shared;
			return shared;
		}
		return selected;
	});
}
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var AudioWaveform = createLucideIcon("audio-waveform", [["path", {
	d: "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",
	key: "57tc96"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Boxes = createLucideIcon("boxes", [
	["path", {
		d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
		key: "lc1i9w"
	}],
	["path", {
		d: "m7 16.5-4.74-2.85",
		key: "1o9zyk"
	}],
	["path", {
		d: "m7 16.5 5-3",
		key: "va8pkn"
	}],
	["path", {
		d: "M7 16.5v5.17",
		key: "jnp8gn"
	}],
	["path", {
		d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
		key: "8zsnat"
	}],
	["path", {
		d: "m17 16.5-5-3",
		key: "8arw3v"
	}],
	["path", {
		d: "m17 16.5 4.74-2.85",
		key: "8rfmw"
	}],
	["path", {
		d: "M17 16.5v5.17",
		key: "k6z78m"
	}],
	["path", {
		d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
		key: "1xygjf"
	}],
	["path", {
		d: "M12 8 7.26 5.15",
		key: "1vbdud"
	}],
	["path", {
		d: "m12 8 4.74-2.85",
		key: "3rx089"
	}],
	["path", {
		d: "M12 13.5V8",
		key: "1io7kd"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronsUpDown = createLucideIcon("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleDashed = createLucideIcon("circle-dashed", [
	["path", {
		d: "M10.1 2.182a10 10 0 0 1 3.8 0",
		key: "5ilxe3"
	}],
	["path", {
		d: "M13.9 21.818a10 10 0 0 1-3.8 0",
		key: "11zvb9"
	}],
	["path", {
		d: "M17.609 3.721a10 10 0 0 1 2.69 2.7",
		key: "1iw5b2"
	}],
	["path", {
		d: "M2.182 13.9a10 10 0 0 1 0-3.8",
		key: "c0bmvh"
	}],
	["path", {
		d: "M20.279 17.609a10 10 0 0 1-2.7 2.69",
		key: "1ruxm7"
	}],
	["path", {
		d: "M21.818 10.1a10 10 0 0 1 0 3.8",
		key: "qkgqxc"
	}],
	["path", {
		d: "M3.721 6.391a10 10 0 0 1 2.7-2.69",
		key: "1mcia2"
	}],
	["path", {
		d: "M6.391 20.279a10 10 0 0 1-2.69-2.7",
		key: "1fvljs"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Cog = createLucideIcon("cog", [
	["path", {
		d: "M11 10.27 7 3.34",
		key: "16pf9h"
	}],
	["path", {
		d: "m11 13.73-4 6.93",
		key: "794ttg"
	}],
	["path", {
		d: "M12 22v-2",
		key: "1osdcq"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M14 12h8",
		key: "4f43i9"
	}],
	["path", {
		d: "m17 20.66-1-1.73",
		key: "eq3orb"
	}],
	["path", {
		d: "m17 3.34-1 1.73",
		key: "2wel8s"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "m20.66 17-1.73-1",
		key: "sg0v6f"
	}],
	["path", {
		d: "m20.66 7-1.73 1",
		key: "1ow05n"
	}],
	["path", {
		d: "m3.34 17 1.73-1",
		key: "nuk764"
	}],
	["path", {
		d: "m3.34 7 1.73 1",
		key: "1ulond"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "8",
		key: "46899m"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Command = createLucideIcon("command", [["path", {
	d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",
	key: "11bfej"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ContactRound = createLucideIcon("contact-round", [
	["path", {
		d: "M16 2v2",
		key: "scm5qe"
	}],
	["path", {
		d: "M17.915 22a6 6 0 0 0-12 0",
		key: "suqz9p"
	}],
	["path", {
		d: "M8 2v2",
		key: "pbkmx"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["rect", {
		x: "3",
		y: "4",
		width: "18",
		height: "18",
		rx: "2",
		key: "12vinp"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var GitBranch = createLucideIcon("git-branch", [
	["path", {
		d: "M15 6a9 9 0 0 0-9 9V3",
		key: "1cii5b"
	}],
	["circle", {
		cx: "18",
		cy: "6",
		r: "3",
		key: "1h7g24"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var HandCoins = createLucideIcon("hand-coins", [
	["path", {
		d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",
		key: "geh8rc"
	}],
	["path", {
		d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
		key: "1fto5m"
	}],
	["path", {
		d: "m2 16 6 6",
		key: "1pfhp9"
	}],
	["circle", {
		cx: "16",
		cy: "9",
		r: "2.9",
		key: "1n0dlu"
	}],
	["circle", {
		cx: "6",
		cy: "5",
		r: "3",
		key: "151irh"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Layers = createLucideIcon("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutDashboard = createLucideIcon("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Microscope = createLucideIcon("microscope", [
	["path", {
		d: "M6 18h8",
		key: "1borvv"
	}],
	["path", {
		d: "M3 22h18",
		key: "8prr45"
	}],
	["path", {
		d: "M14 22a7 7 0 1 0 0-14h-1",
		key: "1jwaiy"
	}],
	["path", {
		d: "M9 14h2",
		key: "197e7h"
	}],
	["path", {
		d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",
		key: "1bmzmy"
	}],
	["path", {
		d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
		key: "1drr47"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var NotebookPen = createLucideIcon("notebook-pen", [
	["path", {
		d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4",
		key: "re6nr2"
	}],
	["path", {
		d: "M2 6h4",
		key: "aawbzj"
	}],
	["path", {
		d: "M2 10h4",
		key: "l0bgd4"
	}],
	["path", {
		d: "M2 14h4",
		key: "1gsvsf"
	}],
	["path", {
		d: "M2 18h4",
		key: "1bu2t1"
	}],
	["path", {
		d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
		key: "pqwjuv"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Radio = createLucideIcon("radio", [
	["path", {
		d: "M16.247 7.761a6 6 0 0 1 0 8.478",
		key: "1fwjs5"
	}],
	["path", {
		d: "M19.075 4.933a10 10 0 0 1 0 14.134",
		key: "ehdyv1"
	}],
	["path", {
		d: "M4.925 19.067a10 10 0 0 1 0-14.134",
		key: "1q22gi"
	}],
	["path", {
		d: "M7.753 16.239a6 6 0 0 1 0-8.478",
		key: "r2q7qm"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ReceiptText = createLucideIcon("receipt-text", [
	["path", {
		d: "M13 16H8",
		key: "wsln4y"
	}],
	["path", {
		d: "M14 8H8",
		key: "1l3xfs"
	}],
	["path", {
		d: "M16 12H8",
		key: "1fr5h0"
	}],
	["path", {
		d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
		key: "ycz6yz"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Scale = createLucideIcon("scale", [
	["path", {
		d: "M12 3v18",
		key: "108xh3"
	}],
	["path", {
		d: "m19 8 3 8a5 5 0 0 1-6 0zV7",
		key: "zcdpyk"
	}],
	["path", {
		d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",
		key: "1yorad"
	}],
	["path", {
		d: "m5 8 3 8a5 5 0 0 1-6 0zV7",
		key: "eua70x"
	}],
	["path", {
		d: "M7 21h10",
		key: "1b0cd5"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Shuffle = createLucideIcon("shuffle", [
	["path", {
		d: "m18 14 4 4-4 4",
		key: "10pe0f"
	}],
	["path", {
		d: "m18 2 4 4-4 4",
		key: "pucp1d"
	}],
	["path", {
		d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",
		key: "1ailkh"
	}],
	["path", {
		d: "M2 6h1.972a4 4 0 0 1 3.6 2.2",
		key: "km57vx"
	}],
	["path", {
		d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
		key: "os18l9"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Store = createLucideIcon("store", [
	["path", {
		d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",
		key: "slp6dd"
	}],
	["path", {
		d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
		key: "o0xfot"
	}],
	["path", {
		d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",
		key: "wn3emo"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Waypoints = createLucideIcon("waypoints", [
	["path", {
		d: "m10.586 5.414-5.172 5.172",
		key: "4mc350"
	}],
	["path", {
		d: "m18.586 13.414-5.172 5.172",
		key: "8c96vv"
	}],
	["path", {
		d: "M6 12h12",
		key: "8npq4p"
	}],
	["circle", {
		cx: "12",
		cy: "20",
		r: "2",
		key: "144qzu"
	}],
	["circle", {
		cx: "12",
		cy: "4",
		r: "2",
		key: "muu5ef"
	}],
	["circle", {
		cx: "20",
		cy: "12",
		r: "2",
		key: "1xzzfp"
	}],
	["circle", {
		cx: "4",
		cy: "12",
		r: "2",
		key: "1hvhnz"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Workflow = createLucideIcon("workflow", [
	["rect", {
		width: "8",
		height: "8",
		x: "3",
		y: "3",
		rx: "2",
		key: "by2w9f"
	}],
	["path", {
		d: "M7 11v4a2 2 0 0 0 2 2h4",
		key: "xkn7yn"
	}],
	["rect", {
		width: "8",
		height: "8",
		x: "13",
		y: "13",
		rx: "2",
		key: "1cgmvn"
	}]
]);
//#endregion
//#region src/context/layout-provider.tsx
var import_jsx_runtime = require_jsx_runtime();
var LAYOUT_COLLAPSIBLE_COOKIE_NAME = "layout_collapsible";
var LAYOUT_VARIANT_COOKIE_NAME = "layout_variant";
var LAYOUT_COOKIE_MAX_AGE = 3600 * 24 * 7;
var DEFAULT_VARIANT = "inset";
var DEFAULT_COLLAPSIBLE = "icon";
var LayoutContext = (0, import_react.createContext)(null);
function LayoutProvider({ children }) {
	const [collapsible, _setCollapsible] = (0, import_react.useState)(() => {
		return getCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME) || DEFAULT_COLLAPSIBLE;
	});
	const [variant, _setVariant] = (0, import_react.useState)(() => {
		return getCookie(LAYOUT_VARIANT_COOKIE_NAME) || DEFAULT_VARIANT;
	});
	const setCollapsible = (newCollapsible) => {
		_setCollapsible(newCollapsible);
		setCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME, newCollapsible, LAYOUT_COOKIE_MAX_AGE);
	};
	const setVariant = (newVariant) => {
		_setVariant(newVariant);
		setCookie(LAYOUT_VARIANT_COOKIE_NAME, newVariant, LAYOUT_COOKIE_MAX_AGE);
	};
	const resetLayout = () => {
		setCollapsible(DEFAULT_COLLAPSIBLE);
		setVariant(DEFAULT_VARIANT);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutContext, {
		value: {
			resetLayout,
			defaultCollapsible: DEFAULT_COLLAPSIBLE,
			collapsible,
			setCollapsible,
			defaultVariant: DEFAULT_VARIANT,
			variant,
			setVariant
		},
		children
	});
}
//#endregion
//#region src/features/auth/auto-logout.tsx
var INACTIVITY_TIMEOUT = 1800 * 1e3;
var ACTIVITY_EVENTS = [
	"mousedown",
	"keydown",
	"mousemove",
	"touchstart",
	"scroll",
	"wheel"
];
function AutoLogout({ children }) {
	const navigate = useNavigate();
	const location = useLocation();
	const timerRef = (0, import_react.useRef)(null);
	const resetTimer = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			const currentPath = location.href;
			useAuthStore.getState().logout();
			navigate({
				to: "/sign-in",
				search: { redirect: currentPath },
				replace: true
			});
		}, INACTIVITY_TIMEOUT);
	};
	(0, import_react.useEffect)(() => {
		resetTimer();
		for (const event of ACTIVITY_EVENTS) window.addEventListener(event, resetTimer, { passive: true });
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
			for (const event of ACTIVITY_EVENTS) window.removeEventListener(event, resetTimer);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
//#region src/features/shared/use-module-favicon.ts
var moduleFavicons = {
	rxsoft: "/src/favicons/rxsoft.svg",
	conversation: "/src/favicons/conversation.svg",
	lis: "/src/favicons/lis.svg",
	admin: "/src/favicons/admin.svg",
	communication: "/src/favicons/rxsoft.svg",
	"coding-concept": "/src/favicons/admin.svg"
};
function useModuleFavicon(moduleId) {
	(0, import_react.useEffect)(() => {
		const link = document.querySelector("link[rel=\"icon\"]");
		if (!link) return;
		link.href = moduleFavicons[moduleId ?? ""] ?? moduleFavicons.admin;
	}, [moduleId]);
}
//#endregion
//#region src/lib/module-routing.ts
var routeModuleMap = {};
for (const mod of modules) for (const route of mod.routes) routeModuleMap[route] = [mod.id, "admin"];
routeModuleMap["/"] = [
	"rxsoft",
	"conversation",
	"communication",
	"admin"
];
routeModuleMap["/dashboard"] = [
	"rxsoft",
	"conversation",
	"communication",
	"admin"
];
function isRouteAllowedForModule(pathname, moduleId) {
	if (moduleId === "admin") return true;
	if (routeModuleMap[pathname]) return routeModuleMap[pathname].includes(moduleId);
	const pathSegments = pathname.split("/").filter(Boolean);
	if (pathSegments.length > 1) {
		const parentRoute = "/" + pathSegments[0];
		if (routeModuleMap[parentRoute]) return routeModuleMap[parentRoute].includes(moduleId);
	}
	return true;
}
function getModuleDashboard(moduleId) {
	return modules.find((m) => m.id === moduleId)?.root ?? "/";
}
//#endregion
//#region src/layout/data/sidebar-data.ts
function filterNavGroupsByModule(navGroups, selectedModule) {
	return navGroups.map((group) => ({
		...group,
		items: (group.items || []).filter((item) => selectedModule === "admin" || !item.modules || item.modules.includes(selectedModule)),
		url: void 0
	})).filter((group) => group.items.length > 0);
}
var sidebarData = {
	user: {
		name: "RxSoft User",
		email: "Admin console",
		avatar: ""
	},
	teams: [
		{
			name: "RxSoft",
			logo: Command,
			plan: "Pharmacy Admin",
			moduleId: "rxsoft"
		},
		{
			name: "Switch",
			logo: AudioWaveform,
			plan: "Messaging & Routing",
			moduleId: "communication"
		},
		{
			name: "Conversation",
			logo: MessageSquare,
			plan: "Workflow Chat",
			moduleId: "conversation"
		},
		{
			name: "Coding Concept",
			logo: Boxes,
			plan: "Terminology",
			moduleId: "coding-concept"
		},
		{
			name: "LIS",
			logo: Microscope,
			plan: "Laboratory",
			moduleId: "lis"
		}
	],
	navGroups: [
		{
			title: "Overview",
			icon: LayoutDashboard,
			items: [
				{
					title: "Dashboard",
					url: "/",
					icon: LayoutDashboard,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Reports",
					url: "/rxsoft/reports",
					icon: ChartColumn,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Audit Logs",
					url: "/rxsoft/audit-logs",
					icon: Package,
					modules: ["rxsoft", "admin"]
				}
			]
		},
		{
			title: "Catalog",
			icon: BookOpen,
			items: [
				{
					title: "Products",
					url: "/rxsoft/items",
					icon: Package,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Categories",
					url: "/rxsoft/categories",
					icon: Tags,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "UOMs",
					url: "/rxsoft/uoms",
					icon: Scale,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Pharmaceutics",
					url: "/rxsoft/pharmaceutics",
					icon: Pill,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Drug Components",
					url: "/rxsoft/drug-components",
					icon: Layers,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Manufacturers",
					url: "/rxsoft/manufacturers",
					icon: Truck,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Price Lists",
					url: "/rxsoft/price-lists",
					icon: Tags,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Price List Items",
					url: "/rxsoft/price-list-items",
					icon: ReceiptText,
					modules: ["rxsoft", "admin"]
				}
			]
		},
		{
			title: "People",
			icon: Users,
			items: [
				{
					title: "Users",
					url: "/rxsoft/users",
					icon: Users,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Customers",
					url: "/rxsoft/customers",
					icon: ContactRound,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Suppliers",
					url: "/rxsoft/suppliers",
					icon: Truck,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Roles",
					url: "/rxsoft/roles",
					icon: Shield,
					modules: ["rxsoft", "admin"]
				}
			]
		},
		{
			title: "Operations",
			icon: Workflow,
			items: [
				{
					title: "Sales",
					url: "/rxsoft/sales",
					icon: ShoppingCart,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Receivables",
					url: "/rxsoft/receivables",
					icon: HandCoins,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Purchases",
					url: "/rxsoft/purchases",
					icon: ReceiptText,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Payment Methods",
					url: "/rxsoft/payment-methods",
					icon: CreditCard,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Inventory",
					url: "/rxsoft/inventory",
					icon: Boxes,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Goods Receiving",
					url: "/rxsoft/receiving",
					icon: PackageSearch,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Website Orders",
					url: "/rxsoft/website-orders",
					icon: ShoppingCart,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Branches",
					url: "/rxsoft/branches",
					icon: GitBranch,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Settings",
					url: "/rxsoft/settings",
					icon: Cog,
					modules: ["rxsoft", "admin"]
				}
			]
		},
		{
			title: "Finance",
			icon: Receipt,
			items: [
				{
					title: "Journals",
					url: "/rxsoft/journals",
					icon: NotebookPen,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Journal Entries",
					url: "/rxsoft/journal-entries",
					icon: NotebookPen,
					modules: ["rxsoft", "admin"]
				},
				{
					title: "Journal Entry Lines",
					url: "/rxsoft/journal-entry-lines",
					icon: NotebookPen,
					modules: ["rxsoft", "admin"]
				}
			]
		},
		{
			title: "Website",
			icon: Store,
			items: [
				{
					title: "Health Concerns",
					url: "/rxsoft/website-health-concerns",
					icon: HeartPulse,
					modules: ["admin"]
				},
				{
					title: "Blog Articles",
					url: "/rxsoft/website-articles",
					icon: BookOpen,
					modules: ["admin"]
				},
				{
					title: "Prescriptions",
					url: "/rxsoft/website-prescriptions",
					icon: FileText,
					modules: ["admin"]
				}
			]
		},
		{
			title: "Administration",
			icon: ShieldCheck,
			items: [{
				title: "Organizations",
				url: "/rxsoft/organizations",
				icon: Shield,
				modules: ["rxsoft", "admin"]
			}, {
				title: "Locations",
				url: "/rxsoft/stock-locations",
				icon: Store,
				modules: ["rxsoft", "admin"]
			}]
		},
		{
			title: "Conversation",
			icon: MessagesSquare,
			items: [
				{
					title: "Questionnaires",
					url: "/conversation/questionnaires",
					icon: FileText,
					modules: ["conversation", "admin"]
				},
				{
					title: "Conversations",
					url: "/conversation",
					icon: MessageSquare,
					modules: ["conversation", "admin"]
				},
				{
					title: "Chats",
					url: "/conversation/chats",
					icon: MessageSquare,
					modules: ["conversation", "admin"]
				},
				{
					title: "Participants",
					url: "/conversation/participants",
					icon: ContactRound,
					modules: ["conversation", "admin"]
				},
				{
					title: "Questions",
					url: "/conversation/questions",
					icon: CircleDashed,
					modules: ["conversation", "admin"]
				},
				{
					title: "Workflows",
					url: "/conversation/workflows",
					icon: Workflow,
					modules: ["conversation", "admin"]
				},
				{
					title: "Workflow Configuration",
					url: "/conversation/workflow-configuration",
					icon: Workflow,
					modules: ["conversation", "admin"]
				},
				{
					title: "Workflow Instances",
					url: "/conversation/workflow-instances",
					icon: Shuffle,
					modules: ["conversation", "admin"]
				},
				{
					title: "Workflow Events",
					url: "/conversation/workflow-events",
					icon: Waypoints,
					modules: ["conversation", "admin"]
				},
				{
					title: "Channels",
					url: "/conversation/channels",
					icon: Radio,
					modules: ["conversation", "admin"]
				},
				{
					title: "Exchanges",
					url: "/conversation/exchanges",
					icon: FileText,
					modules: ["conversation", "admin"]
				},
				{
					title: "Messages",
					url: "/communication/messages",
					icon: MessageSquare,
					modules: ["communication", "admin"]
				},
				{
					title: "Notifications",
					url: "/communication/notifications",
					icon: MessageSquare,
					modules: ["communication", "admin"]
				},
				{
					title: "Broadcasts",
					url: "/communication/broadcasts",
					icon: Radio,
					modules: ["communication", "admin"]
				},
				{
					title: "Message Templates",
					url: "/communication/message-templates",
					icon: FileText,
					modules: ["communication", "admin"]
				},
				{
					title: "Notification Templates",
					url: "/communication/notification-templates",
					icon: FileText,
					modules: ["communication", "admin"]
				},
				{
					title: "Communication Channels",
					url: "/communication/communication-channels",
					icon: Radio,
					modules: ["communication", "admin"]
				},
				{
					title: "Message Logs",
					url: "/communication/message-logs",
					icon: FileText,
					modules: ["communication", "admin"]
				}
			]
		},
		{
			title: "Switch",
			icon: Waypoints,
			items: [
				{
					title: "Application Entities",
					url: "/communication/aes",
					icon: MessageSquare,
					modules: ["communication", "admin"]
				},
				{
					title: "Routes",
					url: "/communication/routing",
					icon: MessageSquare,
					modules: ["communication", "admin"]
				},
				{
					title: "Mapping",
					url: "/communication/mapping",
					icon: MessageSquare,
					modules: ["communication", "admin"]
				},
				{
					title: "Event Traces",
					url: "/communication/audit-center",
					icon: FileText,
					modules: ["communication", "admin"]
				},
				{
					title: "Flow Graph",
					url: "/communication/flow-graph",
					icon: Layers,
					modules: ["communication", "admin"]
				},
				{
					title: "Trace Explorer",
					url: "/communication/trace-explorer",
					icon: Waypoints,
					modules: ["communication", "admin"]
				},
				{
					title: "Message Tester",
					url: "/communication/message-tester",
					icon: MessageSquare,
					modules: ["communication", "admin"]
				}
			]
		},
		{
			title: "Coding Concept",
			icon: Braces,
			items: [
				{
					title: "Concept Registry",
					url: "/coding-concept",
					icon: Layers,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Search",
					url: "/coding-concept/search",
					icon: Waypoints,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Match",
					url: "/coding-concept/match",
					icon: GitBranch,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Upload",
					url: "/coding-concept/upload",
					icon: FileText,
					modules: ["coding-concept", "admin"]
				}
			]
		},
		{
			title: "Facility",
			icon: Building2,
			items: [
				{
					title: "Facilities",
					url: "/coding-concept/facilities",
					icon: Building2,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "States",
					url: "/coding-concept/facilities/states",
					icon: Building2,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "LGAs",
					url: "/coding-concept/facilities/lgas",
					icon: Building2,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Wards",
					url: "/coding-concept/facilities/wards",
					icon: Building2,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Facility Types",
					url: "/coding-concept/facilities/types",
					icon: Building2,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Facility Levels",
					url: "/coding-concept/facilities/levels",
					icon: Building2,
					modules: ["coding-concept", "admin"]
				}
			]
		},
		{
			title: "Drugs",
			icon: Pill,
			items: [
				{
					title: "Generic Drugs",
					url: "/coding-concept/generic-drugs",
					icon: Pill,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Pharmaceutics",
					url: "/coding-concept/pharmaceutics",
					icon: Pill,
					modules: ["coding-concept", "admin"]
				},
				{
					title: "Drug Components",
					url: "/coding-concept/drug-components",
					icon: Layers,
					modules: ["coding-concept", "admin"]
				}
			]
		},
		{
			title: "LIS",
			icon: Microscope,
			items: lisResources.map((lisResource) => ({
				title: lisResource.title,
				url: "/lis/" + lisResource.key,
				icon: Microscope,
				modules: ["lis", "admin"]
			}))
		}
	]
};
//#endregion
//#region src/components/sign-out-dialog.tsx
function SignOutDialog({ open, onOpenChange }) {
	const navigate = useNavigate();
	const location = useLocation();
	const logout = useAuthStore((state) => state.logout);
	const handleSignOut = () => {
		logout();
		const currentPath = location.href;
		navigate({
			to: "/sign-in",
			search: { redirect: currentPath },
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open,
		onOpenChange,
		title: "Sign out",
		desc: "Are you sure you want to sign out? You will need to sign in again to access your account.",
		confirmText: "Sign out",
		destructive: true,
		handleConfirm: handleSignOut,
		className: "sm:max-w-sm"
	});
}
//#endregion
//#region src/layout/nav-user.tsx
function NavUser({ user }) {
	const [opened, setOpened] = (0, import_react.useState)(false);
	const [signOutOpen, setSignOutOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
		opened,
		onChange: setOpened,
		position: "right-end",
		offset: 4,
		width: 220,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Target, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnstyledButton, {
			style: { width: "100%" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						src: user.avatar,
						radius: "md",
						size: "sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 0,
						style: { flex: 1 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							fw: 600,
							truncate: true,
							children: user.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							c: "dimmed",
							truncate: true,
							children: user.email
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { size: 16 })
				]
			})
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu.Dropdown, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Label, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
					src: user.avatar,
					radius: "md",
					size: "sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						fw: 600,
						children: user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "xs",
						c: "dimmed",
						children: user.email
					})]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Item, {
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }),
				children: "Upgrade to Pro"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Item, {
				component: Link,
				to: "/settings/account",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { size: 14 }),
				children: "Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Item, {
				component: Link,
				to: "/settings",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 14 }),
				children: "Billing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Item, {
				component: Link,
				to: "/settings/notifications",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 14 }),
				children: "Notifications"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Item, {
				color: "red",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 14 }),
				onClick: () => setSignOutOpen(true),
				children: "Sign out"
			})
		] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutDialog, {
		open: signOutOpen,
		onOpenChange: setSignOutOpen
	})] });
}
//#endregion
//#region src/layout/team-switcher.tsx
var moduleIcons = {
	rxsoft: Command,
	communication: AudioWaveform,
	conversation: MessageSquare,
	"coding-concept": Boxes,
	lis: Microscope,
	admin: Shield
};
var modulePlans = {
	rxsoft: "Pharmacy Admin",
	communication: "Messaging & Routing",
	conversation: "Workflow Chat",
	"coding-concept": "Terminology",
	lis: "Laboratory",
	admin: "Administration"
};
function toTeams(modules) {
	return modules.map((mod) => ({
		name: mod.name,
		logo: moduleIcons[mod.id] || Shield,
		plan: modulePlans[mod.id] || mod.description,
		moduleId: mod.id
	}));
}
function TeamSwitcher() {
	const navigate = useNavigate();
	const moduleId = useModuleId();
	const setSelectedModuleId = useSetSelectedModule();
	const storeModules = useAuthStore((state) => state.modules);
	const fetchModules = useAuthStore((state) => state.fetchModules);
	const user = useAuthStore((state) => state.user);
	(0, import_react.useEffect)(() => {
		if (user && storeModules.length === 0) fetchModules();
	}, [
		user,
		storeModules.length,
		fetchModules
	]);
	const teams = toTeams(storeModules);
	const activeTeam = teams.find((t) => t.moduleId === moduleId) ?? teams[0];
	if (teams.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		p: "sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "sm" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
		width: 220,
		position: "right-start",
		offset: 6,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Target, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnstyledButton, {
			style: {
				width: "100%",
				padding: "10px",
				borderRadius: 8
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						style: {
							width: 32,
							height: 32,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 8,
							background: "var(--mantine-color-blue-6)",
							color: "white"
						},
						children: activeTeam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(activeTeam.logo, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 0,
						style: { flex: 1 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							fw: 600,
							truncate: true,
							children: activeTeam?.name ?? "Select Module"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							c: "dimmed",
							truncate: true,
							children: activeTeam?.plan ?? ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { size: 16 })
				]
			})
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu.Dropdown, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Label, { children: "Teams" }), teams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Item, {
			onClick: () => {
				setSelectedModuleId(team.moduleId);
				navigate({ to: getModuleDashboard(team.moduleId) });
			},
			leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(team.logo, { size: 14 }),
			rightSection: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
				size: "xs",
				c: "dimmed",
				children: ["⌘", index + 1]
			}),
			children: team.name
		}, team.moduleId))] })]
	});
}
//#endregion
//#region src/layout/app-sidebar.tsx
function AppSidebar() {
	const user = useAuthStore((state) => state.user);
	const moduleId = useModuleId();
	const moduleName = useModuleName();
	const navGroups = filterNavGroupsByModule(sidebarData.navGroups, moduleId);
	const [expandState, setExpandState] = (0, import_react.useState)(sidebarData.navGroups.map(() => false));
	const resetExpandState = (index, espanded) => {
		setExpandState(sidebarData.navGroups.map((_, inde) => {
			return inde === index ? !espanded : false;
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell.Navbar, {
		p: "sm",
		w: { base: 250 },
		style: { borderRight: "1px solid var(--mantine-color-gray-3)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			h: "100%",
			gap: "sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwitcher, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "light",
						radius: "xl",
						size: "lg",
						styles: { root: { width: "fit-content" } },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 6,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								fw: 700,
								children: moduleName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "10px",
								c: "dimmed",
								children: "module"
							})]
						})
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					flex: 1,
					scrollbarSize: 0,
					children: navGroups.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNavItem, {
						item,
						pathname: "pathname",
						resetExpandState,
						expanded: expandState[i],
						index: i,
						collapsed: false
					}, item.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavUser, { user: {
					name: user?.username ?? "RxSoft User",
					email: user?.roles?.join(", ") ?? "No roles assigned",
					avatar: sidebarData.user.avatar
				} })
			]
		})
	});
}
//#endregion
//#region src/layout/authenticated-layout.tsx
function AuthenticatedLayout({ children }) {
	getCookie("sidebar_state");
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const moduleId = useModuleId();
	useModuleFavicon(moduleId);
	useModuleTitle(moduleId);
	(0, import_react.useEffect)(() => {
		if (!isRouteAllowedForModule(pathname, moduleId)) navigate({ to: getModuleDashboard(moduleId) });
	}, [
		pathname,
		moduleId,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoLogout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		navbar: {
			width: 260,
			breakpoint: "sm"
		},
		padding: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell.Main, { children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })]
	}) }) });
}
//#endregion
export { AuthenticatedLayout as t };
