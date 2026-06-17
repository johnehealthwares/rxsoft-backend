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
exports.DrugComponentsService = void 0;
const common_1 = require("@nestjs/common");
const healthcare_concepts_service_1 = require("../../../services/healthcare-concepts.service");
let DrugComponentsService = class DrugComponentsService {
    healthcare;
    constructor(healthcare) {
        this.healthcare = healthcare;
    }
    async list(query, _organizationId) {
        const result = await this.healthcare.searchDrugComponents(query.search ?? '');
        return {
            data: result.items.map((item) => ({ id: item.id, organizationId: '', name: item.name, createdAt: '', updatedAt: '', deletedAt: null })),
            total: result.total,
        };
    }
    async get(id, _organizationId) {
        const result = await this.healthcare.searchDrugComponents(id);
        const item = result.items.find((i) => i.id === id);
        if (!item)
            throw new common_1.NotFoundException('Drug component not found');
        return { id: item.id, organizationId: '', name: item.name, createdAt: '', updatedAt: '', deletedAt: null };
    }
    async create(payload, _organizationId) {
        return payload;
    }
    async update(id, payload, _organizationId) {
        return payload;
    }
    async remove(id, _organizationId) {
    }
};
exports.DrugComponentsService = DrugComponentsService;
exports.DrugComponentsService = DrugComponentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [healthcare_concepts_service_1.HealthcareConceptsService])
], DrugComponentsService);
//# sourceMappingURL=drug-components.service.js.map