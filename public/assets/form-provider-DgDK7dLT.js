import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleCheckBig = createLucideIcon("circle-check-big", [["path", {
	d: "M21.801 10A10 10 0 1 1 17 3.335",
	key: "yps3ct"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Code = createLucideIcon("code", [["path", {
	d: "m16 18 6-6-6-6",
	key: "eg8j8"
}], ["path", {
	d: "m8 6-6 6 6 6",
	key: "ppft3o"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RectangleEllipsis = createLucideIcon("rectangle-ellipsis", [
	["rect", {
		width: "20",
		height: "12",
		x: "2",
		y: "6",
		rx: "2",
		key: "9lu3g6"
	}],
	["path", {
		d: "M12 12h.01",
		key: "1mp3jc"
	}],
	["path", {
		d: "M17 12h.01",
		key: "1m0b6t"
	}],
	["path", {
		d: "M7 12h.01",
		key: "eqddd0"
	}]
]);
//#endregion
//#region src/features/components/form/form-provider.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function createFormContext(defaultState) {
	const Context = (0, import_react.createContext)(void 0);
	function Provider({ children }) {
		const [formState, setFormState] = (0, import_react.useState)(defaultState);
		const updateField = (field, value) => {
			setFormState((prev) => ({
				...prev,
				[field]: value
			}));
		};
		const resetForm = () => {
			setFormState(defaultState);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
			value: {
				formState,
				setFormState,
				updateField,
				resetForm
			},
			children
		});
	}
	function useForm() {
		const context = (0, import_react.useContext)(Context);
		if (!context) throw new Error("useForm must be used within its Provider");
		return context;
	}
	return {
		Provider,
		useForm
	};
}
//#endregion
export { CircleCheckBig as i, RectangleEllipsis as n, Code as r, createFormContext as t };
