export declare class CreateSaleRefundResponseDto {
    id: string;
    saleId: string;
    refundNumber: string;
    status: 'posted' | 'voided';
    totalAmount: number;
    refundDate: string;
}
