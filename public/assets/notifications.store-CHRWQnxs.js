import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as randomId } from "./random-id-4PbbZuoM.js";
//#region node_modules/@mantine/store/esm/store.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function createStore(initialState) {
	let state = initialState;
	let initialized = false;
	const listeners = /* @__PURE__ */ new Set();
	return {
		getState() {
			return state;
		},
		updateState(value) {
			state = typeof value === "function" ? value(state) : value;
		},
		setState(value) {
			this.updateState(value);
			listeners.forEach((listener) => listener(state));
		},
		initialize(value) {
			if (!initialized) {
				state = value;
				initialized = true;
			}
		},
		subscribe(callback) {
			listeners.add(callback);
			return () => listeners.delete(callback);
		}
	};
}
function useStore(store) {
	return (0, import_react.useSyncExternalStore)(store.subscribe, () => store.getState(), () => store.getState());
}
//#endregion
//#region node_modules/@mantine/notifications/esm/notifications.store.mjs
function getDistributedNotifications(data, defaultPosition, limit) {
	const queue = [];
	const notifications = [];
	const count = {};
	for (const item of data) {
		const position = item.position || defaultPosition;
		count[position] = count[position] || 0;
		count[position] += 1;
		if (count[position] <= limit) notifications.push(item);
		else queue.push(item);
	}
	return {
		notifications,
		queue
	};
}
var createNotificationsStore = () => createStore({
	notifications: [],
	queue: [],
	defaultPosition: "bottom-right",
	limit: 5
});
var notificationsStore = createNotificationsStore();
var useNotifications = (store = notificationsStore) => useStore(store);
function updateNotificationsState(store, update) {
	const state = store.getState();
	const updated = getDistributedNotifications(update([...state.notifications, ...state.queue]), state.defaultPosition, state.limit);
	store.setState({
		notifications: updated.notifications,
		queue: updated.queue,
		limit: state.limit,
		defaultPosition: state.defaultPosition
	});
}
function showNotification(notification, store = notificationsStore) {
	const id = notification.id || randomId();
	updateNotificationsState(store, (notifications) => {
		if (notification.id && notifications.some((n) => n.id === notification.id)) return notifications;
		return [...notifications, {
			...notification,
			id
		}];
	});
	return id;
}
function hideNotification(id, store = notificationsStore) {
	updateNotificationsState(store, (notifications) => notifications.filter((notification) => {
		if (notification.id === id) {
			notification.onClose?.(notification);
			return false;
		}
		return true;
	}));
	return id;
}
function updateNotification(notification, store = notificationsStore) {
	updateNotificationsState(store, (notifications) => notifications.map((item) => {
		if (item.id === notification.id) return {
			...item,
			...notification
		};
		return item;
	}));
	return notification.id;
}
function cleanNotifications(store = notificationsStore) {
	updateNotificationsState(store, () => []);
}
function cleanNotificationsQueue(store = notificationsStore) {
	updateNotificationsState(store, (notifications) => notifications.slice(0, store.getState().limit));
}
var notifications = {
	show: showNotification,
	hide: hideNotification,
	update: updateNotification,
	clean: cleanNotifications,
	cleanQueue: cleanNotificationsQueue,
	updateState: updateNotificationsState
};
//#endregion
export { useNotifications as i, notifications as n, notificationsStore as r, hideNotification as t };
