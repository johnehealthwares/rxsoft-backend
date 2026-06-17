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
exports.CollectReceivablePaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const receivables_di_tokens_1 = require("./receivables.di-tokens");
let CollectReceivablePaymentUseCase = class CollectReceivablePaymentUseCase {
    receivablesRepository;
    cacheService;
    constructor(receivablesRepository, cacheService) {
        this.receivablesRepository = receivablesRepository;
        this.cacheService = cacheService;
    }
    async execute(receivableId, payload, organizationId, receivedByUserId) {
        if (payload.amount <= 0) {
            throw new common_1.BadRequestException('Payment amount must be greater than zero');
        }
        const result = await this.receivablesRepository.collectPayment({
            organizationId,
            receivableId,
            amount: payload.amount,
            paymentMethodId: payload.paymentMethodId,
            receivedByUserId,
            referenceNumber: payload.referenceNumber ?? null,
            note: payload.note ?? null,
            transactionDate: new Date(),
        });
        await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
        await this.cacheService?.invalidateByPrefix(`receivables:tx:${organizationId}:${receivableId}:`);
        return result;
    }
};
exports.CollectReceivablePaymentUseCase = CollectReceivablePaymentUseCase;
exports.CollectReceivablePaymentUseCase = CollectReceivablePaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(receivables_di_tokens_1.RECEIVABLES_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService])
], CollectReceivablePaymentUseCase);
//# sourceMappingURL=collect-receivable-payment.use-case.js.map