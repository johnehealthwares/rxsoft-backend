"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockBalance = exports.StockLotReference = exports.StockLocationReference = exports.ItemReference = void 0;
class ItemReference {
    id;
    code;
    name;
    constructor(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}
exports.ItemReference = ItemReference;
class StockLocationReference {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.StockLocationReference = StockLocationReference;
class StockLotReference {
    id;
    code;
    constructor(id, code) {
        this.id = id;
        this.code = code;
    }
}
exports.StockLotReference = StockLotReference;
class StockBalance {
    id;
    organizationId;
    item;
    location;
    lot;
    quantityOnHand;
    quantityReserved;
    averageCost;
    reorderMinQty;
    reorderMaxQty;
    constructor(id, organizationId, item, location, lot, quantityOnHand, quantityReserved, averageCost, reorderMinQty, reorderMaxQty) {
        this.id = id;
        this.organizationId = organizationId;
        this.item = item;
        this.location = location;
        this.lot = lot;
        this.quantityOnHand = quantityOnHand;
        this.quantityReserved = quantityReserved;
        this.averageCost = averageCost;
        this.reorderMinQty = reorderMinQty;
        this.reorderMaxQty = reorderMaxQty;
    }
}
exports.StockBalance = StockBalance;
//# sourceMappingURL=stock-balance.entity.js.map