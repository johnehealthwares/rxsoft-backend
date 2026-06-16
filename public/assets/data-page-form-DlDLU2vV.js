import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { n as useQueryClient } from "./QueryClientProvider-DlcixLz9.js";
import { t as useMutation } from "./useMutation-CaMFWIEn.js";
import { r as useModuleContext } from "./module-context-B1aR60OK.js";
import { o as Loader } from "./select-DJXsgV1Q.js";
import { Jt as RxPage, Xt as TabGroups, Zt as FieldGroup, jr as useNavigate } from "./index-BRcLwOKn.js";
//#region src/features/components/page/data-page-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function DataPageForm({ config }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const moduleContext = useModuleContext();
	const apiProvider = config.apiProvider ?? moduleContext.apiProvider;
	const { title, description, endpoint, createFields, createFieldGroups, tabGroups, buildCreatePayload, defaultState, modalTitle, renderCreateExtras } = config;
	const fieldGroups = createFieldGroups ?? (createFields ? [{ fields: createFields }] : []);
	const [formState, setFormState] = (0, import_react.useState)(defaultState ?? {});
	const updateField = (name, value) => {
		setFormState((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const mutation = useMutation({
		mutationFn: async (values) => {
			const payload = buildCreatePayload ? buildCreatePayload(values) : values;
			return (await apiProvider.post(endpoint, payload)).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rxsoft-data-page", endpoint] });
			notifications.show({ message: `${title} record created` });
			navigate({ to: ".." });
		},
		onError: (error) => {
			notifications.show({
				color: "red",
				message: `Failed to create ${title.toLowerCase()} record - ${error.data?.message ?? error?.data?.error?.message ?? error?.response?.data?.message ?? error?.response?.data?.error?.message ?? error.message}`
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: modalTitle ?? `Create ${title}`,
		description,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					c: "dimmed",
					children: [
						"Add a new record to the ",
						title.toLowerCase(),
						" module."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "xl",
					children: [
						tabGroups && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabGroups, {
							tabGroups,
							formState,
							updateField
						}),
						fieldGroups.map((fieldGroup, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
							index,
							fieldGroup,
							formState,
							updateField
						}, index)),
						renderCreateExtras?.({
							formState,
							updateField
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "flex-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => navigate({ to: ".." }),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => mutation.mutate(formState),
						disabled: mutation.isPending,
						leftSection: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: 16 }) : null,
						children: "Create"
					})]
				})
			]
		})
	});
}
//#endregion
export { DataPageForm as t };
