import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { Pr as Title, jr as useNavigate } from "./index-BRcLwOKn.js";
import { a as PrimaryButton, c as WebsiteLayout, f as muted, l as apmBlue, n as GreenBadge, o as SectionHeading, p as soft, u as ink } from "./components-CBD4Mixj.js";
import { n as useAgenda } from "./hooks-BXmKE04t.js";
//#region src/features/apm/agenda/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var iconLUT = {
	CircleDollarSign: "💰",
	Building2: "🏗️",
	Wheat: "🌾",
	HeartPulse: "🏥",
	BookOpen: "📚",
	ShieldCheck: "🛡️",
	Cpu: "💻"
};
function AgendaPage() {
	const { data, isLoading } = useAgenda();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: `linear-gradient(135deg, ${soft} 0%, #DBEAFE 30%, #ffffff 100%)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Oyo Next Agenda",
				subtitle: "A bold seven-pillar vision to sustain and accelerate Oyo State's transformation."
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
				children: "Agenda items coming soon."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: 40,
				children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					style: {
						padding: 32,
						borderRadius: 16,
						background: "#fff",
						border: "1px solid #E2E8F0",
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						align: "flex-start",
						gap: "md",
						style: { flexWrap: "nowrap" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							style: {
								width: 56,
								height: 56,
								borderRadius: 12,
								background: "#DBEAFE",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 28,
								flexShrink: 0
							},
							children: item.icon ? iconLUT[item.icon] ?? "📋" : "📋"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "xs",
							style: { flex: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								gap: "xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 3,
									style: {
										fontSize: "1.25rem",
										fontWeight: 700,
										color: ink,
										letterSpacing: "-0.02em"
									},
									children: item.title
								}), item.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GreenBadge, { children: item.category })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: {
									color: muted,
									lineHeight: 1.8
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
//#region src/routes/apm/agenda.tsx?tsr-split=component
var SplitComponent = AgendaPage;
//#endregion
export { SplitComponent as component };
