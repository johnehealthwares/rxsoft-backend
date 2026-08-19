import { BadRequestException } from '@nestjs/common';
import { CreateItemUseCase } from '../create-item.use-case';
import type { ItemRepository, UomLookup } from '../../repositories/item.repository';
import { ItemCategory } from '../../domains/item-category.entity';

describe('CreateItemUseCase', () => {
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

  const genericDrugCache = { getByCode: jest.fn() } as any;

  const useCase = new CreateItemUseCase(itemRepository, genericDrugCache);

  const category = new ItemCategory('c1', 'ANALGESICS', 'Analgesics');
  const uom: UomLookup = { id: 'u1', code: 'UNIT', name: 'Unit', uomType: 'reference', rounding: 1, factor: 1, isActive: true };

  beforeEach(() => {
    jest.clearAllMocks();
    itemRepository.findById.mockResolvedValue(null);
  });

  it('creates a global item', async () => {
    itemRepository.findCategoryById.mockResolvedValue(category);
    itemRepository.findUomById.mockResolvedValue(uom);
    itemRepository.save.mockImplementation(async (item) => item);

    const result = await useCase.execute(
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
    expect(result.category.code).toBe('ANALGESICS');
    expect(itemRepository.save).toHaveBeenCalled();
    expect(itemRepository.findCategoryById).toHaveBeenCalledWith('c1');
    expect(itemRepository.findUomById).toHaveBeenCalledWith('u1');
  });

  it('throws when category does not exist', async () => {
    itemRepository.findCategoryById.mockResolvedValue(null);

    await expect(
      useCase.execute(
        { name: 'X', categoryId: 'missing', baseUomId: 'u1', purchaseUomId: 'u1', saleUomId: 'u1' },
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when base UOM does not exist', async () => {
    itemRepository.findCategoryById.mockResolvedValue(category);
    itemRepository.findUomById.mockResolvedValue(null);

    await expect(
      useCase.execute(
        { name: 'X', categoryId: 'c1', baseUomId: 'missing', purchaseUomId: 'u1', saleUomId: 'u1' },
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
