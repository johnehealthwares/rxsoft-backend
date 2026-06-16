import request from 'supertest';
import {
  createIntegrationTestContext,
  describeIfDbReady,
  destroyIntegrationTestContext,
  type IntegrationTestContext,
} from './support/sqlite-test-helpers';

describeIfDbReady('Purchases and Receiving Integration', () => {
  jest.setTimeout(30_000);

  let context: IntegrationTestContext;
  let accessToken = '';
  let poId = '';

  beforeAll(async () => {
    context = await createIntegrationTestContext();
    const tokens = await context.loginAsAdmin();
    accessToken = tokens.accessToken;
  });

  afterAll(async () => {
    await destroyIntegrationTestContext(context);
  });

  it('creates an approved purchase order', async () => {
    const response = await request(context.httpApp())
      .post('/purchases')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'approved',
        warehouseId: context.ids.warehouseId,
        supplierId: context.ids.supplierId,
        lines: [
          {
            itemId: context.ids.seedItemId,
            uomId: context.ids.baseUomId,
            orderedQty: 10,
            unitCost: 5,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.status).toBe('approved');
    expect(response.body.supplier.name).toBe('Test Supplier');
    expect(response.body.lines).toHaveLength(1);
    expect(response.body.lines[0].orderedQty).toBe(10);
    poId = response.body.id as string;
  });

  it('lists purchase orders', async () => {
    const response = await request(context.httpApp())
      .get('/purchases')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.data.some((po: { id: string }) => po.id === poId)).toBe(true);
    expect(response.body.data[0].supplier.name).toBe('Test Supplier');
  });

  it('gets a purchase order by id', async () => {
    const response = await request(context.httpApp())
      .get(`/purchases/${poId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(poId);
    expect(response.body.supplier.name).toBe('Test Supplier');
    expect(response.body.lines).toHaveLength(1);
  });

  it('receives goods for a purchase order', async () => {
    const response = await request(context.httpApp())
      .post(`/purchases/${poId}/receive`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        purchaseOrderId: poId,
        receivedDate: new Date().toISOString(),
        receiptNumber: 'GR-TEST-001',
          lines: [
          {
            itemId: context.ids.seedItemId,
            receivedQty: 5,
            uomId: context.ids.baseUomId,
            unitCost: 5,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.receiptId).toBeDefined();
    expect(response.body.receiptNumber).toBe('GR-TEST-001');
    expect(response.body.lines).toHaveLength(1);
    expect(response.body.lines[0].itemId).toBe(context.ids.seedItemId);
    expect(response.body.lines[0].receivedQty).toBe(5);
  });

  it('verifies stock balance and movement after receiving', async () => {
    const balances = await context.repositories.stockBalanceRepository.find({
      where: { item: { id: context.ids.seedItemId }, location: { id: context.ids.locationId } },
      relations: ['item', 'location'],
    });
    expect(balances.length).toBeGreaterThanOrEqual(1);
    const totalQoh = balances.reduce((sum, b) => sum + Number(b.quantityOnHand), 0);
    expect(totalQoh).toBe(25);

    const movements = await context.repositories.stockMovementRepository.find({
      where: { itemId: context.ids.seedItemId, movementType: 'in' },
    });
    expect(movements.length).toBeGreaterThanOrEqual(1);

    const po = await context.repositories.purchaseOrderRepository.findOne({
      where: { id: poId },
      relations: ['lines'],
    });
    expect(po!.status).toBe('partially_received');
    expect(Number(po!.lines[0].receivedQty)).toBe(5);
  });

  it('prevents over-receiving', async () => {
    const response = await request(context.httpApp())
      .post(`/purchases/${poId}/receive`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        purchaseOrderId: poId,
        receivedDate: new Date().toISOString(),
          lines: [
            {
              itemId: context.ids.seedItemId,
              receivedQty: 10,
              uomId: context.ids.baseUomId,
              unitCost: 5,
            },
          ],
        });

    expect(response.status).toBe(400);
  });

  it('rejects receiving on a draft purchase order', async () => {
    const draftResponse = await request(context.httpApp())
      .post('/purchases')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'draft',
        warehouseId: context.ids.warehouseId,
        supplierId: context.ids.supplierId,
        lines: [
          {
            itemId: context.ids.seedItemId,
            uomId: context.ids.baseUomId,
            orderedQty: 5,
            unitCost: 3,
          },
        ],
      });

    const draftPoId = draftResponse.body.id as string;

    const response = await request(context.httpApp())
      .post(`/purchases/${draftPoId}/receive`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        purchaseOrderId: draftPoId,
        receivedDate: new Date().toISOString(),
          lines: [
            {
              itemId: context.ids.seedItemId,
              receivedQty: 1,
              uomId: context.ids.baseUomId,
              unitCost: 3,
            },
          ],
        });

    expect(response.status).toBe(400);
  });

  it('completes partial receive to fully received status', async () => {
    const response = await request(context.httpApp())
      .post(`/purchases/${poId}/receive`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        purchaseOrderId: poId,
        receivedDate: new Date().toISOString(),
        receiptNumber: 'GR-TEST-002',
          lines: [
            {
              itemId: context.ids.seedItemId,
              receivedQty: 5,
              uomId: context.ids.baseUomId,
              unitCost: 5,
            },
          ],
      });

    expect(response.status).toBe(201);

    const po = await context.repositories.purchaseOrderRepository.findOne({
      where: { id: poId },
      relations: ['lines'],
    });
    expect(po!.status).toBe('received');
    expect(Number(po!.lines[0].receivedQty)).toBe(10);
  });
});
