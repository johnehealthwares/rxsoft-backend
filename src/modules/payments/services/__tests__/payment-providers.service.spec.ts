import { BadRequestException } from '@nestjs/common';
import {
  PaymentProvidersService,
  maskSecret,
} from '../payment-providers.service';
import type { PaymentProviderOrmEntity } from '../../entities/payment-provider.orm-entity';

function providerRow(
  overrides: Partial<PaymentProviderOrmEntity> = {},
): PaymentProviderOrmEntity {
  return {
    id: 'p1',
    code: 'PAYSTACK',
    name: 'Paystack',
    providerType: 'paystack',
    channel: 'web',
    description: null,
    production: false,
    testConfig: { secretKey: 'sk_test_12345abcdef', publicKey: '' },
    liveConfig: null,
    isActive: true,
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as PaymentProviderOrmEntity;
}

function repository() {
  return {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn((x: any) => Promise.resolve(x)),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      getMany: jest.fn().mockResolvedValue([]),
      getOne: jest.fn().mockResolvedValue(null),
    })),
  };
}

function service() {
  const providerRepo = repository();
  const orgRepo = repository();
  const methodRepo = repository();
  const svc = new PaymentProvidersService(
    providerRepo as any,
    orgRepo as any,
    methodRepo as any,
  );
  return { svc, providerRepo, orgRepo, methodRepo };
}

describe('PaymentProvidersService', () => {
  it('masks secrets and keeps only the prefix/suffix', () => {
    expect(maskSecret('sk_test_12345abcdef')).toBe('sk_t****cdef');
    expect(maskSecret('abc')).toBe('ab****');
    expect(maskSecret(undefined)).toBeUndefined();
  });

  it('resolves the active credential set from the production flag', () => {
    const { svc } = service();

    const testRow = providerRow();
    expect(svc.activeCreds(testRow)).toEqual({
      secretKey: 'sk_test_12345abcdef',
      publicKey: '',
    });

    const liveRow = providerRow({
      production: true,
      testConfig: { secretKey: 'test' },
      liveConfig: { secretKey: 'live-key', publicKey: 'live-pub' },
    });
    expect(svc.activeCreds(liveRow)).toEqual({
      secretKey: 'live-key',
      publicKey: 'live-pub',
    });
  });

  it('reports configured only when some credential exists', () => {
    const { svc } = service();
    expect(svc.isConfigured(providerRow())).toBe(true);
    expect(
      svc.isConfigured(providerRow({ testConfig: null, liveConfig: null })),
    ).toBe(false);
  });

  it('rejects duplicate codes on create', async () => {
    const { svc, providerRepo } = service();
    providerRepo.findOne.mockResolvedValue(providerRow({ code: 'PAYSTACK' }));

    await expect(
      svc.create({
        code: 'PAYSTACK',
        name: 'Dup',
        providerType: 'paystack',
        channel: 'web',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('keeps existing secrets when the incoming value is the masked placeholder', async () => {
    const { svc, providerRepo } = service();
    const existing = providerRow();
    providerRepo.findOne.mockResolvedValue(existing);
    providerRepo.save.mockImplementation((x: any) => Promise.resolve(x));

    const updated = await svc.update('p1', {
      testConfig: { secretKey: 'sk_t****cdef' },
      liveConfig: { apiKey: 'new-live-key' },
    });

    // masked placeholder preserved the original, live apiKey was stored
    expect(updated.hasTestCredentials).toBe(true);
    // raw entity retained the original secret
    expect(
      (await providerRepo.save.mock.calls[0][0]).testConfig.secretKey,
    ).toBe('sk_test_12345abcdef');
    expect((await providerRepo.save.mock.calls[0][0]).liveConfig.apiKey).toBe(
      'new-live-key',
    );
  });

  it('flips to live mode when production is set', async () => {
    const { svc, providerRepo } = service();
    const existing = providerRow();
    providerRepo.findOne.mockResolvedValue(existing);
    providerRepo.save.mockImplementation((x: any) => Promise.resolve(x));

    await svc.update('p1', { production: true });
    expect(existing.production).toBe(true);
  });

  it('removes org provider rows idempotently', async () => {
    const { svc, orgRepo } = service();
    orgRepo.delete.mockResolvedValue({ affected: 1 });
    await expect(svc.removeOrgProvider('org-1', 'p1')).resolves.toBeUndefined();
    expect(orgRepo.delete).toHaveBeenCalledWith({
      organizationId: 'org-1',
      paymentProviderId: 'p1',
    });
  });
});
