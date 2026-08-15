import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganisationItemOrmEntity } from '../entities/organisation-item.orm-entity';
import { ItemOrmEntity } from '../entities/item.orm-entity';

@Injectable()
export class OrganisationItemsService {
  constructor(
    @InjectRepository(OrganisationItemOrmEntity)
    private readonly orgItemRepo: Repository<OrganisationItemOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepo: Repository<ItemOrmEntity>,
  ) {}

  async listForOrg(orgId: string) {
    const orgItems = await this.orgItemRepo.find({
      where: { organizationId: orgId, isActive: true },
      relations: ['item', 'item.category', 'item.baseUom'],
    });

    return orgItems.map((oi) => ({
      id: oi.id,
      itemId: oi.itemId,
      code: oi.item.code,
      name: oi.item.name,
      alias: oi.alias,
      displayName: oi.alias ?? oi.item.name,
      orgItemCode: oi.orgItemCode,
      barcode: oi.barcode ?? oi.item.barcode,
      isActive: oi.isActive,
      category: oi.item.category
        ? { id: oi.item.category.id, code: oi.item.category.code, name: oi.item.category.name }
        : null,
      baseUom: oi.item.baseUom
        ? { id: oi.item.baseUom.id, code: oi.item.baseUom.code, name: oi.item.baseUom.name }
        : null,
      imageUrl: oi.item.imageUrl,
      smallImageUrl: oi.item.smallImageUrl,
      mediumImageUrl: oi.item.mediumImageUrl,
      largeImageUrl: oi.item.largeImageUrl,
    }));
  }

  async activate(
    orgId: string,
    itemId: string,
    body?: { alias?: string | null; orgItemCode?: string | null; barcode?: string | null },
  ) {
    const item = await this.itemRepo.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found');

    const existing = await this.orgItemRepo.findOne({
      where: { organizationId: orgId, itemId },
    });

    if (existing) {
      existing.isActive = true;
      if (body?.alias !== undefined) existing.alias = body.alias ?? null;
      if (body?.orgItemCode !== undefined) existing.orgItemCode = body.orgItemCode ?? null;
      if (body?.barcode !== undefined) existing.barcode = body.barcode ?? null;
      return this.orgItemRepo.save(existing);
    }

    const entity = this.orgItemRepo.create({
      organizationId: orgId,
      itemId,
      isActive: true,
      alias: body?.alias ?? null,
      orgItemCode: body?.orgItemCode ?? null,
      barcode: body?.barcode ?? null,
    });
    return this.orgItemRepo.save(entity);
  }

  async deactivate(orgId: string, itemId: string) {
    const existing = await this.orgItemRepo.findOne({
      where: { organizationId: orgId, itemId },
    });
    if (!existing) throw new NotFoundException('Organisation item not found');

    existing.isActive = false;
    return this.orgItemRepo.save(existing);
  }
}
