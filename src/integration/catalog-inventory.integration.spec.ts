import request from 'supertest';
import {
  createIntegrationTestContext,
  describeIfDbReady,
  destroyIntegrationTestContext,
  type IntegrationTestContext,
} from './support/sqlite-test-helpers';

describeIfDbReady('Catalog and Inventory Integration', () => {
  jest.setTimeout(30_000);

  let context: IntegrationTestContext;
  let accessToken = '';
  let createdItemId = '';

  beforeAll(async () => {
    context = await createIntegrationTestContext();
    const tokens = await context.loginAsAdmin();
    accessToken = tokens.accessToken;
  });

  afterAll(async () => {
    await destroyIntegrationTestContext(context);
  });

  it('creates an item together with price list items and stock items', async () => {
    const response = await request(context.httpApp())
      .post('/items')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        code: 'PCM001',
        name: 'Paracetamol 500mg Tablet',
        categoryId: context.ids.categoryId,
        baseUomId: context.ids.baseUomId,
        purchaseUomId: context.ids.baseUomId,
        saleUomId: context.ids.baseUomId,
        barcode: '1234567890123',
      });

    expect(response.status).toBe(201);
    expect(response.body.code).toBe('PCM001');
    createdItemId = response.body.id as string;
  });

  it('lists items', async () => {
    const response = await request(context.httpApp())
      .get('/items')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThanOrEqual(2);
    expect(response.body.data.some((item: { code: string }) => item.code === 'PCM001')).toBe(true);
  });

  it('gets an item by id', async () => {
    const response = await request(context.httpApp())
      .get(`/items/${createdItemId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdItemId);
    expect(response.body.code).toBe('PCM001');
  });

  it('lists item dependency categories', async () => {
    const response = await request(context.httpApp())
      .get('/items/dependencies/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.data.some((item: { id: string }) => item.id === context.ids.categoryId)).toBe(true);
  });

  it('lists item dependency generic products', async () => {
    const response = await request(context.httpApp())
      .get('/items/dependencies/generic-products')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
  });

  it('lists item dependency uoms', async () => {
    const response = await request(context.httpApp())
      .get('/items/dependencies/uoms')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.data.some((item: { id: string }) => item.id === context.ids.baseUomId)).toBe(true);
  });

  it('lists stock balances filtered by relation ids', async () => {
    const response = await request(context.httpApp())
      .get('/inventory/stock-balances')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        itemId: context.ids.seedItemId,
        locationId: context.ids.locationId,
      });

    expect(response.status).toBe(200);
    expect(response.body.data[0].itemId).toBe(context.ids.seedItemId);
    expect(response.body.data[0].locationId).toBe(context.ids.locationId);
  });

  it('applies stock adjustment and returns updated quantity', async () => {
    const response = await request(context.httpApp())
      .post('/inventory/adjustments')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        stockBalanceId: context.ids.stockBalanceId,
        deltaQuantity: 5,
        reason: 'count correction',
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(context.ids.stockBalanceId);
    expect(response.body.quantityOnHand).toBe(25);
  });

  it('lists stock movements after an adjustment', async () => {
    const response = await request(context.httpApp())
      .get('/inventory/stock-movements')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThanOrEqual(1);
    expect(response.body.data.some((item: { movementType: string }) => item.movementType === 'adjustment')).toBe(true);
  });
});
