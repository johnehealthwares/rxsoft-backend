import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { Ir as useParams, Lr as Title, Pr as useNavigate } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DsBYIIU2.js";
import { a as PrimaryButton } from "./components-C313Z28z.js";
import { l as useNewsArticle } from "./hooks-BM0Vr-3Y.js";
//#region src/features/apm/news/article.tsx
var import_jsx_runtime = require_jsx_runtime();
function NewsArticlePage() {
	const { slug } = useParams({ from: "/apm/news/$slug" });
	const { data: article, isLoading } = useNewsArticle(slug);
	const navigate = useNavigate();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: 120,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { color: apmBlue })
		})
	}) });
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: 120,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			ta: "center",
			style: { color: muted },
			children: "Article not found."
		})
	}) });
	const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: soft },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			size: "md",
			children: [
				article.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					fw: 600,
					style: {
						color: "#0066CC",
						textTransform: "uppercase",
						letterSpacing: "0.08em",
						marginBottom: 16
					},
					children: article.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					style: {
						fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
						fontWeight: 800,
						letterSpacing: "-0.03em",
						color: ink,
						lineHeight: 1.3,
						marginBottom: 16
					},
					children: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "xs",
					mb: 32,
					children: [date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						style: { color: "#64748B" },
						children: date
					}), article.authorName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						style: { color: "#64748B" },
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "sm",
						style: { color: "#64748B" },
						children: ["By ", article.authorName]
					})] })]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 64,
		style: { background: "#fff" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			size: "md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				style: {
					color: ink,
					lineHeight: 1.9,
					fontSize: "1.05rem",
					whiteSpace: "pre-wrap"
				},
				children: article.content
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "center",
				mt: 48,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: () => navigate({ to: "/apm/news" }),
					children: "Back to News"
				})
			})]
		})
	})] });
}
//#endregion
//#region src/routes/apm/news.$slug.tsx?tsr-split=component
var SplitComponent = NewsArticlePage;
//#endregion
export { SplitComponent as component };
