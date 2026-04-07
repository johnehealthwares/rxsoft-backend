import { ListProductDependenciesUseCase } from '../list-product-dependencies.use-case';
import type { ProductRepository } from '../../repositories/product.repository';

describe('ListProductDependenciesUseCase', () => {
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

  const useCase = new ListProductDependenciesUseCase(productRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards category search params', async () => {
    productRepository.listCategories.mockResolvedValue({ items: [], total: 0 });

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

    expect(productRepository.listCategories).toHaveBeenCalledWith({
      organizationId: 'org1',
      offset: 10,
      limit: 10,
      search: 'ana',
    });
  });
});
