import { r as __exportAll } from "./react-DKQS5v0G.js";
import { fn as ColumnTypeFilters } from "./index-DuM1cidb.js";
//#region src/features/rxsoft/pages/uom-category/schema.ts
var schema_exports = /* @__PURE__ */ __exportAll({
	UOM_CATEGORY_CREATE_FIELDS: () => UOM_CATEGORY_CREATE_FIELDS,
	UOM_COLUMNS: () => UOM_COLUMNS,
	buildCreatePayload: () => buildCreatePayload,
	buildFormState: () => buildFormState,
	uomCategoryConfig: () => uomCategoryConfig
});
var UOM_COLUMNS = [
	{
		key: "code",
		label: "Code"
	},
	{
		key: "name",
		label: "Name",
		filters: ColumnTypeFilters.STRING
	},
	{
		key: "parent.name",
		label: "Parent",
		filters: ColumnTypeFilters.STRING
	},
	{
		key: "description",
		label: "Description"
	},
	{
		key: "isActive",
		label: "Active"
	}
];
var UOM_CATEGORY_CREATE_FIELDS = {
	title: "Create Unit of Measure",
	mutationMode: "field",
	fields: [
		{
			name: "code",
			label: "Code",
			type: "text",
			placeholder: "e.g., mg, ml, g"
		},
		{
			name: "name",
			label: "Name",
			type: "text",
			placeholder: "e.g., Milligrams, Milliliters",
			required: true
		},
		{
			name: "parent",
			label: "Parent",
			type: "async-select",
			searchParam: {
				endpoint: "/uom-categories",
				minChars: 2,
				queryParam: "search",
				labelKey: "name",
				valueKey: "id"
			}
		},
		{
			name: "description",
			label: "Description",
			type: "text"
		},
		{
			name: "active",
			label: "Active",
			type: "switch"
		}
	]
};
var buildFormState = (row) => {
	const formState = { ...row };
	for (const key in row) if (key.endsWith("Id")) {
		const fieldName = key.replace("Id", "");
		const relation = row[fieldName];
		if (relation?.id && relation?.name) formState[fieldName] = {
			label: relation.name,
			value: relation.id
		};
	}
	return formState;
};
var uomCategoryConfig = {
	id: "uom-category",
	title: "UOM Categories",
	description: "Manage units of measure categories.",
	endpoint: "/uoms",
	columns: UOM_COLUMNS,
	createFields: UOM_CATEGORY_CREATE_FIELDS.fields,
	buildCreatePayload: (values) => buildCreatePayload(values),
	buildUpdatePayload: (values) => buildCreatePayload(values),
	buildFormState,
	canDelete: true,
	detailPathBuilder: (row) => `/uom-categories/${String(row.id)}`
};
function buildCreatePayload(values) {
	return {
		code: values.code || void 0,
		name: values.name,
		parentId: values.parent?.value || void 0,
		active: values.active,
		description: values.description || void 0
	};
}
//#endregion
export { uomCategoryConfig as n, schema_exports as t };
