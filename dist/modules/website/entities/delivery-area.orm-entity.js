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
exports.DeliveryAreaOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let DeliveryAreaOrmEntity = class DeliveryAreaOrmEntity {
    id;
    state;
    city;
    deliveryFee;
    minOrderAmount;
    freeDeliveryAbove;
    estimatedDeliveryHours;
    isActive;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.DeliveryAreaOrmEntity = DeliveryAreaOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeliveryAreaOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DeliveryAreaOrmEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DeliveryAreaOrmEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivery_fee', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DeliveryAreaOrmEntity.prototype, "deliveryFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_order_amount', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DeliveryAreaOrmEntity.prototype, "minOrderAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'free_delivery_above', type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], DeliveryAreaOrmEntity.prototype, "freeDeliveryAbove", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimated_delivery_hours', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], DeliveryAreaOrmEntity.prototype, "estimatedDeliveryHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], DeliveryAreaOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DeliveryAreaOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DeliveryAreaOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], DeliveryAreaOrmEntity.prototype, "deletedAt", void 0);
exports.DeliveryAreaOrmEntity = DeliveryAreaOrmEntity = __decorate([
    (0, typeorm_1.Entity)('delivery_areas')
], DeliveryAreaOrmEntity);
//# sourceMappingURL=delivery-area.orm-entity.js.map