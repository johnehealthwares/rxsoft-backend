"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetImportService = void 0;
const common_1 = require("@nestjs/common");
const google_sheet_reader_service_1 = require("./google-sheet-reader.service");
const entity_import_service_1 = require("../../entity-import.service");
const google_sheet_status_writer_1 = require("./google-sheet-status-writer");
const types_1 = require("../../types");
const schema_evolver_service_1 = require("../../../../integration/schema-evolver-service");
let GoogleSheetImportService = class GoogleSheetImportService {
    reader;
    entityImporter;
    schemaEvolver;
    constructor(reader, entityImporter, schemaEvolver) {
        this.reader = reader;
        this.entityImporter = entityImporter;
        this.schemaEvolver = schemaEvolver;
    }
    async importSpreadsheet(spreadsheetId) {
        const sheetNames = await this.reader.getSheetNames(spreadsheetId);
        const context = new types_1.ImportContext();
        for (const sheetName of sheetNames) {
            const rows = await this.reader.getRows(spreadsheetId, sheetName);
            await this.schemaEvolver.ensureColumns(sheetName, rows, [
                'sync_status',
                'sync_message',
                'sync_time',
            ]);
            if (!rows.length) {
                continue;
            }
            await this.entityImporter.importSheet(sheetName, rows, context);
            const writer = new google_sheet_status_writer_1.GoogleSheetStatusWriter(spreadsheetId, sheetName);
            await writer.updateRows(context.results.filter((r) => r.rowNumber > 0));
        }
    }
};
exports.GoogleSheetImportService = GoogleSheetImportService;
exports.GoogleSheetImportService = GoogleSheetImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [google_sheet_reader_service_1.GoogleSheetReaderService,
        entity_import_service_1.EntityImportService,
        schema_evolver_service_1.SchemaEvolverService])
], GoogleSheetImportService);
//# sourceMappingURL=google-sheet-import.service.js.map