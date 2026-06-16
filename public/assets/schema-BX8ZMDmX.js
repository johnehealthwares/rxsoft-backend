//#region src/features/rxsoft/pages/website-health-concerns/schema.ts
var columns = [
	{
		key: "name",
		label: "Name"
	},
	{
		key: "slug",
		label: "Slug"
	},
	{
		key: "displayOrder",
		label: "Order"
	},
	{
		key: "isActive",
		label: "Active"
	},
	{
		key: "description",
		label: "Description"
	}
];
var createFields = [
	{
		name: "name",
		label: "Name",
		required: true,
		col: 6
	},
	{
		name: "slug",
		label: "Slug",
		required: true,
		col: 6,
		placeholder: "e.g. malaria"
	},
	{
		name: "description",
		label: "Description",
		col: 12
	},
	{
		name: "content",
		label: "Content (HTML)",
		type: "textarea",
		col: 12
	},
	{
		name: "iconName",
		label: "Icon Name",
		col: 6
	},
	{
		name: "displayOrder",
		label: "Display Order",
		type: "number",
		col: 3
	},
	{
		name: "isActive",
		label: "Active",
		type: "switch",
		col: 3
	},
	{
		name: "imageUrl",
		label: "Image URL",
		col: 12
	},
	{
		name: "metaTitle",
		label: "Meta Title",
		col: 6
	},
	{
		name: "metaDescription",
		label: "Meta Description",
		col: 6
	}
];
function buildCreatePayload(values) {
	return {
		name: values.name,
		slug: values.slug,
		description: values.description || void 0,
		content: values.content || void 0,
		iconName: values.iconName || void 0,
		displayOrder: values.displayOrder ? Number(values.displayOrder) : 0,
		isActive: values.isActive ?? true,
		imageUrl: values.imageUrl || void 0,
		metaTitle: values.metaTitle || void 0,
		metaDescription: values.metaDescription || void 0
	};
}
var healthConcernsConfig = {
	id: "website-health-concerns",
	title: "Health Concerns",
	description: "Manage health concerns for the Damorex website.",
	endpoint: "/website/admin/health-concerns",
	columns,
	createFields,
	buildCreatePayload,
	canDelete: true
};
//#endregion
export { healthConcernsConfig };
