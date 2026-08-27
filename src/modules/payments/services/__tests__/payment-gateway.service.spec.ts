import { BadRequestException } from '@nestjs/common';
import { PaymentGatewayService } from '../payment-gateway.service';
import type { PaymentProviderOrmEntity } from '../../entities/payment-provider.orm-entity';
import type { PaymentTransactionOrmEntity } from '../../entities/payment-transaction.orm-entity';

function provider(
  id: string,
  type: string,
  channel: string,
): PaymentProviderOrmEntity {
  return {
    id,
    code: type.toUpperCase(),
    name: type,
    providerType: type as never,
    channel: channel as never,
    description: null,
    production: false,
    testConfig: { secretKey: 'sk' },
    liveConfig: null,
    isActive: true,
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as PaymentProviderOrmEntity;
}

function tx(
  overrides: Partial<PaymentTransactionOrmEntity> = {},
): PaymentTransactionOrmEntity {
  return {
    id: 'tx-1',
    organizationId: 'org-1',
    paymentProviderId: 'p-paystack',
    providerType: 'paystack',
    reference: 'ref-1',
    providerReference: null,
    status: 'initiated',
    channel: 'web',
    paymentMethodId: null,
    amount: 100,
    amountPaid: 0,
    currency: 'NGN',
    sourceType: null,
    sourceId: null,
    customerId: null,
    userId: null,
    terminalId: null,
    checkoutUrl: null,
    raw: null,
    paidAt: null,
    settledAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as PaymentTransactionOrmEntity;
}

function setup() {
  const txRepo = {
    create: jest.fn((x: any) => x),
    save: jest.fn((x: any) => Promise.resolve(x)),
    findOne: jest.fn(),
    findAndCount: jest.fn().mockResolvedValue([[], 0]),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(null),
    })),
  };
  const providerRepo = {
    findOne: jest.fn(),
    save: jest.fn((x: any) => Promise.resolve(x)),
  };
  const terminalRepo = {
    findOne: jest.fn(),
    save: jest.fn((x: any) => Promise.resolve(x)),
  };
  const orderRepo = { findOne: jest.fn() };
  const registry = {
    contextFor: jest.fn((p: any) => ({
      creds: p.testConfig ?? {},
      isProduction: false,
    })),
    get: jest.fn(),
  };
  const providersService = {
    isConfigured: jest.fn(),
    listActiveForOrg: jest.fn(),
    listMethodProviders: jest.fn(),
    getOrderAmount: jest.fn(),
  };
  const completion = {
    handleSuccess: jest.fn().mockResolvedValue(undefined),
    recordSettlement: jest.fn().mockResolvedValue(undefined),
  };

  const gateway = new PaymentGatewayService(
    txRepo as any,
    providerRepo as any,
    terminalRepo as any,
    orderRepo as any,
    registry as any,
    providersService as any,
    completion as any,
  );
  return {
    gateway,
    txRepo,
    providerRepo,
    terminalRepo,
    orderRepo,
    providersService,
    registry,
    completion,
  };
}

const paystack = provider('p-paystack', 'paystack', 'web');
const monnify = provider('p-monnify', 'monnify', 'web');
const opayPos = provider('p-opay', 'opay', 'pos');

describe('PaymentGatewayService.resolveProvider', () => {
  it('prefers providers mapped to the payment method even when channel differs (OPay pos+web)', async () => {
    const { gateway, providersService } = setup();
    providersService.listActiveForOrg.mockResolvedValue([
      monnify,
      opayPos,
      paystack,
    ]);
    providersService.isConfigured.mockImplementation((p: any) => true);
    providersService.listMethodProviders.mockResolvedValue([
      { id: 'm1', channel: 'pos', provider: { id: 'p-opay' } },
      { id: 'm2', channel: 'pos', provider: { id: 'p-monnify' } },
    ]);

    const resolved = await (gateway as any).resolveProvider(
      'org-1',
      'pos',
      undefined,
      'method-pos',
    );
    // returns one of the channel-mapped providers (OPay or Moniepoint for POS)
    expect(['p-opay', 'p-monnify']).toContain(resolved.id);
    expect(providersService.listMethodProviders).toHaveBeenCalledWith(
      'method-pos',
    );
  });

  it('filters to the channel when no payment method is provided', async () => {
    const { gateway, providersService } = setup();
    providersService.listActiveForOrg.mockResolvedValue([
      monnify,
      paystack,
      opayPos,
    ]);
    providersService.isConfigured.mockImplementation(() => true);
    providersService.listMethodProviders.mockResolvedValue([]);

    const resolved = await (gateway as any).resolveProvider('org-1', 'web');
    expect(resolved.id).toBe('p-monnify');
  });

  it('rejects a requested provider that is not org-enabled', async () => {
    const { gateway, providersService } = setup();
    providersService.listActiveForOrg.mockResolvedValue([paystack]);
    providersService.isConfigured.mockImplementation(() => true);
    providersService.listMethodProviders.mockResolvedValue([]);

    await expect(
      (gateway as any).resolveProvider('org-1', 'web', 'p-missing'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when no provider is configured for the organisation', async () => {
    const { gateway, providersService } = setup();
    providersService.listActiveForOrg.mockResolvedValue([paystack]);
    providersService.isConfigured.mockReturnValue(false);
    providersService.listMethodProviders.mockResolvedValue([]);

    await expect(
      (gateway as any).resolveProvider('org-1', 'web'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});

describe('PaymentGatewayService.markPaid', () => {
  it('marks a failed transaction paid and runs completion', async () => {
    const { gateway, txRepo, completion } = setup();
    const failed = tx({
      status: 'failed',
      sourceType: 'order',
      sourceId: 'order-1',
      amount: 100,
    });

    await gateway.markPaid(failed, 100, new Date());

    expect(failed.status).toBe('success');
    expect(failed.amountPaid).toBe(100);
    expect(completion.handleSuccess).toHaveBeenCalledWith(failed);
    expect(txRepo.save).toHaveBeenCalled();
  });

  it('is idempotent when already success', async () => {
    const { gateway, txRepo, completion } = setup();
    const done = tx({
      status: 'success',
      sourceType: 'order',
      sourceId: 'order-1',
    });

    await gateway.markPaid(done, 100);

    expect(txRepo.save).not.toHaveBeenCalled();
    expect(completion.handleSuccess).not.toHaveBeenCalled();
  });
});

describe('PaymentGatewayService.verify', () => {
  it('supersedes a cancelled state on provider-verified success and completes', async () => {
    const { gateway, txRepo, providerRepo, registry, completion } = setup();
    const cancelled = tx({
      status: 'cancelled',
      sourceType: 'wallet_deposit',
      userId: 'user-1',
      amount: 50,
    });
    txRepo.findOne.mockResolvedValue(cancelled);
    providerRepo.findOne.mockResolvedValue(paystack);
    registry.get.mockReturnValue({
      verify: jest
        .fn()
        .mockResolvedValue({ status: 'success', amountPaid: 50 }),
    });

    const result = await gateway.verify('ref-1', 'org-1');

    expect(result.status).toBe('success');
    expect(cancelled.status).toBe('success');
    expect(completion.handleSuccess).toHaveBeenCalled();
  });

  it('returns not-found for unknown reference', async () => {
    const { gateway, txRepo } = setup();
    txRepo.findOne.mockResolvedValue(null);

    await expect(gateway.verify('missing', 'org-1')).rejects.toThrow();
  });
});
