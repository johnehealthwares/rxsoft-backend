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
exports.StockLocationOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let StockLocationOrmEntity = class StockLocationOrmEntity {
    id;
    organizationId;
    warehouseId;
    warehouse;
    parentId;
    parent;
    children;
    code;
    name;
    locationType;
    isActive;
    stockBalances;
    createdAt;
    updatedAt;
};
exports.StockLocationOrmEntity = StockLocationOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StockLocationOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], StockLocationOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'warehouse_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StockLocationOrmEntity.prototype, "warehouseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('WarehouseOrmEntity', 'stockLocations', { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_id' }),
    __metadata("design:type", Object)
], StockLocationOrmEntity.prototype, "warehouse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StockLocationOrmEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => StockLocationOrmEntity, (location) => location.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Object)
], StockLocationOrmEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StockLocationOrmEntity, (location) => location.parent),
    __metadata("design:type", Array)
], StockLocationOrmEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StockLocationOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StockLocationOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location_type', type: 'text', default: 'internal' }),
    __metadata("design:type", String)
], StockLocationOrmEntity.prototype, "locationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], StockLocationOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('StockBalanceOrmEntity', 'location'),
    __metadata("design:type", Array)
], StockLocationOrmEntity.prototype, "stockBalances", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StockLocationOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StockLocationOrmEntity.prototype, "updatedAt", void 0);
exports.StockLocationOrmEntity = StockLocationOrmEntity = __decorate([
    (0, typeorm_1.Entity)('stock_locations'),
    (0, typeorm_1.Unique)('uq_stock_locations_org_name', ['organizationId', 'name'])
], StockLocationOrmEntity);
//# sourceMappingURL=stock-location.orm-entity.js.map