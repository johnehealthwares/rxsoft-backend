export declare class ListStockMovementsDto {
    page: number;
    limit: number;
    movementType?: 'in' | 'out' | 'transfer' | 'adjustment';
    itemId?: string;
    locationId?: string;
    fromDate?: string;
    toDate?: string;
    get offset(): number;
}
