import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { f as useProps, i as genericFactory } from "./Box-7OfPvxF3.js";
import { t as Tabs } from "./Tabs-oGU2Pok4.js";
import { r as useMergedRef, t as assignRef } from "./use-merged-ref-BDko4TTF.js";
import { t as useUncontrolled } from "./use-uncontrolled-BnV9yqKj.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useResolvedStylesApi } from "./use-resolved-styles-api-DyPXwNb0.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as CloseButton } from "./CloseButton-DrI2P31g.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as InputBase } from "./InputBase-BW3lt9NS.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Switch } from "./Switch-BPgr54EU.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { t as useMutation } from "./useMutation-CaMFWIEn.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { t as FileUp } from "./file-up-B7FXjQGu.js";
import { t as SelectField } from "./select-DJXsgV1Q.js";
import { An as Search, Cr as codingConceptEndpoint, Hn as ListFilter, Hr as Grid, Jt as RxPage, Pr as Title, Sr as codingConceptApi, Ur as Alert, dn as ColumnTypeFilters, qt as DataPageShell, un as ColumnDataType, yn as Upload } from "./index-BRcLwOKn.js";
//#region node_modules/@mantine/core/esm/components/FileButton/FileButton.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var FileButton = genericFactory((props) => {
	const { onChange, children, multiple, accept, name, form, resetRef, disabled, capture, inputProps, ref, ...others } = useProps("FileButton", null, props);
	const inputRef = (0, import_react.useRef)(null);
	const onClick = () => {
		!disabled && inputRef.current?.click();
	};
	const handleChange = (event) => {
		if (event.currentTarget.files === null) return onChange(multiple ? [] : null);
		if (multiple) onChange(Array.from(event.currentTarget.files));
		else onChange(event.currentTarget.files[0] || null);
	};
	const reset = () => {
		if (inputRef.current) inputRef.current.value = "";
	};
	assignRef(resetRef, reset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		style: { display: "none" },
		type: "file",
		accept,
		multiple,
		onChange: handleChange,
		ref: useMergedRef(ref, inputRef),
		name,
		form,
		capture,
		...inputProps
	}), children({
		onClick,
		...others
	})] });
});
FileButton.displayName = "@mantine/core/FileButton";
//#endregion
//#region node_modules/@mantine/core/esm/components/FileInput/FileInput.mjs
var DefaultValue = ({ value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	style: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	},
	children: Array.isArray(value) ? value.map((file) => file.name).join(", ") : value?.name
});
var defaultProps = {
	valueComponent: DefaultValue,
	size: "sm"
};
var FileInput = genericFactory((_props) => {
	const props = useProps("FileInput", defaultProps, _props);
	const { unstyled, vars, onChange, value, defaultValue, multiple, accept, name, form, valueComponent: ValueComponent, clearable, clearSectionMode, clearButtonProps, readOnly, capture, fileInputProps, rightSection, size, placeholder, component, resetRef: resetRefProp, classNames, styles, attributes, ...others } = props;
	const resetRef = (0, import_react.useRef)(null);
	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
		classNames,
		styles,
		props
	});
	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		onChange,
		finalValue: multiple ? [] : null
	});
	const hasValue = Array.isArray(_value) ? _value.length !== 0 : _value !== null;
	const clearButton = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
		...clearButtonProps,
		variant: "subtle",
		onClick: () => setValue(multiple ? [] : null),
		size,
		unstyled
	});
	const _clearable = clearable && hasValue && !readOnly;
	(0, import_react.useEffect)(() => {
		if (Array.isArray(_value) && _value.length === 0 || _value === null) resetRef.current?.();
	}, [_value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileButton, {
		onChange: setValue,
		multiple,
		accept,
		name,
		form,
		resetRef: useMergedRef(resetRef, resetRefProp),
		disabled: readOnly,
		capture,
		inputProps: fileInputProps,
		children: (fileButtonProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
			component: component || "button",
			rightSection,
			__clearSection: clearButton,
			__clearable: _clearable,
			__clearSectionMode: clearSectionMode,
			...fileButtonProps,
			...others,
			__staticSelector: "FileInput",
			multiline: true,
			type: "button",
			pointer: true,
			__stylesApiProps: props,
			unstyled,
			size,
			classNames,
			styles,
			attributes,
			children: !hasValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Placeholder, {
				__staticSelector: "FileInput",
				classNames: resolvedClassNames,
				styles: resolvedStyles,
				attributes,
				children: placeholder
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueComponent, { value: _value })
		})
	});
});
FileInput.classes = InputBase.classes;
FileInput.displayName = "@mantine/core/FileInput";
//#endregion
//#region src/features/coding-concept/pages/shared.tsx
var codingModuleOptions = [
	{
		label: "DICOM",
		value: "DICOM"
	},
	{
		label: "LOINC",
		value: "LOINC"
	},
	{
		label: "SNOMED",
		value: "SNOMED"
	},
	{
		label: "EMDEx",
		value: "EMDEx"
	},
	{
		label: "ICD10",
		value: "ICD10"
	},
	{
		label: "RxNorm",
		value: "RxNorm"
	}
];
function MetadataPreview({ metadata }) {
	const entries = Object.entries(metadata ?? {});
	if (!entries.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
		size: "sm",
		c: "dimmed",
		children: "No metadata returned for this concept."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		align: "stretch",
		grow: true,
		children: entries.map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			withBorder: true,
			radius: "md",
			style: { borderStyle: "dashed" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: 6,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							fw: 600,
							children: value.attributeName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: value.attributeId
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						fw: 500,
						style: { wordBreak: "break-word" },
						children: value.attributeValue
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "xs",
						c: "dimmed",
						children: ["Format: ", value.valueFormat ?? "plain"]
					})
				]
			})
		}, key))
	});
}
function ConceptSummaryCard({ concept }) {
	if (!concept) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		withBorder: true,
		radius: "md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 700,
						size: "lg",
						children: concept.fullName ?? concept.shortName ?? concept.code ?? "Unknown concept"
					}),
					concept.module && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: concept.module }),
					concept.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: concept.code
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					children: concept.shortDescription ?? concept.fullDescription ?? "No description available."
				}),
				!!concept.externalMappings?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 6,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "xs",
						fw: 600,
						tt: "uppercase",
						c: "dimmed",
						children: "External mappings"
					}), concept.externalMappings.map((mapping, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						withBorder: true,
						radius: "sm",
						p: "xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "xs",
							children: [
								mapping.externalModule,
								":",
								mapping.externalCode,
								" → ",
								mapping.internalModule,
								":",
								mapping.internalCode ?? concept.code
							]
						})
					}, mapping.id ?? `${mapping.externalModule}-${mapping.externalCode}-${idx}`))]
				})
			]
		})
	});
}
//#endregion
//#region src/features/coding-concept/pages/components/concepts.tsx
var conceptsEndpoint = codingConceptEndpoint("/concepts");
var conceptFields = [
	{
		name: "concept",
		label: "Concept",
		type: "select",
		required: true,
		options: codingModuleOptions,
		placeholder: "Select module",
		col: 6
	},
	{
		name: "code",
		label: "Code",
		required: true,
		placeholder: "LOINC-12345",
		col: 6
	},
	{
		name: "shortName",
		label: "Short name",
		placeholder: "CBC",
		col: 6
	},
	{
		name: "longName",
		label: "Long name",
		col: 6,
		placeholder: "Complete Blood Count"
	},
	{
		name: "shortDescription",
		label: "Short description",
		col: 6,
		placeholder: "Brief label used in compact views",
		type: "textarea"
	},
	{
		name: "fullDescription",
		label: "Full description",
		col: 12,
		placeholder: "Long clinical description",
		type: "textarea"
	}
];
var config = {
	id: "concepts",
	title: "Concept Codes",
	description: "Registered codes by coding module.",
	endpoint: conceptsEndpoint,
	columns: [
		{
			key: "concept",
			label: "Concept",
			filters: ColumnTypeFilters.STRING
		},
		{
			key: "code",
			label: "Code",
			filters: ColumnTypeFilters.STRING
		},
		{
			key: "shortName",
			label: "Short name",
			filters: ColumnTypeFilters.STRING
		},
		{
			key: "longName",
			label: "Long name",
			filters: ColumnTypeFilters.STRING
		},
		{
			key: "updatedAt",
			label: "Updated",
			dataType: ColumnDataType.DATE,
			filters: ColumnTypeFilters.DATE
		}
	],
	modalTitle: "Add Concept Code",
	createFields: conceptFields,
	detailPathBuilder: (row) => `${row.id}`,
	buildCreatePayload: (values) => ({ code: {
		concept: values.module.value,
		code: values.code,
		shortName: values.shortName,
		fullName: values.fullName,
		shortDescription: values.shortDescription,
		fullDescription: values.fullDescription
	} }),
	buildUpdatePayload: (values) => ({
		module: values.module,
		code: values.code,
		shortName: values.shortName,
		fullName: values.fullName,
		shortDescription: values.shortDescription,
		fullDescription: values.fullDescription
	}),
	canDelete: true
};
var Concepts = () => {
	const [formState, setFormState] = (0, import_react.useState)({});
	const updateField = (name, value) => {
		setFormState((prev) => ({
			...prev,
			[name]: value
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, {
		config,
		embedded: true,
		formState,
		setFormState,
		updateField
	});
};
//#endregion
//#region src/features/coding-concept/pages/registry.tsx
function CodingConceptRegistryPage() {
	const [formState, setFormState] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Coding Concept Registry",
		description: "Manage concept codes, concept metadata values, and external mappings for the terminology service.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Concepts, {})
	});
}
//#endregion
//#region src/features/coding-concept/pages/search.tsx
function CodingConceptSearchPage() {
	const [module, setModule] = (0, import_react.useState)("LOINC");
	const [term, setTerm] = (0, import_react.useState)("");
	const [metadata, setMetadata] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(null);
	const query = useQuery({
		queryKey: [
			"coding-concept",
			"search",
			submitted
		],
		enabled: Boolean(submitted?.term),
		retry: false,
		queryFn: async () => {
			return (await codingConceptApi.get(`/concepts/search/${encodeURIComponent(submitted.module)}/${encodeURIComponent(submitted.term)}`, { params: submitted?.metadata ? { metadata: "true" } : void 0 })).data?.data ?? null;
		}
	});
	const title = (0, import_react.useMemo)(() => {
		if (!submitted?.term) return "Search a terminology concept";
		return `Search result for ${submitted.module}:${submitted.term}`;
	}, [submitted]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Coding Concept Search",
		description: "Return the first best-matching concept by module and code or name.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }),
			onClick: () => setSubmitted({
				module,
				term: term.trim(),
				metadata
			}),
			disabled: !term.trim(),
			children: "Search"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
			span: {
				base: 12,
				xl: 4
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				withBorder: true,
				radius: "md",
				p: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 5,
							children: "Search Filters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							c: "dimmed",
							children: "Select module and search term"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Module",
							data: codingModuleOptions,
							value: module,
							onChange: (v) => setModule(v || "LOINC"),
							placeholder: "Select module"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Code or name",
							value: term,
							onChange: (e) => setTerm(e.currentTarget.value),
							placeholder: "e.g. CBC, 12345-6, chest x-ray"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							justify: "space-between",
							wrap: "nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								fw: 500,
								children: "Include metadata"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xs",
								c: "dimmed",
								children: "Returns metadata keyed by attribute ID"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: metadata,
								onChange: (e) => setMetadata(e.currentTarget.checked)
							})]
						})
					]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
			span: {
				base: 12,
				xl: 8
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConceptSummaryCard, { concept: query.data }),
					submitted?.metadata && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						withBorder: true,
						radius: "md",
						p: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								order: 5,
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								c: "dimmed",
								children: "Metadata values returned as keyed attribute objects."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetadataPreview, { metadata: query.data?.metadata })]
						})
					}),
					query.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						c: "dimmed",
						children: "Searching concepts…"
					}),
					query.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						c: "red",
						children: "No concept matched the submitted module and search term."
					}),
					!query.isLoading && !query.isError && submitted?.term && !query.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						c: "dimmed",
						children: "No concept returned."
					})
				]
			})
		})] })
	});
}
//#endregion
//#region src/features/coding-concept/pages/match.tsx
function CodingConceptMatchPage() {
	const [module, setModule] = (0, import_react.useState)({
		value: "DICOM",
		label: "DICOM"
	});
	const [term, setTerm] = (0, import_react.useState)("");
	const [metadata, setMetadata] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(null);
	const query = useQuery({
		queryKey: [
			"coding-concept",
			"match",
			submitted
		],
		enabled: Boolean(submitted?.term),
		retry: false,
		queryFn: async () => {
			const response = await codingConceptApi.get(`/concepts/match/${encodeURIComponent(submitted.module)}/${encodeURIComponent(submitted.term)}`, { params: submitted?.metadata ? { metadata: "true" } : void 0 });
			return Array.isArray(response.data?.data) ? response.data.data : [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Coding Concept Match",
		description: "Return all matching concepts by module using code, short name, or full name.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { size: 16 }),
			onClick: () => setSubmitted({
				module: module?.value || "",
				term: term.trim(),
				metadata
			}),
			disabled: !term.trim(),
			children: "Match"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			align: "flex-start",
			grow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				withBorder: true,
				radius: "md",
				style: { maxWidth: 340 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "Module",
							value: module,
							onChange: (option) => setModule(option),
							options: codingModuleOptions,
							placeholder: "Select module"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Code or name",
							value: term,
							onChange: (e) => setTerm(e.target.value),
							placeholder: "e.g. XRAY, glucose, platelet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							withBorder: true,
							radius: "md",
							p: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								justify: "space-between",
								align: "flex-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 500,
									children: "Include metadata"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xs",
									c: "dimmed",
									children: "Each matched concept includes keyed metadata by attribute ID."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: metadata,
									onChange: (e) => setMetadata(e.currentTarget.checked)
								})]
							})
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "md",
				children: [
					query.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						c: "dimmed",
						children: "Matching concepts…"
					})] }),
					query.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						color: "red",
						children: "Unable to load concept matches."
					}),
					!query.isLoading && !query.isError && submitted?.term && (query.data?.length ?? 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						c: "dimmed",
						children: "No matches found."
					}),
					(query.data ?? []).map((concept) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConceptSummaryCard, { concept }), submitted?.metadata && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetadataPreview, { metadata: concept.metadata })]
					}, concept.id))
				]
			})]
		})
	});
}
//#endregion
//#region src/features/coding-concept/pages/upload.tsx
var codeSample = JSON.stringify([{
	module: "LOINC",
	code: "1234-5",
	shortName: "CBC",
	fullName: "Complete Blood Count",
	shortDescription: "Sample concept code",
	fullDescription: "Example payload for bulk code upload"
}], null, 2);
var conceptValueSample = JSON.stringify([{
	entity: "concept-uuid",
	module: "LOINC",
	attributeId: "specimen",
	attributeName: "Specimen",
	value: "Blood",
	valueFormat: "text"
}], null, 2);
function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result || ""));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Unable to read file"));
		reader.readAsText(file);
	});
}
function CodingConceptUploadPage() {
	const [codesPayload, setCodesPayload] = (0, import_react.useState)(codeSample);
	const [valuesPayload, setValuesPayload] = (0, import_react.useState)(conceptValueSample);
	const codesUpload = useMutation({
		mutationFn: async () => {
			const parsed = JSON.parse(codesPayload);
			return (await codingConceptApi.post("/concepts/upload/codes", parsed)).data;
		},
		onSuccess: () => notifications.show({
			message: "Concept codes uploaded",
			color: "green"
		}),
		onError: (error) => notifications.show({
			color: "red",
			message: error?.response?.data?.message || "Failed to upload concept codes"
		})
	});
	const valuesUpload = useMutation({
		mutationFn: async () => {
			const parsed = JSON.parse(valuesPayload);
			return (await codingConceptApi.post("/concepts/upload/values", parsed)).data;
		},
		onSuccess: () => notifications.show({
			message: "Concept values uploaded",
			color: "green"
		}),
		onError: (error) => notifications.show({
			color: "red",
			message: error?.response?.data?.message || "Failed to upload concept values"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Coding Concept Upload",
		description: "Bulk upload codes and concept values into the terminology registry using JSON arrays.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "codes",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.List, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
					value: "codes",
					children: "Codes upload"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
					value: "values",
					children: "Concept values upload"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
					value: "codes",
					pt: "md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadPanel, {
						title: "Bulk Upload Codes",
						description: "Paste a JSON array of module codes or load it from a file, then submit it directly.",
						value: codesPayload,
						sample: codeSample,
						onChange: setCodesPayload,
						onSubmit: () => codesUpload.mutate(),
						isPending: codesUpload.isPending
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
					value: "values",
					pt: "md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadPanel, {
						title: "Bulk Upload Concept Values",
						description: "Paste a JSON array of concept value records keyed by concept entity UUID.",
						value: valuesPayload,
						sample: conceptValueSample,
						onChange: setValuesPayload,
						onSubmit: () => valuesUpload.mutate(),
						isPending: valuesUpload.isPending
					})
				})
			]
		})
	});
}
function UploadPanel({ title, description, value, sample, onChange, onSubmit, isPending }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		withBorder: true,
		radius: "md",
		p: "lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 4,
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					children: description
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "light",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 16 }),
					onClick: () => onChange(sample),
					children: "Load sample"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileInput, {
					accept: "application/json,.json",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 16 }),
					placeholder: "Load file",
					onChange: async (file) => {
						if (!file) return;
						onChange(await readFile(file));
					}
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value,
					onChange: (e) => onChange(e.currentTarget.value),
					minRows: 14,
					autosize: true,
					styles: { input: {
						fontFamily: "monospace",
						fontSize: 13
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onSubmit,
					loading: isPending,
					children: "Upload payload"
				})
			]
		})
	});
}
//#endregion
//#region src/features/coding-concept/pages/generic-drugs/schema.ts
var columns$8 = [
	{
		key: "code",
		label: "Code"
	},
	{
		key: "name",
		label: "Name"
	},
	{
		key: "therapeuticClass",
		label: "Therapeutic Class"
	},
	{
		key: "dosageForm",
		label: "Dosage Form"
	},
	{
		key: "strength",
		label: "Strength"
	},
	{
		key: "updatedAt",
		label: "Updated"
	}
];
var createFields$2 = [
	{
		name: "code",
		label: "Code",
		required: true
	},
	{
		name: "name",
		label: "Name",
		required: true
	},
	{
		name: "therapeuticClass",
		label: "Therapeutic Class"
	},
	{
		name: "dosageForm",
		label: "Dosage Form"
	},
	{
		name: "strength",
		label: "Strength"
	},
	{
		name: "generalUse",
		label: "General Use"
	},
	{
		name: "adultDosage",
		label: "Adult Dosage"
	},
	{
		name: "pediatricDosage",
		label: "Pediatric Dosage"
	},
	{
		name: "isPrescriptionRequired",
		label: "Prescription Required",
		type: "switch"
	},
	{
		name: "isControlledSubstance",
		label: "Controlled Substance",
		type: "switch"
	}
];
function buildCreatePayload$2(values) {
	return {
		code: values.code,
		name: values.name,
		therapeuticClass: values.therapeuticClass || void 0,
		dosageForm: values.dosageForm || void 0,
		strength: values.strength || void 0,
		generalUse: values.generalUse || "",
		adultDosage: values.adultDosage || "",
		pediatricDosage: values.pediatricDosage || "",
		isPrescriptionRequired: values.isPrescriptionRequired ?? false,
		isControlledSubstance: values.isControlledSubstance ?? false
	};
}
var genericDrugsConfig = {
	id: "generic-drugs",
	title: "Generic Drugs",
	description: "Manage generic drug reference records.",
	endpoint: "/generic-products",
	columns: columns$8,
	createFields: createFields$2,
	buildCreatePayload: buildCreatePayload$2,
	canDelete: true
};
//#endregion
//#region src/features/coding-concept/pages/generic-drugs/index.tsx
function CodedGenericDrugsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...genericDrugsConfig,
		apiProvider: codingConceptApi
	} });
}
//#endregion
//#region src/features/coding-concept/pages/pharmaceutics/schema.ts
var columns$7 = [
	{
		key: "code",
		label: "Code"
	},
	{
		key: "commonGenericName",
		label: "Generic Name"
	},
	{
		key: "clinicalName",
		label: "Clinical Name"
	},
	{
		key: "drugClass",
		label: "Drug Class"
	},
	{
		key: "updatedAt",
		label: "Updated"
	}
];
var createFields$1 = [
	{
		name: "code",
		label: "Code",
		required: true
	},
	{
		name: "commonBrandName",
		label: "Common Brand Name"
	},
	{
		name: "commonGenericName",
		label: "Common Generic Name"
	},
	{
		name: "clinicalName",
		label: "Clinical Name"
	},
	{
		name: "drugClass",
		label: "Drug Class"
	},
	{
		name: "chemicalConstituents",
		label: "Chemical Constituents"
	},
	{
		name: "pharmaceutics",
		label: "Pharmaceutics"
	},
	{
		name: "indications",
		label: "Indications"
	},
	{
		name: "contraindications",
		label: "Contraindications"
	},
	{
		name: "mechanism",
		label: "Mechanism"
	},
	{
		name: "missedDose",
		label: "Missed Dose"
	},
	{
		name: "drugInteractions",
		label: "Drug Interactions"
	},
	{
		name: "dosage",
		label: "Dosage"
	}
];
function buildCreatePayload$1(values) {
	return {
		code: values.code,
		commonBrandName: values.commonBrandName || void 0,
		commonGenericName: values.commonGenericName || void 0,
		clinicalName: values.clinicalName || void 0,
		drugClass: values.drugClass || void 0,
		chemicalConstituents: values.chemicalConstituents || void 0,
		pharmaceutics: values.pharmaceutics || void 0,
		indications: values.indications || void 0,
		contraindications: values.contraindications || void 0,
		mechanism: values.mechanism || void 0,
		missedDose: values.missedDose || void 0,
		drugInteractions: values.drugInteractions || void 0,
		dosage: values.dosage || void 0
	};
}
var codedPharmaceuticsConfig = {
	id: "coded-pharmaceutics",
	title: "Pharmaceutics",
	description: "Clinical and pharmaceutical reference records.",
	endpoint: "/pharmaceutics",
	columns: columns$7,
	createFields: createFields$1,
	buildCreatePayload: buildCreatePayload$1,
	canDelete: true
};
//#endregion
//#region src/features/coding-concept/pages/pharmaceutics/index.tsx
function CodedPharmaceuticsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...codedPharmaceuticsConfig,
		apiProvider: codingConceptApi
	} });
}
//#endregion
//#region src/features/coding-concept/pages/drug-components/schema.ts
var columns$6 = [{
	key: "name",
	label: "Name"
}, {
	key: "updatedAt",
	label: "Updated"
}];
var createFields = [{
	name: "name",
	label: "Name",
	required: true
}];
function buildCreatePayload(values) {
	return { name: values.name };
}
var codedDrugComponentsConfig = {
	id: "coded-drug-components",
	title: "Drug Components",
	description: "Manage active ingredients and component lookup values.",
	endpoint: "/drug-components",
	columns: columns$6,
	createFields,
	buildCreatePayload
};
//#endregion
//#region src/features/coding-concept/pages/drug-components/index.tsx
function CodedDrugComponentsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...codedDrugComponentsConfig,
		apiProvider: codingConceptApi
	} });
}
var facilitiesConfig = {
	id: "facilities",
	title: "Facilities",
	description: "View healthcare facility reference data.",
	endpoint: "/facilities",
	columns: [
		{
			key: "facilityId",
			label: "Code"
		},
		{
			key: "facilityName",
			label: "Name"
		},
		{
			key: "facilityType.name",
			label: "Type"
		},
		{
			key: "facilityLevel.name",
			label: "Level"
		},
		{
			key: "lga.name",
			label: "LGA"
		},
		{
			key: "ward.name",
			label: "Ward"
		},
		{
			key: "state.name",
			label: "State"
		}
	]
};
//#endregion
//#region src/features/coding-concept/pages/facilities/index.tsx
function CodedFacilitiesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...facilitiesConfig,
		apiProvider: codingConceptApi
	} });
}
var facilityStatesConfig = {
	id: "facility-states",
	title: "States",
	description: "View state reference data.",
	endpoint: "/facilities/states",
	columns: [{
		key: "code",
		label: "Code"
	}, {
		key: "name",
		label: "Name"
	}]
};
//#endregion
//#region src/features/coding-concept/pages/facility-states/index.tsx
function CodedFacilityStatesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...facilityStatesConfig,
		apiProvider: codingConceptApi
	} });
}
var facilityLgasConfig = {
	id: "facility-lgas",
	title: "LGAs",
	description: "View LGA reference data.",
	endpoint: "/facilities/lgas",
	columns: [
		{
			key: "code",
			label: "Code"
		},
		{
			key: "name",
			label: "Name"
		},
		{
			key: "stateCode",
			label: "State Code"
		}
	]
};
//#endregion
//#region src/features/coding-concept/pages/facility-lgas/index.tsx
function CodedFacilityLgasPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...facilityLgasConfig,
		apiProvider: codingConceptApi
	} });
}
var facilityWardsConfig = {
	id: "facility-wards",
	title: "Wards",
	description: "View ward reference data.",
	endpoint: "/facilities/wards",
	columns: [
		{
			key: "code",
			label: "Code"
		},
		{
			key: "name",
			label: "Name"
		},
		{
			key: "lgaCode",
			label: "LGA Code"
		}
	]
};
//#endregion
//#region src/features/coding-concept/pages/facility-wards/index.tsx
function CodedFacilityWardsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...facilityWardsConfig,
		apiProvider: codingConceptApi
	} });
}
var facilityTypesConfig = {
	id: "facility-types",
	title: "Facility Types",
	description: "View facility type reference data.",
	endpoint: "/facilities/types",
	columns: [{
		key: "code",
		label: "Code"
	}, {
		key: "name",
		label: "Name"
	}]
};
//#endregion
//#region src/features/coding-concept/pages/facility-types/index.tsx
function CodedFacilityTypesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...facilityTypesConfig,
		apiProvider: codingConceptApi
	} });
}
var facilityLevelsConfig = {
	id: "facility-levels",
	title: "Facility Levels",
	description: "View facility level reference data.",
	endpoint: "/facilities/levels",
	columns: [{
		key: "code",
		label: "Code"
	}, {
		key: "name",
		label: "Name"
	}]
};
//#endregion
//#region src/features/coding-concept/pages/facility-levels/index.tsx
function CodedFacilityLevelsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, { config: {
		...facilityLevelsConfig,
		apiProvider: codingConceptApi
	} });
}
//#endregion
export { CodedFacilityStatesPage as a, CodedPharmaceuticsPage as c, CodingConceptMatchPage as d, CodingConceptSearchPage as f, CodedFacilityLgasPage as i, CodedGenericDrugsPage as l, CodedFacilityTypesPage as n, CodedFacilitiesPage as o, CodingConceptRegistryPage as p, CodedFacilityWardsPage as r, CodedDrugComponentsPage as s, CodedFacilityLevelsPage as t, CodingConceptUploadPage as u };
