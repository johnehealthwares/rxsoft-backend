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
exports.OrderOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const order_item_orm_entity_1 = require("./order-item.orm-entity");
const delivery_orm_entity_1 = require("./delivery.orm-entity");
const sale_orm_entity_1 = require("../../sales/entities/sale.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let OrderOrmEntity = class OrderOrmEntity {
    id;
    orderNumber;
    customerId;
    paymentMethod;
    notes;
    orderStatus;
    saleId;
    sale;
    createdBy;
    subtotalAmount;
    totalAmount;
    items;
    delivery;
    createdAt;
    updatedAt;
};
exports.OrderOrmEntity = OrderOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_number', type: 'text' }),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "orderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method', type: 'text' }),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_status', type: 'text', default: 'pending' }),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "orderStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_orm_entity_1.SaleOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subtotal_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], OrderOrmEntity.prototype, "subtotalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], OrderOrmEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_orm_entity_1.OrderItemOrmEntity, (item) => item.order),
    __metadata("design:type", Array)
], OrderOrmEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => delivery_orm_entity_1.DeliveryOrmEntity, (delivery) => delivery.order),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrderOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], OrderOrmEntity.prototype, "updatedAt", void 0);
exports.OrderOrmEntity = OrderOrmEntity = __decorate([
    (0, typeorm_1.Entity)('website_orders')
], OrderOrmEntity);
//# sourceMappingURL=order.orm-entity.js.map