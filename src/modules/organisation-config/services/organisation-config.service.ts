import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrganisationConfigDto, OrganisationConfigType } from '../dto/organisation-config.dto';
import { OrganisationConfigOrmEntity } from '../entities/organisation-config.orm-entity';

function toType(entity: OrganisationConfigOrmEntity): OrganisationConfigType {
  return {
    id: entity.id,
    organizationId: entity.organizationId,
    posHeader: entity.posHeader,
    defaultLoginTimeoutMinutes: entity.defaultLoginTimeoutMinutes,
    defaultAllowPos: entity.defaultAllowPos,
    defaultAllowA4Print: entity.defaultAllowA4Print,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}

@Injectable()
export class OrganisationConfigService {
  constructor(
    @InjectRepository(OrganisationConfigOrmEntity)
    private readonly repo: Repository<OrganisationConfigOrmEntity>,
  ) {}

  async getOrCreate(organizationId: string): Promise<OrganisationConfigType> {
    let entity = await this.repo.findOne({ where: { organizationId } });
    if (!entity) {
      entity = this.repo.create({ organizationId });
      entity = await this.repo.save(entity);
    }
    return toType(entity);
  }

  async update(
    organizationId: string,
    payload: UpdateOrganisationConfigDto,
  ): Promise<OrganisationConfigType> {
    let entity = await this.repo.findOne({ where: { organizationId } });
    if (!entity) {
      entity = this.repo.create({ organizationId });
    }

    if (payload.posHeader !== undefined) entity.posHeader = payload.posHeader;
    if (payload.defaultLoginTimeoutMinutes !== undefined) entity.defaultLoginTimeoutMinutes = payload.defaultLoginTimeoutMinutes;
    if (payload.defaultAllowPos !== undefined) entity.defaultAllowPos = payload.defaultAllowPos;
    if (payload.defaultAllowA4Print !== undefined) entity.defaultAllowA4Print = payload.defaultAllowA4Print;

    const saved = await this.repo.save(entity);
    return toType(saved);
  }
}