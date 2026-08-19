import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import type { UomCategoryType } from '../../../shared/domain';
import { toUomCategoryType } from '../../../shared/domain/mappers';
import { CreateUomCategoryDto, ListUomCategoriesDto, UpdateUomCategoryDto } from '../dto/uom-categories.dto';
import { UomCategoryOrmEntity } from '../entities/uom-category.orm-entity';
import { BadRequestException } from '@nestjs/common';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

type UomCategoryRecord = {
  id: string;
  organizationId: string;
  code: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class UomCategoriesService {
  private readonly inMemory = new Map<string, UomCategoryRecord>();

  constructor(
    @Optional()
    @InjectRepository(UomCategoryOrmEntity)
    private readonly uomCategoryRepository?: Repository<UomCategoryOrmEntity>,
  ) {}

  async list(query: ListUomCategoriesDto, _organizationId: string): Promise<{ data: UomCategoryType[]; total: number }> {
    if (!this.uomCategoryRepository) {
      let items = [...this.inMemory.values()];
      if (query.search) {
        const search = query.search.toLowerCase();
        items = items.filter((item) => item.name.toLowerCase().includes(search) || (item.code?.toLowerCase().includes(search) ?? false));
      }
      return { data: items.slice(query.offset, query.offset + query.limit), total: items.length };
    }

    const qb = this.uomCategoryRepository
      .createQueryBuilder('category')
      .orderBy('category.name', 'ASC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(category.name ILIKE :search OR category.code ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const [items, total] = await qb.getManyAndCount();
    return { data: items.map(toUomCategoryType), total };
  }

  async get(id: string, _organizationId: string): Promise<UomCategoryType> {
    if (!this.uomCategoryRepository) {
      const item = this.inMemory.get(id);
      if (!item) {
        throw new NotFoundException('UOM category not found');
      }
      return item;
    }

    const item = await this.uomCategoryRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('UOM category not found');
    }
    return toUomCategoryType(item);
  }

  async create(payload: CreateUomCategoryDto, _organizationId: string): Promise<UomCategoryType> {
    if (payload.code && this.uomCategoryRepository) {
      const last = await this.uomCategoryRepository.findOne({
        order: { createdAt: 'DESC' },
        select: ['code'],
      });
      const { valid, expectedCode } = validateSequentialCode({
        providedCode: payload.code,
        lastCode: last?.code ?? undefined,
        override: payload.overrideCodeValidation,
      });
      if (!valid) {
        throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
      }
    }

    if (!this.uomCategoryRepository) {
      const now = new Date().toISOString();
      const record: UomCategoryRecord = {
        id: randomUUID(),
        organizationId: '',
        code: payload.code ?? null,
        name: payload.name,
        createdAt: now,
        updatedAt: now,
      };
      this.inMemory.set(record.id, record);
      return record;
    }

    const entity = this.uomCategoryRepository.create({
      code: payload.code ?? null,
      name: payload.name,
    });
    return toUomCategoryType(await this.uomCategoryRepository.save(entity));
  }

  async update(id: string, payload: UpdateUomCategoryDto, _organizationId: string): Promise<UomCategoryType> {
    if (!this.uomCategoryRepository) {
      const existing = this.inMemory.get(id);
      if (!existing) {
        throw new NotFoundException('UOM category not found');
      }

      const updated: UomCategoryRecord = {
        ...existing,
        code: payload.code === undefined ? existing.code : payload.code ?? null,
        name: payload.name ?? existing.name,
        updatedAt: new Date().toISOString(),
      };
      this.inMemory.set(id, updated);
      return updated;
    }

    const existing = await this.uomCategoryRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException('UOM category not found');
    }

    if (payload.code !== undefined) existing.code = payload.code ?? null;
    if (payload.name !== undefined) existing.name = payload.name;

    return toUomCategoryType(await this.uomCategoryRepository.save(existing));
  }
}
