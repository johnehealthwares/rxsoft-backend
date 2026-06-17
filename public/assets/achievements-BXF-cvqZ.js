import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as BookOpen } from "./book-open-D9F3OwEf.js";
import { t as Building2 } from "./building-2-B-Q1DIUW.js";
import { t as CircleDollarSign } from "./circle-dollar-sign-CqxmB95d.js";
import { t as HeartPulse } from "./heart-pulse-__ikndAu.js";
import { t as Star } from "./star-DwsFN-Yw.js";
import { On as ShieldCheck, Pr as useNavigate, Tn as Sparkles } from "./index-DwQ-NyPQ.js";
import { n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DZbjExJ-.js";
import { a as PrimaryButton, o as SectionHeading } from "./components-C9goD9gK.js";
import { t as useAchievements } from "./hooks-BXmKE04t.js";
import { i as ibadan_road_default, n as ibbadan_market_default, r as uch_default, t as youth_default } from "./youth-CRyj3qJg.js";
//#region src/features/apm/assets/keepinng_promise.webp
var keepinng_promise_default = "/assets/keepinng_promise-ej0MBvJZ.webp";
//#endregion
//#region src/features/apm/achievements/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var iconLUT = {
	Economy: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, { size: 28 }),
	Education: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 28 }),
	Healthcare: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { size: 28 }),
	Infrastructure: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 28 }),
	Security: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 28 }),
	Youth: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 28 })
};
var imageLUT = {
	Economy: ibbadan_market_default,
	Education: keepinng_promise_default,
	Healthcare: uch_default,
	Infrastructure: ibadan_road_default,
	Security: keepinng_promise_default,
	Youth: youth_default
};
function AchievementsPage() {
	const { data, isLoading } = useAchievements();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: `linear-gradient(135deg, ${soft} 0%, #DBEAFE 30%, #ffffff 100%)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Our Achievements",
				subtitle: "Building on the legacy of the Omituntun transformation — real results across six sectors."
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: "#fff" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			size: "xl",
			children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { color: apmBlue })
			}) : !data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				ta: "center",
				style: { color: muted },
				children: "Achievements coming soon."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: 48,
				children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: {
						borderRadius: 16,
						background: "#fff",
						border: "1px solid #E2E8F0",
						overflow: "hidden",
						transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease"
					},
					onMouseEnter: (e) => {
						const el = e.currentTarget;
						el.style.transform = "translateY(-2px)";
						el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.06)";
					},
					onMouseLeave: (e) => {
						const el = e.currentTarget;
						el.style.transform = "";
						el.style.boxShadow = "";
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						style: {
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							style: {
								width: "100%",
								minWidth: 0
							},
							children: (() => {
								const cat = item.category ?? "";
								const imgSrc = imageLUT[cat];
								if (!imgSrc || ![
									"Economy",
									"Infrastructure",
									"Healthcare",
									"Youth"
								].includes(cat)) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									style: {
										height: 220,
										overflow: "hidden"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: imgSrc,
										alt: item.title,
										style: {
											width: "100%",
											height: "100%",
											objectFit: "cover"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
										height: "100%",
										width: "100%",
										background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
										marginTop: -220,
										position: "relative"
									} })]
								});
							})()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							style: {
								padding: 32,
								minWidth: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								align: "flex-start",
								gap: "md",
								style: { marginBottom: 16 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
										style: { color: apmBlue },
										children: item.category ? iconLUT[item.category] ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 28 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 28 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										gap: 4,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xs",
											fw: 600,
											style: {
												color: apmBlue,
												textTransform: "uppercase",
												letterSpacing: "0.08em"
											},
											children: item.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											fw: 700,
											style: {
												fontSize: "1.3rem",
												color: "#1E293B",
												letterSpacing: "-0.02em"
											},
											children: item.title
										})]
									}),
									item.statLabel && item.statValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
										style: {
											marginLeft: "auto",
											padding: "12px 24px",
											borderRadius: 12,
											background: "#DBEAFE",
											textAlign: "center"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											style: {
												fontSize: "1.5rem",
												fontWeight: 800,
												color: "#0066CC",
												lineHeight: 1.2
											},
											children: item.statValue
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xs",
											style: {
												color: "#0066CC",
												fontWeight: 600
											},
											children: item.statLabel
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: {
									color: muted,
									lineHeight: 1.9,
									fontSize: "1rem"
								},
								children: item.description
							})]
						})]
					})
				}, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "center",
				mt: 48,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: () => navigate({ to: "/apm/join" }),
					children: "Join The Movement"
				})
			})]
		})
	})] });
}
//#endregion
//#region src/routes/apm/achievements.tsx?tsr-split=component
var SplitComponent = AchievementsPage;
//#endregion
export { SplitComponent as component };
