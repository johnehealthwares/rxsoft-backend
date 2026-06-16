//#region src/features/rxsoft/pages/website-articles/schema.ts
var columns = [
	{
		key: "title",
		label: "Title"
	},
	{
		key: "slug",
		label: "Slug"
	},
	{
		key: "category",
		label: "Category"
	},
	{
		key: "authorName",
		label: "Author"
	},
	{
		key: "isPublished",
		label: "Published"
	},
	{
		key: "readingTime",
		label: "Reading Time"
	}
];
var createFields = [
	{
		name: "title",
		label: "Title",
		required: true,
		col: 6
	},
	{
		name: "slug",
		label: "Slug",
		required: true,
		col: 6,
		placeholder: "e.g. healthy-living"
	},
	{
		name: "category",
		label: "Category",
		col: 6
	},
	{
		name: "authorName",
		label: "Author Name",
		col: 6
	},
	{
		name: "excerpt",
		label: "Excerpt",
		type: "textarea",
		col: 12
	},
	{
		name: "content",
		label: "Content (HTML)",
		type: "textarea",
		col: 12
	},
	{
		name: "readingTime",
		label: "Reading Time (min)",
		type: "number",
		col: 3
	},
	{
		name: "isPublished",
		label: "Published",
		type: "switch",
		col: 3
	},
	{
		name: "imageUrl",
		label: "Image URL",
		col: 12
	}
];
function buildCreatePayload(values) {
	return {
		title: values.title,
		slug: values.slug,
		category: values.category || void 0,
		authorName: values.authorName || void 0,
		excerpt: values.excerpt || void 0,
		content: values.content || void 0,
		readingTime: values.readingTime ? Number(values.readingTime) : void 0,
		isPublished: values.isPublished ?? false,
		imageUrl: values.imageUrl || void 0
	};
}
var articlesConfig = {
	id: "website-articles",
	title: "Blog Articles",
	description: "Manage blog articles for the Damorex website.",
	endpoint: "/website/admin/articles",
	columns,
	createFields,
	buildCreatePayload,
	canDelete: true
};
//#endregion
export { articlesConfig };
