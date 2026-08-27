import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  OrganisationPaymentProviderOrmEntity,
  PaymentMethodProviderOrmEntity,
  PaymentProviderOrmEntity,
  ProviderCredentialSet,
} from '../entities';
import {
  CreatePaymentMethodProviderDto,
  CreatePaymentProviderDto,
  ListPaymentProvidersDto,
  UpdateOrganisationPaymentProviderDto,
  UpdatePaymentProviderDto,
} from '../dto/payment-providers.dto';

const MASK = '****';

export function maskSecret(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.length <= 8) return `${value.slice(0, 2)}****`;
  return `${value.slice(0, 4)}****${value.slice(-4)}`;
}

function isMaskedPlaceholder(value?: string): boolean {
  return !!value && value.includes(MASK);
}

function maskConfig(
  config?: ProviderCredentialSet | null,
): Record<string, string | undefined> | undefined {
  if (!config) return undefined;
  const out: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(config)) {
    out[key] = maskSecret(value as string);
  }
  return out;
}

function mergeConfig(
  existing?: ProviderCredentialSet | null,
  incoming?: ProviderCredentialSet,
): ProviderCredentialSet {
  const merged: ProviderCredentialSet = { ...(existing ?? {}) };
  if (!incoming) return merged;
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined) continue;
    if (isMaskedPlaceholder(value as string)) continue;
    (merged as Record<string, string>)[key] = value as string;
  }
  return merged;
}

