export declare class PaymentMethodOrmEntity {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    methodType: 'cash' | 'card' | 'transfer' | 'wallet' | 'insurance';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
