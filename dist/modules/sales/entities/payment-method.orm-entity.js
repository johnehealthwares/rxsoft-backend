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
exports.PaymentMethodOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let PaymentMethodOrmEntity = class PaymentMethodOrmEntity {
    id;
    organizationId;
    code;
    name;
    methodType;
    isActive;
    createdAt;
    updatedAt;
};
exports.PaymentMethodOrmEntity = PaymentMethodOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PaymentMethodOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], PaymentMethodOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PaymentMethodOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PaymentMethodOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'method_type', type: 'text' }),
    __metadata("design:type", String)
], PaymentMethodOrmEntity.prototype, "methodType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], PaymentMethodOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PaymentMethodOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PaymentMethodOrmEntity.prototype, "updatedAt", void 0);
exports.PaymentMethodOrmEntity = PaymentMethodOrmEntity = __decorate([
    (0, typeorm_1.Entity)('payment_methods'),
    (0, typeorm_1.Unique)('uq_payment_methods_org_code', ['organizationId', 'code'])
], PaymentMethodOrmEntity);
//# sourceMappingURL=payment-method.orm-entity.js.map