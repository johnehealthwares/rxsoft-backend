import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { D as u, dr as array, hn as useForm, hr as string, mn as Controller, mr as object } from "./index-BRcLwOKn.js";
import { t as showSubmittedData } from "./show-submitted-data-D4i2jyT0.js";
import { t as ContentSection } from "./content-section-DAqCx3PH.js";
//#region src/features/settings/display/display-form.tsx
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		id: "recents",
		label: "Recents"
	},
	{
		id: "home",
		label: "Home"
	},
	{
		id: "applications",
		label: "Applications"
	},
	{
		id: "desktop",
		label: "Desktop"
	},
	{
		id: "downloads",
		label: "Downloads"
	},
	{
		id: "documents",
		label: "Documents"
	}
];
var displayFormSchema = object({ items: array(string()).refine((value) => value.some((item) => item), { message: "You have to select at least one item." }) });
var defaultValues = { items: ["recents", "home"] };
function DisplayForm() {
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: u(displayFormSchema),
		defaultValues
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "form",
		onSubmit: handleSubmit((data) => showSubmittedData(data)),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					fw: 500,
					size: "md",
					children: "Sidebar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					mb: "md",
					children: "Select the items you want to display in the sidebar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
					control,
					name: "items",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						gap: "sm",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: item.label,
							checked: field.value?.includes(item.id),
							onChange: (event) => {
								if (event.currentTarget.checked) field.onChange([...field.value || [], item.id]);
								else field.onChange(field.value?.filter((value) => value !== item.id));
							}
						}, item.id))
					})
				}),
				errors.items && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: "red",
					size: "sm",
					mt: "sm",
					children: errors.items.message
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: "Update display"
			}) })]
		})
	});
}
//#endregion
//#region src/features/settings/display/pages/display-page.tsx
function SettingsDisplay() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentSection, {
		title: "Display",
		desc: "Turn items on or off to control what's displayed in the app.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayForm, {})
	});
}
//#endregion
//#region src/routes/_authenticated/rxsoft/settings/display.tsx?tsr-split=component
var SplitComponent = SettingsDisplay;
//#endregion
export { SplitComponent as component };
