import { StockBalance } from '../domains/stock-balance.entity';
import { StockBalanceOrmEntity } from '../entities/stock-balance.orm-entity';

export class InventoryMapper {
  static toDomainStockBalance(orm: StockBalanceOrmEntity): StockBalance {
    if (!orm.item || !orm.location) {
      throw new Error('StockBalanceOrmEntity relations (item, location) must be loaded');
    }

    return new StockBalance(
      orm.id,
      orm.organizationId,
      {
        id: orm.item.id,
        code: null,
        name: orm.item.name,
      },
      {
        id: orm.location.id,
        name: orm.location.name,
      },
      orm.lot
        ? {
            id: orm.lot.id,
            code: orm.lot.code,
          }
        : null,
      orm.quantityOnHand,
      orm.quantityReserved,
      orm.averageCost,
      orm.reorderMinQty,
      orm.reorderMaxQty,
    );
  }
}
