import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { Qt as DataTable, Yt as Pagination } from "./index-BRcLwOKn.js";
//#region src/features/components/table/paginated-data-table.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PaginatedDataTable({ columns, rows, isLoading = false, isError = false, searchValue, onSearchChange, actionCellProps, applyColumnFilter, appliedFilters }) {
	const [pageIndex, setPageIndex] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(10);
	const [totalItems, setTotalItems] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setPageIndex(1);
	}, [searchValue ?? "", pageSize]);
	(0, import_react.useMemo)(() => {
		const start = (pageIndex - 1) * pageSize;
		return rows.slice(start, start + pageSize);
	}, [
		pageIndex,
		pageSize,
		rows
	]);
	const totalPages = Math.ceil(rows.length / pageSize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		gap: "md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			columns,
			rows,
			isLoading,
			errorLoading: isError,
			actionCellProps,
			appliedFilters,
			applyColumnFilter
		}), pageIndex && pageSize && totalPages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			pageIndex,
			pageSize,
			totalItems: totalPages,
			onPageChange: setPageIndex,
			onPageSizeChange: setPageSize
		})]
	});
}
//#endregion
export { PaginatedDataTable as t };
