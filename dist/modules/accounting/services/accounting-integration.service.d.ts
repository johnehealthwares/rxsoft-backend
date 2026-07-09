import { DataSource, Repository } from 'typeorm';
import { GlAccountOrmEntity, JournalEntryLineOrmEntity, JournalEntryOrmEntity, JournalOrmEntity } from '../entities';
export declare class AccountingIntegrationService {
    private readonly dataSource;
    private readonly glAccountRepo;
    private readonly journalRepo;
    private readonly journalEntryRepo;
    private readonly journalEntryLineRepo;
    private readonly logger;
    constructor(dataSource: DataSource, glAccountRepo: Repository<GlAccountOrmEntity>, journalRepo: Repository<JournalOrmEntity>, journalEntryRepo: Repository<JournalEntryOrmEntity>, journalEntryLineRepo: Repository<JournalEntryLineOrmEntity>);
    recordSale(organizationId: string, sale: {
        id: string;
        saleNumber: string;
        totalAmount: number;
        paidAmount: number;
    }, lines: Array<{
        itemId: string;
        quantity: number;
        unitPrice: number;
    }>): Promise<void>;
    recordSaleRefund(organizationId: string, refund: {
        id: string;
        saleId: string;
        totalAmount: number;
        refundNumber: string;
    }): Promise<void>;
    recordPaymentCollection(organizationId: string, receivable: {
        id: string;
        receivableNumber: string;
    }, transaction: {
        id: string;
        amount: number;
    }): Promise<void>;
    recordReceivableAdjustment(organizationId: string, receivable: {
        id: string;
        receivableNumber: string;
    }, adjustment: {
        amount: number;
    }): Promise<void>;
    recordWriteOff(organizationId: string, receivable: {
        id: string;
        receivableNumber: string;
    }, writtenOffAmount: number): Promise<void>;
    recordGoodsReceipt(organizationId: string, receipt: {
        receiptNumber: string;
        purchaseOrderId: string;
        lines: Array<{
            itemId: string;
            receivedQty: number;
            unitCost: number;
        }>;
    }): Promise<void>;
    recordStockAdjustment(organizationId: string, adjustment: {
        stockBalanceId: string;
        deltaQuantity: number;
        reason: string;
        averageCost: number;
    }): Promise<void>;
    recordStockTransfer(organizationId: string, transfer: {
        itemId: string;
        quantity: number;
        fromLocationId: string;
        toLocationId: string;
    }): Promise<void>;
    private resolveAccountId;
}
