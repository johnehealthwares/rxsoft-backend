import { BadRequestException, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import type { UomType } from '../../../shared/domain';
import { toUomType } from '../../../shared/domain/mappers';
import { CreateUomDto } from '../dto/create-uom.dto';
import { ListUomsDto } from '../dto/list-uoms.dto';
import { UpdateUomDto } from '../dto/update-uom.dto';
import { UomOrmEntity } from '../entities/uom.orm-entity';
import { ForeignProperty } from 'src/modules/catalog/dto/product-response.dto';
import { applyFilters } from 'src/database/list';

type UomRecord = {
  id: string;
  organizationId: string;
  categoryId: string | null;
  category: ForeignProperty | null;
  code: string | null;
  name: string;
  uomType: 'reference' | 'bigger' | 'smaller';
  factor: number;
  rounding: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class UomsService {
  private readonly inMemory = new Map<string, UomRecord>();

  constructor(
    @Optional()
    @InjectRepository(UomOrmEntity)
    private readonly uomRepository?: Repository<UomOrmEntity>,
  ) { }

  async list(query: ListUomsDto, organizationId: string): Promise<{ data: UomType[]; total: number }> {
    if (!this.uomRepository) {
      let items = [...this.inMemory.values()].filter((item) => item.organizationId === organizationId);
      if (query.search) {
        const s = query.search.toLowerCase();
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(s) ||
            (item.code ? item.code.toLowerCase().includes(s) : false),
        );
      }
      if (query.uomType) {
        items = items.filter((item) => item.uomType === query.uomType);
      }
      if (typeof query.isActive === 'boolean') {
        items = items.filter((item) => item.isActive === query.isActive);
      }

      return { data: items.slice(query.offset, query.offset + query.limit), total: items.length };
    }

    const qb = this.uomRepository
      .createQueryBuilder('uom')
      .leftJoinAndSelect('uom.category', 'category')
      .where('uom.organization_id = :organizationId', { organizationId })
    //.orderBy('uom.name', 'ASC')

    if (query.search) {
      try {
        const filters = JSON.parse(query.search);
        await applyFilters(qb, 'uom', filters)
      } catch {
        qb.andWhere('(uom.code ILIKE :search OR uom.name ILIKE :search)', { search: `%${query.search}%` });
      }
    }

    qb
      .skip(query.offset)
      .take(query.limit);

    if (query.uomType) {
      qb.andWhere('uom.uom_type = :uomType', { uomType: query.uomType });
    }

    if (typeof query.isActive === 'boolean') {
      qb.andWhere('uom.is_active = :isActive', { isActive: query.isActive });
    }

    const [items, total] = await qb.getManyAndCount();
    return { data: items.map(toUomType), total };
  }

  async getById(id: string, organizationId: string): Promise<UomType> {

    if (!this.uomRepository) {
      const item = this.inMemory.get(id);
      if (!item || item.organizationId !== organizationId) {
        throw new NotFoundException('UOM not found');
      }
      return item;
    }

    const item = await this.uomRepository.findOne({ where: { id, organizationId } });
    if (!item) {
      throw new NotFoundException('UOM not found');
    }
    return toUomType(item);
  }

  async create(payload: CreateUomDto, organizationId: string): Promise<UomType> {
    if (!this.uomRepository) {
      const now = new Date();
      const record: UomRecord = {
        id: randomUUID(),
        organizationId,
        categoryId: payload.categoryId ?? null,
        category: null,
        code: payload.code ?? null,
        name: payload.name,
        uomType: payload.uomType ?? 'reference',
        factor: payload.factor ?? 1,
        rounding: payload.rounding ?? 0.01,
        isActive: payload.isActive ?? true,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };
      this.inMemory.set(record.id, record);
      return record;
    }

    const entity = this.uomRepository.create({
      organizationId,
      categoryId: payload.categoryId ?? null,
      code: payload.code ?? null,
      name: payload.name,
      uomType: payload.uomType ?? 'reference',
      factor: payload.factor ?? 1,
      rounding: payload.rounding ?? 0.01,
      isActive: payload.isActive ?? true,
    });

    await this.validateReferenceUnit(entity.categoryId, entity.uomType, entity.id);

    const savedEntity = await this.uomRepository.save(entity);
    return toUomType(savedEntity);
  }

  async update(id: string, payload: UpdateUomDto, organizationId: string): Promise<UomType> {
    if (!this.uomRepository) {
      const existing = this.inMemory.get(id);
      if (!existing || existing.organizationId !== organizationId) {
        throw new NotFoundException('UOM not found');
      }

      const updated: UomRecord = {
        ...existing,
        code: payload.code ?? existing.code,
        name: payload.name ?? existing.name,
        categoryId: payload.categoryId === undefined ? existing.categoryId : payload.categoryId,
        uomType: payload.uomType ?? existing.uomType,
        factor: payload.factor ?? existing.factor,
        rounding: payload.rounding ?? existing.rounding,
        isActive: payload.isActive ?? existing.isActive,
        updatedAt: new Date().toISOString(),
      };
      this.inMemory.set(id, updated);
      return updated;
    }

    const existing = await this.uomRepository.findOne({ where: { id, organizationId } });
    if (!existing) {
      throw new NotFoundException('UOM not found');
    }

    if (payload.code !== undefined) existing.code = payload.code;
    if (payload.name !== undefined) existing.name = payload.name;
    if (payload.categoryId !== undefined) existing.categoryId = payload.categoryId;
    if (payload.uomType !== undefined) existing.uomType = payload.uomType;
    if (payload.factor !== undefined) existing.factor = payload.factor;
    if (payload.rounding !== undefined) existing.rounding = payload.rounding;
    if (payload.isActive !== undefined) existing.isActive = payload.isActive;

    await this.validateReferenceUnit(payload.categoryId!, existing.uomType, existing.id);

    const savedEntity = await this.uomRepository.save(existing);
    return toUomType(savedEntity);
  }

  private async validateReferenceUnit(
    categoryId: string | null,
    uomType: 'reference' | 'bigger' | 'smaller',
    currentUomId?: string,
  ) {
    if (!categoryId || !this.uomRepository) return;

    const referenceUom = await this.uomRepository.findOne({
      where: {
        categoryId,
        uomType: 'reference',
      },
    });

    // Creating/updating a non-reference unit
    if (uomType !== 'reference') {
      if (!referenceUom) {
        throw new BadRequestException(
          'A reference unit must exist before creating conversion units.',
        );
      }

      return;
    }

    console.log({referenceUom, currentUomId})
    // Creating/updating a reference unit
    if (
      referenceUom &&
      referenceUom.id !== currentUomId
    ) {
      throw new BadRequestException(
        'Only one reference unit is allowed per category.',
      );
    }
  }
}
