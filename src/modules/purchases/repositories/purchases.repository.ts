import { PurchaseOrderLineOrmEntity } from '../entities/purchase-order-line.orm-entity';
import { PurchaseOrderOrmEntity } from '../entities/purchase-order.orm-entity';
import { GoodsReceiptOrmEntity } from '../entities/goods-receipt.orm-entity';

export type PurchaseOrderStatus = 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';

export type PurchaseListQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  status?: string;
};

export type CreatePurchasePayload = {
  organizationId: string;
  purchaseOrderNumber: string;
  supplierId: string;
  warehouseId: string;
  currencyCode: string;
  orderDate: string;
  expectedDate: string | null;
  status: PurchaseOrderStatus;
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  createdByUserId: string;
  approvedByUserId: string | null;
  approvedAt: Date | null;
  note: string | null;
  lines: Array<{
    itemId: string;
    orderedQty: number;
    receivedQty: number;
    uomId: string;
    unitCost: number;
    discountPercent: number;
    taxPercent: number;
    lineSubtotal: number;
    lineTotal: number;
  }>;
};

export type PurchaseUpdatePayload = Partial<CreatePurchasePayload> & {
  lines?: CreatePurchasePayload['lines'];
};

export type GoodsReceiptPayload = {
  organizationId: string;
  receiptNumber: string;
  purchaseOrderId: string;
  receivedDate: Date;
  createdByUserId: string;
  note: string | null;
  lines: Array<{
    itemId: string;
    orderedQty: number;
    receivedQty: number;
    uomId: string;
    unitCost: number;
  }>;
};

export type ReceiveGoodsResult = {
  receiptId: string;
  receiptNumber: string;
  poStatus: string;
  lines: Array<{ itemId: string; receiptLineId: string; receivedQty: number }>;
};

export type ReceiptListQuery = {
  organizationId: string;
  purchaseOrderId?: string;
  search?: string;
  offset: number;
  limit: number;
};

export type UnpostGoodsPayload = {
  organizationId: string;
  receiptLineId: string;
  performedByUserId: string;
};

export type PurchasesAnalyticsQuery = {
  organizationId: string;
  from?: string;
  to?: string;
  warehouseId?: string;
  categoryCode?: string;
  supplierId?: string;
};

export type PurchasesAnalyticsTrendPoint = {
  day: string;
  value: number;
  orders: number;
};

export type PurchasesAnalyticsCategory = {
  code: string;
  name: string;
  value: number;
  pct: number;
};

export type PurchasesAnalyticsSupplier = {
  supplierId: string;
  name: string;
  value: number;
};

export type PurchasesAnalyticsLocation = {
  warehouseId: string;
  name: string;
  value: number;
  pct: number;
};

export type PurchasesAnalyticsStatus = {
  status: string;
  count: number;
};

export type PurchasesAnalyticsRecentPurchase = {
  id: string;
  purchaseOrderNumber: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  supplierName: string | null;
};

export type PurchasesAnalytics = {
  summary: {
    totalValue: number;
    totalPOs: number;
    itemsPurchased: number;
    averagePOValue: number;
    activeSuppliers: number;
    topSupplier: { supplierId: string; name: string; value: number } | null;
  };
  trend: PurchasesAnalyticsTrendPoint[];
  byCategory: PurchasesAnalyticsCategory[];
  bySupplier: PurchasesAnalyticsSupplier[];
  byLocation: PurchasesAnalyticsLocation[];
  byStatus: PurchasesAnalyticsStatus[];
  recent: PurchasesAnalyticsRecentPurchase[];
};

export interface PurchasesRepository {
  list(query: PurchaseListQuery): Promise<{ items: PurchaseOrderOrmEntity[]; total: number }>;
  getById(id: string, organizationId: string): Promise<PurchaseOrderOrmEntity | null>;
  create(payload: CreatePurchasePayload): Promise<PurchaseOrderOrmEntity>;
  update(id: string, organizationId: string, payload: PurchaseUpdatePayload): Promise<PurchaseOrderOrmEntity>;
  delete(id: string, organizationId: string): Promise<void>;
  receiveGoods(payload: GoodsReceiptPayload): Promise<ReceiveGoodsResult>;
  unpostGoods(payload: UnpostGoodsPayload): Promise<void>;
  listReceipts(query: ReceiptListQuery): Promise<{ items: GoodsReceiptOrmEntity[]; total: number }>;
  findLastReceipt(organizationId: string): Promise<Pick<GoodsReceiptOrmEntity, 'receiptNumber'> | null>;
  getAnalytics(query: PurchasesAnalyticsQuery): Promise<PurchasesAnalytics>;
}
