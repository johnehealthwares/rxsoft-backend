import type { ItemSummaryType } from './catalog.types';
import type { StockLocationType } from './inventory.types';

export type PriceListType = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PriceListItemType = {
  id: string;
  priceListId: string;
  priceList: PriceListType;
  item: ItemSummaryType;
  currencyCode: string;
  unitPrice: number;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseOrderType = {
  id: string;
  organizationId: string;
  purchaseOrderNumber: string;
  supplierId: string;
  warehouseId: string;
  currencyCode: string;
  orderDate: string;
  expectedDate: string | null;
  status: 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  createdByUserId: string | null;
  approvedByUserId: string | null;
  approvedAt: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseOrderLineType = {
  id: string;
  purchaseOrderId: string;
  itemId: string;
  orderedQty: number;
  receivedQty: number;
  uomId: string;
  unitCost: number;
  discountPercent: number;
  taxPercent: number;
  lineSubtotal: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};
