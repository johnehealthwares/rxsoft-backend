"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.databaseConfig = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const health_controller_1 = require("./modules/health/controllers/health.controller");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const receivables_module_1 = require("./modules/receivables/receivables.module");
const sales_module_1 = require("./modules/sales/sales.module");
const cache_module_1 = require("./common/cache/cache.module");
const audit_module_1 = require("./common/audit/audit.module");
const audit_log_interceptor_1 = require("./common/interceptors/audit-log.interceptor");
const seeding_service_1 = require("./database/seeding.service");
const audit_module_2 = require("./modules/audit/audit.module");
const categories_module_1 = require("./modules/categories/categories.module");
const customers_module_1 = require("./modules/customers/customers.module");
const purchases_module_1 = require("./modules/purchases/purchases.module");
const reports_module_1 = require("./modules/reports/reports.module");
const pricing_module_1 = require("./modules/pricing/pricing.module");
const organizations_module_1 = require("./modules/organizations/organizations.module");
const manufacturers_module_1 = require("./modules/manufacturers/manufacturers.module");
const accounting_module_1 = require("./modules/accounting/accounting.module");
const user_pos_config_module_1 = require("./modules/user-pos-config/user-pos-config.module");
const organisation_config_module_1 = require("./modules/organisation-config/organisation-config.module");
const warehouses_module_1 = require("./modules/warehouses/warehouses.module");
const website_module_1 = require("./modules/website/website.module");
const apm_module_1 = require("./modules/apm/apm.module");
const upload_module_1 = require("./modules/upload/upload.module");
const users_proxy_module_1 = require("./modules/users-proxy/users-proxy.module");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const appConfigService = new config_1.ConfigService();
exports.databaseConfig = {
    type: appConfigService.get('DB_TYPE', 'postgres'),
    host: appConfigService.get('DB_HOST', 'localhost'),
    port: Number(appConfigService.get('DB_PORT', '5432')),
    username: appConfigService.get('DB_USER', 'postgres'),
    password: appConfigService.get('DB_PASSWORD', 'postgres'),
    database: appConfigService.get('DB_NAME', 'rxsoft'),
    synchronize: appConfigService.get('DB_SYNCHRONIZE', 'false') === 'true',
    dropSchema: appConfigService.get('DB_DROP_SCHEMA', 'false') === 'true',
    logging: appConfigService.get('TYPEORM_LOGGING', 'false') === 'true',
};
const useInMemoryRepos = appConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const useMongoDb = appConfigService.get('USE_MONGODB', 'false') === 'true';
const infrastructureImports = useInMemoryRepos
    ? []
    : [
        ...(useMongoDb
            ? [
                mongoose_1.MongooseModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        uri: configService.get('MONGODB_URI', 'mongodb://localhost:27017/apm-campaign'),
                    }),
                }),
            ]
            : []),
        typeorm_1.TypeOrmModule.forRootAsync({
            inject: [config_1.ConfigService],
            useFactory: (configService) => {
                const type = configService.get('DB_TYPE', 'postgres');
                const database = configService.get('DB_NAME', 'rxsoft');
                const synchronize = configService.get('DB_SYNCHRONIZE', 'false') === 'true';
                const dropSchema = configService.get('DB_DROP_SCHEMA', 'false') === 'true';
                const host = configService.get('DB_HOST', 'localhost');
                const port = Number(configService.get('DB_PORT', '5432'));
                const username = configService.get('DB_USER', 'postgres');
                const password = configService.get('DB_PASSWORD', 'postgres');
                return {
                    type,
                    host,
                    port,
                    username,
                    password,
                    database: type === 'sqljs'
                        ? undefined
                        : type === 'sqlite'
                            ? database
                            : database,
                    location: type === 'sqljs' ? 'rxsoft' : undefined,
                    autoSave: type === 'sqljs' ? false : undefined,
                    autoLoadEntities: true,
                    synchronize,
                    dropSchema,
                    logging: configService.get('TYPEORM_LOGGING') === 'true',
                };
            },
        }),
    ];
const applicationModules = useInMemoryRepos
    ? [catalog_module_1.CatalogModule, inventory_module_1.InventoryModule, sales_module_1.SalesModule, receivables_module_1.ReceivablesModule, reports_module_1.ReportsModule, upload_module_1.UploadModule]
    : [
        catalog_module_1.CatalogModule,
        categories_module_1.CategoriesModule,
        customers_module_1.CustomersModule,
        inventory_module_1.InventoryModule,
        sales_module_1.SalesModule,
        receivables_module_1.ReceivablesModule,
        purchases_module_1.PurchasesModule,
        pricing_module_1.PricingModule,
        organizations_module_1.OrganizationsModule,
        manufacturers_module_1.ManufacturersModule,
        accounting_module_1.AccountingModule,
        reports_module_1.ReportsModule,
        audit_module_2.AuditModule,
        website_module_1.WebsiteModule,
        apm_module_1.ApmModule.forRoot(),
        upload_module_1.UploadModule,
        user_pos_config_module_1.UserPosConfigModule,
        organisation_config_module_1.OrganisationConfigModule,
        warehouses_module_1.WarehousesModule,
        users_proxy_module_1.UsersProxyModule,
    ];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            ...infrastructureImports,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            cache_module_1.CacheModule,
            audit_module_1.AuditModule,
            ...applicationModules,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [
            seeding_service_1.DatabaseSeeedService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: audit_log_interceptor_1.AuditLogInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map