import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { M as createVarsResolver, R as getSpacing, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Group/filter-falsy-children/filter-falsy-children.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function filterFalsyChildren(children) {
	return import_react.Children.toArray(children).filter(Boolean);
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Group/Group.module.mjs
var Group_module_default = { "root": "m_4081bf90" };
//#endregion
//#region node_modules/@mantine/core/esm/components/Group/Group.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultProps = {
	preventGrowOverflow: true,
	gap: "md",
	align: "center",
	justify: "flex-start",
	wrap: "wrap"
};
var varsResolver = createVarsResolver((_, { grow, preventGrowOverflow, gap, align, justify, wrap }, { childWidth }) => ({ root: {
	"--group-child-width": grow && preventGrowOverflow ? childWidth : void 0,
	"--group-gap": getSpacing(gap),
	"--group-align": align,
	"--group-justify": justify,
	"--group-wrap": wrap
} }));
var Group = factory((_props) => {
	const props = useProps("Group", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, children, gap, align, justify, wrap, grow, preventGrowOverflow, vars, variant, __size, mod, attributes, ...others } = props;
	const filteredChildren = filterFalsyChildren(children);
	const childrenCount = filteredChildren.length;
	const resolvedGap = getSpacing(gap ?? "md");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		...useStyles({
			name: "Group",
			props,
			stylesCtx: { childWidth: `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))` },
			className,
			style,
			classes: Group_module_default,
			classNames,
			styles,
			unstyled,
			attributes,
			vars,
			varsResolver
		})("root"),
		variant,
		mod: [{ grow }, mod],
		size: __size,
		...others,
		children: filteredChildren
	});
});
Group.classes = Group_module_default;
Group.varsResolver = varsResolver;
Group.displayName = "@mantine/core/Group";
//#endregion
export { Group as t };
