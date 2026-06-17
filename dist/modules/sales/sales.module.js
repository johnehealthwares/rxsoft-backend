"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const item_orm_entity_1 = require("../catalog/entities/item.orm-entity");
const user_orm_entity_1 = require("../identity/entities/user.orm-entity");
const stock_lot_orm_entity_1 = require("../inventory/entities/stock-lot.orm-entity");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const sales_controller_1 = require("./controllers/sales.controller");
const uoms_controller_1 = require("./controllers/uoms.controller");
const payment_methods_controller_1 = require("./controllers/payment-methods.controller");
const uom_categories_controller_1 = require("./controllers/uom-categories.controller");
const entities_1 = require("./entities");
const in_memory_sales_repository_1 = require("./repositories/in-memory-sales.repository");
const typeorm_sales_repository_1 = require("./repositories/typeorm-sales.repository");
const create_sale_refund_use_case_1 = require("./services/create-sale-refund.use-case");
const create_sale_use_case_1 = require("./services/create-sale.use-case");
const list_sales_use_case_1 = require("./services/list-sales.use-case");
const sales_service_1 = require("./services/sales.service");
const uoms_service_1 = require("./services/uoms.service");
const payment_methods_service_1 = require("./services/payment-methods.service");
const uom_categories_service_1 = require("./services/uom-categories.service");
const uom_converter_service_1 = require("./services/uom-converter.service");
const sales_di_tokens_1 = require("./services/sales.di-tokens");
const salesConfigService = new config_1.ConfigService();
const useInMemoryRepos = salesConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const salesPersistenceImports = useInMemoryRepos
    ? []
    : [
        typeorm_1.TypeOrmModule.forFeature([
            entities_1.SaleOrmEntity,
            entities_1.SaleLineOrmEntity,
            entities_1.SalePaymentOrmEntity,
            entities_1.SaleRefundOrmEntity,
            entities_1.SaleRefundLineOrmEntity,
            entities_1.AccountReceivableOrmEntity,
            entities_1.PaymentMethodOrmEntity,
            entities_1.UomCategoryOrmEntity,
            entities_1.UomOrmEntity,
            item_orm_entity_1.ItemOrmEntity,
            stock_lot_orm_entity_1.StockLotOrmEntity,
            user_orm_entity_1.UserOrmEntity,
        ]),
    ];
const salesRepositoryProviders = useInMemoryRepos
    ? [
        in_memory_sales_repository_1.InMemorySalesRepository,
        {
            provide: sales_di_tokens_1.SALES_REPOSITORY,
            useExisting: in_memory_sales_repository_1.InMemorySalesRepository,
        },
    ]
    : [
        typeorm_sales_repository_1.TypeormSalesRepository,
        {
            provide: sales_di_tokens_1.SALES_REPOSITORY,
            useExisting: typeorm_sales_repository_1.TypeormSalesRepository,
        },
    ];
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), ...salesPersistenceImports],
        controllers: [sales_controller_1.SalesController, uoms_controller_1.UomsController, uom_categories_controller_1.UomCategoriesController, payment_methods_controller_1.PaymentMethodsController],
        providers: [
            list_sales_use_case_1.ListSalesUseCase,
            create_sale_use_case_1.CreateSaleUseCase,
            create_sale_refund_use_case_1.CreateSaleRefundUseCase,
            sales_service_1.SalesService,
            uoms_service_1.UomsService,
            uom_categories_service_1.UomCategoriesService,
            payment_methods_service_1.PaymentMethodsService,
            uom_converter_service_1.UomConverterService,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            ...salesRepositoryProviders,
        ],
        exports: [sales_service_1.SalesService, uom_converter_service_1.UomConverterService],
    })
], SalesModule);
//# sourceMappingURL=sales.module.js.map