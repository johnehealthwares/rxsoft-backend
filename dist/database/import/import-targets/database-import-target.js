"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseImportTarget = void 0;
const crypto_1 = require("crypto");
class DatabaseImportTarget {
    dataSource;
    tableName;
    constructor(dataSource, tableName) {
        this.dataSource = dataSource;
        this.tableName = tableName;
    }
    async findAll() {
        return this.dataSource.query(`select * from ${this.tableName}`);
    }
    create() {
        return {};
    }
    async save(entities) {
        for (const entity of entities) {
            if (!entity.id || entity.id === '') {
                entity.id = (0, crypto_1.randomUUID)();
            }
            if (entity.uuid && entity.id !== '' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(entity.uuid)) {
                entity.id = (0, crypto_1.randomUUID)();
            }
            delete entity.uuid;
            const cols = Object.keys(entity);
            const placeholders = cols.map((_, i) => `$${i + 1}`).join(',');
            const colList = cols.map(c => `"${c === 'uuid' ? 'id' : c}"`).join(',');
            const updates = cols
                .filter((c) => c !== 'uuid')
                .map((c) => `"${c}" = excluded."${c}"`)
                .join(', ');
            const values = cols.map((c) => entity[c]);
            const conflictColumn = 'id';
            const updatesExcludingConflict = cols
                .filter((c) => c !== 'uuid' && c !== 'id')
                .map((c) => `"${c}" = excluded."${c}"`)
                .join(', ');
            const sql = `INSERT INTO ${this.tableName} (${colList}) VALUES (${placeholders}) ON CONFLICT (${conflictColumn}) DO UPDATE SET ${updatesExcludingConflict}`;
            await this.dataSource.query(sql, values);
        }
        return entities;
    }
    async getColumns() {
        try {
            const result = await this.dataSource.query(`select column_name from information_schema.columns where table_name = $1`, [this.tableName]);
            if (result && result.length) {
                return result.map((r) => r.column_name);
            }
        }
        catch (e) {
        }
        try {
            const rows = await this.dataSource.query(`PRAGMA table_info(${this.tableName})`);
            return rows.map((r) => r.name);
        }
        catch (e) {
            return [];
        }
    }
}
exports.DatabaseImportTarget = DatabaseImportTarget;
//# sourceMappingURL=database-import-target.js.map