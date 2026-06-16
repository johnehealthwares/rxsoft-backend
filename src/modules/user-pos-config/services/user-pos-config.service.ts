import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganisationConfigService } from '../../organisation-config/services/organisation-config.service';
import { UpdateUserPosConfigDto, UserPosConfigType } from '../dto/user-pos-config.dto';
import { UserPosConfigOrmEntity } from '../entities/user-pos-config.orm-entity';

function toType(entity: UserPosConfigOrmEntity): UserPosConfigType {
  return {
    id: entity.id,
    userId: entity.userId,
    organizationId: entity.organizationId,
    stockLocationId: entity.stockLocationId,
    storeId: entity.storeId,
    allowA4Print: entity.allowA4Print,
    allowPos: entity.allowPos,
    loginTimeoutMinutes: entity.loginTimeoutMinutes,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}

@Injectable()
export class UserPosConfigService {
  constructor(
    @InjectRepository(UserPosConfigOrmEntity)
    private readonly repo: Repository<UserPosConfigOrmEntity>,
    private readonly orgConfigService: OrganisationConfigService,
  ) {}

  async getOrCreate(userId: string, organizationId: string): Promise<UserPosConfigType> {
    let entity = await this.repo.findOne({ where: { userId, organizationId } });
    if (!entity) {
      const orgConfig = await this.orgConfigService.getOrCreate(organizationId);
      entity = this.repo.create({
        userId,
        organizationId,
        allowA4Print: orgConfig.defaultAllowA4Print,
        allowPos: orgConfig.defaultAllowPos,
      });
      entity = await this.repo.save(entity);
    }
    return toType(entity);
  }

  async update(
    userId: string,
    organizationId: string,
    payload: UpdateUserPosConfigDto,
  ): Promise<UserPosConfigType> {
    let entity = await this.repo.findOne({ where: { userId, organizationId } });
    if (!entity) {
      entity = this.repo.create({ userId, organizationId });
    }

    if (payload.stockLocationId !== undefined) entity.stockLocationId = payload.stockLocationId;
    if (payload.storeId !== undefined) entity.storeId = payload.storeId;
    if (payload.allowA4Print !== undefined) entity.allowA4Print = payload.allowA4Print;
    if (payload.allowPos !== undefined) entity.allowPos = payload.allowPos;
    if (payload.loginTimeoutMinutes !== undefined) entity.loginTimeoutMinutes = payload.loginTimeoutMinutes;

    const saved = await this.repo.save(entity);
    return toType(saved);
  }
}
