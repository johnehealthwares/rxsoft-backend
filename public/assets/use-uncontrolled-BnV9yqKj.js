import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
//#region node_modules/@mantine/hooks/esm/use-uncontrolled/use-uncontrolled.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useUncontrolled({ value, defaultValue, finalValue, onChange = () => {} }) {
	const [uncontrolledValue, setUncontrolledValue] = (0, import_react.useState)(defaultValue !== void 0 ? defaultValue : finalValue);
	const handleUncontrolledChange = (val, ...payload) => {
		setUncontrolledValue(val);
		onChange?.(val, ...payload);
	};
	if (value !== void 0) return [
		value,
		onChange,
		true
	];
	return [
		uncontrolledValue,
		handleUncontrolledChange,
		false
	];
}
//#endregion
export { useUncontrolled as t };
