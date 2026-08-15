import { NotFoundException } from '@nestjs/common';
import { OrganisationItemsService } from '../organisation-items.service';

describe('OrganisationItemsService', () => {
  const orgItemRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const itemRepo = {
    findOne: jest.fn(),
  };

  const service = new OrganisationItemsService(orgItemRepo as any, itemRepo as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listForOrg', () => {
    it('returns mapped org items for an organisation', async () => {
      orgItemRepo.find.mockResolvedValue([
        {
          id: 'oi1',
          itemId: 'item1',
          alias: 'Para 500',
          orgItemCode: 'ORG-PCM',
          barcode: 'org-barcode',
          isActive: true,
          item: {
            code: 'PCM001',
            name: 'Paracetamol 500mg',
            barcode: 'global-barcode',
            imageUrl: 'img.jpg',
            smallImageUrl: null,
            mediumImageUrl: null,
            largeImageUrl: null,
            category: { id: 'c1', code: 'ANALGESICS', name: 'Analgesics' },
            baseUom: { id: 'u1', code: 'TAB', name: 'Tablet' },
          },
        },
      ]);

      const result = await service.listForOrg('org1');

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'oi1',
        itemId: 'item1',
        code: 'PCM001',
        name: 'Paracetamol 500mg',
        alias: 'Para 500',
        displayName: 'Para 500',
        barcode: 'org-barcode',
      });
      expect(orgItemRepo.find).toHaveBeenCalledWith({
        where: { organizationId: 'org1', isActive: true },
        relations: ['item', 'item.category', 'item.baseUom'],
      });
    });

    it('falls back to item name when alias is null', async () => {
      orgItemRepo.find.mockResolvedValue([
        {
          id: 'oi2',
          itemId: 'item2',
          alias: null,
          orgItemCode: null,
          barcode: null,
          isActive: true,
          item: {
            code: 'AMX001',
            name: 'Amoxicillin',
            barcode: null,
            imageUrl: null,
            smallImageUrl: null,
            mediumImageUrl: null,
            largeImageUrl: null,
            category: null,
            baseUom: null,
          },
        },
      ]);

      const result = await service.listForOrg('org1');

      expect(result[0].displayName).toBe('Amoxicillin');
      expect(result[0].barcode).toBeNull();
    });

    it('falls back to item barcode when org barcode is null', async () => {
      orgItemRepo.find.mockResolvedValue([
        {
          id: 'oi3',
          itemId: 'item3',
          alias: null,
          orgItemCode: null,
          barcode: null,
          isActive: true,
          item: {
            code: 'VITC',
            name: 'Vitamin C',
            barcode: '8901234567890',
            imageUrl: null,
            smallImageUrl: null,
            mediumImageUrl: null,
            largeImageUrl: null,
            category: null,
            baseUom: null,
          },
        },
      ]);

      const result = await service.listForOrg('org1');

      expect(result[0].barcode).toBe('8901234567890');
    });
  });

  describe('activate', () => {
    it('creates new org item when none exists', async () => {
      itemRepo.findOne.mockResolvedValue({ id: 'item1' });
      orgItemRepo.findOne.mockResolvedValue(null);
      orgItemRepo.create.mockReturnValue({ id: 'oi1', organizationId: 'org1', itemId: 'item1', isActive: true });
      orgItemRepo.save.mockImplementation(async (e) => e);

      const result = await service.activate('org1', 'item1', { alias: 'Para', orgItemCode: 'ORG-PCM', barcode: '123' });

      expect(itemRepo.findOne).toHaveBeenCalledWith({ where: { id: 'item1' } });
      expect(orgItemRepo.create).toHaveBeenCalledWith({
        organizationId: 'org1',
        itemId: 'item1',
        isActive: true,
        alias: 'Para',
        orgItemCode: 'ORG-PCM',
        barcode: '123',
      });
      expect(orgItemRepo.save).toHaveBeenCalled();
    });

    it('reactivates existing inactive org item', async () => {
      itemRepo.findOne.mockResolvedValue({ id: 'item1' });
      const existing = { id: 'oi1', organizationId: 'org1', itemId: 'item1', isActive: false, alias: null, orgItemCode: null, barcode: null };
      orgItemRepo.findOne.mockResolvedValue(existing);
      orgItemRepo.save.mockImplementation(async (e) => e);

      const result = await service.activate('org1', 'item1');

      expect(existing.isActive).toBe(true);
      expect(orgItemRepo.save).toHaveBeenCalledWith(existing);
    });

    it('updates fields when reactivating existing item', async () => {
      itemRepo.findOne.mockResolvedValue({ id: 'item1' });
      const existing = { id: 'oi1', organizationId: 'org1', itemId: 'item1', isActive: false, alias: 'Old', orgItemCode: null, barcode: null };
      orgItemRepo.findOne.mockResolvedValue(existing);
      orgItemRepo.save.mockImplementation(async (e) => e);

      await service.activate('org1', 'item1', { alias: 'New Alias', orgItemCode: 'NEW-CODE' });

      expect(existing.alias).toBe('New Alias');
      expect(existing.orgItemCode).toBe('NEW-CODE');
    });

    it('throws when item not found', async () => {
      itemRepo.findOne.mockResolvedValue(null);

      await expect(service.activate('org1', 'missing')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('deactivate', () => {
    it('sets isActive to false', async () => {
      const existing = { id: 'oi1', isActive: true };
      orgItemRepo.findOne.mockResolvedValue(existing);
      orgItemRepo.save.mockImplementation(async (e) => e);

      const result = await service.deactivate('org1', 'item1');

      expect(existing.isActive).toBe(false);
      expect(orgItemRepo.save).toHaveBeenCalledWith(existing);
    });

    it('throws when org item not found', async () => {
      orgItemRepo.findOne.mockResolvedValue(null);

      await expect(service.deactivate('org1', 'missing')).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
