import { BadRequestException } from '@nestjs/common';
import { CollectReceivablePaymentUseCase } from '../collect-receivable-payment.use-case';
import type { ReceivablesRepository } from '../../repositories/receivables.repository';

describe('CollectReceivablePaymentUseCase', () => {
  const receivablesRepository: jest.Mocked<ReceivablesRepository> = {
    list: jest.fn(),
    collectPayment: jest.fn(),
    applyAdjustment: jest.fn(),
    writeOff: jest.fn(),
    listTransactions: jest.fn(),
  };

  const useCase = new CollectReceivablePaymentUseCase(receivablesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('collects payment and returns transaction id', async () => {
    receivablesRepository.collectPayment.mockResolvedValue({
      receivable: {
        id: 'ar1',
        organizationId: 'org1',
        customerId: 'cust1',
        saleId: 'sale1',
        receivableNumber: 'AR-SALE-0001',
        originalAmount: 100,
        outstandingAmount: 40,
        status: 'partially_paid',
        openedAt: new Date('2026-02-20T10:00:00.000Z'),
        closedAt: null,
      },
      transactionId: 'tx1',
    });

    const result = await useCase.execute(
      'ar1',
      { amount: 60, paymentMethodId: 'pm1' },
      'org1',
      'u1',
    );

    expect(result.transactionId).toBe('tx1');
    expect(receivablesRepository.collectPayment).toHaveBeenCalled();
  });

  it('rejects zero or negative amount', async () => {
    await expect(
      useCase.execute('ar1', { amount: 0, paymentMethodId: 'pm1' }, 'org1', 'u1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
