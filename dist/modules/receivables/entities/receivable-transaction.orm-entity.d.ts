import { PaymentMethodOrmEntity } from '../../sales/entities/payment-method.orm-entity';
import { AccountReceivableOrmEntity } from '../../sales/entities/account-receivable.orm-entity';
export declare class ReceivableTransactionOrmEntity {
    id: string;
    receivable: AccountReceivableOrmEntity;
    transactionType: 'charge' | 'payment' | 'adjustment' | 'write_off';
    amount: number;
    transactionDate: Date;
    paymentMethod: PaymentMethodOrmEntity | null;
    referenceNumber: string | null;
    receivedByUserId: string | null;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
}
