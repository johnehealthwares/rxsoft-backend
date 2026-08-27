import { TypeormSalesRepository } from './typeorm-sales.repository';

function makeRepo() {
  const conditions: string[] = [];
  const qb: any = {
    andWhere: jest.fn((cond: unknown) => {
      if (typeof cond === 'string') conditions.push(cond);
      return qb;
    }),
    orderBy: jest.fn(() => qb),
    skip: jest.fn(() => qb),
    take: jest.fn(() => qb),
    getSql: jest.fn(() => ''),
    getParameters: jest.fn(() => ({})),
    getManyAndCount: jest.fn(async () => [[], 0]),
  };
  const saleRepository = {
    createQueryBuilder: jest.fn(() => qb),
    findOne: jest.fn(),
  };
  const repo = new TypeormSalesRepository(
    saleRepository as any,
    {} as any,
    {} as any,
    {} as any,
    {} as any,
    {} as any,
  );
  return { repo, saleRepository, qb, conditions };
}

describe('TypeormSalesRepository — empty (global super-admin) org', () => {
  it('applies the org predicate when an organisation is scoped', async () => {
    const { repo, conditions } = makeRepo();
    await repo.list({ organizationId: 'org1', offset: 0, limit: 10 });
    expect(conditions.join(' ')).toContain('sale.organization_id = :organizationId');
  });

  it('omits the org predicate for an empty org and still returns', async () => {
    const { repo, conditions } = makeRepo();
    const result = await repo.list({ organizationId: '', offset: 0, limit: 10 });
    expect(conditions.join(' ')).not.toContain('organization_id');
    expect(result).toEqual({ items: [], total: 0 });
  });

  it('findById does not scope by org when the org is empty', async () => {
    const { repo, saleRepository } = makeRepo();
    saleRepository.findOne.mockResolvedValue(null);
    await repo.findById('', 'sale1');
    const where = (saleRepository.findOne.mock.calls[0][0] as any).where;
    expect(where.id).toBe('sale1');
    expect(where.organizationId).toBeUndefined();
  });

  it('findById scopes by org when provided', async () => {
    const { repo, saleRepository } = makeRepo();
    saleRepository.findOne.mockResolvedValue(null);
    await repo.findById('org1', 'sale1');
    const where = (saleRepository.findOne.mock.calls[0][0] as any).where;
    expect(where.organizationId).toBe('org1');
  });
});