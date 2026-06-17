import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as SimpleGrid } from "./SimpleGrid-C7HFXaA1.js";
import { Pr as useNavigate } from "./index-DwQ-NyPQ.js";
import { n as apmBlue, o as muted, s as soft, t as WebsiteLayout } from "./layout-DZbjExJ-.js";
import { o as SectionHeading, t as EventCard } from "./components-C9goD9gK.js";
import { i as useEvents } from "./hooks-BXmKE04t.js";
//#region src/features/apm/events/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function EventsPage() {
	const { data, isLoading } = useEvents();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: 80,
		style: { background: `linear-gradient(135deg, ${soft} 0%, #DBEAFE 30%, #ffffff 100%)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Events",
				subtitle: "Join us at town halls, stakeholder meetings, and community engagements across Oyo State."
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
			}) : !data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				ta: "center",
				style: { color: muted },
				children: "No events at this time. Join our newsletter to stay informed."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, {
				cols: {
					base: 1,
					sm: 2,
					lg: 3
				},
				spacing: 24,
				children: data.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
					title: event.title,
					description: event.description ?? "",
					location: event.location ?? "",
					eventDate: event.eventDate,
					eventTime: event.eventTime ?? "",
					category: event.category ?? "Event",
					onClick: () => navigate({ to: `/apm/events/${event.id}` })
				}, event.id))
			})
		})
	})] });
}
//#endregion
//#region src/routes/apm/events.tsx?tsr-split=component
var SplitComponent = EventsPage;
//#endregion
export { SplitComponent as component };
