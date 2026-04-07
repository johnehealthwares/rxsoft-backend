import { BadRequestException } from '@nestjs/common';
import { InMemoryReceivablesRepository } from './in-memory-receivables.repository';

describe('InMemoryReceivablesRepository', () => {
  let repository: InMemoryReceivablesRepository;

  beforeEach(() => {
    repository = new InMemoryReceivablesRepository();
  });

  it('rejects payment larger than outstanding', async () => {
    await expect(
      repository.collectPayment({
        organizationId: 'org1',
        receivableId: 'ar1',
        amount: 120,
        paymentMethodId: 'pm1',
        receivedByUserId: 'u1',
        referenceNumber: null,
        note: null,
        transactionDate: new Date('2026-02-28T12:00:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects collecting payment after receivable is closed', async () => {
    await repository.collectPayment({
      organizationId: 'org1',
      receivableId: 'ar1',
      amount: 100,
      paymentMethodId: 'pm1',
      receivedByUserId: 'u1',
      referenceNumber: null,
      note: null,
      transactionDate: new Date('2026-02-28T12:00:00.000Z'),
    });

    await expect(
      repository.collectPayment({
        organizationId: 'org1',
        receivableId: 'ar1',
        amount: 1,
        paymentMethodId: 'pm1',
        receivedByUserId: 'u1',
        referenceNumber: null,
        note: null,
        transactionDate: new Date('2026-02-28T12:01:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects write-off when no outstanding remains', async () => {
    await repository.collectPayment({
      organizationId: 'org1',
      receivableId: 'ar1',
      amount: 100,
      paymentMethodId: 'pm1',
      receivedByUserId: 'u1',
      referenceNumber: null,
      note: null,
      transactionDate: new Date('2026-02-28T12:00:00.000Z'),
    });

    await expect(
      repository.writeOff({
        organizationId: 'org1',
        receivableId: 'ar1',
        writtenOffByUserId: 'u1',
        note: null,
        transactionDate: new Date('2026-02-28T12:02:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
