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
exports.JournalEntryOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
const journal_orm_entity_1 = require("./journal.orm-entity");
const journal_entry_line_orm_entity_1 = require("./journal-entry-line.orm-entity");
let JournalEntryOrmEntity = class JournalEntryOrmEntity {
    id;
    organizationId;
    journalId;
    journal;
    entryNumber;
    entryDate;
    reference;
    sourceType;
    sourceId;
    status;
    createdByUserId;
    postedAt;
    lines;
    createdAt;
    updatedAt;
};
exports.JournalEntryOrmEntity = JournalEntryOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JournalEntryOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], JournalEntryOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'journal_id', type: 'uuid' }),
    __metadata("design:type", String)
], JournalEntryOrmEntity.prototype, "journalId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => journal_orm_entity_1.JournalOrmEntity, (journal) => journal.entries, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'journal_id' }),
    __metadata("design:type", journal_orm_entity_1.JournalOrmEntity)
], JournalEntryOrmEntity.prototype, "journal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entry_number', type: 'text' }),
    __metadata("design:type", String)
], JournalEntryOrmEntity.prototype, "entryNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entry_date', type: 'date' }),
    __metadata("design:type", String)
], JournalEntryOrmEntity.prototype, "entryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JournalEntryOrmEntity.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'source_type', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JournalEntryOrmEntity.prototype, "sourceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'source_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], JournalEntryOrmEntity.prototype, "sourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], JournalEntryOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], JournalEntryOrmEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'posted_at', nullable: true, type: 'text', transformer: column_transformer_1.DateOrNullTransformer }),
    __metadata("design:type", Object)
], JournalEntryOrmEntity.prototype, "postedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => journal_entry_line_orm_entity_1.JournalEntryLineOrmEntity, (line) => line.journalEntry),
    __metadata("design:type", Array)
], JournalEntryOrmEntity.prototype, "lines", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JournalEntryOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], JournalEntryOrmEntity.prototype, "updatedAt", void 0);
exports.JournalEntryOrmEntity = JournalEntryOrmEntity = __decorate([
    (0, typeorm_1.Entity)('journal_entries'),
    (0, typeorm_1.Unique)('uq_journal_entries_org_number', ['organizationId', 'entryNumber'])
], JournalEntryOrmEntity);
//# sourceMappingURL=journal-entry.orm-entity.js.map