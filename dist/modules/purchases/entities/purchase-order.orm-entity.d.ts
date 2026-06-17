import { WarehouseOrmEntity } from '../../inventory/entities/warehouse.orm-entity';
import { PartyOrmEntity } from '../../customers/entities/party.orm-entity';
import { PurchaseOrderLineOrmEntity } from './purchase-order-line.orm-entity';
export declare class PurchaseOrderOrmEntity {
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
    warehouse: WarehouseOrmEntity | null;
    supplier: PartyOrmEntity | null;
    lines: PurchaseOrderLineOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
