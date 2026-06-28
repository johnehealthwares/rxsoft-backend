import request from 'supertest';
import {
  createIntegrationTestContext,
  describeIfDbReady,
  destroyIntegrationTestContext,
  type IntegrationTestContext,
} from './support/sqlite-test-helpers';

describeIfDbReady('Purchases Line CRUD Integration', () => {
  jest.setTimeout(30_000);

  let context: IntegrationTestContext;
  let accessToken = '';
  let draftPoId = '';
  let approvedPoId = '';
  let lineId = '';

  beforeAll(async () => {
    context = await createIntegrationTestContext();
    const tokens = await context.loginAsAdmin();
    accessToken = tokens.accessToken;
  });

  afterAll(async () => {
    await destroyIntegrationTestContext(context);
  });

  it('creates a draft purchase order', async () => {
    const response = await request(context.httpApp())
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
            orderedQty: 10,
            unitCost: 5,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('draft');
    draftPoId = response.body.id as string;
    lineId = response.body.lines[0].id as string;
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
            orderedQty: 5,
            unitCost: 3,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('approved');
    approvedPoId = response.body.id as string;
  });

  it('adds a line to a draft purchase order', async () => {
    const response = await request(context.httpApp())
      .post(`/purchases/${draftPoId}/lines`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        itemId: context.ids.seedItemId,
        uomId: context.ids.baseUomId,
        orderedQty: 5,
        unitCost: 10,
        discountPercent: 0,
        taxPercent: 0,
      });

    expect(response.status).toBe(201);
    expect(response.body.lines).toHaveLength(2);
    const newLine = response.body.lines.find((l: any) => l.id !== lineId);
    expect(newLine).toBeDefined();
    expect(newLine.orderedQty).toBe(5);
    expect(newLine.unitCost).toBe(10);
    expect(newLine.itemCode).toBeDefined();
    expect(newLine.itemName).toBeDefined();
  });

  it('rejects adding a line to an approved purchase order', async () => {
    const response = await request(context.httpApp())
      .post(`/purchases/${approvedPoId}/lines`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        itemId: context.ids.seedItemId,
        uomId: context.ids.baseUomId,
        orderedQty: 5,
        unitCost: 10,
      });

    expect(response.status).toBe(403);
  });

  it('updates orderedQty and unitCost on a draft line', async () => {
    const response = await request(context.httpApp())
      .put(`/purchases/${draftPoId}/lines/${lineId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        orderedQty: 15,
        unitCost: 7,
      });

    expect(response.status).toBe(200);
    const updated = response.body.lines.find((l: any) => l.id === lineId);
    expect(updated).toBeDefined();
    expect(updated.orderedQty).toBe(15);
    expect(updated.unitCost).toBe(7);
    expect(updated.itemCode).toBeDefined();
    expect(updated.itemName).toBeDefined();
  });

  it('allows receivedQty and unitCost update on an approved line', async () => {
    const response = await request(context.httpApp())
      .put(`/purchases/${approvedPoId}/lines/${approvedPoId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        receivedQty: 3,
        unitCost: 4,
      });

    const approvedLines = (await request(context.httpApp())
      .get(`/purchases/${approvedPoId}`)
      .set('Authorization', `Bearer ${accessToken}`)
    ).body.lines;

    const targetLine = approvedLines[0];
    expect(targetLine).toBeDefined();

    const updateResponse = await request(context.httpApp())
      .put(`/purchases/${approvedPoId}/lines/${targetLine.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        receivedQty: 3,
        unitCost: 4,
      });

    expect(updateResponse.status).toBe(200);
    const updated = updateResponse.body.lines.find((l: any) => l.id === targetLine.id);
    expect(updated.receivedQty).toBe(3);
    expect(updated.unitCost).toBe(4);
  });

  it('rejects orderedQty update on an approved line', async () => {
    const approvedLines = (await request(context.httpApp())
      .get(`/purchases/${approvedPoId}`)
      .set('Authorization', `Bearer ${accessToken}`)
    ).body.lines;

    const targetLine = approvedLines[0];

    const response = await request(context.httpApp())
      .put(`/purchases/${approvedPoId}/lines/${targetLine.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        orderedQty: 10,
      });

    expect(response.status).toBe(403);
  });

  it('deletes a line from a draft purchase order', async () => {
    const response = await request(context.httpApp())
      .delete(`/purchases/${draftPoId}/lines/${lineId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.lines).toHaveLength(1);
  });

  it('rejects deleting a line from an approved purchase order', async () => {
    const approvedLines = (await request(context.httpApp())
      .get(`/purchases/${approvedPoId}`)
      .set('Authorization', `Bearer ${accessToken}`)
    ).body.lines;

    const targetLine = approvedLines[0];

    const response = await request(context.httpApp())
      .delete(`/purchases/${approvedPoId}/lines/${targetLine.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(403);
  });

  it('returns itemCode and itemName in purchase order response', async () => {
    const response = await request(context.httpApp())
      .get(`/purchases/${draftPoId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    for (const line of response.body.lines) {
      expect(line.itemCode).toBeDefined();
      expect(line.itemName).toBeDefined();
      expect(line.itemCode).not.toBe('');
      expect(line.itemName).not.toBe('');
    }
  });
});
