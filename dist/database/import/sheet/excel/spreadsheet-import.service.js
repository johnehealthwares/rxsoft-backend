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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadsheetImportService = void 0;
const XLSX = __importStar(require("xlsx"));
const common_1 = require("@nestjs/common");
const entity_import_service_1 = require("../../entity-import.service");
const excel_status_writer_1 = require("./excel-status-writer");
const types_1 = require("../../types");
const schema_evolver_service_1 = require("../../../../integration/schema-evolver-service");
let SpreadsheetImportService = class SpreadsheetImportService {
    entityImporter;
    schemaEvolver;
    constructor(entityImporter, schemaEvolver) {
        this.entityImporter = entityImporter;
        this.schemaEvolver = schemaEvolver;
    }
    async import(filePath) {
        const workbook = XLSX.readFile(filePath);
        const context = new types_1.ImportContext();
        for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, {
                defval: null,
            });
            await this.schemaEvolver.ensureColumns(sheetName, rows, [
                'sync_status',
                'sync_message',
                'sync_time',
            ]);
            await this.entityImporter.importSheet(sheetName, rows, context);
            const writer = new excel_status_writer_1.ExcelStatusWriter(filePath, sheetName);
            await writer.updateRows(context.results.filter(r => r.sheet === sheetName));
        }
    }
};
exports.SpreadsheetImportService = SpreadsheetImportService;
exports.SpreadsheetImportService = SpreadsheetImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [entity_import_service_1.EntityImportService,
        schema_evolver_service_1.SchemaEvolverService])
], SpreadsheetImportService);
//# sourceMappingURL=spreadsheet-import.service.js.map