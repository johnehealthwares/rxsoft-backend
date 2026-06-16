import { A as resolveClassNames, k as resolveStyles, m as useMantineTheme } from "./Box-7OfPvxF3.js";
//#region node_modules/@mantine/core/esm/core/styles-api/use-resolved-styles-api/use-resolved-styles-api.mjs
function useResolvedStylesApi({ classNames, styles, props, stylesCtx }) {
	const theme = useMantineTheme();
	return {
		resolvedClassNames: classNames === void 0 ? void 0 : resolveClassNames({
			theme,
			classNames,
			props,
			stylesCtx: stylesCtx || void 0
		}),
		resolvedStyles: styles === void 0 ? void 0 : resolveStyles({
			theme,
			styles,
			props,
			stylesCtx: stylesCtx || void 0
		})
	};
}
//#endregion
export { useResolvedStylesApi as t };
