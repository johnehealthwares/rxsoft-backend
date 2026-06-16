import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { Gn as Equal, dn as ColumnTypeFilters, fn as FilterType, qt as DataPageShell, un as ColumnDataType } from "./index-BRcLwOKn.js";
//#region src/features/communication/components/mapping/index.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var EQUALS_WITH_OPTIONS = (options) => [{
	name: "Equals",
	icon: Equal,
	type: FilterType.EQUALS,
	options
}];
var config = {
	id: "mappings",
	title: "Mappings",
	description: "Mappings for Cannonical Entities .",
	endpoint: "v1/mappings",
	columns: [
		{
			key: "name",
			label: "Mapping",
			dataType: ColumnDataType.STRING,
			filters: ColumnTypeFilters.STRING
		},
		{
			key: "sourceProtocol",
			label: "Protocol",
			dataType: ColumnDataType.STRING,
			filters: ColumnTypeFilters.STRING
		},
		{
			key: "sourceMessageType",
			label: "Message Type",
			dataType: ColumnDataType.STRING,
			filters: EQUALS_WITH_OPTIONS([{
				value: "ORDER",
				label: "Order"
			}, {
				value: "PATIENT",
				label: "Patient"
			}])
		},
		{
			key: "mappingSteps",
			label: "Steps(Fields)",
			render: (row) => `${row.mappingSteps.length}`,
			dataType: ColumnDataType.STRING,
			filters: ColumnTypeFilters.STRING
		},
		{
			key: "version",
			label: "Version",
			dataType: ColumnDataType.NUMBER,
			filters: ColumnTypeFilters.NUMBER
		},
		{
			key: "active",
			label: "Active",
			dataType: ColumnDataType.BOOLEAN,
			filters: EQUALS_WITH_OPTIONS([{
				value: "true",
				label: "Active"
			}, {
				value: "false",
				label: "Inactive"
			}])
		},
		{
			key: "updatedAt",
			label: "Updated",
			dataType: ColumnDataType.DATE,
			render: (row) => new Date(row.updatedAt).toDateString(),
			filters: ColumnTypeFilters.DATE
		}
	],
	modalTitle: "Application Entity",
	canDelete: true
};
function MappingPage() {
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
}
//#endregion
//#region src/routes/_authenticated/communication/mapping/route.tsx?tsr-split=component
var SplitComponent = MappingPage;
//#endregion
export { SplitComponent as component };
