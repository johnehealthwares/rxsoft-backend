import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import type { ItemCategoryType } from '../../../shared/domain';
import { toItemCategoryType } from '../../../shared/domain/mappers';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
import { ItemCategoryOrmEntity } from 'src/modules/catalog/entities';
// import { ItemCategoryOrmEntity } from '../entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ItemCategoryOrmEntity)
    private readonly categoryRepository: Repository<ItemCategoryOrmEntity>,
  ) {}

  async list(query: ListQueryDto): Promise<{ data: ItemCategoryType[]; total: number }> {
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .where('category.organization_id = :organizationId', { organizationId: DEFAULT_ORGANIZATION_ID })
      .andWhere('category.deleted_at IS NULL');

    if (query.search) {
      qb.andWhere('(category.code ILIKE :search OR category.name ILIKE :search)', { search: `%${query.search}%` });
    }

    // if (query.filter) {
    //   qb.andWhere('(category.code LIKE :filter OR category.name LIKE :filter)', { filter: `%${query.filter}%` });
    // }

    //TODO
    // const sortColumn = this.resolveSortColumn(query.sortBy);
    // qb.orderBy(sortColumn, query.sortOrder.toUpperCase() as 'ASC' | 'DESC')
    //   .skip(query.offset)
    //   .take(query.limit);

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toItemCategoryType), total };
  }

  async createCategory(payload: CreateCategoryDto): Promise<ItemCategoryType> {
    const duplicate = await this.categoryRepository.findOne({
      where: { code: payload.code, organizationId: DEFAULT_ORGANIZATION_ID, deletedAt: IsNull() },
    });

    if (duplicate) {
      throw new BadRequestException('Category code already exists');
    }

    let parent: ItemCategoryOrmEntity | null = null;
    if (payload.parentId) {
      parent = await this.categoryRepository.findOne({
        where: { id: payload.parentId, organizationId: DEFAULT_ORGANIZATION_ID, deletedAt: IsNull() },
      });
      if (!parent) {
        throw new BadRequestException('Parent category not found');
      }
    }

    const category = this.categoryRepository.create({
      organizationId: DEFAULT_ORGANIZATION_ID,
      code: payload.code,
      name: payload.name,
      parent,
    });

    const savedCategory = await this.categoryRepository.save(category);
    const fullCategory = await this.categoryRepository.findOneOrFail({
      where: { id: savedCategory.id, organizationId: DEFAULT_ORGANIZATION_ID, deletedAt: IsNull() },
      relations: ['parent'],
    });
    return toItemCategoryType(fullCategory);
  }

  async findById(id: string): Promise<ItemCategoryType> {
        
      const category = await this.categoryRepository.findOne({where:{id},   relations: ['parent']});
      if (!category) {
        throw new NotFoundException('Category not found');
      }
  
      return toItemCategoryType(category);
    }

  async updateCategory(id: string, payload: UpdateCategoryDto): Promise<ItemCategoryType> {
    const category = await this.categoryRepository.findOne({
      where: { id, organizationId: DEFAULT_ORGANIZATION_ID, deletedAt: IsNull() },
      relations: ['parent'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (payload.code && payload.code !== category.code) {
      const duplicate = await this.categoryRepository.findOne({
        where: { code: payload.code, organizationId: DEFAULT_ORGANIZATION_ID, deletedAt: IsNull() },
      });
      if (duplicate) {
        throw new BadRequestException('Category code already exists');
      }
      category.code = payload.code;
    }

    if (payload.name !== undefined) {
      category.name = payload.name;
    }

    if (payload.parentId !== undefined) {
      if (!payload.parentId) {
        category.parent = null;
      } else {
        const parent = await this.categoryRepository.findOne({
          where: { id: payload.parentId, organizationId: DEFAULT_ORGANIZATION_ID, deletedAt: IsNull() },
        });
        if (!parent) {
          throw new BadRequestException('Parent category not found');
        }
        category.parent = parent;
      }
    }

    const savedCategory = await this.categoryRepository.save(category);
    const fullCategory = await this.categoryRepository.findOneOrFail({
      where: { id: savedCategory.id, organizationId: DEFAULT_ORGANIZATION_ID, deletedAt: IsNull() },
      relations: ['parent'],
    });
    return toItemCategoryType(fullCategory);
  }

  async archive(id: string): Promise<void> {
    const result = await this.categoryRepository.softDelete({ id, organizationId: DEFAULT_ORGANIZATION_ID });
    if (!result.affected) {
      throw new NotFoundException('Category not found');
    }
  }

  

  private resolveSortColumn(sortBy: string): string {
    const map: Record<string, string> = {
      code: 'category.code',
      name: 'category.name',
      updatedAt: 'category.updated_at',
      createdAt: 'category.created_at',
    };

    return map[sortBy] ?? 'category.created_at';
  }
}
