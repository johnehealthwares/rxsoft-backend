import { SaleLineOrmEntity } from './sale-line.orm-entity';
import { SaleRefundOrmEntity } from './sale-refund.orm-entity';
export declare class SaleRefundLineOrmEntity {
    id: string;
    refund: SaleRefundOrmEntity;
    saleLine: SaleLineOrmEntity;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    createdAt: Date;
    updatedAt: Date;
}
