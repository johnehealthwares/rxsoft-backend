import type { ItemOrmEntity } from '../../modules/catalog/entities/item.orm-entity';
import type { ManufacturerOrmEntity } from '../../modules/manufacturers/entities/manufacturer.orm-entity';
// import type { ItemCategoryOrmEntity } from '../../modules/categories/entities/item-category.orm-entity';
import type { GlAccountOrmEntity, JournalEntryLineOrmEntity, JournalEntryOrmEntity, JournalOrmEntity } from '../../modules/accounting/entities';
import type { PartyOrmEntity } from '../../modules/customers/entities/party.orm-entity';
import type { StockBalance } from '../../modules/inventory/domains/stock-balance.entity';
import type { StockLocationOrmEntity } from '../../modules/inventory/entities/stock-location.orm-entity';
import type { WarehouseOrmEntity } from '../../modules/inventory/entities/warehouse.orm-entity';
import type { PriceListItemOrmEntity, PriceListOrmEntity } from '../../modules/pricing/entities';
import type { PaymentMethodOrmEntity } from '../../modules/sales/entities/payment-method.orm-entity';
import type { UomCategoryOrmEntity } from '../../modules/sales/entities/uom-category.orm-entity';
import type { UomOrmEntity } from '../../modules/sales/entities/uom.orm-entity';
import type { ManufacturerType } from './catalog.types';
import type {
  PaymentMethodType,
  PartyType,
  PriceListItemType,
  PriceListType,
  ItemSummaryType,
  ItemCategoryType,
  PurchaseOrderType,
  StockBalanceType,
  StockLocationType,
  UomType,
  UomCategoryType,
  WarehouseType,
} from './index';
import { ItemCategoryOrmEntity } from 'src/modules/catalog/entities';

const toIsoString = (value: Date | null | undefined): string | null => value ? value.toISOString() : null;

export const toManufacturerType = (entity: ManufacturerOrmEntity): ManufacturerType => ({
  id: entity.id,
  code: entity.code,
  name: entity.name,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  deletedAt: toIsoString(entity.deletedAt),
});

export const toItemSummaryType = (entity: ItemOrmEntity): ItemSummaryType => ({
  id: entity.id,
  code: null,
  name: entity.name,
  barcode: null,
  baseUomId: entity.baseUomId,
  purchaseUomId: entity.purchaseUomId,
  saleUomId: entity.saleUomId,
  trackLot: entity.trackLot,
  trackExpiry: entity.trackExpiry,
  shelfLifeDays: entity.shelfLifeDays,
  isActive: true,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  deletedAt: toIsoString(entity.deletedAt),
});

export const toItemCategoryType = (entity: ItemCategoryOrmEntity): ItemCategoryType => ({
  id: entity.id,
  parentId: entity.parent?.id ?? null,
  parent: entity.parent
    ? {
        id: entity.parent.id,
        code: entity.parent.code,
        name: entity.parent.name,
      }
    : null,
  code: entity.code,
  name: entity.name,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  deletedAt: toIsoString(entity.deletedAt),
});

export const toPartyType = (entity: PartyOrmEntity): PartyType => ({
  id: entity.id,
  organizationId: entity.organizationId,
  partyType: entity.partyType,
  code: entity.code,
  name: entity.name,
  phone: entity.phone,
  email: entity.email,
  addressLine1: entity.addressLine1,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  deletedAt: toIsoString(entity.deletedAt),
});

