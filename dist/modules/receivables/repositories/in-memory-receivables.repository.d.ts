import { AccountReceivable } from '../domains/account-receivable.entity';
import { ReceivableTransaction } from '../domains/receivable-transaction.entity';
import { ApplyAdjustmentPayload, CollectPaymentPayload, CollectPaymentResult, ReceivableListQuery, ReceivableTransactionListQuery, ReceivablesRepository, WriteOffPayload } from './receivables.repository';
export declare class InMemoryReceivablesRepository implements ReceivablesRepository {
    private readonly receivables;
    private readonly transactions;
    list(query: ReceivableListQuery): Promise<{
        items: AccountReceivable[];
        total: number;
    }>;
    collectPayment(payload: CollectPaymentPayload): Promise<CollectPaymentResult>;
    applyAdjustment(payload: ApplyAdjustmentPayload): Promise<CollectPaymentResult>;
    writeOff(payload: WriteOffPayload): Promise<CollectPaymentResult>;
    listTransactions(query: ReceivableTransactionListQuery): Promise<{
        items: ReceivableTransaction[];
        total: number;
    }>;
}
