"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockAdjustment = void 0;
class StockAdjustment {
    id;
    stockBalanceId;
    reason;
    deltaQuantity;
    performedByUserId;
    performedAt;
    constructor(id, stockBalanceId, reason, deltaQuantity, performedByUserId, performedAt) {
        this.id = id;
        this.stockBalanceId = stockBalanceId;
        this.reason = reason;
        this.deltaQuantity = deltaQuantity;
        this.performedByUserId = performedByUserId;
        this.performedAt = performedAt;
    }
}
exports.StockAdjustment = StockAdjustment;
//# sourceMappingURL=stock-adjustment.entity.js.map