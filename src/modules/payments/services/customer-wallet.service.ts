import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CustomerWalletOrmEntity,
  WalletTransactionOrmEntity,
} from '../entities';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';

const WALLET_REF_PREFIX = 'WLT';

export function generateWalletReference(): string {
  return `${WALLET_REF_PREFIX}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

@Injectable()
export class CustomerWalletService {
  constructor(
    @InjectRepository(CustomerWalletOrmEntity)
    private readonly walletRepo: Repository<CustomerWalletOrmEntity>,
    @InjectRepository(WalletTransactionOrmEntity)
    private readonly txRepo: Repository<WalletTransactionOrmEntity>,
    private readonly accounting: AccountingIntegrationService,
  ) {}

  async getOrCreate(
    organizationId: string,
    userId: string,
  ): Promise<CustomerWalletOrmEntity> {
    let wallet = await this.walletRepo.findOne({
      where: { organizationId, userId },
    });
    if (!wallet) {
      wallet = this.walletRepo.create({
        organizationId,
        userId,
        balance: 0,
        currency: 'NGN',
      });
      wallet = await this.walletRepo.save(wallet);
    }
    return wallet;
  }

  async get(
    organizationId: string,
    userId: string,
  ): Promise<CustomerWalletOrmEntity> {
    const wallet = await this.walletRepo.findOne({
      where: { organizationId, userId },
    });
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  async balance(organizationId: string, userId: string): Promise<number> {
    const wallet = await this.getOrCreate(organizationId, userId);
    return wallet.balance;
  }

  async credit(
    organizationId: string,
    userId: string,
    amount: number,
    opts: {
      reference?: string;
      paymentReference?: string;
      note?: string;
      sourceType?: 'wallet_deposit' | 'refund';
      sourceId?: string;
      postJournal?: boolean;
    } = {},
  ): Promise<CustomerWalletOrmEntity> {
    if (amount <= 0)
      throw new BadRequestException('Amount must be greater than zero');
    const wallet = await this.getOrCreate(organizationId, userId);
    const reference = opts.reference ?? generateWalletReference();

    wallet.balance = Number((wallet.balance + amount).toFixed(2));
    await this.walletRepo.save(wallet);

    await this.txRepo.save(
      this.txRepo.create({
        organizationId,
        walletId: wallet.id,
        type: opts.sourceType === 'refund' ? 'refund' : 'deposit',
        amount,
        balanceAfter: wallet.balance,
        reference,
        paymentReference: opts.paymentReference ?? null,
        sourceType: opts.sourceType ?? 'wallet_deposit',
        sourceId: opts.sourceId ?? null,
        note: opts.note ?? null,
      }),
    );

    if (opts.postJournal !== false) {
      await this.accounting.recordWalletDeposit(organizationId, {
        walletId: wallet.id,
        reference,
        amount,
      });
    }

    return wallet;
  }

  async debit(
    organizationId: string,
    userId: string,
    amount: number,
    opts: {
      reference?: string;
      paymentReference?: string;
      note?: string;
      sourceType?: 'payment' | 'withdrawal';
      sourceId?: string;
      postJournal?: boolean;
    } = {},
  ): Promise<CustomerWalletOrmEntity> {
    if (amount <= 0)
      throw new BadRequestException('Amount must be greater than zero');
    const wallet = await this.getOrCreate(organizationId, userId);
    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient wallet balance');
    }
    const reference = opts.reference ?? generateWalletReference();

    wallet.balance = Number((wallet.balance - amount).toFixed(2));
    await this.walletRepo.save(wallet);

    await this.txRepo.save(
      this.txRepo.create({
        organizationId,
        walletId: wallet.id,
        type: opts.sourceType ?? 'payment',
        amount,
        balanceAfter: wallet.balance,
        reference,
        paymentReference: opts.paymentReference ?? null,
        sourceType: opts.sourceType ?? 'payment',
        sourceId: opts.sourceId ?? null,
        note: opts.note ?? null,
      }),
    );

    return wallet;
  }

  async history(organizationId: string, userId: string, limit = 50) {
    const wallet = await this.getOrCreate(organizationId, userId);
    return this.txRepo.find({
      where: { walletId: wallet.id },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
