import { StockAdjustment } from '../domains/stock-adjustment.entity';
import { StockBalance } from '../domains/stock-balance.entity';

export type StockBalanceQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  itemId?: string;
  locationId?: string;
};

export type StoreStockLocation = {
  id: string;
  organizationId: string;
  storeId: string;
  stockLocationId: string;
  purpose: 'sale_issue' | 'sale_return';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type StockMovement = {
  id: string;
  organizationId: string;
  itemId: string;
  item?: { id: string; code: string | null; name: string } | null;
  lotId: string | null;
  fromLocationId: string | null;
  fromLocation?: { id: string; name: string } | null;
  toLocationId: string | null;
  toLocation?: { id: string; name: string } | null;
  movementType: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  unitCost: number | null;
  occurredAt: Date;
  createdAt: Date;
  createdByUserId: string | null;
};

export type StockMovementQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  movementType?: 'in' | 'out' | 'transfer' | 'adjustment';
  itemId?: string;
  locationId?: string;
  fromDate?: string;
  toDate?: string;
};

export type StoreStockLocationQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  storeId?: string;
  purpose?: 'sale_issue' | 'sale_return';
  isActive?: boolean;
};

export type CreateStoreStockLocationPayload = {
  organizationId: string;
  storeId: string;
  stockLocationId: string;
  purpose: 'sale_issue' | 'sale_return';
  isActive: boolean;
};

export type AdjustStockByReferencePayload = {
  organizationId: string;
  itemId: string;
  locationId: string;
  lotId?: string | null;
  deltaQuantity: number;
  reason: string;
  performedByUserId: string;
  uomId?: string | null;
  reorderMinQty?: number | null;
  reorderMaxQty?: number | null;
};

export type TransferStockPayload = {
  organizationId: string;
  fromLocationId: string;
  toLocationId: string;
  itemId: string;
  lotId?: string | null;
  quantity: number;
  reason: string;
  performedByUserId: string;
};

export interface InventoryRepository {
  listStockBalances(query: StockBalanceQuery): Promise<{ items: StockBalance[]; total: number }>;
  listStockMovements(query: StockMovementQuery): Promise<{ items: StockMovement[]; total: number }>;
  findStockBalanceById(id: string, organizationId: string): Promise<StockBalance | null>;
  applyStockAdjustment(adjustment: StockAdjustment, organizationId: string): Promise<StockBalance>;
  listStoreStockLocations(query: StoreStockLocationQuery): Promise<{ items: StoreStockLocation[]; total: number }>;
  createStoreStockLocation(payload: CreateStoreStockLocationPayload): Promise<StoreStockLocation>;
  setStoreStockLocationActivation(
    id: string,
    organizationId: string,
    isActive: boolean,
  ): Promise<StoreStockLocation>;
  adjustStockByReference(payload: AdjustStockByReferencePayload): Promise<StockBalance>;
  transferStock(payload: TransferStockPayload): Promise<{ fromBalance: StockBalance; toBalance: StockBalance }>;
}
