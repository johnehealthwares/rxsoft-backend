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
exports.GoodsReceiptLineOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const goods_receipt_orm_entity_1 = require("./goods-receipt.orm-entity");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const uom_orm_entity_1 = require("../../sales/entities/uom.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let GoodsReceiptLineOrmEntity = class GoodsReceiptLineOrmEntity {
    id;
    goodsReceipt;
    item;
    itemId;
    orderedQty;
    receivedQty;
    uom;
    uomId;
    unitCost;
    isUnposted;
    createdAt;
    updatedAt;
};
exports.GoodsReceiptLineOrmEntity = GoodsReceiptLineOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GoodsReceiptLineOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => goods_receipt_orm_entity_1.GoodsReceiptOrmEntity, (gr) => gr.lines, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'goods_receipt_id' }),
    __metadata("design:type", goods_receipt_orm_entity_1.GoodsReceiptOrmEntity)
], GoodsReceiptLineOrmEntity.prototype, "goodsReceipt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_orm_entity_1.ItemOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_orm_entity_1.ItemOrmEntity)
], GoodsReceiptLineOrmEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id', type: 'uuid' }),
    __metadata("design:type", String)
], GoodsReceiptLineOrmEntity.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ordered_qty', type: 'decimal', precision: 14, scale: 3, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], GoodsReceiptLineOrmEntity.prototype, "orderedQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_qty', type: 'decimal', precision: 14, scale: 3, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], GoodsReceiptLineOrmEntity.prototype, "receivedQty", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => uom_orm_entity_1.UomOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'uom_id' }),
    __metadata("design:type", uom_orm_entity_1.UomOrmEntity)
], GoodsReceiptLineOrmEntity.prototype, "uom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uom_id', type: 'uuid' }),
    __metadata("design:type", String)
], GoodsReceiptLineOrmEntity.prototype, "uomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_cost', type: 'decimal', precision: 14, scale: 4, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], GoodsReceiptLineOrmEntity.prototype, "unitCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_unposted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], GoodsReceiptLineOrmEntity.prototype, "isUnposted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], GoodsReceiptLineOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], GoodsReceiptLineOrmEntity.prototype, "updatedAt", void 0);
exports.GoodsReceiptLineOrmEntity = GoodsReceiptLineOrmEntity = __decorate([
    (0, typeorm_1.Entity)('goods_receipt_lines')
], GoodsReceiptLineOrmEntity);
//# sourceMappingURL=goods-receipt-line.orm-entity.js.map