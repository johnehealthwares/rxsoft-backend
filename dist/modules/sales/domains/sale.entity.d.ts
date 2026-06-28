export declare class Sale {
    readonly id: string;
    readonly organizationId: string;
    readonly saleNumber: string;
    readonly saleChannel: 'pos' | 'invoice' | 'mobile';
    readonly storeId: string;
    readonly storeName: string | null;
    readonly status: 'draft' | 'posted' | 'voided' | 'refunded';
    readonly totalAmount: number;
    readonly paidAmount: number;
    readonly changeAmount: number;
    readonly saleDate: Date;
    constructor(id: string, organizationId: string, saleNumber: string, saleChannel: 'pos' | 'invoice' | 'mobile', storeId: string, storeName: string | null, status: 'draft' | 'posted' | 'voided' | 'refunded', totalAmount: number, paidAmount: number, changeAmount: number, saleDate: Date);
}
