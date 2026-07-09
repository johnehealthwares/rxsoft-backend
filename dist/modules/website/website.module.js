"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const services_module_1 = require("../../services/services.module");
const users_proxy_module_1 = require("../users-proxy/users-proxy.module");
const item_orm_entity_1 = require("../../modules/catalog/entities/item.orm-entity");
const item_category_orm_entity_1 = require("../../modules/catalog/entities/item-category.orm-entity");
const entities_1 = require("../../modules/sales/entities");
const party_orm_entity_1 = require("../../modules/customers/entities/party.orm-entity");
const entities_2 = require("./entities");
const entities_3 = require("../inventory/entities");
const website_controller_1 = require("./controllers/website.controller");
const website_auth_controller_1 = require("./controllers/website-auth.controller");
const website_admin_controller_1 = require("./controllers/website-admin.controller");
const website_service_1 = require("./services/website.service");
const optional_auth_guard_1 = require("./guards/optional-auth.guard");
let WebsiteModule = class WebsiteModule {
};
exports.WebsiteModule = WebsiteModule;
exports.WebsiteModule = WebsiteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            services_module_1.ServicesModule,
            users_proxy_module_1.UsersProxyModule,
            jwt_1.JwtModule.register({}),
            typeorm_1.TypeOrmModule.forFeature([
                item_orm_entity_1.ItemOrmEntity,
                item_category_orm_entity_1.ItemCategoryOrmEntity,
                entities_1.SaleOrmEntity,
                entities_1.SaleLineOrmEntity,
                party_orm_entity_1.PartyOrmEntity,
                entities_2.HealthConcernOrmEntity,
                entities_2.PrescriptionOrmEntity,
                entities_2.PrescriptionFileOrmEntity,
                entities_2.ConsultationOrmEntity,
                entities_2.TestimonialOrmEntity,
                entities_2.BlogArticleOrmEntity,
                entities_2.DeliveryAreaOrmEntity,
                entities_2.BranchOrmEntity,
                entities_2.ContactSubmissionOrmEntity,
                entities_2.NewsletterSubscriberOrmEntity,
                entities_2.ProductReviewOrmEntity,
                entities_2.RewardTransactionOrmEntity,
                entities_2.OrderOrmEntity,
                entities_2.OrderItemOrmEntity,
                entities_2.DeliveryOrmEntity,
                entities_3.StockBalanceOrmEntity,
                entities_3.StockAdjustmentOrmEntity,
                entities_3.StoreStockLocationOrmEntity,
            ]),
        ],
        controllers: [website_controller_1.WebsiteController, website_auth_controller_1.WebsiteAuthController, website_admin_controller_1.WebsiteAdminController],
        providers: [website_service_1.WebsiteService, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, optional_auth_guard_1.OptionalAuthGuard],
        exports: [website_service_1.WebsiteService],
    })
], WebsiteModule);
//# sourceMappingURL=website.module.js.map