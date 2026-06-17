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
exports.JournalEntryLineOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const journal_entry_orm_entity_1 = require("./journal-entry.orm-entity");
let JournalEntryLineOrmEntity = class JournalEntryLineOrmEntity {
    id;
    journalEntryId;
    journalEntry;
    lineNumber;
    glAccountId;
    partyId;
    itemId;
    debitAmount;
    creditAmount;
    description;
    createdAt;
};
exports.JournalEntryLineOrmEntity = JournalEntryLineOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JournalEntryLineOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'journal_entry_id', type: 'uuid' }),
    __metadata("design:type", String)
], JournalEntryLineOrmEntity.prototype, "journalEntryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => journal_entry_orm_entity_1.JournalEntryOrmEntity, (journalEntry) => journalEntry.lines, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'journal_entry_id' }),
    __metadata("design:type", journal_entry_orm_entity_1.JournalEntryOrmEntity)
], JournalEntryLineOrmEntity.prototype, "journalEntry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_number', type: 'int' }),
    __metadata("design:type", Number)
], JournalEntryLineOrmEntity.prototype, "lineNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gl_account_id', type: 'uuid' }),
    __metadata("design:type", String)
], JournalEntryLineOrmEntity.prototype, "glAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'party_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], JournalEntryLineOrmEntity.prototype, "partyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], JournalEntryLineOrmEntity.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'debit_amount', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], JournalEntryLineOrmEntity.prototype, "debitAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_amount', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], JournalEntryLineOrmEntity.prototype, "creditAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JournalEntryLineOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JournalEntryLineOrmEntity.prototype, "createdAt", void 0);
exports.JournalEntryLineOrmEntity = JournalEntryLineOrmEntity = __decorate([
    (0, typeorm_1.Entity)('journal_entry_lines'),
    (0, typeorm_1.Unique)('uq_journal_entry_lines_number', ['journalEntryId', 'lineNumber'])
], JournalEntryLineOrmEntity);
//# sourceMappingURL=journal-entry-line.orm-entity.js.map