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
exports.SalePaymentOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_orm_entity_1 = require("../../identity/entities/user.orm-entity");
const payment_method_orm_entity_1 = require("./payment-method.orm-entity");
const sale_orm_entity_1 = require("./sale.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let SalePaymentOrmEntity = class SalePaymentOrmEntity {
    id;
    sale;
    paymentMethod;
    amount;
    paymentReference;
    paidAt;
    receivedByUser;
    createdAt;
    updatedAt;
};
exports.SalePaymentOrmEntity = SalePaymentOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SalePaymentOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_orm_entity_1.SaleOrmEntity, (sale) => sale.payments, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", sale_orm_entity_1.SaleOrmEntity)
], SalePaymentOrmEntity.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_method_orm_entity_1.PaymentMethodOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'payment_method_id' }),
    __metadata("design:type", payment_method_orm_entity_1.PaymentMethodOrmEntity)
], SalePaymentOrmEntity.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], SalePaymentOrmEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_reference', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SalePaymentOrmEntity.prototype, "paymentReference", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'paid_at' }),
    __metadata("design:type", Date)
], SalePaymentOrmEntity.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'received_by_user_id' }),
    __metadata("design:type", Object)
], SalePaymentOrmEntity.prototype, "receivedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SalePaymentOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SalePaymentOrmEntity.prototype, "updatedAt", void 0);
exports.SalePaymentOrmEntity = SalePaymentOrmEntity = __decorate([
    (0, typeorm_1.Entity)('sale_payments')
], SalePaymentOrmEntity);
//# sourceMappingURL=sale-payment.orm-entity.js.map