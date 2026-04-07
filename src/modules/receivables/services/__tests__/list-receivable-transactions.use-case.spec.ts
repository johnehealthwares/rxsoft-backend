import { ListReceivableTransactionsUseCase } from '../list-receivable-transactions.use-case';
import type { ReceivablesRepository } from '../../repositories/receivables.repository';

describe('ListReceivableTransactionsUseCase', () => {
  const receivablesRepository: jest.Mocked<ReceivablesRepository> = {
    list: jest.fn(),
    collectPayment: jest.fn(),
    applyAdjustment: jest.fn(),
    writeOff: jest.fn(),
    listTransactions: jest.fn(),
  };

  const useCase = new ListReceivableTransactionsUseCase(receivablesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards scope, receivable id, pagination, and filter to repository', async () => {
    receivablesRepository.listTransactions.mockResolvedValue({ items: [], total: 0 });

    await useCase.execute(
      'ar1',
      {
        page: 2,
        limit: 10,
        transactionType: 'payment',
        get offset() {
          return 10;
        },
      },
      'org1',
    );

    expect(receivablesRepository.listTransactions).toHaveBeenCalledWith({
      organizationId: 'org1',
      receivableId: 'ar1',
      offset: 10,
      limit: 10,
      transactionType: 'payment',
    });
  });
});
