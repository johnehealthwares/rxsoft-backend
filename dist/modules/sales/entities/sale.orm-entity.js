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
exports.SaleOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const sale_line_orm_entity_1 = require("./sale-line.orm-entity");
const sale_payment_orm_entity_1 = require("./sale-payment.orm-entity");
const sale_refund_orm_entity_1 = require("./sale-refund.orm-entity");
const party_orm_entity_1 = require("../../customers/entities/party.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
let SaleOrmEntity = class SaleOrmEntity {
    id;
    organizationId;
    saleNumber;
    saleChannel;
    storeId;
    customer;
    customerId;
    status;
    notes;
    stockLocationId;
    subtotalAmount;
    discountAmount;
    taxAmount;
    totalAmount;
    paidAmount;
    changeAmount;
    saleDate;
    soldByUserId;
    createdBy;
    lines;
    payments;
    refunds;
    createdAt;
    updatedAt;
};
exports.SaleOrmEntity = SaleOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_number', type: 'text' }),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "saleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_channel', type: 'text' }),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "saleChannel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'text' }),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => party_orm_entity_1.PartyOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", Object)
], SaleOrmEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SaleOrmEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SaleOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_location_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SaleOrmEntity.prototype, "stockLocationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subtotal_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleOrmEntity.prototype, "subtotalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleOrmEntity.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleOrmEntity.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleOrmEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleOrmEntity.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'change_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleOrmEntity.prototype, "changeAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'sale_date' }),
    __metadata("design:type", Date)
], SaleOrmEntity.prototype, "saleDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sold_by_user_id', type: 'text' }),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "soldByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id', type: 'text', default: persistence_scope_1.DEFAULT_SYSTEM_USER_ID }),
    __metadata("design:type", String)
], SaleOrmEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_line_orm_entity_1.SaleLineOrmEntity, (line) => line.sale),
    __metadata("design:type", Array)
], SaleOrmEntity.prototype, "lines", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_payment_orm_entity_1.SalePaymentOrmEntity, (payment) => payment.sale),
    __metadata("design:type", Array)
], SaleOrmEntity.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_refund_orm_entity_1.SaleRefundOrmEntity, (refund) => refund.sale),
    __metadata("design:type", Array)
], SaleOrmEntity.prototype, "refunds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SaleOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SaleOrmEntity.prototype, "updatedAt", void 0);
exports.SaleOrmEntity = SaleOrmEntity = __decorate([
    (0, typeorm_1.Entity)('sales')
], SaleOrmEntity);
//# sourceMappingURL=sale.orm-entity.js.map