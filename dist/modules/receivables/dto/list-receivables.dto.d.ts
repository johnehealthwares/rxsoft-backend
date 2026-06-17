export declare class ListReceivablesDto {
    page: number;
    limit: number;
    status?: 'open' | 'partially_paid' | 'closed' | 'written_off';
    customerId?: string;
    get offset(): number;
}
