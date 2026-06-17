import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Code } from "./Code-CRGUvjCr.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { t as communicationApi } from "./communication-api-Cd2UxqAK.js";
import { Yt as RxPage } from "./index-DuM1cidb.js";
//#region src/features/communication/pages/trace-explorer.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function TraceExplorerPage() {
	const [messageId, setMessageId] = (0, import_react.useState)("");
	const [searchId, setSearchId] = (0, import_react.useState)("");
	const { data, isLoading } = useQuery({
		queryKey: [
			"communication",
			"trace",
			searchId
		],
		queryFn: async () => {
			if (!searchId) return null;
			return (await communicationApi.get(`/v1/flow/audit/${encodeURIComponent(searchId)}`)).data;
		},
		enabled: !!searchId,
		retry: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Trace Explorer",
		description: "Inspect the lifecycle of a message through the switch.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			withBorder: true,
			radius: "md",
			p: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						align: "flex-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							style: { flex: 1 },
							value: messageId,
							onChange: (e) => setMessageId(e.currentTarget.value),
							placeholder: "Enter trace message ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setSearchId(messageId.trim()),
							disabled: !messageId.trim(),
							children: "Load Trace"
						})]
					}),
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "sm" }),
					data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							withBorder: true,
							radius: "md",
							p: "sm",
							bg: "gray.0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								fw: 600,
								children: "Message ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: data.messageId })]
						}), Array.isArray(data.events) && data.events.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
							gap: "sm",
							children: data.events.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								withBorder: true,
								radius: "md",
								p: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									gap: 4,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											fw: 500,
											children: event.eventType
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xs",
											c: "dimmed",
											children: new Date(event.timestamp).toLocaleString()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
											h: 180,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, {
												block: true,
												children: JSON.stringify(event.snapshot, null, 2)
											})
										})
									]
								})
							}, index))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							c: "dimmed",
							children: "No trace events found for this ID."
						})]
					})
				]
			})
		})
	});
}
//#endregion
//#region src/routes/_authenticated/communication/trace-explorer.tsx?tsr-split=component
var SplitComponent = TraceExplorerPage;
//#endregion
export { SplitComponent as component };
