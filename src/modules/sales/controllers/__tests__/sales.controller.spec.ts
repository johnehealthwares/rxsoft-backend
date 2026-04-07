import { SalesController } from '../sales.controller';
import type { CreateSaleRefundUseCase } from '../../services/create-sale-refund.use-case';
import type { CreateSaleUseCase } from '../../services/create-sale.use-case';
import type { ListSalesUseCase } from '../../services/list-sales.use-case';

describe('SalesController', () => {
  const listSalesUseCase: jest.Mocked<ListSalesUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<ListSalesUseCase>;

  const createSaleUseCase: jest.Mocked<CreateSaleUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<CreateSaleUseCase>;

  const createSaleRefundUseCase: jest.Mocked<CreateSaleRefundUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<CreateSaleRefundUseCase>;

  const controller = new SalesController(listSalesUseCase, createSaleUseCase, createSaleRefundUseCase);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('maps sale list response', async () => {
    listSalesUseCase.execute.mockResolvedValue({
      items: [
        {
          id: 's1',
          organizationId: 'org1',
          saleNumber: 'SALE-0001',
          saleChannel: 'pos',
          status: 'posted',
          totalAmount: 125.5,
          paidAmount: 130,
          changeAmount: 4.5,
          saleDate: new Date('2026-02-20T10:00:00.000Z'),
        },
      ],
      total: 1,
    });

    const result = await controller.listSales(
      {
        page: 1,
        limit: 20,
        get offset() {
          return 0;
        },
      },
      { sub: 'u1', organizationId: 'org1', username: 'admin', roles: ['admin'], permissions: [] },
    );

    expect(listSalesUseCase.execute).toHaveBeenCalledWith(expect.anything(), 'org1');
    expect(result.data[0]).toMatchObject({
      id: 's1',
      saleNumber: 'SALE-0001',
      saleChannel: 'pos',
      status: 'posted',
      totalAmount: 125.5,
      paidAmount: 130,
      changeAmount: 4.5,
      saleDate: '2026-02-20T10:00:00.000Z',
    });
  });

  it('maps create sale response with receivable fields', async () => {
    createSaleUseCase.execute.mockResolvedValue({
      sale: {
        id: 's2',
        organizationId: 'org1',
        saleNumber: 'SALE-0002',
        saleChannel: 'pos',
        status: 'posted',
        totalAmount: 100,
        paidAmount: 60,
        changeAmount: 0,
        saleDate: new Date('2026-02-20T11:00:00.000Z'),
      },
      receivableCreated: true,
      receivableId: 'ar1',
      outstandingAmount: 40,
    });

    const result = await controller.createSale(
      {
        saleNumber: 'SALE-0002',
        saleChannel: 'pos',
        storeId: 'store1',
        customerId: 'cust1',
        lines: [{ productId: 'p1', uomId: 'u1', quantity: 2, unitPrice: 50 }],
        payments: [{ paymentMethodId: 'pm1', amount: 60 }],
      },
      { sub: 'u1', organizationId: 'org1', username: 'cashier', roles: ['cashier'], permissions: [] },
    );

    expect(createSaleUseCase.execute).toHaveBeenCalledWith(expect.anything(), 'org1', 'u1');
    expect(result).toMatchObject({
      id: 's2',
      receivableCreated: true,
      receivableId: 'ar1',
      outstandingAmount: 40,
    });
  });

  it('maps create refund response', async () => {
    createSaleRefundUseCase.execute.mockResolvedValue({
      id: 'r1',
      saleId: 's2',
      refundNumber: 'RF-0001',
      status: 'posted',
      totalAmount: 25,
      refundDate: new Date('2026-02-20T12:00:00.000Z'),
    });

    const result = await controller.createRefund(
      's2',
      {
        reason: 'damaged item',
        lines: [{ saleLineId: 'sl1', quantity: 1 }],
      },
      { sub: 'u1', organizationId: 'org1', username: 'cashier', roles: ['cashier'], permissions: [] },
    );

    expect(createSaleRefundUseCase.execute).toHaveBeenCalledWith(
      's2',
      expect.anything(),
      'org1',
      'u1',
    );
    expect(result).toMatchObject({
      id: 'r1',
      saleId: 's2',
      status: 'posted',
      totalAmount: 25,
    });
  });
});
