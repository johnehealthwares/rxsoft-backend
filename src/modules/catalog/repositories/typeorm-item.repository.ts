import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
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
import { CatalogMapper } from '../mappers/catalog.mapper';
import { UomOrmEntity } from '../../sales/entities';
import { applyFilters, applyFilter } from 'src/database/list';

const SEARCH_MAP: Record<string, string> = {
  name: 'product.name',
  code: 'product.code',
  barcode: 'product.barcode',

  categoryName: 'category.name',
  categoryCode: 'category.code',
};
@Injectable()
export class TypeormItemRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly repository: Repository<ItemOrmEntity>,
    @InjectRepository(ItemCategoryOrmEntity)
    private readonly categoryRepository: Repository<ItemCategoryOrmEntity>,
    @InjectRepository(UomOrmEntity)
    private readonly uomRepository: Repository<UomOrmEntity>,
  ) { }

  async list(query: ItemListQuery): Promise<{ items: Item[]; total: number }> {
    const qb = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.baseUom', 'baseUom')
      .leftJoinAndSelect('product.purchaseUom', 'purchaseUom')
      .leftJoinAndSelect('product.saleUom', 'saleUom')
      .where('product.organization_id = :organizationId', { organizationId: query.organizationId })

    // if (!query.showAll) qb.andWhere('product.isActive = :isActive', { isActive: true })

    if (query.search) {
      if (query.search.includes('{')) {
        const filters = JSON.parse(query.search);
        await applyFilters(qb, 'product', filters)
      } else {
        qb.andWhere('product.name ILIKE :productName', {productName: `%${query.search}%`} )
      }

    }
    qb
      .skip(query.offset)
      .take(query.limit)
      .orderBy(
        `product.${query.sortBy === 'createdAt' ? 'createdAt' : query.sortBy}`,
        query.sortOrder.toUpperCase() as 'ASC' | 'DESC',
      )
      .addOrderBy('product.isActive', 'DESC');

    if (query.categoryCode) {
      qb.andWhere('LOWER(category.code) = LOWER(:categoryCode)', {
        categoryCode: query.categoryCode,
      });
    }
    const [items, total] = await qb.getManyAndCount();

    return {
      items: items.map(CatalogMapper.toDomainItem.bind(CatalogMapper)),
      total,
    };
  }

  async findById(id: string, organizationId: string, includeAll: boolean): Promise<Item | null> {
    const query: any = {
      where: { id, organizationId },
      relations: {
        category: true,
        baseUom: true,
        purchaseUom: true,
        saleUom: true,
      },
    }
    // if (!includeAll) query.where['isActive'] = true
    const item = await this.repository.findOne(query);

    return item ? CatalogMapper.toDomainItem(item) : null;
  }

  async findByCode(code: string, organizationId: string): Promise<Item | null> {
    const item = await this.repository.findOne({
      where: { code, organizationId, isActive: true },
      relations: {
        category: true,
        baseUom: true,
        purchaseUom: true,
        saleUom: true,
      },
    });

    return item ? CatalogMapper.toDomainItem(item) : null;
  }


  async findByBarcode(barcode: string, organizationId: string): Promise<Item | null> {
    const item = await this.repository.findOne({
      where: { barcode, organizationId, isActive: true },
      relations: {
        category: true,
        baseUom: true,
        purchaseUom: true,
        saleUom: true,
      },
    });

    return item ? CatalogMapper.toDomainItem(item) : null;
  }


  async findCategoryById(id: string, organizationId: string): Promise<ReturnType<typeof CatalogMapper.toDomainItemCategory> | null> {
    const item = await this.categoryRepository.findOne({ where: { id, organizationId } });
    return item ? CatalogMapper.toDomainItemCategory(item) : null;
  }

  async findUomById(id: string, organizationId: string): Promise<UomLookup | null> {
    const item = await this.uomRepository.findOne({
      where: { id, organizationId },
      select: ['id', 'code', 'name', 'factor', 'uomType', 'isActive', 'rounding'],
    });
    return item ? { id: item.id, code: item.code, uomType: item.uomType, rounding: item.rounding, isActive: item.isActive, factor: item.factor, name: item.name } : null;
  }

  async listCategories(
    query: ItemDependencySearchQuery,
  ): Promise<{ items: Array<{ id: string; code: string; name: string }>; total: number }> {
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.organization_id = :organizationId', { organizationId: query.organizationId })
      .andWhere('category.deleted_at IS NULL')
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
      .where('uom.organization_id = :organizationId', { organizationId: query.organizationId })
      .andWhere('uom.is_active = :isActive', { isActive: true })
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

  async findLastCreated(organizationId: string): Promise<Item | null> {
    const entity = await this.repository.findOne({
      where: { organizationId, isActive: true },
      order: { createdAt: 'DESC' },
      relations: {
        category: true,
        baseUom: true,
        purchaseUom: true,
        saleUom: true,
      },
    });
    return entity ? CatalogMapper.toDomainItem(entity) : null;
  }

  async getMetrics(query: ItemMetricsQuery): Promise<ItemMetrics> {
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
        .leftJoin('product.category', 'category')
        .where('product.organization_id = :organizationId', { organizationId: query.organizationId });
      await applySearch(qb);
      if (where) qb.andWhere(where, params);
      return qb.getCount();
    };

    const total = await countWith();
    const active = await countWith('product.is_active = :isActive', { isActive: true });
    const inactive = await countWith('product.is_active = :isActive', { isActive: false });
    const noCategory = await countWith(
      '(category.code IS NULL OR LOWER(category.code) = LOWER(:noCatCode))',
      { noCatCode: 'NOT FOUND' },
    );
    const noGeneric = await countWith('product.generic_product_code IS NULL');

    return { total, active, inactive, noCategory, noGenericProductCode: noGeneric };
  }

  async save(product: Item): Promise<Item> {
    const category = await this.categoryRepository.findOneBy({
      id: product.category.id,
      organizationId: product.organizationId,
    });

    if (!category) {
      throw new Error('Invalid related references for item creation');
    }

    const entity = this.repository.create({
      id: product.id,
      organizationId: product.organizationId,
      code: product.code,
      name: product.name,
      genericProductCode: product.genericProductCode,
      baseUomId: product.baseUomId,
      purchaseUomId: product.purchaseUomId,
      saleUomId: product.saleUomId,
      barcode: product.barcode,
      trackLot: product.trackLot,
      trackExpiry: product.trackExpiry,
      shelfLifeDays: product.shelfLifeDays,
      isActive: product.isActive,
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


}
