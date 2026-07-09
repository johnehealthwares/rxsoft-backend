import type { OrderOrmEntity } from './order.orm-entity';
export declare class OrderItemOrmEntity {
    id: string;
    order: OrderOrmEntity;
    itemId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
}
