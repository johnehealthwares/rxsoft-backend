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
            .orderBy('entry.updatedAt', 'DESC')
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
    async listGlAccounts(query, organizationId) {
        const qb = this.glAccountRepository
            .createQueryBuilder('account')
            .where('account.organization_id = :organizationId', { organizationId })
            .orderBy('account.account_code', 'ASC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(account.account_code ILIKE :search OR account.account_name ILIKE :search)', { search: `%${query.search}%` });
        }
        if (query.accountType) {
            qb.andWhere('account.account_type = :accountType', { accountType: query.accountType });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toGlAccountType), total };
    }
    async getGlAccount(id, organizationId) {
        const account = await this.glAccountRepository.findOne({ where: { id, organizationId } });
        if (!account)
            throw new common_1.NotFoundException('GL account not found');
        return (0, mappers_1.toGlAccountType)(account);
    }
    async createGlAccount(payload, organizationId) {
        const duplicate = await this.glAccountRepository.findOne({ where: { organizationId, accountCode: payload.accountCode } });
        if (duplicate)
            throw new common_1.BadRequestException('GL account code already exists');
        const entity = this.glAccountRepository.create({
            organizationId,
            accountCode: payload.accountCode,
            accountName: payload.accountName,
            accountType: payload.accountType,
            allowsReconciliation: payload.allowsReconciliation ?? false,
            isActive: payload.isActive ?? true,
        });
        const saved = await this.glAccountRepository.save(entity);
        return (0, mappers_1.toGlAccountType)(saved);
    }
    async updateGlAccount(id, payload, organizationId) {
        const account = await this.glAccountRepository.findOne({ where: { id, organizationId } });
        if (!account)
            throw new common_1.NotFoundException('GL account not found');
        if (payload.accountCode && payload.accountCode !== account.accountCode) {
            const duplicate = await this.glAccountRepository.findOne({ where: { organizationId, accountCode: payload.accountCode } });
            if (duplicate)
                throw new common_1.BadRequestException('GL account code already exists');
            account.accountCode = payload.accountCode;
        }
        if (payload.accountName !== undefined)
            account.accountName = payload.accountName;
        if (payload.allowsReconciliation !== undefined)
            account.allowsReconciliation = payload.allowsReconciliation;
        if (payload.isActive !== undefined)
            account.isActive = payload.isActive;
        const saved = await this.glAccountRepository.save(account);
        return (0, mappers_1.toGlAccountType)(saved);
    }
    async removeGlAccount(id, organizationId) {
        const linesCount = await this.journalEntryLineRepository.count({ where: { glAccountId: id } });
        if (linesCount > 0) {
            throw new common_1.BadRequestException('Cannot delete GL account with existing journal entry lines. Deactivate it instead.');
        }
        const result = await this.glAccountRepository.delete({ id, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('GL account not found');
    }
    async postJournalEntry(entryId, organizationId) {
        const entry = await this.journalEntryRepository.findOne({
            where: { id: entryId, organizationId },
            relations: { lines: true },
        });
        if (!entry)
            throw new common_1.NotFoundException('Journal entry not found');
        if (entry.status !== 'draft')
            throw new common_1.BadRequestException('Only draft journal entries can be posted');
        if (!entry.lines || entry.lines.length < 2) {
            throw new common_1.BadRequestException('Journal entry must have at least 2 lines to post');
        }
        const totals = entry.lines.reduce((acc, line) => {
            acc.debit += Number(line.debitAmount);
            acc.credit += Number(line.creditAmount);
            return acc;
        }, { debit: 0, credit: 0 });
        if (Math.abs(totals.debit - totals.credit) > 0.01) {
            throw new common_1.BadRequestException(`Journal entry debits (${totals.debit.toFixed(2)}) and credits (${totals.credit.toFixed(2)}) do not balance`);
        }
        entry.status = 'posted';
        entry.postedAt = new Date();
        const saved = await this.journalEntryRepository.save(entry);
        return this.getJournalEntry(saved.id, organizationId);
    }
    async reverseJournalEntry(entryId, organizationId, userId) {
        const entry = await this.journalEntryRepository.findOne({
            where: { id: entryId, organizationId },
            relations: { lines: true, journal: true },
        });
        if (!entry)
            throw new common_1.NotFoundException('Journal entry not found');
        if (entry.status !== 'posted')
            throw new common_1.BadRequestException('Only posted journal entries can be reversed');
        const reversedEntry = this.journalEntryRepository.create({
            organizationId,
            journalId: entry.journalId,
            entryNumber: `REV-${entry.entryNumber}`,
            entryDate: new Date().toISOString().slice(0, 10),
            reference: `Reversal of ${entry.entryNumber}`,
            sourceType: entry.sourceType,
            sourceId: entry.sourceId,
            status: 'reversed',
            createdByUserId: userId ?? null,
            postedAt: new Date(),
        });
        const saved = await this.journalEntryRepository.save(reversedEntry);
        if (entry.lines?.length) {
            const reversedLines = entry.lines.map((line) => this.journalEntryLineRepository.create({
                journalEntryId: saved.id,
                lineNumber: line.lineNumber,
                glAccountId: line.glAccountId,
                partyId: line.partyId,
                itemId: line.itemId,
                debitAmount: Number(line.creditAmount),
                creditAmount: Number(line.debitAmount),
                description: `Reversal: ${line.description ?? ''}`,
            }));
            await this.journalEntryLineRepository.save(reversedLines);
        }
        entry.status = 'reversed';
        await this.journalEntryRepository.save(entry);
        return this.getJournalEntry(saved.id, organizationId);
    }
    async getTrialBalance(organizationId, asOfDate) {
        const rows = await this.journalEntryLineRepository
            .createQueryBuilder('jel')
            .select('gl.account_code', 'accountCode')
            .addSelect('gl.account_name', 'accountName')
            .addSelect('gl.account_type', 'accountType')
            .addSelect('COALESCE(SUM(jel.debit_amount), 0)', 'totalDebits')
            .addSelect('COALESCE(SUM(jel.credit_amount), 0)', 'totalCredits')
            .innerJoin('gl_accounts', 'gl', 'gl.id = jel.gl_account_id')
            .innerJoin('journal_entries', 'je', 'je.id = jel.journal_entry_id')
            .where('gl.organization_id = :orgId', { orgId: organizationId })
            .andWhere('je.status = :status', { status: 'posted' })
            .andWhere('je.entry_date <= :asOf', { asOf: asOfDate })
            .groupBy('gl.id')
            .addGroupBy('gl.account_code')
            .addGroupBy('gl.account_name')
            .addGroupBy('gl.account_type')
            .orderBy('gl.account_code', 'ASC')
            .getRawMany();
        const data = rows.map((r) => {
            const debits = Number(r.totalDebits);
            const credits = Number(r.totalCredits);
            const type = r.accountType;
            let debitBalance = 0;
            let creditBalance = 0;
            if (type === 'asset' || type === 'expense') {
                const bal = debits - credits;
                if (bal >= 0)
                    debitBalance = bal;
                else
                    creditBalance = Math.abs(bal);
            }
            else {
                const bal = credits - debits;
                if (bal >= 0)
                    creditBalance = bal;
                else
                    debitBalance = Math.abs(bal);
            }
            return {
                accountCode: r.accountCode,
                accountName: r.accountName,
                accountType: type,
                debitBalance: Number(debitBalance.toFixed(2)),
                creditBalance: Number(creditBalance.toFixed(2)),
            };
        });
        const totals = data.reduce((acc, r) => {
            acc.debitTotal += r.debitBalance;
            acc.creditTotal += r.creditBalance;
            return acc;
        }, { debitTotal: 0, creditTotal: 0 });
        return { asOfDate, data, totals: { debitTotal: Number(totals.debitTotal.toFixed(2)), creditTotal: Number(totals.creditTotal.toFixed(2)) } };
    }
    async getBalanceSheet(organizationId, asOfDate) {
        const tb = await this.getTrialBalance(organizationId, asOfDate);
        const bsAccounts = tb.data.filter((r) => ['asset', 'liability', 'equity'].includes(r.accountType));
        const assets = bsAccounts.filter((r) => r.accountType === 'asset');
        const liabilities = bsAccounts.filter((r) => r.accountType === 'liability');
        const equity = bsAccounts.filter((r) => r.accountType === 'equity');
        const assetTotal = assets.reduce((s, r) => s + r.debitBalance - r.creditBalance, 0);
        const liabilityTotal = liabilities.reduce((s, r) => s + r.creditBalance - r.debitBalance, 0);
        const equityTotal = equity.reduce((s, r) => s + r.creditBalance - r.debitBalance, 0);
        return {
            asOfDate,
            assets: { accounts: assets, total: Number(assetTotal.toFixed(2)) },
            liabilities: { accounts: liabilities, total: Number(liabilityTotal.toFixed(2)) },
            equity: { accounts: equity, total: Number(equityTotal.toFixed(2)) },
            totalLiabilitiesAndEquity: Number((liabilityTotal + equityTotal).toFixed(2)),
        };
    }
    async getIncomeStatement(organizationId, fromDate, toDate) {
        const rows = await this.journalEntryLineRepository
            .createQueryBuilder('jel')
            .select('gl.account_code', 'accountCode')
            .addSelect('gl.account_name', 'accountName')
            .addSelect('gl.account_type', 'accountType')
            .addSelect('gl.account_code', 'sortCode')
            .addSelect('COALESCE(SUM(jel.debit_amount), 0)', 'totalDebits')
            .addSelect('COALESCE(SUM(jel.credit_amount), 0)', 'totalCredits')
            .innerJoin('gl_accounts', 'gl', 'gl.id = jel.gl_account_id')
            .innerJoin('journal_entries', 'je', 'je.id = jel.journal_entry_id')
            .where('gl.organization_id = :orgId', { orgId: organizationId })
            .andWhere('je.status = :status', { status: 'posted' })
            .andWhere('je.entry_date >= :from', { from: fromDate })
            .andWhere('je.entry_date <= :to', { to: toDate })
            .andWhere('gl.account_type IN (:...types)', { types: ['income', 'expense'] })
            .groupBy('gl.id')
            .addGroupBy('gl.account_code')
            .addGroupBy('gl.account_name')
            .addGroupBy('gl.account_type')
            .addGroupBy('gl.account_code')
            .orderBy('gl.account_code', 'ASC')
            .getRawMany();
        const mapped = rows.map((r) => {
            const debits = Number(r.totalDebits);
            const credits = Number(r.totalCredits);
            const isIncome = r.accountType === 'income';
            const balance = isIncome ? credits - debits : debits - credits;
            return {
                accountCode: r.accountCode,
                accountName: r.accountName,
                accountType: r.accountType,
                balance: Number(balance.toFixed(2)),
            };
        });
        const isCogs = (r) => r.accountType === 'expense' && r.accountCode.startsWith('51');
        const isOperatingExpense = (r) => r.accountType === 'expense' && !r.accountCode.startsWith('51');
        const revenue = mapped.filter((r) => r.accountType === 'income' && r.balance >= 0);
        const cogs = mapped.filter(isCogs);
        const operatingExpenses = mapped.filter(isOperatingExpense);
        const revenueTotal = revenue.reduce((s, r) => s + r.balance, 0);
        const cogsTotal = cogs.reduce((s, r) => s + r.balance, 0);
        const opExTotal = operatingExpenses.reduce((s, r) => s + r.balance, 0);
        return {
            fromDate,
            toDate,
            revenue: { accounts: revenue, total: Number(revenueTotal.toFixed(2)) },
            cogs: { accounts: cogs, total: Number(cogsTotal.toFixed(2)) },
            grossProfit: Number((revenueTotal - cogsTotal).toFixed(2)),
            operatingExpenses: { accounts: operatingExpenses, total: Number(opExTotal.toFixed(2)) },
            netIncome: Number((revenueTotal - cogsTotal - opExTotal).toFixed(2)),
        };
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