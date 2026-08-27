import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrganisationItemsService } from '../organisation-items.service';

describe('OrganisationItemsService', () => {
  const orgItemRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  const itemRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const service = new OrganisationItemsService(orgItemRepo as any, itemRepo as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listForOrg', () => {
    it('returns all visible items with org overlay', async () => {
      orgItemRepo.find.mockResolvedValue([
        {
          id: 'oi1',
          itemId: 'item1',
          alias: 'Para 500',
          code: 'ORG-PCM',
          barcode: 'org-barcode',
          isActive: true,
        },
      ]);
      itemRepo.find.mockResolvedValue([
        {
          id: 'item1',
          name: 'Paracetamol 500mg',
          category: { id: 'c1', code: 'ANALGESICS', name: 'Analgesics' },
          baseUom: { id: 'u1', code: 'TAB', name: 'Tablet' },
          saleUomId: 'u2',
          saleUom: { id: 'u2', code: 'BOX', name: 'Box' },
          imageUrl: 'img.jpg',
          smallImageUrl: null,
          mediumImageUrl: null,
          largeImageUrl: null,
        },
        {
          id: 'item2',
          name: 'Amoxicillin',
          category: null,
          baseUom: null,
          saleUomId: null,
          saleUom: null,
          imageUrl: null,
          smallImageUrl: null,
          mediumImageUrl: null,
          largeImageUrl: null,
        },
      ]);

      const result = await service.listForOrg('org1');

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 'oi1',
        itemId: 'item1',
        code: 'ORG-PCM',
        name: 'Paracetamol 500mg',
        alias: 'Para 500',
        displayName: 'Para 500',
        barcode: 'org-barcode',
        visibility: 'whitelisted',
        saleUomId: 'u2',
        saleUom: { id: 'u2', code: 'BOX', name: 'Box' },
      });
      expect(result[1]).toMatchObject({
        itemId: 'item2',
        displayName: 'Amoxicillin',
        visibility: 'default',
        saleUomId: null,
      });
    });

    it('filters out blacklisted items', async () => {
      orgItemRepo.find.mockResolvedValue([
        { id: 'oi1', itemId: 'item1', isActive: false },
      ]);
      itemRepo.find.mockResolvedValue([
        { id: 'item1', name: 'Hidden', category: null, baseUom: null, saleUom: null, imageUrl: null, smallImageUrl: null, mediumImageUrl: null, largeImageUrl: null },
      ]);

      const result = await service.listForOrg('org1');

      expect(result).toHaveLength(0);
    });
  });

  describe('listActiveForOrg', () => {
    it('returns only org-added (active whitelist) items, join-driven', async () => {
      orgItemRepo.find.mockResolvedValue([
        { id: 'oi1', itemId: 'item1', alias: null, code: 'ORG-PCM', barcode: null, isActive: true },
        { id: 'oi2', itemId: 'item2', alias: null, code: null, barcode: null, isActive: true },
      ]);
      itemRepo.find.mockResolvedValue([
        {
          id: 'item1',
          name: 'Paracetamol',
          category: { id: 'c1', code: 'ANALGESICS', name: 'Analgesics' },
          baseUom: { id: 'u1', code: 'TAB', name: 'Tablet' },
          saleUomId: 'u2',
          saleUom: { id: 'u2', code: 'BOX', name: 'Box' },
          imageUrl: null,
          smallImageUrl: null,
          mediumImageUrl: null,
          largeImageUrl: null,
        },
        {
          id: 'item2',
          name: 'Amoxicillin',
          category: null,
          baseUom: null,
          saleUomId: null,
          saleUom: null,
          imageUrl: null,
          smallImageUrl: null,
          mediumImageUrl: null,
          largeImageUrl: null,
        },
      ]);

      const result = await service.listActiveForOrg('org1');

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        itemId: 'item1',
        code: 'ORG-PCM',
        visibility: 'whitelisted',
        saleUomId: 'u2',
        saleUom: { id: 'u2', code: 'BOX', name: 'Box' },
      });
      expect(itemRepo.find).toHaveBeenCalledWith({
        relations: ['category', 'baseUom', 'saleUom'],
      });
    });
  });

  describe('bulkWhitelistAll', () => {
    it('adds every active global item as an org-added row, skipping existing ones', async () => {
      itemRepo.find.mockResolvedValue([{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }]);
      orgItemRepo.find.mockResolvedValue([{ itemId: 'item2' }]);
      orgItemRepo.create.mockImplementation((data: any) => data);
      orgItemRepo.save.mockImplementation(async (rows: any[]) => rows);

      const count = await service.bulkWhitelistAll('org1');

      expect(count).toBe(2);
      expect(orgItemRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ organizationId: 'org1', itemId: 'item1', isActive: true }),
      );
      expect(orgItemRepo.create).not.toHaveBeenCalledWith(
        expect.objectContaining({ itemId: 'item2' }),
      );
    });
  });

  describe('upsert', () => {
    it('creates a whitelist row when none exists', async () => {
      itemRepo.findOne.mockResolvedValue({ id: 'item1' });
      orgItemRepo.findOne.mockResolvedValue(null);
      orgItemRepo.create.mockReturnValue({ id: 'oi1', organizationId: 'org1', itemId: 'item1', isActive: true });
      orgItemRepo.save.mockImplementation(async (e) => e);

      const result = await service.upsert('org1', 'item1', { isActive: true, alias: 'Para', code: 'ORG-PCM', barcode: '123' });

      expect(itemRepo.findOne).toHaveBeenCalledWith({ where: { id: 'item1' } });
      expect(orgItemRepo.create).toHaveBeenCalledWith({
        organizationId: 'org1',
        itemId: 'item1',
        isActive: true,
        alias: 'Para',
        code: 'ORG-PCM',
        barcode: '123',
      });
      expect(orgItemRepo.save).toHaveBeenCalled();
    });

    it('creates a blacklist row when isActive is false', async () => {
      itemRepo.findOne.mockResolvedValue({ id: 'item1' });
      orgItemRepo.findOne.mockResolvedValue(null);
      orgItemRepo.create.mockReturnValue({ id: 'oi1', isActive: false });
      orgItemRepo.save.mockImplementation(async (e) => e);

      await service.upsert('org1', 'item1', { isActive: false });

      expect(orgItemRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ isActive: false, itemId: 'item1' }),
      );
      expect(orgItemRepo.save).toHaveBeenCalled();
    });

    it('rejects a duplicate org code', async () => {
      itemRepo.findOne.mockResolvedValue({ id: 'item1' });
      orgItemRepo.findOne.mockResolvedValue({ id: 'oi2', itemId: 'item2' });

      await expect(
        service.upsert('org1', 'item1', { isActive: true, code: 'DUP' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('updates an existing row without flipping isActive when not supplied', async () => {
      const existing = {
        id: 'oi1',
        organizationId: 'org1',
        itemId: 'item1',
        isActive: false,
        alias: null,
        code: null,
        barcode: null,
      };
      itemRepo.findOne.mockResolvedValue({ id: 'item1' });
      orgItemRepo.findOne.mockResolvedValue(existing);
      orgItemRepo.save.mockImplementation(async (e) => e);

      await service.upsert('org1', 'item1', { code: 'ORG-PCM', barcode: '123' });

      expect(orgItemRepo.save).toHaveBeenCalledWith({
        ...existing,
        code: 'ORG-PCM',
        barcode: '123',
      });
      expect(orgItemRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ isActive: false }),
      );
    });

    it('throws when item not found', async () => {
      itemRepo.findOne.mockResolvedValue(null);

      await expect(service.upsert('org1', 'missing', { isActive: true })).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('clear', () => {
    it('removes the override row', async () => {
      const existing = { id: 'oi1' };
      orgItemRepo.findOne.mockResolvedValue(existing);
      orgItemRepo.remove.mockResolvedValue(existing);

      await service.clear('org1', 'item1');

      expect(orgItemRepo.remove).toHaveBeenCalledWith(existing);
    });

    it('throws when org item not found', async () => {
      orgItemRepo.findOne.mockResolvedValue(null);

      await expect(service.clear('org1', 'missing')).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
