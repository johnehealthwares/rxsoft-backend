"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const item_orm_entity_1 = require("../catalog/entities/item.orm-entity");
const stock_location_orm_entity_1 = require("../inventory/entities/stock-location.orm-entity");
const pricing_controller_1 = require("./controllers/pricing.controller");
const entities_1 = require("./entities");
const pricing_service_1 = require("./services/pricing.service");
let PricingModule = class PricingModule {
};
exports.PricingModule = PricingModule;
exports.PricingModule = PricingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.PriceListOrmEntity,
                entities_1.PriceListItemOrmEntity,
                item_orm_entity_1.ItemOrmEntity,
                stock_location_orm_entity_1.StockLocationOrmEntity,
            ]),
        ],
        controllers: [pricing_controller_1.PricingController],
        providers: [pricing_service_1.PricingService],
        exports: [pricing_service_1.PricingService],
    })
], PricingModule);
//# sourceMappingURL=pricing.module.js.map