import { BadRequestException } from '@nestjs/common';
import { CreateSaleUseCase } from '../create-sale.use-case';
import type { SalesRepository } from '../../repositories/sales.repository';

describe('CreateSaleUseCase', () => {
  const salesRepository: jest.Mocked<SalesRepository> = {
    list: jest.fn(),
    createWithSettlement: jest.fn(),
    createRefund: jest.fn(),
  };

  const useCase = new CreateSaleUseCase(salesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates receivable when underpaid', async () => {
    salesRepository.createWithSettlement.mockResolvedValue({
      sale: {
        id: 's1',
        organizationId: 'org1',
        saleNumber: 'SALE-0002',
        saleChannel: 'pos',
        status: 'posted',
        totalAmount: 100,
        paidAmount: 60,
        changeAmount: 0,
        saleDate: new Date('2026-02-28T10:00:00.000Z'),
      },
      receivableCreated: true,
      receivableId: 'ar1',
      outstandingAmount: 40,
    });

    const result = await useCase.execute(
      {
        saleNumber: 'SALE-0002',
        saleChannel: 'pos',
        storeId: 'store1',
        customerId: 'cust1',
        lines: [{ itemId: 'p1', uomId: 'u1', quantity: 2, unitPrice: 50 }],
        payments: [{ paymentMethodId: 'pm1', amount: 60 }],
      },
      'org1',
      'u1',
    );

    expect(result.receivableCreated).toBe(true);
    expect(result.outstandingAmount).toBe(40);
  });

  it('rejects underpayment without customer', async () => {
    await expect(
      useCase.execute(
        {
          saleNumber: 'SALE-0003',
          saleChannel: 'pos',
          storeId: 'store1',
          lines: [{ itemId: 'p1', uomId: 'u1', quantity: 1, unitPrice: 100 }],
          payments: [{ paymentMethodId: 'pm1', amount: 20 }],
        },
        'org1',
        'u1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
