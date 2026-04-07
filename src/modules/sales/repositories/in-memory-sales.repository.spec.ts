import { InMemorySalesRepository } from './in-memory-sales.repository';

describe('InMemorySalesRepository', () => {
  it('credits linked receivable outstanding when refund is created', async () => {
    const repository = new InMemorySalesRepository();

    const saleResult = await repository.createWithSettlement({
      organizationId: 'org1',
      saleNumber: 'SALE-REF-1',
      saleChannel: 'pos',
      storeId: 'store1',
      customerId: 'cust1',
      soldByUserId: 'u1',
      saleDate: new Date('2026-02-28T10:00:00.000Z'),
      subtotalAmount: 100,
      totalAmount: 100,
      paidAmount: 60,
      changeAmount: 0,
      lines: [
        {
          lineNumber: 1,
          productId: 'p1',
          uomId: 'u1',
          lotId: null,
          quantity: 2,
          unitPrice: 50,
          lineSubtotal: 100,
          lineTotal: 100,
        },
      ],
      payments: [
        {
          paymentMethodId: 'pm1',
          amount: 60,
          paymentReference: null,
          paidAt: new Date('2026-02-28T10:00:00.000Z'),
          receivedByUserId: 'u1',
        },
      ],
      receivable: {
        customerId: 'cust1',
        receivableNumber: 'AR-SALE-REF-1',
        originalAmount: 40,
        outstandingAmount: 40,
      },
    });

    await repository.createRefund({
      organizationId: 'org1',
      saleId: saleResult.sale.id,
      refundNumber: 'RF-1',
      reason: 'test',
      refundedByUserId: 'u1',
      refundDate: new Date('2026-02-28T11:00:00.000Z'),
      lines: [{ saleLineId: 'sl1', quantity: 2 }],
    });

    const receivables = (repository as any).receivables as Map<
      string,
      { saleId: string; outstandingAmount: number; status: string }
    >;
    const linkedReceivable = [...receivables.values()].find((item) => item.saleId === saleResult.sale.id);

    expect(linkedReceivable?.outstandingAmount).toBe(20);
    expect(linkedReceivable?.status).toBe('partially_paid');
  });
});
