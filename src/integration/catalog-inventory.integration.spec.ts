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
  let createdProductId = '';

  beforeAll(async () => {
    context = await createIntegrationTestContext();
    const tokens = await context.loginAsAdmin();
    accessToken = tokens.accessToken;
  });

  afterAll(async () => {
    await destroyIntegrationTestContext(context);
  });

  it('creates a product together with price list items and stock items', async () => {
    const response = await request(context.httpApp())
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        code: 'PCM001',
        name: 'Paracetamol 500mg Tablet',
        categoryId: context.ids.categoryId,
        genericProductId: context.ids.genericProductId,
        baseUomId: context.ids.baseUomId,
        barcode: '1234567890123',
        priceListItems: [
          {
            priceListId: context.ids.priceListId,
            locationId: context.ids.locationId,
            currencyCode: 'NGN',
            unitPrice: 150,
          },
        ],
        stockItems: [
          {
            locationId: context.ids.locationId,
            deltaQuantity: 12,
            reason: 'Initial stock setup',
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.code).toBe('PCM001');

    const createdProduct = await context.repositories.productRepository.findOneOrFail({
      where: { code: 'PCM001', organizationId: context.ids.organizationId },
    });
    createdProductId = createdProduct.id;

    const priceListItem = await context.repositories.priceListItemRepository.findOne({
      where: {
        product: { id: createdProduct.id },
        priceList: { id: context.ids.priceListId },
      },
      relations: { product: true, priceList: true, location: true },
    });
    expect(priceListItem?.unitPrice).toBe(150);
    expect(priceListItem?.location?.id).toBe(context.ids.locationId);

    const stockBalance = await context.repositories.stockBalanceRepository.findOne({
      where: {
        product: { id: createdProduct.id },
        location: { id: context.ids.locationId },
      },
      relations: { product: true, location: true },
    });
    expect(stockBalance?.quantityOnHand).toBe(12);
  });

  it('lists products', async () => {
    const response = await request(context.httpApp())
      .get('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThanOrEqual(2);
    expect(response.body.data.some((item: { code: string }) => item.code === 'PCM001')).toBe(true);
  });

  it('gets a product by id', async () => {
    const response = await request(context.httpApp())
      .get(`/products/${createdProductId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdProductId);
    expect(response.body.code).toBe('PCM001');
  });

  it('lists product dependency categories', async () => {
    const response = await request(context.httpApp())
      .get('/products/dependencies/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.data.some((item: { id: string }) => item.id === context.ids.categoryId)).toBe(true);
  });

  it('lists product dependency generic products', async () => {
    const response = await request(context.httpApp())
      .get('/products/dependencies/generic-products')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.data.some((item: { id: string }) => item.id === context.ids.genericProductId)).toBe(true);
  });

  it('lists product dependency uoms', async () => {
    const response = await request(context.httpApp())
      .get('/products/dependencies/uoms')
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
        productId: context.ids.seedProductId,
        locationId: context.ids.locationId,
      });

    expect(response.status).toBe(200);
    expect(response.body.data[0].productId).toBe(context.ids.seedProductId);
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
