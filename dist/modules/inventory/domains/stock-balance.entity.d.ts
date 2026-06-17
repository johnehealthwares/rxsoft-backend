export declare class ItemReference {
    readonly id: string;
    readonly code: string;
    readonly name: string;
    constructor(id: string, code: string, name: string);
}
export declare class StockLocationReference {
    readonly id: string;
    readonly name: string;
    constructor(id: string, name: string);
}
export declare class StockLotReference {
    readonly id: string;
    readonly code: string;
    constructor(id: string, code: string);
}
export declare class StockBalance {
    readonly id: string;
    readonly organizationId: string;
    readonly item: ItemReference;
    readonly location: StockLocationReference;
    readonly lot: StockLotReference | null;
    quantityOnHand: number;
    readonly quantityReserved: number;
    readonly averageCost: number;
    readonly reorderMinQty: number | null;
    readonly reorderMaxQty: number | null;
    constructor(id: string, organizationId: string, item: ItemReference, location: StockLocationReference, lot: StockLotReference | null, quantityOnHand: number, quantityReserved: number, averageCost: number, reorderMinQty: number | null, reorderMaxQty: number | null);
}
