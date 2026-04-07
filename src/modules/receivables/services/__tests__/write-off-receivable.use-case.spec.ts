import { WriteOffReceivableUseCase } from '../write-off-receivable.use-case';
import type { ReceivablesRepository } from '../../repositories/receivables.repository';

describe('WriteOffReceivableUseCase', () => {
  const receivablesRepository: jest.Mocked<ReceivablesRepository> = {
    list: jest.fn(),
    collectPayment: jest.fn(),
    applyAdjustment: jest.fn(),
    writeOff: jest.fn(),
    listTransactions: jest.fn(),
  };

  const useCase = new WriteOffReceivableUseCase(receivablesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('writes off receivable outstanding and returns transaction id', async () => {
    receivablesRepository.writeOff.mockResolvedValue({
      receivable: {
        id: 'ar1',
        organizationId: 'org1',
        customerId: 'cust1',
        saleId: 'sale1',
        receivableNumber: 'AR-SALE-0001',
        originalAmount: 100,
        outstandingAmount: 0,
        status: 'written_off',
        openedAt: new Date('2026-02-20T10:00:00.000Z'),
        closedAt: new Date('2026-02-21T10:00:00.000Z'),
      },
      transactionId: 'tx1',
    });

    const result = await useCase.execute('ar1', { note: 'approved' }, 'org1', 'u1');
    expect(result.transactionId).toBe('tx1');
    expect(receivablesRepository.writeOff).toHaveBeenCalled();
  });
});
