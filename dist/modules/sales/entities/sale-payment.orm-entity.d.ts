import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { PaymentMethodOrmEntity } from './payment-method.orm-entity';
import { SaleOrmEntity } from './sale.orm-entity';
export declare class SalePaymentOrmEntity {
    id: string;
    sale: SaleOrmEntity;
    paymentMethod: PaymentMethodOrmEntity;
    amount: number;
    paymentReference: string | null;
    paidAt: Date;
    receivedByUser: UserOrmEntity | null;
    createdAt: Date;
    updatedAt: Date;
}
