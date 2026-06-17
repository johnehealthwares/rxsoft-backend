"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryImportTarget = void 0;
class RepositoryImportTarget {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        return this.repository.find();
    }
    create() {
        return this.repository.create();
    }
    async save(entities) {
        return this.repository.save(entities);
    }
    async getColumns() {
        return this.repository.metadata.columns.map((c) => c.propertyName);
    }
}
exports.RepositoryImportTarget = RepositoryImportTarget;
//# sourceMappingURL=repository-import-target.js.map