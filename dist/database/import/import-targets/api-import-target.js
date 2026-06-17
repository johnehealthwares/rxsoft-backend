"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiImportTarget = void 0;
class ApiImportTarget {
    http;
    baseUrl;
    constructor(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
    }
    async findAll() {
        const response = await this.http.axiosRef.get(this.baseUrl);
        return response.data;
    }
    create() {
        return {};
    }
    async save(entities) {
        const response = await this.http.axiosRef.post(`${this.baseUrl}/bulk-sync`, entities);
        return response.data;
    }
    async getColumns() {
        return [];
    }
}
exports.ApiImportTarget = ApiImportTarget;
//# sourceMappingURL=api-import-target.js.map