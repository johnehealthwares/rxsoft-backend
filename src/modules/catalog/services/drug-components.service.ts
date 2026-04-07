import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import type { DrugComponentType } from '../../../shared/domain';
import { CreateDrugComponentDto, ListDrugComponentsDto, UpdateDrugComponentDto } from '../dto/drug-components.dto';
import { DrugComponentOrmEntity } from '../entities';

const toDrugComponentType = (entity: DrugComponentOrmEntity): DrugComponentType => ({
  id: entity.id,
  organizationId: entity.organizationId,
  name: entity.name,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  deletedAt: entity.deletedAt ? entity.deletedAt.toISOString() : null,
});

@Injectable()
export class DrugComponentsService {
  constructor(
    @InjectRepository(DrugComponentOrmEntity)
    private readonly drugComponentRepository: Repository<DrugComponentOrmEntity>,
  ) {}

  async list(query: ListDrugComponentsDto, organizationId = DEFAULT_ORGANIZATION_ID): Promise<{ data: DrugComponentType[]; total: number }> {
    const qb = this.drugComponentRepository
      .createQueryBuilder('drug_component')
      .where('drug_component.organization_id = :organizationId', { organizationId })
      .andWhere('drug_component.deleted_at IS NULL')
      .orderBy('drug_component.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('drug_component.name ILIKE :search', { search: `%${query.search}%` });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toDrugComponentType), total };
  }

  async get(id: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<DrugComponentType> {
    const item = await this.drugComponentRepository.findOne({
      where: { id, organizationId, deletedAt: IsNull() },
    });
    if (!item) throw new NotFoundException('Drug component not found');
    return toDrugComponentType(item);
  }

  async create(payload: CreateDrugComponentDto, organizationId = DEFAULT_ORGANIZATION_ID): Promise<DrugComponentType> {
    const duplicate = await this.drugComponentRepository.findOne({
      where: { organizationId, name: payload.name, deletedAt: IsNull() },
    });
    if (duplicate) throw new BadRequestException('Drug component name already exists');

    const entity = this.drugComponentRepository.create({ organizationId, name: payload.name });
    const saved = await this.drugComponentRepository.save(entity);
    return toDrugComponentType(saved);
  }

  async update(id: string, payload: UpdateDrugComponentDto, organizationId = DEFAULT_ORGANIZATION_ID): Promise<DrugComponentType> {
    const item = await this.drugComponentRepository.findOne({
      where: { id, organizationId, deletedAt: IsNull() },
    });
    if (!item) throw new NotFoundException('Drug component not found');

    if (payload.name && payload.name !== item.name) {
      const duplicate = await this.drugComponentRepository.findOne({
        where: { organizationId, name: payload.name, deletedAt: IsNull() },
      });
      if (duplicate) throw new BadRequestException('Drug component name already exists');
      item.name = payload.name;
    }

    const saved = await this.drugComponentRepository.save(item);
    return toDrugComponentType(saved);
  }

  async remove(id: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<void> {
    const result = await this.drugComponentRepository.softDelete({ id, organizationId });
    if (!result.affected) throw new NotFoundException('Drug component not found');
  }
}
