import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as BookOpen } from "./book-open-D9F3OwEf.js";
import { t as HeartPulse } from "./heart-pulse-__ikndAu.js";
import { t as Tags } from "./tags-BzJ52kNM.js";
import { B as line, F as WebsiteLayout, In as Pill, Lr as Title, Pr as useNavigate, R as green, V as muted, ht as ProductCard, jn as Search, lt as useSearch } from "./index-DuM1cidb.js";
import { a as SearchLoader } from "./loaders-Dr-tBb5Z.js";
//#region src/features/damorex/search/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const results = useSearch(query);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				radius: 24,
				p: "lg",
				withBorder: true,
				style: { borderColor: line },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search medicines, categories, articles, health concerns...",
					size: "xl",
					radius: "xl",
					value: query,
					onChange: (e) => setQuery(e.currentTarget.value),
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 22 }),
					styles: { input: { borderColor: "#CFE5D7" } },
					autoFocus: true
				})
			}), query.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				ta: "center",
				children: "Type at least 2 characters to search."
			}) : results.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchLoader, {}) : results.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "xl",
				children: [
					results.data.medicines?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 8,
						mb: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							size: 20,
							color: green
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Title, {
							order: 3,
							className: "damorex-heading",
							children: [
								"Medicines (",
								results.data.medicines.length,
								")"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: {
							base: 1,
							sm: 2,
							lg: 4
						},
						spacing: "md",
						children: results.data.medicines.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.id))
					})] }) : null,
					results.data.categories?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 8,
						mb: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, {
							size: 20,
							color: green
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 3,
							className: "damorex-heading",
							children: "Categories"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: {
							base: 2,
							sm: 3
						},
						spacing: "sm",
						children: results.data.categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							className: "lift-card",
							radius: 20,
							p: "md",
							withBorder: true,
							style: {
								borderColor: line,
								cursor: "pointer"
							},
							onClick: () => navigate({ to: `/damorex/categories/${cat.code}` }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: cat.name
							})
						}, cat.id))
					})] }) : null,
					results.data.articles?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 8,
						mb: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
							size: 20,
							color: green
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 3,
							className: "damorex-heading",
							children: "Articles"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						gap: "sm",
						children: results.data.articles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							className: "lift-card",
							radius: 20,
							p: "md",
							withBorder: true,
							style: {
								borderColor: line,
								cursor: "pointer"
							},
							onClick: () => navigate({ to: `/damorex/blog/${article.slug}` }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: article.title
							}), article.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: muted,
								children: article.excerpt
							}) : null]
						}, article.id))
					})] }) : null,
					results.data.healthConcerns?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 8,
						mb: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, {
							size: 20,
							color: green
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 3,
							className: "damorex-heading",
							children: "Health Concerns"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: {
							base: 2,
							sm: 3
						},
						spacing: "sm",
						children: results.data.healthConcerns.map((hc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							className: "lift-card",
							radius: 20,
							p: "md",
							withBorder: true,
							style: {
								borderColor: line,
								cursor: "pointer"
							},
							onClick: () => navigate({ to: `/damorex/health-concerns/${hc.slug}` }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 900,
								children: hc.name
							})
						}, hc.id))
					})] }) : null,
					!results.data.medicines?.length && !results.data.categories?.length && !results.data.articles?.length && !results.data.healthConcerns?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						c: muted,
						ta: "center",
						children: [
							"No results found for \"",
							query,
							"\"."
						]
					}) : null
				]
			}) : null]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/search.tsx?tsr-split=component
var SplitComponent = SearchPage;
//#endregion
export { SplitComponent as component };
