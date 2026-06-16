import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { n as Combobox, r as useCombobox, t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as InputBase } from "./InputBase-BW3lt9NS.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { n as useApiProvider } from "./module-context-B1aR60OK.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Loader = createLucideIcon("loader", [
	["path", {
		d: "M12 2v4",
		key: "3427ic"
	}],
	["path", {
		d: "m16.2 7.8 2.9-2.9",
		key: "r700ao"
	}],
	["path", {
		d: "M18 12h4",
		key: "wj9ykh"
	}],
	["path", {
		d: "m16.2 16.2 2.9 2.9",
		key: "1bxg5t"
	}],
	["path", {
		d: "M12 18v4",
		key: "jadmvz"
	}],
	["path", {
		d: "m4.9 19.1 2.9-2.9",
		key: "bwix9q"
	}],
	["path", {
		d: "M2 12h4",
		key: "j09sii"
	}],
	["path", {
		d: "m4.9 4.9 2.9 2.9",
		key: "giyufr"
	}]
]);
//#endregion
//#region src/features/components/utils.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDebouncedValue(value, delay) {
	const [debounced, setDebounced] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const timeout = window.setTimeout(() => setDebounced(value), delay);
		return () => window.clearTimeout(timeout);
	}, [value, delay]);
	return debounced;
}
function getArrayPayload(payload) {
	if (Array.isArray(payload)) return payload;
	if (payload && typeof payload === "object") {
		const shaped = payload;
		if (Array.isArray(shaped.data)) return shaped.data;
		if (Array.isArray(shaped.items)) return shaped.items;
		if (Array.isArray(shaped.results)) return shaped.results;
	}
	return [];
}
function mapOption(item, valueKey, labelKey) {
	if (typeof item !== "object") {
		const primitive = String(item);
		return {
			value: primitive,
			label: primitive
		};
	}
	const source = item;
	const rawValue = (valueKey ? source[valueKey] : void 0) ?? source.id ?? source.value ?? source.code ?? source.name;
	return {
		value: String(rawValue),
		label: String((labelKey ? source[labelKey] : void 0) ?? source.name ?? source.label ?? source.code ?? rawValue)
	};
}
//#endregion
//#region src/features/components/form/async-field.tsx
var import_jsx_runtime = require_jsx_runtime();
function AsyncSelectField({ value, field, onChange, disabled = false, error, ...props }) {
	const apiProvider = useApiProvider();
	const combobox = useCombobox();
	const [inputValue, setInputValue] = (0, import_react.useState)(value?.label || "");
	const [isStaticSelect, setIsStaticSelect] = (0, import_react.useState)(false);
	const debouncedInput = useDebouncedValue(inputValue, 300);
	debouncedInput === "" || (debouncedInput.trim().length, field.searchParam?.minChars);
	const mapToOption = (item) => mapOption(item, field.searchParam?.valueKey, field.searchParam?.labelKey);
	const selectQuery = useQuery({
		queryKey: [
			"async-select",
			field.searchParam?.endpoint,
			debouncedInput,
			value?.value
		],
		queryFn: async () => {
			if (!field.searchParam?.endpoint) return {
				options: [],
				total: 0,
				selected: null
			};
			/**
			* Main list/search request
			*/
			let params = {};
			if (field.searchParam?.filter?.field && !field.searchParam?.filter?.type) params[field.searchParam?.filter?.field] = debouncedInput;
			else if (field.searchParam?.filter?.field && field.searchParam?.filter?.type) params[field.searchParam?.filter?.field] = `${field.searchParam?.filter.type}|${debouncedInput}`;
			if (field.searchParam.queryParam && !field.searchParam?.filter) params[field.searchParam.queryParam] = debouncedInput;
			if (field.searchParam?.staticFilters && field.searchParam?.staticFilters) field.searchParam.staticFilters.forEach((staticFilter) => {
				if (staticFilter.filter.type) params[staticFilter.filter.name] = `${staticFilter.filter.type}|${staticFilter.value}|${staticFilter.valueTo}`;
				else params[staticFilter.filter.name] = staticFilter.value;
			});
			params = field.searchParam.queryParam && field.searchParam?.filter ? { [field.searchParam.queryParam]: JSON.stringify(params) } : params;
			const listResponse = await apiProvider.get(field.searchParam.endpoint, { params });
			const options = getArrayPayload(listResponse.data).map(mapToOption).filter((item) => item !== null);
			const total = listResponse.data?.meta?.total ?? listResponse.data?.total ?? options.length;
			/**
			* Load selected item only if needed
			*/
			let selected = null;
			if (value?.value) {
				const existing = options.find((o) => o.value === value.value);
				if (existing) selected = existing;
				else {
					const selectedResponse = await apiProvider.get(`${field.searchParam.endpoint}/${value.value}`);
					selected = mapToOption(selectedResponse.data && typeof selectedResponse.data === "object" && "data" in selectedResponse.data ? selectedResponse.data.data : selectedResponse.data);
				}
			}
			return {
				options,
				total,
				selected
			};
		},
		enabled: Boolean(field?.searchParam?.endpoint) && combobox.dropdownOpened && (debouncedInput === "" || debouncedInput.trim().length >= (field?.searchParam?.minChars || 2)),
		staleTime: 6e4
	});
	(0, import_react.useEffect)(() => {
		setInputValue(value?.label || "");
		if (!value) combobox.resetSelectedOption();
	}, [value]);
	/**
	* Static Select Mode
	*/
	/**
	* Async Autocomplete Mode
	*/
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Combobox, {
		store: combobox,
		onOptionSubmit: (selectedValue, optionProps) => {
			const selected = (selectQuery.data?.options ?? []).find((option) => option.value === selectedValue);
			onChange(selected || null);
			setInputValue(selected?.label || "");
			combobox.closeDropdown();
		},
		position: "bottom",
		middlewares: { flip: false },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Target, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
			disabled,
			value: inputValue,
			placeholder: field.placeholder ?? `Search ${field.label.toLowerCase()}...`,
			onFocus: () => combobox.openDropdown(),
			onChange: (event) => {
				setInputValue(event.currentTarget.value);
				combobox.openDropdown();
				combobox.updateSelectedOptionIndex();
				if (!event.currentTarget.value) onChange(null);
			},
			error
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Dropdown, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Combobox.Options, {
			style: {
				maxHeight: 200,
				overflowY: "auto"
			},
			children: [
				selectQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Empty, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "16" }) }) : null,
				!selectQuery.isLoading && selectQuery.data?.total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Empty, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					children: "No results found"
				}) }) : null,
				(selectQuery.data?.options ?? []).map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox.Option, {
					value: option.value,
					children: option.label
				}, option.value))
			]
		}) })]
	});
}
//#endregion
//#region src/features/components/form/select.tsx
function SelectField({ value, options, onChange, placeholder, label, className, disabled, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
		label,
		value: value?.value,
		onChange: (value, option) => {
			onChange(option);
		},
		data: options,
		placeholder,
		disabled,
		clearable: true,
		searchable: false,
		error
	});
}
//#endregion
export { useDebouncedValue as a, mapOption as i, AsyncSelectField as n, Loader as o, getArrayPayload as r, SelectField as t };
