import { ListItemDependenciesUseCase } from '../list-item-dependencies.use-case';
import type { ItemRepository } from '../../repositories/item.repository';

describe('ListItemDependenciesUseCase', () => {
  const itemRepository: jest.Mocked<ItemRepository> = {
    list: jest.fn(),
    findById: jest.fn(),
    findCategoryById: jest.fn(),
    findUomById: jest.fn(),
    listCategories: jest.fn(),
    listUoms: jest.fn(),
    save: jest.fn(),
    getMetrics: jest.fn(),
  };

  const genericDrugCache = { searchLightweight: jest.fn(), getByCode: jest.fn() } as any;

  const useCase = new ListItemDependenciesUseCase(itemRepository, genericDrugCache);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards category search params', async () => {
    itemRepository.listCategories.mockResolvedValue({ items: [], total: 0 });

    await useCase.listCategories(
      {
        page: 2,
        limit: 10,
        search: 'ana',
        get offset() {
          return 10;
        },
      },
      'org1',
    );

    expect(itemRepository.listCategories).toHaveBeenCalledWith({
      offset: 10,
      limit: 10,
      search: 'ana',
    });
  });
});
