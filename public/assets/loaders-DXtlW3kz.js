import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as CalendarClock } from "./calendar-clock-B1k3tdZz.js";
import { t as FileText } from "./file-text-ZMRlE-dq.js";
import { _t as darkGreen, bt as muted, jn as Search, vt as green, yt as line, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
//#region src/features/damorex/website/loaders.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var keyframesId = "damorex-loader-styles";
var loaderStyles = `
@keyframes damorex-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
}
@keyframes damorex-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes damorex-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes damorex-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes damorex-fade {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
@keyframes damorex-skeleton-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
`;
function injectLoaderStyles() {
	if (typeof document !== "undefined" && !document.getElementById(keyframesId)) {
		const style = document.createElement("style");
		style.id = keyframesId;
		style.textContent = loaderStyles;
		document.head.appendChild(style);
	}
}
function PillIcon({ size = 24 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		style: {
			width: size * 1.6,
			height: size,
			borderRadius: size / 2,
			background: `linear-gradient(135deg, ${green}, ${darkGreen})`,
			position: "relative",
			overflow: "hidden"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
			position: "absolute",
			top: 0,
			bottom: 0,
			left: "48%",
			width: "4%",
			background: "rgba(255,255,255,0.35)"
		} })
	});
}
function SkeletonBar({ width = "100%", height = 14, radius = 999 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
		width,
		height,
		borderRadius: radius,
		background: `linear-gradient(90deg, ${line} 25%, rgba(22,163,74,0.1) 50%, ${line} 75%)`,
		backgroundSize: "200% 100%",
		animation: "damorex-shimmer 1.5s ease-in-out infinite"
	} });
}
function PageLoader() {
	(0, import_react.useEffect)(() => {
		injectLoaderStyles();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: "xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			align: "center",
			gap: "lg",
			py: 80,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				style: {
					display: "flex",
					gap: 8
				},
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: { animation: `damorex-bounce 1s ease-in-out ${i * .15}s infinite` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillIcon, { size: 20 + i * 4 })
				}, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "sm",
				style: { animation: "damorex-fade 1.8s ease-in-out infinite" },
				children: "Loading..."
			})]
		})
	});
}
function SectionLoader() {
	(0, import_react.useEffect)(() => {
		injectLoaderStyles();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [[
			90,
			75,
			60,
			45
		].map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			style: { animation: `damorex-skeleton-pulse 1.5s ease-in-out ${i * .15}s infinite` },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
				width: `${w}%`,
				height: 16
			})
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			mt: "xs",
			style: { animation: "damorex-skeleton-pulse 1.5s ease-in-out 0.6s infinite" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
				width: "100%",
				height: 120,
				radius: 16
			})
		})]
	});
}
function ProductLoader({ count = 8 }) {
	(0, import_react.useEffect)(() => {
		injectLoaderStyles();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
		cols: {
			base: 2,
			sm: 3,
			md: 4
		},
		spacing: "md",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			style: {
				border: `1px solid ${line}`,
				borderRadius: 24,
				overflow: "hidden",
				background: "#fff",
				animation: `damorex-skeleton-pulse 1.5s ease-in-out ${i * .08}s infinite`
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
				height: 190,
				background: `linear-gradient(90deg, ${line} 25%, rgba(22,163,74,0.06) 50%, ${line} 75%)`,
				backgroundSize: "200% 100%",
				animation: "damorex-shimmer 1.5s ease-in-out infinite"
			} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				p: "md",
				gap: "sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
						width: "80%",
						height: 16
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
						width: "55%",
						height: 12
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
						width: "40%",
						height: 12
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						mt: "xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
							width: "100%",
							height: 36,
							radius: 999
						})
					})
				]
			})]
		}, i))
	});
}
function SearchLoader() {
	(0, import_react.useEffect)(() => {
		injectLoaderStyles();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: "xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 12
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 20,
					color: muted
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
					width: "60%",
					height: 18
				})]
			}), Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				style: {
					display: "flex",
					gap: 16,
					padding: 16,
					border: `1px solid ${line}`,
					borderRadius: 16,
					animation: `damorex-skeleton-pulse 1.5s ease-in-out ${i * .1}s infinite`
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { style: {
					width: 64,
					height: 64,
					borderRadius: 12,
					background: line,
					flexShrink: 0
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 8,
					style: { flex: 1 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
							width: "50%",
							height: 16
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
							width: "80%",
							height: 12
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
							width: "30%",
							height: 12
						})
					]
				})]
			}, i))]
		})
	});
}
function PrescriptionLoader() {
	(0, import_react.useEffect)(() => {
		injectLoaderStyles();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: "xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupWithIcon, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 24 }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: {
						border: `1px solid ${line}`,
						borderRadius: 20,
						padding: 24,
						background: "#fff"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "md",
						children: [[
							100,
							88,
							72,
							56,
							92
						].map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							style: { animation: `damorex-skeleton-pulse 1.5s ease-in-out ${i * .1}s infinite` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
								width: `${w}%`,
								height: i === 0 ? 20 : 14
							})
						}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							mt: "md",
							style: {
								height: 200,
								borderRadius: 12,
								background: `linear-gradient(90deg, ${line} 25%, rgba(22,163,74,0.06) 50%, ${line} 75%)`,
								backgroundSize: "200% 100%",
								animation: "damorex-shimmer 1.5s ease-in-out infinite"
							}
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					style: {
						display: "flex",
						gap: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
						width: 140,
						height: 40
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
						width: 120,
						height: 40
					})]
				})
			]
		})
	});
}
function ConsultationLoader() {
	(0, import_react.useEffect)(() => {
		injectLoaderStyles();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
		py: "xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupWithIcon, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 24 }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					style: {
						border: `1px solid ${line}`,
						borderRadius: 20,
						padding: 24,
						background: "#fff"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
						cols: {
							base: 1,
							sm: 2
						},
						spacing: "md",
						children: [
							1,
							2,
							3,
							4
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							style: { animation: `damorex-skeleton-pulse 1.5s ease-in-out ${i * .1}s infinite` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
								width: "70%",
								height: 12
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								mt: 4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
									width: "100%",
									height: 36,
									radius: 8
								})
							})]
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						mt: "lg",
						style: { animation: "damorex-skeleton-pulse 1.5s ease-in-out 0.4s infinite" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
							width: "100%",
							height: 120,
							radius: 12
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
					width: 180,
					height: 44
				})
			]
		})
	});
}
function GroupWithIcon({ icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
			radius: "xl",
			size: 40,
			color: "green",
			variant: "light",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, {
			width: "40%",
			height: 22
		})]
	});
}
//#endregion
export { SearchLoader as a, ProductLoader as i, PageLoader as n, SectionLoader as o, PrescriptionLoader as r, ConsultationLoader as t };
