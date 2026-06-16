var prescriptionsConfig = {
	id: "website-prescriptions",
	title: "Prescriptions",
	description: "View prescription submissions from the Damorex website.",
	endpoint: "/website/admin/prescriptions",
	columns: [
		{
			key: "name",
			label: "Name"
		},
		{
			key: "phone",
			label: "Phone"
		},
		{
			key: "email",
			label: "Email"
		},
		{
			key: "status",
			label: "Status"
		},
		{
			key: "createdAt",
			label: "Date"
		}
	],
	canDelete: false
};
//#endregion
export { prescriptionsConfig };
