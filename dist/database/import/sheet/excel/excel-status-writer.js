"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelStatusWriter = void 0;
const XLSX = __importStar(require("xlsx"));
class ExcelStatusWriter {
    filePath;
    sheetName;
    constructor(filePath, sheetName) {
        this.filePath = filePath;
        this.sheetName = sheetName;
    }
    async updateRows(results) {
        if (!results || !results.length)
            return;
        const workbook = XLSX.readFile(this.filePath);
        const sheet = workbook.Sheets[this.sheetName];
        if (!sheet) {
            throw new Error(`Sheet not found: ${this.sheetName}`);
        }
        const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: null,
        });
        const headers = (rows[0] || []);
        const colIndexOf = (name) => {
            const idx = headers.findIndex((h) => String(h).trim() === name);
            return idx >= 0 ? idx : -1;
        };
        const uuidCol = colIndexOf('uuid');
        const statusCol = colIndexOf('sync_status');
        const messageCol = colIndexOf('sync_message');
        const timeCol = colIndexOf('sync_time');
        const ensureCell = (r, c, value) => {
            const addr = XLSX.utils.encode_cell({ r, c });
            sheet[addr] = { v: value, t: 's' };
        };
        for (const res of results) {
            const excelRow = (res.rowNumber ?? 0) - 1;
            if (uuidCol >= 0 && res.uuid) {
                ensureCell(excelRow, uuidCol, res.uuid);
            }
            if (statusCol >= 0) {
                ensureCell(excelRow, statusCol, res.status);
            }
            if (messageCol >= 0) {
                ensureCell(excelRow, messageCol, res.message ?? '');
            }
            if (timeCol >= 0) {
                ensureCell(excelRow, timeCol, new Date().toISOString());
            }
        }
        XLSX.writeFile(workbook, this.filePath);
    }
}
exports.ExcelStatusWriter = ExcelStatusWriter;
//# sourceMappingURL=excel-status-writer.js.map