import { BadRequestException } from '@nestjs/common';
import { UomsService } from './uoms.service';

function makeService(repo: any) {
  return new UomsService(repo);
}

describe('UomsService reference-unit rules', () => {
  const repo = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn((d: any) => d),
    save: jest.fn(async (e: any) => ({
      ...e,
      id: 'u1',
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a reference UOM with factor 1', async () => {
    repo.findOne.mockResolvedValue(null); // no existing reference
    const service = makeService(repo);

    const result = await service.create(
      { categoryId: 'cat1', name: 'Tablet', uomType: 'reference', factor: 1 },
      'org1',
    );

    expect(result.id).toBe('u1');
    expect(repo.save).toHaveBeenCalled();
  });

  it('rejects a reference UOM whose factor is not 1', async () => {
    repo.findOne.mockResolvedValue(null);
    const service = makeService(repo);

    await expect(
      service.create({ categoryId: 'cat1', name: 'Pack', uomType: 'reference', factor: 5 }, 'org1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('requires an existing reference before creating a bigger/smaller unit', async () => {
    repo.findOne.mockResolvedValue(null); // no reference present
    const service = makeService(repo);

    await expect(
      service.create({ categoryId: 'cat1', name: 'Box', uomType: 'bigger', factor: 10 }, 'org1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('allows a bigger unit when a reference exists', async () => {
    repo.findOne.mockResolvedValue({ id: 'ref1', uomType: 'reference', factor: 1 });
    const service = makeService(repo);

    const result = await service.create(
      { categoryId: 'cat1', name: 'Box', uomType: 'bigger', factor: 10 },
      'org1',
    );

    expect(result.id).toBe('u1');
  });

  it('rejects turning a reference away from factor 1', async () => {
    repo.findOne.mockResolvedValue({ id: 'u1', uomType: 'reference', factor: 1 });
    const service = makeService(repo);

    await expect(
      service.update('u1', { factor: 3, uomType: 'reference' }, 'org1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('looks up the last code for sequential validation without a where clause', async () => {
    repo.find.mockResolvedValue([{ code: 'UM00001' }]);
    repo.findOne.mockResolvedValue({ id: 'ref1', uomType: 'reference', factor: 1 });
    const service = makeService(repo);

    const result = await service.create(
      { categoryId: 'cat1', name: 'Box', code: 'UM00002', uomType: 'bigger' },
      'org1',
    );

    expect(repo.find).toHaveBeenCalledWith(
      expect.objectContaining({ select: ['code'], take: 1 }),
    );
    expect(result.id).toBe('u1');
  });
});