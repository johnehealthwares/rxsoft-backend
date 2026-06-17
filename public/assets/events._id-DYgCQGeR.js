import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Clock } from "./clock-nu73FJZO.js";
import { Hn as MapPin, Ir as useParams, Lr as Title, Pr as useNavigate, rr as Calendar } from "./index-DwQ-NyPQ.js";
import { i as ink, n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DZbjExJ-.js";
import { a as PrimaryButton } from "./components-C9goD9gK.js";
import { r as useEvent } from "./hooks-BXmKE04t.js";
//#region src/features/apm/events/detail.tsx
var import_jsx_runtime = require_jsx_runtime();
function EventDetailPage() {
	const { id } = useParams({ from: "/apm/events/$id" });
	const { data: event, isLoading } = useEvent(id);
	const navigate = useNavigate();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: 120,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { color: apmBlue })
		})
	}) });
	if (!event) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: 120,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			ta: "center",
			style: { color: muted },
			children: "Event not found."
		})
	}) });
	const date = event.eventDate ? new Date(event.eventDate).toLocaleDateString("en-GB", {
		weekday: "long",
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
				event.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xs",
					fw: 600,
					style: {
						color: "#0066CC",
						textTransform: "uppercase",
						letterSpacing: "0.08em",
						marginBottom: 16
					},
					children: event.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					style: {
						fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
						fontWeight: 800,
						letterSpacing: "-0.03em",
						color: ink,
						lineHeight: 1.3,
						marginBottom: 24
					},
					children: event.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					mb: 32,
					children: [
						event.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 8,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 18,
								color: "#0066CC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "md",
								style: {
									color: "#1E293B",
									fontWeight: 500
								},
								children: event.location
							})]
						}),
						date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 8,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								size: 18,
								color: "#0066CC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "md",
								style: {
									color: "#1E293B",
									fontWeight: 500
								},
								children: date
							})]
						}),
						event.eventTime && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 8,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								size: 18,
								color: "#0066CC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "md",
								style: {
									color: "#1E293B",
									fontWeight: 500
								},
								children: event.eventTime
							})]
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 64,
		style: { background: "#fff" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			size: "md",
			children: [event.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "lg",
				style: {
					color: "#1E293B",
					lineHeight: 1.9,
					whiteSpace: "pre-wrap"
				},
				children: event.description
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "center",
				mt: 48,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: () => navigate({ to: "/apm/events" }),
					children: "Back to Events"
				})
			})]
		})
	})] });
}
//#endregion
//#region src/routes/apm/events.$id.tsx?tsr-split=component
var SplitComponent = EventDetailPage;
//#endregion
export { SplitComponent as component };
