import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { ItemCategoryType } from '../../../shared/domain';
import { toItemCategoryType } from '../../../shared/domain/mappers';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
import { ItemCategoryOrmEntity } from 'src/modules/catalog/entities';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ItemCategoryOrmEntity)
    private readonly categoryRepository: Repository<ItemCategoryOrmEntity>,
  ) {}

  async list(query: ListQueryDto, organizationId: string): Promise<{ data: ItemCategoryType[]; total: number }> {
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .where('category.organization_id = :organizationId', { organizationId })
      .andWhere('category.deleted_at IS NULL');

    if (query.search) {
      qb.andWhere('(category.code ILIKE :search OR category.name ILIKE :search)', { search: `%${query.search}%` });
    }

    qb.skip(query.offset).take(query.limit);

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toItemCategoryType), total };
  }

  async getLastCreated(organizationId: string): Promise<{ id: string; code: string; createdAt: string } | null> {
    const entity = await this.categoryRepository.findOne({
      where: { organizationId, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
    if (!entity) return null;
    return { id: entity.id, code: entity.code, createdAt: entity.createdAt.toISOString() };
  }

  async createCategory(payload: CreateCategoryDto, organizationId: string): Promise<ItemCategoryType> {
    const last = await this.categoryRepository.findOne({
      where: { organizationId, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
      select: ['code'],
    });
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: last?.code,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

    const duplicate = await this.categoryRepository.findOne({
      where: { code: payload.code, organizationId, deletedAt: IsNull() },
    });

    if (duplicate) {
      throw new BadRequestException('Category code already exists');
    }

    let parent: ItemCategoryOrmEntity | null = null;
    if (payload.parentId) {
      parent = await this.categoryRepository.findOne({
        where: { id: payload.parentId, organizationId, deletedAt: IsNull() },
      });
      if (!parent) {
        throw new BadRequestException('Parent category not found');
      }
    }

    const category = this.categoryRepository.create({
      organizationId,
      code: payload.code,
      name: payload.name,
      parent,
    });

    const savedCategory = await this.categoryRepository.save(category);
    const fullCategory = await this.categoryRepository.findOneOrFail({
      where: { id: savedCategory.id, organizationId, deletedAt: IsNull() },
      relations: ['parent'],
    });
    return toItemCategoryType(fullCategory);
  }

  async findById(id: string): Promise<ItemCategoryType> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['parent'] });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return toItemCategoryType(category);
  }

  async updateCategory(id: string, payload: UpdateCategoryDto, organizationId: string): Promise<ItemCategoryType> {
    const category = await this.categoryRepository.findOne({
      where: { id, organizationId, deletedAt: IsNull() },
      relations: ['parent'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (payload.code && payload.code !== category.code) {
      const duplicate = await this.categoryRepository.findOne({
        where: { code: payload.code, organizationId, deletedAt: IsNull() },
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
          where: { id: payload.parentId, organizationId, deletedAt: IsNull() },
        });
        if (!parent) {
          throw new BadRequestException('Parent category not found');
        }
        category.parent = parent;
      }
    }

    const savedCategory = await this.categoryRepository.save(category);
    const fullCategory = await this.categoryRepository.findOneOrFail({
      where: { id: savedCategory.id, organizationId, deletedAt: IsNull() },
      relations: ['parent'],
    });
    return toItemCategoryType(fullCategory);
  }

  async archive(id: string, organizationId: string): Promise<void> {
    const result = await this.categoryRepository.softDelete({ id, organizationId });
    if (!result.affected) {
      throw new NotFoundException('Category not found');
    }
  }
}
