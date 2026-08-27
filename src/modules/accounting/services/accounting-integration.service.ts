import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  GlAccountOrmEntity,
  JournalEntryLineOrmEntity,
  JournalEntryOrmEntity,
  JournalOrmEntity,
} from '../entities';

const ACCOUNT_CODES = {
  CASH: '1100',
  GATEWAY_FLOAT: '1150',
  ACCOUNTS_RECEIVABLE: '1200',
  INVENTORY: '1300',
  ACCOUNTS_PAYABLE: '2100',
  CUSTOMER_WALLET_PAYABLE: '2600',
  SALES_REVENUE: '4100',
  COST_OF_GOODS_SOLD: '5100',
  INVENTORY_ADJUSTMENT: '5150',
  BAD_DEBT_EXPENSE: '5250',
  SALES_RETURNS: '4200',
  INVENTORY_TRANSFER: '1300',
} as const;

@Injectable()
export class AccountingIntegrationService {
  private readonly logger = new Logger(AccountingIntegrationService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(GlAccountOrmEntity)
    private readonly glAccountRepo: Repository<GlAccountOrmEntity>,
    @InjectRepository(JournalOrmEntity)
    private readonly journalRepo: Repository<JournalOrmEntity>,
    @InjectRepository(JournalEntryOrmEntity)
    private readonly journalEntryRepo: Repository<JournalEntryOrmEntity>,
    @InjectRepository(JournalEntryLineOrmEntity)
    private readonly journalEntryLineRepo: Repository<JournalEntryLineOrmEntity>,
  ) {}

