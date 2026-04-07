import { BadRequestException } from '@nestjs/common';
import { ApplyReceivableAdjustmentUseCase } from '../apply-receivable-adjustment.use-case';
import type { ReceivablesRepository } from '../../repositories/receivables.repository';

describe('ApplyReceivableAdjustmentUseCase', () => {
  const receivablesRepository: jest.Mocked<ReceivablesRepository> = {
    list: jest.fn(),
    collectPayment: jest.fn(),
    applyAdjustment: jest.fn(),
    writeOff: jest.fn(),
    listTransactions: jest.fn(),
  };

  const useCase = new ApplyReceivableAdjustmentUseCase(receivablesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('applies adjustment and returns transaction id', async () => {
    receivablesRepository.applyAdjustment.mockResolvedValue({
      receivable: {
        id: 'ar1',
        organizationId: 'org1',
        customerId: 'cust1',
        saleId: 'sale1',
        receivableNumber: 'AR-SALE-0001',
        originalAmount: 100,
        outstandingAmount: 120,
        status: 'open',
        openedAt: new Date('2026-02-20T10:00:00.000Z'),
        closedAt: null,
      },
      transactionId: 'tx1',
    });

    const result = await useCase.execute('ar1', { amount: 20, note: 'manual correction' }, 'org1', 'u1');
    expect(result.transactionId).toBe('tx1');
    expect(receivablesRepository.applyAdjustment).toHaveBeenCalled();
  });

  it('rejects zero adjustment', async () => {
    await expect(useCase.execute('ar1', { amount: 0 }, 'org1', 'u1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
