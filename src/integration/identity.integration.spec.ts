import request from 'supertest';
import {
  createIntegrationTestContext,
  describeIfDbReady,
  destroyIntegrationTestContext,
  type IntegrationTestContext,
} from './support/sqlite-test-helpers';

describeIfDbReady('Identity Integration', () => {
  jest.setTimeout(30_000);

  let context: IntegrationTestContext;
  let accessToken = '';
  let refreshToken = '';

  beforeAll(async () => {
    context = await createIntegrationTestContext();
    const tokens = await context.loginAsAdmin();
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
  });

  afterAll(async () => {
    await destroyIntegrationTestContext(context);
  });

  it('logs in and returns token pair', async () => {
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it('refreshes a token pair', async () => {
    const response = await request(context.httpApp()).post('/auth/refresh-token').send({
      refreshToken,
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });

  it('creates a user', async () => {
    const response = await request(context.httpApp())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        username: 'cashier01',
        password: 'secret123',
        roleCodes: ['cashier'],
      });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('cashier01');
    expect(response.body.roles).toEqual(['cashier']);
  });

  it('lists users', async () => {
    const response = await request(context.httpApp())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThanOrEqual(2);
    expect(response.body.data.some((item: { username: string }) => item.username === 'cashier01')).toBe(true);
  });

  it('assigns a role to an existing user', async () => {
    const usersResponse = await request(context.httpApp())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 20 });
    const createdUser = usersResponse.body.data.find((item: { username: string }) => item.username === 'cashier01');

    const response = await request(context.httpApp())
      .patch(`/users/${createdUser.id}/roles`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        roleCode: 'admin',
      });

    expect(response.status).toBe(200);
    expect(response.body.roles).toEqual(expect.arrayContaining(['cashier', 'admin']));
  });
});
