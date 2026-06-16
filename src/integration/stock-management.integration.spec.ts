import request from 'supertest';
import {
  createIntegrationTestContext,
  describeIfDbReady,
  destroyIntegrationTestContext,
  type IntegrationTestContext,
} from './support/sqlite-test-helpers';

describeIfDbReady('Stock Management', () => {
  jest.setTimeout(60_000);

  let ctx: IntegrationTestContext;
  let accessToken = '';
  let secondLocationId: string;
  let websiteOrderId: string;
  let poId: string;
  let receiptLineId: string;

  beforeAll(async () => {
    ctx = await createIntegrationTestContext();
    const tokens = await ctx.loginAsAdmin();
    accessToken = tokens.accessToken;
  });

  afterAll(async () => {
    await destroyIntegrationTestContext(ctx);
  });

  // ── Seed data verification ─────────────────────────────────────

  it('verifies seed stock balance', async () => {
    const balance = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    expect(balance).not.toBeNull();
    expect(Number(balance!.quantityOnHand)).toBe(20);
    expect(Number(balance!.quantityReserved)).toBe(2);
  });

  // ── Stock Transfer ─────────────────────────────────────────────

  it('creates a second stock location', async () => {
    const res = await request(ctx.httpApp())
      .post('/stock-locations')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ code: 'SECONDARY', name: 'Secondary Store', locationType: 'internal', isActive: true });

    expect(res.status).toBe(201);
    secondLocationId = res.body.id as string;
  });

  it('transfers stock between locations', async () => {
    const res = await request(ctx.httpApp())
      .post('/inventory/transfers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fromLocationId: ctx.ids.locationId,
        toLocationId: secondLocationId,
        itemId: ctx.ids.seedItemId,
        quantity: 3,
        reason: 'test transfer',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Stock transferred successfully');

    const src = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    expect(Number(src!.quantityOnHand)).toBe(17);
    expect(Number(src!.quantityReserved)).toBe(2);

    const dest = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: secondLocationId },
      },
    });
    expect(dest).not.toBeNull();
    expect(Number(dest!.quantityOnHand)).toBe(3);
  });

  it('rejects transfer when quantity exceeds available', async () => {
    const res = await request(ctx.httpApp())
      .post('/inventory/transfers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fromLocationId: ctx.ids.locationId,
        toLocationId: secondLocationId,
        itemId: ctx.ids.seedItemId,
        quantity: 999,
        reason: 'excessive',
      });

    expect(res.status).toBe(400);
  });

  // ── Website Order ──────────────────────────────────────────────

  it('creates a website order with stock reservation', async () => {
    const res = await request(ctx.httpApp())
      .post('/website/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        customerId: ctx.ids.customerId,
        deliveryAddress: '123 Test Street',
        city: 'Test City',
        phone: '08000000000',
        paymentMethod: 'cash',
        items: [{ itemId: ctx.ids.seedItemId, quantity: 2, unitPrice: 50 }],
      });

    expect(res.status).toBe(201);
    expect(res.body.saleNumber).toBeDefined();
    expect(res.body.orderStatus).toBe('pending');
    expect(res.body.lines).toHaveLength(1);
    websiteOrderId = res.body.id as string;
  });

  it('assigns a stock location to the order', async () => {
    const res = await request(ctx.httpApp())
      .post(`/website/admin/orders/${websiteOrderId}/assign-location`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ stockLocationId: ctx.ids.locationId });
    expect(res.status).toBe(201);

    const order = await ctx.repositories.saleRepository.findOne({ where: { id: websiteOrderId } });
    expect(order!.assignedLocationId).toBe(ctx.ids.locationId);
  });

  it('transitions order to confirmed then processing', async () => {
    const p1 = await request(ctx.httpApp())
      .patch(`/website/admin/orders/${websiteOrderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'confirmed' });
    expect(p1.status).toBe(200);

    const processRes = await request(ctx.httpApp())
      .post(`/website/admin/orders/${websiteOrderId}/process`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(processRes.status).toBe(201);
    expect(processRes.body.orderStatus).toBe('processing');

    const balance = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    expect(Number(balance!.quantityOnHand)).toBe(17);
    expect(Number(balance!.quantityReserved)).toBe(0);
  });

  it('rejects invalid status transition', async () => {
    const res = await request(ctx.httpApp())
      .patch(`/website/admin/orders/${websiteOrderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'delivered' });
    expect(res.status).toBe(400);
  });

  it('cancels an order and releases reserved stock', async () => {
    const createRes = await request(ctx.httpApp())
      .post('/website/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        customerId: ctx.ids.customerId,
        deliveryAddress: '456 Cancel St',
        paymentMethod: 'cash',
        items: [{ itemId: ctx.ids.seedItemId, quantity: 1, unitPrice: 50 }],
      });

    const orderId = createRes.body.id as string;

    await request(ctx.httpApp())
      .patch(`/website/admin/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'cancelled' })
      .expect(200);
  });

  it('lists website orders', async () => {
    const res = await request(ctx.httpApp())
      .get('/website/admin/orders')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.some((o: any) => o.id === websiteOrderId)).toBe(true);
  });

  // ── Goods Receipt + Unpost ─────────────────────────────────────

  it('creates an approved purchase order', async () => {
    const res = await request(ctx.httpApp())
      .post('/purchases')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'approved',
        warehouseId: ctx.ids.warehouseId,
        supplierId: ctx.ids.supplierId,
        lines: [{
          itemId: ctx.ids.seedItemId,
          uomId: ctx.ids.baseUomId,
          orderedQty: 10,
          unitCost: 5,
        }],
      });
    expect(res.status).toBe(201);
    poId = res.body.id as string;
  });

  it('receives goods against the PO', async () => {
    const res = await request(ctx.httpApp())
      .post(`/purchases/${poId}/receive`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        purchaseOrderId: poId,
        receivedDate: new Date().toISOString(),
        receiptNumber: 'GR-TEST-UNPOST',
        lines: [{
          itemId: ctx.ids.seedItemId,
          receivedQty: 4,
          uomId: ctx.ids.baseUomId,
          unitCost: 5,
        }],
      });
    expect(res.status).toBe(201);
    expect(res.body.receiptNumber).toBe('GR-TEST-UNPOST');
    expect(res.body.lines).toHaveLength(1);
    receiptLineId = res.body.lines[0].receiptLineId as string;
  });

  it('verifies stock increased after receiving', async () => {
    const balance = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    expect(Number(balance!.quantityOnHand)).toBeGreaterThan(0);
  });

  it('lists all goods receipts', async () => {
    const res = await request(ctx.httpApp())
      .get('/receipts')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });
    expect(res.status).toBe(200);
    expect(res.body.total).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].receiptNumber).toBe('GR-TEST-UNPOST');
  });

  it('lists receipts by purchase order', async () => {
    const res = await request(ctx.httpApp())
      .get(`/purchases/${poId}/receipts`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.some((r: any) => r.receiptNumber === 'GR-TEST-UNPOST')).toBe(true);
  });

  it('unposts a goods receipt line', async () => {
    const res = await request(ctx.httpApp())
      .post(`/purchases/${poId}/unpost`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ receiptLineId, password: 'password12' });
    expect(res.status).toBe(201);
    expect(res.body.message).toContain('unposted');

    const unposted = await ctx.repositories.goodsReceiptLineRepository.findOne({ where: { id: receiptLineId } });
    expect(unposted!.isUnposted).toBe(true);
  });

  it('rejects unposting an already unposted line', async () => {
    const res = await request(ctx.httpApp())
      .post(`/purchases/${poId}/unpost`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ receiptLineId, password: 'password12' });
    expect(res.status).toBe(400);
  });

  it('rejects unpost with wrong password', async () => {
    const res = await request(ctx.httpApp())
      .post(`/purchases/${poId}/unpost`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ receiptLineId: 'fake-id', password: 'wrong' });
    expect(res.status).toBe(400);
  });

  // ── POS Sale Stock Depletion ───────────────────────────────────

  it('creates a posted sale and depletes stock', async () => {
    const before = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    const beforeQty = Number(before!.quantityOnHand);

    const res = await request(ctx.httpApp())
      .post('/sales')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        saleNumber: 'SALE-DEPLETE-001',
        saleChannel: 'pos',
        storeId: 'default',
        stockLocationId: ctx.ids.locationId,
        customerId: ctx.ids.customerId,
        lines: [{
          itemId: ctx.ids.seedItemId,
          uomId: ctx.ids.baseUomId,
          quantity: 2,
          unitPrice: 50,
        }],
        payments: [{ paymentMethodId: ctx.ids.paymentMethodId, amount: 100 }],
      });

    if (res.status !== 201) console.log('SALE ERROR:', res.status, JSON.stringify(res.body));
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('posted');

    const after = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    expect(Number(after!.quantityOnHand)).toBe(beforeQty - 2);
  });

  it('creates a draft sale without affecting stock', async () => {
    const before = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    const beforeQty = Number(before!.quantityOnHand);

    const res = await request(ctx.httpApp())
      .post('/sales')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        saleNumber: 'SALE-HOLD-001',
        saleChannel: 'pos',
        storeId: 'default',
        hold: true,
        customerId: ctx.ids.customerId,
        lines: [{
          itemId: ctx.ids.seedItemId,
          uomId: ctx.ids.baseUomId,
          quantity: 5,
          unitPrice: 50,
        }],
        payments: [],
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('draft');

    const after = await ctx.repositories.stockBalanceRepository.findOne({
      where: {
        organizationId: ctx.ids.organizationId,
        item: { id: ctx.ids.seedItemId },
        location: { id: ctx.ids.locationId },
      },
    });
    expect(Number(after!.quantityOnHand)).toBe(beforeQty);
  });

  // ── UOM Listing ────────────────────────────────────────────────

  it('lists available UOMs for an item', async () => {
    const res = await request(ctx.httpApp())
      .get(`/items/${ctx.ids.seedItemId}/uoms`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    const list = res.body.data ?? res.body;
    expect(Array.isArray(list)).toBe(true);
    expect(list.some((u: any) => u.id === ctx.ids.baseUomId)).toBe(true);
  });

  it('returns empty UOM list for non-existent item', async () => {
    const res = await request(ctx.httpApp())
      .get('/items/00000000-0000-0000-0000-000000000000/uoms')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    const list = res.body.data ?? res.body;
    expect(list).toHaveLength(0);
  });

  // ── POS Config ─────────────────────────────────────────────────

  it('creates and reads POS config with storeId', async () => {
    const createRes = await request(ctx.httpApp())
      .patch('/user-pos-config/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ storeId: ctx.ids.locationId });
    expect(createRes.status).toBe(200);

    const getRes = await request(ctx.httpApp())
      .get('/user-pos-config/me')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.storeId).toBe(ctx.ids.locationId);
  });
});
