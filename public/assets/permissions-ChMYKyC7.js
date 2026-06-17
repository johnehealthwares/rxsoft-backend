import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { t as ArrowLeft } from "./arrow-left-BfcK4CG9.js";
import { Ar as useAuthStore, Ir as useParams, Lr as Title, Mn as Save, Pr as useNavigate, jr as rxsoftApi } from "./index-DwQ-NyPQ.js";
//#region src/features/rxsoft/pages/roles/permissions.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function permCode(modId, _feature, action) {
	return `${modId}:${_feature.resource}.${action.name}`;
}
function RolePermissionsPage() {
	const { id } = useParams({});
	const navigate = useNavigate();
	const accessToken = useAuthStore((state) => state.accessToken);
	const [modules, setModules] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!accessToken) return;
		const fetch = async () => {
			try {
				const [permRes, roleRes] = await Promise.all([rxsoftApi.get("/permissions/modules"), rxsoftApi.get(`/roles/${id}`)]);
				setModules(permRes.data);
				setSelected(new Set(roleRes.data.permissionCodes ?? []));
			} catch {
				notifications.show({
					color: "red",
					message: "Failed to load permissions"
				});
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, [accessToken, id]);
	const togglePermission = (code) => {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(code)) next.delete(code);
			else next.add(code);
			return next;
		});
	};
	const toggleFeature = (modId, feature, checked) => {
		setSelected((prev) => {
			const next = new Set(prev);
			for (const action of feature.actions) {
				const code = permCode(modId, feature, action);
				if (checked) next.add(code);
				else next.delete(code);
			}
			return next;
		});
	};
	const toggleModule = (mod, checked) => {
		setSelected((prev) => {
			const next = new Set(prev);
			for (const feature of mod.features) for (const action of feature.actions) {
				const code = permCode(mod.id, feature, action);
				if (checked) next.add(code);
				else next.delete(code);
			}
			return next;
		});
	};
	const isFeatureFullyChecked = (modId, feature) => feature.actions.every((a) => selected.has(permCode(modId, feature, a)));
	const isFeaturePartiallyChecked = (modId, feature) => feature.actions.some((a) => selected.has(permCode(modId, feature, a))) && !isFeatureFullyChecked(modId, feature);
	const isModuleFullyChecked = (mod) => mod.features.every((f) => isFeatureFullyChecked(mod.id, f));
	const isModulePartiallyChecked = (mod) => mod.features.some((f) => isFeaturePartiallyChecked(mod.id, f) || isFeatureFullyChecked(mod.id, f)) && !isModuleFullyChecked(mod);
	const handleSave = async () => {
		setSaving(true);
		try {
			await rxsoftApi.put(`/roles/${id}`, { permissionCodes: Array.from(selected) });
			notifications.show({
				color: "green",
				message: "Permissions updated"
			});
			navigate({ to: "/roles" });
		} catch {
			notifications.show({
				color: "red",
				message: "Failed to save permissions"
			});
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		p: "xl",
		style: { textAlign: "center" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		p: "md",
		maw: 900,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				mb: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "subtle",
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }),
					onClick: () => navigate({ to: "/roles" }),
					children: "Back to Roles"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 3,
				mb: "xs",
				children: "Role Permissions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: "dimmed",
				mb: "lg",
				children: "Select the modules and features this role can access."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				gap: "md",
				children: modules.map((mod) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					withBorder: true,
					shadow: "sm",
					padding: "md",
					radius: "md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: isModuleFullyChecked(mod),
						indeterminate: isModulePartiallyChecked(mod),
						onChange: (e) => toggleModule(mod, e.currentTarget.checked),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							fw: 600,
							children: mod.name
						}),
						mb: "sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						gap: "sm",
						pl: "lg",
						children: mod.features.map((feature) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
								withBorder: true,
								p: "sm",
								radius: "sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: isFeatureFullyChecked(mod.id, feature),
									indeterminate: isFeaturePartiallyChecked(mod.id, feature),
									onChange: (e) => toggleFeature(mod.id, feature, e.currentTarget.checked),
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 500,
										children: feature.label
									}),
									mb: "xs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
									gap: "lg",
									pl: "lg",
									children: feature.actions.map((action) => {
										const code = permCode(mod.id, feature, action);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: selected.has(code),
											onChange: () => togglePermission(code),
											label: action.label,
											size: "sm"
										}, code);
									})
								})]
							}, feature.resource);
						})
					})]
				}, mod.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				mt: "xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 16 }),
					loading: saving,
					onClick: handleSave,
					children: "Save Permissions"
				})
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/rxsoft/roles/$id/permissions/index.tsx?tsr-split=component
var SplitComponent = RolePermissionsPage;
//#endregion
export { SplitComponent as component };
