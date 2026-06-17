import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DsBYIIU2.js";
import { o as SectionHeading, r as NewsCard } from "./components-C313Z28z.js";
import { c as useNews } from "./hooks-BM0Vr-3Y.js";
//#region src/features/apm/news/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const { data, isLoading } = useNews();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: `linear-gradient(135deg, ${soft} 0%, #DBEAFE 30%, #ffffff 100%)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "News & Media",
				subtitle: "Latest updates, policy announcements, and campaign coverage."
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: "#fff" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { color: apmBlue })
			}) : !data?.items?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				ta: "center",
				style: { color: muted },
				children: "No news articles yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
				cols: {
					base: 1,
					sm: 2
				},
				spacing: 24,
				children: data.items.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsCard, {
					title: article.title,
					excerpt: article.excerpt ?? "",
					category: article.category ?? "News",
					publishedAt: article.publishedAt,
					authorName: article.authorName ?? "",
					slug: article.slug
				}, article.id))
			})
		})
	})] });
}
//#endregion
//#region src/routes/apm/news.tsx?tsr-split=component
var SplitComponent = NewsPage;
//#endregion
export { SplitComponent as component };
