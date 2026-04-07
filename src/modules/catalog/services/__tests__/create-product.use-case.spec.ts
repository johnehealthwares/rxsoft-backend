import { BadRequestException } from '@nestjs/common';
import { CreateProductUseCase } from '../create-product.use-case';
import type { ProductRepository } from '../../repositories/product.repository';
import type { PricingService } from '../../../pricing/services/pricing.service';
import type { InventoryService } from '../../../inventory/services/inventory.service';

describe('CreateProductUseCase', () => {
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

  const pricingService = {
    createPriceListItem: jest.fn(),
  } as unknown as jest.Mocked<PricingService>;

  const inventoryService = {
    adjustByReference: jest.fn(),
  } as unknown as jest.Mocked<InventoryService>;

  const useCase = new CreateProductUseCase(productRepository, pricingService, inventoryService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates product when code does not exist', async () => {
    productRepository.findByCode.mockResolvedValue(null);
    productRepository.findCategoryById.mockResolvedValue({
      id: 'c1',
      code: 'ANALGESICS',
      name: 'Analgesics',
    });
    productRepository.findGenericProductById.mockResolvedValue({
      id: 'g1',
      code: 'GEN001',
      name: 'Paracetamol',
      generalUse: '',
      adultDosage: '',
      pediatricDosage: '',
      isPrescriptionRequired: false,
      isControlledSubstance: false,
      pharmaceutics: {
        id: 'p1',
        code: 'PHARM001',
        clinicalName: '',
        drugClass: '',
        pharmaceutics: '',
        indications: '',
        contraindications: '',
        mechanism: '',
      },
    });
    productRepository.create.mockImplementation(async (product) => product);
    productRepository.findUomById.mockResolvedValue({ id: 'u1', code: 'UNIT', name: 'Unit' });
    pricingService.createPriceListItem.mockResolvedValue({} as never);
    inventoryService.adjustByReference.mockResolvedValue({} as never);

    const result = await useCase.execute({
      code: 'PCM001',
      name: 'Paracetamol 500mg',
      categoryId: 'c1',
      genericProductId: 'g1',
      baseUomId: 'u1',
      barcode: '123',
      isActive: true,
      priceListItems: [
        {
          priceListId: 'pl1',
          unitPrice: 100,
          currencyCode: 'NGN',
        },
      ],
      stockItems: [
        {
          locationId: 'loc1',
          deltaQuantity: 10,
          reason: 'Initial stock',
          productId: 'ignored',
        },
      ],
    }, 'org1', 'user1');

    expect(result.code).toBe('PCM001');
    expect(result.organizationId).toBe('org1');
    expect(result.category.code).toBe('ANALGESICS');
    expect(result.genericProduct.code).toBe('GEN001');
    expect(productRepository.create).toHaveBeenCalled();
    expect(productRepository.findByCode).toHaveBeenCalledWith('PCM001', 'org1');
    expect(productRepository.findCategoryById).toHaveBeenCalledWith('c1', 'org1');
    expect(productRepository.findGenericProductById).toHaveBeenCalledWith('g1', 'org1');
    expect(productRepository.findUomById).toHaveBeenCalledWith('u1', 'org1');
    expect(pricingService.createPriceListItem).toHaveBeenCalledWith(
      'pl1',
      expect.objectContaining({
        priceListId: 'pl1',
        productId: result.id,
        unitPrice: 100,
      }),
      'org1',
    );
    expect(inventoryService.adjustByReference).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: result.id,
        locationId: 'loc1',
        deltaQuantity: 10,
      }),
      'user1',
      'org1',
    );
  });

  it('throws when code already exists', async () => {
    productRepository.findByCode.mockResolvedValue({
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

    await expect(
      useCase.execute({
        code: 'PCM001',
        name: 'Paracetamol 500mg',
        categoryId: 'c1',
        genericProductId: 'g1',
        baseUomId: 'u1',
      }, 'org1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when a nested price list item is missing priceListId', async () => {
    productRepository.findByCode.mockResolvedValue(null);
    productRepository.findCategoryById.mockResolvedValue({
      id: 'c1',
      code: 'ANALGESICS',
      name: 'Analgesics',
    });
    productRepository.findGenericProductById.mockResolvedValue({
      id: 'g1',
      code: 'GEN001',
      name: 'Paracetamol',
      generalUse: '',
      adultDosage: '',
      pediatricDosage: '',
      isPrescriptionRequired: false,
      isControlledSubstance: false,
      pharmaceutics: {
        id: 'p1',
        code: 'PHARM001',
        clinicalName: '',
        drugClass: '',
        pharmaceutics: '',
        indications: '',
        contraindications: '',
        mechanism: '',
      },
    });
    productRepository.create.mockImplementation(async (product) => product);
    productRepository.findUomById.mockResolvedValue({ id: 'u1', code: 'UNIT', name: 'Unit' });

    await expect(
      useCase.execute(
        {
          code: 'PCM003',
          name: 'Paracetamol 500mg',
          categoryId: 'c1',
          genericProductId: 'g1',
          baseUomId: 'u1',
          priceListItems: [{ unitPrice: 100, currencyCode: 'NGN' }],
        },
        'org1',
        'user1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
