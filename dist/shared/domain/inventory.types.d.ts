export type WarehouseType = {
    id: string;
    organizationId: string;
    storeId: string | null;
    code: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
export type StockLocationType = {
    id: string;
    organizationId: string;
    warehouseId: string | null;
    warehouse: WarehouseType | null;
    parentId: string | null;
    parent: {
        id: string;
        organizationId: string;
        warehouseId: string | null;
        code: string | null;
        name: string;
        locationType: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    } | null;
    code: string | null;
    name: string;
    locationType: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
export type StockBalanceType = {
    id: string;
    organizationId: string;
    item: {
        id: string;
        code: string;
        name: string;
    };
    location: {
        id: string;
        name: string;
    };
    lot: {
        id: string;
        code: string;
    } | null;
    quantityOnHand: number;
    quantityReserved: number;
    averageCost: number;
    reorderMinQty: number | null;
    reorderMaxQty: number | null;
};
export type StockAdjustmentType = {
    id: string;
    stockBalanceId: string;
    reason: string;
    deltaQuantity: number;
    performedByUserId: string;
    performedAt: string;
    createdAt: string;
};
export type StockLotType = {
    id: string;
    organizationId: string;
    itemId: string;
    lotCode: string;
    manufacturingDate: string | null;
    expiryDate: string | null;
    supplierId: string | null;
    purchaseOrderLineId: string | null;
    createdAt: string;
    updatedAt: string;
};
export type StockMovementType = {
    id: string;
    organizationId: string;
    inventoryDocumentId: string | null;
    inventoryDocumentLineId: string | null;
    itemId: string;
    lotId: string | null;
    fromLocationId: string | null;
    toLocationId: string | null;
    movementType: 'in' | 'out' | 'transfer' | 'adjustment';
    quantity: number;
    unitCost: number | null;
    occurredAt: string;
    createdByUserId: string | null;
};
export type StoreStockLocationType = {
    id: string;
    organizationId: string;
    storeId: string;
    stockLocationId: string;
    purpose: 'sale_issue' | 'sale_return';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
