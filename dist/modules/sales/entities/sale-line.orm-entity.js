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
exports.SaleLineOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const stock_lot_orm_entity_1 = require("../../inventory/entities/stock-lot.orm-entity");
const sale_orm_entity_1 = require("./sale.orm-entity");
const uom_orm_entity_1 = require("./uom.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let SaleLineOrmEntity = class SaleLineOrmEntity {
    id;
    sale;
    lineNumber;
    item;
    lot;
    uom;
    quantity;
    unitPrice;
    discountPercent;
    taxPercent;
    lineSubtotal;
    lineTotal;
    createdAt;
    updatedAt;
};
exports.SaleLineOrmEntity = SaleLineOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SaleLineOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_orm_entity_1.SaleOrmEntity, (sale) => sale.lines, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", sale_orm_entity_1.SaleOrmEntity)
], SaleLineOrmEntity.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_number', type: 'int' }),
    __metadata("design:type", Number)
], SaleLineOrmEntity.prototype, "lineNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_orm_entity_1.ItemOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_orm_entity_1.ItemOrmEntity)
], SaleLineOrmEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_lot_orm_entity_1.StockLotOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'lot_id' }),
    __metadata("design:type", Object)
], SaleLineOrmEntity.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => uom_orm_entity_1.UomOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'uom_id' }),
    __metadata("design:type", uom_orm_entity_1.UomOrmEntity)
], SaleLineOrmEntity.prototype, "uom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleLineOrmEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleLineOrmEntity.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_percent', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleLineOrmEntity.prototype, "discountPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_percent', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleLineOrmEntity.prototype, "taxPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_subtotal', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleLineOrmEntity.prototype, "lineSubtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_total', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleLineOrmEntity.prototype, "lineTotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SaleLineOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SaleLineOrmEntity.prototype, "updatedAt", void 0);
exports.SaleLineOrmEntity = SaleLineOrmEntity = __decorate([
    (0, typeorm_1.Entity)('sale_lines')
], SaleLineOrmEntity);
//# sourceMappingURL=sale-line.orm-entity.js.map