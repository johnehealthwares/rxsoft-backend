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
exports.SchemaEvolverService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let SchemaEvolverService = class SchemaEvolverService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async ensureColumns(table, rows, systemColumns = []) {
        if (!rows.length)
            return;
        const existingCols = await this.getColumns(table);
        const sampleRow = rows[0];
        const incomingCols = Object.keys(sampleRow);
        const allRequired = new Set([
            ...incomingCols,
            ...systemColumns,
        ]);
        for (const col of allRequired) {
            if (existingCols.includes(col))
                continue;
            await this.dataSource.query(`ALTER TABLE "${table}" ADD COLUMN "${col}" TEXT`);
        }
    }
    async getColumns(table) {
        const result = await this.dataSource.query(`PRAGMA table_info("${table}")`);
        return result.map((r) => r.name);
    }
};
exports.SchemaEvolverService = SchemaEvolverService;
exports.SchemaEvolverService = SchemaEvolverService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SchemaEvolverService);
//# sourceMappingURL=schema-evolver-service.js.map