"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMapper = void 0;
const stock_balance_entity_1 = require("../domains/stock-balance.entity");
class InventoryMapper {
    static toDomainStockBalance(orm) {
        if (!orm.item || !orm.location) {
            throw new Error('StockBalanceOrmEntity relations (item, location) must be loaded');
        }
        return new stock_balance_entity_1.StockBalance(orm.id, orm.organizationId, {
            id: orm.item.id,
            code: orm.item.code,
            name: orm.item.name,
        }, {
            id: orm.location.id,
            name: orm.location.name,
        }, orm.lot
            ? {
                id: orm.lot.id,
                code: orm.lot.code,
            }
            : null, orm.quantityOnHand, orm.quantityReserved, orm.averageCost, orm.reorderMinQty, orm.reorderMaxQty);
    }
}
exports.InventoryMapper = InventoryMapper;
//# sourceMappingURL=inventory.mapper.js.map