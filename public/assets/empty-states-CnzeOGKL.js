import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as CalendarClock } from "./calendar-clock-B1k3tdZz.js";
import { t as FileText } from "./file-text-ZMRlE-dq.js";
import { t as FileUp } from "./file-up-B7FXjQGu.js";
import { t as Package } from "./package-Cis-Q__o.js";
import { Dn as ShoppingCart, In as Pill, Kn as Gift, Lr as Title, Pr as useNavigate, bt as muted, vt as green, wn as Stethoscope, zr as ThemeIcon } from "./index-DuM1cidb.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FolderOpen = createLucideIcon("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SearchX = createLucideIcon("search-x", [
	["path", {
		d: "m13.5 8.5-5 5",
		key: "1cs55j"
	}],
	["path", {
		d: "m8.5 8.5 5 5",
		key: "a8mexj"
	}],
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["path", {
		d: "m21 21-4.3-4.3",
		key: "1qie3q"
	}]
]);
//#endregion
//#region src/features/damorex/website/empty-states.tsx
var import_jsx_runtime = require_jsx_runtime();
function EmptyStateWrapper({ icon, title, message, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xs",
		py: 80,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			align: "center",
			gap: "lg",
			style: { textAlign: "center" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
					radius: "xl",
					size: 80,
					color: "green",
					variant: "light",
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 8,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						className: "damorex-heading",
						style: { color: "#0F172A" },
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						c: muted,
						size: "md",
						lh: 1.7,
						children: message
					})]
				}),
				actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
					gap: "sm",
					mt: "xs",
					children: actions
				}) : null
			]
		})
	});
}
function EmptyProducts({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { size: 36 }),
		title: title ?? "No medicines found",
		message: message ?? "We couldn't find any medicines matching your criteria. Try a different category or search term.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/shop" }),
			children: "Browse Catalog"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			variant: "outline",
			color: "gray",
			onClick: () => navigate({ to: "/damorex/search" }),
			children: "Search"
		})] })
	});
}
function EmptySearchResults({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { size: 36 }),
		title: title ?? "No results found",
		message: message ?? "We couldn't find any matches for your search. Try different keywords or browse our categories.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			variant: "outline",
			color: "gray",
			onClick: () => navigate({ to: "/damorex/search" }),
			children: "Try Again"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/shop" }),
			children: "Browse Categories"
		})] })
	});
}
function EmptyOrders({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 36 }),
		title: title ?? "No orders yet",
		message: message ?? "You haven't placed any orders yet. Start shopping and your order history will appear here.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/shop" }),
			children: "Start Shopping"
		})
	});
}
function EmptyPrescriptions({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 36 }),
		title: title ?? "No prescriptions uploaded",
		message: message ?? "You haven't uploaded any prescriptions yet. Upload your doctor's prescription and our pharmacists will review it.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/upload-prescription" }),
			children: "Upload Prescription"
		})
	});
}
function EmptyCart({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 36 }),
		title: title ?? "Your cart is empty",
		message: message ?? "Your shopping cart is empty. Browse our medicines and add items to get started.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/shop" }),
			children: "Browse Medicines"
		})
	});
}
function EmptyConsultations({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 36 }),
		title: title ?? "No consultations booked",
		message: message ?? "You haven't booked any consultations yet. Speak with a licensed pharmacist from the comfort of your home.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/consult-pharmacist" }),
			children: "Book a Consultation"
		})
	});
}
function EmptyRewards({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { size: 36 }),
		title: title ?? "No reward activity yet",
		message: message ?? "You don't have any reward activity yet. Earn points with every purchase and redeem them on future orders.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			variant: "outline",
			color: "green",
			onClick: () => navigate({ to: "/damorex/shop" }),
			children: "Learn About Rewards"
		})
	});
}
function EmptyBlog({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 36 }),
		title: title ?? "No articles yet",
		message: message ?? "We haven't published any articles yet. Check back later for health tips, medication guides, and wellness advice.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			variant: "outline",
			color: "gray",
			onClick: () => navigate({ to: "/damorex/blog" }),
			children: "Check Back Later"
		})
	});
}
function EmptyCategories({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { size: 36 }),
		title: title ?? "No categories found",
		message: message ?? "We couldn't find any categories matching your search. Try different keywords.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/shop" }),
			children: "Browse All"
		})
	});
}
function EmptyHealthConcerns({ title, message }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateWrapper, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { size: 36 }),
		title: title ?? "No health concerns listed",
		message: message ?? "We couldn't find any health concerns matching your search. Try different keywords or browse our medicine catalog.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			radius: "xl",
			style: { background: green },
			onClick: () => navigate({ to: "/damorex/health-concerns" }),
			children: "Browse All"
		})
	});
}
//#endregion
export { EmptyHealthConcerns as a, EmptyProducts as c, EmptyConsultations as i, EmptyRewards as l, EmptyCart as n, EmptyOrders as o, EmptyCategories as r, EmptyPrescriptions as s, EmptyBlog as t, EmptySearchResults as u };
