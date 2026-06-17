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
exports.CreateSaleRefundUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const sales_di_tokens_1 = require("./sales.di-tokens");
let CreateSaleRefundUseCase = class CreateSaleRefundUseCase {
    salesRepository;
    cacheService;
    constructor(salesRepository, cacheService) {
        this.salesRepository = salesRepository;
        this.cacheService = cacheService;
    }
    async execute(saleId, payload, organizationId, userId) {
        if (!payload.lines.length) {
            throw new common_1.BadRequestException('At least one refund line is required');
        }
        const result = await this.salesRepository.createRefund({
            organizationId,
            saleId,
            refundNumber: `RF-${Date.now()}`,
            reason: payload.reason ?? null,
            refundedByUserId: userId,
            refundDate: new Date(),
            lines: payload.lines.map((line) => ({
                saleLineId: line.saleLineId,
                quantity: line.quantity,
            })),
        });
        await this.cacheService?.invalidateByPrefix(`sales:list:${organizationId}:`);
        return result;
    }
};
exports.CreateSaleRefundUseCase = CreateSaleRefundUseCase;
exports.CreateSaleRefundUseCase = CreateSaleRefundUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_di_tokens_1.SALES_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService])
], CreateSaleRefundUseCase);
//# sourceMappingURL=create-sale-refund.use-case.js.map