export declare class GlAccountOrmEntity {
    id: string;
    organizationId: string;
    accountCode: string;
    accountName: string;
    accountType: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
    allowsReconciliation: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