export const toUomCategoryType = (entity: UomCategoryOrmEntity): UomCategoryType => ({
  id: entity.id,
  code: entity.code,
  name: entity.name,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toUomType = (entity: UomOrmEntity): UomType => ({
  id: entity.id,
  categoryId: entity.categoryId,
  category: entity.category,
  code: entity.code,
  name: entity.name,
  uomType: entity.uomType,
  factor: entity.factor,
  rounding: entity.rounding,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toWarehouseType = (entity: WarehouseOrmEntity): WarehouseType => ({
  id: entity.id,
  organizationId: entity.organizationId,
  storeId: entity.storeId,
  code: entity.code,
  name: entity.name,
  address: entity.address,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toStockLocationType = (entity: StockLocationOrmEntity): StockLocationType => ({
  id: entity.id,
  organizationId: entity.organizationId,
  locationId: entity.locationId ?? null,
  warehouseId: entity.warehouseId,
  warehouse: entity.warehouse ? toWarehouseType(entity.warehouse) : null,
  parentId: entity.parentId,
  parent: entity.parent
    ? {
        id: entity.parent.id,
        organizationId: entity.parent.organizationId,
        locationId: entity.parent.locationId ?? null,
        warehouseId: entity.parent.warehouseId,
        code: entity.parent.code,
        name: entity.parent.name,
        locationType: entity.parent.locationType,
        isActive: entity.parent.isActive,
        createdAt: entity.parent.createdAt.toISOString(),
        updatedAt: entity.parent.updatedAt.toISOString(),
      }
    : null,
  code: entity.code,
  name: entity.name,
  locationType: entity.locationType,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toPriceListType = (entity: PriceListOrmEntity): PriceListType => ({
  id: entity.id,
  organizationId: entity.organizationId,
  code: entity.code,
  name: entity.name,
  isDefault: entity.isDefault,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toPurchaseOrderType = (entity: {
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
  approvedAt: Date | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}): PurchaseOrderType => ({
  id: entity.id,
  organizationId: entity.organizationId,
  purchaseOrderNumber: entity.purchaseOrderNumber,
  supplierId: entity.supplierId,
  warehouseId: entity.warehouseId,
  currencyCode: entity.currencyCode,
  orderDate: entity.orderDate,
  expectedDate: entity.expectedDate,
  status: entity.status,
  subtotalAmount: Number(entity.subtotalAmount),
  taxAmount: Number(entity.taxAmount),
  totalAmount: Number(entity.totalAmount),
  createdByUserId: entity.createdByUserId,
  approvedByUserId: entity.approvedByUserId,
  approvedAt: toIsoString(entity.approvedAt),
  note: entity.note,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toPriceListItemType = (entity: PriceListItemOrmEntity): PriceListItemType => ({
  id: entity.id,
  priceListId: entity.priceList.id,
  priceList: toPriceListType(entity.priceList),
  item: toItemSummaryType(entity.item),
  currencyCode: entity.currencyCode,
  unitPrice: entity.unitPrice,
  startsAt: toIsoString(entity.startsAt),
  endsAt: toIsoString(entity.endsAt),
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toPaymentMethodType = (entity: PaymentMethodOrmEntity): PaymentMethodType => ({
  id: entity.id,
  code: entity.code,
  name: entity.name,
  methodType: entity.methodType,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toGlAccountType = (entity: GlAccountOrmEntity) => ({
  id: entity.id,
  accountCode: entity.accountCode,
  accountName: entity.accountName,
  accountType: entity.accountType,
  allowsReconciliation: entity.allowsReconciliation,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toJournalType = (entity: JournalOrmEntity) => ({
  id: entity.id,
  code: entity.code,
  name: entity.name,
  journalType: entity.journalType,
  defaultDebitAccountId: entity.defaultDebitAccountId,
  defaultCreditAccountId: entity.defaultCreditAccountId,
  isActive: entity.isActive,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});

export const toJournalEntryLineType = (entity: JournalEntryLineOrmEntity) => ({
  id: entity.id,
  journalEntryId: entity.journalEntryId,
  lineNumber: entity.lineNumber,
  glAccountId: entity.glAccountId,
  partyId: entity.partyId,
  itemId: entity.itemId,
  debitAmount: Number(entity.debitAmount),
  creditAmount: Number(entity.creditAmount),
  description: entity.description,
  createdAt: entity.createdAt.toISOString(),
});

export const toJournalEntryType = (entity: JournalEntryOrmEntity) => ({
  id: entity.id,
  journalId: entity.journalId,
  entryNumber: entity.entryNumber,
  entryDate: entity.entryDate,
  reference: entity.reference,
  sourceType: entity.sourceType,
  sourceId: entity.sourceId,
  status: entity.status,
  createdByUserId: entity.createdByUserId,
  postedAt: toIsoString(entity.postedAt),
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  lines: entity.lines ? entity.lines.map(toJournalEntryLineType) : [],
});

export const toStockBalanceType = (entity: StockBalance): StockBalanceType => ({
  id: entity.id,
  organizationId: entity.organizationId,
  item: {
    id: entity.item.id,
    code: null,
    name: entity.item.name,
  },
  location: {
    id: entity.location.id,
    name: entity.location.name,
  },
  lot: entity.lot
    ? {
        id: entity.lot.id,
        code: entity.lot.code,
      }
    : null,
  quantityOnHand: entity.quantityOnHand,
  quantityReserved: entity.quantityReserved,
  averageCost: entity.averageCost,
  reorderMinQty: entity.reorderMinQty,
  reorderMaxQty: entity.reorderMaxQty,
});
