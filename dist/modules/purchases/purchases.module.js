"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const inflow_controller_1 = require("./controllers/inflow.controller");
const purchases_controller_1 = require("./controllers/purchases.controller");
const entities_1 = require("./entities");
const in_memory_purchases_repository_1 = require("./repositories/in-memory-purchases.repository");
const typeorm_purchases_repository_1 = require("./repositories/typeorm-purchases.repository");
const purchases_di_tokens_1 = require("./services/purchases.di-tokens");
const purchases_service_1 = require("./services/purchases.service");
const receive_goods_use_case_1 = require("./services/receive-goods.use-case");
const entities_2 = require("../inventory/entities");
const party_orm_entity_1 = require("../customers/entities/party.orm-entity");
const purchasesConfigService = new config_1.ConfigService();
const useInMemoryRepos = purchasesConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const purchasesPersistenceImports = useInMemoryRepos
    ? []
    : [
        typeorm_1.TypeOrmModule.forFeature([
            entities_1.PurchaseOrderOrmEntity,
            entities_1.PurchaseOrderLineOrmEntity,
            entities_1.GoodsReceiptOrmEntity,
            entities_1.GoodsReceiptLineOrmEntity,
            entities_2.StockMovementOrmEntity,
            entities_2.StockBalanceOrmEntity,
            entities_2.StockLocationOrmEntity,
            entities_2.StockAdjustmentOrmEntity,
            entities_2.WarehouseOrmEntity,
            party_orm_entity_1.PartyOrmEntity,
        ]),
    ];
const purchasesRepositoryProviders = useInMemoryRepos
    ? [
        in_memory_purchases_repository_1.InMemoryPurchasesRepository,
        {
            provide: purchases_di_tokens_1.PURCHASES_REPOSITORY,
            useExisting: in_memory_purchases_repository_1.InMemoryPurchasesRepository,
        },
    ]
    : [
        typeorm_purchases_repository_1.TypeormPurchasesRepository,
        {
            provide: purchases_di_tokens_1.PURCHASES_REPOSITORY,
            useExisting: typeorm_purchases_repository_1.TypeormPurchasesRepository,
        },
    ];
let PurchasesModule = class PurchasesModule {
};
exports.PurchasesModule = PurchasesModule;
exports.PurchasesModule = PurchasesModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), ...purchasesPersistenceImports],
        controllers: [purchases_controller_1.PurchasesController, inflow_controller_1.InflowController],
        providers: [
            purchases_service_1.PurchasesService,
            receive_goods_use_case_1.ReceiveGoodsUseCase,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            ...purchasesRepositoryProviders,
        ],
        exports: [purchases_service_1.PurchasesService],
    })
], PurchasesModule);
//# sourceMappingURL=purchases.module.js.map