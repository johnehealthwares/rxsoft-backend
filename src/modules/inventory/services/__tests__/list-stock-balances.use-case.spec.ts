import { ListStockBalancesUseCase } from '../list-stock-balances.use-case';
import type { InventoryRepository } from '../../repositories/inventory.repository';

describe('ListStockBalancesUseCase', () => {
  const inventoryRepository: jest.Mocked<InventoryRepository> = {
    listStockBalances: jest.fn(),
    listStockMovements: jest.fn(),
    findStockBalanceById: jest.fn(),
    applyStockAdjustment: jest.fn(),
    listStoreStockLocations: jest.fn(),
    createStoreStockLocation: jest.fn(),
    setStoreStockLocationActivation: jest.fn(),
  };

  const useCase = new ListStockBalancesUseCase(inventoryRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards pagination and filters to repository', async () => {
    inventoryRepository.listStockBalances.mockResolvedValue({ items: [], total: 0 });

    await useCase.execute({
      page: 2,
      limit: 10,
      productId: 'p1',
      locationId: 'l1',
      get offset() {
        return 10;
      },
    }, 'org1');

    expect(inventoryRepository.listStockBalances).toHaveBeenCalledWith({
      organizationId: 'org1',
      offset: 10,
      limit: 10,
      productId: 'p1',
      locationId: 'l1',
    });
  });
});
