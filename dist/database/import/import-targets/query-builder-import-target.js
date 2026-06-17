"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilderImportTarget = void 0;
class QueryBuilderImportTarget {
    dataSource;
    tableName;
    constructor(dataSource, tableName) {
        this.dataSource = dataSource;
        this.tableName = tableName;
    }
    async findAll() {
        return this.dataSource
            .createQueryBuilder()
            .select('*')
            .from(this.tableName, this.tableName)
            .getRawMany();
    }
    create() {
        return {};
    }
    async save(entities) {
        for (const entity of entities) {
            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into(this.tableName)
                .values(entity)
                .orUpdate(Object.keys(entity), ['uuid'])
                .execute();
        }
        return entities;
    }
    async getColumns() {
        const metadata = this.dataSource.getMetadata(this.tableName);
        return metadata.columns.map((c) => c.propertyName);
    }
}
exports.QueryBuilderImportTarget = QueryBuilderImportTarget;
//# sourceMappingURL=query-builder-import-target.js.map