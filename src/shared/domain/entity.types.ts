import type { AuditLogOrmEntity } from '../../modules/audit/entities/audit-log.orm-entity';
import type { DrugComponentOrmEntity } from '../../modules/catalog/entities/drug-component.orm-entity';
import type { GenericProductOrmEntity } from '../../modules/catalog/entities/generic-product.orm-entity';
import type { PharmaceuticsOrmEntity } from '../../modules/catalog/entities/pharmaceutics.orm-entity';
import type { ItemCategoryOrmEntity as CatalogItemCategoryOrmEntity } from '../../modules/catalog/entities/item-category.orm-entity';
import type { ItemOrmEntity } from '../../modules/catalog/entities/item.orm-entity';
// import type { ItemCategoryOrmEntity as CategoriesItemCategoryOrmEntity } from '../../modules/categories/entities/item-category.orm-entity';
import type { PartyOrmEntity } from '../../modules/customers/entities/party.orm-entity';
import type { PermissionOrmEntity } from '../../modules/identity/entities/permission.orm-entity';
import type { RefreshTokenOrmEntity } from '../../modules/identity/entities/refresh-token.orm-entity';
import type { RoleOrmEntity } from '../../modules/identity/entities/role.orm-entity';
import type { UserOrmEntity } from '../../modules/identity/entities/user.orm-entity';
import type { StockAdjustmentOrmEntity } from '../../modules/inventory/entities/stock-adjustment.orm-entity';
import type { StockBalanceOrmEntity } from '../../modules/inventory/entities/stock-balance.orm-entity';
import type { StockLocationOrmEntity } from '../../modules/inventory/entities/stock-location.orm-entity';
import type { StockLotOrmEntity } from '../../modules/inventory/entities/stock-lot.orm-entity';
import type { StockMovementOrmEntity } from '../../modules/inventory/entities/stock-movement.orm-entity';
import type { StoreStockLocationOrmEntity } from '../../modules/inventory/entities/store-stock-location.orm-entity';
import type { WarehouseOrmEntity } from '../../modules/inventory/entities/warehouse.orm-entity';
import type { PriceListItemOrmEntity } from '../../modules/pricing/entities/price-list-item.orm-entity';
import type { PriceListOrmEntity } from '../../modules/pricing/entities/price-list.orm-entity';
import type { PurchaseOrderLineOrmEntity } from '../../modules/purchases/entities/purchase-order-line.orm-entity';
import type { PurchaseOrderOrmEntity } from '../../modules/purchases/entities/purchase-order.orm-entity';
import type { ReceivableTransactionOrmEntity } from '../../modules/receivables/entities/receivable-transaction.orm-entity';
import type { AccountReceivableOrmEntity } from '../../modules/sales/entities/account-receivable.orm-entity';
import type { PaymentMethodOrmEntity } from '../../modules/sales/entities/payment-method.orm-entity';
import type { SaleLineOrmEntity } from '../../modules/sales/entities/sale-line.orm-entity';
import type { SalePaymentOrmEntity } from '../../modules/sales/entities/sale-payment.orm-entity';
import type { SaleRefundLineOrmEntity } from '../../modules/sales/entities/sale-refund-line.orm-entity';
import type { SaleRefundOrmEntity } from '../../modules/sales/entities/sale-refund.orm-entity';
import type { SaleOrmEntity } from '../../modules/sales/entities/sale.orm-entity';
import type { UomOrmEntity } from '../../modules/sales/entities/uom.orm-entity';

type EntityIdRef<T> = T extends { id: infer TId extends string } ? { id: TId } : never;

type SerializeEntityValue<T> =
  T extends Date ? string :
  T extends Date | null ? string | null :
  T extends Array<infer TItem> ? Array<EntityIdRef<TItem>> :
  T extends object | null ? EntityIdRef<NonNullable<T>> | null :
  T;

type SerializedEntity<T> = {
  [K in keyof T]: SerializeEntityValue<T[K]>;
};

export type AuditLogEntityType = SerializedEntity<AuditLogOrmEntity>;
export type DrugComponentEntityType = SerializedEntity<DrugComponentOrmEntity>;
export type GenericProductEntityType = SerializedEntity<GenericProductOrmEntity>;
export type PharmacologyInfoEntityType = SerializedEntity<PharmaceuticsOrmEntity>;
export type CatalogItemCategoryEntityType = SerializedEntity<CatalogItemCategoryOrmEntity>;
export type ItemEntityType = SerializedEntity<ItemOrmEntity>;
// export type CategoriesItemCategoryEntityType = SerializedEntity<CategoriesItemCategoryOrmEntity>;
export type PartyEntityType = SerializedEntity<PartyOrmEntity>;
export type PermissionEntityType = SerializedEntity<PermissionOrmEntity>;
export type RefreshTokenEntityType = SerializedEntity<RefreshTokenOrmEntity>;
export type RoleEntityType = SerializedEntity<RoleOrmEntity>;
export type UserEntityType = SerializedEntity<UserOrmEntity>;
export type StockAdjustmentEntityType = SerializedEntity<StockAdjustmentOrmEntity>;
export type StockBalanceEntityType = SerializedEntity<StockBalanceOrmEntity>;
export type StockLocationEntityType = SerializedEntity<StockLocationOrmEntity>;
export type StockLotEntityType = SerializedEntity<StockLotOrmEntity>;
export type StockMovementEntityType = SerializedEntity<StockMovementOrmEntity>;
export type StoreStockLocationEntityType = SerializedEntity<StoreStockLocationOrmEntity>;
export type WarehouseEntityType = SerializedEntity<WarehouseOrmEntity>;
export type PriceListItemEntityType = SerializedEntity<PriceListItemOrmEntity>;
export type PriceListEntityType = SerializedEntity<PriceListOrmEntity>;
export type PurchaseOrderLineEntityType = SerializedEntity<PurchaseOrderLineOrmEntity>;
export type PurchaseOrderEntityType = SerializedEntity<PurchaseOrderOrmEntity>;
export type ReceivableTransactionEntityType = SerializedEntity<ReceivableTransactionOrmEntity>;
export type AccountReceivableEntityType = SerializedEntity<AccountReceivableOrmEntity>;
export type PaymentMethodEntityType = SerializedEntity<PaymentMethodOrmEntity>;
export type SaleLineEntityType = SerializedEntity<SaleLineOrmEntity>;
export type SalePaymentEntityType = SerializedEntity<SalePaymentOrmEntity>;
export type SaleRefundLineEntityType = SerializedEntity<SaleRefundLineOrmEntity>;
export type SaleRefundEntityType = SerializedEntity<SaleRefundOrmEntity>;
export type SaleEntityType = SerializedEntity<SaleOrmEntity>;
export type UomEntityType = SerializedEntity<UomOrmEntity>;
