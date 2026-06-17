export declare class PurchaseLineDto {
    itemId: string;
    orderedQty: number;
    receivedQty?: number;
    uomId: string;
    unitCost: number;
    discountPercent?: number;
    taxPercent?: number;
}
export declare class CreatePurchaseDto {
    supplierId: string;
    warehouseId: string;
    branchId?: string;
    purchaseOrderNumber?: string;
    currencyCode?: string;
    orderDate?: string;
    expectedDate?: string;
    status?: 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';
    note?: string;
    invoiceNumber?: string;
    itemId?: string;
    quantity?: number;
    unitCost?: number;
    lines?: PurchaseLineDto[];
}
export declare class UpdatePurchaseDto extends CreatePurchaseDto {
}
