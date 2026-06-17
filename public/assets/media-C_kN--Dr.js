import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Anchor } from "./Anchor-DyykEMLS.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { i as ink, n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DZbjExJ-.js";
import { o as SectionHeading } from "./components-C9goD9gK.js";
import { s as useMedia } from "./hooks-BXmKE04t.js";
//#region src/features/apm/media/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function MediaPage() {
	const { data, isLoading } = useMedia();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: `linear-gradient(135deg, ${soft} 0%, #DBEAFE 30%, #ffffff 100%)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Media Gallery",
				subtitle: "Campaign videos, interviews, press releases, and photo highlights from across Oyo State."
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
			}) : !data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				ta: "center",
				gap: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					style: { color: muted },
					children: "Media content coming soon."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
				cols: {
					base: 1,
					sm: 2,
					lg: 3
				},
				spacing: 24,
				children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Anchor, {
					href: item.assetUrl,
					target: "_blank",
					underline: "never",
					style: { textDecoration: "none" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							style: {
								borderRadius: 12,
								overflow: "hidden",
								background: apmBlue,
								aspectRatio: "16/9",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
								transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.transform = "scale(1.03)";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.transform = "";
							},
							children: [item.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								style: {
									width: 56,
									height: 56,
									borderRadius: "50%",
									background: "rgba(255,255,255,0.2)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "#fff",
									fontSize: 20
								},
								children: "▶"
							}), item.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								style: {
									color: "rgba(255,255,255,0.7)",
									position: "absolute",
									top: 12,
									right: 12,
									background: "rgba(0,0,0,0.4)",
									padding: "4px 10px",
									borderRadius: 8
								},
								children: item.category
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							ta: "center",
							size: "sm",
							fw: 600,
							mt: "sm",
							style: { color: ink },
							children: item.title
						}),
						item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							ta: "center",
							size: "xs",
							style: {
								color: "#64748B",
								marginTop: 4
							},
							children: [item.description.slice(0, 80), (item.description?.length ?? 0) > 80 ? "…" : ""]
						})
					]
				}, item.id))
			})
		})
	})] });
}
//#endregion
//#region src/routes/apm/media.tsx?tsr-split=component
var SplitComponent = MediaPage;
//#endregion
export { SplitComponent as component };
