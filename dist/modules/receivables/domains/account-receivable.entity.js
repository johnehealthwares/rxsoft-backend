"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountReceivable = void 0;
class AccountReceivable {
    id;
    organizationId;
    customerId;
    saleId;
    receivableNumber;
    originalAmount;
    outstandingAmount;
    status;
    openedAt;
    closedAt;
    constructor(id, organizationId, customerId, saleId, receivableNumber, originalAmount, outstandingAmount, status, openedAt, closedAt) {
        this.id = id;
        this.organizationId = organizationId;
        this.customerId = customerId;
        this.saleId = saleId;
        this.receivableNumber = receivableNumber;
        this.originalAmount = originalAmount;
        this.outstandingAmount = outstandingAmount;
        this.status = status;
        this.openedAt = openedAt;
        this.closedAt = closedAt;
    }
}
exports.AccountReceivable = AccountReceivable;
//# sourceMappingURL=account-receivable.entity.js.map