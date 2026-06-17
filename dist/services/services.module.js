"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const generic_drug_cache_service_1 = require("./generic-drug-cache.service");
const healthcare_concepts_service_1 = require("./healthcare-concepts.service");
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [healthcare_concepts_service_1.HealthcareConceptsService, generic_drug_cache_service_1.GenericDrugCacheService],
        exports: [healthcare_concepts_service_1.HealthcareConceptsService, generic_drug_cache_service_1.GenericDrugCacheService],
    })
], ServicesModule);
//# sourceMappingURL=services.module.js.map