export type PaymentProviderView = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  providerType: string;
  channel: string;
  production: boolean;
  testConfig: Record<string, string | undefined> | undefined;
  liveConfig: Record<string, string | undefined> | undefined;
  hasTestCredentials: boolean;
  hasLiveCredentials: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PaymentProvidersService {
  constructor(
    @InjectRepository(PaymentProviderOrmEntity)
    private readonly providerRepo: Repository<PaymentProviderOrmEntity>,
    @InjectRepository(OrganisationPaymentProviderOrmEntity)
    private readonly orgProviderRepo: Repository<OrganisationPaymentProviderOrmEntity>,
    @InjectRepository(PaymentMethodProviderOrmEntity)
    private readonly methodProviderRepo: Repository<PaymentMethodProviderOrmEntity>,
  ) {}

  // ── Credentials ────────────────────────────────────────────────

  /** Raw credential set for the provider's active mode (production vs test). */
  activeCreds(provider: PaymentProviderOrmEntity): ProviderCredentialSet {
    const test = provider.testConfig ?? {};
    const live = provider.liveConfig ?? {};
    return provider.production ? { ...test, ...live } : test;
  }

  /** Test and live credential sets (for admin display / testing). */
  allCreds(provider: PaymentProviderOrmEntity): {
    test: ProviderCredentialSet;
    live: ProviderCredentialSet;
  } {
    return { test: provider.testConfig ?? {}, live: provider.liveConfig ?? {} };
  }

  isConfigured(provider: PaymentProviderOrmEntity): boolean {
    return Object.values(this.activeCreds(provider)).some((v) => !!v);
  }

  // ── CRUD ───────────────────────────────────────────────────────

  async list(query: ListPaymentProvidersDto) {
    const qb = this.providerRepo
      .createQueryBuilder('provider')
      .orderBy('provider.sort_order', 'ASC')
      .addOrderBy('provider.name', 'ASC');

    if (query.channel)
      qb.andWhere('provider.channel = :channel', { channel: query.channel });
    if (query.search) {
      qb.andWhere(
        '(provider.code ILIKE :search OR provider.name ILIKE :search)',
        {
          search: `%${query.search}%`,
        },
      );
    }

    const [data, total] = await qb
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .getManyAndCount();
    return { data: data.map((p) => this.toView(p)), total };
  }

  async get(id: string): Promise<PaymentProviderView> {
    const provider = await this.findProvider(id);
    return this.toView(provider);
  }

  async getEntity(id: string): Promise<PaymentProviderOrmEntity> {
    return this.findProvider(id);
  }

  async getByCode(code: string): Promise<PaymentProviderOrmEntity> {
    const provider = await this.providerRepo.findOne({ where: { code } });
    if (!provider) throw new NotFoundException('Payment provider not found');
    return provider;
  }

  async findByType(
    type: string,
    channel?: string,
  ): Promise<PaymentProviderOrmEntity[]> {
    const where: Record<string, unknown> = {
      providerType: type,
      isActive: true,
    };
    if (channel) where.channel = channel;
    return this.providerRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async create(payload: CreatePaymentProviderDto) {
    const dup = await this.providerRepo.findOne({
      where: { code: payload.code },
    });
    if (dup)
      throw new BadRequestException('Payment provider code already exists');

    const entity = this.providerRepo.create({
      code: payload.code,
      name: payload.name,
      providerType: payload.providerType,
      channel: payload.channel,
      description: payload.description ?? null,
      production: payload.production ?? false,
      testConfig: payload.testConfig ?? null,
      liveConfig: payload.liveConfig ?? null,
      isActive: payload.isActive ?? true,
      sortOrder: payload.sortOrder ?? 0,
    });
    const saved = await this.providerRepo.save(entity);
    return this.toView(saved);
  }

  async update(id: string, payload: UpdatePaymentProviderDto) {
    const provider = await this.findProvider(id);

    if (payload.code && payload.code !== provider.code) {
      const dup = await this.providerRepo.findOne({
        where: { code: payload.code },
      });
      if (dup)
        throw new BadRequestException('Payment provider code already exists');
      provider.code = payload.code;
    }
    if (payload.name !== undefined) provider.name = payload.name;
    if (payload.providerType !== undefined)
      provider.providerType = payload.providerType;
    if (payload.channel !== undefined) provider.channel = payload.channel;
    if (payload.description !== undefined)
      provider.description = payload.description;
    if (payload.production !== undefined)
      provider.production = payload.production;
    if (payload.isActive !== undefined) provider.isActive = payload.isActive;
    if (payload.sortOrder !== undefined) provider.sortOrder = payload.sortOrder;
    if (payload.testConfig)
      provider.testConfig = mergeConfig(
        provider.testConfig,
        payload.testConfig,
      );
    if (payload.liveConfig)
      provider.liveConfig = mergeConfig(
        provider.liveConfig,
        payload.liveConfig,
      );

    const saved = await this.providerRepo.save(provider);
    return this.toView(saved);
  }

  async remove(id: string): Promise<void> {
    const result = await this.providerRepo.delete({ id });
    if (!result.affected)
      throw new NotFoundException('Payment provider not found');
  }

  private async findProvider(id: string): Promise<PaymentProviderOrmEntity> {
    const provider = await this.providerRepo.findOne({ where: { id } });
    if (!provider) throw new NotFoundException('Payment provider not found');
    return provider;
  }

  private toView(provider: PaymentProviderOrmEntity): PaymentProviderView {
    return {
      id: provider.id,
      code: provider.code,
      name: provider.name,
      description: provider.description,
      providerType: provider.providerType,
      channel: provider.channel,
      production: provider.production,
      testConfig: maskConfig(provider.testConfig),
      liveConfig: maskConfig(provider.liveConfig),
      hasTestCredentials: Object.values(provider.testConfig ?? {}).some(
        (v) => !!v,
      ),
      hasLiveCredentials: Object.values(provider.liveConfig ?? {}).some(
        (v) => !!v,
      ),
      isActive: provider.isActive,
      sortOrder: provider.sortOrder,
      createdAt: provider.createdAt,
      updatedAt: provider.updatedAt,
    };
  }

  // ── Org whitelist (organisation_payment_providers) ─────────────

  async listForOrg(organizationId: string, channel?: string) {
    const qb = this.orgProviderRepo
      .createQueryBuilder('opp')
      .innerJoinAndSelect('opp.paymentProvider', 'provider')
      .where('opp.organization_id = :organizationId', { organizationId });
    if (channel) qb.andWhere('provider.channel = :channel', { channel });

    const rows = await qb.orderBy('provider.sort_order', 'ASC').getMany();
    return rows.map((row) => ({
      id: row.id,
      organizationId: row.organizationId,
      isActive: row.isActive,
      isDefault: row.isDefault,
      provider: this.toView(row.paymentProvider),
    }));
  }

  /** Active providers for an org and channel (used by checkout/POS). */
  async listActiveForOrg(
    organizationId: string,
    channel?: string,
  ): Promise<PaymentProviderOrmEntity[]> {
    const qb = this.orgProviderRepo
      .createQueryBuilder('opp')
      .innerJoinAndSelect('opp.paymentProvider', 'provider')
      .where('opp.organization_id = :organizationId', { organizationId })
      .andWhere('opp.is_active = true')
      .andWhere('provider.is_active = true');
    if (channel) qb.andWhere('provider.channel = :channel', { channel });

    const rows = await qb.orderBy('provider.sort_order', 'ASC').getMany();
    return rows.map((r) => r.paymentProvider);
  }

  async upsertOrgProvider(payload: UpdateOrganisationPaymentProviderDto) {
    const provider = await this.findProvider(payload.paymentProviderId);
    let row = await this.orgProviderRepo.findOne({
      where: {
        organizationId: payload.organizationId,
        paymentProviderId: payload.paymentProviderId,
      },
    });
    if (!row) {
      row = this.orgProviderRepo.create({
        organizationId: payload.organizationId,
        paymentProvider: provider,
        paymentProviderId: provider.id,
      });
    }
    if (payload.isActive !== undefined) row.isActive = payload.isActive;
    if (payload.isDefault !== undefined) row.isDefault = payload.isDefault;
    const saved = await this.orgProviderRepo.save(row);
    return {
      id: saved.id,
      organizationId: saved.organizationId,
      paymentProviderId: saved.paymentProviderId,
      isActive: saved.isActive,
      isDefault: saved.isDefault,
    };
  }

  async removeOrgProvider(
    organizationId: string,
    paymentProviderId: string,
  ): Promise<void> {
    await this.orgProviderRepo.delete({ organizationId, paymentProviderId });
  }

  // ── Payment method ↔ provider mapping ──────────────────────────

  async listMethodProviders(paymentMethodId?: string, channel?: string) {
    const qb = this.methodProviderRepo
      .createQueryBuilder('mpp')
      .innerJoinAndSelect('mpp.paymentProvider', 'provider')
      .where('mpp.is_active = true')
      .orderBy('mpp.is_default', 'DESC')
      .addOrderBy('provider.sort_order', 'ASC');
    if (paymentMethodId)
      qb.andWhere('mpp.payment_method_id = :paymentMethodId', {
        paymentMethodId,
      });
    if (channel) qb.andWhere('provider.channel = :channel', { channel });

    const rows = await qb.getMany();
    return rows.map((row) => ({
      id: row.id,
      paymentMethodId: row.paymentMethodId,
      channel: row.channel,
      isDefault: row.isDefault,
      isActive: row.isActive,
      provider: this.toView(row.paymentProvider),
    }));
  }

  async setMethodProvider(payload: CreatePaymentMethodProviderDto) {
    let row = await this.methodProviderRepo.findOne({
      where: {
        paymentMethodId: payload.paymentMethodId,
        paymentProviderId: payload.paymentProviderId,
      },
    });
    if (!row) {
      row = this.methodProviderRepo.create({
        paymentMethodId: payload.paymentMethodId,
        paymentProviderId: payload.paymentProviderId,
        channel: payload.channel,
      });
    }
    if (payload.isDefault !== undefined) row.isDefault = payload.isDefault;
    if (payload.isActive !== undefined) row.isActive = payload.isActive;
    if (payload.channel !== undefined) row.channel = payload.channel;
    return this.methodProviderRepo.save(row);
  }

  async removeMethodProvider(
    paymentMethodId: string,
    paymentProviderId: string,
  ): Promise<void> {
    await this.methodProviderRepo.delete({
      paymentMethodId,
      paymentProviderId,
    });
  }
}
