import { t as Box } from "./Box-7OfPvxF3.js";
import { t as useDisclosure } from "./use-disclosure-BsMe8jWR.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Anchor } from "./Anchor-DyykEMLS.js";
import { a as Burger, i as Heart, n as MessageCircle, r as MapPin, t as Phone } from "./phone-MyagsAGu.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Share2 } from "./share-2-Dxxpz1qz.js";
import { Pr as Title, er as Calendar, jr as useNavigate, kn as Send, tr as BadgeCheck } from "./index-BRcLwOKn.js";
//#region src/features/apm/assets/logo.webp
var logo_default = "/assets/logo-DhWZQSWJ.webp";
//#endregion
//#region src/features/apm/website/layout.tsx
var import_jsx_runtime = require_jsx_runtime();
var apmBlue = "#0066CC";
var apmGreen = "#1F8A3B";
var ink = "#1E293B";
var muted = "#64748B";
var line = "#E2E8F0";
var soft = "#F8FAFC";
var navItems = [
	{
		label: "Home",
		path: "/apm"
	},
	{
		label: "Meet Adekanmbi",
		path: "/apm/meet"
	},
	{
		label: "Oyo Next",
		path: "/apm/agenda"
	},
	{
		label: "Achievements",
		path: "/apm/achievements"
	},
	{
		label: "News",
		path: "/apm/news"
	},
	{
		label: "Events",
		path: "/apm/events"
	},
	{
		label: "Volunteer",
		path: "/apm/volunteer"
	},
	{
		label: "Media",
		path: "/apm/media"
	},
	{
		label: "Contact",
		path: "/apm/contact"
	}
];
function WebsiteHeader() {
	const [opened, { toggle, close }] = useDisclosure(false);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		style: {
			background: "#002D5A",
			color: "#fff",
			fontSize: 13
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			py: 8,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				gap: "xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
					gap: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "xs",
						fw: 700,
						children: "Continuity with Competence"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "lg",
					visibleFrom: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
							size: 13,
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							fw: 600,
							children: "0800-CALL-APM"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							size: 13,
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							fw: 600,
							children: "Join WhatsApp Community"
						})]
					})]
				})]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		component: "header",
		style: {
			background: "#fff",
			borderBottom: "1px solid #E2E8F0",
			position: "sticky",
			top: 0,
			zIndex: 100
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				h: 72,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 8,
						style: { cursor: "pointer" },
						onClick: () => navigate({ to: "/apm" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "Adekanmbi/APM",
							style: {
								width: 44,
								height: 44,
								borderRadius: 8,
								objectFit: "contain"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							visibleFrom: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 800,
								size: "lg",
								style: {
									color: ink,
									letterSpacing: "-0.02em",
									lineHeight: 1.2
								},
								children: "Adekanmbi/APM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								style: { color: muted },
								children: "Oyo State 2027"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: "xs",
						visibleFrom: "md",
						children: [navItems.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
							href: item.path,
							underline: "never",
							style: {
								color: ink,
								fontWeight: 500,
								fontSize: 14,
								padding: "6px 12px",
								borderRadius: 6,
								transition: "background-color 180ms ease, color 180ms ease"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.background = "#F0F4FF";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.background = "transparent";
							},
							children: item.label
						}, item.path)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => navigate({ to: "/apm/join" }),
							styles: { root: {
								background: apmBlue,
								fontWeight: 700,
								fontSize: 14,
								transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease",
								"&:hover": {
									background: "#0052A3",
									transform: "translateY(-1px)",
									boxShadow: "0 4px 16px rgba(0,102,204,0.3)"
								}
							} },
							children: "Join The Movement"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
							variant: "subtle",
							size: "lg",
							color: "dark",
							"aria-label": "Share",
							visibleFrom: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Burger, {
							opened,
							onClick: toggle,
							hiddenFrom: "md",
							"aria-label": "Toggle navigation"
						})]
					})
				]
			})
		}), opened && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			style: {
				background: "#fff",
				borderTop: "1px solid #E2E8F0",
				padding: "16px 0"
			},
			hiddenFrom: "md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: 4,
				children: [
					navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
						href: item.path,
						underline: "never",
						onClick: close,
						style: {
							color: "#1E293B",
							fontWeight: 600,
							fontSize: 16,
							padding: "12px 8px",
							borderRadius: 8
						},
						children: item.label
					}, item.path)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { my: "sm" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						onClick: () => {
							close();
							navigate({ to: "/apm/join" });
						},
						styles: { root: {
							background: "#0066CC",
							fontWeight: 700,
							marginTop: 8,
							"&:hover": { background: "#0052A3" }
						} },
						children: "Join The Movement"
					})
				]
			}) })
		})]
	})] });
}
function WebsiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "footer",
		style: {
			background: "#002D5A",
			color: "#CBD5E1",
			paddingTop: 64,
			paddingBottom: 32
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			size: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					mb: 48,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						align: "flex-start",
						style: { flexWrap: "wrap" },
						justify: "space-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							style: {
								maxWidth: 320,
								minWidth: 240
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: 8,
									mb: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: logo_default,
										alt: "APM",
										style: {
											width: 40,
											height: 40,
											borderRadius: 8,
											objectFit: "contain"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 800,
										size: "lg",
										style: {
											color: "#fff",
											lineHeight: 1.2
										},
										children: "Adekanmbi/APM"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "xs",
										style: { color: "#94A3B8" },
										children: "Oyo State 2027"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									style: {
										lineHeight: 1.8,
										marginBottom: 16
									},
									children: "The official campaign website of Bimbo Adekanmbi, candidate for Governor of Oyo State under the Allied Peoples Movement."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									gap: "xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
											variant: "subtle",
											size: "lg",
											color: "gray",
											"aria-label": "Facebook",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { size: 18 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
											variant: "subtle",
											size: "lg",
											color: "gray",
											"aria-label": "Twitter",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 18 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
											variant: "subtle",
											size: "lg",
											color: "gray",
											"aria-label": "Instagram",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 18 })
										})
									]
								})
							]
						}), [
							{
								heading: "Campaign",
								links: [
									{
										label: "Meet Adekanmbi",
										path: "/apm/meet"
									},
									{
										label: "Oyo Next Agenda",
										path: "/apm/agenda"
									},
									{
										label: "Achievements",
										path: "/apm/achievements"
									},
									{
										label: "News & Media",
										path: "/apm/news"
									},
									{
										label: "Events",
										path: "/apm/events"
									}
								]
							},
							{
								heading: "Get Involved",
								links: [
									{
										label: "Join The Movement",
										path: "/apm/join"
									},
									{
										label: "Volunteer",
										path: "/apm/volunteer"
									},
									{
										label: "Citizens Speak",
										path: "/apm/citizens-speak"
									},
									{
										label: "Report Issues",
										path: "/apm/report"
									},
									{
										label: "Donate",
										path: "/apm/donate"
									}
								]
							},
							{
								heading: "Contact",
								links: [
									{
										label: "Contact Us",
										path: "/apm/contact"
									},
									{
										label: "Media Resources",
										path: "/apm/media"
									},
									{
										label: "WhatsApp Community",
										path: "#"
									}
								]
							}
						].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							style: { minWidth: 160 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								fw: 700,
								style: {
									color: "#fff",
									marginBottom: 16,
									fontSize: 14
								},
								children: col.heading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								gap: 10,
								children: col.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
									href: link.path,
									underline: "never",
									style: {
										color: "#94A3B8",
										fontSize: 14,
										transition: "color 180ms ease"
									},
									onMouseEnter: (e) => {
										e.currentTarget.style.color = "#fff";
									},
									onMouseLeave: (e) => {
										e.currentTarget.style.color = "#94A3B8";
									},
									children: link.label
								}, link.label))
							})]
						}, col.heading))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {
					color: "#1E3A5F",
					mb: 24
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "space-between",
					gap: "xs",
					style: { flexWrap: "wrap" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "xs",
						style: { color: "#64748B" },
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Adekanmbi/APM Campaign. All rights reserved."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: "lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
							href: "#",
							underline: "never",
							size: "xs",
							style: { color: "#64748B" },
							children: "Privacy Policy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
							href: "#",
							underline: "never",
							size: "xs",
							style: { color: "#64748B" },
							children: "Terms of Use"
						})]
					})]
				})
			]
		})
	});
}
function WebsiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		style: {
			minHeight: "100vh",
			background: "#fff"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteFooter, {})
		]
	});
}
//#endregion
//#region src/features/apm/website/components.tsx
function SectionHeading({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: 4,
		style: {
			textAlign: "center",
			marginBottom: "3rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
			order: 2,
			style: {
				fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
				fontWeight: 800,
				letterSpacing: "-0.03em",
				color: ink
			},
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "lg",
			style: {
				color: "#64748B",
				maxWidth: 600,
				margin: "0 auto",
				lineHeight: 1.7
			},
			children: subtitle
		})]
	});
}
function PrimaryButton({ children, onClick, fullWidth, type }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		onClick,
		fullWidth,
		styles: { root: {
			background: apmBlue,
			border: "none",
			fontWeight: 700,
			fontSize: "1rem",
			padding: "12px 32px",
			height: "auto",
			transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease, background-color 220ms ease",
			"&:hover": {
				background: "#0052A3",
				transform: "translateY(-2px)",
				boxShadow: "0 8px 24px rgba(0,102,204,0.25)"
			},
			"&:active": { transform: "translateY(0)" },
			"&:focus-visible": {
				outline: "3px solid rgba(0,102,204,0.5)",
				outlineOffset: "2px"
			}
		} },
		children
	});
}
function OutlineButton({ children, onClick, fullWidth }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		onClick,
		fullWidth,
		variant: "outline",
		styles: { root: {
			borderColor: apmBlue,
			color: apmBlue,
			fontWeight: 700,
			fontSize: "1rem",
			padding: "12px 32px",
			height: "auto",
			background: "transparent",
			transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease, background-color 220ms ease, color 220ms ease",
			"&:hover": {
				background: apmBlue,
				color: "#fff",
				transform: "translateY(-2px)",
				boxShadow: "0 8px 24px rgba(0,102,204,0.15)"
			},
			"&:active": { transform: "translateY(0)" },
			"&:focus-visible": {
				outline: "3px solid rgba(0,102,204,0.5)",
				outlineOffset: "2px"
			}
		} },
		children
	});
}
function NewsCard({ title, excerpt, category, publishedAt, authorName, slug }) {
	const date = new Date(publishedAt).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		padding: "lg",
		radius: "md",
		component: "a",
		href: `/apm/news/${slug}`,
		styles: { root: {
			border: "1px solid #E2E8F0",
			background: "#fff",
			textDecoration: "none",
			transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease",
			"&:hover": {
				transform: "translateY(-4px)",
				boxShadow: "0 12px 32px rgba(0,0,0,0.08)"
			}
		} },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					fw: 600,
					style: {
						color: apmBlue,
						textTransform: "uppercase",
						letterSpacing: "0.08em"
					},
					children: category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 700,
					style: {
						fontSize: "1.05rem",
						color: ink,
						lineHeight: 1.4
					},
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					style: {
						color: muted,
						lineHeight: 1.7
					},
					children: excerpt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "xs",
						style: { color: muted },
						children: date
					}), authorName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "xs",
						style: { color: "#64748B" },
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "xs",
						style: { color: "#64748B" },
						children: authorName
					})] })]
				})
			]
		})
	});
}
function EventCard({ title, description, location, eventDate, eventTime, category, onClick }) {
	const date = new Date(eventDate).toLocaleDateString("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		padding: "lg",
		radius: "md",
		onClick,
		styles: { root: {
			border: "1px solid #E2E8F0",
			background: "#fff",
			cursor: onClick ? "pointer" : "default",
			transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease",
			"&:hover": {
				transform: "translateY(-4px)",
				boxShadow: "0 12px 32px rgba(0,0,0,0.08)"
			}
		} },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					fw: 600,
					style: {
						color: apmBlue,
						textTransform: "uppercase",
						letterSpacing: "0.08em"
					},
					children: category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 700,
					style: {
						fontSize: "1.05rem",
						color: ink,
						lineHeight: 1.4
					},
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					style: {
						color: muted,
						lineHeight: 1.7
					},
					children: [description?.slice(0, 100), (description?.length ?? 0) > 100 ? "…" : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { color: "#E2E8F0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 14,
							color: muted
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xs",
							style: { color: muted },
							children: location
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
							size: 14,
							color: muted
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "xs",
							style: { color: muted },
							children: [
								date,
								" · ",
								eventTime
							]
						})]
					})]
				})
			]
		})
	});
}
function TestimonialCard({ name, text, focus, isVerified }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		padding: "xl",
		radius: "md",
		styles: { root: {
			border: "1px solid #E2E8F0",
			background: "#fff"
		} },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
				size: "md",
				style: {
					color: ink,
					lineHeight: 1.8,
					fontStyle: "italic"
				},
				children: [
					"“",
					text,
					"”"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				gap: "xs",
				children: [isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
					size: 16,
					color: "#0066CC"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 700,
					size: "sm",
					style: { color: ink },
					children: name
				}), focus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					style: { color: "#64748B" },
					children: focus
				})] })]
			})]
		})
	});
}
function GreenBadge({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		style: {
			background: "#DCFCE7",
			color: apmGreen,
			borderRadius: 9999,
			padding: "4px 14px",
			fontSize: 13,
			fontWeight: 600,
			display: "inline-block"
		},
		children
	});
}
//#endregion
export { PrimaryButton as a, WebsiteLayout as c, line as d, muted as f, OutlineButton as i, apmBlue as l, GreenBadge as n, SectionHeading as o, soft as p, NewsCard as r, TestimonialCard as s, EventCard as t, ink as u };
