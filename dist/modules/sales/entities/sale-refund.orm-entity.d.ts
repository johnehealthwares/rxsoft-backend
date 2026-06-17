import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { SaleOrmEntity } from './sale.orm-entity';
import { SaleRefundLineOrmEntity } from './sale-refund-line.orm-entity';
export declare class SaleRefundOrmEntity {
    id: string;
    organizationId: string;
    sale: SaleOrmEntity;
    refundNumber: string;
    status: 'posted' | 'voided';
    totalAmount: number;
    refundDate: Date;
    reason: string | null;
    refundedByUser: UserOrmEntity;
    lines: SaleRefundLineOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
