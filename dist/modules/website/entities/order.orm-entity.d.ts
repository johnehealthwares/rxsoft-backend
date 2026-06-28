import { OrderItemOrmEntity } from './order-item.orm-entity';
import { DeliveryOrmEntity } from './delivery.orm-entity';
import { SaleOrmEntity } from '../../sales/entities/sale.orm-entity';
export declare class OrderOrmEntity {
    id: string;
    orderNumber: string;
    customerId: string | null;
    paymentMethod: string;
    notes: string | null;
    orderStatus: 'pending' | 'confirmed' | 'processing' | 'dispatched' | 'in_transit' | 'delivered' | 'cancelled';
    saleId: string | null;
    sale: SaleOrmEntity | null;
    createdBy: string | null;
    subtotalAmount: number;
    totalAmount: number;
    items: OrderItemOrmEntity[];
    delivery: DeliveryOrmEntity | null;
    createdAt: Date;
    updatedAt: Date;
}
