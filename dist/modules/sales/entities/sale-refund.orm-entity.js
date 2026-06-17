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
exports.SaleRefundOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_orm_entity_1 = require("../../identity/entities/user.orm-entity");
const sale_orm_entity_1 = require("./sale.orm-entity");
const sale_refund_line_orm_entity_1 = require("./sale-refund-line.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let SaleRefundOrmEntity = class SaleRefundOrmEntity {
    id;
    organizationId;
    sale;
    refundNumber;
    status;
    totalAmount;
    refundDate;
    reason;
    refundedByUser;
    lines;
    createdAt;
    updatedAt;
};
exports.SaleRefundOrmEntity = SaleRefundOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SaleRefundOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], SaleRefundOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_orm_entity_1.SaleOrmEntity, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", sale_orm_entity_1.SaleOrmEntity)
], SaleRefundOrmEntity.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refund_number', type: 'text' }),
    __metadata("design:type", String)
], SaleRefundOrmEntity.prototype, "refundNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], SaleRefundOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SaleRefundOrmEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'refund_date' }),
    __metadata("design:type", Date)
], SaleRefundOrmEntity.prototype, "refundDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SaleRefundOrmEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'refunded_by_user_id' }),
    __metadata("design:type", user_orm_entity_1.UserOrmEntity)
], SaleRefundOrmEntity.prototype, "refundedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_refund_line_orm_entity_1.SaleRefundLineOrmEntity, (line) => line.refund),
    __metadata("design:type", Array)
], SaleRefundOrmEntity.prototype, "lines", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SaleRefundOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SaleRefundOrmEntity.prototype, "updatedAt", void 0);
exports.SaleRefundOrmEntity = SaleRefundOrmEntity = __decorate([
    (0, typeorm_1.Entity)('sale_refunds'),
    (0, typeorm_1.Unique)('uq_sale_refunds_org_number', ['organizationId', 'refundNumber'])
], SaleRefundOrmEntity);
//# sourceMappingURL=sale-refund.orm-entity.js.map