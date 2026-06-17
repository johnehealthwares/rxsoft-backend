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
exports.PurchaseOrderOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const warehouse_orm_entity_1 = require("../../inventory/entities/warehouse.orm-entity");
const party_orm_entity_1 = require("../../customers/entities/party.orm-entity");
const purchase_order_line_orm_entity_1 = require("./purchase-order-line.orm-entity");
let PurchaseOrderOrmEntity = class PurchaseOrderOrmEntity {
    id;
    organizationId;
    purchaseOrderNumber;
    supplierId;
    warehouseId;
    currencyCode;
    orderDate;
    expectedDate;
    status;
    subtotalAmount;
    taxAmount;
    totalAmount;
    createdByUserId;
    approvedByUserId;
    approvedAt;
    note;
    warehouse;
    supplier;
    lines;
    createdAt;
    updatedAt;
};
exports.PurchaseOrderOrmEntity = PurchaseOrderOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_order_number', type: 'text' }),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "purchaseOrderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_id', type: 'uuid' }),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'warehouse_id', type: 'uuid' }),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "warehouseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code', type: 'text', default: 'NGN' }),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "currencyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_date', type: 'date' }),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrderOrmEntity.prototype, "expectedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'text' }),
    __metadata("design:type", String)
], PurchaseOrderOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subtotal_amount', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderOrmEntity.prototype, "subtotalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_amount', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderOrmEntity.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderOrmEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrderOrmEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by_user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrderOrmEntity.prototype, "approvedByUserId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'approved_at', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrderOrmEntity.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrderOrmEntity.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => warehouse_orm_entity_1.WarehouseOrmEntity),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_id' }),
    __metadata("design:type", Object)
], PurchaseOrderOrmEntity.prototype, "warehouse", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => party_orm_entity_1.PartyOrmEntity),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id' }),
    __metadata("design:type", Object)
], PurchaseOrderOrmEntity.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_order_line_orm_entity_1.PurchaseOrderLineOrmEntity, (line) => line.purchaseOrder),
    __metadata("design:type", Array)
], PurchaseOrderOrmEntity.prototype, "lines", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PurchaseOrderOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PurchaseOrderOrmEntity.prototype, "updatedAt", void 0);
exports.PurchaseOrderOrmEntity = PurchaseOrderOrmEntity = __decorate([
    (0, typeorm_1.Entity)('purchase_orders'),
    (0, typeorm_1.Unique)('uq_purchase_orders_org_number', ['organizationId', 'purchaseOrderNumber'])
], PurchaseOrderOrmEntity);
//# sourceMappingURL=purchase-order.orm-entity.js.map