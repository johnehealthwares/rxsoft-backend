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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const sales_di_tokens_1 = require("./sales.di-tokens");
let SalesService = class SalesService {
    salesRepository;
    constructor(salesRepository) {
        this.salesRepository = salesRepository;
    }
    async list(query) {
        const result = await this.salesRepository.list({
            organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID,
            offset: query.offset,
            limit: query.limit,
        });
        return {
            data: result.items.map((sale) => ({
                id: sale.id,
                saleNumber: sale.saleNumber,
                saleChannel: sale.saleChannel,
                status: sale.status,
                totalAmount: sale.totalAmount,
                paidAmount: sale.paidAmount,
                changeAmount: sale.changeAmount,
                saleDate: sale.saleDate,
            })),
            total: result.total,
        };
    }
    async listAll() {
        const result = await this.salesRepository.list({
            organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID,
            offset: 0,
            limit: 10000,
        });
        return result.items.map((sale) => ({
            saleDate: sale.saleDate,
            totalAmount: sale.totalAmount,
        }));
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_di_tokens_1.SALES_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], SalesService);
//# sourceMappingURL=sales.service.js.map