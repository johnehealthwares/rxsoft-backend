import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { Hn as MapPin, Lr as Title, ir as BadgeCheck, rr as Calendar } from "./index-DuM1cidb.js";
import { i as ink, n as apmBlue, o as muted, r as apmGreen } from "./layout-DsBYIIU2.js";
//#region src/features/apm/website/components.tsx
var import_jsx_runtime = require_jsx_runtime();
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
export { PrimaryButton as a, OutlineButton as i, GreenBadge as n, SectionHeading as o, NewsCard as r, TestimonialCard as s, EventCard as t };
