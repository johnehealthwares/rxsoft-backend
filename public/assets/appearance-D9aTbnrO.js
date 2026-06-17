import { t as useMantineColorScheme } from "./use-mantine-color-scheme-C21-elMS.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Radio } from "./Radio-DHNE50PM.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { O as u, _r as object, gn as useForm, hn as Controller, kr as fonts, pr as _enum } from "./index-DwQ-NyPQ.js";
import { t as showSubmittedData } from "./show-submitted-data-D4i2jyT0.js";
import { t as ContentSection } from "./content-section-BVGMm4Iy.js";
//#region src/features/settings/appearance/appearance-form.tsx
var import_jsx_runtime = require_jsx_runtime();
var appearanceFormSchema = object({
	theme: _enum(["light", "dark"]),
	font: _enum(fonts)
});
function AppearanceForm() {
	const { colorScheme, setColorScheme, toggleColorScheme } = useMantineColorScheme();
	const form = useForm({
		resolver: u(appearanceFormSchema),
		defaultValues: {
			theme: colorScheme,
			font: fonts[0]
		}
	});
	function onSubmit(data) {
		if (data.theme !== colorScheme) setColorScheme(data.theme);
		showSubmittedData(data);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		onSubmit: form.handleSubmit(onSubmit),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
					name: "font",
					control: form.control,
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Font",
						data: fonts.map((f) => ({
							value: f,
							label: f
						})),
						value: field.value,
						onChange: (value) => field.onChange(value),
						description: "Set the font you want to use in the dashboard.",
						searchable: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
					name: "theme",
					control: form.control,
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 500,
							children: "Theme"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							c: "dimmed",
							children: "Select the theme for the dashboard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Group, {
							value: field.value,
							onChange: field.onChange,
							mt: "md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
								align: "flex-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									withBorder: true,
									p: "xs",
									radius: "md",
									style: {
										cursor: "pointer",
										border: field.value === "light" ? "2px solid var(--mantine-color-blue-6)" : void 0
									},
									onClick: () => field.onChange("light"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										align: "center",
										gap: 6,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
											value: "light",
											label: "Light"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { width: 120 },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													background: "#ecedef",
													padding: 8
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
													background: "#fff",
													padding: 6,
													marginBottom: 6
												} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
													background: "#fff",
													padding: 6
												} })]
											})
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									withBorder: true,
									p: "xs",
									radius: "md",
									style: {
										cursor: "pointer",
										border: field.value === "dark" ? "2px solid var(--mantine-color-blue-6)" : void 0
									},
									onClick: () => field.onChange("dark"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										align: "center",
										gap: 6,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
											value: "dark",
											label: "Dark"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { width: 120 },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													background: "#020617",
													padding: 8
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
													background: "#1e293b",
													padding: 6,
													marginBottom: 6
												} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
													background: "#1e293b",
													padding: 6
												} })]
											})
										})]
									})
								})]
							})
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Update preferences"
				})
			]
		})
	});
}
//#endregion
//#region src/features/settings/appearance/pages/appearance-page.tsx
function SettingsAppearance() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentSection, {
		title: "Appearance",
		desc: "Customize the appearance of the app. Automatically switch between day\n          and night themes.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppearanceForm, {})
	});
}
//#endregion
//#region src/routes/_authenticated/rxsoft/settings/appearance.tsx?tsr-split=component
var SplitComponent = SettingsAppearance;
//#endregion
export { SplitComponent as component };
