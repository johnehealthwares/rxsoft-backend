import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as EmptyBlog } from "./empty-states-CnzeOGKL.js";
import { $n as ChevronRight, B as line, F as WebsiteLayout, G as useArticles, Pr as useNavigate, R as green, Ur as Image, V as muted, Wr as Grid, Xn as Clock3, gt as SectionHeading, jn as Search, or as ArrowRight, rr as Calendar, vn as User, z as ink } from "./index-DuM1cidb.js";
//#region src/features/damorex/blog/list.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var BLOG_CATEGORIES = [
	"All Articles",
	"Medications",
	"Wellness",
	"Disease Management",
	"Nutrition",
	"Mental Health",
	"First Aid",
	"Pharmacy News"
];
var PLACEHOLDER_IMG = "https://placehold.co/600x400/16A34A/white?text=Article";
var PER_PAGE = 9;
function ArticleCard({ article, featured }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
		className: "lift-card",
		radius: 24,
		withBorder: true,
		style: {
			borderColor: line,
			cursor: "pointer",
			height: "100%",
			overflow: "hidden",
			background: "#fff"
		},
		onClick: () => navigate({ to: `/damorex/blog/${article.slug}` }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			style: {
				position: "relative",
				overflow: "hidden"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: article.imageUrl || PLACEHOLDER_IMG,
					alt: article.title,
					h: featured ? 320 : 200,
					fit: "cover",
					style: { transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)" },
					className: "lift-card"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: featured ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" : void 0
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					size: "sm",
					radius: "xl",
					style: {
						position: "absolute",
						top: 12,
						left: 12,
						background: "rgba(22, 163, 74, 0.9)",
						color: "#fff",
						backdropFilter: "blur(4px)"
					},
					children: "Health Education"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			p: "lg",
			gap: "sm",
			style: { flex: 1 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 900,
					lh: 1.3,
					c: ink,
					style: { fontSize: featured ? 20 : 16 },
					children: article.title
				}),
				article.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: muted,
					lh: 1.7,
					style: {
						display: "-webkit-box",
						WebkitLineClamp: featured ? 4 : 3,
						WebkitBoxOrient: "vertical",
						overflow: "hidden"
					},
					children: article.excerpt
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "xs",
					mt: "auto",
					wrap: "wrap",
					children: [
						article.authorName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								size: 12,
								color: muted
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								c: muted,
								children: article.authorName
							})]
						}) : null,
						article.readingTime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
								size: 12,
								color: muted
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								size: "xs",
								c: muted,
								children: [article.readingTime, " min"]
							})]
						}) : null,
						article.publishedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 4,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								size: 12,
								color: muted
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								c: muted,
								children: new Date(article.publishedAt).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric"
								})
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: 4,
					mt: 4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						c: green,
						fw: 800,
						children: "Read Article"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						size: 14,
						color: green
					})]
				})
			]
		})]
	});
}
function ArticleCardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
		radius: 24,
		withBorder: true,
		style: {
			borderColor: line,
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			h: 200,
			radius: 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			p: "lg",
			gap: "sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 20,
					w: "80%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 14,
					w: "100%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 14,
					w: "60%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "xs",
					mt: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						h: 12,
						w: 80
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						h: 12,
						w: 60
					})]
				})
			]
		})]
	});
}
function BlogListPage() {
	useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All Articles");
	const [page, setPage] = (0, import_react.useState)(1);
	const params = {
		page,
		limit: PER_PAGE
	};
	if (search) params.search = search;
	const { data, isLoading, isFetching } = useArticles(params);
	const articles = data?.data ?? [];
	const total = data?.total ?? 0;
	const hasMore = articles.length < total;
	const featured = articles[0];
	const filteredArticles = articles.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Blog & Health Education Center",
					title: "Practical health education from the pharmacy team",
					text: "Expert advice, medication guides, wellness tips, and trusted health information from Damorex pharmacists."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
					gap: "sm",
					wrap: "nowrap",
					style: { overflowX: "auto" },
					pb: 4,
					children: BLOG_CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						radius: "xl",
						size: "lg",
						style: {
							cursor: "pointer",
							whiteSpace: "nowrap",
							background: cat === activeCategory ? green : "transparent",
							color: cat === activeCategory ? "#fff" : muted,
							border: `1px solid ${cat === activeCategory ? green : line}`,
							fontWeight: 800,
							padding: "8px 18px",
							transition: "all 220ms cubic-bezier(0.22,1,0.36,1)",
							flexShrink: 0
						},
						onClick: () => {
							setActiveCategory(cat);
							setPage(1);
						},
						children: cat
					}, cat))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search articles...",
					radius: "xl",
					size: "md",
					value: search,
					onChange: (e) => {
						setSearch(e.currentTarget.value);
						setPage(1);
					},
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 18,
						color: muted
					}),
					styles: { input: { borderColor: line } },
					maw: 420
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						h: 320,
						radius: 24
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: {
							base: 12,
							sm: 6,
							md: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCardSkeleton, {})
					}, i)) })]
				}) : articles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBlog, {
					title: search ? "No Articles Found" : void 0,
					message: search ? `No articles match "${search}". Try adjusting your search terms.` : void 0
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						tt: "uppercase",
						size: "xs",
						fw: 900,
						c: green,
						lts: 1.4,
						mb: "sm",
						children: "Featured Article"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
						article: featured,
						featured: true
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: filteredArticles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: {
							base: 12,
							sm: 6,
							md: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article })
					}, article.id)) }),
					isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: {
							base: 12,
							sm: 6,
							md: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCardSkeleton, {})
					}, i)) }) : null,
					hasMore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						justify: "center",
						mt: "md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							size: "lg",
							variant: "light",
							color: "green",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 }),
							loading: isFetching,
							onClick: () => setPage((p) => p + 1),
							styles: { root: { transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease" } },
							children: "Load More Articles"
						})
					}) : null,
					articles.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						ta: "center",
						size: "sm",
						c: muted,
						children: [
							"Showing ",
							articles.length,
							" of ",
							total,
							" articles"
						]
					}) : null
				] })
			]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/blog.tsx?tsr-split=component
var SplitComponent = BlogListPage;
//#endregion
export { SplitComponent as component };
