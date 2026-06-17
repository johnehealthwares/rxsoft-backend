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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreStockLocationOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const stock_location_orm_entity_1 = require("./stock-location.orm-entity");
let StoreStockLocationOrmEntity = class StoreStockLocationOrmEntity {
    id;
    organizationId;
    storeId;
    purpose;
    stockLocation;
    isActive;
    createdAt;
    updatedAt;
};
exports.StoreStockLocationOrmEntity = StoreStockLocationOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StoreStockLocationOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], StoreStockLocationOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'text' }),
    __metadata("design:type", String)
], StoreStockLocationOrmEntity.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StoreStockLocationOrmEntity.prototype, "purpose", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_location_orm_entity_1.StockLocationOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'stock_location_id' }),
    __metadata("design:type", stock_location_orm_entity_1.StockLocationOrmEntity)
], StoreStockLocationOrmEntity.prototype, "stockLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], StoreStockLocationOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StoreStockLocationOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StoreStockLocationOrmEntity.prototype, "updatedAt", void 0);
exports.StoreStockLocationOrmEntity = StoreStockLocationOrmEntity = __decorate([
    (0, typeorm_1.Entity)('store_stock_locations'),
    (0, typeorm_1.Unique)('uq_store_stock_locations_org_store_purpose', ['organizationId', 'storeId', 'purpose'])
], StoreStockLocationOrmEntity);
//# sourceMappingURL=store-stock-location.orm-entity.js.map