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
exports.ListReceivableTransactionsUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const receivables_di_tokens_1 = require("./receivables.di-tokens");
let ListReceivableTransactionsUseCase = class ListReceivableTransactionsUseCase {
    receivablesRepository;
    cacheService;
    constructor(receivablesRepository, cacheService) {
        this.receivablesRepository = receivablesRepository;
        this.cacheService = cacheService;
    }
    async execute(receivableId, query, organizationId) {
        const key = [
            'receivables:tx',
            organizationId,
            receivableId,
            query.page,
            query.limit,
            query.transactionType ?? '',
        ].join(':');
        const cached = await this.cacheService?.get(key);
        if (cached) {
            return cached;
        }
        const result = await this.receivablesRepository.listTransactions({
            organizationId,
            receivableId,
            offset: query.offset,
            limit: query.limit,
            transactionType: query.transactionType,
        });
        await this.cacheService?.set(key, result, 30);
        return result;
    }
};
exports.ListReceivableTransactionsUseCase = ListReceivableTransactionsUseCase;
exports.ListReceivableTransactionsUseCase = ListReceivableTransactionsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(receivables_di_tokens_1.RECEIVABLES_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService])
], ListReceivableTransactionsUseCase);
//# sourceMappingURL=list-receivable-transactions.use-case.js.map