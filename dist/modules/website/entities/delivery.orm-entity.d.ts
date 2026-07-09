import type { OrderOrmEntity } from './order.orm-entity';
export declare class DeliveryOrmEntity {
    id: string;
    order: OrderOrmEntity;
    address: string;
    city: string | null;
    state: string | null;
    phone: string | null;
    shippingMethod: string | null;
    trackingNumber: string | null;
    status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'failed';
    notes: string | null;
    deliveredAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
