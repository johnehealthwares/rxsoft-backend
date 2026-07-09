import { DataSource, Repository } from 'typeorm';
import { UsersProxyService } from '../../users-proxy/users-proxy.service';
import { AccountReceivableOrmEntity } from '../../sales/entities';
import { AccountReceivable } from '../domains/account-receivable.entity';
import { ReceivableTransaction } from '../domains/receivable-transaction.entity';
import { ApplyAdjustmentPayload, CollectPaymentPayload, CollectPaymentResult, ReceivableListQuery, ReceivableTransactionListQuery, ReceivablesRepository, WriteOffPayload } from './receivables.repository';
export declare class TypeormReceivablesRepository implements ReceivablesRepository {
    private readonly receivableRepository;
    private readonly dataSource;
    private readonly usersProxy;
    constructor(receivableRepository: Repository<AccountReceivableOrmEntity>, dataSource: DataSource, usersProxy: UsersProxyService);
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
