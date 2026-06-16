import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
//#region src/context/module-context.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var ModuleContext = (0, import_react.createContext)(void 0);
function useModuleContext() {
	const context = (0, import_react.useContext)(ModuleContext);
	if (!context) throw new Error("useModuleContext must be used within a ModuleProvider");
	return context;
}
/**
* Hook to get the current module ID
*/
function useModuleId() {
	return useModuleContext().moduleId;
}
/**
* Hook to get the API provider for the current module
*/
function useApiProvider() {
	return useModuleContext().apiProvider;
}
/**
* Hook to get the current module name
*/
function useModuleName() {
	return useModuleContext().moduleName;
}
/**
* Hook to change the selected module
*/
function useSetSelectedModule() {
	return useModuleContext().setSelectedModule;
}
//#endregion
export { useModuleName as a, useModuleId as i, useApiProvider as n, useSetSelectedModule as o, useModuleContext as r, ModuleContext as t };
