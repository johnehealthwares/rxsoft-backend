import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { M as createVarsResolver, R as getSpacing, d as useStyles, f as useProps, n as polymorphicFactory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
//#region node_modules/@mantine/core/esm/components/Card/Card.context.mjs
var [CardProvider, useCardContext] = createSafeContext("Card component was not found in tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Card/Card.module.mjs
var Card_module_default = {
	"root": "m_e615b15f",
	"section": "m_599a2148"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Card/CardSection/CardSection.mjs
var import_jsx_runtime = require_jsx_runtime();
var CardSection = polymorphicFactory((_props) => {
	const { classNames, className, style, styles, vars, withBorder, inheritPadding, mod, ...others } = useProps("CardSection", null, _props);
	const ctx = useCardContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		mod: [{
			"with-border": withBorder,
			"inherit-padding": inheritPadding
		}, mod],
		...ctx.getStyles("section", {
			className,
			style,
			styles,
			classNames
		}),
		...others
	});
});
CardSection.classes = Card_module_default;
CardSection.displayName = "@mantine/core/CardSection";
//#endregion
//#region node_modules/@mantine/core/esm/components/Card/Card.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var varsResolver = createVarsResolver((_, { padding }) => ({ root: { "--card-padding": getSpacing(padding) } }));
var defaultProps = { orientation: "vertical" };
var Card = polymorphicFactory((_props) => {
	const props = useProps("Card", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, children, padding, attributes, orientation, ...others } = props;
	const getStyles = useStyles({
		name: "Card",
		props,
		classes: Card_module_default,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver
	});
	const _children = import_react.Children.toArray(children);
	const content = _children.map((child, index) => {
		if (typeof child === "object" && child && "type" in child && (child.type === CardSection || child.type?.displayName === "@mantine/core/CardSection")) return (0, import_react.cloneElement)(child, {
			"data-orientation": orientation,
			"data-first-section": index === 0 || void 0,
			"data-last-section": index === _children.length - 1 || void 0
		});
		return child;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardProvider, {
		value: { getStyles },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			unstyled,
			"data-orientation": orientation,
			...getStyles("root"),
			...others,
			children: content
		})
	});
});
Card.classes = Card_module_default;
Card.varsResolver = varsResolver;
Card.displayName = "@mantine/core/Card";
Card.Section = CardSection;
//#endregion
export { Card as t };
