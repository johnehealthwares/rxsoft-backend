import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StockLocationsService } from './stock-locations.service';
import type { StockLocationOrmEntity } from '../entities/stock-location.orm-entity';
import type { WarehouseOrmEntity } from '../entities/warehouse.orm-entity';

describe('StockLocationsService', () => {
  let service: StockLocationsService;
  let stockLocationRepo: any;
  let warehouseRepo: any;

  beforeEach(() => {
    stockLocationRepo = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      findOneOrFail: jest.fn(),
      create: jest.fn((dto) => ({ id: 'loc-1', createdAt: new Date(), updatedAt: new Date(), ...dto })),
      save: jest.fn(async (entity) => ({ id: 'loc-1', createdAt: new Date(), updatedAt: new Date(), ...entity })),
    };
    warehouseRepo = {
      findOne: jest.fn(),
    };
    service = new StockLocationsService(stockLocationRepo, warehouseRepo);
  });

  it('creates a stock location with identity location link', async () => {
    stockLocationRepo.findOne.mockResolvedValue(null); // code check and duplicate check
    stockLocationRepo.findOneOrFail.mockResolvedValue({
      id: 'loc-1',
      organizationId: 'org-1',
      locationId: 'identity-site-1',
      code: 'MAIN_STOCK',
      name: 'Main Stock',
      locationType: 'internal',
      isActive: true,
      warehouse: null,
      parent: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create(
      { name: 'Main Stock', code: 'MAIN_STOCK', locationId: 'identity-site-1' },
      'org-1',
      'fallback-site-id',
    );

    expect(stockLocationRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        organizationId: 'org-1',
        locationId: 'identity-site-1',
        name: 'Main Stock',
      }),
    );
    expect(result.locationId).toBe('identity-site-1');
  });

  it('defaults locationId from caller context when omitted in payload', async () => {
    stockLocationRepo.findOne.mockResolvedValue(null);
    stockLocationRepo.findOneOrFail.mockResolvedValue({
      id: 'loc-1',
      organizationId: 'org-1',
      locationId: 'caller-site-id',
      code: 'MAIN_STOCK',
      name: 'Main Stock',
      locationType: 'internal',
      isActive: true,
      warehouse: null,
      parent: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await service.create(
      { name: 'Main Stock' },
      'org-1',
      'caller-site-id',
    );

    expect(stockLocationRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        organizationId: 'org-1',
        locationId: 'caller-site-id',
      }),
    );
  });

  it('updates stock location identity locationId', async () => {
    const existing: StockLocationOrmEntity = {
      id: 'loc-1',
      organizationId: 'org-1',
      locationId: 'old-site',
      warehouseId: null,
      warehouse: null,
      parentId: null,
      parent: null,
      children: [],
      code: 'MAIN_STOCK',
      name: 'Main Stock',
      locationType: 'internal',
      isActive: true,
      stockBalances: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    stockLocationRepo.findOne.mockResolvedValue(existing);
    stockLocationRepo.findOneOrFail.mockResolvedValue({
      ...existing,
      locationId: 'new-site',
    });

    const result = await service.update(
      'loc-1',
      { locationId: 'new-site' },
      'org-1',
    );

    expect(stockLocationRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        locationId: 'new-site',
      }),
    );
    expect(result.locationId).toBe('new-site');
  });
});
