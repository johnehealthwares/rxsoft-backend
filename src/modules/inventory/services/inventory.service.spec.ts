import { BadRequestException } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { StockBalance, ItemReference, StockLocationReference } from '../domains/stock-balance.entity';

const base = {
  id: 'base',
  name: 'Tablet',
  code: 'TAB',
  uomType: 'reference',
  factor: 1,
  categoryId: 'cat1',
};

const box = {
  id: 'box',
  name: 'Box',
  code: 'BOX',
  uomType: 'bigger',
  factor: 10,
  categoryId: 'cat1',
};

const makeBalance = (id: string, locationId: string) =>
  new StockBalance(
    id,
    'org1',
    new ItemReference('it1', null, 'Paracetamol'),
    new StockLocationReference(locationId, `Loc ${locationId}`),
    null,
    100,
    0,
    5,
    null,
    null,
  );

describe('InventoryService.transfer', () => {
  const inventoryRepository = {
    transferStock: jest.fn(),
  } as any;
  const uomRepository = { findOne: jest.fn() } as any;
  const itemRepository = { findOne: jest.fn() } as any;

  const service = new InventoryService(inventoryRepository, uomRepository, itemRepository, undefined);

  beforeEach(() => {
    jest.clearAllMocks();
    inventoryRepository.transferStock.mockResolvedValue({
      fromBalance: makeBalance('f1', 'l1'),
      toBalance: makeBalance('t1', 'l2'),
    });
    itemRepository.findOne.mockResolvedValue({ id: 'it1', baseUom: base });
  });

  it('converts a quantity entered in a non-base UOM to base units', async () => {
    uomRepository.findOne.mockResolvedValue(box);

    await service.transfer(
      { fromLocationId: 'l1', toLocationId: 'l2', itemId: 'it1', quantity: 2, uomId: 'box' } as any,
      'user1',
      'org1',
    );

    expect(inventoryRepository.transferStock).toHaveBeenCalledWith(
      expect.objectContaining({ quantity: 20, uomId: 'box' }),
    );
  });

  it('passes the quantity through when the UOM is the base UOM', async () => {
    uomRepository.findOne.mockResolvedValue(base);

    await service.transfer(
      { fromLocationId: 'l1', toLocationId: 'l2', itemId: 'it1', quantity: 5, uomId: 'base' } as any,
      'user1',
      'org1',
    );

    expect(inventoryRepository.transferStock).toHaveBeenCalledWith(
      expect.objectContaining({ quantity: 5, uomId: 'base' }),
    );
  });

  it('passes the quantity through when no uomId is sent', async () => {
    await service.transfer(
      { fromLocationId: 'l1', toLocationId: 'l2', itemId: 'it1', quantity: 7 } as any,
      'user1',
      'org1',
    );

    expect(inventoryRepository.transferStock).toHaveBeenCalledWith(
      expect.objectContaining({ quantity: 7, uomId: null }),
    );
  });

  it('rejects a UOM that does not exist', async () => {
    uomRepository.findOne.mockResolvedValue(null);

    await expect(
      service.transfer(
        { fromLocationId: 'l1', toLocationId: 'l2', itemId: 'it1', quantity: 1, uomId: 'nope' } as any,
        'user1',
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects a UOM from a different category than the base UOM', async () => {
    uomRepository.findOne.mockResolvedValue({ ...box, categoryId: 'other' });

    await expect(
      service.transfer(
        { fromLocationId: 'l1', toLocationId: 'l2', itemId: 'it1', quantity: 1, uomId: 'box' } as any,
        'user1',
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});