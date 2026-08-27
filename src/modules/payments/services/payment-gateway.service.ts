import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderOrmEntity } from '../../website/entities/order.orm-entity';
import { PaymentTransactionOrmEntity } from '../entities/payment-transaction.orm-entity';
import { PaymentProviderOrmEntity } from '../entities/payment-provider.orm-entity';
import { PosTerminalOrmEntity } from '../entities/pos-terminal.orm-entity';
import { PaymentProviderRegistry } from '../providers/payment-provider.registry';
import { generatePaymentReference } from './payment-completion.service';
import { PaymentProvidersService } from './payment-providers.service';
import { PaymentCompletionService } from './payment-completion.service';
import {
  InitiatePosPaymentDto,
  InitializePaymentDto,
} from '../dto/payments.dto';
import { isSuccessStatus } from '../providers/status-map';

@Injectable()
export class PaymentGatewayService {
  private readonly logger = new Logger(PaymentGatewayService.name);

  constructor(
    @InjectRepository(PaymentTransactionOrmEntity)
    private readonly txRepo: Repository<PaymentTransactionOrmEntity>,
    @InjectRepository(PaymentProviderOrmEntity)
    private readonly providerRepo: Repository<PaymentProviderOrmEntity>,
    @InjectRepository(PosTerminalOrmEntity)
    private readonly terminalRepo: Repository<PosTerminalOrmEntity>,
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
    private readonly registry: PaymentProviderRegistry,
    private readonly providersService: PaymentProvidersService,
    private readonly completion: PaymentCompletionService,
  ) {}

  // ── Provider resolution ────────────────────────────────────────

  private async resolveProvider(
    organizationId: string,
    channel: 'pos' | 'web',
    providerId?: string,
    paymentMethodId?: string,
  ): Promise<PaymentProviderOrmEntity> {
    const orgActive =
      await this.providersService.listActiveForOrg(organizationId);
    const configured = orgActive.filter((p) =>
      this.providersService.isConfigured(p),
    );

    let candidates = configured;
    if (paymentMethodId) {
      // Prefer providers mapped to the payment method for this channel, but
      // allow same-method mappings on other channels (e.g. OPAY on both pos/web).
      const mapped =
        await this.providersService.listMethodProviders(paymentMethodId);
      const channelIds = new Set(
        mapped.filter((m) => m.channel === channel).map((m) => m.provider.id),
      );
      const anyIds = new Set(mapped.map((m) => m.provider.id));
      candidates = configured.filter(
        (p) => channelIds.has(p.id) || anyIds.has(p.id),
      );
    } else {
      candidates = configured.filter((p) => p.channel === channel);
    }

    if (providerId) {
      const candidate =
        candidates.find((p) => p.id === providerId) ??
        configured.find((p) => p.id === providerId);
      if (candidate) return candidate;
      const fallback = orgActive.find((p) => p.id === providerId);
      if (fallback) return fallback;
      throw new BadRequestException(
        'Requested payment provider is not enabled for this organisation',
      );
    }

    if (candidates.length) return candidates[0];
    if (configured.length) return configured[0];
    if (orgActive.length)
      throw new BadRequestException(
        'Selected payment provider is not configured with credentials',
      );
    throw new BadRequestException(
      'No payment provider is enabled for this organisation',
    );
  }

  // ── Web (checkout / self-pay / wallet deposit) ─────────────────

  async initializeWeb(
    organizationId: string,
    dto: InitializePaymentDto,
    currentUser?: { sub: string },
  ): Promise<Record<string, unknown>> {
    const provider = await this.resolveProvider(
      organizationId,
      'web',
      dto.providerId,
      dto.paymentMethodId,
    );

    let amount = dto.amount;
    if (dto.sourceType === 'order' && dto.sourceId && !amount) {
      const order = await this.orderRepo.findOne({
        where: { id: dto.sourceId, organizationId },
        select: ['totalAmount'],
      });
      if (!order) throw new NotFoundException('Order not found');
      amount = order.totalAmount;
    }
    if (!amount || amount <= 0)
      throw new BadRequestException('A positive amount is required');

    const reference = generatePaymentReference('PMT');
    const tx = this.txRepo.create({
      organizationId,
      paymentProviderId: provider.id,
      providerType: provider.providerType,
      reference,
      status: 'initiated',
      channel: 'web',
      paymentMethodId: dto.paymentMethodId ?? null,
      amount,
      currency: 'NGN',
      sourceType: dto.sourceType,
      sourceId: dto.sourceId ?? null,
      customerId: dto.customerId ?? null,
      userId: dto.userId ?? (currentUser?.sub ? currentUser.sub : null),
    });
    await this.txRepo.save(tx);

    const ctx = this.registry.contextFor(provider);
    const result = await this.registry.get(provider.providerType).initialize(
      {
        amount,
        reference,
        email: dto.email,
        userId: dto.userId,
        customerName: dto.customerName,
        customerPhone: dto.phone,
        descriptor: dto.descriptor || 'RxSoft payment',
        returnUrl: dto.returnUrl,
        callbackUrl: dto.callbackUrl,
        channel: 'web',
      },
      ctx,
    );

    tx.status = result.status;
    tx.checkoutUrl = result.checkoutUrl ?? null;
    tx.providerReference = result.providerReference ?? null;
    tx.raw = result.metadata ?? null;
    await this.txRepo.save(tx);

    return {
      reference: tx.reference,
      checkoutUrl: tx.checkoutUrl,
      provider: {
        id: provider.id,
        code: provider.code,
        name: provider.name,
        providerType: provider.providerType,
      },
      status: tx.status,
    };
  }

