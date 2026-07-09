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
exports.PurchaseOrderLineOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const uom_orm_entity_1 = require("../../sales/entities/uom.orm-entity");
let PurchaseOrderLineOrmEntity = class PurchaseOrderLineOrmEntity {
    id;
    purchaseOrder;
    item;
    itemId;
    orderedQty;
    receivedQty;
    uom;
    uomId;
    unitCost;
    discountPercent;
    taxPercent;
    lineSubtotal;
    lineTotal;
    createdAt;
    updatedAt;
};
exports.PurchaseOrderLineOrmEntity = PurchaseOrderLineOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PurchaseOrderLineOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('PurchaseOrderOrmEntity', 'lines', { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_order_id' }),
    __metadata("design:type", Function)
], PurchaseOrderLineOrmEntity.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_orm_entity_1.ItemOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_orm_entity_1.ItemOrmEntity)
], PurchaseOrderLineOrmEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id', type: 'uuid' }),
    __metadata("design:type", String)
], PurchaseOrderLineOrmEntity.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ordered_qty', type: 'numeric', precision: 14, scale: 3 }),
    __metadata("design:type", Number)
], PurchaseOrderLineOrmEntity.prototype, "orderedQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_qty', type: 'numeric', precision: 14, scale: 3, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLineOrmEntity.prototype, "receivedQty", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => uom_orm_entity_1.UomOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'uom_id' }),
    __metadata("design:type", uom_orm_entity_1.UomOrmEntity)
], PurchaseOrderLineOrmEntity.prototype, "uom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uom_id', type: 'uuid' }),
    __metadata("design:type", String)
], PurchaseOrderLineOrmEntity.prototype, "uomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_cost', type: 'numeric', precision: 14, scale: 4 }),
    __metadata("design:type", Number)
], PurchaseOrderLineOrmEntity.prototype, "unitCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_percent', type: 'numeric', precision: 8, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLineOrmEntity.prototype, "discountPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_percent', type: 'numeric', precision: 8, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLineOrmEntity.prototype, "taxPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_subtotal', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLineOrmEntity.prototype, "lineSubtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_total', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLineOrmEntity.prototype, "lineTotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PurchaseOrderLineOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PurchaseOrderLineOrmEntity.prototype, "updatedAt", void 0);
exports.PurchaseOrderLineOrmEntity = PurchaseOrderLineOrmEntity = __decorate([
    (0, typeorm_1.Entity)('purchase_order_lines')
], PurchaseOrderLineOrmEntity);
//# sourceMappingURL=purchase-order-line.orm-entity.js.map