"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivablesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../sales/entities");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const receivables_controller_1 = require("./controllers/receivables.controller");
const entities_2 = require("./entities");
const users_proxy_module_1 = require("../users-proxy/users-proxy.module");
const accounting_module_1 = require("../accounting/accounting.module");
const in_memory_receivables_repository_1 = require("./repositories/in-memory-receivables.repository");
const typeorm_receivables_repository_1 = require("./repositories/typeorm-receivables.repository");
const apply_receivable_adjustment_use_case_1 = require("./services/apply-receivable-adjustment.use-case");
const collect_receivable_payment_use_case_1 = require("./services/collect-receivable-payment.use-case");
const list_receivable_transactions_use_case_1 = require("./services/list-receivable-transactions.use-case");
const list_receivables_use_case_1 = require("./services/list-receivables.use-case");
const receivables_di_tokens_1 = require("./services/receivables.di-tokens");
const write_off_receivable_use_case_1 = require("./services/write-off-receivable.use-case");
const receivablesConfigService = new config_1.ConfigService();
const useInMemoryRepos = receivablesConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const receivablesPersistenceImports = useInMemoryRepos
    ? []
    : [typeorm_1.TypeOrmModule.forFeature([entities_1.AccountReceivableOrmEntity, entities_2.ReceivableTransactionOrmEntity, entities_1.PaymentMethodOrmEntity])];
const receivablesRepositoryProviders = useInMemoryRepos
    ? [
        in_memory_receivables_repository_1.InMemoryReceivablesRepository,
        {
            provide: receivables_di_tokens_1.RECEIVABLES_REPOSITORY,
            useExisting: in_memory_receivables_repository_1.InMemoryReceivablesRepository,
        },
    ]
    : [
        typeorm_receivables_repository_1.TypeormReceivablesRepository,
        {
            provide: receivables_di_tokens_1.RECEIVABLES_REPOSITORY,
            useExisting: typeorm_receivables_repository_1.TypeormReceivablesRepository,
        },
    ];
let ReceivablesModule = class ReceivablesModule {
};
exports.ReceivablesModule = ReceivablesModule;
exports.ReceivablesModule = ReceivablesModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), users_proxy_module_1.UsersProxyModule, accounting_module_1.AccountingModule, ...receivablesPersistenceImports],
        controllers: [receivables_controller_1.ReceivablesController],
        providers: [
            list_receivables_use_case_1.ListReceivablesUseCase,
            collect_receivable_payment_use_case_1.CollectReceivablePaymentUseCase,
            apply_receivable_adjustment_use_case_1.ApplyReceivableAdjustmentUseCase,
            write_off_receivable_use_case_1.WriteOffReceivableUseCase,
            list_receivable_transactions_use_case_1.ListReceivableTransactionsUseCase,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            ...receivablesRepositoryProviders,
        ],
    })
], ReceivablesModule);
//# sourceMappingURL=receivables.module.js.map