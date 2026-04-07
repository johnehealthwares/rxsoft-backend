import { ListReceivablesUseCase } from '../list-receivables.use-case';
import type { ReceivablesRepository } from '../../repositories/receivables.repository';

describe('ListReceivablesUseCase', () => {
  const receivablesRepository: jest.Mocked<ReceivablesRepository> = {
    list: jest.fn(),
    collectPayment: jest.fn(),
    applyAdjustment: jest.fn(),
    writeOff: jest.fn(),
    listTransactions: jest.fn(),
  };

  const useCase = new ListReceivablesUseCase(receivablesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards org scope and filters to repository', async () => {
    receivablesRepository.list.mockResolvedValue({ items: [], total: 0 });

    await useCase.execute(
      {
        page: 2,
        limit: 10,
        status: 'open',
        customerId: 'cust1',
        get offset() {
          return 10;
        },
      },
      'org1',
    );

    expect(receivablesRepository.list).toHaveBeenCalledWith({
      organizationId: 'org1',
      offset: 10,
      limit: 10,
      status: 'open',
      customerId: 'cust1',
    });
  });
});
