import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { F as WebsiteLayout, Ir as useParams, Lr as Title, V as muted, Y as useCategoryBySlug, ht as ProductCard, z as ink } from "./index-DwQ-NyPQ.js";
//#region src/features/damorex/categories/category.tsx
var import_jsx_runtime = require_jsx_runtime();
function CategoryProductsPage() {
	const { slug } = useParams({ from: "/damorex/categories/$slug" });
	const { data, isLoading } = useCategoryBySlug(slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					className: "damorex-heading",
					style: { color: ink },
					children: data?.category?.name || slug
				}), data?.category?.parent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					size: "sm",
					children: data.category.parent.name
				}) : null] }),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "Loading..." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
					cols: {
						base: 1,
						sm: 2,
						lg: 4
					},
					spacing: "md",
					children: data?.products?.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.id))
				}),
				data?.products?.length === 0 && !isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					children: "No products in this category."
				}) : null
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/categories.$slug.tsx?tsr-split=component
var SplitComponent = CategoryProductsPage;
//#endregion
export { SplitComponent as component };
