import { BadRequestException } from '@nestjs/common';
import { CreateItemUseCase } from '../create-item.use-case';
import type { ItemRepository } from '../../repositories/item.repository';
import type { PricingService } from '../../../pricing/services/pricing.service';
import type { InventoryService } from '../../../inventory/services/inventory.service';

describe('CreateItemUseCase', () => {
  const itemRepository: jest.Mocked<ItemRepository> = {
    list: jest.fn(),
    findById: jest.fn(),
    findByCode: jest.fn(),
    findByBarcode: jest.fn(),
    findCategoryById: jest.fn(),
    findGenericProductById: jest.fn(),
    findUomById: jest.fn(),
    listCategories: jest.fn(),
    listGenericProducts: jest.fn(),
    listUoms: jest.fn(),
    save: jest.fn(),
    findLastCreated: jest.fn().mockResolvedValue(null),
  };

  const pricingService = {
    createPriceListItem: jest.fn(),
  } as unknown as jest.Mocked<PricingService>;

  const inventoryService = {
    adjustByReference: jest.fn(),
  } as unknown as jest.Mocked<InventoryService>;

  const useCase = new CreateItemUseCase(itemRepository, pricingService, inventoryService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates item when code does not exist', async () => {
    itemRepository.findByCode.mockResolvedValue(null);
    itemRepository.findCategoryById.mockResolvedValue({
      id: 'c1',
      code: 'ANALGESICS',
      name: 'Analgesics',
    });
    itemRepository.findGenericProductById.mockResolvedValue({
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
    itemRepository.save.mockImplementation(async (item) => item);
    itemRepository.findUomById.mockResolvedValue({ id: 'u1', code: 'UNIT', name: 'Unit' });
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
          itemId: 'ignored',
        },
      ],
    }, 'org1', 'user1');

    expect(result.code).toBe('PCM001');
    expect(result.organizationId).toBe('org1');
    expect(result.category.code).toBe('ANALGESICS');
    expect(result.genericProduct.code).toBe('GEN001');
    expect(itemRepository.save).toHaveBeenCalled();
    expect(itemRepository.findByCode).toHaveBeenCalledWith('PCM001', 'org1');
    expect(itemRepository.findCategoryById).toHaveBeenCalledWith('c1', 'org1');
    expect(itemRepository.findGenericProductById).toHaveBeenCalledWith('g1', 'org1');
    expect(itemRepository.findUomById).toHaveBeenCalledWith('u1', 'org1');
    expect(pricingService.createPriceListItem).toHaveBeenCalledWith(
      'pl1',
      expect.objectContaining({
        priceListId: 'pl1',
        itemId: result.id,
        unitPrice: 100,
      }),
      'org1',
    );
    expect(inventoryService.adjustByReference).toHaveBeenCalledWith(
      expect.objectContaining({
        itemId: result.id,
        locationId: 'loc1',
        deltaQuantity: 10,
      }),
      'user1',
      'org1',
    );
  });

  it('throws when code already exists', async () => {
    itemRepository.findByCode.mockResolvedValue({
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
    itemRepository.findByCode.mockResolvedValue(null);
    itemRepository.findCategoryById.mockResolvedValue({
      id: 'c1',
      code: 'ANALGESICS',
      name: 'Analgesics',
    });
    itemRepository.findGenericProductById.mockResolvedValue({
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
    itemRepository.save.mockImplementation(async (item) => item);
    itemRepository.findUomById.mockResolvedValue({ id: 'u1', code: 'UNIT', name: 'Unit' });

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
