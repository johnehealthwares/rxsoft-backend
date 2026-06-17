export declare class CreateStockTransferDto {
    fromLocationId: string;
    toLocationId: string;
    itemId: string;
    lotId?: string | null;
    quantity: number;
    reason?: string;
}
