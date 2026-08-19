import { BadRequestException, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganisationItemOrmEntity } from '../entities/organisation-item.orm-entity';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { AppCacheService } from '../../../common/cache/cache.service';

export type OrgItemOverrides = {
  isActive?: boolean;
  alias?: string | null;
  code?: string | null;
  barcode?: string | null;
};

@Injectable()
export class OrganisationItemsService {
  constructor(
    @InjectRepository(OrganisationItemOrmEntity)
    private readonly orgItemRepo: Repository<OrganisationItemOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepo: Repository<ItemOrmEntity>,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async listForOrg(orgId: string) {
    const [orgItems, items] = await Promise.all([
      this.orgItemRepo.find({ where: { organizationId: orgId } }),
      this.itemRepo.find({
        where: { isActive: true },
        relations: ['category', 'baseUom'],
      }),
    ]);

    const overlayByItemId = new Map(orgItems.map((oi) => [oi.itemId, oi]));

    return items
      .filter((item) => overlayByItemId.get(item.id)?.isActive !== false)
      .map((item) => {
        const oi = overlayByItemId.get(item.id);
        const visibility = oi ? (oi.isActive ? 'whitelisted' : 'blacklisted') : 'default';
        return {
          id: oi?.id ?? null,
          itemId: item.id,
          name: item.name,
          alias: oi?.alias ?? null,
          displayName: oi?.alias ?? item.name,
          code: oi?.code ?? null,
          barcode: oi?.barcode ?? null,
          isActive: oi?.isActive ?? null,
          visibility,
          category: item.category
            ? { id: item.category.id, code: item.category.code, name: item.category.name }
            : null,
          baseUom: item.baseUom
            ? { id: item.baseUom.id, code: item.baseUom.code, name: item.baseUom.name }
            : null,
          imageUrl: item.imageUrl,
          smallImageUrl: item.smallImageUrl,
          mediumImageUrl: item.mediumImageUrl,
          largeImageUrl: item.largeImageUrl,
        };
      });
  }

  // Strict tenant scope for POS: only items the org has explicitly added with
  // an active organisation_items row are selectable, regardless of default
  // visibility. Global items with no org row are hidden.
  async listActiveForOrg(orgId: string) {
    const [orgItems, items] = await Promise.all([
      this.orgItemRepo.find({ where: { organizationId: orgId, isActive: true } }),
      this.itemRepo.find({
        where: { isActive: true },
        relations: ['category', 'baseUom'],
      }),
    ]);

    const overlayByItemId = new Map(orgItems.map((oi) => [oi.itemId, oi]));
    const whitelisted = new Set(overlayByItemId.keys());

    return items
      .filter((item) => whitelisted.has(item.id))
      .map((item) => {
        const oi = overlayByItemId.get(item.id)!;
        return {
          id: oi.id,
          itemId: item.id,
          name: item.name,
          alias: oi.alias,
          displayName: oi.alias ?? item.name,
          code: oi.code,
          barcode: oi.barcode,
          isActive: true,
          visibility: 'whitelisted',
          category: item.category
            ? { id: item.category.id, code: item.category.code, name: item.category.name }
            : null,
          baseUom: item.baseUom
            ? { id: item.baseUom.id, code: item.baseUom.code, name: item.baseUom.name }
            : null,
          imageUrl: item.imageUrl,
          smallImageUrl: item.smallImageUrl,
          mediumImageUrl: item.mediumImageUrl,
          largeImageUrl: item.largeImageUrl,
        };
      });
  }

  // Backfills a newly-created organisation with every active global item as an
  // org-added (whitelisted) row, idempotently. Existing rows are left untouched.
  async bulkWhitelistAll(orgId: string) {
    const [items, existing] = await Promise.all([
      this.itemRepo.find({ where: { isActive: true }, select: ['id'] }),
      this.orgItemRepo.find({ where: { organizationId: orgId }, select: ['itemId'] }),
    ]);
    const existingItemIds = new Set(existing.map((o) => o.itemId));
    const toCreate = items
      .filter((item) => !existingItemIds.has(item.id))
      .map((item) =>
        this.orgItemRepo.create({
          organizationId: orgId,
          itemId: item.id,
          isActive: true,
          alias: null,
          code: null,
          barcode: null,
        }),
      );
    if (!toCreate.length) return 0;
    const saved = await this.orgItemRepo.save(toCreate);
    await this.invalidateOrgCache(orgId);
    return saved.length;
  }

  async upsert(orgId: string, itemId: string, body?: OrgItemOverrides) {
    const item = await this.itemRepo.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found');

    const code = body?.code ?? undefined;
    const barcode = body?.barcode ?? undefined;

    if (code !== undefined && code !== null) {
      const existing = await this.orgItemRepo.findOne({
        where: { organizationId: orgId, code },
      });
      if (existing && existing.itemId !== itemId) {
        throw new BadRequestException('Org item code already exists for this organisation');
      }
    }

    if (barcode !== undefined && barcode !== null) {
      const existing = await this.orgItemRepo.findOne({
        where: { organizationId: orgId, barcode },
      });
      if (existing && existing.itemId !== itemId) {
        throw new BadRequestException('Org item barcode already exists for this organisation');
      }
    }

    const isActive = body?.isActive !== false;

    const existing = await this.orgItemRepo.findOne({
      where: { organizationId: orgId, itemId },
    });

    if (existing) {
      existing.isActive = isActive;
      if (body?.alias !== undefined) existing.alias = body.alias ?? null;
      if (code !== undefined) existing.code = code ?? null;
      if (barcode !== undefined) existing.barcode = barcode ?? null;
      const saved = await this.orgItemRepo.save(existing);
      await this.invalidateOrgCache(orgId);
      return saved;
    }

    const entity = this.orgItemRepo.create({
      organizationId: orgId,
      itemId,
      isActive,
      alias: body?.alias ?? null,
      code: code ?? null,
      barcode: barcode ?? null,
    });
    const saved = await this.orgItemRepo.save(entity);
    await this.invalidateOrgCache(orgId);
    return saved;
  }

  async clear(orgId: string, itemId: string) {
    const existing = await this.orgItemRepo.findOne({
      where: { organizationId: orgId, itemId },
    });
    if (!existing) throw new NotFoundException('Organisation item not found');

    await this.orgItemRepo.remove(existing);
    await this.invalidateOrgCache(orgId);
  }

  private async invalidateOrgCache(orgId: string) {
    await this.cacheService?.invalidateByPrefix(`catalog:list:${orgId}:`);
    await this.cacheService?.invalidateByPrefix(`catalog:get:${orgId}:`);
    await this.cacheService?.invalidateByPrefix(`sales:list:${orgId}:`);
  }
}
