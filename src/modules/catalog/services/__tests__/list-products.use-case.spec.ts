import { ListProductsUseCase } from '../list-products.use-case';
import type { ProductRepository } from '../../repositories/product.repository';

describe('ListProductsUseCase', () => {
  const productRepository: jest.Mocked<ProductRepository> = {
    list: jest.fn(),
    findById: jest.fn(),
    findByCode: jest.fn(),
    findCategoryById: jest.fn(),
    findGenericProductById: jest.fn(),
    findUomById: jest.fn(),
    listCategories: jest.fn(),
    listGenericProducts: jest.fn(),
    listUoms: jest.fn(),
    create: jest.fn(),
  };

  const useCase = new ListProductsUseCase(productRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards pagination/filter/sort parameters to repository', async () => {
    productRepository.list.mockResolvedValue({ items: [], total: 0 });

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

    expect(productRepository.list).toHaveBeenCalledWith({
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
