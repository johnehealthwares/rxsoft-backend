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
exports.DeliveryOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let DeliveryOrmEntity = class DeliveryOrmEntity {
    id;
    order;
    address;
    city;
    state;
    phone;
    shippingMethod;
    trackingNumber;
    status;
    notes;
    deliveredAt;
    createdAt;
    updatedAt;
};
exports.DeliveryOrmEntity = DeliveryOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)('OrderOrmEntity', 'delivery', { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", Function)
], DeliveryOrmEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DeliveryOrmEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DeliveryOrmEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DeliveryOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_method', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DeliveryOrmEntity.prototype, "shippingMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_number', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DeliveryOrmEntity.prototype, "trackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'pending' }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DeliveryOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivered_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], DeliveryOrmEntity.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DeliveryOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DeliveryOrmEntity.prototype, "updatedAt", void 0);
exports.DeliveryOrmEntity = DeliveryOrmEntity = __decorate([
    (0, typeorm_1.Entity)('website_deliveries')
], DeliveryOrmEntity);
//# sourceMappingURL=delivery.orm-entity.js.map