"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivableTransactionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReceivableTransactionResponseDto {
    id;
    receivableId;
    transactionType;
    amount;
    transactionDate;
    paymentMethodId;
    referenceNumber;
    receivedByUserId;
    note;
}
exports.ReceivableTransactionResponseDto = ReceivableTransactionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReceivableTransactionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReceivableTransactionResponseDto.prototype, "receivableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['charge', 'payment', 'adjustment', 'write_off'] }),
    __metadata("design:type", String)
], ReceivableTransactionResponseDto.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReceivableTransactionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReceivableTransactionResponseDto.prototype, "transactionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ReceivableTransactionResponseDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ReceivableTransactionResponseDto.prototype, "referenceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ReceivableTransactionResponseDto.prototype, "receivedByUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ReceivableTransactionResponseDto.prototype, "note", void 0);
//# sourceMappingURL=receivable-transaction-response.dto.js.map