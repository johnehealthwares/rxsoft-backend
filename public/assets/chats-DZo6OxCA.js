import { i as __toESM, n as __commonJSMin, t as require_react } from "./react-DKQS5v0G.js";
import { m as useMantineTheme, t as Box } from "./Box-7OfPvxF3.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Tooltip } from "./Tooltip-Ta-fBfrz.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as AppShell } from "./AppShell-s9IVO5Ws.js";
import { t as Avatar } from "./Avatar-CoRVm6w9.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Center } from "./Center-UaCPHyv3.js";
import { t as Divider } from "./Divider-NOVQUGHO.js";
import { t as Drawer } from "./Drawer-rwUhgHFQ.js";
import { t as Skeleton } from "./Skeleton-D2aVOFet.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { n as useQueryClient } from "./QueryClientProvider-DlcixLz9.js";
import { a as hasPreviousPage, i as hasNextPage, n as QueryObserver, t as useBaseQuery } from "./useBaseQuery-DynK8sfM.js";
import { t as useMutation } from "./useMutation-CaMFWIEn.js";
import { r as getAccessToken } from "./auth-tokens-DhHGpzYe.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { t as ArrowLeft } from "./arrow-left-BfcK4CG9.js";
import { t as Menu } from "./menu-cuEt1kgn.js";
import { t as MessagesSquare } from "./messages-square-BVzimKsr.js";
import { n as RefreshCw, t as WifiOff } from "./wifi-off-D4RidclX.js";
import { t as require_dayjs_min } from "./dayjs.min-CG4xFvF4.js";
import { An as Send, Ar as useAuthStore, Cr as CONVERSATION_API_BASE_URL, Gr as Alert, Qn as CircleAlert, jn as Search, kt as lookup, wr as conversationApi } from "./index-DwQ-NyPQ.js";
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryObserver.js
var InfiniteQueryObserver = class extends QueryObserver {
	constructor(client, options) {
		super(client, options);
	}
	bindMethods() {
		super.bindMethods();
		this.fetchNextPage = this.fetchNextPage.bind(this);
		this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
	}
	setOptions(options) {
		options._type = "infinite";
		super.setOptions(options);
	}
	getOptimisticResult(options) {
		options._type = "infinite";
		return super.getOptimisticResult(options);
	}
	fetchNextPage(options) {
		return this.fetch({
			...options,
			meta: { fetchMore: { direction: "forward" } }
		});
	}
	fetchPreviousPage(options) {
		return this.fetch({
			...options,
			meta: { fetchMore: { direction: "backward" } }
		});
	}
	createResult(query, options) {
		const { state } = query;
		const parentResult = super.createResult(query, options);
		const { isFetching, isRefetching, isError, isRefetchError } = parentResult;
		const fetchDirection = state.fetchMeta?.fetchMore?.direction;
		const isFetchNextPageError = isError && fetchDirection === "forward";
		const isFetchingNextPage = isFetching && fetchDirection === "forward";
		const isFetchPreviousPageError = isError && fetchDirection === "backward";
		const isFetchingPreviousPage = isFetching && fetchDirection === "backward";
		return {
			...parentResult,
			fetchNextPage: this.fetchNextPage,
			fetchPreviousPage: this.fetchPreviousPage,
			hasNextPage: hasNextPage(options, state.data),
			hasPreviousPage: hasPreviousPage(options, state.data),
			isFetchNextPageError,
			isFetchingNextPage,
			isFetchPreviousPageError,
			isFetchingPreviousPage,
			isRefetchError: isRefetchError && !isFetchNextPageError && !isFetchPreviousPageError,
			isRefetching: isRefetching && !isFetchingNextPage && !isFetchingPreviousPage
		};
	}
};
//#endregion
//#region node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js
function useInfiniteQuery(options, queryClient) {
	return useBaseQuery(options, InfiniteQueryObserver, queryClient);
}
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CheckCheck = createLucideIcon("check-check", [["path", {
	d: "M18 6 7 17l-5-5",
	key: "116fxf"
}], ["path", {
	d: "m22 10-7.5 7.5L13 16",
	key: "ke71qq"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Paperclip = createLucideIcon("paperclip", [["path", {
	d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
	key: "1miecu"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Wifi = createLucideIcon("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]);
//#endregion
//#region node_modules/dayjs/plugin/relativeTime.js
var require_relativeTime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(r, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (r = "undefined" != typeof globalThis ? globalThis : r || self).dayjs_plugin_relativeTime = e();
	})(exports, (function() {
		"use strict";
		return function(r, e, t) {
			r = r || {};
			var n = e.prototype, o = {
				future: "in %s",
				past: "%s ago",
				s: "a few seconds",
				m: "a minute",
				mm: "%d minutes",
				h: "an hour",
				hh: "%d hours",
				d: "a day",
				dd: "%d days",
				M: "a month",
				MM: "%d months",
				y: "a year",
				yy: "%d years"
			};
			function i(r, e, t, o) {
				return n.fromToBase(r, e, t, o);
			}
			t.en.relativeTime = o, n.fromToBase = function(e, n, i, d, u) {
				for (var f, a, s, l = i.$locale().relativeTime || o, h = r.thresholds || [
					{
						l: "s",
						r: 44,
						d: "second"
					},
					{
						l: "m",
						r: 89
					},
					{
						l: "mm",
						r: 44,
						d: "minute"
					},
					{
						l: "h",
						r: 89
					},
					{
						l: "hh",
						r: 21,
						d: "hour"
					},
					{
						l: "d",
						r: 35
					},
					{
						l: "dd",
						r: 25,
						d: "day"
					},
					{
						l: "M",
						r: 45
					},
					{
						l: "MM",
						r: 10,
						d: "month"
					},
					{
						l: "y",
						r: 17
					},
					{
						l: "yy",
						d: "year"
					}
				], m = h.length, c = 0; c < m; c += 1) {
					var y = h[c];
					y.d && (f = d ? t(e).diff(i, y.d, !0) : i.diff(e, y.d, !0));
					var p = (r.rounding || Math.round)(Math.abs(f));
					if (s = f > 0, p <= y.r || !y.r) {
						p <= 1 && c > 0 && (y = h[c - 1]);
						var v = l[y.l];
						u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n, y.l, s);
						break;
					}
				}
				if (n) return a;
				var M = s ? l.future : l.past;
				return "function" == typeof M ? M(a) : M.replace("%s", a);
			}, n.to = function(r, e) {
				return i(r, e, this, !0);
			}, n.from = function(r, e) {
				return i(r, e, this);
			};
			var d = function(r) {
				return r.$u ? t.utc() : t();
			};
			n.toNow = function(r) {
				return this.to(d(this), r);
			}, n.fromNow = function(r) {
				return this.from(d(this), r);
			};
		};
	}));
}));
//#endregion
//#region src/modules/chat-ui/services/chat-api.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var import_relativeTime = /* @__PURE__ */ __toESM(require_relativeTime(), 1);
async function fetchConversationInbox(params) {
	return (await conversationApi.get("/conversations/inbox", { params: {
		limit: 30,
		activeOnly: true,
		...params
	} })).data;
}
async function fetchConversationMessages(input) {
	return (await conversationApi.get("/exchanges", { params: {
		conversationId: input.conversationId,
		limit: 30,
		cursor: input.cursor
	} })).data;
}
async function sendConversationMessage(input) {
	await conversationApi.post("/webhooks/mock", {
		channelId: input.channelId,
		senderPhone: input.senderPhone,
		text: input.text,
		conversationId: input.conversationId
	});
}
async function markConversationRead(input) {
	await conversationApi.post(`/conversations/${input.conversationId}/read`, { participantId: input.participantId });
}
//#endregion
//#region src/modules/chat-ui/hooks/use-chat-queries.ts
var chatKeys = {
	inbox: (search) => ["conversation-inbox", { search }],
	messages: (conversationId) => ["conversation-messages", conversationId]
};
function useConversationInbox(search) {
	return useInfiniteQuery({
		queryKey: chatKeys.inbox(search),
		queryFn: ({ pageParam }) => fetchConversationInbox({
			cursor: pageParam,
			search: search.trim() || void 0
		}),
		initialPageParam: void 0,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
}
function useConversationMessages(conversationId) {
	return useInfiniteQuery({
		queryKey: chatKeys.messages(conversationId),
		enabled: Boolean(conversationId),
		queryFn: ({ pageParam }) => fetchConversationMessages({
			conversationId,
			cursor: pageParam
		}),
		initialPageParam: void 0,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
}
function useSendConversationMessage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: sendConversationMessage,
		onMutate: async (input) => {
			const queryKey = chatKeys.messages(input.conversationId);
			await queryClient.cancelQueries({ queryKey });
			const optimisticMessage = {
				id: `optimistic-${Date.now()}`,
				conversationId: input.conversationId,
				senderId: input.senderPhone,
				direction: "inbound",
				text: input.text,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				status: "sent",
				optimistic: true
			};
			queryClient.setQueryData(queryKey, (current) => {
				if (!current) return {
					pages: [{ items: [optimisticMessage] }],
					pageParams: [void 0]
				};
				const [firstPage, ...restPages] = current.pages;
				return {
					...current,
					pages: [{
						...firstPage,
						items: [optimisticMessage, ...firstPage.items]
					}, ...restPages]
				};
			});
			return {
				queryKey,
				optimisticId: optimisticMessage.id
			};
		},
		onError: (_error, _input, context) => {
			if (!context) return;
			queryClient.setQueryData(context.queryKey, (current) => {
				if (!current) return current;
				return {
					...current,
					pages: current.pages.map((page) => ({
						...page,
						items: page.items.map((message) => message.id === context.optimisticId ? {
							...message,
							status: "failed",
							optimistic: false
						} : message)
					}))
				};
			});
		},
		onSuccess: (_data, input, context) => {
			queryClient.setQueryData(chatKeys.messages(input.conversationId), (current) => {
				if (!current) return current;
				return {
					...current,
					pages: current.pages.map((page) => ({
						...page,
						items: page.items.map((message) => message.id === context?.optimisticId ? {
							...message,
							optimistic: false
						} : message)
					}))
				};
			});
			queryClient.invalidateQueries({ queryKey: ["conversation-inbox"] });
		}
	});
}
function useMarkConversationRead() {
	return useMutation({ mutationFn: markConversationRead });
}
//#endregion
//#region src/modules/chat-ui/websocket/chat-socket.ts
var socket = null;
function getConversationSocket() {
	if (socket) return socket;
	socket = lookup(`${CONVERSATION_API_BASE_URL.replace(/\/api\/?$/, "")}/conversations`, {
		transports: ["websocket"],
		auth: { token: getAccessToken() }
	});
	return socket;
}
//#endregion
//#region src/modules/chat-ui/hooks/use-chat-socket.ts
function useChatSocket(input) {
	const queryClient = useQueryClient();
	const [connected, setConnected] = (0, import_react.useState)(false);
	const [typingParticipantId, setTypingParticipantId] = (0, import_react.useState)();
	(0, import_react.useEffect)(() => {
		const socket = getConversationSocket();
		const onConnect = () => setConnected(true);
		const onDisconnect = () => setConnected(false);
		const onMessage = (message) => {
			if (!message.conversationId) return;
			queryClient.setQueryData(chatKeys.messages(message.conversationId), (current) => {
				if (!current) return current;
				if (current.pages.some((page) => page.items.some((item) => item.id === message.id))) return current;
				const [firstPage, ...restPages] = current.pages;
				return {
					...current,
					pages: [{
						...firstPage,
						items: [message, ...firstPage.items]
					}, ...restPages]
				};
			});
			queryClient.invalidateQueries({ queryKey: ["conversation-inbox"] });
		};
		const onUpdated = () => {
			queryClient.invalidateQueries({ queryKey: ["conversation-inbox"] });
		};
		const onTypingStarted = (payload) => {
			setTypingParticipantId(payload.participantId);
		};
		const onTypingStopped = () => setTypingParticipantId(void 0);
		const onRead = (payload) => {
			queryClient.setQueriesData({ queryKey: ["conversation-inbox"] }, (current) => {
				if (!current) return current;
				return {
					...current,
					pages: current.pages.map((page) => ({
						...page,
						items: page.items.map((item) => item.conversationId === payload.conversationId ? {
							...item,
							unreadCount: 0
						} : item)
					}))
				};
			});
		};
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("conversation.message.created", onMessage);
		socket.on("conversation.updated", onUpdated);
		socket.on("conversation.read", onRead);
		socket.on("typing.started", onTypingStarted);
		socket.on("typing.stopped", onTypingStopped);
		setConnected(socket.connected);
		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("conversation.message.created", onMessage);
			socket.off("conversation.updated", onUpdated);
			socket.off("conversation.read", onRead);
			socket.off("typing.started", onTypingStarted);
			socket.off("typing.stopped", onTypingStopped);
		};
	}, [queryClient]);
	(0, import_react.useEffect)(() => {
		if (!input.conversationId || !input.participantId) return;
		const socket = getConversationSocket();
		const payload = {
			conversationId: input.conversationId,
			participantId: input.participantId
		};
		socket.emit("conversation.opened", payload);
		return () => {
			socket.emit("conversation.closed", payload);
		};
	}, [input.conversationId, input.participantId]);
	return {
		connected,
		typingParticipantId
	};
}
//#endregion
//#region src/modules/chat-ui/utils/participants.ts
function getParticipantName(participant) {
	if (!participant) return "Unknown participant";
	return [participant.firstName, participant.lastName].filter(Boolean).join(" ").trim() || participant.email || participant.phone || participant.id;
}
function getParticipantInitials(participant) {
	return getParticipantName(participant).split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}
//#endregion
//#region src/modules/chat-ui/utils/parse-options.ts
var OPTION_LINE_RE = /^\s*([^:\s][^:]*?)\s*:\s*(.+?)\s*$/;
function parseQuestionOptions(text) {
	const lines = text.split("\n").filter(Boolean);
	if (lines.length < 2) return null;
	const title = lines[0].trim();
	if (!title) return null;
	const options = [];
	for (let i = 1; i < lines.length; i++) {
		const m = lines[i].replace(/\u200B/g, "").trim().match(OPTION_LINE_RE);
		if (!m) return null;
		options.push({
			value: m[1].trim(),
			label: m[2].trim()
		});
	}
	if (!options.length) return null;
	return {
		title,
		options
	};
}
//#endregion
//#region src/modules/chat-ui/pages/chat-ui-page.tsx
var import_jsx_runtime = require_jsx_runtime();
import_dayjs_min.default.extend(import_relativeTime.default);
function ChatUiPage({ mode = "admin" }) {
	const theme = useMantineTheme();
	const isMobile = false;
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedConversationId, setSelectedConversationId] = (0, import_react.useState)();
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const userPhone = useAuthStore((state) => state.user?.phone);
	const inboxQuery = useConversationInbox(search);
	const selectedConversation = (0, import_react.useMemo)(() => inboxQuery.data?.pages.flatMap((page) => page.items).find((item) => item.conversationId === selectedConversationId), [inboxQuery.data, selectedConversationId]);
	const activeParticipantId = mode === "admin" ? selectedConversation?.moderator?.id : selectedConversation?.participant.id;
	const socket = useChatSocket({
		conversationId: selectedConversationId,
		participantId: activeParticipantId
	});
	const markRead = useMarkConversationRead();
	(0, import_react.useEffect)(() => {
		if (!selectedConversationId) return;
		markRead.mutate({
			conversationId: selectedConversationId,
			participantId: activeParticipantId
		});
	}, [activeParticipantId, selectedConversationId]);
	const conversations = inboxQuery.data?.pages.flatMap((page) => page.items) ?? [];
	const inbox = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxSidebar, {
		connected: socket.connected,
		conversations,
		error: inboxQuery.isError,
		fetchNextPage: () => inboxQuery.fetchNextPage(),
		hasNextPage: inboxQuery.hasNextPage,
		isFetchingNextPage: inboxQuery.isFetchingNextPage,
		loading: inboxQuery.isLoading,
		onRetry: () => inboxQuery.refetch(),
		onSearch: setSearch,
		onSelect: (conversation) => {
			setSelectedConversationId(conversation.conversationId);
			setSidebarOpen(false);
		},
		search,
		selectedConversationId
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		padding: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			align: "stretch",
			gap: "md",
			h: "calc(100vh - 32px)",
			wrap: "nowrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				withBorder: true,
				w: 360,
				h: "100%",
				style: { overflow: "hidden" },
				children: inbox
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				withBorder: true,
				h: "100%",
				style: {
					flex: 1,
					minWidth: 0,
					overflow: "hidden",
					background: theme.colors.gray[0]
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationThread, {
					connected: socket.connected,
					conversation: selectedConversation,
					mode,
					onBack: () => setSidebarOpen(true),
					showMobileBack: Boolean(isMobile),
					typingParticipantId: socket.typingParticipantId,
					userPhone
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
			opened: sidebarOpen,
			onClose: () => setSidebarOpen(false),
			title: "Inbox",
			size: "min(92vw, 380px)",
			padding: "sm",
			children: inbox
		})]
	});
}
function InboxSidebar(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		h: "100%",
		gap: "sm",
		p: "sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				wrap: "nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					gap: "xs",
					wrap: "nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 700,
						size: "lg",
						children: "Inbox"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					color: props.connected ? "green" : "gray",
					leftSection: props.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { size: 12 }),
					variant: "light",
					children: props.connected ? "Live" : "Offline"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 15 }),
				onChange: (event) => props.onSearch(event.currentTarget.value),
				placeholder: "Search conversations",
				value: props.search
			}),
			props.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				color: "red",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }),
				title: "Inbox unavailable",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "space-between",
					mt: "xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						children: "Could not load conversations."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }),
						onClick: props.onRetry,
						size: "xs",
						variant: "light",
						children: "Retry"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				flex: 1,
				onScrollPositionChange: ({ y }) => {
					if (y > 200 && props.hasNextPage && !props.isFetchingNextPage) props.fetchNextPage();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 0,
					children: [
						props.loading && Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							py: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								wrap: "nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									circle: true,
									h: 42,
									w: 42
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									flex: 1,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										h: 12,
										mb: 8,
										w: "65%"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										h: 10,
										w: "92%"
									})]
								})]
							})
						}, index)),
						!props.loading && props.conversations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
							h: 280,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								align: "center",
								gap: "xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { size: 34 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 600,
										children: "No conversations"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: "dimmed",
										size: "sm",
										ta: "center",
										children: "New messages will appear here as they arrive."
									})
								]
							})
						}),
						props.conversations.map((conversation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationListItem, {
							conversation,
							onSelect: () => props.onSelect(conversation),
							selected: conversation.conversationId === props.selectedConversationId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {})] }, conversation.conversationId)),
						props.isFetchingNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
							py: "md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "sm" })
						})
					]
				})
			})
		]
	});
}
function ConversationListItem(props) {
	const participant = props.conversation.participant;
	const name = getParticipantName(participant);
	const lastMessage = props.conversation.lastMessage?.text ?? "No messages yet";
	const lastMessagePrefix = props.conversation.lastMessage?.direction === "outbound" ? "You: " : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		color: "blue",
		fullWidth: true,
		h: 76,
		justify: "flex-start",
		onClick: props.onSelect,
		px: "xs",
		radius: 0,
		variant: props.selected ? "light" : "subtle",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			gap: "sm",
			wrap: "nowrap",
			w: "100%",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					pos: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						radius: "xl",
						children: getParticipantInitials(participant)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						bg: props.conversation.projection.active ? "green" : "gray",
						bottom: 0,
						h: 10,
						pos: "absolute",
						right: 0,
						style: {
							border: "2px solid white",
							borderRadius: 999
						},
						w: 10
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					flex: 1,
					style: { minWidth: 0 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						wrap: "nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 600,
							lineClamp: 1,
							size: "sm",
							children: name
						}), props.conversation.lastMessageAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: "dimmed",
							size: "xs",
							children: (0, import_dayjs_min.default)(props.conversation.lastMessageAt).fromNow()
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						c: "dimmed",
						lineClamp: 1,
						size: "xs",
						children: [lastMessagePrefix, lastMessage]
					})]
				}),
				Boolean(props.conversation.unreadCount) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					circle: true,
					size: "sm",
					children: props.conversation.unreadCount
				})
			]
		})
	});
}
function ConversationThread({ userPhone, ...props }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	const viewportRef = (0, import_react.useRef)(null);
	const messagesQuery = useConversationMessages(props.conversation?.conversationId);
	const sendMessage = useSendConversationMessage();
	const messages = (0, import_react.useMemo)(() => (messagesQuery.data?.pages.flatMap((page) => page.items) ?? []).slice().reverse(), [messagesQuery.data]);
	const groupedMessages = (0, import_react.useMemo)(() => groupMessagesByDate(messages), [messages]);
	const senderId = props.mode === "admin" ? props.conversation?.moderator?.id : props.conversation?.participant.id;
	(0, import_react.useEffect)(() => {
		const viewport = viewportRef.current;
		if (!viewport || messagesQuery.isFetchingNextPage) return;
		viewport.scrollTo({
			top: viewport.scrollHeight,
			behavior: "smooth"
		});
	}, [messages.length, props.conversation?.conversationId]);
	if (!props.conversation) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		align: "center",
		h: "100%",
		justify: "center",
		gap: "sm",
		children: [
			props.showMobileBack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
				"aria-label": "Open inbox",
				onClick: props.onBack,
				pos: "absolute",
				left: 24,
				top: 24,
				variant: "subtle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { size: 42 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				fw: 700,
				children: "Your messages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: "dimmed",
				maw: 320,
				size: "sm",
				ta: "center",
				children: "Choose a conversation to review history, respond, and track realtime activity."
			})
		]
	});
	const conversation = props.conversation;
	const submit = () => {
		if (!draft.trim() || !senderId || sendMessage.isPending) return;
		sendMessage.mutate({
			conversationId: conversation.conversationId,
			channelId: conversation.channelId,
			senderPhone: userPhone ?? (conversation.participant.phone || ""),
			text: draft.trim()
		});
		setDraft("");
	};
	const fetchOlderMessages = async () => {
		const viewport = viewportRef.current;
		const previousHeight = viewport?.scrollHeight ?? 0;
		await messagesQuery.fetchNextPage();
		window.setTimeout(() => {
			if (!viewport) return;
			viewport.scrollTop = viewport.scrollHeight - previousHeight;
		}, 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		h: "100%",
		gap: 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				bg: "white",
				justify: "space-between",
				p: "md",
				wrap: "nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					wrap: "nowrap",
					children: [
						props.showMobileBack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
							"aria-label": "Open inbox",
							onClick: props.onBack,
							variant: "subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							radius: "xl",
							children: getParticipantInitials(conversation.participant)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 700,
							lineClamp: 1,
							children: getParticipantName(conversation.participant)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							gap: 6,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								color: props.connected ? "green" : "gray",
								size: "xs",
								children: props.connected ? "Online" : "Offline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								c: "dimmed",
								size: "xs",
								children: conversation.currentQuestion?.attribute ?? conversation.state
							})]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "light",
					children: conversation.status
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				flex: 1,
				viewportRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "sm",
					p: "md",
					children: [
						messagesQuery.hasNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							leftSection: messagesQuery.isFetchingNextPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }),
							onClick: fetchOlderMessages,
							size: "xs",
							variant: "subtle",
							children: "Load earlier"
						}) }),
						messagesQuery.isLoading && Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							h: 44,
							style: { alignSelf: index % 2 ? "flex-end" : "flex-start" },
							w: index % 2 ? 260 : 320,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								h: "100%",
								radius: "md"
							})
						}, index)),
						messagesQuery.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
							color: "red",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }),
							children: "Messages could not be loaded."
						}),
						!messagesQuery.isLoading && messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
							h: 320,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								align: "center",
								gap: "xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { size: 34 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 600,
										children: "No messages yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: "dimmed",
										size: "sm",
										children: "Send the first reply in this thread."
									})
								]
							})
						}),
						Object.entries(groupedMessages).map(([date, dateMessages]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {
							label: (0, import_dayjs_min.default)(date).format("D MMM, YYYY"),
							labelPosition: "center"
						}), dateMessages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
							message,
							onOptionSelect: (value) => {
								sendMessage.mutate({
									conversationId: conversation.conversationId,
									channelId: conversation.channelId,
									senderPhone: userPhone ?? (conversation.participant.phone || ""),
									text: value
								});
							}
						}, message.id))] }, date)),
						props.typingParticipantId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: "dimmed",
							fs: "italic",
							size: "sm",
							children: "Typing..."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				bg: "white",
				p: "md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					align: "flex-end",
					gap: "xs",
					wrap: "nowrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							label: "Attach file",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
								"aria-label": "Attach file",
								size: "lg",
								variant: "subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { size: 18 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							autosize: true,
							maxRows: 4,
							minRows: 1,
							onChange: (event) => setDraft(event.currentTarget.value),
							onKeyDown: (event) => {
								if (event.key === "Enter" && !event.shiftKey) {
									event.preventDefault();
									submit();
								}
							},
							placeholder: "Type a message",
							style: { flex: 1 },
							value: draft
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: !draft.trim() || !senderId,
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 }),
							loading: sendMessage.isPending,
							onClick: submit,
							children: "Send"
						})
					]
				})
			})
		]
	});
}
function MessageBubble({ message, onOptionSelect }) {
	const isOwnMessage = message.direction === "inbound";
	const parsed = !isOwnMessage ? parseQuestionOptions(message.text) : null;
	if (parsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		bg: "white",
		maw: "min(72%, 560px)",
		px: "sm",
		py: 8,
		style: {
			alignSelf: "flex-start",
			border: "1px solid var(--mantine-color-gray-3)",
			borderRadius: 8
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				fw: 600,
				mb: "xs",
				size: "sm",
				children: parsed.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: "xs",
				children: parsed.options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					color: "blue",
					fullWidth: true,
					onClick: () => onOptionSelect?.(opt.value),
					size: "sm",
					variant: "outline",
					children: opt.label
				}, opt.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				gap: 4,
				justify: "flex-end",
				mt: 4,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: "dimmed",
					size: "xs",
					children: (0, import_dayjs_min.default)(message.createdAt).format("h:mm A")
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		bg: isOwnMessage ? "blue.6" : "white",
		c: isOwnMessage ? "white" : "dark",
		maw: "min(72%, 560px)",
		px: "sm",
		py: 8,
		style: {
			alignSelf: isOwnMessage ? "flex-end" : "flex-start",
			border: isOwnMessage ? void 0 : "1px solid var(--mantine-color-gray-3)",
			borderRadius: 8,
			opacity: message.optimistic ? .72 : 1
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			style: {
				whiteSpace: "pre-wrap",
				wordBreak: "break-word"
			},
			children: message.text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			gap: 4,
			justify: "flex-end",
			mt: 4,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: isOwnMessage ? "blue.0" : "dimmed",
				size: "xs",
				children: (0, import_dayjs_min.default)(message.createdAt).format("h:mm A")
			}), isOwnMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { size: 13 })]
		})]
	});
}
function groupMessagesByDate(messages) {
	return messages.reduce((acc, message) => {
		const key = (0, import_dayjs_min.default)(message.createdAt).format("YYYY-MM-DD");
		acc[key] = acc[key] ?? [];
		acc[key].push(message);
		return acc;
	}, {});
}
//#endregion
//#region src/features/chats/pages/chats-page.tsx
function Chats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatUiPage, { mode: "admin" });
}
//#endregion
//#region src/routes/_authenticated/conversation/chats/index.tsx?tsr-split=component
var SplitComponent = Chats;
//#endregion
export { SplitComponent as component };
