import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { r as EmptyCategories } from "./empty-states-DOEWtCUZ.js";
import { t as HeartPulse } from "./heart-pulse-__ikndAu.js";
import { t as PackageCheck } from "./package-check-BGabzg7m.js";
import { t as UsersRound } from "./users-round-BqVBa2b5.js";
import { B as line, Dn as ShoppingCart, F as WebsiteLayout, In as Pill, J as useCategories, Lr as Title, Pr as useNavigate, Tn as Sparkles, V as muted, ar as Baby, wn as Stethoscope, z as ink, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
import { o as SectionLoader } from "./loaders-DXtlW3kz.js";
//#region src/features/damorex/categories/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var icons = [
	Pill,
	Sparkles,
	HeartPulse,
	Stethoscope,
	Baby,
	UsersRound,
	PackageCheck,
	ShoppingCart,
	Pill
];
function CategoriesPage() {
	const { data: categories, isLoading } = useCategories();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 1,
				className: "damorex-heading",
				style: { color: ink },
				children: "Categories"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "Browse all product categories."
			})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLoader, {}) : !categories?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCategories, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
				cols: {
					base: 2,
					sm: 3,
					md: 4
				},
				spacing: "md",
				children: categories.map((cat, i) => {
					const Icon = icons[i % icons.length];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						className: "lift-card",
						radius: 24,
						p: "lg",
						withBorder: true,
						style: {
							borderColor: line,
							cursor: "pointer"
						},
						onClick: () => navigate({ to: `/damorex/categories/${cat.code}` }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							align: "center",
							gap: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
								radius: "xl",
								size: 52,
								color: "green",
								variant: "light",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 24 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								ta: "center",
								children: cat.name
							})]
						})
					}, cat.id);
				})
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/categories.tsx?tsr-split=component
var SplitComponent = CategoriesPage;
//#endregion
export { SplitComponent as component };
