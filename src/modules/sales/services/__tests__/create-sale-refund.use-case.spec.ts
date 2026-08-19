import { BadRequestException } from '@nestjs/common';
import type { SalesRepository } from '../../repositories/sales.repository';
import { CreateSaleRefundUseCase } from '../create-sale-refund.use-case';

describe('CreateSaleRefundUseCase', () => {
  const salesRepository: jest.Mocked<SalesRepository> = {
    list: jest.fn(),
    createWithSettlement: jest.fn(),
    createRefund: jest.fn(),
    findLastCreated: jest.fn().mockResolvedValue(null),
    postExistingSale: jest.fn().mockResolvedValue(null),
  };

  const useCase = new CreateSaleRefundUseCase(salesRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates refund through repository', async () => {
    salesRepository.createRefund.mockResolvedValue({
      id: 'r1',
      saleId: 's1',
      refundNumber: 'RF-1',
      status: 'posted',
      totalAmount: 25,
      refundDate: new Date('2026-02-28T12:00:00.000Z'),
    });

    const result = await useCase.execute(
      's1',
      {
        reason: 'damaged',
        lines: [{ saleLineId: 'sl1', quantity: 1 }],
      },
      'org1',
      'u1',
    );

    expect(result.id).toBe('r1');
    expect(salesRepository.createRefund).toHaveBeenCalledWith(
      expect.objectContaining({
        organizationId: 'org1',
        saleId: 's1',
        refundedByUserId: 'u1',
      }),
    );
  });

  it('rejects empty refund lines', async () => {
    await expect(
      useCase.execute(
        's1',
        {
          reason: 'none',
          lines: [],
        },
        'org1',
        'u1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
