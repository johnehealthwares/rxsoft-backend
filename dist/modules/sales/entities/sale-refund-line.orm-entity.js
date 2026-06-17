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
exports.SaleRefundLineOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const sale_line_orm_entity_1 = require("./sale-line.orm-entity");
const sale_refund_orm_entity_1 = require("./sale-refund.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let SaleRefundLineOrmEntity = class SaleRefundLineOrmEntity {
    id;
    refund;
    saleLine;
    quantity;
    unitPrice;
    lineTotal;
    createdAt;
    updatedAt;
};
exports.SaleRefundLineOrmEntity = SaleRefundLineOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SaleRefundLineOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_refund_orm_entity_1.SaleRefundOrmEntity, (refund) => refund.lines, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'refund_id' }),
    __metadata("design:type", sale_refund_orm_entity_1.SaleRefundOrmEntity)
], SaleRefundLineOrmEntity.prototype, "refund", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_line_orm_entity_1.SaleLineOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_line_id' }),
    __metadata("design:type", sale_line_orm_entity_1.SaleLineOrmEntity)
], SaleRefundLineOrmEntity.prototype, "saleLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleRefundLineOrmEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleRefundLineOrmEntity.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_total', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleRefundLineOrmEntity.prototype, "lineTotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SaleRefundLineOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SaleRefundLineOrmEntity.prototype, "updatedAt", void 0);
exports.SaleRefundLineOrmEntity = SaleRefundLineOrmEntity = __decorate([
    (0, typeorm_1.Entity)('sale_refund_lines')
], SaleRefundLineOrmEntity);
//# sourceMappingURL=sale-refund-line.orm-entity.js.map