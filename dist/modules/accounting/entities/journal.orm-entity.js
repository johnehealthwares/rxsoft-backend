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
exports.JournalOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let JournalOrmEntity = class JournalOrmEntity {
    id;
    organizationId;
    code;
    name;
    journalType;
    defaultDebitAccountId;
    defaultCreditAccountId;
    isActive;
    entries;
    createdAt;
    updatedAt;
};
exports.JournalOrmEntity = JournalOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JournalOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], JournalOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], JournalOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], JournalOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'journal_type', type: 'text' }),
    __metadata("design:type", String)
], JournalOrmEntity.prototype, "journalType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_debit_account_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], JournalOrmEntity.prototype, "defaultDebitAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_credit_account_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], JournalOrmEntity.prototype, "defaultCreditAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], JournalOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('JournalEntryOrmEntity', 'journal'),
    __metadata("design:type", Array)
], JournalOrmEntity.prototype, "entries", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JournalOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], JournalOrmEntity.prototype, "updatedAt", void 0);
exports.JournalOrmEntity = JournalOrmEntity = __decorate([
    (0, typeorm_1.Entity)('journals'),
    (0, typeorm_1.Unique)('uq_journals_org_code', ['organizationId', 'code'])
], JournalOrmEntity);
//# sourceMappingURL=journal.orm-entity.js.map