  async recordSale(
    organizationId: string,
    sale: {
      id: string;
      saleNumber: string;
      totalAmount: number;
      paidAmount: number;
    },
    lines: Array<{ itemId: string; quantity: number; unitPrice: number }>,
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'sale', isActive: true },
      });
      if (!journal) {
        this.logger.warn(
          `No active Sales journal found for org ${organizationId}. Skipping accounting.`,
        );
        return;
      }

      const salesRevenueId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.SALES_REVENUE,
      );
      const cashId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.CASH,
      );
      const arId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.ACCOUNTS_RECEIVABLE,
      );

      const outstanding = Number(
        (sale.totalAmount - sale.paidAmount).toFixed(2),
      );

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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

        const lines: JournalEntryLineOrmEntity[] = [];
        let lineNumber = 1;

        if (sale.paidAmount > 0) {
          lines.push(
            lineRepo.create({
              journalEntryId: saved.id,
              lineNumber: lineNumber++,
              glAccountId: cashId,
              debitAmount: sale.paidAmount,
              creditAmount: 0,
              description: `Cash payment for sale ${sale.saleNumber}`,
            }),
          );
        }

        if (outstanding > 0) {
          lines.push(
            lineRepo.create({
              journalEntryId: saved.id,
              lineNumber: lineNumber++,
              glAccountId: arId,
              debitAmount: outstanding,
              creditAmount: 0,
              description: `AR for sale ${sale.saleNumber}`,
            }),
          );
        }

        lines.push(
          lineRepo.create({
            journalEntryId: saved.id,
            lineNumber: lineNumber++,
            glAccountId: salesRevenueId,
            debitAmount: 0,
            creditAmount: sale.totalAmount,
            description: `Sales revenue for sale ${sale.saleNumber}`,
          }),
        );

        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record sale ${sale.saleNumber}: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordOnlinePayment(
    organizationId: string,
    source: {
      reference: string;
      provider: string;
      channel: string;
      amount: number;
      sourceType: 'order' | 'sale' | 'wallet_deposit';
      sourceId: string;
    },
    opts?: { revenue?: boolean; outstanding?: number },
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'cash', isActive: true },
      });
      if (!journal) return;

      const floatId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.GATEWAY_FLOAT,
      );
      const revenueId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.SALES_REVENUE,
      );
      const amount = Number(source.amount.toFixed(2));
      if (amount <= 0) return;

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

        const entry = entryRepo.create({
          organizationId,
          journalId: journal.id,
          entryNumber: `ACC-ONLINE-${source.reference.slice(-20)}`,
          entryDate: new Date().toISOString().slice(0, 10),
          reference: `${source.provider.toUpperCase()} payment ${source.reference}`,
          sourceType: 'payment_transaction',
          sourceId: source.sourceId,
          status: 'posted',
          postedAt: new Date(),
        });
        const saved = await entryRepo.save(entry);

        const lines = lineRepo.create([
          {
            journalEntryId: saved.id,
            lineNumber: 1,
            glAccountId: floatId,
            debitAmount: amount,
            creditAmount: 0,
            description: `Gateway float from ${source.provider} (${source.channel})`,
          },
          {
            journalEntryId: saved.id,
            lineNumber: 2,
            glAccountId: revenueId,
            debitAmount: 0,
            creditAmount: amount,
            description: `Sales revenue via ${source.provider}`,
          },
        ]);
        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record online payment ${source.reference}: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordWalletDeposit(
    organizationId: string,
    deposit: { walletId: string; reference: string; amount: number },
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'cash', isActive: true },
      });
      if (!journal) return;

      const floatId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.GATEWAY_FLOAT,
      );
      const walletPayableId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.CUSTOMER_WALLET_PAYABLE,
      );
      const amount = Number(deposit.amount.toFixed(2));
      if (amount <= 0) return;

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

        const entry = entryRepo.create({
          organizationId,
          journalId: journal.id,
          entryNumber: `ACC-WDEP-${deposit.reference.slice(-20)}`,
          entryDate: new Date().toISOString().slice(0, 10),
          reference: `Wallet deposit ${deposit.reference}`,
          sourceType: 'wallet_deposit',
          sourceId: deposit.walletId,
          status: 'posted',
          postedAt: new Date(),
        });
        const saved = await entryRepo.save(entry);

        const lines = lineRepo.create([
          {
            journalEntryId: saved.id,
            lineNumber: 1,
            glAccountId: floatId,
            debitAmount: amount,
            creditAmount: 0,
            description: 'Wallet deposit gateway float',
          },
          {
            journalEntryId: saved.id,
            lineNumber: 2,
            glAccountId: walletPayableId,
            debitAmount: 0,
            creditAmount: amount,
            description: 'Customer wallet payable',
          },
        ]);
        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record wallet deposit ${deposit.reference}: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordSettlement(
    organizationId: string,
    settlement: { reference: string; provider: string; amount: number },
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'bank', isActive: true },
      });
      if (!journal) return;

      const cashId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.CASH,
      );
      const floatId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.GATEWAY_FLOAT,
      );
      const amount = Number(settlement.amount.toFixed(2));
      if (amount <= 0) return;

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

        const entry = entryRepo.create({
          organizationId,
          journalId: journal.id,
          entryNumber: `ACC-SETL-${settlement.reference.slice(-20)}`,
          entryDate: new Date().toISOString().slice(0, 10),
          reference: `Settlement from ${settlement.provider.toUpperCase()} ${settlement.reference}`,
          sourceType: 'settlement',
          sourceId: settlement.reference,
          status: 'posted',
          postedAt: new Date(),
        });
        const saved = await entryRepo.save(entry);

        const lines = lineRepo.create([
          {
            journalEntryId: saved.id,
            lineNumber: 1,
            glAccountId: cashId,
            debitAmount: amount,
            creditAmount: 0,
            description: `Settlement received from ${settlement.provider}`,
          },
          {
            journalEntryId: saved.id,
            lineNumber: 2,
            glAccountId: floatId,
            debitAmount: 0,
            creditAmount: amount,
            description: 'Gateway float reduction on settlement',
          },
        ]);
        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record settlement ${settlement.reference}: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordSaleRefund(
    organizationId: string,
    refund: {
      id: string;
      saleId: string;
      totalAmount: number;
      refundNumber: string;
    },
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'sale', isActive: true },
      });
      if (!journal) return;

      const salesReturnsId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.SALES_RETURNS,
      );
      const cashId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.CASH,
      );

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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
    } catch (error: any) {
      this.logger.error(
        `Failed to record refund ${refund.refundNumber}: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordPaymentCollection(
    organizationId: string,
    receivable: { id: string; receivableNumber: string },
    transaction: { id: string; amount: number },
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'cash', isActive: true },
      });
      if (!journal) return;

      const cashId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.CASH,
      );
      const arId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.ACCOUNTS_RECEIVABLE,
      );

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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
    } catch (error: any) {
      this.logger.error(
        `Failed to record payment collection: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordReceivableAdjustment(
    organizationId: string,
    receivable: { id: string; receivableNumber: string },
    adjustment: { amount: number },
  ): Promise<void> {
    if (adjustment.amount === 0) return;
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'general', isActive: true },
      });
      if (!journal) return;

      const arId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.ACCOUNTS_RECEIVABLE,
      );

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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

        const lines: JournalEntryLineOrmEntity[] = [];
        const absAmount = Math.abs(adjustment.amount);

        if (adjustment.amount > 0) {
          lines.push(
            lineRepo.create({
              journalEntryId: saved.id,
              lineNumber: 1,
              glAccountId: arId,
              debitAmount: absAmount,
              creditAmount: 0,
              description: `AR increase adjustment on ${receivable.receivableNumber}`,
            }),
          );
        } else {
          lines.push(
            lineRepo.create({
              journalEntryId: saved.id,
              lineNumber: 1,
              glAccountId: arId,
              debitAmount: 0,
              creditAmount: absAmount,
              description: `AR decrease adjustment on ${receivable.receivableNumber}`,
            }),
          );
        }

        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record receivable adjustment: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordWriteOff(
    organizationId: string,
    receivable: { id: string; receivableNumber: string },
    writtenOffAmount: number,
  ): Promise<void> {
    if (writtenOffAmount <= 0) return;
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'general', isActive: true },
      });
      if (!journal) return;

      const badDebtId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.BAD_DEBT_EXPENSE,
      );
      const arId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.ACCOUNTS_RECEIVABLE,
      );

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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
            journalEntryId: saved.id,
            lineNumber: 1,
            glAccountId: badDebtId,
            debitAmount: writtenOffAmount,
            creditAmount: 0,
            description: `Bad debt write-off for ${receivable.receivableNumber}`,
          },
          {
            journalEntryId: saved.id,
            lineNumber: 2,
            glAccountId: arId,
            debitAmount: 0,
            creditAmount: writtenOffAmount,
            description: `AR reduction for write-off ${receivable.receivableNumber}`,
          },
        ]);
        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record write-off: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordGoodsReceipt(
    organizationId: string,
    receipt: {
      receiptNumber: string;
      purchaseOrderId: string;
      lines: Array<{ itemId: string; receivedQty: number; unitCost: number }>;
    },
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'purchase', isActive: true },
      });
      if (!journal) return;

      const inventoryId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.INVENTORY,
      );
      const apId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.ACCOUNTS_PAYABLE,
      );

      const totalAmount = receipt.lines.reduce(
        (sum, l) => sum + l.receivedQty * l.unitCost,
        0,
      );

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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
            journalEntryId: saved.id,
            lineNumber: 1,
            glAccountId: inventoryId,
            debitAmount: Number(totalAmount.toFixed(2)),
            creditAmount: 0,
            description: `Inventory from receipt ${receipt.receiptNumber}`,
          },
          {
            journalEntryId: saved.id,
            lineNumber: 2,
            glAccountId: apId,
            debitAmount: 0,
            creditAmount: Number(totalAmount.toFixed(2)),
            description: `AP from receipt ${receipt.receiptNumber}`,
          },
        ]);
        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record goods receipt ${receipt.receiptNumber}: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordStockAdjustment(
    organizationId: string,
    adjustment: {
      stockBalanceId: string;
      deltaQuantity: number;
      reason: string;
      averageCost: number;
    },
  ): Promise<void> {
    if (adjustment.deltaQuantity === 0) return;
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'general', isActive: true },
      });
      if (!journal) return;

      const inventoryId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.INVENTORY,
      );
      const adjustmentId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.INVENTORY_ADJUSTMENT,
      );

      const amount = Number(
        (Math.abs(adjustment.deltaQuantity) * adjustment.averageCost).toFixed(
          2,
        ),
      );
      if (amount <= 0) return;

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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
            {
              journalEntryId: saved.id,
              lineNumber: 1,
              glAccountId: inventoryId,
              debitAmount: amount,
              creditAmount: 0,
              description: adjustment.reason,
            },
            {
              journalEntryId: saved.id,
              lineNumber: 2,
              glAccountId: adjustmentId,
              debitAmount: 0,
              creditAmount: amount,
              description: adjustment.reason,
            },
          ]);
          await lineRepo.save(lines);
        } else {
          const lines = lineRepo.create([
            {
              journalEntryId: saved.id,
              lineNumber: 1,
              glAccountId: adjustmentId,
              debitAmount: amount,
              creditAmount: 0,
              description: adjustment.reason,
            },
            {
              journalEntryId: saved.id,
              lineNumber: 2,
              glAccountId: inventoryId,
              debitAmount: 0,
              creditAmount: amount,
              description: adjustment.reason,
            },
          ]);
          await lineRepo.save(lines);
        }
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record stock adjustment: ${error.message}`,
        error.stack,
      );
    }
  }

  async recordStockTransfer(
    organizationId: string,
    transfer: {
      itemId: string;
      quantity: number;
      fromLocationId: string;
      toLocationId: string;
    },
  ): Promise<void> {
    try {
      const journal = await this.journalRepo.findOne({
        where: { journalType: 'general', isActive: true },
      });
      if (!journal) return;

      const inventoryId = await this.resolveAccountId(
        organizationId,
        ACCOUNT_CODES.INVENTORY_TRANSFER,
      );

      await this.dataSource.transaction(async (manager) => {
        const entryRepo = manager.getRepository(JournalEntryOrmEntity);
        const lineRepo = manager.getRepository(JournalEntryLineOrmEntity);

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
          {
            journalEntryId: saved.id,
            lineNumber: 1,
            glAccountId: inventoryId,
            debitAmount: 0,
            creditAmount: transfer.quantity,
            description: `Transfer out from ${transfer.fromLocationId}`,
          },
          {
            journalEntryId: saved.id,
            lineNumber: 2,
            glAccountId: inventoryId,
            debitAmount: transfer.quantity,
            creditAmount: 0,
            description: `Transfer in to ${transfer.toLocationId}`,
          },
        ]);
        await lineRepo.save(lines);
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to record stock transfer: ${error.message}`,
        error.stack,
      );
    }
  }

  private async resolveAccountId(
    organizationId: string,
    accountCode: string,
  ): Promise<string> {
    const account = await this.glAccountRepo.findOne({
      where: { organizationId, accountCode, isActive: true },
      select: ['id'],
    });
    if (!account) {
      throw new Error(
        `GL account "${accountCode}" not found or inactive for org ${organizationId}`,
      );
    }
    return account.id;
  }
}
