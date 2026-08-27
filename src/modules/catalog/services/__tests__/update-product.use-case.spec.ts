import { BadRequestException } from '@nestjs/common';
import { UpdateItemUseCase } from '../update-item.use-case';
import type { ItemRepository, UomLookup } from '../../repositories/item.repository';
import { ItemCategory } from '../../domains/item-category.entity';

describe('UpdateItemUseCase', () => {
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

  const genericDrugCache = {
    getByCode: jest.fn(),
  } as any;

  const organisationItemsService = {
    upsert: jest.fn(),
  } as any;

  const useCase = new UpdateItemUseCase(
    itemRepository,
    genericDrugCache,
    undefined,
    undefined,
    undefined,
    organisationItemsService,
  );

  const category = new ItemCategory('c1', 'ANALGESICS', 'Analgesics');
  const uom: UomLookup = { id: 'u1', code: 'UNIT', name: 'Unit', uomType: 'reference', rounding: 1, factor: 1, isActive: true };

  beforeEach(() => {
    jest.clearAllMocks();
    itemRepository.findCategoryById.mockResolvedValue(category);
    itemRepository.findUomById.mockResolvedValue(uom);
    itemRepository.save.mockImplementation(async (item) => item);
  });

  it('updates a global item', async () => {
    const result = await useCase.execute(
      'item1',
      {
        name: 'Paracetamol 500mg',
        categoryId: 'c1',
        baseUomId: 'u1',
        purchaseUomId: 'u1',
        saleUomId: 'u1',
        isActive: true,
      },
      'org1',
      'user1',
    );

    expect(result.name).toBe('Paracetamol 500mg');
    expect(itemRepository.save).toHaveBeenCalled();
  });

  it('upserts the org overlay when code/barcode/alias are supplied', async () => {
    await useCase.execute(
      'item1',
      {
        name: 'Paracetamol 500mg',
        categoryId: 'c1',
        baseUomId: 'u1',
        purchaseUomId: 'u1',
        saleUomId: 'u1',
        code: 'ORG-PCM',
        barcode: '123456',
        alias: 'Panadol 500mg',
      },
      'org1',
    );

    expect(organisationItemsService.upsert).toHaveBeenCalledWith('org1', 'item1', {
      alias: 'Panadol 500mg',
      code: 'ORG-PCM',
      barcode: '123456',
    });
  });

  it('does not call the org overlay upsert when no override fields are present', async () => {
    await useCase.execute(
      'item1',
      {
        name: 'Paracetamol 500mg',
        categoryId: 'c1',
        baseUomId: 'u1',
        purchaseUomId: 'u1',
        saleUomId: 'u1',
      },
      'org1',
    );

    expect(organisationItemsService.upsert).not.toHaveBeenCalled();
  });

  it('throws when category does not exist', async () => {
    itemRepository.findCategoryById.mockResolvedValue(null);

    await expect(
      useCase.execute(
        'item1',
        { name: 'X', categoryId: 'missing', baseUomId: 'u1', purchaseUomId: 'u1', saleUomId: 'u1' },
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when base UOM does not exist', async () => {
    itemRepository.findUomById.mockResolvedValue(null);

    await expect(
      useCase.execute(
        'item1',
        { name: 'X', categoryId: 'c1', baseUomId: 'missing', purchaseUomId: 'u1', saleUomId: 'u1' },
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});