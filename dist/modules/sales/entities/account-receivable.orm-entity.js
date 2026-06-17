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
exports.AccountReceivableOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const sale_orm_entity_1 = require("./sale.orm-entity");
const party_orm_entity_1 = require("../../customers/entities/party.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let AccountReceivableOrmEntity = class AccountReceivableOrmEntity {
    id;
    organizationId;
    customer;
    customerId;
    sale;
    saleId;
    receivableNumber;
    originalAmount;
    outstandingAmount;
    status;
    openedAt;
    closedAt;
    createdAt;
    updatedAt;
};
exports.AccountReceivableOrmEntity = AccountReceivableOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AccountReceivableOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], AccountReceivableOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => party_orm_entity_1.PartyOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", party_orm_entity_1.PartyOrmEntity)
], AccountReceivableOrmEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'text' }),
    __metadata("design:type", String)
], AccountReceivableOrmEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_orm_entity_1.SaleOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", sale_orm_entity_1.SaleOrmEntity)
], AccountReceivableOrmEntity.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_id', type: 'text' }),
    __metadata("design:type", String)
], AccountReceivableOrmEntity.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receivable_number', type: 'text' }),
    __metadata("design:type", String)
], AccountReceivableOrmEntity.prototype, "receivableNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_amount', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], AccountReceivableOrmEntity.prototype, "originalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'outstanding_amount', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], AccountReceivableOrmEntity.prototype, "outstandingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AccountReceivableOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'opened_at' }),
    __metadata("design:type", Date)
], AccountReceivableOrmEntity.prototype, "openedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'closed_at', nullable: true }),
    __metadata("design:type", Object)
], AccountReceivableOrmEntity.prototype, "closedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AccountReceivableOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], AccountReceivableOrmEntity.prototype, "updatedAt", void 0);
exports.AccountReceivableOrmEntity = AccountReceivableOrmEntity = __decorate([
    (0, typeorm_1.Entity)('accounts_receivable'),
    (0, typeorm_1.Unique)('uq_accounts_receivable_org_number', ['organizationId', 'receivableNumber'])
], AccountReceivableOrmEntity);
//# sourceMappingURL=account-receivable.orm-entity.js.map