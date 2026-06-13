import { ListItemDependenciesUseCase } from '../list-item-dependencies.use-case';
import type { ItemRepository } from '../../repositories/item.repository';

describe('ListItemDependenciesUseCase', () => {
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
  };

  const useCase = new ListItemDependenciesUseCase(itemRepository);

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
      organizationId: 'org1',
      offset: 10,
      limit: 10,
      search: 'ana',
    });
  });
});
