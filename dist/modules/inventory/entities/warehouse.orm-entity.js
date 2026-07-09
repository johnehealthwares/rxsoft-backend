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
exports.WarehouseOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let WarehouseOrmEntity = class WarehouseOrmEntity {
    id;
    organizationId;
    storeId;
    code;
    name;
    address;
    stockLocations;
    isActive;
    createdAt;
    updatedAt;
};
exports.WarehouseOrmEntity = WarehouseOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WarehouseOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], WarehouseOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WarehouseOrmEntity.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WarehouseOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WarehouseOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WarehouseOrmEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('StockLocationOrmEntity', 'warehouse'),
    __metadata("design:type", Array)
], WarehouseOrmEntity.prototype, "stockLocations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], WarehouseOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WarehouseOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], WarehouseOrmEntity.prototype, "updatedAt", void 0);
exports.WarehouseOrmEntity = WarehouseOrmEntity = __decorate([
    (0, typeorm_1.Entity)('warehouses'),
    (0, typeorm_1.Unique)('uq_warehouses_org_code', ['organizationId', 'code'])
], WarehouseOrmEntity);
//# sourceMappingURL=warehouse.orm-entity.js.map