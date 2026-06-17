export declare class ReceivableTransactionResponseDto {
    id: string;
    receivableId: string;
    transactionType: 'charge' | 'payment' | 'adjustment' | 'write_off';
    amount: number;
    transactionDate: string;
    paymentMethodId: string | null;
    referenceNumber: string | null;
    receivedByUserId: string | null;
    note: string | null;
}
