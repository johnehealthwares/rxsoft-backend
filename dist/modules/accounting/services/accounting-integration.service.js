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
var AccountingIntegrationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingIntegrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const ACCOUNT_CODES = {
    CASH: '1100',
    ACCOUNTS_RECEIVABLE: '1200',
    INVENTORY: '1300',
    ACCOUNTS_PAYABLE: '2100',
    SALES_REVENUE: '4100',
    COST_OF_GOODS_SOLD: '5100',
    INVENTORY_ADJUSTMENT: '5150',
    BAD_DEBT_EXPENSE: '5250',
    SALES_RETURNS: '4200',
    INVENTORY_TRANSFER: '1300',
};
let AccountingIntegrationService = AccountingIntegrationService_1 = class AccountingIntegrationService {
    dataSource;
    glAccountRepo;
    journalRepo;
    journalEntryRepo;
    journalEntryLineRepo;
    logger = new common_1.Logger(AccountingIntegrationService_1.name);
    constructor(dataSource, glAccountRepo, journalRepo, journalEntryRepo, journalEntryLineRepo) {
        this.dataSource = dataSource;
        this.glAccountRepo = glAccountRepo;
        this.journalRepo = journalRepo;
        this.journalEntryRepo = journalEntryRepo;
        this.journalEntryLineRepo = journalEntryLineRepo;
    }
    async recordSale(organizationId, sale, lines) {
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'sale', isActive: true } });
            if (!journal) {
                this.logger.warn(`No active Sales journal found for org ${organizationId}. Skipping accounting.`);
                return;
            }
            const salesRevenueId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.SALES_REVENUE);
            const cashId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.CASH);
            const arId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.ACCOUNTS_RECEIVABLE);
            const outstanding = Number((sale.totalAmount - sale.paidAmount).toFixed(2));
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-SALE-${sale.saleNumber}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Sale ${sale.saleNumber}`,
                    sourceType: 'sale',
                    sourceId: sale.id,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                const lines = [];
                let lineNumber = 1;
                if (sale.paidAmount > 0) {
                    lines.push(lineRepo.create({
                        journalEntryId: saved.id,
                        lineNumber: lineNumber++,
                        glAccountId: cashId,
                        debitAmount: sale.paidAmount,
                        creditAmount: 0,
                        description: `Cash payment for sale ${sale.saleNumber}`,
                    }));
                }
                if (outstanding > 0) {
                    lines.push(lineRepo.create({
                        journalEntryId: saved.id,
                        lineNumber: lineNumber++,
                        glAccountId: arId,
                        debitAmount: outstanding,
                        creditAmount: 0,
                        description: `AR for sale ${sale.saleNumber}`,
                    }));
                }
                lines.push(lineRepo.create({
                    journalEntryId: saved.id,
                    lineNumber: lineNumber++,
                    glAccountId: salesRevenueId,
                    debitAmount: 0,
                    creditAmount: sale.totalAmount,
                    description: `Sales revenue for sale ${sale.saleNumber}`,
                }));
                await lineRepo.save(lines);
            });
        }
        catch (error) {
            this.logger.error(`Failed to record sale ${sale.saleNumber}: ${error.message}`, error.stack);
        }
    }
    async recordSaleRefund(organizationId, refund) {
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'sale', isActive: true } });
            if (!journal)
                return;
            const salesReturnsId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.SALES_RETURNS);
            const cashId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.CASH);
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-RF-${refund.refundNumber}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Refund ${refund.refundNumber} for sale ${refund.saleId}`,
                    sourceType: 'sale_refund',
                    sourceId: refund.id,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                const lines = lineRepo.create([
                    {
                        journalEntryId: saved.id,
                        lineNumber: 1,
                        glAccountId: salesReturnsId,
                        debitAmount: refund.totalAmount,
                        creditAmount: 0,
                        description: `Sales return for refund ${refund.refundNumber}`,
                    },
                    {
                        journalEntryId: saved.id,
                        lineNumber: 2,
                        glAccountId: cashId,
                        debitAmount: 0,
                        creditAmount: refund.totalAmount,
                        description: `Cash refund ${refund.refundNumber}`,
                    },
                ]);
                await lineRepo.save(lines);
            });
        }
        catch (error) {
            this.logger.error(`Failed to record refund ${refund.refundNumber}: ${error.message}`, error.stack);
        }
    }
    async recordPaymentCollection(organizationId, receivable, transaction) {
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'cash', isActive: true } });
            if (!journal)
                return;
            const cashId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.CASH);
            const arId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.ACCOUNTS_RECEIVABLE);
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-PMT-${receivable.receivableNumber}-${Date.now()}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Payment on ${receivable.receivableNumber}`,
                    sourceType: 'receivable_payment',
                    sourceId: transaction.id,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                const lines = lineRepo.create([
                    {
                        journalEntryId: saved.id,
                        lineNumber: 1,
                        glAccountId: cashId,
                        debitAmount: transaction.amount,
                        creditAmount: 0,
                        description: `Payment collected for ${receivable.receivableNumber}`,
                    },
                    {
                        journalEntryId: saved.id,
                        lineNumber: 2,
                        glAccountId: arId,
                        debitAmount: 0,
                        creditAmount: transaction.amount,
                        description: `AR reduction for ${receivable.receivableNumber}`,
                    },
                ]);
                await lineRepo.save(lines);
            });
        }
        catch (error) {
            this.logger.error(`Failed to record payment collection: ${error.message}`, error.stack);
        }
    }
    async recordReceivableAdjustment(organizationId, receivable, adjustment) {
        if (adjustment.amount === 0)
            return;
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'general', isActive: true } });
            if (!journal)
                return;
            const arId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.ACCOUNTS_RECEIVABLE);
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-ADJ-${receivable.receivableNumber}-${Date.now()}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Adjustment on ${receivable.receivableNumber}`,
                    sourceType: 'receivable_adjustment',
                    sourceId: receivable.id,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                const lines = [];
                const absAmount = Math.abs(adjustment.amount);
                if (adjustment.amount > 0) {
                    lines.push(lineRepo.create({
                        journalEntryId: saved.id, lineNumber: 1,
                        glAccountId: arId, debitAmount: absAmount, creditAmount: 0,
                        description: `AR increase adjustment on ${receivable.receivableNumber}`,
                    }));
                }
                else {
                    lines.push(lineRepo.create({
                        journalEntryId: saved.id, lineNumber: 1,
                        glAccountId: arId, debitAmount: 0, creditAmount: absAmount,
                        description: `AR decrease adjustment on ${receivable.receivableNumber}`,
                    }));
                }
                await lineRepo.save(lines);
            });
        }
        catch (error) {
            this.logger.error(`Failed to record receivable adjustment: ${error.message}`, error.stack);
        }
    }
    async recordWriteOff(organizationId, receivable, writtenOffAmount) {
        if (writtenOffAmount <= 0)
            return;
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'general', isActive: true } });
            if (!journal)
                return;
            const badDebtId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.BAD_DEBT_EXPENSE);
            const arId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.ACCOUNTS_RECEIVABLE);
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-WO-${receivable.receivableNumber}-${Date.now()}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Write-off ${receivable.receivableNumber}`,
                    sourceType: 'receivable_write_off',
                    sourceId: receivable.id,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                const lines = lineRepo.create([
                    {
                        journalEntryId: saved.id, lineNumber: 1,
                        glAccountId: badDebtId, debitAmount: writtenOffAmount, creditAmount: 0,
                        description: `Bad debt write-off for ${receivable.receivableNumber}`,
                    },
                    {
                        journalEntryId: saved.id, lineNumber: 2,
                        glAccountId: arId, debitAmount: 0, creditAmount: writtenOffAmount,
                        description: `AR reduction for write-off ${receivable.receivableNumber}`,
                    },
                ]);
                await lineRepo.save(lines);
            });
        }
        catch (error) {
            this.logger.error(`Failed to record write-off: ${error.message}`, error.stack);
        }
    }
    async recordGoodsReceipt(organizationId, receipt) {
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'purchase', isActive: true } });
            if (!journal)
                return;
            const inventoryId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.INVENTORY);
            const apId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.ACCOUNTS_PAYABLE);
            const totalAmount = receipt.lines.reduce((sum, l) => sum + l.receivedQty * l.unitCost, 0);
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-GR-${receipt.receiptNumber}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Goods receipt ${receipt.receiptNumber}`,
                    sourceType: 'goods_receipt',
                    sourceId: receipt.purchaseOrderId,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                const lines = lineRepo.create([
                    {
                        journalEntryId: saved.id, lineNumber: 1,
                        glAccountId: inventoryId, debitAmount: Number(totalAmount.toFixed(2)), creditAmount: 0,
                        description: `Inventory from receipt ${receipt.receiptNumber}`,
                    },
                    {
                        journalEntryId: saved.id, lineNumber: 2,
                        glAccountId: apId, debitAmount: 0, creditAmount: Number(totalAmount.toFixed(2)),
                        description: `AP from receipt ${receipt.receiptNumber}`,
                    },
                ]);
                await lineRepo.save(lines);
            });
        }
        catch (error) {
            this.logger.error(`Failed to record goods receipt ${receipt.receiptNumber}: ${error.message}`, error.stack);
        }
    }
    async recordStockAdjustment(organizationId, adjustment) {
        if (adjustment.deltaQuantity === 0)
            return;
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'general', isActive: true } });
            if (!journal)
                return;
            const inventoryId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.INVENTORY);
            const adjustmentId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.INVENTORY_ADJUSTMENT);
            const amount = Number((Math.abs(adjustment.deltaQuantity) * adjustment.averageCost).toFixed(2));
            if (amount <= 0)
                return;
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-ADJ-${adjustment.stockBalanceId.slice(0, 8)}-${Date.now()}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Stock adjustment: ${adjustment.reason}`,
                    sourceType: 'stock_adjustment',
                    sourceId: adjustment.stockBalanceId,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                if (adjustment.deltaQuantity > 0) {
                    const lines = lineRepo.create([
                        { journalEntryId: saved.id, lineNumber: 1, glAccountId: inventoryId, debitAmount: amount, creditAmount: 0, description: adjustment.reason },
                        { journalEntryId: saved.id, lineNumber: 2, glAccountId: adjustmentId, debitAmount: 0, creditAmount: amount, description: adjustment.reason },
                    ]);
                    await lineRepo.save(lines);
                }
                else {
                    const lines = lineRepo.create([
                        { journalEntryId: saved.id, lineNumber: 1, glAccountId: adjustmentId, debitAmount: amount, creditAmount: 0, description: adjustment.reason },
                        { journalEntryId: saved.id, lineNumber: 2, glAccountId: inventoryId, debitAmount: 0, creditAmount: amount, description: adjustment.reason },
                    ]);
                    await lineRepo.save(lines);
                }
            });
        }
        catch (error) {
            this.logger.error(`Failed to record stock adjustment: ${error.message}`, error.stack);
        }
    }
    async recordStockTransfer(organizationId, transfer) {
        try {
            const journal = await this.journalRepo.findOne({ where: { organizationId, journalType: 'general', isActive: true } });
            if (!journal)
                return;
            const inventoryId = await this.resolveAccountId(organizationId, ACCOUNT_CODES.INVENTORY_TRANSFER);
            await this.dataSource.transaction(async (manager) => {
                const entryRepo = manager.getRepository(entities_1.JournalEntryOrmEntity);
                const lineRepo = manager.getRepository(entities_1.JournalEntryLineOrmEntity);
                const entry = entryRepo.create({
                    organizationId,
                    journalId: journal.id,
                    entryNumber: `ACC-TRF-${transfer.itemId.slice(0, 8)}-${Date.now()}`,
                    entryDate: new Date().toISOString().slice(0, 10),
                    reference: `Stock transfer from ${transfer.fromLocationId} to ${transfer.toLocationId}`,
                    sourceType: 'stock_transfer',
                    sourceId: transfer.itemId,
                    status: 'posted',
                    postedAt: new Date(),
                });
                const saved = await entryRepo.save(entry);
                const lines = lineRepo.create([
                    { journalEntryId: saved.id, lineNumber: 1, glAccountId: inventoryId, debitAmount: 0, creditAmount: transfer.quantity, description: `Transfer out from ${transfer.fromLocationId}` },
                    { journalEntryId: saved.id, lineNumber: 2, glAccountId: inventoryId, debitAmount: transfer.quantity, creditAmount: 0, description: `Transfer in to ${transfer.toLocationId}` },
                ]);
                await lineRepo.save(lines);
            });
        }
        catch (error) {
            this.logger.error(`Failed to record stock transfer: ${error.message}`, error.stack);
        }
    }
    async resolveAccountId(organizationId, accountCode) {
        const account = await this.glAccountRepo.findOne({
            where: { organizationId, accountCode, isActive: true },
            select: ['id'],
        });
        if (!account) {
            throw new Error(`GL account "${accountCode}" not found or inactive for org ${organizationId}`);
        }
        return account.id;
    }
};
exports.AccountingIntegrationService = AccountingIntegrationService;
exports.AccountingIntegrationService = AccountingIntegrationService = AccountingIntegrationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.GlAccountOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.JournalOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.JournalEntryOrmEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.JournalEntryLineOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountingIntegrationService);
//# sourceMappingURL=accounting-integration.service.js.map