  // ── POS ────────────────────────────────────────────────────────

  async initiatePos(
    organizationId: string,
    dto: InitiatePosPaymentDto,
    currentUser?: { sub: string },
  ): Promise<Record<string, unknown>> {
    const terminal = await this.terminalRepo.findOne({
      where: { id: dto.terminalId, organizationId, isActive: true },
    });
    if (!terminal)
      throw new NotFoundException('POS terminal not found or inactive');

    let provider = await this.resolveProvider(
      organizationId,
      'pos',
      dto.providerId ?? undefined,
      dto.paymentMethodId,
    );

    // When no provider is explicitly requested, prefer the terminal's own
    // provider type if it is enabled+configured for the org.
    if (!dto.providerId && terminal.providerType !== provider.providerType) {
      const terminalProviders =
        await this.providersService.listActiveForOrg(organizationId);
      const preferred = terminalProviders.find(
        (p) => p.providerType === terminal.providerType,
      );
      if (preferred) provider = preferred;
    }

    return this.runPosInit(
      organizationId,
      dto,
      currentUser,
      terminal,
      provider,
    );
  }

  private async runPosInit(
    organizationId: string,
    dto: InitiatePosPaymentDto,
    currentUser: { sub: string } | undefined,
    terminal: PosTerminalOrmEntity,
    provider: PaymentProviderOrmEntity,
  ): Promise<Record<string, unknown>> {
    const reference = generatePaymentReference('POS');
    const tx = this.txRepo.create({
      organizationId,
      paymentProviderId: provider.id,
      providerType: provider.providerType,
      reference,
      status: 'initiated',
      channel: 'pos',
      paymentMethodId: dto.paymentMethodId ?? null,
      amount: dto.amount,
      currency: 'NGN',
      sourceType: null,
      customerId: dto.customerId ?? null,
      userId: dto.userId ?? (currentUser?.sub ? currentUser.sub : null),
      terminalId: terminal.id,
    });
    await this.txRepo.save(tx);

    const ctx = this.registry.contextFor(provider);
    const adapter = this.registry.get(provider.providerType);
    if (!adapter.initiatePos)
      throw new BadRequestException(
        'This provider does not support POS payments',
      );

    const result = await adapter.initiatePos(
      {
        amount: dto.amount,
        reference,
        currency: 'NGN',
        terminalSerial: terminal.serial ?? terminal.terminalId ?? '',
        terminalId: terminal.id,
        customerName: dto.customerName,
        customerPhone: dto.phone,
        descriptor: dto.descriptor || 'POS Payment',
        callbackUrl: dto.callbackUrl,
      },
      ctx,
    );

    tx.status = result.status;
    tx.providerReference = result.providerReference ?? null;
    tx.raw = result.metadata ?? null;
    await this.txRepo.save(tx);

    terminal.lastUsedAt = new Date();
    await this.terminalRepo.save(terminal);

    return {
      reference: tx.reference,
      nextAction: result.nextAction ?? null,
      provider: {
        id: provider.id,
        code: provider.code,
        name: provider.name,
        providerType: provider.providerType,
      },
      status: tx.status,
    };
  }

  // ── Verification ───────────────────────────────────────────────

