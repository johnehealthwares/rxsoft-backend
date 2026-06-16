import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
//#region node_modules/@mantine/hooks/esm/use-disclosure/use-disclosure.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDisclosure(initialState = false, options = {}) {
	const [opened, setOpened] = (0, import_react.useState)(initialState);
	const open = (0, import_react.useCallback)(() => {
		setOpened((isOpened) => {
			if (!isOpened) {
				options.onOpen?.();
				return true;
			}
			return isOpened;
		});
	}, [options.onOpen]);
	const close = (0, import_react.useCallback)(() => {
		setOpened((isOpened) => {
			if (isOpened) {
				options.onClose?.();
				return false;
			}
			return isOpened;
		});
	}, [options.onClose]);
	return [opened, {
		open,
		close,
		toggle: (0, import_react.useCallback)(() => {
			opened ? close() : open();
		}, [
			close,
			open,
			opened
		]),
		set: setOpened
	}];
}
//#endregion
export { useDisclosure as t };
