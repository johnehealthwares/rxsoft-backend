export declare class ListStockMovementsDto {
    page: number;
    limit: number;
    movementType?: 'in' | 'out' | 'transfer' | 'adjustment';
    get offset(): number;
}
