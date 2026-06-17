import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { c as EmptyProducts, u as EmptySearchResults } from "./empty-states-DOEWtCUZ.js";
import { B as line, En as SlidersHorizontal, F as WebsiteLayout, H as soft, Hr as Pagination, I as buttonStyles, J as useCategories, Lr as Title, V as muted, Wr as Grid, ht as ProductCard, jn as Search, st as useProducts, z as ink } from "./index-DwQ-NyPQ.js";
import { i as ProductLoader } from "./loaders-DXtlW3kz.js";
//#region src/features/damorex/shop/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const [sort, setSort] = (0, import_react.useState)("createdAt");
	const { data: productsData, isLoading } = useProducts({
		search,
		category: category || "",
		page,
		limit: 20
	});
	const { data: categories } = useCategories();
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
					style: {
						color: ink,
						letterSpacing: "-0.03em"
					},
					children: "Shop Medicines"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					size: "lg",
					lh: 1.7,
					children: "Browse our catalog of authentic medicines and healthcare products."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 24,
					p: "md",
					withBorder: true,
					style: {
						borderColor: line,
						background: soft
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
						align: "center",
						gap: "md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
								span: {
									base: 12,
									md: 5
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Search medicines, brands, or generics...",
									size: "lg",
									radius: "xl",
									value: search,
									onChange: (e) => {
										setSearch(e.currentTarget.value);
										setPage(1);
									},
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
									styles: { input: { borderColor: "#CFE5D7" } }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
								span: {
									base: 6,
									md: 3
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									placeholder: "Category",
									data: [{
										value: "",
										label: "All Categories"
									}, ...(categories || []).map((c) => ({
										value: c.code,
										label: c.name
									}))],
									value: category,
									onChange: (v) => {
										setCategory(v);
										setPage(1);
									},
									radius: "xl",
									clearable: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
								span: {
									base: 6,
									md: 2
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									placeholder: "Sort",
									data: [{
										value: "createdAt",
										label: "Newest"
									}, {
										value: "name",
										label: "Name A-Z"
									}],
									value: sort,
									onChange: setSort,
									radius: "xl"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
								span: {
									base: 12,
									md: 2
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									radius: "xl",
									variant: "light",
									color: "green",
									fullWidth: true,
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 16 }),
									styles: buttonStyles,
									children: "Filters"
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
					cols: {
						base: 1,
						sm: 2,
						lg: 4
					},
					spacing: "md",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductLoader, {}) : productsData?.data?.length ? productsData.data.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.id)) : search ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptySearchResults, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyProducts, {})
				}),
				productsData && productsData.total > productsData.limit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
					justify: "center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
						total: Math.ceil(productsData.total / productsData.limit),
						value: page,
						onChange: setPage,
						radius: "xl",
						color: "green"
					})
				}) : null
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/shop.tsx?tsr-split=component
var SplitComponent = ShopPage;
//#endregion
export { SplitComponent as component };