  async verify(
    reference: string,
    organizationId?: string,
  ): Promise<Record<string, unknown>> {
    const where: Record<string, unknown> = { reference };
    if (organizationId) where.organizationId = organizationId;
    const tx = await this.txRepo.findOne({ where });
    if (!tx) throw new NotFoundException('Payment transaction not found');

    const provider = await this.providerRepo.findOne({
      where: { id: tx.paymentProviderId },
    });
    if (!provider) throw new NotFoundException('Payment provider not found');

    // Guard against double-completion from the PRE-transition status.
    const wasPaid = tx.status === 'success' || tx.status === 'settled';

    const ctx = this.registry.contextFor(provider);
    const adapter = this.registry.get(provider.providerType);
    const result = await adapter.verify(tx.reference, ctx);

    const becameSuccess = isSuccessStatus(result.status);

    tx.status = result.status;
    tx.amountPaid = result.amountPaid ?? tx.amountPaid;
    tx.providerReference = result.providerReference ?? tx.providerReference;
    tx.paidAt = result.paidAt ? new Date(result.paidAt) : tx.paidAt;
    tx.raw = { ...(tx.raw ?? {}), verification: result.metadata };
    await this.txRepo.save(tx);

    // A provider-verified success supersedes any prior failed/cancelled state;
    // only an already-successful/settled transaction short-circuits completion.
    if (!wasPaid && becameSuccess && tx.sourceType) {
      try {
        await this.completion.handleSuccess(tx);
      } catch (error: any) {
        this.logger.error(
          `Completion failed for ${reference}: ${error.message}`,
          error.stack,
        );
      }
    }

    return {
      reference: tx.reference,
      status: tx.status,
      amountPaid: tx.amountPaid,
      provider: provider.code,
      paid: becameSuccess ?? false,
      paidAt: tx.paidAt,
    };
  }

  async queryPos(
    reference: string,
    organizationId: string,
  ): Promise<Record<string, unknown>> {
    return this.verify(reference, organizationId);
  }

  // ── Webhook (dispatched by PaymentWebhookService) ─────────────

  async findTransactionByProviderReference(
    organizationId: string | undefined,
    providerId: string,
    reference: string,
  ): Promise<PaymentTransactionOrmEntity | null> {
    const where: Record<string, unknown> = { paymentProviderId: providerId };
    if (organizationId) where.organizationId = organizationId;
    const byReference = await this.txRepo.findOne({
      where: { ...where, reference },
    });
    if (byReference) return byReference;
    return this.txRepo.findOne({
      where: { ...where, providerReference: reference },
    });
  }

  /** Marks a transaction paid from a verified webhook (idempotent). */
  async markPaid(
    tx: PaymentTransactionOrmEntity,
    amountPaid: number,
    paidAt?: Date,
  ): Promise<void> {
    if (tx.status === 'success' || tx.status === 'settled') return;
    tx.status = 'success';
    tx.amountPaid = amountPaid || tx.amount;
    tx.paidAt = paidAt ?? new Date();
    await this.txRepo.save(tx);
    if (tx.sourceType) {
      try {
        await this.completion.handleSuccess(tx);
      } catch (error: any) {
        this.logger.error(
          `Webhook completion failed for ${tx.reference}: ${error.message}`,
          error.stack,
        );
      }
    }
  }

  /** Marks a transaction settled (gateway paid out to bank). */
  async markSettled(tx: PaymentTransactionOrmEntity): Promise<void> {
    if (tx.status === 'settled') return;
    tx.status = 'settled';
    tx.settledAt = new Date();
    await this.txRepo.save(tx);
    await this.completion.recordSettlement(tx).catch((error: any) => {
      this.logger.error(
        `Settlement journal failed for ${tx.reference}: ${error.message}`,
        error.stack,
      );
    });
  }

  // ── Lookups ────────────────────────────────────────────────────

  async get(id: string): Promise<PaymentTransactionOrmEntity> {
    const tx = await this.txRepo.findOne({ where: { id } });
    if (!tx) throw new NotFoundException('Payment transaction not found');
    return tx;
  }

  async list(organizationId: string, page = 1, limit = 50) {
    const [data, total] = await this.txRepo.findAndCount({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async latestForSource(
    organizationId: string,
    sourceType: string,
    sourceId?: string | null,
    userId?: string | null,
  ): Promise<PaymentTransactionOrmEntity | null> {
    const qb = this.txRepo
      .createQueryBuilder('tx')
      .where('tx.organization_id = :organizationId', { organizationId })
      .andWhere('tx.source_type = :sourceType', { sourceType })
      .orderBy('tx.created_at', 'DESC');
    if (sourceId) qb.andWhere('tx.source_id = :sourceId', { sourceId });
    if (userId && !sourceId) qb.andWhere('tx.user_id = :userId', { userId });
    return qb.getOne();
  }
}
