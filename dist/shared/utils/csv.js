"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCsv = toCsv;
function toCsv(rows) {
    if (!rows.length) {
        return '';
    }
    const headers = Object.keys(rows[0] ?? {});
    const headerLine = headers.join(',');
    const body = rows
        .map((row) => headers
        .map((header) => {
        const raw = row[header];
        const value = raw instanceof Date ? raw.toISOString() : String(raw ?? '');
        return `"${value.replaceAll('"', '""')}"`;
    })
        .join(','))
        .join('\n');
    return `${headerLine}\n${body}`;
}
//# sourceMappingURL=csv.js.map