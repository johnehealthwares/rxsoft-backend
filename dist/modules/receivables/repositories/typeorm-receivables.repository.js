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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormReceivablesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_orm_entity_1 = require("../../identity/entities/user.orm-entity");
const entities_1 = require("../../sales/entities");
const account_receivable_entity_1 = require("../domains/account-receivable.entity");
const receivable_transaction_entity_1 = require("../domains/receivable-transaction.entity");
const entities_2 = require("../entities");
function toDomain(entity) {
    return new account_receivable_entity_1.AccountReceivable(entity.id, entity.organizationId, entity.customerId, entity.customer?.name ?? null, entity.saleId, entity.receivableNumber, entity.originalAmount, entity.outstandingAmount, entity.status, entity.openedAt, entity.closedAt);
}
function toTransactionDomain(entity) {
    return new receivable_transaction_entity_1.ReceivableTransaction(entity.id, entity.receivable.id, entity.transactionType, entity.amount, entity.transactionDate, entity.paymentMethod?.id ?? null, entity.referenceNumber, entity.receivedByUser?.id ?? null, entity.note);
}
let TypeormReceivablesRepository = class TypeormReceivablesRepository {
    receivableRepository;
    dataSource;
    constructor(receivableRepository, dataSource) {
        this.receivableRepository = receivableRepository;
        this.dataSource = dataSource;
    }
    async list(query) {
        const qb = this.receivableRepository
            .createQueryBuilder('receivable')
            .leftJoinAndSelect('receivable.customer', 'customer')
            .where('receivable.organizationId = :organizationId', { organizationId: query.organizationId })
            .orderBy('receivable.openedAt', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.status) {
            qb.andWhere('receivable.status = :status', { status: query.status });
        }
        if (query.customerId) {
            qb.andWhere('receivable.customerId = :customerId', { customerId: query.customerId });
        }
        const [items, total] = await qb.getManyAndCount();
        return { items: items.map(toDomain), total };
    }
    async collectPayment(payload) {
        return this.dataSource.transaction(async (manager) => {
            const receivableRepo = manager.getRepository(entities_1.AccountReceivableOrmEntity);
            const txnRepo = manager.getRepository(entities_2.ReceivableTransactionOrmEntity);
            const paymentMethodRepo = manager.getRepository(entities_1.PaymentMethodOrmEntity);
            const userRepo = manager.getRepository(user_orm_entity_1.UserOrmEntity);
            const paymentMethod = await paymentMethodRepo.findOne({
                where: { id: payload.paymentMethodId, organizationId: payload.organizationId },
            });
            if (!paymentMethod) {
                throw new common_1.NotFoundException('Payment method not found');
            }
            const receiver = await userRepo.findOne({
                where: { id: payload.receivedByUserId, organizationId: payload.organizationId },
            });
            if (!receiver) {
                throw new common_1.NotFoundException('Receiver user not found');
            }
            const receivable = await receivableRepo.findOne({
                where: { id: payload.receivableId, organizationId: payload.organizationId },
            });
            if (!receivable) {
                throw new common_1.NotFoundException('Receivable not found');
            }
            if (receivable.status === 'written_off') {
                throw new common_1.BadRequestException('Cannot collect payment for a written-off receivable');
            }
            if (receivable.status === 'closed' || receivable.outstandingAmount <= 0) {
                throw new common_1.BadRequestException('Cannot collect payment for a closed receivable');
            }
            if (payload.amount > receivable.outstandingAmount) {
                throw new common_1.BadRequestException('Payment amount cannot exceed outstanding amount');
            }
            receivable.outstandingAmount = Number((receivable.outstandingAmount - payload.amount).toFixed(2));
            if (receivable.outstandingAmount <= 0) {
                receivable.outstandingAmount = 0;
                receivable.status = 'closed';
                receivable.closedAt = payload.transactionDate;
            }
            else {
                receivable.status = 'partially_paid';
            }
            const savedReceivable = await receivableRepo.save(receivable);
            const transaction = txnRepo.create({
                receivable: savedReceivable,
                transactionType: 'payment',
                amount: payload.amount,
                transactionDate: payload.transactionDate,
                paymentMethod,
                referenceNumber: payload.referenceNumber,
                receivedByUser: receiver,
                note: payload.note,
            });
            const savedTransaction = await txnRepo.save(transaction);
            return {
                receivable: toDomain(savedReceivable),
                transactionId: savedTransaction.id,
            };
        });
    }
    async applyAdjustment(payload) {
        return this.dataSource.transaction(async (manager) => {
            const receivableRepo = manager.getRepository(entities_1.AccountReceivableOrmEntity);
            const txnRepo = manager.getRepository(entities_2.ReceivableTransactionOrmEntity);
            const userRepo = manager.getRepository(user_orm_entity_1.UserOrmEntity);
            const actor = await userRepo.findOne({
                where: { id: payload.adjustedByUserId, organizationId: payload.organizationId },
            });
            if (!actor) {
                throw new common_1.NotFoundException('Adjustment user not found');
            }
            const receivable = await receivableRepo.findOne({
                where: { id: payload.receivableId, organizationId: payload.organizationId },
            });
            if (!receivable) {
                throw new common_1.NotFoundException('Receivable not found');
            }
            if (receivable.status === 'written_off') {
                throw new common_1.BadRequestException('Cannot adjust a written-off receivable');
            }
            receivable.outstandingAmount = Number((receivable.outstandingAmount + payload.amount).toFixed(2));
            if (receivable.outstandingAmount <= 0) {
                receivable.outstandingAmount = 0;
                receivable.status = 'closed';
                receivable.closedAt = payload.transactionDate;
            }
            else if (receivable.outstandingAmount < receivable.originalAmount) {
                receivable.status = 'partially_paid';
                receivable.closedAt = null;
            }
            else {
                receivable.status = 'open';
                receivable.closedAt = null;
            }
            const savedReceivable = await receivableRepo.save(receivable);
            const transaction = txnRepo.create({
                receivable: savedReceivable,
                transactionType: 'adjustment',
                amount: payload.amount,
                transactionDate: payload.transactionDate,
                paymentMethod: null,
                referenceNumber: payload.referenceNumber,
                receivedByUser: actor,
                note: payload.note,
            });
            const savedTransaction = await txnRepo.save(transaction);
            return {
                receivable: toDomain(savedReceivable),
                transactionId: savedTransaction.id,
            };
        });
    }
    async writeOff(payload) {
        return this.dataSource.transaction(async (manager) => {
            const receivableRepo = manager.getRepository(entities_1.AccountReceivableOrmEntity);
            const txnRepo = manager.getRepository(entities_2.ReceivableTransactionOrmEntity);
            const userRepo = manager.getRepository(user_orm_entity_1.UserOrmEntity);
            const actor = await userRepo.findOne({
                where: { id: payload.writtenOffByUserId, organizationId: payload.organizationId },
            });
            if (!actor) {
                throw new common_1.NotFoundException('Write-off user not found');
            }
            const receivable = await receivableRepo.findOne({
                where: { id: payload.receivableId, organizationId: payload.organizationId },
            });
            if (!receivable) {
                throw new common_1.NotFoundException('Receivable not found');
            }
            if (receivable.status === 'written_off') {
                throw new common_1.BadRequestException('Receivable is already written off');
            }
            if (receivable.outstandingAmount <= 0) {
                throw new common_1.BadRequestException('Only receivables with outstanding balance can be written off');
            }
            const writtenOffAmount = receivable.outstandingAmount;
            receivable.outstandingAmount = 0;
            receivable.status = 'written_off';
            receivable.closedAt = payload.transactionDate;
            const savedReceivable = await receivableRepo.save(receivable);
            const transaction = txnRepo.create({
                receivable: savedReceivable,
                transactionType: 'write_off',
                amount: writtenOffAmount,
                transactionDate: payload.transactionDate,
                paymentMethod: null,
                referenceNumber: null,
                receivedByUser: actor,
                note: payload.note,
            });
            const savedTransaction = await txnRepo.save(transaction);
            return {
                receivable: toDomain(savedReceivable),
                transactionId: savedTransaction.id,
            };
        });
    }
    async listTransactions(query) {
        const qb = this.dataSource
            .getRepository(entities_2.ReceivableTransactionOrmEntity)
            .createQueryBuilder('transaction')
            .innerJoinAndSelect('transaction.receivable', 'receivable')
            .leftJoinAndSelect('transaction.paymentMethod', 'paymentMethod')
            .leftJoinAndSelect('transaction.receivedByUser', 'receivedByUser')
            .where('receivable.organizationId = :organizationId', { organizationId: query.organizationId })
            .andWhere('receivable.id = :receivableId', { receivableId: query.receivableId })
            .orderBy('transaction.transactionDate', 'DESC')
            .addOrderBy('transaction.createdAt', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.transactionType) {
            qb.andWhere('transaction.transactionType = :transactionType', {
                transactionType: query.transactionType,
            });
        }
        const [items, total] = await qb.getManyAndCount();
        return {
            items: items.map(toTransactionDomain),
            total,
        };
    }
};
exports.TypeormReceivablesRepository = TypeormReceivablesRepository;
exports.TypeormReceivablesRepository = TypeormReceivablesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.AccountReceivableOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], TypeormReceivablesRepository);
//# sourceMappingURL=typeorm-receivables.repository.js.map