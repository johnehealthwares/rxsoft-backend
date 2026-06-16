//#region node_modules/@mantine/core/esm/core/utils/create-event-handler/create-event-handler.mjs
function createEventHandler(parentEventHandler, eventHandler) {
	return (event) => {
		parentEventHandler?.(event);
		eventHandler?.(event);
	};
}
//#endregion
export { createEventHandler as t };
