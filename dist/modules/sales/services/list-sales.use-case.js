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
exports.ListSalesUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const sales_di_tokens_1 = require("./sales.di-tokens");
let ListSalesUseCase = class ListSalesUseCase {
    salesRepository;
    cacheService;
    constructor(salesRepository, cacheService) {
        this.salesRepository = salesRepository;
        this.cacheService = cacheService;
    }
    async execute(query, organizationId) {
        const key = ['sales:list', organizationId, query.page, query.limit, query.status ?? '', query.search].join(':');
        const cached = await this.cacheService?.get(key);
        if (cached) {
            return cached;
        }
        const result = await this.salesRepository.list({
            organizationId,
            offset: query.offset,
            limit: query.limit,
            status: query.status,
            search: query.search,
        });
        await this.cacheService?.set(key, result, 30);
        return result;
    }
};
exports.ListSalesUseCase = ListSalesUseCase;
exports.ListSalesUseCase = ListSalesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_di_tokens_1.SALES_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService])
], ListSalesUseCase);
//# sourceMappingURL=list-sales.use-case.js.map