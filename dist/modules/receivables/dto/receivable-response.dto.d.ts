export declare class ReceivableResponseDto {
    id: string;
    customerId: string;
    saleId: string;
    receivableNumber: string;
    originalAmount: number;
    outstandingAmount: number;
    status: 'open' | 'partially_paid' | 'closed' | 'written_off';
    openedAt: string;
    closedAt: string | null;
}
