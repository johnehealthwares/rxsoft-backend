import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Radio } from "./Radio-DHNE50PM.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as Switch } from "./Switch-BPgr54EU.js";
import { t as Link } from "./link-D-damaRz.js";
import { Lr as Title, O as u, _r as object, gn as useForm, hn as Controller, hr as boolean, pr as _enum } from "./index-DuM1cidb.js";
import { t as showSubmittedData } from "./show-submitted-data-D4i2jyT0.js";
import { t as ContentSection } from "./content-section-DqNsP2LH.js";
//#region src/features/settings/notifications/notifications-form.tsx
var import_jsx_runtime = require_jsx_runtime();
var notificationsFormSchema = object({
	type: _enum([
		"all",
		"mentions",
		"none"
	], { error: (iss) => iss.input === void 0 ? "Please select a notification type." : void 0 }),
	mobile: boolean().default(false).optional(),
	communication_emails: boolean().default(false).optional(),
	social_emails: boolean().default(false).optional(),
	marketing_emails: boolean().default(false).optional(),
	security_emails: boolean()
});
var defaultValues = {
	communication_emails: false,
	marketing_emails: false,
	social_emails: true,
	security_emails: true
};
function NotificationsForm() {
	const { control, handleSubmit, register, formState: { errors } } = useForm({
		resolver: u(notificationsFormSchema),
		defaultValues
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: "form",
		onSubmit: handleSubmit((data) => showSubmittedData(data)),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 500,
						mb: "sm",
						children: "Notify me about..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
						control,
						name: "type",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Group, {
							value: field.value,
							onChange: field.onChange,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: "xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
										value: "all",
										label: "All new messages"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
										value: "mentions",
										label: "Direct messages and mentions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
										value: "none",
										label: "Nothing"
									})
								]
							})
						})
					}),
					errors.type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						c: "red",
						size: "sm",
						mt: "xs",
						children: errors.type.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 3,
					mb: "md",
					children: "Email Notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
							control,
							name: "communication_emails",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								withBorder: true,
								p: "md",
								radius: "md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									align: "center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 500,
										children: "Communication emails"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: "dimmed",
										children: "Receive emails about your account activity."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: field.value,
										onChange: (event) => field.onChange(event.currentTarget.checked)
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
							control,
							name: "marketing_emails",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								withBorder: true,
								p: "md",
								radius: "md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									align: "center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 500,
										children: "Marketing emails"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: "dimmed",
										children: "Receive emails about new products, features, and more."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: field.value,
										onChange: (event) => field.onChange(event.currentTarget.checked)
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
							control,
							name: "social_emails",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								withBorder: true,
								p: "md",
								radius: "md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									align: "center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 500,
										children: "Social emails"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: "dimmed",
										children: "Receive emails for friend requests, follows, and more."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: field.value,
										onChange: (event) => field.onChange(event.currentTarget.checked)
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
							control,
							name: "security_emails",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								withBorder: true,
								p: "md",
								radius: "md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
									justify: "space-between",
									align: "center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 500,
										children: "Security emails"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										c: "dimmed",
										children: "Receive emails about your account activity and security."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: field.value,
										disabled: true,
										readOnly: true
									})]
								})
							})
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 500,
						children: "Use different settings for my mobile devices"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "sm",
						c: "dimmed",
						children: [
							"You can manage your mobile notifications in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/settings",
								style: { textDecoration: "underline" },
								children: "mobile settings"
							}),
							" ",
							"page."
						]
					})] }),
					...register("mobile")
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					w: "fit-content",
					children: "Update notifications"
				})
			]
		})
	});
}
//#endregion
//#region src/features/settings/notifications/pages/notifications-page.tsx
function SettingsNotifications() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentSection, {
		title: "Notifications",
		desc: "Configure how you receive notifications.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsForm, {})
	});
}
//#endregion
//#region src/routes/_authenticated/rxsoft/settings/notifications.tsx?tsr-split=component
var SplitComponent = SettingsNotifications;
//#endregion
export { SplitComponent as component };
