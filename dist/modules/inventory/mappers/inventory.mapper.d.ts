import { StockBalance } from '../domains/stock-balance.entity';
import { StockBalanceOrmEntity } from '../entities/stock-balance.orm-entity';
export declare class InventoryMapper {
    static toDomainStockBalance(orm: StockBalanceOrmEntity): StockBalance;
}
