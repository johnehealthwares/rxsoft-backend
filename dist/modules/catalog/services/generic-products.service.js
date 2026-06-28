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
exports.GenericProductsService = void 0;
const common_1 = require("@nestjs/common");
const healthcare_concepts_service_1 = require("../../../services/healthcare-concepts.service");
const generic_drug_cache_service_1 = require("../../../services/generic-drug-cache.service");
const code_validation_1 = require("../../../shared/utils/code-validation");
const toGenericProductType = (cached) => ({
    id: cached.id,
    organizationId: '',
    code: cached.code,
    name: cached.name,
    therapeuticClass: cached.therapeuticClass ?? null,
    dosageForm: cached.dosageForm ?? null,
    strength: cached.strength ?? null,
    generalUse: cached.generalUse ?? '',
    adultDosage: cached.adultDosage ?? '',
    pediatricDosage: cached.pediatricDosage ?? '',
    isPrescriptionRequired: cached.isPrescriptionRequired ?? false,
    isControlledSubstance: cached.isControlledSubstance ?? false,
    pharmaceutics: cached.pharmaceutics
        ? {
            id: cached.pharmaceutics.id ?? '',
            organizationId: '',
            code: cached.pharmaceutics.code ?? '',
            commonBrandName: cached.pharmaceutics.commonBrandName ?? null,
            commonGenericName: cached.pharmaceutics.commonGenericName ?? null,
            clinicalName: cached.pharmaceutics.clinicalName ?? null,
            drugClass: cached.pharmaceutics.drugClass ?? null,
            chemicalConstituents: cached.pharmaceutics.chemicalConstituents ?? null,
            pharmaceutics: cached.pharmaceutics.pharmaceutics ?? null,
            indications: cached.pharmaceutics.indications ?? null,
            contraindications: cached.pharmaceutics.contraindications ?? null,
            mechanism: cached.pharmaceutics.mechanism ?? null,
            missedDose: cached.pharmaceutics.missedDose ?? null,
            drugInteractions: cached.pharmaceutics.drugInteractions ?? null,
            dosage: cached.pharmaceutics.dosage ?? null,
            createdAt: cached.pharmaceutics.createdAt ?? new Date().toISOString(),
            updatedAt: cached.pharmaceutics.updatedAt ?? new Date().toISOString(),
            deletedAt: null,
        }
        : null,
    createdAt: cached.createdAt ?? new Date().toISOString(),
    updatedAt: cached.updatedAt ?? new Date().toISOString(),
    deletedAt: null,
});
let GenericProductsService = class GenericProductsService {
    healthcare;
    cache;
    constructor(healthcare, cache) {
        this.healthcare = healthcare;
        this.cache = cache;
    }
    async list(query, _organizationId) {
        const search = query.search ?? '';
        const offset = query.offset ?? 0;
        const limit = query.limit ?? 20;
        const result = this.cache.searchLightweight(search, offset, limit);
        const items = result.items
            .map((item) => this.cache.getByCode(item.code))
            .filter(Boolean);
        return {
            data: items.map(toGenericProductType),
            total: result.total,
        };
    }
    async get(idOrCode, _organizationId) {
        let cached = this.cache.getByCode(idOrCode);
        if (!cached) {
            cached = this.cache.getAll().find((p) => p.id === idOrCode);
        }
        if (!cached) {
            const fetched = await this.healthcare.getGenericProductByCode(idOrCode);
            if (!fetched)
                throw new common_1.NotFoundException('Generic product not found');
            return toGenericProductType(fetched);
        }
        return toGenericProductType(cached);
    }
    async create(payload, _organizationId) {
        const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
            providedCode: payload.code,
            lastCode: undefined,
            override: payload.overrideCodeValidation,
        });
        if (!valid) {
            throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
        }
        const result = await this.healthcare.createGenericProduct(payload);
        if (!result)
            throw new common_1.BadRequestException('Failed to create generic product');
        this.cache.invalidate(result.code);
        return toGenericProductType(result);
    }
    async update(id, payload, _organizationId) {
        const result = await this.healthcare.updateGenericProduct(id, payload);
        if (!result)
            throw new common_1.NotFoundException('Generic product not found');
        this.cache.invalidate(result.code);
        return toGenericProductType(result);
    }
    async remove(id, _organizationId) {
        const cached = this.cache.getAll().find((p) => p.id === id);
        if (cached)
            this.cache.invalidate(cached.code);
        await this.healthcare.deleteGenericProduct(id);
    }
};
exports.GenericProductsService = GenericProductsService;
exports.GenericProductsService = GenericProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [healthcare_concepts_service_1.HealthcareConceptsService,
        generic_drug_cache_service_1.GenericDrugCacheService])
], GenericProductsService);
//# sourceMappingURL=generic-products.service.js.map