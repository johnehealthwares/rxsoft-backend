export declare class DeliveryAreaOrmEntity {
    id: string;
    state: string;
    city: string;
    deliveryFee: number;
    minOrderAmount: number;
    freeDeliveryAbove: number | null;
    estimatedDeliveryHours: number | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
