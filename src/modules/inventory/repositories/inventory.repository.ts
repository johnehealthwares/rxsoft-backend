import { StockAdjustment } from '../domains/stock-adjustment.entity';
import { StockBalance } from '../domains/stock-balance.entity';
import type { UomFactorInfo } from '../../../shared/utils/uom';

export type StockBalanceQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  itemId?: string;
  locationId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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
  movementType: 'in' | 'out' | 'transfer' | 'adjustment' | 'base-conversion';
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
  movementType?: 'in' | 'out' | 'transfer' | 'adjustment' | 'base-conversion';
  itemId?: string;
  locationId?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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
  uomId?: string | null;
};

export type BaseUomChangePayload = {
  itemId: string;
  oldBase: UomFactorInfo;
  newBase: UomFactorInfo;
  newBaseUomId?: string | null;
  performedByUserId?: string | null;
};

export interface InventoryRepository {
  listStockBalances(query: StockBalanceQuery): Promise<{ items: StockBalance[]; total: number }>;
  listStockMovements(query: StockMovementQuery): Promise<{ items: StockMovement[]; total: number }>;
  findStockBalanceById(id: string, organizationId: string): Promise<StockBalance | null>;
  applyStockAdjustment(adjustment: StockAdjustment, organizationId: string): Promise<StockBalance>;
  rebaseStockForBaseUomChange(payload: BaseUomChangePayload): Promise<number>;
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
