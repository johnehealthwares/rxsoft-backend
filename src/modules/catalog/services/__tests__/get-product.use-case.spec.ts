import { NotFoundException } from '@nestjs/common';
import { GetItemUseCase } from '../get-item.use-case';
import type { ItemRepository } from '../../repositories/item.repository';
import { Item } from '../../domains/item.entity';
import { ItemCategory } from '../../domains/item-category.entity';

describe('GetItemUseCase', () => {
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

  const useCase = new GetItemUseCase(itemRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns item when found', async () => {
    const category = new ItemCategory('c1', 'ANALGESICS', 'Analgesics');
    const item = new Item(
      'p1',
      'Paracetamol',
      null,
      category.id,
      category,
      'u1',
      null,
      null,
      null,
      null,
      null,
      true,
      true,
      null,
    );
    itemRepository.findById.mockResolvedValue(item);

    const result = await useCase.execute('p1', 'org1');

    expect(result.id).toBe('p1');
    expect(itemRepository.findById).toHaveBeenCalledWith('p1', 'org1', false);
  });

  it('throws NotFoundException when missing', async () => {
    itemRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing', 'org1')).rejects.toBeInstanceOf(NotFoundException);
  });
});
