import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Item } from '../domains/item.entity';
import {
  ItemDependencySearchQuery,
  ItemListQuery,
  ItemRepository,
  UomLookup,
} from './item.repository';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../entities/item-category.orm-entity';
import { GenericProductOrmEntity } from '../entities/generic-product.orm-entity';
import { CatalogMapper } from '../mappers/catalog.mapper';
import { UomOrmEntity } from '../../sales/entities';
import { applyFilters } from 'src/database/list';

const SEARCH_MAP: Record<string, string> = {
  name: 'product.name',
  code: 'product.code',
  barcode: 'product.barcode',

  categoryName: 'category.name',
  categoryCode: 'category.code',

  genericName: 'genericProduct.name',
  therapeuticClass: 'genericProduct.therapeutic_class',

  pharmaceuticsName: 'pharmaceutics.common_generic_name',
};
@Injectable()
export class TypeormItemRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly repository: Repository<ItemOrmEntity>,
    @InjectRepository(ItemCategoryOrmEntity)
    private readonly categoryRepository: Repository<ItemCategoryOrmEntity>,
    @InjectRepository(GenericProductOrmEntity)
    private readonly genericProductRepository: Repository<GenericProductOrmEntity>,
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
      .leftJoinAndSelect('product.genericProduct', 'genericProduct')
      .leftJoinAndSelect('genericProduct.pharmaceutics', 'pharmaceutics')
      .where('product.organization_id = :organizationId', { organizationId: query.organizationId })

    if (query.search) {
      const filters = JSON.parse(query.search);
     await applyFilters(qb, 'product', filters)
    }
    qb
      .skip(query.offset)
      .take(query.limit)
      .orderBy(
        `product.${query.sortBy === 'createdAt' ? 'createdAt' : query.sortBy}`,
        query.sortOrder.toUpperCase() as 'ASC' | 'DESC',
      );
   
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

  async findById(id: string, organizationId: string): Promise<Item | null> {
    const item = await this.repository.findOne({
      where: { id, organizationId },
      relations: {
        category: true,
        genericProduct: {
          pharmaceutics: true,
        },
        baseUom: true,
        purchaseUom: true,
        saleUom: true,
      },
    });

    return item ? CatalogMapper.toDomainItem(item) : null;
  }

  async findByCode(code: string, organizationId: string): Promise<Item | null> {
    const item = await this.repository.findOne({
      where: { code, organizationId },
      relations: {
        category: true,
        genericProduct: {
          pharmaceutics: true,
        },
        baseUom: true,
        purchaseUom: true,
        saleUom: true,
      },
    });

    return item ? CatalogMapper.toDomainItem(item) : null;
  }


  async findByBarcode(barcode: string, organizationId: string): Promise<Item | null> {
    const item = await this.repository.findOne({
      where: { barcode, organizationId },
      relations: {
        category: true,
        genericProduct: {
          pharmaceutics: true,
        },
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

  async findGenericProductById(id: string, organizationId: string): Promise<ReturnType<typeof CatalogMapper.toDomainGenericProduct> | null> {
    const item = await this.genericProductRepository.findOne({
      where: { id, organizationId },
      relations: {
        pharmaceutics: true,
      },
    });
    return item ? CatalogMapper.toDomainGenericProduct(item) : null;
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

  async listGenericProducts(
    query: ItemDependencySearchQuery,
  ): Promise<{ items: Array<{ id: string; code: string; name: string }>; total: number }> {
    const qb = this.genericProductRepository
      .createQueryBuilder('generic_product')
      .where('generic_product.organization_id = :organizationId', {
        organizationId: query.organizationId,
      })
      .andWhere('generic_product.deleted_at IS NULL')
      .orderBy('generic_product.name', 'ASC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(generic_product.name ILIKE :search OR generic_product.code ILIKE :search)', {
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

  async save(product: Item): Promise<Item> {
    const category = await this.categoryRepository.findOneBy({
      id: product.category.id,
      organizationId: product.organizationId,
    });
    const genericProduct = await this.genericProductRepository.findOneBy({
      id: product.genericProduct.id,
      organizationId: product.organizationId,
    });

    if (!category || !genericProduct) {
      throw new Error('Invalid related references for item creation');
    }

    const entity = this.repository.create({
      id: product.id,
      organizationId: product.organizationId,
      code: product.code,
      name: product.name,
      baseUomId: product.baseUomId,
      purchaseUomId: product.purchaseUomId,
      saleUomId: product.saleUomId,
      barcode: product.barcode,
      trackLot: product.trackLot,
      trackExpiry: product.trackExpiry,
      shelfLifeDays: product.shelfLifeDays,
      isActive: product.isActive,
      category,
      genericProduct,
      baseUom: { id: product.baseUomId } as UomOrmEntity,
      purchaseUom: product.purchaseUomId ? ({ id: product.purchaseUomId } as UomOrmEntity) : null,
      saleUom: product.saleUomId ? ({ id: product.saleUomId } as UomOrmEntity) : null,
    });

    const saved = await this.repository.save(entity);
    return CatalogMapper.toDomainItem(saved);
  }


}
