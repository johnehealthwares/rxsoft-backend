import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { AccountReceivableOrmEntity, PaymentMethodOrmEntity } from '../../sales/entities';
import { AccountReceivable } from '../domains/account-receivable.entity';
import { ReceivableTransaction } from '../domains/receivable-transaction.entity';
import { ReceivableTransactionOrmEntity } from '../entities';
import {
  ApplyAdjustmentPayload,
  CollectPaymentPayload,
  CollectPaymentResult,
  ReceivableListQuery,
  ReceivableTransactionListQuery,
  ReceivablesRepository,
  WriteOffPayload,
} from './receivables.repository';

function toDomain(entity: AccountReceivableOrmEntity): AccountReceivable {
  return new AccountReceivable(
    entity.id,
    entity.organizationId,
    entity.customerId,
    entity.saleId,
    entity.receivableNumber,
    entity.originalAmount,
    entity.outstandingAmount,
    entity.status,
    entity.openedAt,
    entity.closedAt,
  );
}

function toTransactionDomain(entity: ReceivableTransactionOrmEntity): ReceivableTransaction {
  return new ReceivableTransaction(
    entity.id,
    entity.receivable.id,
    entity.transactionType,
    entity.amount,
    entity.transactionDate,
    entity.paymentMethod?.id ?? null,
    entity.referenceNumber,
    entity.receivedByUser?.id ?? null,
    entity.note,
  );
}

@Injectable()
export class TypeormReceivablesRepository implements ReceivablesRepository {
  constructor(
    @InjectRepository(AccountReceivableOrmEntity)
    private readonly receivableRepository: Repository<AccountReceivableOrmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async list(query: ReceivableListQuery): Promise<{ items: AccountReceivable[]; total: number }> {
    const qb = this.receivableRepository
      .createQueryBuilder('receivable')
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

  async collectPayment(payload: CollectPaymentPayload): Promise<CollectPaymentResult> {
    return this.dataSource.transaction(async (manager) => {
      const receivableRepo = manager.getRepository(AccountReceivableOrmEntity);
      const txnRepo = manager.getRepository(ReceivableTransactionOrmEntity);
      const paymentMethodRepo = manager.getRepository(PaymentMethodOrmEntity);
      const userRepo = manager.getRepository(UserOrmEntity);

      // Validate foreign references in the same tenant scope before write.
      const paymentMethod = await paymentMethodRepo.findOne({
        where: { id: payload.paymentMethodId, organizationId: payload.organizationId },
      });
      if (!paymentMethod) {
        throw new NotFoundException('Payment method not found');
      }

      const receiver = await userRepo.findOne({
        where: { id: payload.receivedByUserId, organizationId: payload.organizationId },
      });
      if (!receiver) {
        throw new NotFoundException('Receiver user not found');
      }

      const receivable = await receivableRepo.findOne({
        where: { id: payload.receivableId, organizationId: payload.organizationId },
      });
      if (!receivable) {
        throw new NotFoundException('Receivable not found');
      }
      if (receivable.status === 'written_off') {
        throw new BadRequestException('Cannot collect payment for a written-off receivable');
      }
      if (receivable.status === 'closed' || receivable.outstandingAmount <= 0) {
        throw new BadRequestException('Cannot collect payment for a closed receivable');
      }
      if (payload.amount > receivable.outstandingAmount) {
        throw new BadRequestException('Payment amount cannot exceed outstanding amount');
      }

      receivable.outstandingAmount = Number((receivable.outstandingAmount - payload.amount).toFixed(2));
      if (receivable.outstandingAmount <= 0) {
        receivable.outstandingAmount = 0;
        receivable.status = 'closed';
        receivable.closedAt = payload.transactionDate;
      } else {
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

  async applyAdjustment(payload: ApplyAdjustmentPayload): Promise<CollectPaymentResult> {
    return this.dataSource.transaction(async (manager) => {
      const receivableRepo = manager.getRepository(AccountReceivableOrmEntity);
      const txnRepo = manager.getRepository(ReceivableTransactionOrmEntity);
      const userRepo = manager.getRepository(UserOrmEntity);

      const actor = await userRepo.findOne({
        where: { id: payload.adjustedByUserId, organizationId: payload.organizationId },
      });
      if (!actor) {
        throw new NotFoundException('Adjustment user not found');
      }

      const receivable = await receivableRepo.findOne({
        where: { id: payload.receivableId, organizationId: payload.organizationId },
      });
      if (!receivable) {
        throw new NotFoundException('Receivable not found');
      }
      if (receivable.status === 'written_off') {
        throw new BadRequestException('Cannot adjust a written-off receivable');
      }

      // Signed adjustment keeps parity with ledger: positive means debit, negative means credit.
      receivable.outstandingAmount = Number((receivable.outstandingAmount + payload.amount).toFixed(2));
      if (receivable.outstandingAmount <= 0) {
        receivable.outstandingAmount = 0;
        receivable.status = 'closed';
        receivable.closedAt = payload.transactionDate;
      } else if (receivable.outstandingAmount < receivable.originalAmount) {
        receivable.status = 'partially_paid';
        receivable.closedAt = null;
      } else {
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

  async writeOff(payload: WriteOffPayload): Promise<CollectPaymentResult> {
    return this.dataSource.transaction(async (manager) => {
      const receivableRepo = manager.getRepository(AccountReceivableOrmEntity);
      const txnRepo = manager.getRepository(ReceivableTransactionOrmEntity);
      const userRepo = manager.getRepository(UserOrmEntity);

      const actor = await userRepo.findOne({
        where: { id: payload.writtenOffByUserId, organizationId: payload.organizationId },
      });
      if (!actor) {
        throw new NotFoundException('Write-off user not found');
      }

      const receivable = await receivableRepo.findOne({
        where: { id: payload.receivableId, organizationId: payload.organizationId },
      });
      if (!receivable) {
        throw new NotFoundException('Receivable not found');
      }
      if (receivable.status === 'written_off') {
        throw new BadRequestException('Receivable is already written off');
      }
      if (receivable.outstandingAmount <= 0) {
        throw new BadRequestException('Only receivables with outstanding balance can be written off');
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

  async listTransactions(
    query: ReceivableTransactionListQuery,
  ): Promise<{ items: ReceivableTransaction[]; total: number }> {
    // Enforce tenant scope through receivable join; transactions are never queried cross-organization.
    const qb = this.dataSource
      .getRepository(ReceivableTransactionOrmEntity)
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
}
