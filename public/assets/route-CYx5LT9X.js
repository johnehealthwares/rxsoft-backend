import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { i as CircleCheckBig, n as RectangleEllipsis, r as Code, t as createFormContext } from "./form-provider-DgDK7dLT.js";
import { $t as RenderField, Pn as Plus, Yn as CircleAlert, en as JsonEditorField, qt as DataPageShell, xn as Trash } from "./index-BRcLwOKn.js";
import { d as ROUTING_PROTOCOL_TYPE_OPTIONS, l as ROUTE_STATUS_OPTIONS, u as ROUTING_MESSAGE_TYPE_OPTIONS } from "./constants-CPyAcdXH.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Route = createLucideIcon("route", [
	["circle", {
		cx: "6",
		cy: "19",
		r: "3",
		key: "1kj8tv"
	}],
	["path", {
		d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",
		key: "1d8sl"
	}],
	["circle", {
		cx: "18",
		cy: "5",
		r: "3",
		key: "gq8acd"
	}]
]);
//#endregion
//#region src/features/communication/types/enums/message-type.enum.ts
var MessageType = /* @__PURE__ */ function(MessageType) {
	MessageType["ORDER"] = "ORDER";
	MessageType["PATIENT"] = "PATIENT";
	return MessageType;
}({});
//#endregion
//#region src/features/communication/types/enums/route-status.enum.ts
var RouteStatus = /* @__PURE__ */ function(RouteStatus) {
	RouteStatus["ACTIVE"] = "ACTIVE";
	RouteStatus["INACTIVE"] = "INACTIVE";
	RouteStatus["DELETED"] = "DELETED";
	return RouteStatus;
}({});
//#endregion
//#region src/features/communication/types/routing.model.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var defaultRoutingFormState = {
	name: "",
	description: "",
	priority: 1,
	sourceAE: "",
	targetAE: "",
	messageType: MessageType.ORDER,
	conditions: [],
	enabled: true,
	status: RouteStatus.ACTIVE
};
//#endregion
//#region src/features/communication/components/routing/attributes-tab.tsx
var import_jsx_runtime = require_jsx_runtime();
function AttributesTab({ formState, updateField }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
		gap: "md",
		py: "md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
			field: {
				name: "attributes",
				label: "Custom Attributes",
				type: "json"
			},
			value: formState.attributes || {},
			updateField
		})
	});
}
//#endregion
//#region src/features/communication/components/routing/conditions-tab.tsx
var conditionOperators = [
	{
		value: "equals",
		label: "Equals"
	},
	{
		value: "contains",
		label: "Contains"
	},
	{
		value: "startsWith",
		label: "Starts With"
	},
	{
		value: "endsWith",
		label: "Ends With"
	},
	{
		value: "regex",
		label: "Regex"
	},
	{
		value: "in",
		label: "In"
	},
	{
		value: "between",
		label: "Between"
	},
	{
		value: "gt",
		label: "Greater Than"
	},
	{
		value: "lt",
		label: "Less Than"
	},
	{
		value: "gte",
		label: "Greater Than or Equal"
	},
	{
		value: "lte",
		label: "Less Than or Equal"
	}
];
function ConditionsTab({ formState, updateField }) {
	const conditions = formState.conditions || [];
	const addCondition = () => {
		const newCondition = {
			field: "",
			operator: "equals",
			value: ""
		};
		updateField("conditions", [...conditions, newCondition]);
	};
	const updateCondition = (index, field, value) => {
		const updated = [...conditions];
		updated[index] = {
			...updated[index],
			[field]: value
		};
		updateField("conditions", updated);
	};
	const removeCondition = (index) => {
		updateField("conditions", conditions.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		py: "md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				justify: "space-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					fw: 500,
					children: "Routing Conditions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }),
					onClick: addCondition,
					size: "sm",
					children: "Add Condition"
				})]
			}),
			conditions.map((condition, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				align: "flex-start",
				gap: "md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { flex: 1 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
							field: {
								name: `condition-${index}-field`,
								label: "Field",
								placeholder: "e.g., messageType"
							},
							value: condition.field || "",
							updateField: (_, value) => updateCondition(index, "field", value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { flex: 1 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
							field: {
								name: `condition-${index}-operator`,
								label: "Operator",
								type: "select",
								options: conditionOperators
							},
							value: condition.operator || "equals",
							updateField: (_, value) => updateCondition(index, "operator", value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { flex: 1 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
							field: {
								name: `condition-${index}-value`,
								label: "Value",
								placeholder: "condition value"
							},
							value: condition.value || "",
							updateField: (_, value) => updateCondition(index, "value", value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
						color: "red",
						variant: "light",
						onClick: () => removeCondition(index),
						mt: "xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { size: 16 })
					})
				]
			}, index)),
			conditions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "sm",
				c: "dimmed",
				ta: "center",
				py: "xl",
				children: "No conditions defined. Messages will match this route if no conditions are set."
			})
		]
	});
}
//#endregion
//#region src/features/communication/components/routing/config.tsx
var getStatusIcon = (status) => {
	switch (status) {
		case RouteStatus.ACTIVE: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 14 });
		case RouteStatus.INACTIVE: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 14 });
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { size: 14 });
	}
};
var getStatusColor = (status) => {
	switch (status) {
		case RouteStatus.ACTIVE: return "green";
		case RouteStatus.INACTIVE: return "gray";
		case RouteStatus.DELETED: return "red";
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
		})
	},
	{
		key: "sourceAE",
		label: "Source AE",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			children: row.sourceAE || "-"
		})
	},
	{
		key: "targetAE",
		label: "Target AE",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			children: row.targetAE || "-"
		})
	},
	{
		key: "messageType",
		label: "Message Type",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			size: "sm",
			variant: "light",
			children: row.messageType
		})
	},
	{
		key: "priority",
		label: "Priority",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			children: row.priority
		})
	},
	{
		key: "status",
		label: "Status",
		render: (row) => {
			const status = row.status;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				color: getStatusColor(status),
				children: [getStatusIcon(status), status]
			});
		}
	},
	{
		key: "enabled",
		label: "Enabled",
		render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			color: row.enabled ? "green" : "red",
			children: row.enabled ? "Yes" : "No"
		})
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
//#region src/features/communication/components/routing/tabs.ts
var generalFieldGroups = [
	{ fields: [{
		name: "name",
		label: "Rule Name",
		required: true,
		placeholder: "e.g., Route Orders to Pharmacy",
		col: 12
	}, {
		name: "description",
		label: "Description",
		placeholder: "Description of the routing rule",
		col: 12
	}] },
	{ fields: [{
		name: "priority",
		label: "Priority",
		type: "number",
		required: true,
		placeholder: "1",
		col: 6
	}, {
		name: "messageType",
		label: "Message Type",
		type: "select",
		options: ROUTING_MESSAGE_TYPE_OPTIONS,
		required: true,
		col: 6
	}] },
	{ fields: [{
		name: "sourceAE",
		label: "Source Application Entity",
		required: true,
		placeholder: "e.g., EMR_APP",
		col: 6
	}, {
		name: "targetAE",
		label: "Target Application Entity",
		required: true,
		placeholder: "e.g., PHARMACY_APP",
		col: 6
	}] },
	{ fields: [{
		name: "protocol",
		label: "Protocol",
		type: "select",
		options: ROUTING_PROTOCOL_TYPE_OPTIONS,
		col: 6
	}, {
		name: "status",
		label: "Status",
		type: "select",
		options: ROUTE_STATUS_OPTIONS,
		required: true,
		col: 6
	}] },
	{ fields: [{
		name: "enabled",
		label: "Enabled",
		type: "checkbox",
		col: 6
	}] }
];
//#endregion
//#region src/features/communication/components/routing/general-tab.tsx
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			justify: "space-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { size: 16 }),
				onClick: () => setViewMode("json"),
				children: "JSON View"
			})
		}), generalFieldGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { marginBottom: "1rem" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderField, {
				field,
				value: formState[field.name] || "",
				updateField
			})
		}, field.name)) }, groupIndex))]
	});
}
//#endregion
//#region src/features/communication/components/routing/index.tsx
var { Provider: FormProvider, useForm } = createFormContext(defaultRoutingFormState);
function RoutingPage() {
	const [formState, setFormState] = (0, import_react.useState)(defaultRoutingFormState);
	const updateField = (name, value) => {
		setFormState((prev) => ({
			...prev,
			[name]: value
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPageShell, {
		config: {
			id: "routing",
			title: "Routing Rules",
			description: "Configure routing rules for message processing.",
			endpoint: "v1/routing/tables/default-routing/routes",
			columns,
			modalTitle: "Routing Rule",
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
					value: "conditions",
					title: "Conditions",
					render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsTab, {
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
			buildCreatePayload: (values) => ({
				name: values.name,
				description: values.description,
				priority: values.priority,
				sourceAE: values.sourceAE,
				targetAE: values.targetAE,
				messageType: values.messageType,
				protocol: values.protocol,
				conditions: values.conditions,
				mappingId: values.mappingId,
				validationIds: values.validationIds,
				validationConfig: values.validationConfig,
				enabled: values.enabled,
				status: values.status,
				attributes: values.attributes
			}),
			buildUpdatePayload: (values) => ({
				name: values.name,
				description: values.description,
				priority: values.priority,
				sourceAE: values.sourceAE,
				targetAE: values.targetAE,
				messageType: values.messageType,
				protocol: values.protocol,
				conditions: values.conditions,
				mappingId: values.mappingId,
				validationIds: values.validationIds,
				validationConfig: values.validationConfig,
				enabled: values.enabled,
				status: values.status,
				attributes: values.attributes
			}),
			canDelete: true
		},
		embedded: true,
		formState,
		setFormState,
		updateField
	}) });
}
//#endregion
//#region src/routes/_authenticated/communication/routing/route.tsx?tsr-split=component
var SplitComponent = RoutingPage;
//#endregion
export { SplitComponent as component };
