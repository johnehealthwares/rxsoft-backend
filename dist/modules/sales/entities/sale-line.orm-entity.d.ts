import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockLotOrmEntity } from '../../inventory/entities/stock-lot.orm-entity';
import { SaleOrmEntity } from './sale.orm-entity';
import { UomOrmEntity } from './uom.orm-entity';
export declare class SaleLineOrmEntity {
    id: string;
    sale: SaleOrmEntity;
    lineNumber: number;
    item: ItemOrmEntity;
    lot: StockLotOrmEntity | null;
    uom: UomOrmEntity;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    taxPercent: number;
    lineSubtotal: number;
    lineTotal: number;
    createdAt: Date;
    updatedAt: Date;
}
