import { TypeormItemRepository } from './typeorm-item.repository';

function conditionText(arg: any): string {
  if (typeof arg === 'string') return arg;
  const parts: string[] = [];
  if (arg?.whereFactory) {
    const fake: any = {
      where: (c: string) => {
        parts.push(c);
        return fake;
      },
      andWhere: (c: string) => {
        parts.push(c);
        return fake;
      },
      orWhere: (c: string) => {
        parts.push(c);
        return fake;
      },
    };
    arg.whereFactory(fake);
    return parts.join(' OR ');
  }
  return '';
}

function makeRepo() {
  const conditions: string[] = [];
  const qb: any = {
    leftJoinAndSelect: jest.fn(() => qb),
    leftJoin: jest.fn(() => qb),
    where: jest.fn((cond: any) => {
      if (typeof cond === 'string') conditions.push(cond);
      return qb;
    }),
    andWhere: jest.fn((cond: any) => {
      conditions.push(conditionText(cond));
      return qb;
    }),
    orderBy: jest.fn(() => qb),
    addOrderBy: jest.fn(() => qb),
    skip: jest.fn(() => qb),
    take: jest.fn(() => qb),
    getManyAndCount: jest.fn(async () => [[], 0]),
  };
  const repository = { createQueryBuilder: jest.fn(() => qb) };
  const organisationItemRepository = { find: jest.fn(async () => []) };
  const repo = new TypeormItemRepository(
    repository as any,
    {} as any,
    organisationItemRepository as any,
    {} as any,
  );
  return { repo, conditions, organisationItemRepository };
}

const listQuery = (overrides: Record<string, unknown> = {}) => ({
  organizationId: 'org1',
  offset: 0,
  limit: 20,
  search: 'paracetamol',
  showAll: false,
  sortBy: 'name',
  sortOrder: 'asc',
  ...overrides,
});

describe('TypeormItemRepository.list — search includes the org alias', () => {
  it('searches item name, org alias, org code and barcode for a scoped org', async () => {
    const { repo, conditions } = makeRepo();

    await repo.list(listQuery() as any);

    const searchSql = conditions.join(' OR ');
    expect(searchSql).toContain('product.name ILIKE :productName');
    expect(searchSql).toContain('orgItem.alias ILIKE :alias');
    expect(searchSql).toContain('orgItem.code ILIKE :code');
    expect(searchSql).toContain('orgItem.barcode ILIKE :barcode');
  });

  it('falls back to global name/code search for an empty (global) org', async () => {
    const { repo, conditions } = makeRepo();

    await repo.list(listQuery({ organizationId: '' }) as any);

    const searchSql = conditions.join(' OR ');
    expect(searchSql).toContain('product.code ILIKE :code');
    expect(searchSql).not.toContain('orgItem.alias ILIKE :alias');
  });
});