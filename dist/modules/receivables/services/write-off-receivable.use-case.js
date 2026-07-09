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
var WriteOffReceivableUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteOffReceivableUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const accounting_integration_service_1 = require("../../accounting/services/accounting-integration.service");
const receivables_di_tokens_1 = require("./receivables.di-tokens");
let WriteOffReceivableUseCase = WriteOffReceivableUseCase_1 = class WriteOffReceivableUseCase {
    receivablesRepository;
    cacheService;
    accountingIntegration;
    logger = new common_1.Logger(WriteOffReceivableUseCase_1.name);
    constructor(receivablesRepository, cacheService, accountingIntegration) {
        this.receivablesRepository = receivablesRepository;
        this.cacheService = cacheService;
        this.accountingIntegration = accountingIntegration;
    }
    async execute(receivableId, payload, organizationId, writtenOffByUserId) {
        const result = await this.receivablesRepository.writeOff({
            organizationId,
            receivableId,
            writtenOffByUserId,
            note: payload.note ?? null,
            transactionDate: new Date(),
        });
        await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
        await this.cacheService?.invalidateByPrefix(`receivables:tx:${organizationId}:${receivableId}:`);
        if (this.accountingIntegration) {
            const writeOffAmount = result.receivable.originalAmount;
            this.accountingIntegration
                .recordWriteOff(organizationId, { id: receivableId, receivableNumber: result.receivable.receivableNumber }, writeOffAmount)
                .catch((err) => this.logger.error(`Accounting: failed to record write-off: ${err.message}`, err.stack));
        }
        return result;
    }
};
exports.WriteOffReceivableUseCase = WriteOffReceivableUseCase;
exports.WriteOffReceivableUseCase = WriteOffReceivableUseCase = WriteOffReceivableUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(receivables_di_tokens_1.RECEIVABLES_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService,
        accounting_integration_service_1.AccountingIntegrationService])
], WriteOffReceivableUseCase);
//# sourceMappingURL=write-off-receivable.use-case.js.map