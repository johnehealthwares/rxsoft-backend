import { PaymentMethodOrmEntity } from './payment-method.orm-entity';
import type { SaleOrmEntity } from './sale.orm-entity';
export declare class SalePaymentOrmEntity {
    id: string;
    sale: SaleOrmEntity;
    paymentMethod: PaymentMethodOrmEntity;
    amount: number;
    paymentReference: string | null;
    paidAt: Date;
    receivedByUserId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
