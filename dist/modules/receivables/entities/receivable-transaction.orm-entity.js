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
exports.ReceivableTransactionOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const payment_method_orm_entity_1 = require("../../sales/entities/payment-method.orm-entity");
const account_receivable_orm_entity_1 = require("../../sales/entities/account-receivable.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let ReceivableTransactionOrmEntity = class ReceivableTransactionOrmEntity {
    id;
    receivable;
    transactionType;
    amount;
    transactionDate;
    paymentMethod;
    referenceNumber;
    receivedByUserId;
    note;
    createdAt;
    updatedAt;
};
exports.ReceivableTransactionOrmEntity = ReceivableTransactionOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReceivableTransactionOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_receivable_orm_entity_1.AccountReceivableOrmEntity, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'receivable_id' }),
    __metadata("design:type", account_receivable_orm_entity_1.AccountReceivableOrmEntity)
], ReceivableTransactionOrmEntity.prototype, "receivable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_type', type: 'text' }),
    __metadata("design:type", String)
], ReceivableTransactionOrmEntity.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], ReceivableTransactionOrmEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'transaction_date' }),
    __metadata("design:type", Date)
], ReceivableTransactionOrmEntity.prototype, "transactionDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_method_orm_entity_1.PaymentMethodOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'payment_method_id' }),
    __metadata("design:type", Object)
], ReceivableTransactionOrmEntity.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_number', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ReceivableTransactionOrmEntity.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_by_user_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ReceivableTransactionOrmEntity.prototype, "receivedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ReceivableTransactionOrmEntity.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ReceivableTransactionOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ReceivableTransactionOrmEntity.prototype, "updatedAt", void 0);
exports.ReceivableTransactionOrmEntity = ReceivableTransactionOrmEntity = __decorate([
    (0, typeorm_1.Entity)('receivable_transactions')
], ReceivableTransactionOrmEntity);
//# sourceMappingURL=receivable-transaction.orm-entity.js.map