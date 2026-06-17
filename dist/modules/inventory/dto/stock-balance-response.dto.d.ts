export declare class StockBalanceItemRefDto {
    id: string;
    code: string;
    name: string;
}
export declare class StockBalanceLocationRefDto {
    id: string;
    name: string;
}
export declare class StockBalanceLotRefDto {
    id: string;
    code: string;
}
export declare class StockBalanceResponseDto {
    id: string;
    item: StockBalanceItemRefDto;
    location: StockBalanceLocationRefDto;
    lot: StockBalanceLotRefDto | null;
    itemId: string;
    locationId: string;
    lotId: string | null;
    quantityOnHand: number;
    quantityReserved: number;
    averageCost: number;
    reorderMinQty: number | null;
    reorderMaxQty: number | null;
}
