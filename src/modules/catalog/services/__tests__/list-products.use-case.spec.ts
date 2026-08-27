import { ListItemsUseCase } from '../list-items.use-case';
import type { ItemRepository } from '../../repositories/item.repository';

describe('ListItemsUseCase', () => {
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

  it('forwards includeAll to the repository as showAll', async () => {
    itemRepository.list.mockResolvedValue({ items: [], total: 0 });

    await useCase.execute({
      page: 1,
      limit: 20,
      includeAll: true,
      sortBy: 'name',
      sortOrder: 'asc',
      get offset() {
        return 0;
      },
    }, 'org1');

    expect(itemRepository.list).toHaveBeenCalledWith(
      expect.objectContaining({ showAll: true }),
    );
  });
});
