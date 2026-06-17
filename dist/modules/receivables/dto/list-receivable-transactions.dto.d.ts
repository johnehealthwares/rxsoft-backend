export declare class ListReceivableTransactionsDto {
    page: number;
    limit: number;
    transactionType?: 'charge' | 'payment' | 'adjustment' | 'write_off';
    get offset(): number;
}
