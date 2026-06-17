"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivableTransaction = void 0;
class ReceivableTransaction {
    id;
    receivableId;
    transactionType;
    amount;
    transactionDate;
    paymentMethodId;
    referenceNumber;
    receivedByUserId;
    note;
    constructor(id, receivableId, transactionType, amount, transactionDate, paymentMethodId, referenceNumber, receivedByUserId, note) {
        this.id = id;
        this.receivableId = receivableId;
        this.transactionType = transactionType;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.paymentMethodId = paymentMethodId;
        this.referenceNumber = referenceNumber;
        this.receivedByUserId = receivedByUserId;
        this.note = note;
    }
}
exports.ReceivableTransaction = ReceivableTransaction;
//# sourceMappingURL=receivable-transaction.entity.js.map