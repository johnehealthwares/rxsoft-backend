"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const inventory_module_1 = require("../inventory/inventory.module");
const pricing_module_1 = require("../pricing/pricing.module");
const services_module_1 = require("../../services/services.module");
const catalog_di_tokens_1 = require("./services/catalog.di-tokens");
const create_item_use_case_1 = require("./services/create-item.use-case");
const get_item_use_case_1 = require("./services/get-item.use-case");
const generic_products_service_1 = require("./services/generic-products.service");
const pharmaceutics_service_1 = require("./services/pharmaceutics.service");
const drug_components_service_1 = require("./services/drug-components.service");
const list_item_dependencies_use_case_1 = require("./services/list-item-dependencies.use-case");
const list_items_use_case_1 = require("./services/list-items.use-case");
const in_memory_item_repository_1 = require("./repositories/in-memory-item.repository");
const typeorm_item_repository_1 = require("./repositories/typeorm-item.repository");
const items_controller_1 = require("./controllers/items.controller");
const generic_products_controller_1 = require("./controllers/generic-products.controller");
const pharmaceutics_controller_1 = require("./controllers/pharmaceutics.controller");
const drug_components_controller_1 = require("./controllers/drug-components.controller");
const entities_1 = require("./entities");
const entities_2 = require("../sales/entities");
const update_item_use_case_1 = require("./services/update-item.use-case");
const patch_item_use_case_1 = require("./services/patch-item.use-case");
const catalogConfigService = new config_1.ConfigService();
const useInMemoryRepos = catalogConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const catalogPersistenceImports = useInMemoryRepos
    ? []
    : [
        typeorm_1.TypeOrmModule.forFeature([
            entities_1.ItemOrmEntity,
            entities_1.ItemCategoryOrmEntity,
            entities_2.UomOrmEntity,
            entities_1.ClassificationOrmEntity,
        ]),
        pricing_module_1.PricingModule,
    ];
const catalogRepositoryProviders = useInMemoryRepos
    ? [
        in_memory_item_repository_1.InMemoryItemRepository,
        {
            provide: catalog_di_tokens_1.ITEM_REPOSITORY,
            useExisting: in_memory_item_repository_1.InMemoryItemRepository,
        },
    ]
    : [
        typeorm_item_repository_1.TypeormItemRepository,
        {
            provide: catalog_di_tokens_1.ITEM_REPOSITORY,
            useExisting: typeorm_item_repository_1.TypeormItemRepository,
        },
    ];
const catalogControllers = useInMemoryRepos
    ? [items_controller_1.ItemsController]
    : [items_controller_1.ItemsController, generic_products_controller_1.GenericProductsController, pharmaceutics_controller_1.PharmaceuticsController, drug_components_controller_1.DrugComponentsController];
const catalogExtraProviders = useInMemoryRepos ? [] : [generic_products_service_1.GenericProductsService, pharmaceutics_service_1.PharmaceuticsService, drug_components_service_1.DrugComponentsService];
let CatalogModule = class CatalogModule {
};
exports.CatalogModule = CatalogModule;
exports.CatalogModule = CatalogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            inventory_module_1.InventoryModule,
            services_module_1.ServicesModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET'),
                }),
            }),
            ...catalogPersistenceImports,
        ],
        controllers: catalogControllers,
        providers: [
            create_item_use_case_1.CreateItemUseCase,
            update_item_use_case_1.UpdateItemUseCase,
            patch_item_use_case_1.PatchItemUseCase,
            get_item_use_case_1.GetItemUseCase,
            list_items_use_case_1.ListItemsUseCase,
            list_item_dependencies_use_case_1.ListItemDependenciesUseCase,
            ...catalogExtraProviders,
            ...catalogRepositoryProviders,
        ],
        exports: [catalog_di_tokens_1.ITEM_REPOSITORY],
    })
], CatalogModule);
//# sourceMappingURL=catalog.module.js.map