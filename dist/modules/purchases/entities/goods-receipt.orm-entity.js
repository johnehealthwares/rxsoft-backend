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
exports.GoodsReceiptOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const goods_receipt_line_orm_entity_1 = require("./goods-receipt-line.orm-entity");
const purchase_order_orm_entity_1 = require("./purchase-order.orm-entity");
let GoodsReceiptOrmEntity = class GoodsReceiptOrmEntity {
    id;
    organizationId;
    receiptNumber;
    purchaseOrder;
    receivedDate;
    createdByUserId;
    note;
    lines;
    createdAt;
    updatedAt;
};
exports.GoodsReceiptOrmEntity = GoodsReceiptOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GoodsReceiptOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], GoodsReceiptOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receipt_number', type: 'text' }),
    __metadata("design:type", String)
], GoodsReceiptOrmEntity.prototype, "receiptNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_order_orm_entity_1.PurchaseOrderOrmEntity, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_order_id' }),
    __metadata("design:type", purchase_order_orm_entity_1.PurchaseOrderOrmEntity)
], GoodsReceiptOrmEntity.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_date' }),
    __metadata("design:type", Date)
], GoodsReceiptOrmEntity.prototype, "receivedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id', type: 'text' }),
    __metadata("design:type", String)
], GoodsReceiptOrmEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], GoodsReceiptOrmEntity.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goods_receipt_line_orm_entity_1.GoodsReceiptLineOrmEntity, (line) => line.goodsReceipt),
    __metadata("design:type", Array)
], GoodsReceiptOrmEntity.prototype, "lines", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], GoodsReceiptOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], GoodsReceiptOrmEntity.prototype, "updatedAt", void 0);
exports.GoodsReceiptOrmEntity = GoodsReceiptOrmEntity = __decorate([
    (0, typeorm_1.Entity)('goods_receipts')
], GoodsReceiptOrmEntity);
//# sourceMappingURL=goods-receipt.orm-entity.js.map