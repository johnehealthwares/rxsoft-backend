"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
class Sale {
    id;
    organizationId;
    saleNumber;
    saleChannel;
    status;
    totalAmount;
    paidAmount;
    changeAmount;
    saleDate;
    constructor(id, organizationId, saleNumber, saleChannel, status, totalAmount, paidAmount, changeAmount, saleDate) {
        this.id = id;
        this.organizationId = organizationId;
        this.saleNumber = saleNumber;
        this.saleChannel = saleChannel;
        this.status = status;
        this.totalAmount = totalAmount;
        this.paidAmount = paidAmount;
        this.changeAmount = changeAmount;
        this.saleDate = saleDate;
    }
}
exports.Sale = Sale;
//# sourceMappingURL=sale.entity.js.map