import { InventoryController } from '../inventory.controller';
import type { CreateStockAdjustmentUseCase } from '../../services/create-stock-adjustment.use-case';
import type { ListStockBalancesUseCase } from '../../services/list-stock-balances.use-case';
import type { ListStockMovementsUseCase } from '../../services/list-stock-movements.use-case';

describe('InventoryController', () => {
  const listStockBalancesUseCase: jest.Mocked<ListStockBalancesUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<ListStockBalancesUseCase>;

  const createStockAdjustmentUseCase: jest.Mocked<CreateStockAdjustmentUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<CreateStockAdjustmentUseCase>;

  const listStockMovementsUseCase: jest.Mocked<ListStockMovementsUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<ListStockMovementsUseCase>;

  const controller = new InventoryController(
    listStockBalancesUseCase,
    listStockMovementsUseCase,
    createStockAdjustmentUseCase,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('maps list response with concrete refs and flattened ids', async () => {
    listStockBalancesUseCase.execute.mockResolvedValue({
      items: [
        {
          id: 'b1',
          organizationId: 'org1',
          product: { id: 'p1', code: 'PARA-500', name: 'Paracetamol 500mg' },
          location: { id: 'l1', name: 'Main Store' },
          lot: { id: 'lot1', code: 'LOT-001' },
          quantityOnHand: 20,
          quantityReserved: 2,
          averageCost: 1.25,
        },
      ],
      total: 1,
    });

    const result = await controller.listStockBalances({
      page: 1,
      limit: 20,
      get offset() {
        return 0;
      },
    }, { sub: 'u1', organizationId: 'org1', username: 'admin', roles: ['admin'], permissions: [] });

    expect(listStockBalancesUseCase.execute).toHaveBeenCalledWith(
      expect.anything(),
      'org1',
    );

    expect(result.data[0]).toMatchObject({
      id: 'b1',
      product: { id: 'p1', code: 'PARA-500', name: 'Paracetamol 500mg' },
      location: { id: 'l1', name: 'Main Store' },
      lot: { id: 'lot1', code: 'LOT-001' },
      productId: 'p1',
      locationId: 'l1',
      lotId: 'lot1',
      quantityOnHand: 20,
    });
  });

  it('maps adjustment response and supports null lot', async () => {
    createStockAdjustmentUseCase.execute.mockResolvedValue({
      id: 'b1',
      organizationId: 'org1',
      product: { id: 'p1', code: 'PARA-500', name: 'Paracetamol 500mg' },
      location: { id: 'l1', name: 'Main Store' },
      lot: null,
      quantityOnHand: 25,
      quantityReserved: 2,
      averageCost: 1.25,
    });

    const result = await controller.createAdjustment(
      {
        stockBalanceId: 'b1',
        deltaQuantity: 5,
        reason: 'count correction',
      },
      { sub: 'u1', organizationId: 'org1', username: 'admin', roles: ['admin'], permissions: [] },
    );

    expect(createStockAdjustmentUseCase.execute).toHaveBeenCalledWith(
      expect.anything(),
      'u1',
      'org1',
    );

    expect(result).toMatchObject({
      id: 'b1',
      product: { id: 'p1', code: 'PARA-500', name: 'Paracetamol 500mg' },
      location: { id: 'l1', name: 'Main Store' },
      lot: null,
      productId: 'p1',
      locationId: 'l1',
      lotId: null,
      quantityOnHand: 25,
    });
  });
});
