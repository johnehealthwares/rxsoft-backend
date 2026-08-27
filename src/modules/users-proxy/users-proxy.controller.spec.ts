import { UsersProxyController } from './users-proxy.controller';
import type { UsersProxyService } from './users-proxy.service';
import type { UserPosConfigService } from '../user-pos-config/services/user-pos-config.service';
import type { RequestUser } from '../../common/decorators/current-user.decorator';

describe('UsersProxyController', () => {
  const proxy: jest.Mocked<UsersProxyService> = {
    list: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<UsersProxyService>;

  const posConfigService: jest.Mocked<UserPosConfigService> = {
    listByOrganization: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<UserPosConfigService>;

  const controller = new UsersProxyController(proxy, posConfigService);

  const currentUser: RequestUser = {
    sub: 'u1',
    organizationId: 'org1',
    locationId: null,
    username: 'admin',
    roles: ['admin'],
    permissions: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('proxies patch updates to identity and persists posConfig locally', async () => {
    proxy.update.mockResolvedValue({ id: 'user1', username: 'cashier01' });

    const result = await controller.update(
      'Bearer token-123',
      'user1',
      { posConfig: { loginTimeoutMinutes: 60 } },
      currentUser,
    );

    expect(proxy.update).toHaveBeenCalledWith('token-123', 'user1', {
      loginTimeoutMinutes: 60,
    });
    expect(posConfigService.update).toHaveBeenCalledWith('user1', 'org1', {
      loginTimeoutMinutes: 60,
    });
    expect(result).toEqual({ id: 'user1', username: 'cashier01' });
  });

  it('sends null loginTimeoutMinutes when posConfig clears it', async () => {
    proxy.update.mockResolvedValue({ id: 'user1' });

    await controller.update(
      'Bearer token-123',
      'user1',
      { posConfig: { loginTimeoutMinutes: null } },
      currentUser,
    );

    expect(proxy.update).toHaveBeenCalledWith('token-123', 'user1', {
      loginTimeoutMinutes: null,
    });
    expect(posConfigService.update).toHaveBeenCalledWith('user1', 'org1', {
      loginTimeoutMinutes: null,
    });
  });

  it('does not touch identity payload when posConfig is absent', async () => {
    proxy.update.mockResolvedValue({ id: 'user1' });

    await controller.update(
      'Bearer token-123',
      'user1',
      { isActive: true },
      currentUser,
    );

    expect(proxy.update).toHaveBeenCalledWith('token-123', 'user1', {
      isActive: true,
    });
    expect(posConfigService.update).not.toHaveBeenCalled();
  });

  it('merges posConfig into user rows on list', async () => {
    proxy.list.mockResolvedValue({
      data: [{ id: 'u1', username: 'cashier01' }, { id: 'u2', username: 'cashier02' }],
      meta: { page: 1, limit: 20, total: 2 },
    });
    posConfigService.listByOrganization.mockResolvedValue([
      {
        id: 'cfg-1',
        userId: 'u1',
        organizationId: 'org1',
        stockLocationId: 'loc-1',
        stockLocation: { id: 'loc-1', name: 'Main Pharmacy' },
        storeId: 'default',
        allowPos: true,
        allowA4Print: false,
        loginTimeoutMinutes: 60,
        defaultCustomerId: null,
        defaultCustomer: null,
        defaultPriceListId: null,
        defaultPriceList: null,
        autoSelectLocation: true,
        autoSelectCustomer: false,
        autoSelectPriceList: false,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]);

    const result = await controller.list(
      'Bearer token-123',
      undefined as any,
      { page: '1', limit: '20' },
      currentUser,
    );

    expect(posConfigService.listByOrganization).toHaveBeenCalledWith('org1');
    expect((result as any).data[0].posConfig).toMatchObject({
      userId: 'u1',
      storeId: 'default',
      loginTimeoutMinutes: 60,
    });
    expect((result as any).data[1].posConfig).toBeUndefined();
  });

  it('merges posConfig into a single fetched user', async () => {
    proxy.findOne.mockResolvedValue({ id: 'u1', username: 'cashier01' });
    posConfigService.listByOrganization.mockResolvedValue([
      {
        id: 'cfg-1',
        userId: 'u1',
        organizationId: 'org1',
        stockLocationId: null,
        stockLocation: null,
        storeId: 'main',
        allowPos: false,
        allowA4Print: true,
        loginTimeoutMinutes: null,
        defaultCustomerId: null,
        defaultCustomer: null,
        defaultPriceListId: null,
        defaultPriceList: null,
        autoSelectLocation: false,
        autoSelectCustomer: false,
        autoSelectPriceList: false,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]);

    const result = await controller.get('Bearer token-123', 'u1', currentUser);

    expect((result as any).posConfig).toMatchObject({ userId: 'u1', storeId: 'main' });
  });

  it('skips posConfig enrichment when no organization is present', async () => {
    proxy.list.mockResolvedValue({ data: [{ id: 'u1' }], meta: {} });

    await controller.list(
      'Bearer token-123',
      undefined as any,
      {},
      { ...currentUser, organizationId: null } as unknown as RequestUser,
    );

    expect(posConfigService.listByOrganization).not.toHaveBeenCalled();
  });
});
