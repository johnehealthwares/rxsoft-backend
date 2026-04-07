import { NotFoundException } from '@nestjs/common';
import { GetProductUseCase } from '../get-product.use-case';
import type { ProductRepository } from '../../repositories/product.repository';

describe('GetProductUseCase', () => {
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

  const useCase = new GetProductUseCase(productRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns product when found', async () => {
    productRepository.findById.mockResolvedValue({
      id: 'p1',
      organizationId: 'org1',
      code: 'PCM001',
      name: 'Paracetamol',
      category: {
        id: 'c1',
        code: 'ANALGESICS',
        name: 'Analgesics',
      },
      genericProduct: {
        id: 'g1',
        code: 'GEN001',
        name: 'Paracetamol',
        generalUse: '',
        adultDosage: '',
        pediatricDosage: '',
        isPrescriptionRequired: false,
        isControlledSubstance: false,
        pharmaceutics: {
          id: 'ph1',
          code: 'PHARM1',
          clinicalName: '',
          drugClass: '',
          pharmaceutics: '',
          indications: '',
          contraindications: '',
          mechanism: '',
        },
      },
      baseUomId: 'u1',
      purchaseUomId: null,
      saleUomId: null,
      barcode: null,
      trackLot: true,
      trackExpiry: true,
      shelfLifeDays: null,
      isActive: true,
    });

    const result = await useCase.execute('p1', 'org1');

    expect(result.id).toBe('p1');
    expect(productRepository.findById).toHaveBeenCalledWith('p1', 'org1');
  });

  it('throws NotFoundException when missing', async () => {
    productRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing', 'org1')).rejects.toBeInstanceOf(NotFoundException);
  });
});
