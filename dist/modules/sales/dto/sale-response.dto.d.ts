export declare class SaleResponseDto {
    id: string;
    saleNumber: string;
    saleChannel: 'pos' | 'invoice' | 'mobile';
    status: 'draft' | 'posted' | 'voided' | 'refunded';
    totalAmount: number;
    paidAmount: number;
    changeAmount: number;
    saleDate: string;
}
