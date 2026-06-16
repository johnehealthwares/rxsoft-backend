import { E as getThemeColor, M as createVarsResolver, R as getSpacing, V as rem, d as useStyles, f as useProps, r as factory, t as Box } from "./Box-7OfPvxF3.js";
import { t as createSafeContext } from "./create-safe-context-CMmbykRb.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/components/Table/Table.context.mjs
var [TableProvider, useTableContext] = createSafeContext("Table component was not found in the tree");
//#endregion
//#region node_modules/@mantine/core/esm/components/Table/Table.module.mjs
var Table_module_default = {
	"table": "m_b23fa0ef",
	"th": "m_4e7aa4f3",
	"tr": "m_4e7aa4fd",
	"td": "m_4e7aa4ef",
	"tbody": "m_b2404537",
	"thead": "m_b242d975",
	"caption": "m_9e5a3ac7",
	"scrollContainer": "m_a100c15",
	"scrollContainerInner": "m_62259741"
};
//#endregion
//#region node_modules/@mantine/core/esm/components/Table/Table.components.mjs
var import_jsx_runtime = require_jsx_runtime();
function getDataAttributes(ctx, options) {
	if (!options) return;
	const data = {};
	if (options.columnBorder && ctx.withColumnBorders) data["data-with-column-border"] = true;
	if (options.rowBorder && ctx.withRowBorders) data["data-with-row-border"] = true;
	if (options.striped && ctx.striped) data["data-striped"] = ctx.striped;
	if (options.highlightOnHover && ctx.highlightOnHover) data["data-hover"] = true;
	if (options.captionSide && ctx.captionSide) data["data-side"] = ctx.captionSide;
	if (options.stickyHeader && ctx.stickyHeader) data["data-sticky"] = true;
	return data;
}
function tableElement(element, options) {
	const name = `Table${element.charAt(0).toUpperCase()}${element.slice(1)}`;
	const Component = factory((_props) => {
		const props = useProps(name, {}, _props);
		const { classNames, className, style, styles, ...others } = props;
		const ctx = useTableContext();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			component: element,
			...getDataAttributes(ctx, options),
			...ctx.getStyles(element, {
				className,
				classNames,
				style,
				styles,
				props
			}),
			...others
		});
	});
	Component.displayName = `@mantine/core/${name}`;
	Component.classes = Table_module_default;
	return Component;
}
var TableTh = tableElement("th", { columnBorder: true });
var TableTd = tableElement("td", { columnBorder: true });
var TableTr = tableElement("tr", {
	rowBorder: true,
	striped: true,
	highlightOnHover: true
});
var TableThead = tableElement("thead", { stickyHeader: true });
var TableTbody = tableElement("tbody");
var TableTfoot = tableElement("tfoot");
var TableCaption = tableElement("caption", { captionSide: true });
//#endregion
//#region node_modules/@mantine/core/esm/components/Table/TableScrollContainer.mjs
var defaultProps$1 = { type: "scrollarea" };
var varsResolver$1 = createVarsResolver((_, { minWidth, maxHeight, type }) => ({ scrollContainer: {
	"--table-min-width": rem(minWidth),
	"--table-max-height": rem(maxHeight),
	"--table-overflow": type === "native" ? "auto" : void 0
} }));
var TableScrollContainer = factory((_props) => {
	const props = useProps("TableScrollContainer", defaultProps$1, _props);
	const { classNames, className, style, styles, unstyled, vars, children, minWidth, maxHeight, type, scrollAreaProps, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "TableScrollContainer",
		classes: Table_module_default,
		props,
		className,
		style,
		classNames,
		styles,
		unstyled,
		attributes,
		vars,
		varsResolver: varsResolver$1,
		rootSelector: "scrollContainer"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		component: type === "scrollarea" ? ScrollArea : "div",
		...type === "scrollarea" ? maxHeight ? {
			offsetScrollbars: "xy",
			...scrollAreaProps
		} : {
			offsetScrollbars: "x",
			...scrollAreaProps
		} : {},
		...getStyles("scrollContainer"),
		...others,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...getStyles("scrollContainerInner"),
			children
		})
	});
});
TableScrollContainer.classes = Table_module_default;
TableScrollContainer.varsResolver = varsResolver$1;
TableScrollContainer.displayName = "@mantine/core/TableScrollContainer";
//#endregion
//#region node_modules/@mantine/core/esm/components/Table/TableDataRenderer.mjs
function TableDataRenderer({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		data.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCaption, { children: data.caption }),
		data.head && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableThead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTr, { children: data.head.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTh, { children: item }, index)) }) }),
		data.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTbody, { children: data.body.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTr, { children: row.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTd, { children: item }, index)) }, rowIndex)) }),
		data.foot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTfoot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTr, { children: data.foot.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableTh, { children: item }, index)) }) })
	] });
}
TableDataRenderer.displayName = "@mantine/core/TableDataRenderer";
//#endregion
//#region node_modules/@mantine/core/esm/components/Table/Table.mjs
var defaultProps = {
	withRowBorders: true,
	verticalSpacing: 7
};
var varsResolver = createVarsResolver((theme, { layout, captionSide, horizontalSpacing, verticalSpacing, borderColor, stripedColor, highlightOnHoverColor, striped, highlightOnHover, stickyHeaderOffset, stickyHeader }) => ({ table: {
	"--table-layout": layout,
	"--table-caption-side": captionSide,
	"--table-horizontal-spacing": getSpacing(horizontalSpacing),
	"--table-vertical-spacing": getSpacing(verticalSpacing),
	"--table-border-color": borderColor ? getThemeColor(borderColor, theme) : void 0,
	"--table-striped-color": striped && stripedColor ? getThemeColor(stripedColor, theme) : void 0,
	"--table-highlight-on-hover-color": highlightOnHover && highlightOnHoverColor ? getThemeColor(highlightOnHoverColor, theme) : void 0,
	"--table-sticky-header-offset": stickyHeader ? rem(stickyHeaderOffset) : void 0
} }));
var Table = factory((_props) => {
	const props = useProps("Table", defaultProps, _props);
	const { classNames, className, style, styles, unstyled, vars, horizontalSpacing, verticalSpacing, captionSide, stripedColor, highlightOnHoverColor, striped, highlightOnHover, withColumnBorders, withRowBorders, withTableBorder, borderColor, layout, data, children, stickyHeader, stickyHeaderOffset, mod, tabularNums, attributes, ...others } = props;
	const getStyles = useStyles({
		name: "Table",
		props,
		className,
		style,
		classes: Table_module_default,
		classNames,
		styles,
		unstyled,
		attributes,
		rootSelector: "table",
		vars,
		varsResolver
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableProvider, {
		value: {
			getStyles,
			stickyHeader,
			striped: striped === true ? "odd" : striped || void 0,
			highlightOnHover,
			withColumnBorders,
			withRowBorders,
			captionSide: captionSide || "bottom"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			component: "table",
			mod: [{
				"data-with-table-border": withTableBorder,
				"data-tabular-nums": tabularNums
			}, mod],
			...getStyles("table"),
			...others,
			children: children || !!data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableDataRenderer, { data })
		})
	});
});
Table.classes = Table_module_default;
Table.varsResolver = varsResolver;
Table.displayName = "@mantine/core/Table";
Table.Td = TableTd;
Table.Th = TableTh;
Table.Tr = TableTr;
Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tfoot = TableTfoot;
Table.Caption = TableCaption;
Table.ScrollContainer = TableScrollContainer;
Table.DataRenderer = TableDataRenderer;
//#endregion
export { Table as t };
