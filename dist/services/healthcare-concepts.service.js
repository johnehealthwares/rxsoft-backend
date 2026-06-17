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
var HealthcareConceptsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcareConceptsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let HealthcareConceptsService = HealthcareConceptsService_1 = class HealthcareConceptsService {
    http;
    logger = new common_1.Logger(HealthcareConceptsService_1.name);
    baseUrl;
    constructor(http, configService) {
        this.http = http;
        this.baseUrl = configService.get('HEALTHCARE_CONCEPTS_API_URL', 'http://localhost:3011/api/v1');
    }
    async getGenericProductByCode(code) {
        try {
            const response = await this.http.axiosRef.get(`${this.baseUrl}/generic-products/code/${encodeURIComponent(code)}`);
            return response.data?.data ?? null;
        }
        catch (err) {
            if (err.response?.status === 404)
                return null;
            this.logger.error(`Failed to fetch generic product by code ${code}: ${err.message}`);
            return null;
        }
    }
    async searchGenericProducts(query, page = 1, limit = 20) {
        try {
            const response = await this.http.axiosRef.get(`${this.baseUrl}/generic-products/search`, {
                params: { search: query, page, limit },
            });
            const data = response.data?.data ?? [];
            return {
                items: data.map((item) => ({ id: item.id, code: item.code, name: item.name })),
                total: response.data?.meta?.total ?? data.length,
            };
        }
        catch (err) {
            this.logger.error(`Failed to search generic products: ${err.message}`);
            return { items: [], total: 0 };
        }
    }
    async listGenericProducts(page = 1, limit = 1000) {
        try {
            const response = await this.http.axiosRef.get(`${this.baseUrl}/generic-products`, {
                params: { page, limit },
            });
            return response.data?.data ?? [];
        }
        catch (err) {
            this.logger.error(`Failed to list all generic products: ${err.message}`);
            return [];
        }
    }
    async getPharmaceutics(id) {
        try {
            const response = await this.http.axiosRef.get(`${this.baseUrl}/pharmaceutics/${id}`);
            return response.data?.data ?? null;
        }
        catch (err) {
            if (err.response?.status === 404)
                return null;
            this.logger.error(`Failed to fetch pharmaceutics ${id}: ${err.message}`);
            return null;
        }
    }
    async searchPharmaceutics(query) {
        try {
            const response = await this.http.axiosRef.get(`${this.baseUrl}/pharmaceutics`, {
                params: { search: query },
            });
            const data = response.data?.data ?? [];
            return {
                items: data.map((item) => ({ id: item.id, code: item.code, name: item.commonGenericName ?? item.clinicalName ?? item.code })),
                total: response.data?.meta?.total ?? data.length,
            };
        }
        catch (err) {
            this.logger.error(`Failed to search pharmaceutics: ${err.message}`);
            return { items: [], total: 0 };
        }
    }
    async searchDrugComponents(query) {
        try {
            const response = await this.http.axiosRef.get(`${this.baseUrl}/drug-components`, {
                params: { search: query },
            });
            const data = response.data?.data ?? [];
            return {
                items: data.map((item) => ({ id: item.id, code: item.name, name: item.name })),
                total: response.data?.meta?.total ?? data.length,
            };
        }
        catch (err) {
            this.logger.error(`Failed to search drug components: ${err.message}`);
            return { items: [], total: 0 };
        }
    }
    async createGenericProduct(payload) {
        const response = await this.http.axiosRef.post(`${this.baseUrl}/generic-products`, payload);
        return response.data?.data;
    }
    async updateGenericProduct(id, payload) {
        const response = await this.http.axiosRef.patch(`${this.baseUrl}/generic-products/${id}`, payload);
        return response.data?.data;
    }
    async deleteGenericProduct(id) {
        await this.http.axiosRef.delete(`${this.baseUrl}/generic-products/${id}`);
    }
};
exports.HealthcareConceptsService = HealthcareConceptsService;
exports.HealthcareConceptsService = HealthcareConceptsService = HealthcareConceptsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], HealthcareConceptsService);
//# sourceMappingURL=healthcare-concepts.service.js.map