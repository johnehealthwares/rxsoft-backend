"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const item_orm_entity_1 = require("../catalog/entities/item.orm-entity");
const inventory_controller_1 = require("./controllers/inventory.controller");
const stock_locations_controller_1 = require("./controllers/stock-locations.controller");
const in_memory_inventory_repository_1 = require("./repositories/in-memory-inventory.repository");
const typeorm_inventory_repository_1 = require("./repositories/typeorm-inventory.repository");
const inventory_di_tokens_1 = require("./services/inventory.di-tokens");
const list_stock_balances_use_case_1 = require("./services/list-stock-balances.use-case");
const create_stock_adjustment_use_case_1 = require("./services/create-stock-adjustment.use-case");
const inventory_service_1 = require("./services/inventory.service");
const stock_locations_service_1 = require("./services/stock-locations.service");
const entities_1 = require("./entities");
const list_stock_movements_use_case_1 = require("./services/list-stock-movements.use-case");
const inventoryConfigService = new config_1.ConfigService();
const useInMemoryRepos = inventoryConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const inventoryPersistenceImports = useInMemoryRepos
    ? []
    : [
        typeorm_1.TypeOrmModule.forFeature([
            entities_1.StockBalanceOrmEntity,
            entities_1.StockAdjustmentOrmEntity,
            entities_1.StockLocationOrmEntity,
            entities_1.StockLotOrmEntity,
            entities_1.StockMovementOrmEntity,
            entities_1.StoreStockLocationOrmEntity,
            entities_1.WarehouseOrmEntity,
            item_orm_entity_1.ItemOrmEntity,
        ]),
    ];
const inventoryRepositoryProviders = useInMemoryRepos
    ? [
        in_memory_inventory_repository_1.InMemoryInventoryRepository,
        {
            provide: inventory_di_tokens_1.INVENTORY_REPOSITORY,
            useExisting: in_memory_inventory_repository_1.InMemoryInventoryRepository,
        },
    ]
    : [
        typeorm_inventory_repository_1.TypeormInventoryRepository,
        {
            provide: inventory_di_tokens_1.INVENTORY_REPOSITORY,
            useExisting: typeorm_inventory_repository_1.TypeormInventoryRepository,
        },
    ];
const inventoryControllers = useInMemoryRepos
    ? [inventory_controller_1.InventoryController]
    : [inventory_controller_1.InventoryController, stock_locations_controller_1.StockLocationsController];
const inventoryExtraProviders = useInMemoryRepos ? [] : [stock_locations_service_1.StockLocationsService];
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), ...inventoryPersistenceImports],
        controllers: inventoryControllers,
        providers: [
            list_stock_balances_use_case_1.ListStockBalancesUseCase,
            list_stock_movements_use_case_1.ListStockMovementsUseCase,
            create_stock_adjustment_use_case_1.CreateStockAdjustmentUseCase,
            inventory_service_1.InventoryService,
            ...inventoryExtraProviders,
            ...inventoryRepositoryProviders,
        ],
        exports: [inventory_service_1.InventoryService],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map