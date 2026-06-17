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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const accounting_dto_1 = require("../dto/accounting.dto");
const accounting_service_1 = require("../services/accounting.service");
let AccountingController = class AccountingController {
    accountingService;
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    async listJournals(query, currentUser) {
        const result = await this.accountingService.listJournals(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async getJournal(journalId, currentUser) {
        return this.accountingService.getJournal(journalId, currentUser.organizationId);
    }
    async createJournal(payload, currentUser) {
        return this.accountingService.createJournal(payload, currentUser.organizationId);
    }
    async updateJournal(journalId, payload, currentUser) {
        return this.accountingService.updateJournal(journalId, payload, currentUser.organizationId);
    }
    async removeJournal(journalId, currentUser) {
        await this.accountingService.removeJournal(journalId, currentUser.organizationId);
    }
    async listJournalEntries(query, currentUser) {
        const result = await this.accountingService.listJournalEntries(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async getJournalEntry(entryId, currentUser) {
        return this.accountingService.getJournalEntry(entryId, currentUser.organizationId);
    }
    async createJournalEntry(payload, currentUser) {
        return this.accountingService.createJournalEntry(payload, currentUser);
    }
    async updateJournalEntry(entryId, payload, currentUser) {
        return this.accountingService.updateJournalEntry(entryId, payload, currentUser);
    }
    async removeJournalEntry(entryId, currentUser) {
        await this.accountingService.removeJournalEntry(entryId, currentUser.organizationId);
    }
    async listJournalEntryLines(entryId, query, currentUser) {
        const result = await this.accountingService.listJournalEntryLines(entryId, query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async createJournalEntryLine(entryId, payload, currentUser) {
        return this.accountingService.createJournalEntryLine(entryId, payload, currentUser.organizationId);
    }
    async updateJournalEntryLine(entryId, lineId, payload, currentUser) {
        return this.accountingService.updateJournalEntryLine(entryId, lineId, payload, currentUser.organizationId);
    }
    async removeJournalEntryLine(entryId, lineId, currentUser) {
        await this.accountingService.removeJournalEntryLine(entryId, lineId, currentUser.organizationId);
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('journals'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'auditor'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_dto_1.ListJournalsDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "listJournals", null);
__decorate([
    (0, common_1.Get)('journals/:journalId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'auditor'),
    __param(0, (0, common_1.Param)('journalId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getJournal", null);
__decorate([
    (0, common_1.Post)('journals'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_dto_1.CreateJournalDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "createJournal", null);
__decorate([
    (0, common_1.Patch)('journals/:journalId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal.update'),
    __param(0, (0, common_1.Param)('journalId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, accounting_dto_1.UpdateJournalDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "updateJournal", null);
__decorate([
    (0, common_1.Delete)('journals/:journalId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal.delete'),
    __param(0, (0, common_1.Param)('journalId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "removeJournal", null);
__decorate([
    (0, common_1.Get)('journal-entries'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'auditor'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_dto_1.ListJournalEntriesDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "listJournalEntries", null);
__decorate([
    (0, common_1.Get)('journal-entries/:entryId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'auditor'),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getJournalEntry", null);
__decorate([
    (0, common_1.Post)('journal-entries'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal_entry.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_dto_1.CreateJournalEntryDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "createJournalEntry", null);
__decorate([
    (0, common_1.Patch)('journal-entries/:entryId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal_entry.update'),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, accounting_dto_1.UpdateJournalEntryDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "updateJournalEntry", null);
__decorate([
    (0, common_1.Delete)('journal-entries/:entryId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal_entry.delete'),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "removeJournalEntry", null);
__decorate([
    (0, common_1.Get)('journal-entries/:entryId/lines'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'auditor'),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, accounting_dto_1.ListJournalEntryLinesDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "listJournalEntryLines", null);
__decorate([
    (0, common_1.Post)('journal-entries/:entryId/lines'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal_entry_line.create'),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, accounting_dto_1.CreateJournalEntryLineDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "createJournalEntryLine", null);
__decorate([
    (0, common_1.Patch)('journal-entries/:entryId/lines/:lineId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal_entry_line.update'),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, common_1.Param)('lineId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, accounting_dto_1.UpdateJournalEntryLineDto, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "updateJournalEntryLine", null);
__decorate([
    (0, common_1.Delete)('journal-entries/:entryId/lines/:lineId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('accounting.journal_entry_line.delete'),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, common_1.Param)('lineId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "removeJournalEntryLine", null);
exports.AccountingController = AccountingController = __decorate([
    (0, swagger_1.ApiTags)('accounting'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingController);
//# sourceMappingURL=accounting.controller.js.map