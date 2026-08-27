import { PricingService } from './pricing.service';

type AnyRepo = { createQueryBuilder: jest.Mock; findOne: jest.Mock };

function makeRepo(): AnyRepo {
  return { createQueryBuilder: jest.fn(), findOne: jest.fn() };
}

/**
 * Returns a query-builder that records where/andWhere string conditions and
 * resolves `getManyAndCount` to the given rows. listPriceListItems also calls
 * `getSql()` (debug log) so that has to exist on the mock.
 */
function mockListQueryBuilder(repo: AnyRepo, rows: unknown[], total = rows.length): string[] {
  const conditions: string[] = [];
  const qb: Record<string, jest.Mock> = {
    where: jest.fn((cond: unknown) => {
      if (typeof cond === 'string') conditions.push(cond);
      return qb;
    }),
    andWhere: jest.fn((cond: unknown) => {
      if (typeof cond === 'string') conditions.push(cond);
      return qb;
    }),
    leftJoinAndSelect: jest.fn(() => qb),
    orderBy: jest.fn(() => qb),
    addOrderBy: jest.fn(() => qb),
    skip: jest.fn(() => qb),
    take: jest.fn(() => qb),
    getSql: jest.fn(() => ''),
    getManyAndCount: jest.fn(async () => [rows as never, total]),
  };
  repo.createQueryBuilder.mockReturnValue(qb);
  return conditions;
}

const priceListRow = {
  id: 'pl-1',
  organizationId: 'org1',
  code: 'RETAIL',
  name: 'Retail Price List',
  isDefault: true,
  isActive: true,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-02'),
};

const priceListItemRow = {
  id: 'pli-1',
  priceList: priceListRow,
  item: {
    id: 'it-1',
    name: 'Paracetamol',
    baseUomId: null,
    purchaseUomId: null,
    saleUomId: null,
    trackLot: false,
    trackExpiry: false,
    shelfLifeDays: null,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    deletedAt: null,
    code: null,
  },
  currencyCode: 'NGN',
  unitPrice: 500,
  startsAt: null,
  endsAt: null,
  createdAt: new Date('2026-01-03'),
  updatedAt: new Date('2026-01-03'),
};

function createService() {
  const priceListRepository = makeRepo();
  const priceListItemRepository = makeRepo();
  const itemRepository = makeRepo();
  const organisationItemRepository = makeRepo();
  const stockLocationRepository = makeRepo();

  const service = new PricingService(
    priceListRepository as any,
    priceListItemRepository as any,
    itemRepository as any,
    organisationItemRepository as any,
    stockLocationRepository as any,
  );
  return {
    service,
    priceListRepository,
    priceListItemRepository,
    itemRepository,
    organisationItemRepository,
    stockLocationRepository,
  };
}

const listQuery = (overrides: any = {}) => ({
  page: 1,
  limit: 20,
  search: undefined,
  sortBy: 'updatedAt',
  sortOrder: 'desc',
  get offset() {
    return 0;
  },
  ...overrides,
});

describe('PricingService — organisation scoping', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listPriceLists', () => {
    it('filters by BOTH organisation and is_active (regression: org filter was overwritten)', async () => {
      const { service, priceListRepository } = createService();
      const conditions = mockListQueryBuilder(priceListRepository, [priceListRow]);

      const result = await service.listPriceLists(listQuery(), 'org1');

      const queryText = conditions.join(' ');
      expect(queryText).toContain('price_list.organization_id = :organizationId');
      expect(queryText).toContain('price_list.is_active = :is_active');
      expect(result.total).toBe(1);
      expect(result.data[0].id).toBe('pl-1');
    });

    it('applies the free-text search on top of the org/is_active filters', async () => {
      const { service, priceListRepository } = createService();
      const conditions = mockListQueryBuilder(priceListRepository, [priceListRow]);

      await service.listPriceLists(listQuery({ search: 'retail' }), 'org1');

      const queryText = conditions.join(' ');
      expect(queryText).toContain('price_list.code ILIKE');
      expect(queryText).toContain('price_list.organization_id = :organizationId');
    });

    it('returns no price lists for an empty (global super-admin) organisation', async () => {
      const { service, priceListRepository } = createService();
      const result = await service.listPriceLists(listQuery(), '');

      expect(result).toEqual({ data: [], total: 0 });
      expect(priceListRepository.createQueryBuilder).not.toHaveBeenCalled();
    });
  });

  describe('listPriceListItems', () => {
    it('scopes query to the organisation through the joined price list', async () => {
      const { service, priceListItemRepository } = createService();
      const conditions = mockListQueryBuilder(priceListItemRepository, [priceListItemRow]);

      const result = await service.listPriceListItems(null, listQuery({ itemId: 'it-1' }), 'org1');

      const queryText = conditions.join(' ');
      expect(queryText).toContain('priceList.organization_id = :organizationId');
      expect(queryText).toContain('itemRef.id = :itemId');
      expect(result.data[0].priceListId).toBe('pl-1');
    });

    it('still org-scopes and validates the price list when priceListId is given', async () => {
      const { service, priceListRepository, priceListItemRepository } = createService();
      priceListRepository.findOne.mockResolvedValue(priceListRow);
      mockListQueryBuilder(priceListItemRepository, [priceListItemRow]);

      const result = await service.listPriceListItems('pl-1', listQuery(), 'org1');

      expect(priceListRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'pl-1', organizationId: 'org1' },
      });
      const conditions: string[] = [];
      const qb = priceListItemRepository.createQueryBuilder.mock.results[0].value;
      for (const call of qb.andWhere.mock.calls) {
        if (typeof call[0] === 'string') conditions.push(call[0]);
      }
      expect(conditions.join(' ')).toContain('priceList.organization_id = :organizationId');
      expect(conditions.join(' ')).toContain('priceList.id = :priceListId');
      expect(result.total).toBe(1);
    });

    it('returns no price items for an empty (global super-admin) organisation', async () => {
      const { service, priceListItemRepository } = createService();
      const result = await service.listPriceListItems(null, listQuery(), '');

      expect(result).toEqual({ data: [], total: 0 });
      expect(priceListItemRepository.createQueryBuilder).not.toHaveBeenCalled();
    });
  });
});