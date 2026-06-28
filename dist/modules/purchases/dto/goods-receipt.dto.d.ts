export declare class ReceiveGoodsLineDto {
    itemId: string;
    receivedQty: number;
    unitCost: number;
    uomId: string;
}
export declare class ReceiveGoodsDto {
    purchaseOrderId: string;
    receivedDate: string;
    receiptNumber?: string;
    overrideCodeValidation?: boolean;
    note?: string;
    lines: ReceiveGoodsLineDto[];
}
export declare class GoodsReceiptLineResponseDto {
    id: string;
    itemId: string;
    receivedQty: number;
    unitCost: number;
    uomId: string;
}
export declare class GoodsReceiptResponseDto {
    id: string;
    receiptNumber: string;
    purchaseOrderId: string;
    receivedDate: string;
    note: string | null;
    lines: GoodsReceiptLineResponseDto[];
}
