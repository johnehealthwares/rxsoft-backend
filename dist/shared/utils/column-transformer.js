"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateOrNullTransformer = exports.ColumnNumericTransformer = void 0;
class ColumnNumericTransformer {
    to(data) {
        return data;
    }
    from(data) {
        if (data === null)
            return null;
        return parseFloat(data);
    }
}
exports.ColumnNumericTransformer = ColumnNumericTransformer;
exports.DateOrNullTransformer = {
    to(value) {
        return value instanceof Date ? value.toISOString() : null;
    },
    from(value) {
        return value ? new Date(value) : null;
    },
};
//# sourceMappingURL=column-transformer.js.map