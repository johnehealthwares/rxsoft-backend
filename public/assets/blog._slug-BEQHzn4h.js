import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Tooltip } from "./Tooltip-Ta-fBfrz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Anchor } from "./Anchor-DyykEMLS.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as BookOpen } from "./book-open-D9F3OwEf.js";
import { t as Share2 } from "./share-2-Dxxpz1qz.js";
import { t as Smartphone } from "./smartphone-7uezS56l.js";
import { t as Star } from "./star-DwsFN-Yw.js";
import { $n as ChevronRight, B as line, F as WebsiteLayout, H as soft, Ir as useParams, Lr as Title, Pr as useNavigate, R as green, Ur as Image, V as muted, Vn as MessageCircle, W as useArticleBySlug, Wr as Grid, Xn as Clock3, gt as SectionHeading, rr as Calendar, vn as User, z as ink, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Link2 = createLucideIcon("link-2", [
	["path", {
		d: "M9 17H7A5 5 0 0 1 7 7h2",
		key: "8i5ue5"
	}],
	["path", {
		d: "M15 7h2a5 5 0 1 1 0 10h-2",
		key: "1b9ql8"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "12",
		y2: "12",
		key: "1jonct"
	}]
]);
//#endregion
//#region src/features/damorex/blog/article.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PLACEHOLDER_IMG = "https://placehold.co/1200x500/16A34A/white?text=Article";
function ArticleSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 400,
					radius: 24
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 40,
					w: "70%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 20,
					w: "40%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 200,
					radius: 24
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 14,
					w: "100%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 14,
					w: "100%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 14,
					w: "80%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 14,
					w: "100%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					h: 14,
					w: "60%"
				})
			]
		})
	});
}
function ShareButton({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			style: {
				width: 40,
				height: 40,
				borderRadius: "50%",
				background: soft,
				border: `1px solid ${line}`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				cursor: "pointer",
				transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), background 220ms ease"
			},
			onClick: () => console.log(`Share via ${label}`),
			className: "lift-card",
			children: icon
		})
	});
}
function ArticlePage() {
	const { slug } = useParams({ from: "/damorex/blog/$slug" });
	const navigate = useNavigate();
	const { data, isLoading, isError } = useArticleBySlug(slug);
	const article = data?.article;
	const related = data?.related || [];
	const headings = (0, import_react.useMemo)(() => {
		if (!article?.content) return [];
		const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
		const results = [];
		let match;
		while ((match = regex.exec(article.content)) !== null) {
			const text = match[2].replace(/<[^>]+>/g, "");
			const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
			results.push({
				level: Number(match[1]),
				text,
				id
			});
		}
		return results;
	}, [article?.content]);
	const styledContent = (0, import_react.useMemo)(() => {
		if (!article?.content) return "";
		let html = article.content;
		headings.forEach((h) => {
			const regex = new RegExp(`<h${h.level}[^>]*>${h.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h${h.level}>`);
			html = html.replace(regex, `<h${h.level} id="${h.id}">${h.text}</h${h.level}>`);
		});
		html = html.replace(/<p>/g, "<p style=\"margin-bottom:1.2em;line-height:1.9;color:#64748B;\">");
		html = html.replace(/<h2/g, "<h2 style=\"font-size:1.5rem;font-weight:900;margin-top:2rem;margin-bottom:0.75rem;color:#0F172A;letter-spacing:-0.02em;\"");
		html = html.replace(/<h3/g, "<h3 style=\"font-size:1.15rem;font-weight:900;margin-top:1.5rem;margin-bottom:0.5rem;color:#0F172A;\"");
		html = html.replace(/<ul>/g, "<ul style=\"padding-left:1.5rem;margin-bottom:1.2em;color:#64748B;line-height:1.9;\">");
		html = html.replace(/<ol>/g, "<ol style=\"padding-left:1.5rem;margin-bottom:1.2em;color:#64748B;line-height:1.9;\">");
		html = html.replace(/<li>/g, "<li style=\"margin-bottom:0.4em;\">");
		html = html.replace(/<blockquote>/g, "<blockquote style=\"border-left:4px solid #16A34A;padding:1rem 1.5rem;margin:1.5rem 0;background:#F7FBF9;border-radius:12px;color:#0F172A;font-style:italic;\">");
		return html;
	}, [article?.content, headings]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleSkeleton, {}) });
	if (isError || !article) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			radius: 24,
			p: "xl",
			withBorder: true,
			style: {
				borderColor: line,
				textAlign: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "md",
				align: "center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
						size: 48,
						color: muted
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 3,
						c: ink,
						children: "Article Not Found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						c: muted,
						maw: 480,
						children: "The article you're looking for doesn't exist or has been removed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						radius: "xl",
						color: "green",
						onClick: () => navigate({ to: "/damorex/blog" }),
						children: "Back to Blog"
					})
				]
			})
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		style: {
			position: "relative",
			height: 480,
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				style: {
					height: "100%",
					position: "relative"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: article.imageUrl || PLACEHOLDER_IMG,
					alt: article.title,
					h: 480,
					fit: "cover",
					style: { width: "100%" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
				position: "absolute",
				inset: 0,
				background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "md",
				style: {
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					padding: "0 16px 48px",
					margin: "0 auto"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					style: { color: "#fff" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							size: "lg",
							radius: "xl",
							style: {
								background: "rgba(22, 163, 74, 0.9)",
								color: "#fff",
								width: "fit-content",
								backdropFilter: "blur(4px)"
							},
							children: "Health Education"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 1,
							style: {
								fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
								lineHeight: 1.1,
								letterSpacing: "-0.03em",
								maxWidth: 720
							},
							children: article.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "md",
							wrap: "wrap",
							children: [
								article.authorName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										fw: 700,
										children: article.authorName
									})]
								}) : null,
								article.readingTime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
										size: "sm",
										children: [article.readingTime, " min read"]
									})]
								}) : null,
								article.publishedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										children: new Date(article.publishedAt).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric"
										})
									})]
								}) : null
							]
						})
					]
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [headings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 12,
					md: 3
				},
				visibleFrom: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					style: {
						position: "sticky",
						top: 100,
						alignSelf: "start"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 900,
						size: "sm",
						c: ink,
						mb: "sm",
						tt: "uppercase",
						lts: 1.2,
						children: "On this page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						gap: 4,
						children: headings.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
							href: `#${h.id}`,
							size: "sm",
							c: muted,
							fw: h.level === 2 ? 700 : 400,
							underline: "never",
							style: {
								paddingLeft: h.level === 3 ? 16 : 0,
								cursor: "pointer",
								transition: "color 220ms ease"
							},
							className: "damorex-link",
							children: h.text
						}, h.id))
					})]
				})
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: {
					base: 12,
					md: headings.length > 0 ? 9 : 12
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							radius: 24,
							p: {
								base: "md",
								md: "xl"
							},
							withBorder: true,
							style: {
								borderColor: line,
								background: "#fff"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								dangerouslySetInnerHTML: { __html: styledContent },
								style: { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }
							})
						}),
						article.authorName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							radius: 24,
							p: "lg",
							withBorder: true,
							style: {
								borderColor: line,
								background: soft
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "md",
								wrap: "nowrap",
								align: "start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									style: {
										width: 56,
										height: 56,
										borderRadius: "50%",
										background: green,
										color: "#fff",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontWeight: 900,
										fontSize: 20,
										flexShrink: 0
									},
									children: article.authorName.charAt(0).toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									c: ink,
									children: article.authorName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "sm",
									c: muted,
									lh: 1.7,
									children: [article.authorName, " is a licensed pharmacist and health educator at Damorex, dedicated to providing accurate, practical health information to the community."]
								})] })]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: "sm",
							justify: "space-between",
							wrap: "wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 700,
									c: muted,
									children: "Share this article:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 6,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "#1877F2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
											}),
											label: "Facebook"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "#1DA1F2",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" })
											}),
											label: "Twitter"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
												size: 16,
												color: "#25D366"
											}),
											label: "WhatsApp"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
												size: 16,
												color: muted
											}),
											label: "Copy Link"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								radius: "xl",
								variant: "light",
								color: "green",
								leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { size: 16 }),
								children: "Share"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { color: line })
					]
				})
			})] }),
			related.filter((r) => r.id !== article.id).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				mt: 48,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Related Articles",
					title: "More articles you might like"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
					mt: "md",
					children: related.filter((r) => r.id !== article.id).slice(0, 3).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
						span: {
							base: 12,
							sm: 6,
							md: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
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
							onClick: () => navigate({ to: `/damorex/blog/${r.slug}` }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: r.imageUrl || PLACEHOLDER_IMG,
								alt: r.title,
								h: 160,
								fit: "cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								p: "lg",
								gap: "sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 900,
										lh: 1.3,
										c: ink,
										children: r.title
									}),
									r.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: muted,
										lh: 1.7,
										style: {
											display: "-webkit-box",
											WebkitLineClamp: 2,
											WebkitBoxOrient: "vertical",
											overflow: "hidden"
										},
										children: r.excerpt
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										gap: 4,
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
						})
					}, r.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				size: "md",
				py: {
					base: 48,
					md: 64
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					radius: 30,
					p: {
						base: "lg",
						md: "xl"
					},
					style: {
						background: "radial-gradient(circle at top right, rgba(14,165,233,0.18), transparent 35%), #0F172A",
						color: "#fff"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
						align: "center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: {
								base: 12,
								md: 6
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: "md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
										radius: "xl",
										color: "blue",
										size: 54,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 26 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
										order: 2,
										className: "damorex-heading",
										children: "Stay Healthy. Stay Informed."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: "rgba(255,255,255,0.76)",
										lh: 1.7,
										children: "Get health tips, promotions and refill reminders sent to your inbox or phone."
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: {
								base: 12,
								md: 6
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: "md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									grow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: { width: "100%" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "sm",
											fw: 800,
											mb: 6,
											children: "Email address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											placeholder: "you@example.com",
											style: {
												width: "100%",
												padding: "12px 18px",
												borderRadius: 999,
												border: "none",
												fontSize: 14
											}
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: { width: "100%" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "sm",
											fw: 800,
											mb: 6,
											children: "Phone number"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											placeholder: "+234",
											style: {
												width: "100%",
												padding: "12px 18px",
												borderRadius: 999,
												border: "none",
												fontSize: 14
											}
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									radius: "xl",
									color: "green",
									size: "md",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 18 }),
									styles: { root: { transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease, background-color 220ms ease" } },
									style: {
										background: green,
										alignSelf: "flex-start"
									},
									children: "Subscribe"
								})]
							})
						})]
					})
				})
			})
		]
	})] });
}
//#endregion
//#region src/routes/damorex/blog.$slug.tsx?tsr-split=component
var SplitComponent = ArticlePage;
//#endregion
export { SplitComponent as component };
