import request from 'supertest';
import {
  createIntegrationTestContext,
  describeIfDbReady,
  destroyIntegrationTestContext,
  type IntegrationTestContext,
} from './support/sqlite-test-helpers';

describeIfDbReady('Sales and Receivables Integration', () => {
  jest.setTimeout(30_000);

  let context: IntegrationTestContext;
  let accessToken = '';
  let underpaidSaleId = '';
  let receivableId = '';
  let fullyPaidSaleId = '';

  beforeAll(async () => {
    context = await createIntegrationTestContext();
    const tokens = await context.loginAsAdmin();
    accessToken = tokens.accessToken;
  });

  afterAll(async () => {
    await destroyIntegrationTestContext(context);
  });

  it('creates an underpaid sale and opens a receivable', async () => {
    const response = await request(context.httpApp())
      .post('/sales')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        saleNumber: 'SALE-001',
        saleChannel: 'pos',
        storeId: 'default',
        stockLocationId: context.ids.locationId,
        customerId: context.ids.customerId,
        lines: [
          {
            itemId: context.ids.seedItemId,
            uomId: context.ids.baseUomId,
            quantity: 2,
            unitPrice: 50,
          },
        ],
        payments: [
          {
            paymentMethodId: context.ids.paymentMethodId,
            amount: 40,
          },
        ],
      });

    if (response.status !== 201) console.log('SALES ERR:', JSON.stringify(response.body));
    expect(response.status).toBe(201);
    expect(response.body.receivableCreated).toBe(true);
    expect(response.body.outstandingAmount).toBe(60);

    underpaidSaleId = response.body.id as string;
    receivableId = response.body.receivableId as string;
  });

  it('lists sales', async () => {
    const response = await request(context.httpApp())
      .get('/sales')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20, status: 'posted' });

    expect(response.status).toBe(200);
    expect(response.body.data.some((item: { id: string }) => item.id === underpaidSaleId)).toBe(true);
  });

  it('creates a refund for a posted sale', async () => {
    const saleResponse = await request(context.httpApp())
      .post('/sales')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        saleNumber: 'SALE-002',
        saleChannel: 'pos',
        storeId: 'default',
        stockLocationId: context.ids.locationId,
        lines: [
          {
            itemId: context.ids.seedItemId,
            uomId: context.ids.baseUomId,
            quantity: 1,
            unitPrice: 25,
          },
        ],
        payments: [
          {
            paymentMethodId: context.ids.paymentMethodId,
            amount: 25,
          },
        ],
      });

    fullyPaidSaleId = saleResponse.body.id as string;

    const saleLine = await context.repositories.saleLineRepository.findOneOrFail({
      where: { sale: { id: fullyPaidSaleId } },
      relations: { sale: true },
    });

    const response = await request(context.httpApp())
      .post(`/sales/${fullyPaidSaleId}/refunds`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        reason: 'Damaged item',
        lines: [
          {
            saleLineId: saleLine.id,
            quantity: 1,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.saleId).toBe(fullyPaidSaleId);
    expect(response.body.status).toBe('posted');
  });

  it('lists receivables', async () => {
    const response = await request(context.httpApp())
      .get('/receivables')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20, customerId: context.ids.customerId });

    expect(response.status).toBe(200);
    expect(response.body.data.some((item: { id: string }) => item.id === receivableId)).toBe(true);
  });

  it('collects payment on a receivable', async () => {
    const response = await request(context.httpApp())
      .post(`/receivables/${receivableId}/payments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        amount: 10,
        paymentMethodId: context.ids.paymentMethodId,
        referenceNumber: 'PAY-001',
      });

    expect(response.status).toBe(201);
    expect(response.body.receivable.id).toBe(receivableId);
    expect(response.body.receivable.outstandingAmount).toBe(50);
  });

  it('applies an adjustment to a receivable', async () => {
    const response = await request(context.httpApp())
      .post(`/receivables/${receivableId}/adjustments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        amount: -5,
        note: 'Discount approval',
      });

    expect(response.status).toBe(201);
    expect(response.body.receivable.outstandingAmount).toBe(45);
  });

  it('lists receivable transactions', async () => {
    const response = await request(context.httpApp())
      .get(`/receivables/${receivableId}/transactions`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThanOrEqual(3);
    expect(response.body.data.some((item: { transactionType: string }) => item.transactionType === 'charge')).toBe(true);
    expect(response.body.data.some((item: { transactionType: string }) => item.transactionType === 'payment')).toBe(true);
    expect(response.body.data.some((item: { transactionType: string }) => item.transactionType === 'adjustment')).toBe(true);
  });

  it('writes off the remaining receivable balance', async () => {
    const response = await request(context.httpApp())
      .post(`/receivables/${receivableId}/write-off`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        note: 'Approved write-off',
      });

    expect(response.status).toBe(201);
    expect(response.body.receivable.status).toBe('written_off');
    expect(response.body.receivable.outstandingAmount).toBe(0);
  });
});
