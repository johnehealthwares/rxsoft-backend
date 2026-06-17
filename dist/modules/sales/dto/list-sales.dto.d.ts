export declare class ListSalesDto {
    page: number;
    limit: number;
    search?: string;
    status?: 'draft' | 'posted' | 'voided' | 'refunded';
    get offset(): number;
}
