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
exports.GlAccountOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let GlAccountOrmEntity = class GlAccountOrmEntity {
    id;
    organizationId;
    accountCode;
    accountName;
    accountType;
    allowsReconciliation;
    isActive;
    createdAt;
    updatedAt;
};
exports.GlAccountOrmEntity = GlAccountOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GlAccountOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], GlAccountOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_code', type: 'text' }),
    __metadata("design:type", String)
], GlAccountOrmEntity.prototype, "accountCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_name', type: 'text' }),
    __metadata("design:type", String)
], GlAccountOrmEntity.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_type', type: 'text' }),
    __metadata("design:type", String)
], GlAccountOrmEntity.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allows_reconciliation', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], GlAccountOrmEntity.prototype, "allowsReconciliation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], GlAccountOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], GlAccountOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], GlAccountOrmEntity.prototype, "updatedAt", void 0);
exports.GlAccountOrmEntity = GlAccountOrmEntity = __decorate([
    (0, typeorm_1.Entity)('gl_accounts'),
    (0, typeorm_1.Unique)('uq_gl_accounts_org_code', ['organizationId', 'accountCode'])
], GlAccountOrmEntity);
//# sourceMappingURL=gl-account.orm-entity.js.map