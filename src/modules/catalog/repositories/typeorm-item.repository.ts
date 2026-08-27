import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { Item } from '../domains/item.entity';
import {
  ItemDependencySearchQuery,
  ItemListQuery,
  ItemMetrics,
  ItemMetricsQuery,
  ItemRepository,
  UomLookup,
} from './item.repository';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../entities/item-category.orm-entity';
import { OrganisationItemOrmEntity } from '../entities/organisation-item.orm-entity';
import { CatalogMapper } from '../mappers/catalog.mapper';
import { UomOrmEntity } from '../../sales/entities';
import { applyFilters } from 'src/database/list';

const ALLOWED_SORT_COLUMNS = ['name', 'code', 'createdAt'];

@Injectable()
export class TypeormItemRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly repository: Repository<ItemOrmEntity>,
    @InjectRepository(ItemCategoryOrmEntity)
    private readonly categoryRepository: Repository<ItemCategoryOrmEntity>,
    @InjectRepository(OrganisationItemOrmEntity)
    private readonly organisationItemRepository: Repository<OrganisationItemOrmEntity>,
    @InjectRepository(UomOrmEntity)
    private readonly uomRepository: Repository<UomOrmEntity>,
  ) { }

  async list(query: ItemListQuery): Promise<{ items: Item[]; total: number }> {
    const qb = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.baseUom', 'baseUom')
      .leftJoinAndSelect('product.purchaseUom', 'purchaseUom')
      .leftJoinAndSelect('product.saleUom', 'saleUom');

    const hasOrgScope = Boolean(query.organizationId);

    if (hasOrgScope) {
      qb.leftJoin(
        OrganisationItemOrmEntity,
        'orgItem',
        'orgItem.item_id = product.id AND orgItem.organization_id = :organizationId',
        { organizationId: query.organizationId },
      );

      // Default visibility: any product that is not explicitly blacklisted for the
      // org. When showAll is requested every item is returned (LEFT JOIN keeps the
      // org overlay on each row) so blacklisted items stay manageable.
      if (!query.showAll) {
        qb.where('(orgItem.id IS NULL OR orgItem.is_active = :active)', { active: true });
      }
    }

    if (query.search) {
      if (query.search.includes('{')) {
        const filters = JSON.parse(query.search);
        await applyFilters(qb, 'product', filters);
      } else if (hasOrgScope) {
        qb.andWhere(
          new Brackets((b) =>
            b
              .where('product.name ILIKE :productName', { productName: `%${query.search}%` })
              .orWhere('orgItem.alias ILIKE :alias', { alias: `%${query.search}%` })
              .orWhere('orgItem.code ILIKE :code', { code: `%${query.search}%` })
              .orWhere('orgItem.barcode ILIKE :barcode', { barcode: `%${query.search}%` }),
          ),
        );
      } else {
        qb.andWhere(
          new Brackets((b) =>
            b
              .where('product.name ILIKE :productName', { productName: `%${query.search}%` })
              .orWhere('product.code ILIKE :code', { code: `%${query.search}%` }),
          ),
        );
      }
    }

    if (query.categoryCode) {
      qb.andWhere('LOWER(category.code) = LOWER(:categoryCode)', {
        categoryCode: query.categoryCode,
      });
    }

    const sortBy = ALLOWED_SORT_COLUMNS.includes(query.sortBy) ? query.sortBy : 'name';
    if (sortBy === 'code') {
      qb.orderBy(hasOrgScope ? 'orgItem.code' : 'product.code', query.sortOrder.toUpperCase() as 'ASC' | 'DESC')
        .addOrderBy('product.name', 'ASC');
    } else {
      qb.orderBy(
        `product.${sortBy === 'createdAt' ? 'createdAt' : 'name'}`,
        query.sortOrder.toUpperCase() as 'ASC' | 'DESC',
      );
    }
    qb.addOrderBy('product.name', 'ASC');

    qb.skip(query.offset).take(query.limit);

    const [items, total] = await qb.getManyAndCount();
    const overlays = hasOrgScope ? await this.loadOverlays(query.organizationId, items.map((i) => i.id)) : new Map();

    return {
      items: items.map((entity) => CatalogMapper.toDomainItem(entity, overlays.get(entity.id))),
      total,
    };
  }

  async findById(id: string, organizationId: string, _includeAll?: boolean): Promise<Item | null> {
    const item = await this.repository.findOne({
      where: { id },
      relations: {
        category: true,
        baseUom: true,
        purchaseUom: true,
        saleUom: true,
      },
    });
    if (!item) return null;

    const overlay = organizationId
      ? await this.organisationItemRepository.findOne({
          where: { organizationId, itemId: id },
        })
      : null;

    return CatalogMapper.toDomainItem(item, overlay);
  }

  async findCategoryById(id: string): Promise<ReturnType<typeof CatalogMapper.toDomainItemCategory> | null> {
    const item = await this.categoryRepository.findOne({ where: { id } });
    return item ? CatalogMapper.toDomainItemCategory(item) : null;
  }

  async findUomById(id: string): Promise<UomLookup | null> {
    const item = await this.uomRepository.findOne({
      where: { id },
      select: ['id', 'code', 'name', 'factor', 'uomType', 'isActive', 'rounding'],
    });
    return item ? { id: item.id, code: item.code, uomType: item.uomType, rounding: item.rounding, isActive: item.isActive, factor: item.factor, name: item.name } : null;
  }

  async listCategories(
    query: ItemDependencySearchQuery,
  ): Promise<{ items: Array<{ id: string; code: string; name: string }>; total: number }> {
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.deleted_at IS NULL')
      .orderBy('category.name', 'ASC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(category.name ILIKE :search OR category.code ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const [items, total] = await qb.getManyAndCount();
    return {
      items: items.map((item) => ({ id: item.id, code: item.code, name: item.name })),
      total,
    };
  }

  async listUoms(query: ItemDependencySearchQuery): Promise<{ items: UomLookup[]; total: number }> {
    const qb = this.uomRepository
      .createQueryBuilder('uom')
      .where('uom.is_active = :isActive', { isActive: true })
      .orderBy('uom.name', 'ASC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(uom.name ILIKE :search OR uom.code ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const [items, total] = await qb.getManyAndCount();
    return {
      items: items.map((item) => ({ id: item.id, code: item.code, name: item.name, uomType: item.uomType, factor: item.factor, rounding: item.rounding, isActive: item.isActive })),
      total,
    };
  }

  async getMetrics(query: ItemMetricsQuery): Promise<ItemMetrics> {
    const hasOrg = Boolean(query.organizationId);
    const applySearch = async (qb: import('typeorm').SelectQueryBuilder<any>) => {
      if (query.search) {
        if (query.search.includes('{')) {
          await applyFilters(qb, 'product', JSON.parse(query.search));
        } else {
          qb.andWhere('(product.name ILIKE :search OR product.code ILIKE :search)', {
            search: `%${query.search}%`,
          });
        }
      }
      if (query.categoryCode) {
        qb.andWhere('LOWER(category.code) = LOWER(:categoryCode)', {
          categoryCode: query.categoryCode,
        });
      }
    };

    const countWith = async (where?: string, params?: Record<string, unknown>) => {
      const qb = this.repository
        .createQueryBuilder('product')
        .leftJoin('product.category', 'category');
      // Active/available state is per-org via organisation_items. Overlay join
      // is org-scoped; skipped for a global (empty-org) super-admin view.
      if (hasOrg) {
        qb.leftJoin(
          OrganisationItemOrmEntity,
          'orgItem',
          'orgItem.item_id = product.id AND orgItem.organization_id = :orgId',
          { orgId: query.organizationId },
        );
      }
      await applySearch(qb);
      if (where) qb.andWhere(where, params);
      return qb.getCount();
    };

    const total = await countWith();
    // Not blacklisted for the org = active; explicitly blacklisted = inactive.
    const active = hasOrg
      ? await countWith('(orgItem.id IS NULL OR orgItem.is_active = :active)', {
          active: true,
        })
      : total;
    const inactive = hasOrg
      ? await countWith('orgItem.is_active = :inactive', { inactive: false })
      : 0;
    const noCategory = await countWith(
      '(category.code IS NULL OR LOWER(category.code) = LOWER(:noCatCode))',
      { noCatCode: 'NOT FOUND' },
    );
    const noGeneric = await countWith('product.generic_product_code IS NULL');

    return { total, active, inactive, noCategory, noGenericProductCode: noGeneric };
  }

  async save(product: Item): Promise<Item> {
    const category = await this.categoryRepository.findOneBy({ id: product.category.id });

    if (!category) {
      throw new Error('Invalid related references for item creation');
    }

    const entity = this.repository.create({
      id: product.id,
      name: product.name,
      genericProductCode: product.genericProductCode,
      baseUomId: product.baseUomId,
      purchaseUomId: product.purchaseUomId,
      saleUomId: product.saleUomId,
      trackLot: product.trackLot,
      trackExpiry: product.trackExpiry,
      shelfLifeDays: product.shelfLifeDays,
      category,
      baseUom: { id: product.baseUomId } as UomOrmEntity,
      purchaseUom: product.purchaseUomId ? ({ id: product.purchaseUomId } as UomOrmEntity) : null,
      saleUom: product.saleUomId ? ({ id: product.saleUomId } as UomOrmEntity) : null,
      imageUrl: product.imageUrl,
      smallImageUrl: product.smallImageUrl,
      mediumImageUrl: product.mediumImageUrl,
      largeImageUrl: product.largeImageUrl,
    });

    const saved = await this.repository.save(entity);
    return CatalogMapper.toDomainItem(saved);
  }

  private async loadOverlays(
    organizationId: string,
    itemIds: string[],
  ): Promise<Map<string, OrganisationItemOrmEntity>> {
    if (!organizationId || !itemIds.length) return new Map();
    const overlays = await this.organisationItemRepository.find({
      where: { organizationId, itemId: In(itemIds) },
    });
    return new Map(overlays.map((o) => [o.itemId, o]));
  }
}
