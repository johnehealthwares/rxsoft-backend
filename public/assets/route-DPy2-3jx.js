import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { i as CircleCheckBig, n as RectangleEllipsis, r as Code, t as createFormContext } from "./form-provider-DgDK7dLT.js";
import { Gr as Alert, Jt as DataPageShell, Qn as CircleAlert, Wr as Grid, en as RenderField, fn as ColumnTypeFilters, tn as JsonEditorField } from "./index-DuM1cidb.js";
import { c as PROTOCOL_TYPE_OPTIONS, p as TLS_VERSION_OPTIONS, t as AE_STATUS_OPTIONS } from "./constants-CPyAcdXH.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Server = createLucideIcon("server", [
	["rect", {
		width: "20",
		height: "8",
		x: "2",
		y: "2",
		rx: "2",
		ry: "2",
		key: "ngkwjq"
	}],
	["rect", {
		width: "20",
		height: "8",
		x: "2",
		y: "14",
		rx: "2",
		ry: "2",
		key: "iecqi9"
	}],
	["line", {
		x1: "6",
		x2: "6.01",
		y1: "6",
		y2: "6",
		key: "16zg32"
	}],
	["line", {
		x1: "6",
		x2: "6.01",
		y1: "18",
		y2: "18",
		key: "nzw8ys"
	}]
]);
//#endregion
//#region src/features/communication/components/ae/tabs.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var generalFieldGroups = [
	{ fields: [{
		name: "name",
		label: "AE Name",
		required: true,
		placeholder: "e.g., Hospital XYZ EMR",
		col: 12
	}, {
		name: "description",
		label: "Description",
		placeholder: "Electroninc medical record app used for sending orders",
		col: 12
	}] },
	{ fields: [{
		name: "facilityCode",
		label: "Facility Code",
		placeholder: "e.g., FAC001",
		col: 6
	}, {
		name: "customId",
		label: "Custom ID",
		placeholder: "e.g., CUSTOM123",
		col: 6
	}] },
	{ fields: [{
		name: "facilityId",
		label: "Facility ID",
		col: 6
	}, {
		name: "facilityName",
		label: "Facility Name",
		col: 6
	}] },
	{ fields: [{
		name: "organizationId",
		label: "Organization ID",
		col: 6
	}, {
		name: "status",
		label: "Status",
		type: "select",
		options: AE_STATUS_OPTIONS,
		col: 6
	}] }
];
var inboundFieldGroups = [{
	title: "Inbound Protocol Configuration",
	fields: [{
		name: "inboundConfig",
		label: "Inbound Protocol Configurations",
		type: "json",
		col: 12
	}]
}];
var outboundFieldGroups = [{
	title: "Outbound Protocol Configuration",
	fields: [{
		name: "outboundConfig",
		label: "Outbound Protocol Configurations",
		type: "json",
		col: 12
	}]
}];
var securityFieldGroups = [
	{ fields: [{
		name: "securitySettings.tlsEnabled",
		label: "Enable TLS",
		type: "switch",
		col: 12
	}] },
	{ fields: [{
		name: "securitySettings.tlsVersion",
		label: "TLS Version",
		type: "select",
		options: TLS_VERSION_OPTIONS,
		col: 6
	}, {
		name: "securitySettings.acceptSelfSigned",
		label: "Accept Self-Signed Certificates",
		type: "switch",
		col: 6
	}] },
	{ fields: [{
		name: "securitySettings.certificatePath",
		label: "Certificate Path",
		col: 6
	}, {
		name: "securitySettings.privateKeyPath",
		label: "Private Key Path",
		col: 6
	}] },
	{ fields: [{
		name: "securitySettings.caPath",
		label: "CA Path",
		col: 12
	}] }
];
var attributesFieldGroups = [{ fields: [{
	name: "attributes",
	label: "Custom Attributes",
	type: "json",
	col: 12
}] }];
//#endregion
//#region src/features/communication/components/ae/attributes-tab.tsx
var import_jsx_runtime = require_jsx_runtime();
function AttributesTab({ formState, updateField }) {
	const [viewMode, setViewMode] = (0, import_react.useState)("form");
	if (viewMode === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "space-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectangleEllipsis, { size: 16 }),
				onClick: () => setViewMode("form"),
				children: "Form View"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
			label: "Custom Attributes (JSON)",
			value: formState.attributes,
			onChange: (v) => updateField("attributes", v)
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }),
				title: "Custom Attributes",
				color: "blue",
				children: "Define custom attributes for this Application Entity"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "space-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { size: 16 }),
					onClick: () => setViewMode("json"),
					children: "JSON View"
				})
			}),
			attributesFieldGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: field.col || 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
					field,
					value: field.name.startsWith("attributes.") ? (formState.attributes || {})[field.name.split(".")[1]] : "",
					updateField: (name, value) => {
						if (name.startsWith("attributes.")) {
							const key = name.split(".")[1];
							updateField("attributes", {
								...formState.attributes,
								[key]: value
							});
						} else updateField(name, value);
					}
				})
			}, field.name)) }, groupIndex))
		]
	});
}
//#endregion
//#region src/features/communication/components/ae/config.tsx
var getStatusIcon = (status) => {
	switch (status) {
		case "ACTIVE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 14 });
		case "ERROR": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 14 });
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 14 });
	}
};
var getStatusColor = (status) => {
	switch (status) {
		case "ACTIVE": return "green";
		case "INACTIVE": return "gray";
		case "MAINTENANCE": return "yellow";
		case "ERROR": return "red";
		default: return "blue";
	}
};
var columns = [
	{
		key: "id",
		label: "ID",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			truncate: true,
			children: String(row.id).substring(0, 8)
		})
	},
	{
		key: "name",
		label: "Name",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			fw: 500,
			children: row.name
		}),
		filters: ColumnTypeFilters.STRING
	},
	{
		key: "facilityCode",
		label: "Facility Code",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			children: row.facilityCode || "-"
		})
	},
	{
		key: "status",
		label: "Status",
		render: (row) => {
			const status = String(row.status);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				color: getStatusColor(status),
				children: [getStatusIcon(status), status]
			});
		}
	},
	{
		key: "inboundCapabilities",
		label: "Inbound",
		render: (row) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				gap: "xs",
				children: (Array.isArray(row.inboundCapabilities) ? row.inboundCapabilities.slice(0, 2) : []).map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					size: "sm",
					variant: "light",
					children: cap
				}, cap))
			});
		}
	},
	{
		key: "outboundCapabilities",
		label: "Outbound",
		render: (row) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				gap: "xs",
				children: (Array.isArray(row.outboundCapabilities) ? row.outboundCapabilities.slice(0, 2) : []).map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					size: "sm",
					variant: "light",
					children: cap
				}, cap))
			});
		}
	},
	{
		key: "createdAt",
		label: "Created",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			children: row.createdAt ? new Date(String(row.createdAt)).toLocaleDateString() : "-"
		})
	}
];
//#endregion
//#region src/features/communication/components/ae/general-tab.tsx
function GeneralTab({ formState, updateField }) {
	const [viewMode, setViewMode] = (0, import_react.useState)("form");
	if (viewMode === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "space-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectangleEllipsis, { size: 16 }),
				onClick: () => setViewMode("form"),
				children: "Form View"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
			label: "General Configuration (JSON)",
			value: formState,
			onChange: (v) => {
				Object.entries(v).forEach(([key, value]) => {
					updateField(key, value);
				});
			}
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "space-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { size: 16 }),
					onClick: () => setViewMode("json"),
					children: "JSON View"
				})
			}),
			generalFieldGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: field.col || 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
					field,
					value: formState[field.name] || "",
					updateField,
					disabled: field.disabled
				})
			}, field.name)) }, groupIndex)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
				field: {
					name: "inboundCapabilities",
					label: "Inbound",
					type: "multi-pick",
					options: PROTOCOL_TYPE_OPTIONS,
					placeholder: "Add outbound protocol"
				},
				value: formState.inboundCapabilities,
				updateField,
				disabled: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
				field: {
					name: "outboundCapabilities",
					label: "Outbound",
					type: "multi-pick",
					options: PROTOCOL_TYPE_OPTIONS,
					placeholder: "Add outbound protocol"
				},
				value: formState.outboundCapabilities,
				updateField,
				disabled: false
			})
		]
	});
}
//#endregion
//#region src/features/communication/components/ae/inbound-tab.tsx
function InboundTab({ formState, updateField }) {
	const [viewMode, setViewMode] = (0, import_react.useState)("form");
	if (viewMode === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "space-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectangleEllipsis, { size: 16 }),
				onClick: () => setViewMode("form"),
				children: "Form View"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
			label: "Inbound Configuration (JSON)",
			value: formState.inboundConfig,
			onChange: (v) => updateField("inboundConfig", v)
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }),
				title: "Inbound Configuration",
				color: "blue",
				children: "Configure how external systems send data to this AE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "space-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { size: 16 }),
					onClick: () => setViewMode("json"),
					children: "JSON View"
				})
			}),
			inboundFieldGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [group.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: group.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: field.col || 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
					field,
					value: field.name === "inboundConfig" ? formState.inboundConfig : "",
					updateField
				})
			}, field.name)) })] }, groupIndex))
		]
	});
}
//#endregion
//#region src/features/communication/components/ae/outbound-tab.tsx
function OutboundTab({ formState, updateField }) {
	const [viewMode, setViewMode] = (0, import_react.useState)("form");
	if (viewMode === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "space-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectangleEllipsis, { size: 16 }),
				onClick: () => setViewMode("form"),
				children: "Form View"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
			label: "Outbound Configuration (JSON)",
			value: formState.outboundConfig,
			onChange: (v) => updateField("outboundConfig", v)
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }),
				title: "Outbound Configuration",
				color: "blue",
				children: "Configure how this AE sends data to external systems"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "space-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { size: 16 }),
					onClick: () => setViewMode("json"),
					children: "JSON View"
				})
			}),
			outboundFieldGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [group.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: group.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: field.col || 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
					field,
					value: field.name === "outboundConfig" ? formState.outboundConfig : "",
					updateField
				})
			}, field.name)) })] }, groupIndex))
		]
	});
}
//#endregion
//#region src/features/communication/components/ae/security-tab.tsx
function SecurityTab({ formState, updateField }) {
	const [viewMode, setViewMode] = (0, import_react.useState)("form");
	if (viewMode === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "space-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectangleEllipsis, { size: 16 }),
				onClick: () => setViewMode("form"),
				children: "Form View"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditorField, {
			label: "Security Settings (JSON)",
			value: formState.securitySettings,
			onChange: (v) => updateField("securitySettings", v)
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }),
				title: "Security Settings",
				color: "yellow",
				children: "Configure TLS and authentication settings for secure communication"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				justify: "space-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { size: 16 }),
					onClick: () => setViewMode("json"),
					children: "JSON View"
				})
			}),
			securityFieldGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
				span: field.col || 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
					field,
					value: field.name.startsWith("securitySettings.") ? formState.securitySettings[field.name.split(".")[1]] : "",
					updateField: (name, value) => {
						if (name.startsWith("securitySettings.")) {
							const key = name.split(".")[1];
							updateField("securitySettings", {
								...formState.securitySettings,
								[key]: value
							});
						} else updateField(name, value);
					}
				})
			}, field.name)) }, groupIndex))
		]
	});
}
var defaultFormState = {
	name: "",
	description: "",
	facilityCode: "",
	facilityId: "",
	facilityName: "",
	customId: "",
	organizationId: "",
	status: "ACTIVE",
	inboundCapabilities: [],
	outboundCapabilities: [],
	inboundConfig: [],
	outboundConfig: [],
	securitySettings: {
		tlsEnabled: true,
		tlsVersion: "TLSv1.3",
		acceptSelfSigned: false
	}
};
//#endregion
//#region src/features/communication/components/ae/index.tsx
var { Provider: FormProvider, useForm } = createFormContext(defaultFormState);
function ApplicationEntitiesPage() {
	const [formState, setFormState] = (0, import_react.useState)(defaultFormState);
	const updateField = (name, value) => {
		setFormState((prev) => ({
			...prev,
			[name]: value
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, {
		config: {
			id: "ae",
			title: "Application Entity",
			description: "Registered codes by coding module.",
			endpoint: "v1/aes",
			columns,
			modalTitle: "Application Entity",
			tabGroups: [
				{
					value: "general",
					title: "General",
					render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeneralTab, {
						formState,
						updateField
					})
				},
				{
					value: "inbound",
					title: "Inbound Config",
					render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboundTab, {
						formState,
						updateField
					}),
					fields: []
				},
				{
					value: "outbound",
					title: "Outbound Config",
					render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutboundTab, {
						formState,
						updateField
					})
				},
				{
					value: "security",
					title: "Security",
					render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityTab, {
						formState,
						updateField
					})
				},
				{
					value: "attributes",
					title: "Attributes",
					fields: [{
						label: "Custom Attributes",
						name: "attributes",
						type: "json"
					}],
					render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributesTab, {
						formState,
						updateField
					})
				}
			],
			defaultState: defaultFormState,
			buildCreatePayload: (values) => ({ code: {
				module: values.module,
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
		},
		embedded: true,
		formState,
		setFormState,
		updateField
	});
}
//#endregion
//#region src/routes/_authenticated/communication/aes/route.tsx?tsr-split=component
var SplitComponent = ApplicationEntitiesPage;
//#endregion
export { SplitComponent as component };
