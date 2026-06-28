import { ListItemsUseCase } from '../list-items.use-case';
import type { ItemRepository } from '../../repositories/item.repository';

describe('ListItemsUseCase', () => {
  const itemRepository: jest.Mocked<ItemRepository> = {
    list: jest.fn(),
    findById: jest.fn(),
    findByCode: jest.fn(),
    findCategoryById: jest.fn(),
    findGenericProductById: jest.fn(),
    findUomById: jest.fn(),
    listCategories: jest.fn(),
    listGenericProducts: jest.fn(),
    listUoms: jest.fn(),
    save: jest.fn(),
    findByBarcode: jest.fn(),
    findLastCreated: jest.fn().mockResolvedValue(null),
  };
  };

  const useCase = new ListItemsUseCase(itemRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards pagination/filter/sort parameters to repository', async () => {
    itemRepository.list.mockResolvedValue({ items: [], total: 0 });

    await useCase.execute({
      page: 2,
      limit: 10,
      search: 'para',
      categoryCode: 'ANALGESICS',
      sortBy: 'code',
      sortOrder: 'desc',
      get offset() {
        return 10;
      },
    }, 'org1');

    expect(itemRepository.list).toHaveBeenCalledWith({
      organizationId: 'org1',
      offset: 10,
      limit: 10,
      search: 'para',
      categoryCode: 'ANALGESICS',
      sortBy: 'code',
      sortOrder: 'desc',
    });
  });
});
