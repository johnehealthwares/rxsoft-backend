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
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mappers_1 = require("../../../shared/domain/mappers");
const entities_1 = require("../entities");
const code_validation_1 = require("../../../shared/utils/code-validation");
let AccountingService = class AccountingService {
    glAccountRepository;
    journalRepository;
    journalEntryRepository;
    journalEntryLineRepository;
    constructor(glAccountRepository, journalRepository, journalEntryRepository, journalEntryLineRepository) {
        this.glAccountRepository = glAccountRepository;
        this.journalRepository = journalRepository;
        this.journalEntryRepository = journalEntryRepository;
        this.journalEntryLineRepository = journalEntryLineRepository;
    }
    async listJournals(query, organizationId) {
        const qb = this.journalRepository
            .createQueryBuilder('journal')
            .where('journal.organization_id = :organizationId', { organizationId })
            .orderBy('journal.updated_at', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(journal.code ILIKE :search OR journal.name ILIKE :search)', { search: `%${query.search}%` });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toJournalType), total };
    }
    async getJournal(id, organizationId) {
        const journal = await this.journalRepository.findOne({ where: { id, organizationId } });
        if (!journal)
            throw new common_1.NotFoundException('Journal not found');
        return (0, mappers_1.toJournalType)(journal);
    }
    async createJournal(payload, organizationId) {
        const last = await this.journalRepository.findOne({
            where: { organizationId },
            order: { createdAt: 'DESC' },
            select: ['code'],
        });
        const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
            providedCode: payload.code,
            lastCode: last?.code,
            override: payload.overrideCodeValidation,
        });
        if (!valid) {
            throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
        }
        await this.ensureAccount(payload.defaultDebitAccountId, organizationId);
        await this.ensureAccount(payload.defaultCreditAccountId, organizationId);
        const duplicate = await this.journalRepository.findOne({ where: { organizationId, code: payload.code } });
        if (duplicate)
            throw new common_1.BadRequestException('Journal code already exists');
        const entity = this.journalRepository.create({
            organizationId,
            code: payload.code,
            name: payload.name,
            journalType: payload.journalType,
            defaultDebitAccountId: payload.defaultDebitAccountId ?? null,
            defaultCreditAccountId: payload.defaultCreditAccountId ?? null,
            isActive: payload.isActive ?? true,
        });
        const saved = await this.journalRepository.save(entity);
        return (0, mappers_1.toJournalType)(saved);
    }
    async updateJournal(id, payload, organizationId) {
        const journal = await this.journalRepository.findOne({ where: { id, organizationId } });
        if (!journal)
            throw new common_1.NotFoundException('Journal not found');
        if (payload.code && payload.code !== journal.code) {
            const duplicate = await this.journalRepository.findOne({ where: { organizationId, code: payload.code } });
            if (duplicate)
                throw new common_1.BadRequestException('Journal code already exists');
            journal.code = payload.code;
        }
        await this.ensureAccount(payload.defaultDebitAccountId, organizationId);
        await this.ensureAccount(payload.defaultCreditAccountId, organizationId);
        if (payload.name !== undefined)
            journal.name = payload.name;
        if (payload.journalType !== undefined)
            journal.journalType = payload.journalType;
        if (payload.defaultDebitAccountId !== undefined)
            journal.defaultDebitAccountId = payload.defaultDebitAccountId;
        if (payload.defaultCreditAccountId !== undefined)
            journal.defaultCreditAccountId = payload.defaultCreditAccountId;
        if (payload.isActive !== undefined)
            journal.isActive = payload.isActive;
        const saved = await this.journalRepository.save(journal);
        return (0, mappers_1.toJournalType)(saved);
    }
    async removeJournal(id, organizationId) {
        const result = await this.journalRepository.delete({ id, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('Journal not found');
    }
    async listJournalEntries(query, organizationId) {
        const qb = this.journalEntryRepository
            .createQueryBuilder('entry')
            .leftJoinAndSelect('entry.lines', 'lines')
            .where('entry.organization_id = :organizationId', { organizationId })
            .orderBy('entry.updated_at', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(entry.entry_number ILIKE :search OR entry.reference ILIKE :search)', { search: `%${query.search}%` });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toJournalEntryType), total };
    }
    async getJournalEntry(id, organizationId) {
        const entry = await this.journalEntryRepository.findOne({
            where: { id, organizationId },
            relations: { lines: true },
        });
        if (!entry)
            throw new common_1.NotFoundException('Journal entry not found');
        return (0, mappers_1.toJournalEntryType)(entry);
    }
    async createJournalEntry(payload, currentUser) {
        const journal = await this.journalRepository.findOne({ where: { id: payload.journalId, organizationId: currentUser.organizationId } });
        if (!journal)
            throw new common_1.BadRequestException('Journal not found');
        const duplicate = await this.journalEntryRepository.findOne({
            where: { organizationId: currentUser.organizationId, entryNumber: payload.entryNumber },
        });
        if (duplicate)
            throw new common_1.BadRequestException('Journal entry number already exists');
        const entity = this.journalEntryRepository.create({
            organizationId: currentUser.organizationId,
            journalId: payload.journalId,
            entryNumber: payload.entryNumber,
            entryDate: payload.entryDate.slice(0, 10),
            reference: payload.reference ?? null,
            sourceType: payload.sourceType ?? null,
            sourceId: payload.sourceId ?? null,
            status: payload.status ?? 'draft',
            createdByUserId: currentUser.sub ?? null,
            postedAt: payload.status === 'posted' ? new Date() : null,
        });
        const saved = await this.journalEntryRepository.save(entity);
        if (payload.lines?.length) {
            await Promise.all(payload.lines.map((line) => this.createJournalEntryLine(saved.id, line, currentUser.organizationId)));
        }
        return this.getJournalEntry(saved.id, currentUser.organizationId);
    }
    async updateJournalEntry(id, payload, currentUser) {
        const entry = await this.journalEntryRepository.findOne({ where: { id, organizationId: currentUser.organizationId } });
        if (!entry)
            throw new common_1.NotFoundException('Journal entry not found');
        if (payload.journalId !== undefined) {
            const journal = await this.journalRepository.findOne({ where: { id: payload.journalId, organizationId: currentUser.organizationId } });
            if (!journal)
                throw new common_1.BadRequestException('Journal not found');
            entry.journalId = payload.journalId;
        }
        if (payload.entryNumber && payload.entryNumber !== entry.entryNumber) {
            const duplicate = await this.journalEntryRepository.findOne({
                where: { organizationId: currentUser.organizationId, entryNumber: payload.entryNumber },
            });
            if (duplicate)
                throw new common_1.BadRequestException('Journal entry number already exists');
            entry.entryNumber = payload.entryNumber;
        }
        if (payload.entryDate !== undefined)
            entry.entryDate = payload.entryDate.slice(0, 10);
        if (payload.reference !== undefined)
            entry.reference = payload.reference;
        if (payload.sourceType !== undefined)
            entry.sourceType = payload.sourceType;
        if (payload.sourceId !== undefined)
            entry.sourceId = payload.sourceId;
        if (payload.status !== undefined) {
            entry.status = payload.status;
            entry.postedAt = payload.status === 'posted' ? new Date() : entry.postedAt;
        }
        await this.journalEntryRepository.save(entry);
        return this.getJournalEntry(id, currentUser.organizationId);
    }
    async removeJournalEntry(id, organizationId) {
        const result = await this.journalEntryRepository.delete({ id, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('Journal entry not found');
    }
    async listJournalEntryLines(entryId, query, organizationId) {
        await this.getJournalEntry(entryId, organizationId);
        const qb = this.journalEntryLineRepository
            .createQueryBuilder('line')
            .where('line.journal_entry_id = :entryId', { entryId })
            .orderBy('line.line_number', 'ASC')
            .skip(query.offset)
            .take(query.limit);
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toJournalEntryLineType), total };
    }
    async createJournalEntryLine(entryId, payload, organizationId) {
        await this.getJournalEntry(entryId, organizationId);
        await this.ensureAccount(payload.glAccountId, organizationId);
        this.validateAmounts(payload.debitAmount ?? 0, payload.creditAmount ?? 0);
        const entity = this.journalEntryLineRepository.create({
            journalEntryId: entryId,
            lineNumber: payload.lineNumber,
            glAccountId: payload.glAccountId,
            partyId: payload.partyId ?? null,
            itemId: payload.itemId ?? null,
            debitAmount: payload.debitAmount ?? 0,
            creditAmount: payload.creditAmount ?? 0,
            description: payload.description ?? null,
        });
        const saved = await this.journalEntryLineRepository.save(entity);
        return (0, mappers_1.toJournalEntryLineType)(saved);
    }
    async updateJournalEntryLine(entryId, lineId, payload, organizationId) {
        await this.getJournalEntry(entryId, organizationId);
        const line = await this.journalEntryLineRepository.findOne({ where: { id: lineId, journalEntryId: entryId } });
        if (!line)
            throw new common_1.NotFoundException('Journal entry line not found');
        if (payload.glAccountId !== undefined) {
            await this.ensureAccount(payload.glAccountId, organizationId);
            line.glAccountId = payload.glAccountId;
        }
        if (payload.lineNumber !== undefined)
            line.lineNumber = payload.lineNumber;
        if (payload.partyId !== undefined)
            line.partyId = payload.partyId;
        if (payload.itemId !== undefined)
            line.itemId = payload.itemId;
        if (payload.debitAmount !== undefined)
            line.debitAmount = payload.debitAmount;
        if (payload.creditAmount !== undefined)
            line.creditAmount = payload.creditAmount;
        if (payload.description !== undefined)
            line.description = payload.description;
        this.validateAmounts(Number(line.debitAmount), Number(line.creditAmount));
        const saved = await this.journalEntryLineRepository.save(line);
        return (0, mappers_1.toJournalEntryLineType)(saved);
    }
    async removeJournalEntryLine(entryId, lineId, organizationId) {
        await this.getJournalEntry(entryId, organizationId);
        const result = await this.journalEntryLineRepository.delete({ id: lineId, journalEntryId: entryId });
        if (!result.affected)
            throw new common_1.NotFoundException('Journal entry line not found');
    }
    async ensureAccount(accountId, organizationId) {
        if (!accountId)
            return;
        const account = await this.glAccountRepository.findOne({ where: { id: accountId, organizationId } });
        if (!account)
            throw new common_1.BadRequestException('GL account not found');
    }
    validateAmounts(debitAmount, creditAmount) {
        const debit = Number(debitAmount);
        const credit = Number(creditAmount);
        if ((debit > 0 && credit > 0) || (debit <= 0 && credit <= 0)) {
            throw new common_1.BadRequestException('Each journal entry line must have either a debit or a credit amount');
        }
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.GlAccountOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.JournalOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.JournalEntryOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.JournalEntryLineOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map