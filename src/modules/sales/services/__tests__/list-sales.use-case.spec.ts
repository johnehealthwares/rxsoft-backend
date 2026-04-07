import { ListSalesUseCase } from '../list-sales.use-case';
import type { SalesRepository } from '../../repositories/sales.repository';

describe('ListSalesUseCase', () => {
  const salesRepository: jest.Mocked<SalesRepository> = {
    list: jest.fn(),
    createWithSettlement: jest.fn(),
    createRefund: jest.fn(),
  };

  const useCase = new ListSalesUseCase(salesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards org scope and query params to repository', async () => {
    salesRepository.list.mockResolvedValue({ items: [], total: 0 });

    await useCase.execute(
      {
        page: 2,
        limit: 10,
        status: 'posted',
        get offset() {
          return 10;
        },
      },
      'org1',
    );

    expect(salesRepository.list).toHaveBeenCalledWith({
      organizationId: 'org1',
      offset: 10,
      limit: 10,
      status: 'posted',
    });
  });
});
