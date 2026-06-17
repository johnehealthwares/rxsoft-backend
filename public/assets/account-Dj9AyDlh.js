import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { O as u, _r as object, gn as useForm, gr as date, mn as DatePickerInput, vr as string } from "./index-DwQ-NyPQ.js";
import { t as showSubmittedData } from "./show-submitted-data-D4i2jyT0.js";
import { t as ContentSection } from "./content-section-BVGMm4Iy.js";
//#region src/features/settings/account/account-form.tsx
var import_jsx_runtime = require_jsx_runtime();
var languages = [
	{
		label: "English",
		value: "en"
	},
	{
		label: "French",
		value: "fr"
	},
	{
		label: "German",
		value: "de"
	},
	{
		label: "Spanish",
		value: "es"
	},
	{
		label: "Portuguese",
		value: "pt"
	},
	{
		label: "Russian",
		value: "ru"
	},
	{
		label: "Japanese",
		value: "ja"
	},
	{
		label: "Korean",
		value: "ko"
	},
	{
		label: "Chinese",
		value: "zh"
	}
];
var accountFormSchema = object({
	name: string().min(1, "Please enter your name.").min(2, "Name must be at least 2 characters.").max(30, "Name must not be longer than 30 characters."),
	dob: date("Please select your date of birth.").nullable(),
	language: string("Please select a language.")
});
var defaultValues = {
	name: "",
	language: ""
};
function AccountForm() {
	const form = useForm({
		resolver: u(accountFormSchema),
		defaultValues
	});
	function onSubmit(data) {
		showSubmittedData(data);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		onSubmit: form.handleSubmit(onSubmit),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					label: "Name",
					placeholder: "Your name",
					...form.register("name"),
					description: "This is the name that will be displayed on your profile and in emails."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePickerInput, {
					label: "Date of birth",
					placeholder: "Pick date",
					value: form.watch("dob"),
					onChange: (value) => form.setValue("dob", value),
					description: "Your date of birth is used to calculate your age."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					label: "Language",
					placeholder: "Select language",
					data: languages.map((l) => ({
						value: l.value,
						label: l.label
					})),
					value: form.watch("language"),
					onChange: (value) => form.setValue("language", value || ""),
					searchable: true,
					description: "This is the language that will be used in the dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Update account"
				})
			]
		})
	});
}
//#endregion
//#region src/features/settings/account/pages/account-page.tsx
function SettingsAccount() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentSection, {
		title: "Account",
		desc: "Update your account settings. Set your preferred language and\n          timezone.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountForm, {})
	});
}
//#endregion
//#region src/routes/_authenticated/rxsoft/settings/account.tsx?tsr-split=component
var SplitComponent = SettingsAccount;
//#endregion
export { SplitComponent as component };
