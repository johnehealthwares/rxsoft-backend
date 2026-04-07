import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateStockAdjustmentUseCase } from '../create-stock-adjustment.use-case';
import type { InventoryRepository } from '../../repositories/inventory.repository';

describe('CreateStockAdjustmentUseCase', () => {
  const inventoryRepository: jest.Mocked<InventoryRepository> = {
    listStockBalances: jest.fn(),
    listStockMovements: jest.fn(),
    findStockBalanceById: jest.fn(),
    applyStockAdjustment: jest.fn(),
    listStoreStockLocations: jest.fn(),
    createStoreStockLocation: jest.fn(),
    setStoreStockLocationActivation: jest.fn(),
  };

  const useCase = new CreateStockAdjustmentUseCase(inventoryRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('applies adjustment for valid payload', async () => {
    inventoryRepository.findStockBalanceById.mockResolvedValue({
      id: 'b1',
      organizationId: 'org1',
      product: { id: 'p1', code: 'PARA-500', name: 'Paracetamol 500mg' },
      location: { id: 'l1', name: 'Main Store' },
      lot: null,
      quantityOnHand: 20,
      quantityReserved: 0,
      averageCost: 1.25,
    });

    inventoryRepository.applyStockAdjustment.mockResolvedValue({
      id: 'b1',
      organizationId: 'org1',
      product: { id: 'p1', code: 'PARA-500', name: 'Paracetamol 500mg' },
      location: { id: 'l1', name: 'Main Store' },
      lot: null,
      quantityOnHand: 25,
      quantityReserved: 0,
      averageCost: 1.25,
    });

    const result = await useCase.execute(
      {
        stockBalanceId: 'b1',
        deltaQuantity: 5,
        reason: 'count correction',
      },
      'u1',
      'org1',
    );

    expect(result.quantityOnHand).toBe(25);
    expect(inventoryRepository.findStockBalanceById).toHaveBeenCalledWith('b1', 'org1');
    expect(inventoryRepository.applyStockAdjustment).toHaveBeenCalledWith(
      expect.anything(),
      'org1',
    );
  });

  it('rejects zero delta quantity', async () => {
    await expect(
      useCase.execute(
        {
          stockBalanceId: 'b1',
          deltaQuantity: 0,
          reason: 'x',
        },
        'u1',
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects when stock balance is missing', async () => {
    inventoryRepository.findStockBalanceById.mockResolvedValue(null);

    await expect(
      useCase.execute(
        {
          stockBalanceId: 'missing',
          deltaQuantity: 1,
          reason: 'x',
        },
        'u1',
        'org1',
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('rejects negative resulting stock', async () => {
    inventoryRepository.findStockBalanceById.mockResolvedValue({
      id: 'b1',
      organizationId: 'org1',
      product: { id: 'p1', code: 'PARA-500', name: 'Paracetamol 500mg' },
      location: { id: 'l1', name: 'Main Store' },
      lot: null,
      quantityOnHand: 2,
      quantityReserved: 0,
      averageCost: 1.25,
    });

    await expect(
      useCase.execute(
        {
          stockBalanceId: 'b1',
          deltaQuantity: -3,
          reason: 'x',
        },
        'u1',
        'org1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
