import { SaleOrmEntity } from './sale.orm-entity';
import { PartyOrmEntity } from '../../customers/entities/party.orm-entity';
export declare class AccountReceivableOrmEntity {
    id: string;
    organizationId: string;
    customer: PartyOrmEntity;
    customerId: string;
    sale: SaleOrmEntity;
    saleId: string;
    receivableNumber: string;
    originalAmount: number;
    outstandingAmount: number;
    status: 'open' | 'partially_paid' | 'closed' | 'written_off';
    openedAt: Date;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
